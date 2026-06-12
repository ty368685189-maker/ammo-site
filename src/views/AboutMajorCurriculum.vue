<script setup lang="ts">
import TopicNav from '../components/TopicNav.vue'
import { majorLearningBlocks, majorNavItems } from '../data/aboutMajor'

const totalCourseKeywords = majorLearningBlocks.reduce((total, block) => total + block.items.length, 0)
</script>

<template>
  <section class="topic-page min-h-screen overflow-x-hidden bg-[var(--page-bg)] px-5 pb-12 pt-40 text-[var(--text-primary)] sm:px-6">
    <TopicNav :items="majorNavItems" ariaLabelText="专业介绍导航" />

    <main class="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <header class="border-b pb-8" :style="{ borderColor: 'var(--border)' }">
        <div class="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,0.45fr)] xl:items-end">
          <div>
            <p class="text-sm tracking-[0.14em] text-[var(--text-tertiary)]">学什么</p>
            <h1 class="mt-3 text-3xl font-semibold leading-tight text-[var(--text-primary)] md:text-4xl">
              不是单科专业，是一组工程能力
            </h1>
            <p class="mt-4 max-w-3xl text-sm leading-7 text-[var(--text-secondary)] md:text-base">
              不同学校课程名会有差异，但基本都绕不开数理基础、力学机械、专业课和实践训练四层。
            </p>
          </div>

          <div class="grid grid-cols-2 gap-3 text-sm">
            <div class="border-l pl-4" :style="{ borderColor: 'var(--border)' }">
              <p class="text-[var(--text-tertiary)]">课程层级</p>
              <p class="mt-1 text-2xl font-semibold text-[var(--text-primary)]">{{ majorLearningBlocks.length }}</p>
            </div>
            <div class="border-l pl-4" :style="{ borderColor: 'var(--border)' }">
              <p class="text-[var(--text-tertiary)]">关键词</p>
              <p class="mt-1 text-2xl font-semibold text-[var(--text-primary)]">{{ totalCourseKeywords }}</p>
            </div>
          </div>
        </div>
      </header>

      <section
        class="overflow-hidden rounded-lg border"
        :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)' }"
      >
        <div
          class="hidden grid-cols-[3.5rem_14rem_minmax(0,1fr)] gap-4 border-b px-5 py-3 text-xs text-[var(--text-tertiary)] md:grid"
          :style="{ borderColor: 'var(--border)' }"
        >
          <span>层级</span>
          <span>作用</span>
          <span>课程关键词</span>
        </div>

        <article
          v-for="block in majorLearningBlocks"
          :key="block.title"
          class="grid gap-4 border-b px-5 py-5 last:border-b-0 md:grid-cols-[3.5rem_14rem_minmax(0,1fr)]"
          :style="{ borderColor: 'var(--border)' }"
        >
          <p class="text-sm font-medium text-[var(--accent)]">{{ block.eyebrow }}</p>
          <div>
            <h2 class="text-lg font-semibold leading-7 text-[var(--text-primary)]">
              {{ block.title }}
            </h2>
            <p class="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
              {{ block.description }}
            </p>
          </div>
          <div class="flex flex-wrap content-start gap-2 md:pt-1">
            <span
              v-for="item in block.items"
              :key="item"
              class="rounded-md px-2.5 py-1 text-sm"
              :style="{ backgroundColor: 'var(--surface-muted)', color: 'var(--text-secondary)' }"
            >
              {{ item }}
            </span>
          </div>
        </article>
      </section>
    </main>
  </section>
</template>
