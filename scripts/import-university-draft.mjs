#!/usr/bin/env node

import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { getTodayInChina, projectRoot } from './lib/research-utils.mjs'
import {
  arrayOfStrings,
  dedupeByUrl,
  enumOr,
  escapeRegExp,
  extractStringField,
  findArrayItems,
  indent,
  normalizeSearchTraceItem,
  normalizeSource,
  optionalString,
  stringOr,
} from './lib/import-utils.mjs'

const universitiesPath = path.join(projectRoot, 'src', 'data', 'universities.ts')

const allowedTier = ['985 / 211', '211', '普通本科']
const allowedVerificationStatus = ['已核验', '部分核验', '过期待复查']
const allowedVerificationRelevance = ['高', '中', '低', '待核对']
const allowedResearchRelevance = ['高', '中', '低']
const allowedUniversityLinkTypes = [
  '学校官网',
  '招生网',
  '学院官网',
  '招生目录',
  '就业报告',
  '教学质量报告',
  '研究生招生',
  '新闻资料',
  '其他',
]

function printHelp() {
  console.log(`
用法：
  npm run import:university -- "research-drafts/universities/草稿.json"

可选：
  --force    允许导入同名或同 id 院校
  --update   更新同名或同 id 院校，保留原 id
  --dry-run  只预览转换结果，不写入 universities.ts

说明：
  导入前请先人工检查草稿 JSON，尤其是官网、招生入口、专业入口、就业报告和分数/招生相关表述。
  已有条目请先 --dry-run --update 预览，再正式 --update。
`.trim())
}

function parseArgs(argv) {
  const args = argv.slice(2)

  if (args.includes('--help') || args.includes('-h')) {
    return { help: true }
  }

  const force = args.includes('--force')
  const update = args.includes('--update')
  const dryRun = args.includes('--dry-run')
  const draftPath = args.find((arg) => !arg.startsWith('--'))

  if (!draftPath) {
    throw new Error('请提供院校草稿 JSON 路径。')
  }

  if (force && update) {
    throw new Error('--force 和 --update 不能同时使用；新增重复条目用 --force，替换既有条目用 --update。')
  }

  return { draftPath, force, update, dryRun }
}

function normalizeTier(value) {
  const text = optionalString(value)

  if (allowedTier.includes(text)) {
    return text
  }

  if (text.includes('985')) {
    return '985 / 211'
  }

  if (text.includes('211')) {
    return '211'
  }

  return '普通本科'
}

function slugifyId(value, fallback) {
  const text = optionalString(value) || fallback
  const slug = text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return slug || `school-${Date.now()}`
}

function mapLinkType(type) {
  if (allowedUniversityLinkTypes.includes(type)) {
    return type
  }

  const mapped = {
    官网: '学校官网',
    学校官网: '学校官网',
    本科招生网: '招生网',
    招生信息网: '招生网',
    专业介绍: '学院官网',
    学院: '学院官网',
    学院官网: '学院官网',
    招生章程: '招生目录',
    招生计划: '招生目录',
    就业质量报告: '就业报告',
    教学质量报告: '教学质量报告',
    研究生招生网: '研究生招生',
    新闻: '新闻资料',
  }[type]

  return mapped || '其他'
}

function normalizeLink(link) {
  if (!link || typeof link !== 'object' || !optionalString(link.url)) {
    return null
  }

  const normalized = {
    title: stringOr(link.title, '公开资料入口'),
    type: mapLinkType(link.type),
    url: optionalString(link.url),
  }

  if (optionalString(link.note)) {
    normalized.note = optionalString(link.note)
  }

  return normalized
}

