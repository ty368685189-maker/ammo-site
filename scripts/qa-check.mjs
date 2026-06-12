#!/usr/bin/env node

import fs from 'node:fs/promises'
import net from 'node:net'
import os from 'node:os'
import path from 'node:path'
import process from 'node:process'
import { spawn, spawnSync } from 'node:child_process'
import ts from 'typescript'
import { projectRoot } from './lib/research-utils.mjs'

const baseRoutePaths = [
  '/',
  '/about-major',
  '/about-major/curriculum',
  '/about-major/path',
  '/about-major/career',
  '/about-major/checklist',
  '/graduate',
  '/graduate/directions',
  '/graduate/compare',
  '/graduate/schools',
  '/graduate/timeline',
  '/universities',
  '/companies',
  '/about',
  '/no-such-page',
]

const viewports = [
  { name: 'desktop', width: 1365, height: 768, scale: 1, mobile: false },
  { name: 'mobile', width: 390, height: 844, scale: 1, mobile: true },
]

const allowedCompany = {
  ownership: new Set(['国企', '民企', '外企', '创业公司', '待核对']),
  schedule: new Set(['双休', '大小周', '单休', '待核对']),
  verificationStatus: new Set(['已核验', '部分核验', '过期待复查']),
  relevance: new Set(['高', '中', '低', '待核对']),
  researchRelevance: new Set(['高', '中', '低']),
}

const allowedUniversity = {
  tier: new Set(['985 / 211', '211', '普通本科']),
  verificationStatus: allowedCompany.verificationStatus,
  relevance: allowedCompany.relevance,
  researchRelevance: allowedCompany.researchRelevance,
}

const npmCommand = 'npm'
let nextCdpId = 1

function parseArgs(argv) {
  const args = argv.slice(2)

  return {
    skipBuild: args.includes('--skip-build'),
    skipAudit: args.includes('--skip-audit'),
    skipDataQuality: args.includes('--skip-data-quality'),
    skipBrowser: args.includes('--skip-browser'),
    requireBrowser: args.includes('--require-browser'),
    verboseRoutes: args.includes('--verbose-routes'),
  }
}

function printStep(title) {
  console.log(`\n== ${title} ==`)
}

function charLength(value) {
  return Array.from(String(value ?? '')).length
}

function isDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(value ?? ''))
}

