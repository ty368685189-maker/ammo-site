<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  src?: string
  name: string
}>()

const failed = ref(false)

watch(
  () => props.src,
  () => {
    failed.value = false
  },
)

const fallbackText = computed(() => {
  const cleanName = props.name.replace(/大学|学院|（北京）|\(北京\)/g, '').trim()
  return Array.from(cleanName || props.name).slice(0, 2).join('')
})
</script>

<template>
  <div class="flex h-full w-full items-center justify-center overflow-hidden">
    <img
      v-if="src && !failed"
      :src="src"
      :alt="name"
      class="max-h-full max-w-full object-contain"
      @error="failed = true"
    />
    <span
      v-else
      class="flex h-full w-full items-center justify-center text-center text-xs font-semibold leading-tight text-[var(--text-secondary)]"
    >
      {{ fallbackText }}
    </span>
  </div>
</template>
