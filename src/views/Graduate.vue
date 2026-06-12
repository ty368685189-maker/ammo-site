<script setup lang="ts">
import TopicNav from '../components/TopicNav.vue'
import {
  graduateDecisionHints,
  graduateDirectionTags,
  graduateNavItems,
  graduateQuickJudgements,
  graduateSourceLinks,
} from '../data/graduate'

const featuredGraduateSources = graduateSourceLinks.slice(0, 3)
</script>

<template>
  <section class="topic-page min-h-screen overflow-x-hidden bg-[var(--page-bg)] px-5 pb-12 pt-40 text-[var(--text-primary)] sm:px-6">
    <TopicNav :items="graduateNavItems" ariaLabelText="考研方向导航" />

    <main class="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <header
        class="graduate-hero grid gap-7 rounded-xl border p-5 md:p-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.62fr)] xl:items-start"
        :style="{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--glass-shadow)',
        }"
      >
        <div>
          <p class="mb-3 text-sm tracking-[0.16em] text-[var(--text-tertiary)]">考研总览</p>
          <h1 class="max-w-5xl text-3xl font-semibold leading-tight tracking-tight text-[var(--text-primary)] md:text-4xl">
            弹药专业本科生，考研往哪走？
          </h1>
          <p class="mt-5 max-w-4xl text-base leading-8 text-[var(--text-secondary)] md:text-lg">
            先分清顺接、半跨和主动转向，再看院校入口和四年准备安排。
          </p>

          <div class="mt-7 flex flex-wrap gap-2">
            <span
              v-for="tag in graduateDirectionTags"
              :key="tag"
              class="rounded-lg border px-3 py-1.5 text-sm"
              :style="{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
                color: 'var(--text-secondary)',
              }"
            >
              {{ tag }}
            </span>
          </div>
        </div>

        <aside
          class="rounded-xl border p-5"
          :style="{
            backgroundColor: 'color-mix(in srgb, var(--surface-strong) 84%, rgba(255, 255, 255, 0.12))',
            borderColor: 'var(--border)',
          }"
        >
          <p class="text-sm tracking-[0.14em] text-[var(--text-tertiary)]">先想清楚</p>
          <div class="mt-4 space-y-4">
            <article
              v-for="hint in graduateDecisionHints"
              :key="hint.title"
              class="border-l pl-4"
              :style="{ borderColor: 'var(--accent)' }"
            >
              <h2 class="text-base font-semibold text-[var(--text-primary)]">
                {{ hint.title }}
              </h2>
              <p class="mt-1 text-sm leading-7 text-[var(--text-secondary)]">
                {{ hint.body }}
              </p>
            </article>
          </div>
        </aside>
      </header>

      <section class="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="item in graduateQuickJudgements"
          :key="item.label"
          class="rounded-lg border p-4"
          :style="{
            backgroundColor: 'var(--surface-strong)',
            borderColor: 'var(--border)',
          }"
        >
          <p class="text-sm text-[var(--text-tertiary)]">{{ item.label }}</p>
          <p class="mt-2 text-lg font-semibold leading-7 text-[var(--text-primary)]">
            {{ item.value }}
          </p>
          <p class="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
            {{ item.note }}
          </p>
        </article>
      </section>

      <section class="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <RouterLink
          v-for="item in graduateNavItems.slice(1)"
          :key="item.to"
          :to="item.to"
          class="rounded-lg border p-4 transition hover:-translate-y-0.5"
          :style="{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
            color: 'var(--text-primary)',
          }"
        >
          <p class="text-sm text-[var(--text-tertiary)]">继续看</p>
          <h2 class="mt-2 text-lg font-semibold">{{ item.label }}</h2>
          <p class="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
            {{
              item.to.endsWith('directions')
                ? '顺接、半跨、跨考方向。'
                : item.to.endsWith('compare')
                  ? '匹配度、难点、科目和去向。'
                  : item.to.endsWith('schools')
                    ? '院校与研招信息。'
                    : '四年准备安排。'
            }}
          </p>
          <span class="mt-4 block text-sm font-medium text-[var(--accent)]">查看</span>
        </RouterLink>
      </section>

      <section
        class="rounded-lg border p-5"
        :style="{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--glass-shadow)',
        }"
      >
        <div class="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <p class="text-sm tracking-[0.14em] text-[var(--text-tertiary)]">方向</p>
            <h2 class="mt-3 text-xl font-semibold text-[var(--text-primary)]">先看方向差别</h2>
            <p class="mt-3 max-w-2xl text-sm leading-7 text-[var(--text-secondary)]">
              还没决定读哪一类，就先从方向差别看起，比直接盯学校更省时间。
            </p>
          </div>

          <RouterLink
            to="/graduate/directions"
            class="w-fit shrink-0 rounded-lg px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
            :style="{ backgroundColor: 'var(--accent)' }"
          >
            去看方向
          </RouterLink>
        </div>
      </section>

      <details class="rounded-lg border p-4" :style="{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }">
        <summary class="flex cursor-pointer list-none items-center justify-between gap-3">
          <span>
            <span class="block text-sm tracking-[0.14em] text-[var(--text-tertiary)]">参考入口</span>
          </span>
          <span class="shrink-0 rounded-lg px-3 py-1 text-sm text-[var(--accent)]" :style="{ backgroundColor: 'var(--accent-soft)' }">
            {{ featuredGraduateSources.length }} 项
          </span>
        </summary>
        <div class="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          <a
            v-for="source in featuredGraduateSources"
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

<style scoped>
.graduate-hero {
  position: relative;
  overflow: hidden;
}

.graduate-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(135deg, rgba(190, 98, 82, 0.08), transparent 36%),
    linear-gradient(315deg, rgba(47, 125, 79, 0.06), transparent 42%);
  pointer-events: none;
}

.graduate-hero > * {
  position: relative;
  z-index: 1;
}
</style>