function addIssue(issues, level, file, item, message) {
  issues.push({ level, file, item, message })
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

async function loadSiteData() {
  const [companyData, universityData] = await Promise.all([
    loadTsModule(path.join(projectRoot, 'src', 'data', 'companies.ts')),
    loadTsModule(path.join(projectRoot, 'src', 'data', 'universities.ts')),
  ])

  return {
    companies: companyData.companies,
    universities: universityData.universities,
  }
}

async function getRoutePaths() {
  const { companies, universities } = await loadSiteData()
  const dynamicRoutePaths = [
    ...universities.map((university) => `/universities/${university.id}`),
    ...companies.map((company) => `/companies/${company.id}`),
  ]

  return [...new Set([...baseRoutePaths, ...dynamicRoutePaths])]
}

function runCommand(label, command, args) {
  printStep(label)

  return new Promise((resolve, reject) => {
    const child = spawnCli(command, args, {
      cwd: projectRoot,
      stdio: 'inherit',
    })

    child.on('error', reject)
    child.on('close', (code) => {
      if (code === 0) {
        resolve()
        return
      }

      reject(new Error(`${label} 失败，退出码：${code}`))
    })
  })
}

function spawnCli(command, args, options) {
  if (process.platform === 'win32') {
    return spawn('cmd.exe', ['/d', '/s', '/c', [command, ...args].join(' ')], {
      ...options,
      shell: false,
    })
  }

  return spawn(command, args, {
    ...options,
    shell: false,
  })
}

async function validateData() {
  printStep('数据结构检查')

  const issues = []
  const { companies, universities } = await loadSiteData()
  const companyIds = new Set()
  const companyNames = new Set()
  const universityIds = new Set()
  const universityNames = new Set()

  for (const company of companies) {
    const item = `${company.id}:${company.name}`

    if (companyIds.has(company.id)) addIssue(issues, 'error', 'companies.ts', item, `企业 id 重复：${company.id}`)
    if (companyNames.has(company.name)) addIssue(issues, 'error', 'companies.ts', item, `企业名称重复：${company.name}`)
    companyIds.add(company.id)
    companyNames.add(company.name)

    if (!allowedCompany.ownership.has(company.ownership)) addIssue(issues, 'error', 'companies.ts', item, `ownership 不在枚举内：${company.ownership}`)
    if (!allowedCompany.schedule.has(company.schedule)) addIssue(issues, 'error', 'companies.ts', item, `schedule 不在枚举内：${company.schedule}`)
    if (charLength(company.description) > 40) addIssue(issues, 'error', 'companies.ts', item, `description 超过 40 字：${charLength(company.description)}`)
    if (!Array.isArray(company.links)) addIssue(issues, 'error', 'companies.ts', item, 'links 不是数组')
    for (const [index, link] of (company.links || []).entries()) {
      if (!String(link.url || '').trim()) addIssue(issues, 'error', 'companies.ts', item, `links[${index}] URL 为空`)
    }

    if (!company.verification) {
      addIssue(issues, 'error', 'companies.ts', item, '缺 verification')
    } else {
      if (!allowedCompany.verificationStatus.has(company.verification.status)) addIssue(issues, 'error', 'companies.ts', item, `verification.status 异常：${company.verification.status}`)
      if (!allowedCompany.relevance.has(company.verification.relevanceLevel)) addIssue(issues, 'error', 'companies.ts', item, `verification.relevanceLevel 异常：${company.verification.relevanceLevel}`)
      if (!isDate(company.verification.updatedAt)) addIssue(issues, 'error', 'companies.ts', item, `verification.updatedAt 不是 YYYY-MM-DD：${company.verification.updatedAt}`)
      if (!Array.isArray(company.verification.verifiedFields)) addIssue(issues, 'error', 'companies.ts', item, 'verifiedFields 不是数组')
      if (!Array.isArray(company.verification.pendingFields)) addIssue(issues, 'error', 'companies.ts', item, 'pendingFields 不是数组')
    }

    if (company.research) {
      const conclusionLength = charLength(company.research.conclusion)
      if (!isDate(company.research.updatedAt)) addIssue(issues, 'error', 'companies.ts', item, `research.updatedAt 不是 YYYY-MM-DD：${company.research.updatedAt}`)
      if (!allowedCompany.researchRelevance.has(company.research.relevanceLevel)) addIssue(issues, 'error', 'companies.ts', item, `research.relevanceLevel 异常：${company.research.relevanceLevel}`)
      if (conclusionLength < 80 || conclusionLength > 160) addIssue(issues, 'warn', 'companies.ts', item, `research.conclusion 建议 80-160 字，当前 ${conclusionLength} 字`)
      if (!Array.isArray(company.research.sources) || !company.research.sources.length) addIssue(issues, 'error', 'companies.ts', item, 'research.sources 缺失或为空')
      if ((company.research.sources || []).length < 5) addIssue(issues, 'warn', 'companies.ts', item, `企业调研来源建议 5 条以上，当前 ${(company.research.sources || []).length} 条`)
      for (const [index, source] of (company.research.sources || []).entries()) {
        if (!String(source.url || '').trim()) addIssue(issues, 'error', 'companies.ts', item, `research.sources[${index}] URL 为空`)
      }
    }
  }

  for (const university of universities) {
    const item = `${university.id}:${university.name}`

    if (universityIds.has(university.id)) addIssue(issues, 'error', 'universities.ts', item, `院校 id 重复：${university.id}`)
    if (universityNames.has(university.name)) addIssue(issues, 'error', 'universities.ts', item, `院校名称重复：${university.name}`)
    universityIds.add(university.id)
    universityNames.add(university.name)

    if (!allowedUniversity.tier.has(university.tier)) addIssue(issues, 'error', 'universities.ts', item, `tier 不在枚举内：${university.tier}`)
    if (charLength(university.overview) > 60) addIssue(issues, 'error', 'universities.ts', item, `overview 超过 60 字：${charLength(university.overview)}`)
    if (charLength(university.focus) > 35) addIssue(issues, 'error', 'universities.ts', item, `focus 超过 35 字：${charLength(university.focus)}`)
    if (!Array.isArray(university.links)) addIssue(issues, 'error', 'universities.ts', item, 'links 不是数组')
    for (const [index, link] of (university.links || []).entries()) {
      if (!String(link.url || '').trim()) addIssue(issues, 'error', 'universities.ts', item, `links[${index}] URL 为空`)
    }

    if (!university.verification) {
      addIssue(issues, 'error', 'universities.ts', item, '缺 verification')
    } else {
      if (!allowedUniversity.verificationStatus.has(university.verification.status)) addIssue(issues, 'error', 'universities.ts', item, `verification.status 异常：${university.verification.status}`)
      if (!allowedUniversity.relevance.has(university.verification.relevanceLevel)) addIssue(issues, 'error', 'universities.ts', item, `verification.relevanceLevel 异常：${university.verification.relevanceLevel}`)
      if (!isDate(university.verification.updatedAt)) addIssue(issues, 'error', 'universities.ts', item, `verification.updatedAt 不是 YYYY-MM-DD：${university.verification.updatedAt}`)
    }

    if (university.research) {
      const conclusionLength = charLength(university.research.conclusion)
      if (!isDate(university.research.updatedAt)) addIssue(issues, 'error', 'universities.ts', item, `research.updatedAt 不是 YYYY-MM-DD：${university.research.updatedAt}`)
      if (!allowedUniversity.researchRelevance.has(university.research.relevanceLevel)) addIssue(issues, 'error', 'universities.ts', item, `research.relevanceLevel 异常：${university.research.relevanceLevel}`)
      if (conclusionLength < 80 || conclusionLength > 160) addIssue(issues, 'warn', 'universities.ts', item, `research.conclusion 建议 80-160 字，当前 ${conclusionLength} 字`)
      if (!Array.isArray(university.research.sources) || !university.research.sources.length) addIssue(issues, 'error', 'universities.ts', item, 'research.sources 缺失或为空')
      if ((university.research.sources || []).length < 6) addIssue(issues, 'warn', 'universities.ts', item, `院校调研来源建议 6 条以上，当前 ${(university.research.sources || []).length} 条`)
      for (const [index, source] of (university.research.sources || []).entries()) {
        if (!String(source.url || '').trim()) addIssue(issues, 'error', 'universities.ts', item, `research.sources[${index}] URL 为空`)
      }
    }
  }

  const errors = issues.filter((issue) => issue.level === 'error')
  const warnings = issues.filter((issue) => issue.level === 'warn')

  for (const issue of issues) {
    console.log(`${issue.level === 'error' ? '错误' : '提示'}：${issue.file} / ${issue.item} / ${issue.message}`)
  }

  console.log(`数据条目：企业 ${companies.length} 家，院校 ${universities.length} 所。错误 ${errors.length} 个，提示 ${warnings.length} 个。`)

  if (errors.length) {
    throw new Error('数据结构检查未通过。')
  }
}

function findFreePort(startPort) {
  return new Promise((resolve, reject) => {
    const server = net.createServer()
    server.unref()
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE' || error.code === 'EACCES') {
        findFreePort(startPort + 1).then(resolve, reject)
        return
      }
      reject(error)
    })
    server.listen(startPort, '127.0.0.1', () => {
      const port = server.address().port
      server.close(() => resolve(port))
    })
  })
}

