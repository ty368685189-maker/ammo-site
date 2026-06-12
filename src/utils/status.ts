export type StatusTone = 'positive' | 'warning' | 'risk' | 'neutral'

export function getStatusTone(value?: string): StatusTone {
  if (value === '高' || value === '已核验') {
    return 'positive'
  }

  if (value === '中' || value === '部分核验') {
    return 'warning'
  }

  if (value === '低' || value === '过期待复查') {
    return 'risk'
  }

  return 'neutral'
}

export function statusPillStyle(value?: string) {
  const tone = getStatusTone(value)

  return {
    backgroundColor: `var(--status-${tone}-soft)`,
    borderColor: `var(--status-${tone}-border)`,
    color: `var(--status-${tone})`,
  }
}

export function countBy<TItem, TKey extends string>(
  items: readonly TItem[],
  read: (item: TItem) => TKey,
) {
  return items.reduce<Partial<Record<TKey, number>>>((counts, item) => {
    const key = read(item)
    counts[key] = (counts[key] || 0) + 1
    return counts
  }, {})
}
