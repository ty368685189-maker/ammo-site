export function enumOr(value, allowed, fallback) {
  return allowed.includes(value) ? value : fallback
}

export function stringOr(value, fallback = '待核对') {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

export function optionalString(value) {
  return typeof value === 'string' ? value.trim() : ''
}

export function arrayOfStrings(value) {
  if (!Array.isArray(value)) {
    return []
  }

  return value.filter((item) => typeof item === 'string' && item.trim()).map((item) => item.trim())
}

export function normalizeSearchTraceItem(item) {
  if (!item || typeof item !== 'object') {
    return null
  }

  return {
    round: Number.isFinite(Number(item.round)) ? Number(item.round) : 0,
    queries: arrayOfStrings(item.queries),
    usefulFindings: arrayOfStrings(item.usefulFindings),
    gaps: arrayOfStrings(item.gaps),
  }
}

export function normalizeSource(source) {
  if (!source || typeof source !== 'object' || !optionalString(source.url)) {
    return null
  }

  return {
    title: stringOr(source.title, '公开资料来源'),
    type: stringOr(source.type, '其他'),
    date: stringOr(source.date, '待核对'),
    url: optionalString(source.url),
  }
}

export function dedupeByUrl(items) {
  const seen = new Set()
  const result = []

  for (const item of items) {
    if (!item?.url || seen.has(item.url)) {
      continue
    }

    seen.add(item.url)
    result.push(item)
  }

  return result
}

export function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function extractStringField(text, field) {
  const match = text.match(new RegExp(`["']?${escapeRegExp(field)}["']?\\s*:\\s*(['"])(.*?)\\1`, 's'))
  return match ? match[2] : ''
}

export function findArrayItems(content, arrayStartText) {
  const arrayStart = content.indexOf(arrayStartText)

  if (arrayStart === -1) {
    throw new Error(`没有找到数组起点：${arrayStartText}`)
  }

  const assignment = content.indexOf('=', arrayStart)

  if (assignment === -1) {
    throw new Error('没有找到数组赋值符号。')
  }

  const openBracket = content.indexOf('[', assignment)

  if (openBracket === -1) {
    throw new Error('没有找到数组左方括号。')
  }

  const items = []
  let depth = 0
  let itemStart = -1
  let quote = ''
  let escaped = false

  for (let index = openBracket + 1; index < content.length; index += 1) {
    const char = content[index]

    if (quote) {
      if (escaped) {
        escaped = false
      } else if (char === '\\') {
        escaped = true
      } else if (char === quote) {
        quote = ''
      }
      continue
    }

    if (char === '"' || char === "'" || char === '`') {
      quote = char
      continue
    }

    if (char === ']' && depth === 0) {
      break
    }

    if (char === '{') {
      if (depth === 0) {
        itemStart = index
      }
      depth += 1
      continue
    }

    if (char === '}') {
      depth -= 1

      if (depth === 0 && itemStart !== -1) {
        items.push({
          start: itemStart,
          end: index + 1,
          text: content.slice(itemStart, index + 1),
        })
        itemStart = -1
      }
    }
  }

  return items
}

export function indent(text, spaces) {
  const prefix = ' '.repeat(spaces)
  return text
    .split('\n')
    .map((line) => `${prefix}${line}`)
    .join('\n')
}
