<script setup lang="ts">
import { computed } from 'vue'
import TopicNav from '../components/TopicNav.vue'
import { graduateDirections, graduateLevelStyle, graduateNavItems } from '../data/graduate'

const directionStats = computed(() =>
  [
    {
      label: '顺接',
      value: graduateDirections.filter((direction) => direction.level === '顺接').length,
      note: '接着本科内容',
    },
    {
      label: '半跨',
      value: graduateDirections.filter((direction) => direction.level === '半跨').length,
      note: '工程能力迁移',
    },
    {
      label: '跨考',
      value: graduateDirections.filter((direction) => direction.level === '跨考').length,
      note: '提前补基础',
    },
  ],
)
</script>

<template>
  <section class="topic-page min-h-screen overflow-x-hidden bg-[var(--page-bg)] px-5 pb-12 pt-40 text-[var(--text-primary)] sm:px-6">
    <TopicNav :items="graduateNavItems" ariaLabelText="考研方向导航" />

    <main class="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <header class="border-b pb-8" :style="{ borderColor: 'var(--border)' }">
        <p class="text-sm tracking-[0.14em] text-[var(--text-tertiary)]">方向分类</p>
        <h1 class="mt-3 text-3xl font-semibold leading-tight text-[var(--text-primary)] md:text-4xl">
          顺接、半跨和主动转向
        </h1>
        <p class="mt-4 max-w-3xl text-sm leading-7 text-[var(--text-secondary)] md:text-base">
          研究主题、常见科目、补充能力和注意事项。
        </p>
      </header>

      <section
        class="grid gap-3 rounded-lg border p-4 md:grid-cols-3"
        :style="{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }"
      >
        <div
          v-for="stat in directionStats"
          :key="stat.label"
          class="border-l pl-4"
          :style="{ borderColor: 'var(--border)' }"
        >
          <p class="text-sm text-[var(--text-tertiary)]">{{ stat.label }}</p>
          <p class="mt-1 text-2xl font-semibold text-[var(--text-primary)]">{{ stat.value }}</p>
          <p class="mt-1 text-sm text-[var(--text-secondary)]">{{ stat.note }}</p>
        </div>
      </section>

      <section
        class="overflow-hidden rounded-lg border"
        :style="{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--glass-shadow)',
        }"
      >
        <div
          class="hidden grid-cols-[12rem_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.05fr)] gap-5 border-b px-5 py-3 text-xs text-[var(--text-tertiary)] xl:grid"
          :style="{ borderColor: 'var(--border)' }"
        >
          <span>方向 / 科目</span>
          <span>研究主题</span>
          <span>要补能力</span>
          <span>风险提醒</span>
        </div>

        <article
          v-for="direction in graduateDirections"
          :key="`${direction.title}-detail`"
          class="grid gap-5 border-b p-5 last:border-b-0 xl:grid-cols-[12rem_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.05fr)]"
          :style="{ borderColor: 'var(--border)' }"
        >
          <div>
            <span class="inline-flex rounded-lg border px-3 py-1 text-xs font-medium" :style="graduateLevelStyle(direction.level)">
              {{ direction.level }}
            </span>
            <h2 class="mt-3 text-lg font-semibold leading-7 text-[var(--text-primary)]">
              {{ direction.title }}
            </h2>
            <p class="mt-2 text-sm text-[var(--text-tertiary)]">
              {{ direction.subjects.join(' / ') }}
            </p>
          </div>

          <div>
            <p class="text-sm font-medium text-[var(--text-primary)]">研究主题</p>
            <div class="mt-3 flex flex-wrap gap-2">
              <span
                v-for="topic in direction.topics"
                :key="topic"
                class="rounded-lg px-3 py-1 text-sm"
                :style="{ backgroundColor: 'var(--surface-muted)', color: 'var(--text-secondary)' }"
              >
                {{ topic }}
              </span>
            </div>
          </div>

          <div>
            <p class="text-sm font-medium text-[var(--text-primary)]">要补能力</p>
            <div class="mt-3 flex flex-wrap gap-2">
              <span
                v-for="item in direction.bridge"
                :key="item"
                class="rounded-lg px-3 py-1 text-sm"
                :style="{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent)' }"
              >
                {{ item }}
              </span>
            </div>
          </div>

          <div>
            <p class="text-sm font-medium text-[var(--text-primary)]">风险提醒</p>
            <p class="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
              {{ direction.warning }}
            </p>
          </div>
        </article>
      </section>
    </main>
  </section>
</template>