async function waitForHttp(url, timeoutMs = 15000) {
  const startedAt = Date.now()

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url)
      if (response.ok) return
    } catch {
      // Preview server is still warming up.
    }
    await new Promise((resolve) => setTimeout(resolve, 250))
  }

  throw new Error(`等待预览服务超时：${url}`)
}

function findChromeExecutable() {
  const candidates = [
    process.env.CHROME_PATH,
    process.env.GOOGLE_CHROME_BIN,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ].filter(Boolean)

  for (const candidate of candidates) {
    try {
      spawnSync(candidate, ['--version'], { stdio: 'ignore' })
      return candidate
    } catch {
      // Try the next common path.
    }
  }

  return ''
}

function stopProcessTree(child) {
  if (!child?.pid) return

  if (process.platform === 'win32') {
    spawnSync('taskkill', ['/pid', String(child.pid), '/t', '/f'], { stdio: 'ignore' })
    return
  }

  child.kill('SIGTERM')
}

function connectCdp(wsUrl) {
  if (typeof WebSocket === 'undefined') {
    throw new Error('当前 Node 版本没有 WebSocket，无法执行浏览器路由检查。')
  }

  const socket = new WebSocket(wsUrl)
  const pending = new Map()
  const listeners = new Map()

  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data)

    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id)
      pending.delete(message.id)
      if (message.error) reject(new Error(message.error.message || JSON.stringify(message.error)))
      else resolve(message.result || {})
      return
    }

    const callbacks = listeners.get(message.method) || []
    for (const callback of callbacks) callback(message.params || {})
  })

  return new Promise((resolve, reject) => {
    socket.addEventListener('open', () => {
      resolve({
        socket,
        send(method, params = {}) {
          const id = nextCdpId++
          socket.send(JSON.stringify({ id, method, params }))
          return new Promise((resolve, reject) => pending.set(id, { resolve, reject }))
        },
        on(method, callback) {
          listeners.set(method, [...(listeners.get(method) || []), callback])
        },
        once(method, timeoutMs = 10000) {
          return new Promise((resolve, reject) => {
            const timer = setTimeout(() => reject(new Error(`等待 ${method} 超时`)), timeoutMs)
            const callback = (params) => {
              clearTimeout(timer)
              const callbacks = listeners.get(method) || []
              listeners.set(method, callbacks.filter((item) => item !== callback))
              resolve(params)
            }
            listeners.set(method, [...(listeners.get(method) || []), callback])
          })
        },
        close() {
          socket.close()
        },
      })
    })
    socket.addEventListener('error', reject)
  })
}

