<script setup lang="ts">
import TopicNav from '../components/TopicNav.vue'
import { graduateNavItems, graduateTimeline } from '../data/graduate'
</script>

<template>
  <section class="topic-page min-h-screen overflow-x-hidden bg-[var(--page-bg)] px-5 pb-12 pt-40 text-[var(--text-primary)] sm:px-6">
    <TopicNav :items="graduateNavItems" ariaLabelText="考研方向导航" />

    <main class="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <header class="border-b pb-8" :style="{ borderColor: 'var(--border)' }">
        <p class="text-sm tracking-[0.14em] text-[var(--text-tertiary)]">四年准备</p>
        <h1 class="mt-3 text-3xl font-semibold leading-tight text-[var(--text-primary)] md:text-4xl">
          本科四年的准备节奏
        </h1>
        <p class="mt-4 max-w-3xl text-sm leading-7 text-[var(--text-secondary)] md:text-base">
          课程、项目和候选方向的时间安排。
        </p>
      </header>

      <section
        class="overflow-hidden rounded-lg border"
        :style="{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--glass-shadow)' }"
      >
        <article
          v-for="stage in graduateTimeline"
          :key="stage.time"
          class="grid gap-5 border-b p-5 last:border-b-0 md:grid-cols-[7rem_minmax(0,1fr)_minmax(0,1fr)]"
          :style="{ borderColor: 'var(--border)' }"
        >
          <div>
            <p
              class="inline-flex rounded-lg px-3 py-1 text-sm font-medium"
              :style="{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent)' }"
            >
              {{ stage.time }}
            </p>
          </div>
          <div>
            <h2 class="text-lg font-semibold leading-7 text-[var(--text-primary)]">
              {{ stage.title }}
            </h2>
            <p class="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
              {{ stage.focus }}
            </p>
          </div>
          <ul class="space-y-2 text-sm leading-6 text-[var(--text-tertiary)]">
            <li v-for="action in stage.actions" :key="action">
              {{ action }}
            </li>
          </ul>
        </article>
      </section>
    </main>
  </section>
</template>
