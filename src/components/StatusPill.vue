<script setup lang="ts">
import { computed } from 'vue'
import { statusPillStyle } from '../utils/status'

const props = withDefaults(
  defineProps<{
    value?: string
    prefix?: string
    size?: 'xs' | 'sm'
  }>(),
  {
    size: 'sm',
  },
)

const label = computed(() => {
  const value = props.value || '待核对'

  return props.prefix ? `${props.prefix} ${value}` : value
})

const pillClass = computed(() =>
  props.size === 'xs'
    ? 'rounded-lg border px-2.5 py-1 text-xs font-medium'
    : 'rounded-lg border px-3 py-1 text-sm font-medium',
)
</script>

<template>
  <span :class="pillClass" :style="statusPillStyle(value)">
    {{ label }}
  </span>
</template>
