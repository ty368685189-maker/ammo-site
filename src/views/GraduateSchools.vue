<script setup lang="ts">
import TopicNav from '../components/TopicNav.vue'
import { graduateNavItems, graduateSchoolSignals, graduateSourceLinks } from '../data/graduate'
</script>

<template>
  <section class="topic-page min-h-screen overflow-x-hidden bg-[var(--page-bg)] px-5 pb-12 pt-40 text-[var(--text-primary)] sm:px-6">
    <TopicNav :items="graduateNavItems" ariaLabelText="考研方向导航" />

    <main class="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <header class="border-b pb-8" :style="{ borderColor: 'var(--border)' }">
        <p class="text-sm tracking-[0.14em] text-[var(--text-tertiary)]">院校列表</p>
        <h1 class="mt-3 text-3xl font-semibold leading-tight text-[var(--text-primary)] md:text-4xl">
          常见院校与院所
        </h1>
        <p class="mt-4 max-w-3xl text-sm leading-7 text-[var(--text-secondary)] md:text-base">
          先看专业入口、招生目录和研究生招生页，再判断是不是值得继续深挖。
        </p>
      </header>

      <section
        class="overflow-hidden rounded-lg border"
        :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)' }"
      >
        <div
          class="hidden grid-cols-[minmax(12rem,0.65fr)_minmax(0,1fr)_minmax(0,1fr)_8rem] gap-4 border-b px-5 py-3 text-xs text-[var(--text-tertiary)] xl:grid"
          :style="{ borderColor: 'var(--border)' }"
        >
          <span>院校 / 院所</span>
          <span>方向信号</span>
          <span>备注</span>
          <span class="text-right">入口</span>
        </div>

        <a
          v-for="school in graduateSchoolSignals"
          :key="school.name"
          :href="school.url"
          target="_blank"
          rel="noopener noreferrer"
          class="grid gap-4 border-b px-5 py-4 transition last:border-b-0 hover:bg-[var(--surface)] xl:grid-cols-[minmax(12rem,0.65fr)_minmax(0,1fr)_minmax(0,1fr)_8rem] xl:items-center"
          :style="{
            backgroundColor: 'var(--surface-strong)',
            borderColor: 'var(--border)',
            color: 'var(--text-primary)',
          }"
        >
          <div>
            <p class="text-sm text-[var(--text-tertiary)]">{{ school.position }}</p>
            <h2 class="mt-2 text-lg font-semibold leading-7 text-[var(--text-primary)]">
              {{ school.name }}
            </h2>
          </div>
          <p class="text-sm leading-7 text-[var(--text-secondary)]">
            {{ school.signal }}
          </p>
          <p class="text-sm leading-7 text-[var(--text-secondary)]">
            {{ school.check }}
          </p>
          <span class="text-sm font-medium text-[var(--accent)] xl:text-right">查看</span>
        </a>
      </section>

      <details class="rounded-lg border p-4" :style="{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }">
        <summary class="flex cursor-pointer list-none items-center justify-between gap-3">
          <span>
            <span class="block text-sm tracking-[0.14em] text-[var(--text-tertiary)]">资料来源</span>
          </span>
          <span class="shrink-0 rounded-lg px-3 py-1 text-sm text-[var(--accent)]" :style="{ backgroundColor: 'var(--accent-soft)' }">
            {{ graduateSourceLinks.length }} 项
          </span>
        </summary>
        <div class="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          <a
            v-for="source in graduateSourceLinks"
            :key="source.url"
            :href="source.url"
            target="_blank"
            rel="noopener noreferrer"
            class="rounded-lg border p-4 text-sm transition hover:-translate-y-0.5"
            :style="{
              backgroundColor: 'var(--surface-strong)',
              borderColor: 'var(--border)',
              color: 'var(--text-primary)',
            }"
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
