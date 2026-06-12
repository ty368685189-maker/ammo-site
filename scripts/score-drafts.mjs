#!/usr/bin/env node

import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { spawnSync } from 'node:child_process'
import { projectRoot } from './lib/research-utils.mjs'

const allowedCompany = {
  ownership: new Set(['国企', '民企', '外企', '创业公司', '待核对']),
  schedule: new Set(['双休', '大小周', '单休', '待核对']),
}

const allowedUniversity = {
  tier: new Set(['985 / 211', '211', '普通本科']),
}

const allowedVerificationStatus = new Set(['已核验', '部分核验', '过期待复查'])
const allowedVerificationRelevance = new Set(['高', '中', '低', '待核对'])
const allowedResearchRelevance = new Set(['高', '中', '低'])
const promoPattern = /全面|赋能|价值|体系|打造|助力|真正|显著|竞争力强|顶级|领先|一流平台|强烈推荐/g
const weakSourcePattern = /百度百科|百科|企查查|天眼查|爱企查|第三方院校库|论坛|知乎|自媒体|来源不明|镜像/i

function parseArgs(argv) {
  const args = argv.slice(2)
  const positional = args.filter((arg) => !arg.startsWith('--'))
  const sinceArg = args.find((arg) => arg.startsWith('--since='))

  return {
    files: positional,
    skipDryRun: args.includes('--skip-dry-run'),
    failOnBlockers: args.includes('--fail-on-blockers'),
    json: args.includes('--json'),
    since: sinceArg ? new Date(`${sinceArg.slice('--since='.length)}T00:00:00+08:00`) : null,
  }
}

function charLength(value) {
  return Array.from(String(value ?? '')).length
}

function isObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function issue(issues, level, message) {
  issues.push({ level, message })
}

function scorePenalty(level) {
  if (level === 'blocker') return 25
  if (level === 'major') return 10
  if (level === 'minor') return 4
  return 0
}

function verdict(score, issues) {
  if (issues.some((item) => item.level === 'blocker')) return '不建议导入'
  if (score >= 85) return '可进入人工确认'
  if (score >= 70) return '先修问题再导入'
  return '不建议导入'
}

function readJsonString(raw, start) {
  let result = ''
  let escaped = false

  for (let index = start + 1; index < raw.length; index += 1) {
    const char = raw[index]

    if (escaped) {
      result += char
      escaped = false
      continue
    }

    if (char === '\\') {
      escaped = true
      continue
    }

    if (char === '"') {
      return { value: result, end: index }
    }

    result += char
  }

  return { value: result, end: raw.length - 1 }
}

function detectDuplicateKeys(raw) {
  const duplicates = []
  const stack = []
  let inString = false
  let escaped = false

  for (let index = 0; index < raw.length; index += 1) {
    const char = raw[index]

    if (inString) {
      if (escaped) {
        escaped = false
      } else if (char === '\\') {
        escaped = true
      } else if (char === '"') {
        inString = false
      }
      continue
    }

    if (char === '"') {
      const top = stack.at(-1)

      if (top?.type === 'object' && top.expectingKey) {
        const token = readJsonString(raw, index)
        if (top.keys.has(token.value)) {
          duplicates.push(token.value)
        }
        top.keys.add(token.value)
        index = token.end
        continue
      }

      inString = true
      continue
    }

    if (char === '{') {
      stack.push({ type: 'object', keys: new Set(), expectingKey: true })
      continue
    }

    if (char === '[') {
      stack.push({ type: 'array' })
      continue
    }

    if (char === '}' || char === ']') {
      stack.pop()
      continue
    }

    const top = stack.at(-1)
    if (top?.type !== 'object') {
      continue
    }

    if (char === ':') {
      top.expectingKey = false
    } else if (char === ',') {
      top.expectingKey = true
    }
  }

  return [...new Set(duplicates)]
}