function buildLinks(draft, base, researchSources) {
  const draftLinks = Array.isArray(draft.links) ? draft.links.map(normalizeLink).filter(Boolean) : []
  const officialLink = optionalString(base.officialUrl)
    ? [
        {
          title: `${base.name}官网`,
          type: '学校官网',
          url: base.officialUrl,
          note: '学校主入口，招生、专业和就业信息仍需核对对应官方页面。',
        },
      ]
    : []
  const majorLink = optionalString(base.majorUrl)
    ? [
        {
          title: `${base.name}学院 / 专业入口`,
          type: '学院官网',
          url: base.majorUrl,
          note: '用于核对专业介绍、学院设置或培养方向。',
        },
      ]
    : []
  const sourceLinks = researchSources.map((source) =>
    normalizeLink({
      title: source.title,
      type: source.type,
      url: source.url,
      note: source.date ? `${source.type} · ${source.date}` : undefined,
    }),
  )

  return dedupeByUrl([...draftLinks, ...officialLink, ...majorLink, ...sourceLinks.filter(Boolean)])
}

function normalizeDraft(draft) {
  const today = getTodayInChina()
  const base = draft.base && typeof draft.base === 'object' ? draft.base : {}
  const verification = draft.verification && typeof draft.verification === 'object' ? draft.verification : {}
  const research = draft.research && typeof draft.research === 'object' ? draft.research : {}
  const draftSources = Array.isArray(research.sources) ? research.sources : draft.sources
  const sources = Array.isArray(draftSources) ? draftSources.map(normalizeSource).filter(Boolean) : []
  const searchTrace = Array.isArray(research.searchTrace)
    ? research.searchTrace.map(normalizeSearchTraceItem).filter(Boolean)
    : []

  const normalizedBase = {
    id: slugifyId(base.id, base.name || draft.target || 'school'),
    name: stringOr(base.name || draft.target, '待核对院校'),
    shortName: stringOr(base.shortName || base.name || draft.target, '待核对'),
    city: stringOr(base.city),
    province: stringOr(base.province),
    tier: normalizeTier(base.tier),
    logo: optionalString(base.logo),
    officialUrl: optionalString(base.officialUrl),
    majorUrl: optionalString(base.majorUrl),
    focus: stringOr(base.focus),
    tags: arrayOfStrings(base.tags).slice(0, 6),
    overview: stringOr(base.overview, '公开资料待继续核对。'),
    suitableFor: arrayOfStrings(base.suitableFor),
    reminders: arrayOfStrings(base.reminders),
  }

  if (!normalizedBase.logo) {
    normalizedBase.logo = `/logos/schools/${normalizedBase.name}.png`
  }

  if (!normalizedBase.tags.length) {
    normalizedBase.tags = ['待核对']
  }

  return {
    id: normalizedBase.id,
    name: normalizedBase.name,
    shortName: normalizedBase.shortName,
    city: normalizedBase.city,
    province: normalizedBase.province,
    tier: normalizedBase.tier,
    logo: normalizedBase.logo,
    officialUrl: normalizedBase.officialUrl,
    ...(normalizedBase.majorUrl ? { majorUrl: normalizedBase.majorUrl } : {}),
    focus: normalizedBase.focus,
    tags: normalizedBase.tags,
    overview: normalizedBase.overview,
    suitableFor: normalizedBase.suitableFor,
    reminders: normalizedBase.reminders,
    links: buildLinks(draft, normalizedBase, sources),
    verification: {
      status: enumOr(verification.status, allowedVerificationStatus, '部分核验'),
      relevanceLevel: enumOr(verification.relevanceLevel, allowedVerificationRelevance, '待核对'),
      updatedAt: stringOr(verification.updatedAt, today),
      summary: stringOr(
        verification.summary,
        '公开资料已整理为草稿，招生、专业和就业信息仍需核对官方入口。',
      ),
      verifiedFields: arrayOfStrings(verification.verifiedFields),
      pendingFields: arrayOfStrings(verification.pendingFields),
    },
    research: {
      updatedAt: stringOr(research.updatedAt, today),
      status: stringOr(research.status, '公开资料已整理，招生、专业和就业信息仍需核对官方入口。'),
      relevanceLevel: enumOr(research.relevanceLevel, allowedResearchRelevance, '中'),
      conclusion: stringOr(research.conclusion, '公开资料已整理，但仍需结合当年招生目录、专业介绍和就业报告判断匹配度。'),
      keySignals: arrayOfStrings(research.keySignals),
      suitableFor: arrayOfStrings(research.suitableFor),
      risks: arrayOfStrings(research.risks),
      sources,
      ...(searchTrace.length ? { searchTrace } : {}),
    },
  }
}

