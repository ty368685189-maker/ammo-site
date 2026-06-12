<script setup lang="ts">
</script>

<template>
  <section class="min-h-screen bg-[var(--page-bg)] px-5 pb-10 pt-28 text-[var(--text-primary)] sm:px-6 sm:pb-12 sm:pt-32">
    <div class="mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-4xl flex-col">
      <main class="flex flex-1 items-center py-14">
        <div
          class="w-full rounded-lg border p-6 md:p-8"
          :style="{
            backgroundColor: 'var(--surface-strong)',
            borderColor: 'var(--border)',
            boxShadow: 'var(--glass-shadow)',
          }"
        >
          <p class="text-sm tracking-[0.16em] text-[var(--text-tertiary)]">404</p>
          <h1 class="mt-3 text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
            这个页面暂时不存在
          </h1>
          <p class="mt-5 max-w-2xl text-base leading-8 text-[var(--text-secondary)]">
            可能是链接有误、条目未收录，或者页面已经调整。
          </p>

          <div class="mt-7 grid gap-3 sm:grid-cols-2">
            <RouterLink
              to="/about-major"
              class="rounded-lg border px-4 py-3 text-sm font-medium transition hover:-translate-y-0.5"
              :style="{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-primary)' }"
            >
              专业介绍
            </RouterLink>
            <RouterLink
              to="/universities"
              class="rounded-lg border px-4 py-3 text-sm font-medium transition hover:-translate-y-0.5"
              :style="{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-primary)' }"
            >
              院校一览
            </RouterLink>
            <RouterLink
              to="/companies"
              class="rounded-lg border px-4 py-3 text-sm font-medium transition hover:-translate-y-0.5"
              :style="{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-primary)' }"
            >
              企业名录
            </RouterLink>
            <RouterLink
              to="/graduate"
              class="rounded-lg border px-4 py-3 text-sm font-medium transition hover:-translate-y-0.5"
              :style="{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-primary)' }"
            >
              考研方向
            </RouterLink>
          </div>
        </div>
      </main>
    </div>
  </section>
</template>
