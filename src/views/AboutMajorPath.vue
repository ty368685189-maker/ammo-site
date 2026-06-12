<script setup lang="ts">
import TopicNav from '../components/TopicNav.vue'
import { majorAbilities, majorNavItems, majorStudyStages } from '../data/aboutMajor'
</script>

<template>
  <section class="topic-page min-h-screen overflow-x-hidden bg-[var(--page-bg)] px-5 pb-12 pt-40 text-[var(--text-primary)] sm:px-6">
    <TopicNav :items="majorNavItems" ariaLabelText="专业介绍导航" />

    <main class="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <header class="border-b pb-8" :style="{ borderColor: 'var(--border)' }">
        <p class="text-sm tracking-[0.14em] text-[var(--text-tertiary)]">四年节奏</p>
        <h1 class="mt-3 text-3xl font-semibold leading-tight text-[var(--text-primary)] md:text-4xl">
          四年学习节奏
        </h1>
        <p class="mt-4 max-w-3xl text-sm leading-7 text-[var(--text-secondary)] md:text-base">
          每一年大致的课程、项目和积累重点。
        </p>
      </header>

      <section class="grid gap-5 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div
          class="overflow-hidden rounded-lg border"
          :style="{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }"
        >
          <div class="border-b px-5 py-4" :style="{ borderColor: 'var(--border)' }">
            <p class="text-sm tracking-[0.14em] text-[var(--text-tertiary)]">课程节奏</p>
            <p class="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
              每一年主要任务和积累重点。
            </p>
          </div>

          <div>
            <article
              v-for="stage in majorStudyStages"
              :key="stage.year"
              class="grid gap-4 border-b px-5 py-4 last:border-b-0 md:grid-cols-[4.2rem_minmax(0,1fr)]"
              :style="{ borderColor: 'var(--border)' }"
            >
              <p class="text-sm font-semibold text-[var(--accent)]">{{ stage.year }}</p>
              <div>
                <h2 class="text-base font-semibold text-[var(--text-primary)]">
                  {{ stage.title }}
                </h2>
                <p class="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                  {{ stage.focus }}
                </p>
                <ul class="mt-3 space-y-2 text-sm leading-6 text-[var(--text-tertiary)]">
                  <li v-for="action in stage.actions" :key="action">
                    {{ action }}
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </div>

        <div
          class="overflow-hidden rounded-lg border"
          :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)' }"
        >
          <div class="border-b px-5 py-4" :style="{ borderColor: 'var(--border)' }">
            <p class="text-sm tracking-[0.14em] text-[var(--text-tertiary)]">能力清单</p>
            <h2 class="mt-2 text-lg font-semibold text-[var(--text-primary)]">
              毕业前尽量留下哪些材料
            </h2>
          </div>

          <div class="grid md:grid-cols-2">
            <article
              v-for="ability in majorAbilities"
              :key="ability.name"
              class="border-b px-5 py-4 odd:md:border-r"
              :style="{ borderColor: 'var(--border)' }"
            >
              <h3 class="text-base font-semibold text-[var(--text-primary)]">
                {{ ability.name }}
              </h3>
              <p class="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                {{ ability.detail }}
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  </section>
</template>
