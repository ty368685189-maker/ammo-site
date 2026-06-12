<script setup lang="ts">
type SourceItem = {
  title: string
  type: string
  date: string
  url: string
}

defineProps<{
  sources: readonly SourceItem[]
  title?: string
}>()
</script>

<template>
  <div v-if="sources.length" class="mt-6 border-t pt-5" :style="{ borderColor: 'var(--border)' }">
    <p class="text-sm font-medium text-[var(--text-primary)]">{{ title || '调研来源' }}</p>
    <div class="mt-3 overflow-hidden rounded-lg border" :style="{ borderColor: 'var(--border)' }">
      <a
        v-for="source in sources"
        :key="source.url"
        :href="source.url"
        target="_blank"
        rel="noopener noreferrer"
        class="grid gap-2 border-b px-4 py-3 text-sm transition last:border-b-0 hover:bg-[var(--surface)] md:grid-cols-[minmax(0,1fr)_8rem_7rem]"
        :style="{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
          color: 'var(--text-primary)',
        }"
      >
        <span class="font-medium leading-6">{{ source.title }}</span>
        <span class="text-[var(--text-tertiary)]">{{ source.type }}</span>
        <span class="text-[var(--text-tertiary)]">{{ source.date }}</span>
      </a>
    </div>
  </div>
</template>
