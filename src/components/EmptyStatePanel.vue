<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  description: string
}>()
</script>

<template>
  <section
    class="rounded-xl border p-8 text-center"
    :style="{
      backgroundColor: 'var(--surface)',
      borderColor: 'var(--border)',
      boxShadow: 'var(--glass-shadow)',
    }"
  >
    <p v-if="eyebrow" class="text-sm tracking-[0.14em] text-[var(--text-tertiary)]">
      {{ eyebrow }}
    </p>
    <h2 class="mt-3 text-xl font-semibold text-[var(--text-primary)]">{{ title }}</h2>
    <p class="mx-auto mt-3 max-w-xl text-sm leading-7 text-[var(--text-secondary)]">
      {{ description }}
    </p>
    <div v-if="$slots.actions" class="mt-5 flex justify-center">
      <slot name="actions" />
    </div>
  </section>
</template>