async function collectJsonFiles(inputPaths, since) {
  const roots = inputPaths.length
    ? inputPaths.map((item) => path.resolve(projectRoot, item))
    : [
        path.join(projectRoot, 'research-drafts', 'companies'),
        path.join(projectRoot, 'research-drafts', 'universities'),
      ]
  const files = []

  async function visit(targetPath) {
    const stat = await fs.stat(targetPath)

    if (stat.isDirectory()) {
      const entries = await fs.readdir(targetPath)
      for (const entry of entries) await visit(path.join(targetPath, entry))
      return
    }

    if (!targetPath.endsWith('.json')) {
      return
    }

    if (since && stat.mtime < since) {
      return
    }

    files.push(targetPath)
  }

  for (const root of roots) {
    await visit(root)
  }

  return files.sort((left, right) => left.localeCompare(right, 'zh-Hans-CN'))
}

function extractTextValues(value, result = []) {
  if (typeof value === 'string') {
    result.push(value)
    return result
  }

  if (Array.isArray(value)) {
    for (const item of value) extractTextValues(item, result)
    return result
  }

  if (isObject(value)) {
    for (const item of Object.values(value)) extractTextValues(item, result)
  }

  return result
}

function sourceList(draft) {
  if (Array.isArray(draft.research?.sources)) {
    return draft.research.sources
  }

  if (Array.isArray(draft.sources)) {
    return draft.sources
  }

  return []
}

function checkCommon(draft, issues, duplicateKeys) {
  if (duplicateKeys.length) issue(issues, 'blocker', `JSON 有重复字段：${duplicateKeys.join('、')}`)
  if (!draft.kind) issue(issues, 'blocker', '缺 kind')
  if (!draft.target) issue(issues, 'major', '缺 target')
  if (!isObject(draft.base)) issue(issues, 'blocker', '缺 base 对象')
  if (!isObject(draft.verification)) issue(issues, 'blocker', '缺 verification 对象')
  if (!isObject(draft.research)) issue(issues, 'blocker', '缺 research 对象')

  const links = Array.isArray(draft.links) ? draft.links : []
  const sources = sourceList(draft)
  const urls = new Set()

  for (const [index, link] of links.entries()) {
    if (!String(link?.url || '').trim()) issue(issues, 'blocker', `links[${index}] URL 为空`)
    if (link?.url && urls.has(link.url)) issue(issues, 'minor', `links 里有重复 URL：${link.url}`)
    if (link?.url) urls.add(link.url)
  }

  for (const [index, source] of sources.entries()) {
    if (!String(source?.url || '').trim()) issue(issues, 'blocker', `sources[${index}] URL 为空`)
    if (source?.url && urls.has(source.url)) issue(issues, 'note', `来源和入口有重复 URL：${source.url}`)
    if (source?.url) urls.add(source.url)
    if (weakSourcePattern.test(`${source?.title || ''} ${source?.type || ''} ${source?.url || ''}`)) {
      issue(issues, 'major', `疑似弱来源不能支撑核心字段：${source?.title || source?.url || `sources[${index}]`}`)
    }
  }

  if (!sources.length) {
    issue(issues, 'blocker', '缺 sources；至少需要可追溯来源')
  } else if (!Array.isArray(draft.research?.sources)) {
    issue(issues, 'major', 'sources 放在顶层；建议放入 research.sources，避免后续页面和评分漏读')
  }

  if (!allowedVerificationStatus.has(draft.verification?.status)) issue(issues, 'blocker', `verification.status 异常：${draft.verification?.status}`)
  if (!allowedVerificationRelevance.has(draft.verification?.relevanceLevel)) issue(issues, 'blocker', `verification.relevanceLevel 异常：${draft.verification?.relevanceLevel}`)
  if (!Array.isArray(draft.verification?.verifiedFields)) issue(issues, 'major', 'verification.verifiedFields 不是数组')
  if (!Array.isArray(draft.verification?.pendingFields)) issue(issues, 'major', 'verification.pendingFields 不是数组')
  if (!draft.verification?.pendingFields?.length) issue(issues, 'minor', 'pendingFields 为空；通常至少要写最新公告、分数、薪资、作息等待核对项')

  if (!allowedResearchRelevance.has(draft.research?.relevanceLevel)) issue(issues, 'blocker', `research.relevanceLevel 异常：${draft.research?.relevanceLevel}`)

  const conclusionLength = charLength(draft.research?.conclusion)
  if (conclusionLength < 80 || conclusionLength > 160) issue(issues, 'major', `research.conclusion 建议 80-160 字，当前 ${conclusionLength} 字`)
  if (!Array.isArray(draft.research?.keySignals) || draft.research.keySignals.length < 3 || draft.research.keySignals.length > 5) {
    issue(issues, 'minor', 'research.keySignals 建议 3-5 条')
  }
  if (!Array.isArray(draft.research?.suitableFor) || draft.research.suitableFor.length < 2 || draft.research.suitableFor.length > 4) {
    issue(issues, 'minor', 'research.suitableFor 建议 2-4 条')
  }
  if (!Array.isArray(draft.research?.risks) || draft.research.risks.length < 2 || draft.research.risks.length > 5) {
    issue(issues, 'minor', 'research.risks 建议 2-5 条')
  }

  const promoMatches = [...new Set(extractTextValues(draft).join(' ').match(promoPattern) || [])]
  if (promoMatches.length) issue(issues, 'minor', `文案疑似偏宣传：${promoMatches.join('、')}`)
}

