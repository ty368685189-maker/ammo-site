<script setup lang="ts">
import TopicNav from '../components/TopicNav.vue'
import { majorCheckItems, majorNavItems, majorSourceLinks } from '../data/aboutMajor'
</script>

<template>
  <section class="topic-page min-h-screen overflow-x-hidden bg-[var(--page-bg)] px-5 pb-12 pt-40 text-[var(--text-primary)] sm:px-6">
    <TopicNav :items="majorNavItems" ariaLabelText="专业介绍导航" />

    <main class="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <header class="border-b pb-8" :style="{ borderColor: 'var(--border)' }">
        <p class="text-sm tracking-[0.14em] text-[var(--text-tertiary)]">报考前核对</p>
        <h1 class="mt-3 text-3xl font-semibold leading-tight text-[var(--text-primary)] md:text-4xl">
          报考前先看哪些信息
        </h1>
        <p class="mt-4 max-w-3xl text-sm leading-7 text-[var(--text-secondary)] md:text-base">
          重点看学院归属、培养方向、去向和城市环境是不是和自己的预期一致。
        </p>
      </header>

      <section
        class="overflow-hidden rounded-lg border"
        :style="{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--glass-shadow)' }"
      >
        <article
          v-for="(item, index) in majorCheckItems"
          :key="item.label"
          class="grid gap-3 border-b px-5 py-4 last:border-b-0 md:grid-cols-[3.5rem_9rem_minmax(0,1fr)] md:items-start"
          :style="{ borderColor: 'var(--border)' }"
        >
          <p class="text-sm font-medium text-[var(--accent)]">
            {{ String(index + 1).padStart(2, '0') }}
          </p>
          <h2 class="text-base font-semibold text-[var(--text-primary)]">
            {{ item.label }}
          </h2>
          <p class="text-sm leading-7 text-[var(--text-secondary)]">
            {{ item.detail }}
          </p>
        </article>
      </section>

      <details class="rounded-lg border p-4" :style="{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }">
        <summary class="flex cursor-pointer list-none items-center justify-between gap-3">
          <span>
            <span class="block text-sm tracking-[0.14em] text-[var(--text-tertiary)]">资料来源</span>
            <span class="mt-1 block text-sm leading-6 text-[var(--text-secondary)]">
              页面内容按公开专业目录和高校专业介绍整理。
            </span>
          </span>
          <span class="shrink-0 rounded-lg px-3 py-1 text-sm text-[var(--accent)]" :style="{ backgroundColor: 'var(--accent-soft)' }">
            {{ majorSourceLinks.length }} 项
          </span>
        </summary>

        <div class="mt-4 grid gap-3 md:grid-cols-3">
          <a
            v-for="source in majorSourceLinks"
            :key="source.url"
            :href="source.url"
            target="_blank"
            rel="noopener noreferrer"
            class="rounded-lg border p-4 text-sm transition hover:-translate-y-0.5"
            :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)', color: 'var(--text-primary)' }"
          >
            <span class="block font-medium leading-6">{{ source.title }}</span>
            <span class="mt-2 block leading-6 text-[var(--text-tertiary)]">
              {{ source.meta }}
            </span>
          </a>
        </div>
      </details>
    </main>
  </section>
</template>
