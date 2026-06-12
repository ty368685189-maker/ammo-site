<script setup lang="ts">
import { useRoute } from 'vue-router'

type NavItem = {
  label: string
  to: string
}

defineProps<{
  items: NavItem[]
  ariaLabelText: string
}>()

const route = useRoute()
</script>

<template>
  <header
    class="fixed left-1/2 top-28 z-50 w-[calc(100%-1rem)] max-w-6xl -translate-x-1/2 rounded-lg border px-3 py-2 backdrop-blur-xl sm:w-[calc(100%-2rem)] md:top-20"
    :style="{
      backgroundColor: 'var(--surface)',
      borderColor: 'var(--border)',
      boxShadow: 'var(--glass-shadow)',
    }"
  >
    <div class="flex min-w-0 items-center gap-2">
      <nav class="w-full min-w-0 overflow-x-auto" :aria-label="ariaLabelText">
        <div class="flex w-max min-w-full items-center gap-2">
          <RouterLink
            v-for="item in items"
            :key="item.to"
            :to="item.to"
            class="shrink-0 rounded-lg px-3 py-1.5 text-sm transition hover:-translate-y-0.5"
            :style="{
              backgroundColor: route.path === item.to ? 'var(--accent-soft)' : 'var(--surface-strong)',
              color: route.path === item.to ? 'var(--accent)' : 'var(--text-secondary)',
            }"
          >
            {{ item.label }}
          </RouterLink>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
nav {
  scrollbar-width: none;
}

nav::-webkit-scrollbar {
  display: none;
}
</style>