function checkCompany(draft, issues) {
  const base = draft.base || {}
  const sources = sourceList(draft)

  if (draft.kind && draft.kind !== 'company') issue(issues, 'blocker', `kind 应为 company，当前 ${draft.kind}`)
  if (!allowedCompany.ownership.has(base.ownership)) issue(issues, 'blocker', `ownership 不在枚举内：${base.ownership}`)
  if (!allowedCompany.schedule.has(base.schedule)) issue(issues, 'blocker', `schedule 不在枚举内：${base.schedule}`)
  if (charLength(base.description) > 40) issue(issues, 'major', `description 不超过 40 字，当前 ${charLength(base.description)} 字`)
  if (sources.length < 5) issue(issues, 'major', `企业草稿来源建议 5 条以上，当前 ${sources.length} 条`)

  const salary = String(base.salaryRange || '')
  if (salary && salary !== '未知' && !salary.includes('待核对')) {
    issue(issues, 'major', 'salaryRange 有确定金额时需要强/中证据；不确定请写“未知”或“样本值（待核对）”')
  }
  if (base.schedule && base.schedule !== '待核对') {
    issue(issues, 'minor', 'schedule 写成确定值时，请确认来源能直接支撑作息')
  }
}

function checkUniversity(draft, issues) {
  const base = draft.base || {}
  const sources = sourceList(draft)

  if (draft.kind && draft.kind !== 'university') issue(issues, 'blocker', `kind 应为 university，当前 ${draft.kind}`)
  if (!allowedUniversity.tier.has(base.tier)) issue(issues, 'blocker', `tier 不在枚举内：${base.tier}`)
  if (String(base.tier || '').includes('双一流')) issue(issues, 'blocker', '双一流不是 tier 枚举；非 211 双一流写普通本科，并在 tags 写双一流')
  if (charLength(base.overview) > 60) issue(issues, 'major', `overview 不超过 60 字，当前 ${charLength(base.overview)} 字`)
  if (charLength(base.focus) > 35) issue(issues, 'major', `focus 不超过 35 字，当前 ${charLength(base.focus)} 字`)
  if (sources.length < 6) issue(issues, 'major', `院校草稿来源建议 6 条以上，当前 ${sources.length} 条`)

  const allText = extractTextValues(draft).join(' ')
  if (/就业率|录取分数|招生人数/.test(allText) && !/待核对|核对|复查|复核|以.*为准|不直接写|不能.*判断|不能.*结论|暂不写|不应写/.test(allText)) {
    issue(issues, 'major', '就业率、录取分数、招生人数必须保留年份/省份/来源边界，不能写成泛化确定结论')
  }
  if (/安徽理工大学/.test(allText) && /ahut\.edu\.cn/i.test(allText)) {
    issue(issues, 'blocker', '安徽理工大学不能混入安徽工业大学 ahut.edu.cn 域名')
  }
}

