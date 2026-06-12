<script setup lang="ts">
const contentScopes = [
  '专业介绍',
  '院校一览',
  '企业名录',
  '考研方向',
]

const notes = ['公开资料整理', '静态导航站', '联系邮箱：ty368685189@gmail.com']
</script>

<template>
  <section class="min-h-screen bg-[var(--page-bg)] px-5 pb-10 pt-28 text-[var(--text-primary)] sm:px-6 sm:pb-12 sm:pt-32">
    <div class="mx-auto flex w-full max-w-5xl flex-col gap-8">
      <header class="border-b pb-8" :style="{ borderColor: 'var(--border)' }">
        <p class="mb-3 text-sm tracking-[0.16em] text-[var(--text-secondary)]">About</p>
        <h1 class="text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
          关于弹药工程导航
        </h1>
        <p class="mt-5 max-w-3xl text-base leading-8 text-[var(--text-secondary)] md:text-lg">
          面向弹药工程与爆炸技术相关同学的资料整理站。
        </p>
      </header>

      <section
        class="rounded-lg border p-5"
        :style="{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--glass-shadow)',
        }"
      >
        <p class="text-sm tracking-[0.14em] text-[var(--text-tertiary)]">目录</p>
        <h2 class="mt-3 text-xl font-semibold text-[var(--text-primary)]">主要页面</h2>

        <ul class="mt-5 grid gap-3 text-sm leading-7 text-[var(--text-secondary)] md:grid-cols-2">
          <li
            v-for="item in contentScopes"
            :key="item"
            class="rounded-lg border px-4 py-3"
            :style="{
              backgroundColor: 'var(--surface-strong)',
              borderColor: 'var(--border)',
            }"
          >
            {{ item }}
          </li>
        </ul>
      </section>

      <section
        class="rounded-lg border p-5"
        :style="{
          backgroundColor: 'var(--surface-strong)',
          borderColor: 'var(--border)',
        }"
      >
        <p class="text-sm tracking-[0.14em] text-[var(--text-tertiary)]">信息</p>
        <ul class="mt-4 grid gap-3 text-sm leading-7 text-[var(--text-secondary)] md:grid-cols-3">
          <li
            v-for="item in notes"
            :key="item"
            class="rounded-lg border px-4 py-3"
            :style="{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }"
          >
            {{ item }}
          </li>
        </ul>
      </section>

      <section class="border-t pt-6" :style="{ borderColor: 'var(--border)' }">
        <div class="flex flex-wrap items-center gap-4 text-sm text-[var(--text-secondary)]">
          <a href="mailto:ty368685189@gmail.com" class="font-medium text-[var(--accent)] transition hover:opacity-80">
            联系维护者
          </a>
        </div>
      </section>
    </div>
  </section>
</template>
