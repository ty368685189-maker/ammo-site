<script setup lang="ts">
import TopicNav from '../components/TopicNav.vue'
import { majorFirstInsights, majorNavItems, majorQuickFacts, majorSourceLinks } from '../data/aboutMajor'
</script>

<template>
  <section class="topic-page min-h-screen overflow-x-hidden bg-[var(--page-bg)] px-5 pb-12 pt-40 text-[var(--text-primary)] sm:px-6">
    <TopicNav :items="majorNavItems" ariaLabelText="专业介绍导航" />

    <main class="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <header
        class="major-hero grid gap-6 rounded-xl border p-5 md:p-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.62fr)] xl:items-end"
        :style="{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--glass-shadow)',
        }"
      >
        <div>
          <p class="mb-4 text-sm tracking-[0.16em] text-[var(--text-tertiary)]">专业总览</p>
          <h1 class="max-w-5xl text-3xl font-semibold leading-tight text-[var(--text-primary)] md:text-4xl">
            弹药工程与爆炸技术专业介绍
          </h1>
          <p class="mt-5 max-w-3xl text-base leading-8 text-[var(--text-secondary)] md:text-lg">
            别只看专业名字，真正会碰到的内容还包括力学、机械、测试、安全，以及军工、民爆和工程现场规则。
          </p>
        </div>

        <div
          class="rounded-xl border p-5"
          :style="{
            backgroundColor: 'color-mix(in srgb, var(--surface-strong) 84%, var(--accent-soft) 16%)',
            borderColor: 'var(--border)',
          }"
        >
          <p class="text-sm tracking-[0.14em] text-[var(--text-tertiary)]">先抓住这件事</p>
          <p class="mt-3 text-lg font-semibold leading-8 text-[var(--text-primary)]">
            这不是只背概念的专业，很多内容最后都会落到工程场景里。
          </p>
          <p class="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
            先把课程结构、四年节奏和常见去向看明白，再判断自己适不适合。
          </p>
        </div>
      </header>

      <section
        class="overflow-hidden rounded-lg border"
        :style="{
          backgroundColor: 'var(--surface-strong)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--glass-shadow)',
        }"
      >
        <div class="border-b px-5 py-4" :style="{ borderColor: 'var(--border)' }">
          <p class="text-sm tracking-[0.14em] text-[var(--text-tertiary)]">专业档案</p>
        </div>
        <dl class="grid md:grid-cols-2 xl:grid-cols-4">
          <div
            v-for="fact in majorQuickFacts"
            :key="fact.label"
            class="border-t px-5 py-4 xl:border-r xl:last:border-r-0"
            :style="{ borderColor: 'var(--border)' }"
          >
            <dt class="text-sm text-[var(--text-tertiary)]">{{ fact.label }}</dt>
            <dd>
              <p class="font-semibold leading-6 text-[var(--text-primary)]">{{ fact.value }}</p>
              <p class="mt-1 text-sm leading-6 text-[var(--text-secondary)]">{{ fact.note }}</p>
            </dd>
          </div>
        </dl>
      </section>

      <section class="grid gap-0 overflow-hidden rounded-lg border md:grid-cols-3" :style="{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }">
        <article
          v-for="(insight, index) in majorFirstInsights"
          :key="insight.title"
          class="border-b px-5 py-4 md:border-b-0 md:border-r md:last:border-r-0"
          :style="{ borderColor: 'var(--border)' }"
        >
          <div class="flex items-start gap-4">
            <p class="pt-0.5 text-sm font-medium text-[var(--accent)]">
              {{ String(index + 1).padStart(2, '0') }}
            </p>
            <div>
              <h2 class="text-base font-semibold leading-6 text-[var(--text-primary)]">
                {{ insight.title }}
              </h2>
              <p class="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                {{ insight.body }}
              </p>
            </div>
          </div>
        </article>
      </section>

      <section class="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <RouterLink
          v-for="item in majorNavItems.slice(1)"
          :key="item.to"
          :to="item.to"
          class="rounded-lg border p-4 transition hover:-translate-y-0.5"
          :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)', color: 'var(--text-primary)' }"
        >
          <p class="text-sm text-[var(--text-tertiary)]">继续看</p>
          <h2 class="mt-2 text-lg font-semibold">{{ item.label }}</h2>
          <p class="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
            {{
              item.to.endsWith('curriculum')
                ? '数理、力学机械、专业课和实践训练。'
                : item.to.endsWith('path')
                  ? '大一到大四的课程与能力节奏。'
                  : item.to.endsWith('career')
                    ? '军工、民爆、制造、深造等去向。'
                    : '报考前需要核对的问题。'
            }}
          </p>
          <span class="mt-4 block text-sm font-medium text-[var(--accent)]">查看</span>
        </RouterLink>
      </section>

      <details class="rounded-lg border p-4" :style="{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }">
        <summary class="flex cursor-pointer list-none items-center justify-between gap-3">
          <span>
            <span class="block text-sm tracking-[0.14em] text-[var(--text-tertiary)]">参考入口</span>
            <span class="mt-1 block text-sm leading-6 text-[var(--text-secondary)]">
              专业目录和公开介绍。
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
.major-hero {
  position: relative;
  overflow: hidden;
}

.major-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(135deg, rgba(190, 98, 82, 0.08), transparent 36%),
    linear-gradient(315deg, rgba(47, 125, 79, 0.06), transparent 42%);
  pointer-events: none;
}

.major-hero > * {
  position: relative;
  z-index: 1;
}
</style>