function runDryRun(kind, filePath) {
  const script = kind === 'university' ? 'scripts/import-university-draft.mjs' : 'scripts/import-company-draft.mjs'
  const result = spawnSync('node', [script, filePath, '--dry-run'], {
    cwd: projectRoot,
    encoding: 'utf8',
    windowsHide: true,
  })

  return {
    ok: result.status === 0,
    output: `${result.stdout || ''}${result.stderr || ''}`.trim(),
  }
}

async function reviewFile(filePath, options) {
  const raw = await fs.readFile(filePath, 'utf8')
  const issues = []
  const duplicateKeys = detectDuplicateKeys(raw)
  let draft

  try {
    draft = JSON.parse(raw)
  } catch (error) {
    return {
      file: path.relative(projectRoot, filePath),
      target: path.basename(filePath),
      kind: 'unknown',
      score: 0,
      verdict: '不建议导入',
      issues: [{ level: 'blocker', message: `JSON 解析失败：${error.message}` }],
    }
  }

  const kind = draft.kind || (filePath.includes(`${path.sep}universities${path.sep}`) ? 'university' : 'company')

  checkCommon(draft, issues, duplicateKeys)

  if (kind === 'company') {
    checkCompany(draft, issues)
  } else if (kind === 'university') {
    checkUniversity(draft, issues)
  } else {
    issue(issues, 'blocker', `无法判断草稿类型：${kind}`)
  }

  if (!options.skipDryRun && (kind === 'company' || kind === 'university')) {
    const dryRun = runDryRun(kind, filePath)
    if (!dryRun.ok) issue(issues, 'blocker', `dry-run 失败：${dryRun.output}`)
  }

  const score = Math.max(0, 100 - issues.reduce((total, item) => total + scorePenalty(item.level), 0))

  return {
    file: path.relative(projectRoot, filePath),
    target: draft.target || draft.base?.name || path.basename(filePath),
    kind,
    score,
    verdict: verdict(score, issues),
    issues,
  }
}

function printResult(result) {
  const icon = result.verdict === '可进入人工确认' ? 'OK' : result.verdict === '先修问题再导入' ? 'FIX' : 'STOP'
  console.log(`\n[${icon}] ${result.score} 分 / ${result.verdict} / ${result.target}`)
  console.log(`文件：${result.file}`)

  if (!result.issues.length) {
    console.log('问题：未发现明显问题，仍需人工核对来源内容。')
    return
  }

  for (const item of result.issues) {
    const label = {
      blocker: '阻塞',
      major: '较重',
      minor: '轻微',
      note: '提示',
    }[item.level] || item.level
    console.log(`- ${label}：${item.message}`)
  }
}

async function main() {
  const options = parseArgs(process.argv)
  const files = await collectJsonFiles(options.files, options.since)

  if (!files.length) {
    throw new Error('没有找到可评分的 JSON 草稿。')
  }

  const results = []
  for (const file of files) {
    results.push(await reviewFile(file, options))
  }

  if (options.json) {
    console.log(JSON.stringify(results, null, 2))
  } else {
    console.log(`草稿评分：${results.length} 份`)
    for (const result of results) printResult(result)
    console.log('\n汇总：')
    console.table(results.map(({ target, kind, score, verdict, issues }) => ({
      target,
      kind,
      score,
      verdict,
      blockers: issues.filter((item) => item.level === 'blocker').length,
      major: issues.filter((item) => item.level === 'major').length,
    })))
  }

  const reportPath = path.join(projectRoot, 'research-drafts', 'score-report.json')
  await fs.writeFile(reportPath, `${JSON.stringify({ generatedAt: new Date().toISOString(), results }, null, 2)}\n`, 'utf8')
  console.log(`评分报告：${path.relative(projectRoot, reportPath)}`)

  if (options.failOnBlockers && results.some((result) => result.issues.some((item) => item.level === 'blocker'))) {
    throw new Error('存在阻塞项。')
  }
}

main().catch((error) => {
  console.error(`草稿评分失败：${error.message}`)
  process.exit(1)
})
