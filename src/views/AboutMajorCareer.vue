<script setup lang="ts">
import TopicNav from '../components/TopicNav.vue'
import { majorCautionFor, majorDirections, majorNavItems, majorSuitableFor } from '../data/aboutMajor'
</script>

<template>
  <section class="topic-page min-h-screen overflow-x-hidden bg-[var(--page-bg)] px-5 pb-12 pt-40 text-[var(--text-primary)] sm:px-6">
    <TopicNav :items="majorNavItems" ariaLabelText="专业介绍导航" />

    <main class="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <header class="border-b pb-8" :style="{ borderColor: 'var(--border)' }">
        <p class="text-sm tracking-[0.14em] text-[var(--text-tertiary)]">毕业去向</p>
        <h1 class="mt-3 text-3xl font-semibold leading-tight text-[var(--text-primary)] md:text-4xl">
          常见去向与岗位差异
        </h1>
        <p class="mt-4 max-w-3xl text-sm leading-7 text-[var(--text-secondary)] md:text-base">
          方向名称只能帮你定位入口，主要差异更多落在单位、岗位、地点、学历要求和项目环境上。
        </p>
      </header>

      <section
        class="overflow-hidden rounded-lg border"
        :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)' }"
      >
        <article
          v-for="direction in majorDirections"
          :key="direction.title"
          class="grid gap-4 border-b px-5 py-5 last:border-b-0 xl:grid-cols-[12rem_minmax(0,1fr)_minmax(0,1.05fr)]"
          :style="{ borderColor: 'var(--border)' }"
        >
          <h2 class="text-lg font-semibold leading-7 text-[var(--text-primary)]">
            {{ direction.title }}
          </h2>
          <div>
            <p class="text-sm leading-7 text-[var(--text-secondary)]">
              {{ direction.summary }}
            </p>
            <div class="mt-3 flex flex-wrap gap-2">
              <span
                v-for="example in direction.examples"
                :key="example"
                class="rounded-md px-2.5 py-1 text-sm"
                :style="{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent)' }"
              >
                {{ example }}
              </span>
            </div>
          </div>
          <p class="border-l pl-4 text-sm leading-7 text-[var(--text-secondary)]" :style="{ borderColor: 'var(--border)' }">
            {{ direction.check }}
          </p>
        </article>
      </section>

      <section class="grid gap-5 xl:grid-cols-2">
        <div
          class="rounded-lg border p-5 md:p-6"
          :style="{ backgroundColor: 'var(--status-positive-soft)', borderColor: 'var(--status-positive-border)' }"
        >
          <p class="text-sm tracking-[0.14em]" :style="{ color: 'var(--status-positive)' }">更适合</p>
          <h2 class="mt-2 text-xl font-semibold text-[var(--text-primary)]">
            这些特质会让你更容易走下去
          </h2>
          <div class="mt-5 divide-y" :style="{ borderColor: 'var(--status-positive-border)' }">
            <article v-for="item in majorSuitableFor" :key="item.title" class="py-4 first:pt-0 last:pb-0">
              <h3 class="text-base font-semibold text-[var(--text-primary)]">{{ item.title }}</h3>
              <p class="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                {{ item.description }}
              </p>
            </article>
          </div>
        </div>

        <div
          class="rounded-lg border p-5 md:p-6"
          :style="{ backgroundColor: 'var(--status-warning-soft)', borderColor: 'var(--status-warning-border)' }"
        >
          <p class="text-sm tracking-[0.14em]" :style="{ color: 'var(--status-warning)' }">谨慎选择</p>
          <h2 class="mt-2 text-xl font-semibold text-[var(--text-primary)]">
            这些情况要提前想清楚
          </h2>
          <div class="mt-5 divide-y" :style="{ borderColor: 'var(--status-warning-border)' }">
            <article v-for="item in majorCautionFor" :key="item.title" class="py-4 first:pt-0 last:pb-0">
              <h3 class="text-base font-semibold text-[var(--text-primary)]">{{ item.title }}</h3>
              <p class="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                {{ item.description }}
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  </section>
</template>
