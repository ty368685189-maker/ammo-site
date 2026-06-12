#!/usr/bin/env node

import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import ts from 'typescript'
import { projectRoot } from './lib/research-utils.mjs'

const allowedCompany = {
  ownership: new Set(['国企', '民企', '外企', '创业公司', '待核对']),
  schedule: new Set(['双休', '大小周', '单休', '待核对']),
  linkType: new Set(['官网', '招聘入口', '招聘公告', '公众号', '抖音号', '视频号', '新闻资料', '政府资料', '学校就业网', '其他']),
  verificationStatus: new Set(['已核验', '部分核验', '过期待复查']),
  relevance: new Set(['高', '中', '低', '待核对']),
  researchRelevance: new Set(['高', '中', '低']),
}

const allowedUniversity = {
  tier: new Set(['985 / 211', '211', '普通本科']),
  linkType: new Set(['学校官网', '招生网', '学院官网', '招生目录', '就业报告', '教学质量报告', '研究生招生', '新闻资料', '其他']),
  verificationStatus: allowedCompany.verificationStatus,
  relevance: allowedCompany.relevance,
  researchRelevance: allowedCompany.researchRelevance,
}

const carefulWords = [
  '显著影响力',
  '就业竞争力强',
  '顶级平台',
  '强校',
  '高平台',
  '赋能',
  '打造',
  '助力',
]

const hardFactWords = [
  '就业率',
  '升学率',
  '录取分数',
  '分数线',
  '招生人数',
  '薪资',
  '作息',
  '双休',
  '大小周',
  '单休',
  '行政处罚',
  '处罚记录',
  '高新技术企业',
]

const uncertaintyWords = [
  '待核对',
  '待复查',
  '核对',
  '复核',
  '复查',
  '需核对',
  '需复核',
  '需要核对',
  '需要复核',
  '未逐项',
  '未核验',
  '未找到',
  '未形成',
  '不能',
  '不应',
  '不要',
  '样本',
  '线索',
  '入口',
  '风险',
  '为准',
  '不代表',
]

function charLength(value) {
  return Array.from(String(value ?? '')).length
}

function isDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(value ?? ''))
}

function addIssue(issues, level, scope, item, field, message) {
  issues.push({ level, scope, item, field, message })
}

function textHasAny(text, words) {
  return words.some((word) => String(text).includes(word))
}

function looksUncertain(text) {
  return textHasAny(text, uncertaintyWords)
}

