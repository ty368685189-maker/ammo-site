<script setup lang="ts">
import TopicNav from '../components/TopicNav.vue'
import { graduateCompareRows, graduateNavItems } from '../data/graduate'
</script>

<template>
  <section class="topic-page min-h-screen overflow-x-hidden bg-[var(--page-bg)] px-5 pb-12 pt-40 text-[var(--text-primary)] sm:px-6">
    <TopicNav :items="graduateNavItems" ariaLabelText="考研方向导航" />

    <main class="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <header class="flex flex-col gap-4 border-b pb-8 md:flex-row md:items-end md:justify-between" :style="{ borderColor: 'var(--border)' }">
        <div>
          <p class="text-sm tracking-[0.14em] text-[var(--text-tertiary)]">方向对比</p>
          <h1 class="mt-3 text-3xl font-semibold leading-tight text-[var(--text-primary)] md:text-4xl">
            常见方向对比
          </h1>
        </div>
        <p class="max-w-2xl text-sm leading-7 text-[var(--text-secondary)]">
          表里的考试科目只作参考，具体科目必须以目标学校当年招生专业目录为准。
        </p>
      </header>

      <section
        class="overflow-x-auto rounded-lg border"
        :style="{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--glass-shadow)',
        }"
      >
        <table class="graduate-table w-full min-w-[58rem] border-collapse text-left text-sm">
          <thead>
            <tr>
              <th>方向</th>
              <th>本科匹配</th>
              <th>主要难点</th>
              <th>常见科目</th>
              <th>毕业去向</th>
              <th>不太适合</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in graduateCompareRows" :key="row.direction">
              <td class="font-medium text-[var(--text-primary)]">{{ row.direction }}</td>
              <td>{{ row.match }}</td>
              <td>{{ row.difficulty }}</td>
              <td>{{ row.commonSubjects }}</td>
              <td>{{ row.outcome }}</td>
              <td>{{ row.notFor }}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="grid gap-3 md:grid-cols-3">
        <article
          class="rounded-lg border p-4"
          :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)' }"
        >
          <h2 class="text-lg font-semibold text-[var(--text-primary)]">共享科目优先</h2>
          <p class="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
            主目标和备选目标尽量共享数学、专业课或复试基础，减少临时换方向的代价。
          </p>
        </article>
        <article
          class="rounded-lg border p-4"
          :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)' }"
        >
          <h2 class="text-lg font-semibold text-[var(--text-primary)]">复试风险要早看</h2>
          <p class="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
            跨到控制、电子信息或材料时，要提前准备能解释转向逻辑的课程、项目和基础能力。
          </p>
        </article>
        <article
          class="rounded-lg border p-4"
          :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)' }"
        >
          <h2 class="text-lg font-semibold text-[var(--text-primary)]">把约束写进表里</h2>
          <p class="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
            如果排斥军工、现场、实验或非一线城市，要把这些约束放进择校表里，而不是考后才处理。
          </p>
        </article>
      </section>
    </main>
  </section>
</template>

<style scoped>
.graduate-table th,
.graduate-table td {
  border-bottom: 1px solid var(--border);
  padding: 1rem 0.9rem;
  vertical-align: top;
  line-height: 1.65;
}

.graduate-table th {
  color: var(--text-tertiary);
  font-weight: 500;
  background-color: var(--surface-strong);
}

.graduate-table td {
  color: var(--text-secondary);
}
</style>