async function createCdpTarget(cdpBase, url) {
  let response = await fetch(`${cdpBase}/json/new?${encodeURIComponent(url)}`, { method: 'PUT' })

  if (!response.ok) {
    response = await fetch(`${cdpBase}/json/new?${encodeURIComponent(url)}`)
  }

  if (!response.ok) {
    throw new Error(`创建浏览器标签页失败：HTTP ${response.status}`)
  }

  return response.json()
}

async function checkBrowserRoute(cdpBase, baseUrl, route, viewport) {
  const target = await createCdpTarget(cdpBase, 'about:blank')
  const client = await connectCdp(target.webSocketDebuggerUrl)
  const consoleErrors = []

  try {
    await client.send('Page.enable')
    await client.send('Runtime.enable')
    await client.send('Log.enable')
    client.on('Runtime.consoleAPICalled', (params) => {
      if (params.type === 'error') consoleErrors.push('console.error')
    })
    client.on('Runtime.exceptionThrown', (params) => {
      consoleErrors.push(params.exceptionDetails?.text || 'runtime exception')
    })
    client.on('Log.entryAdded', (params) => {
      if (params.entry?.level === 'error') consoleErrors.push(params.entry.text || 'log error')
    })
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: viewport.scale,
      mobile: viewport.mobile,
    })

    const loaded = client.once('Page.loadEventFired', 10000).catch(() => null)
    await client.send('Page.navigate', { url: `${baseUrl}${route}` })
    await loaded
    await new Promise((resolve) => setTimeout(resolve, 350))

    const evaluated = await client.send('Runtime.evaluate', {
      returnByValue: true,
      expression: `(() => {
        const root = document.documentElement;
        const body = document.body;
        const h1 = document.querySelector('h1')?.innerText || '';
        const text = body.innerText || '';
        const externalWithoutNoopener = [...document.querySelectorAll('a[target="_blank"]')]
          .filter((link) => !String(link.rel || '').includes('noopener')).length;
        const missingImageCount = [...document.images].filter((img) => !img.complete || img.naturalWidth === 0).length;
        return {
          title: document.title,
          h1,
          blank: text.trim().length < 20,
          scrollWidth: root.scrollWidth,
          clientWidth: root.clientWidth,
          bodyScrollWidth: body.scrollWidth,
          externalWithoutNoopener,
          missingImageCount
        };
      })()`,
    })

    const value = evaluated.result?.value || {}
    const overflow = Math.max(value.scrollWidth || 0, value.bodyScrollWidth || 0) > (value.clientWidth || viewport.width) + 1

    return {
      route,
      viewport: viewport.name,
      title: value.title || '',
      h1: value.h1 || '',
      blank: Boolean(value.blank),
      overflow,
      width: `${value.scrollWidth || 0}/${value.clientWidth || 0}`,
      missingImageCount: value.missingImageCount || 0,
      externalWithoutNoopener: value.externalWithoutNoopener || 0,
      consoleErrorCount: consoleErrors.length,
    }
  } finally {
    client.close()
    await fetch(`${cdpBase}/json/close/${target.id}`).catch(() => null)
  }
}