async function loadTsModule(filePath) {
  const source = await fs.readFile(filePath, 'utf8')
  const js = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
      verbatimModuleSyntax: false,
    },
  }).outputText

  return import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`)
}

function checkUrls(issues, scope, item, label, entries, allowedTypes) {
  const seen = new Map()

  for (const [index, entry] of (entries || []).entries()) {
    const url = String(entry?.url || '').trim()
    const type = String(entry?.type || '').trim()
    const field = `${label}[${index}]`

    if (!url) {
      addIssue(issues, 'error', scope, item, field, 'URL 为空。')
      continue
    }

    if (!/^https?:\/\//i.test(url)) {
      addIssue(issues, 'warn', scope, item, field, `URL 不是 http/https：${url}`)
    }

    if (seen.has(url)) {
      addIssue(issues, 'warn', scope, item, field, `重复 URL，首次出现于 ${label}[${seen.get(url)}]。`)
    } else {
      seen.set(url, index)
    }

    if (allowedTypes && !allowedTypes.has(type)) {
      addIssue(issues, 'warn', scope, item, field, `来源类型不在推荐枚举内：${type || '空'}`)
    }
  }
}

function checkPublicText(issues, scope, item, fields) {
  for (const [field, value] of fields) {
    const text = String(value || '')

    for (const word of carefulWords) {
      if (text.includes(word)) {
        addIssue(issues, 'warn', scope, item, field, `可能偏宣传或过满：${word}`)
      }
    }

    for (const word of hardFactWords) {
      if (text.includes(word) && !looksUncertain(text)) {
        addIssue(issues, 'warn', scope, item, field, `硬信息出现但缺少待核对边界：${word}`)
      }
    }
  }
}

function checkCompany(company, issues) {
  const item = `${company.id}:${company.name}`

  if (!allowedCompany.ownership.has(company.ownership)) {
    addIssue(issues, 'error', 'companies', item, 'ownership', `枚举不合规：${company.ownership}`)
  }
  if (!allowedCompany.schedule.has(company.schedule)) {
    addIssue(issues, 'error', 'companies', item, 'schedule', `枚举不合规：${company.schedule}`)
  }
  if (charLength(company.description) > 40) {
    addIssue(issues, 'error', 'companies', item, 'description', `超过 40 字，当前 ${charLength(company.description)} 字。`)
  }
  if (company.salaryRange !== '未知' && /(\d+(\.\d+)?\s*[kK]|元|万|\/月)/.test(company.salaryRange) && !looksUncertain(company.salaryRange)) {
    addIssue(issues, 'warn', 'companies', item, 'salaryRange', '薪资含具体数字，但没有标明样本或待核对。')
  }
  if (company.schedule !== '待核对') {
    addIssue(issues, 'warn', 'companies', item, 'schedule', '作息不是“待核对”，需确认有强/中来源支撑。')
  }

  checkUrls(issues, 'companies', item, 'links', company.links, allowedCompany.linkType)

  if (!company.verification) {
    addIssue(issues, 'error', 'companies', item, 'verification', '缺 verification。')
  } else {
    if (!allowedCompany.verificationStatus.has(company.verification.status)) {
      addIssue(issues, 'error', 'companies', item, 'verification.status', `枚举不合规：${company.verification.status}`)
    }
    if (!allowedCompany.relevance.has(company.verification.relevanceLevel)) {
      addIssue(issues, 'error', 'companies', item, 'verification.relevanceLevel', `枚举不合规：${company.verification.relevanceLevel}`)
    }
    if (!isDate(company.verification.updatedAt)) {
      addIssue(issues, 'error', 'companies', item, 'verification.updatedAt', `日期不是 YYYY-MM-DD：${company.verification.updatedAt}`)
    }
    checkPublicText(issues, 'companies', item, [
      ['verification.summary', company.verification.summary],
      ...company.verification.verifiedFields.map((field, index) => [`verification.verifiedFields[${index}]`, field]),
    ])
  }

  if (!company.research) {
    addIssue(issues, 'warn', 'companies', item, 'research', '缺 research，详情页会缺少调研来源。')
    return
  }

  const conclusionLength = charLength(company.research.conclusion)
  if (!isDate(company.research.updatedAt)) {
    addIssue(issues, 'error', 'companies', item, 'research.updatedAt', `日期不是 YYYY-MM-DD：${company.research.updatedAt}`)
  }
  if (!allowedCompany.researchRelevance.has(company.research.relevanceLevel)) {
    addIssue(issues, 'error', 'companies', item, 'research.relevanceLevel', `枚举不合规：${company.research.relevanceLevel}`)
  }
  if (conclusionLength < 80 || conclusionLength > 160) {
    addIssue(issues, 'warn', 'companies', item, 'research.conclusion', `建议 80-160 字，当前 ${conclusionLength} 字。`)
  }
  if ((company.research.sources || []).length < 5) {
    addIssue(issues, 'warn', 'companies', item, 'research.sources', `企业调研来源建议 5 条以上，当前 ${(company.research.sources || []).length} 条。`)
  }

  checkUrls(issues, 'companies', item, 'research.sources', company.research.sources, allowedCompany.linkType)
  checkPublicText(issues, 'companies', item, [
    ['description', company.description],
    ['positions', company.positions],
    ['education', company.education],
    ['research.status', company.research.status],
    ['research.conclusion', company.research.conclusion],
    ...company.research.keySignals.map((field, index) => [`research.keySignals[${index}]`, field]),
  ])
}

function checkUniversity(university, issues) {
  const item = `${university.id}:${university.name}`

  if (!allowedUniversity.tier.has(university.tier)) {
    addIssue(issues, 'error', 'universities', item, 'tier', `枚举不合规：${university.tier}`)
  }
  if (charLength(university.overview) > 60) {
    addIssue(issues, 'error', 'universities', item, 'overview', `超过 60 字，当前 ${charLength(university.overview)} 字。`)
  }
  if (charLength(university.focus) > 35) {
    addIssue(issues, 'error', 'universities', item, 'focus', `超过 35 字，当前 ${charLength(university.focus)} 字。`)
  }
  if (university.tier !== '普通本科' && university.tags?.includes('普通本科')) {
    addIssue(issues, 'warn', 'universities', item, 'tags', '层次标签与 tier 可能冲突。')
  }

  checkUrls(issues, 'universities', item, 'links', university.links, allowedUniversity.linkType)

  if (!university.verification) {
    addIssue(issues, 'error', 'universities', item, 'verification', '缺 verification。')
  } else {
    if (!allowedUniversity.verificationStatus.has(university.verification.status)) {
      addIssue(issues, 'error', 'universities', item, 'verification.status', `枚举不合规：${university.verification.status}`)
    }
    if (!allowedUniversity.relevance.has(university.verification.relevanceLevel)) {
      addIssue(issues, 'error', 'universities', item, 'verification.relevanceLevel', `枚举不合规：${university.verification.relevanceLevel}`)
    }
    if (!isDate(university.verification.updatedAt)) {
      addIssue(issues, 'error', 'universities', item, 'verification.updatedAt', `日期不是 YYYY-MM-DD：${university.verification.updatedAt}`)
    }
    checkPublicText(issues, 'universities', item, [
      ['verification.summary', university.verification.summary],
      ...university.verification.verifiedFields.map((field, index) => [`verification.verifiedFields[${index}]`, field]),
    ])
  }

  if (!university.research) {
    addIssue(issues, 'warn', 'universities', item, 'research', '缺 research，详情页会缺少调研来源。')
    return
  }

  const conclusionLength = charLength(university.research.conclusion)
  if (!isDate(university.research.updatedAt)) {
    addIssue(issues, 'error', 'universities', item, 'research.updatedAt', `日期不是 YYYY-MM-DD：${university.research.updatedAt}`)
  }
  if (!allowedUniversity.researchRelevance.has(university.research.relevanceLevel)) {
    addIssue(issues, 'error', 'universities', item, 'research.relevanceLevel', `枚举不合规：${university.research.relevanceLevel}`)
  }
  if (conclusionLength < 80 || conclusionLength > 160) {
    addIssue(issues, 'warn', 'universities', item, 'research.conclusion', `建议 80-160 字，当前 ${conclusionLength} 字。`)
  }
  if ((university.research.sources || []).length < 6) {
    addIssue(issues, 'warn', 'universities', item, 'research.sources', `院校调研来源建议 6 条以上，当前 ${(university.research.sources || []).length} 条。`)
  }

  checkUrls(issues, 'universities', item, 'research.sources', university.research.sources, allowedUniversity.linkType)
  checkPublicText(issues, 'universities', item, [
    ['overview', university.overview],
    ['focus', university.focus],
    ['research.status', university.research.status],
    ['research.conclusion', university.research.conclusion],
    ...university.research.keySignals.map((field, index) => [`research.keySignals[${index}]`, field]),
  ])
}

async function main() {
  const issues = []
  const { companies } = await loadTsModule(path.join(projectRoot, 'src', 'data', 'companies.ts'))
  const { universities } = await loadTsModule(path.join(projectRoot, 'src', 'data', 'universities.ts'))

  const companyIds = new Set()
  const companyNames = new Set()
  const universityIds = new Set()
  const universityNames = new Set()

  for (const company of companies) {
    if (companyIds.has(company.id)) addIssue(issues, 'error', 'companies', company.name, 'id', `企业 id 重复：${company.id}`)
    if (companyNames.has(company.name)) addIssue(issues, 'error', 'companies', company.name, 'name', `企业名称重复：${company.name}`)
    companyIds.add(company.id)
    companyNames.add(company.name)
    checkCompany(company, issues)
  }

  for (const university of universities) {
    if (universityIds.has(university.id)) addIssue(issues, 'error', 'universities', university.name, 'id', `院校 id 重复：${university.id}`)
    if (universityNames.has(university.name)) addIssue(issues, 'error', 'universities', university.name, 'name', `院校名称重复：${university.name}`)
    universityIds.add(university.id)
    universityNames.add(university.name)
    checkUniversity(university, issues)
  }

  const errors = issues.filter((issue) => issue.level === 'error')
  const warnings = issues.filter((issue) => issue.level === 'warn')

  for (const issue of issues) {
    const label = issue.level === 'error' ? '错误' : '提示'
    console.log(`${label}：${issue.scope} / ${issue.item} / ${issue.field} / ${issue.message}`)
  }

  console.log(`\n数据质量扫描完成：企业 ${companies.length} 家，院校 ${universities.length} 所。错误 ${errors.length} 个，提示 ${warnings.length} 个。`)

  if (errors.length) {
    process.exitCode = 1
  }
}

main().catch((error) => {
  console.error(`数据质量扫描失败：${error.message}`)
  process.exit(1)
})