function hasStringField(content, field, value) {
  const fieldPattern = escapeRegExp(field)
  const valuePattern = escapeRegExp(value)
  const pattern = new RegExp(`(^|[\\s,{])["']?${fieldPattern}["']?\\s*:\\s*["']${valuePattern}["']`, 'm')

  return pattern.test(content)
}

function findUniversityEntry(content, university) {
  const items = findArrayItems(content, 'export const universities: University[] = [')

  return (
    items.find((item) => extractStringField(item.text, 'id') === university.id) ||
    items.find((item) => extractStringField(item.text, 'name') === university.name) ||
    null
  )
}

function hasUniversity(content, university) {
  return hasStringField(content, 'id', university.id) || hasStringField(content, 'name', university.name)
}

async function main() {
  const { help, draftPath, force, update, dryRun } = parseArgs(process.argv)

  if (help) {
    printHelp()
    return
  }

  const resolvedDraftPath = path.resolve(projectRoot, draftPath)
  const draft = JSON.parse(await fs.readFile(resolvedDraftPath, 'utf8'))
  const content = await fs.readFile(universitiesPath, 'utf8')
  const university = normalizeDraft(draft)
  const existingEntry = findUniversityEntry(content, university)
  const isDuplicate = Boolean(existingEntry)

  if (update) {
    if (!existingEntry) {
      throw new Error(`universities.ts 中没有找到可更新的同名或同 id 院校：${university.name} / ${university.id}。请先新增，或检查草稿 id/name。`)
    }

    const existingId = extractStringField(existingEntry.text, 'id')

    if (!existingId) {
      throw new Error(`没有识别到既有院校 id，更新中止：${university.name}`)
    }

    university.id = existingId
  }

  if (!force && !update && isDuplicate && !dryRun) {
    throw new Error(`universities.ts 中已存在同名或同 id 院校：${university.name} / ${university.id}。如需更新既有条目，请加 --update；如确需重复导入，请加 --force。`)
  }

  if (dryRun) {
    if (update) {
      console.warn(`提示：将更新既有院校：${extractStringField(existingEntry.text, 'name')} / id ${university.id}`)
    } else if (isDuplicate) {
      console.warn(`提示：universities.ts 中已存在同名或同 id 院校：${university.name} / ${university.id}`)
    }

    console.log(JSON.stringify(university, null, 2))
    return
  }

  if (update) {
    const universityLiteral = indent(JSON.stringify(university, null, 2), 2)
    const updated = `${content.slice(0, existingEntry.start)}${universityLiteral}${content.slice(existingEntry.end)}`

    await fs.writeFile(universitiesPath, updated, 'utf8')

    console.log(`已更新院校：${university.name}`)
    console.log(`保留 id：${university.id}`)
    console.log(`预览路径：http://127.0.0.1:5173/universities/${university.id}`)
    return
  }

  const marker = '\n]\n\nexport function getUniversityById'

  if (!content.includes(marker)) {
    throw new Error('没有找到 universities 数组结尾，导入中止。')
  }

  const universityLiteral = indent(JSON.stringify(university, null, 2), 2)
  const updated = content.replace(marker, `\n${universityLiteral},${marker}`)

  await fs.writeFile(universitiesPath, updated, 'utf8')

  console.log(`已导入院校：${university.name}`)
  console.log(`新 id：${university.id}`)
  console.log(`预览路径：http://127.0.0.1:5173/universities/${university.id}`)
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