async function runBrowserChecks({ requireBrowser, verboseRoutes }) {
  printStep('关键路由浏览器检查')

  const chromeExecutable = findChromeExecutable()

  if (!chromeExecutable) {
    const message = '未找到 Chrome / Edge，可跳过浏览器路由检查；安装 Chrome 后可检查移动端横向滚动。'
    if (requireBrowser) throw new Error(message)
    console.warn(`提示：${message}`)
    return
  }

  const previewPort = await findFreePort(4173)
  const cdpPort = await findFreePort(9223)
  const baseUrl = `http://127.0.0.1:${previewPort}`
  const cdpBase = `http://127.0.0.1:${cdpPort}`
  const chromeUserDataDir = path.join(projectRoot, `.chrome-cdp-qa-${Date.now()}`)
  let previewProcess
  let chromeProcess

  try {
    previewProcess = spawnCli(npmCommand, ['run', 'preview', '--', '--host', '127.0.0.1', '--port', String(previewPort)], {
      cwd: projectRoot,
      stdio: 'ignore',
    })
    await waitForHttp(baseUrl)

    chromeProcess = spawn(chromeExecutable, [
      '--headless=new',
      `--remote-debugging-port=${cdpPort}`,
      `--user-data-dir=${chromeUserDataDir}`,
      '--disable-gpu',
      '--no-first-run',
      '--no-default-browser-check',
      'about:blank',
    ], {
      cwd: projectRoot,
      stdio: 'ignore',
      shell: false,
    })
    await waitForHttp(`${cdpBase}/json/version`)

    const results = []
    const routePaths = await getRoutePaths()
    for (const viewport of viewports) {
      for (const route of routePaths) {
        results.push(await checkBrowserRoute(cdpBase, baseUrl, route, viewport))
      }
    }

    const failed = results.filter(
      (item) =>
        item.blank ||
        item.overflow ||
        item.missingImageCount ||
        item.externalWithoutNoopener ||
        item.consoleErrorCount,
    )
    const reportDir = path.join(projectRoot, 'qa-screenshots')
    const reportPath = path.join(reportDir, 'auto-route-check.json')
    await fs.mkdir(reportDir, { recursive: true })
    await fs.writeFile(reportPath, `${JSON.stringify({ generatedAt: new Date().toISOString(), results, failed }, null, 2)}\n`, 'utf8')

    const routeRows = results.map(({ route, viewport, h1, blank, overflow, missingImageCount, externalWithoutNoopener, consoleErrorCount }) => ({
      route,
      viewport,
      h1,
      blank,
      overflow,
      missingImageCount,
      externalWithoutNoopener,
      consoleErrorCount,
    }))
    const failedRows = routeRows.filter(
      (item) =>
        item.blank ||
        item.overflow ||
        item.missingImageCount ||
        item.externalWithoutNoopener ||
        item.consoleErrorCount,
    )
    const routeSummary = {
      fixedRoutes: baseRoutePaths.length,
      universityDetails: routePaths.filter((route) => route.startsWith('/universities/')).length,
      companyDetails: routePaths.filter((route) => route.startsWith('/companies/')).length,
      viewports: viewports.length,
      checks: results.length,
    }

    console.table([routeSummary])
    if (verboseRoutes) {
      console.table(routeRows)
    } else if (failedRows.length) {
      console.table(failedRows)
    } else {
      console.log('路由明细：全部通过；如需查看全表，运行 npm run qa -- --verbose-routes')
    }
    console.log(`路由检查：${results.length} 项，失败 ${failed.length} 项。报告：${path.relative(projectRoot, reportPath)}`)

    if (failed.length) {
      throw new Error('浏览器路由检查未通过。')
    }
  } finally {
    stopProcessTree(chromeProcess)
    stopProcessTree(previewProcess)
    await new Promise((resolve) => setTimeout(resolve, 500))
    await fs.rm(chromeUserDataDir, { recursive: true, force: true }).catch(() => null)
  }
}

async function main() {
  const options = parseArgs(process.argv)

  if (!options.skipBuild) {
    await runCommand('构建检查', npmCommand, ['run', 'build'])
  }

  if (!options.skipAudit) {
    await runCommand('依赖审计', npmCommand, ['audit', '--omit=dev'])
  }

  await validateData()

  if (!options.skipDataQuality) {
    await runCommand('内容质量扫描', npmCommand, ['run', 'check:data-quality'])
  }

  if (!options.skipBrowser) {
    await runBrowserChecks(options)
  }

  console.log('\nQA 完成：没有发现阻塞问题。')
}

main().catch((error) => {
  console.error(`\nQA 失败：${error.message}`)
  process.exit(1)
})
