import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')

export async function loadLocalEnv() {
  const envPath = path.join(projectRoot, '.env.local')

  try {
    const content = await fs.readFile(envPath, 'utf8')

    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim()

      if (!trimmed || trimmed.startsWith('#')) {
        continue
      }

      const equalsIndex = trimmed.indexOf('=')

      if (equalsIndex === -1) {
        continue
      }

      const key = trimmed.slice(0, equalsIndex).trim()
      const value = trimmed.slice(equalsIndex + 1).trim()

      if (key && !process.env[key]) {
        process.env[key] = value
      }
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error
    }
  }
}

export function getTodayInChina() {
  return new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date())
}

export function getTimestampForFile() {
  return new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
    .format(new Date())
    .replace(/[ :]/g, '-')
}

export function sanitizeFileName(input) {
  return input.replace(/[<>:"/\\|?*\u0000-\u001F]/g, '-').replace(/\s+/g, ' ').trim()
}

export function parseCliTarget(argv, label) {
  const args = argv.slice(2)

  if (args.includes('--help') || args.includes('-h')) {
    return { help: true }
  }

  const positional = args.filter((arg) => !arg.startsWith('--'))
  const target = positional.join(' ').trim()

  if (!target) {
    throw new Error(`请提供${label}名称。`)
  }

  return { target }
}

export async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true })
}

export async function writeJsonFile(filePath, data) {
  await ensureDir(path.dirname(filePath))
  await fs.writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
}

export function extractJsonObject(text) {
  const trimmed = text.trim()

  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    return JSON.parse(trimmed)
  }

  const fencedMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/)

  if (fencedMatch) {
    return JSON.parse(fencedMatch[1])
  }

  const firstBrace = trimmed.indexOf('{')

  if (firstBrace === -1) {
    throw new Error('模型没有返回 JSON 对象。')
  }

  let depth = 0
  let inString = false
  let escaped = false

  for (let index = firstBrace; index < trimmed.length; index += 1) {
    const char = trimmed[index]

    if (escaped) {
      escaped = false
      continue
    }

    if (char === '\\') {
      escaped = true
      continue
    }

    if (char === '"') {
      inString = !inString
      continue
    }

    if (inString) {
      continue
    }

    if (char === '{') {
      depth += 1
    } else if (char === '}') {
      depth -= 1

      if (depth === 0) {
        return JSON.parse(trimmed.slice(firstBrace, index + 1))
      }
    }
  }

  throw new Error('模型返回里找到了 JSON 开头，但没有完整闭合。')
}
