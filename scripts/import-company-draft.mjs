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

const companiesPath = path.join(projectRoot, 'src', 'data', 'companies.ts')

const allowedOwnership = ['国企', '民企', '外企', '创业公司', '待核对']
const allowedSchedule = ['双休', '大小周', '单休', '待核对']
const allowedVerificationStatus = ['已核验', '部分核验', '过期待复查']
const allowedVerificationRelevance = ['高', '中', '低', '待核对']
const allowedResearchRelevance = ['高', '中', '低']
const allowedCompanyLinkTypes = [
  '官网',
  '招聘入口',
  '招聘公告',
  '公众号',
  '抖音号',
  '视频号',
  '新闻资料',
  '政府资料',
  '学校就业网',
  '其他',
]

function printHelp() {
  console.log(`
用法：
  npm run import:company -- "research-drafts/companies/草稿.json"

可选：
  --force    允许导入同名企业
  --update   更新同名企业，保留原 id
  --dry-run  只预览转换结果，不写入 companies.ts

说明：
  导入前请先人工检查草稿 JSON，尤其是来源链接、薪资、作息和工作地点。
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
    throw new Error('请提供企业草稿 JSON 路径。')
  }

  if (force && update) {
    throw new Error('--force 和 --update 不能同时使用；新增重复条目用 --force，替换既有条目用 --update。')
  }

  return { draftPath, force, update, dryRun }
}

function normalizeOwnership(value) {
  const text = optionalString(value)

  if (allowedOwnership.includes(text)) {
    return text
  }

  if (!text || text.includes('待核对') || text.includes('未知')) {
    return '待核对'
  }

  if (text.includes('央企') || text.includes('国企') || text.includes('国资')) {
    return '国企'
  }

  if (text.includes('民企') || text.includes('民营')) {
    return '民企'
  }

  if (text.includes('外企') || text.includes('外资')) {
    return '外企'
  }

  if (text.includes('创业')) {
    return '创业公司'
  }

  return '待核对'
}

function mapLinkType(type) {
  if (allowedCompanyLinkTypes.includes(type)) {
    return type
  }

  const mapped = {
    招聘平台: '招聘入口',
    新闻: '新闻资料',
    '新闻/平台': '新闻资料',
    政府: '政府资料',
    政府资料: '政府资料',
    学校就业网: '学校就业网',
    '招聘平台/其他': '其他',
    企业资料: '其他',
    学校官网: '其他',
    学院官网: '其他',
    招生网: '其他',
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
  const websiteLink = optionalString(base.website)
    ? [
        {
          title: `${base.name}官网 / 外部入口`,
          type: '官网',
          url: base.website,
          note: '主要入口，具体招聘信息仍需核对最新公告。',
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

  return dedupeByUrl([...draftLinks, ...websiteLink, ...sourceLinks.filter(Boolean)])
}

function normalizeDraft(draft, nextId) {
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
    name: stringOr(base.name || draft.target, '待核对企业'),
    ownership: normalizeOwnership(base.ownership),
    city: stringOr(base.city),
    region: stringOr(base.region),
    salaryRange: stringOr(base.salaryRange, '未知'),
    schedule: enumOr(base.schedule, allowedSchedule, '待核对'),
    scaleOrIndustry: stringOr(base.scaleOrIndustry),
    highlights: arrayOfStrings(base.highlights).slice(0, 6),
    positions: stringOr(base.positions),
    education: stringOr(base.education),
    website: optionalString(base.website),
    description: stringOr(base.description, '公开资料待继续核对。'),
  }

  if (!normalizedBase.highlights.length) {
    normalizedBase.highlights = ['待核对']
  }

  return {
    id: nextId,
    name: normalizedBase.name,
    ownership: normalizedBase.ownership,
    city: normalizedBase.city,
    region: normalizedBase.region,
    salaryRange: normalizedBase.salaryRange,
    schedule: normalizedBase.schedule,
    scaleOrIndustry: normalizedBase.scaleOrIndustry,
    highlights: normalizedBase.highlights,
    positions: normalizedBase.positions,
    education: normalizedBase.education,
    website: normalizedBase.website,
    links: buildLinks(draft, normalizedBase, sources),
    description: normalizedBase.description,
    verification: {
      status: enumOr(verification.status, allowedVerificationStatus, '部分核验'),
      relevanceLevel: enumOr(verification.relevanceLevel, allowedVerificationRelevance, '待核对'),
      updatedAt: stringOr(verification.updatedAt, today),
      summary: stringOr(
        verification.summary,
        '公开资料已整理为草稿，关键就业信息仍需核对最新公告。',
      ),
      verifiedFields: arrayOfStrings(verification.verifiedFields),
      pendingFields: arrayOfStrings(verification.pendingFields),
    },
    research: {
      updatedAt: stringOr(research.updatedAt, today),
      status: stringOr(research.status, '公开资料已整理，具体岗位、薪资和工作地点仍需核对最新公告。'),
      relevanceLevel: enumOr(research.relevanceLevel, allowedResearchRelevance, '中'),
      conclusion: stringOr(research.conclusion, '公开资料已整理，但仍需结合最新招聘公告判断专业相关性和岗位匹配度。'),
      keySignals: arrayOfStrings(research.keySignals),
      suitableFor: arrayOfStrings(research.suitableFor),
      risks: arrayOfStrings(research.risks),
      sources,
      ...(searchTrace.length ? { searchTrace } : {}),
    },
  }
}

function getNextId(content) {
  const ids = [...content.matchAll(/["']?\bid["']?\s*:\s*(\d+)/g)].map((match) => Number(match[1]))
  return ids.length ? Math.max(...ids) + 1 : 1
}

function normalizeCompanyName(value) {
  return value.replace(/[（(][^）)]*[）)]/g, '').replace(/\s+/g, '').trim()
}

function extractNumberField(text, field) {
  const match = text.match(new RegExp(`["']?\\b${escapeRegExp(field)}["']?\\s*:\\s*(\\d+)`))
  return match ? Number(match[1]) : null
}

function findCompanyEntry(content, name) {
  const normalizedName = normalizeCompanyName(name)
  const items = findArrayItems(content, 'export const companies: Company[] = [')

  return (
    items.find((item) => extractStringField(item.text, 'name') === name) ||
    items.find((item) => normalizeCompanyName(extractStringField(item.text, 'name')) === normalizedName) ||
    null
  )
}

function hasCompanyName(content, name) {
  return Boolean(findCompanyEntry(content, name))
}

async function main() {
  const { help, draftPath, force, update, dryRun } = parseArgs(process.argv)

  if (help) {
    printHelp()
    return
  }

  const resolvedDraftPath = path.resolve(projectRoot, draftPath)
  const draft = JSON.parse(await fs.readFile(resolvedDraftPath, 'utf8'))
  const content = await fs.readFile(companiesPath, 'utf8')
  const nextId = getNextId(content)
  const company = normalizeDraft(draft, nextId)
  const existingEntry = findCompanyEntry(content, company.name)
  const isDuplicate = Boolean(existingEntry)

  if (update) {
    if (!existingEntry) {
      throw new Error(`companies.ts 中没有找到可更新的同名企业：${company.name}。请先新增，或检查草稿名称。`)
    }

    const existingId = extractNumberField(existingEntry.text, 'id')

    if (!Number.isFinite(existingId)) {
      throw new Error(`没有识别到既有企业 id，更新中止：${company.name}`)
    }

    company.id = existingId
  }

  if (!force && !update && isDuplicate && !dryRun) {
    throw new Error(`companies.ts 中已存在同名企业：${company.name}。如需更新既有条目，请加 --update；如确需重复导入，请加 --force。`)
  }

  if (dryRun) {
    if (update) {
      console.warn(`提示：将更新既有企业：${extractStringField(existingEntry.text, 'name')} / id ${company.id}`)
    } else if (isDuplicate) {
      console.warn(`提示：companies.ts 中已存在同名企业：${company.name}`)
    }

    console.log(JSON.stringify(company, null, 2))
    return
  }

  if (update) {
    const companyLiteral = indent(JSON.stringify(company, null, 2), 2)
    const updated = `${content.slice(0, existingEntry.start)}${companyLiteral}${content.slice(existingEntry.end)}`

    await fs.writeFile(companiesPath, updated, 'utf8')

    console.log(`已更新企业：${company.name}`)
    console.log(`保留 id：${company.id}`)
    console.log(`预览路径：http://127.0.0.1:5173/companies/${company.id}`)
    return
  }

  const markerMatch = content.match(/\r?\n]\r?\n\r?\nexport function getCompanyById/)

  if (!markerMatch?.index) {
    throw new Error('没有找到 companies 数组结尾，导入中止。')
  }

  const companyLiteral = indent(JSON.stringify(company, null, 2), 2)
  const markerStart = markerMatch.index
  const updated = `${content.slice(0, markerStart)}\n${companyLiteral},${content.slice(markerStart)}`

  await fs.writeFile(companiesPath, updated, 'utf8')

  console.log(`已导入企业：${company.name}`)
  console.log(`新 id：${company.id}`)
  console.log(`预览路径：http://127.0.0.1:5173/companies/${company.id}`)
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
