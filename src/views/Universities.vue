<script setup lang="ts">
import ActionButton from '../components/ActionButton.vue'
import EmptyStatePanel from '../components/EmptyStatePanel.vue'
import StatusPill from '../components/StatusPill.vue'
import { computed, nextTick, ref, watch } from 'vue'
import {
  universities,
  type University,
  type RelevanceLevel,
  type UniversityTier,
  type VerificationStatus,
} from '../data/universities'
import SchoolLogo from '../components/SchoolLogo.vue'
import { countBy } from '../utils/status'

const keyword = ref('')
const selectedTier = ref<'全部' | UniversityTier>('全部')
const selectedProvince = ref('全部')
const selectedRelevance = ref<'全部' | RelevanceLevel>('全部')
const selectedStatus = ref<'全部' | VerificationStatus>('全部')
const onlyWithResearch = ref(false)
const filtersOpen = ref(false)
const listPageSize = 10
const currentUniversityPage = ref(1)
const universityListTop = ref<HTMLElement | null>(null)
const tierOptions: UniversityTier[] = ['985 / 211', '211', '普通本科']
const relevanceOptions: RelevanceLevel[] = ['高', '中', '低', '待核对']
const statusOptions: VerificationStatus[] = ['已核验', '部分核验', '过期待复查']
const priorityUniversityIds = ['aust']
const relevanceRank: Record<RelevanceLevel, number> = {
  高: 0,
  中: 1,
  低: 2,
  待核对: 3,
}
const provinceOptions = computed(() =>
  Array.from(new Set(universities.map((university) => university.province))).sort(),
)

const activeFilterCount = computed(
  () =>
    [
      keyword.value.trim(),
      selectedTier.value !== '全部' ? selectedTier.value : '',
      selectedProvince.value !== '全部' ? selectedProvince.value : '',
      selectedRelevance.value !== '全部' ? `相关度${selectedRelevance.value}` : '',
      selectedStatus.value !== '全部' ? selectedStatus.value : '',
      onlyWithResearch.value ? '有调研' : '',
    ].filter(Boolean).length,
)

const hasActiveFilters = computed(() => activeFilterCount.value > 0)

const filterSummary = computed(() => {
  const activeItems = [
    keyword.value.trim() ? `关键词：${keyword.value.trim()}` : '',
    selectedTier.value !== '全部' ? `层次：${selectedTier.value}` : '',
    selectedProvince.value !== '全部' ? `省份：${selectedProvince.value}` : '',
    selectedRelevance.value !== '全部' ? `相关度：${selectedRelevance.value}` : '',
    selectedStatus.value !== '全部' ? `资料：${selectedStatus.value}` : '',
    onlyWithResearch.value ? '仅看：有调研' : '',
  ].filter(Boolean)

  return activeItems.length ? activeItems.join(' / ') : '未设置筛选'
})

function resetFilters() {
  keyword.value = ''
  selectedTier.value = '全部'
  selectedProvince.value = '全部'
  selectedRelevance.value = '全部'
  selectedStatus.value = '全部'
  onlyWithResearch.value = false
  filtersOpen.value = false
}

function toggleHighRelevance() {
  selectedRelevance.value = selectedRelevance.value === '高' ? '全部' : '高'
}

function togglePartialVerification() {
  selectedStatus.value = selectedStatus.value === '部分核验' ? '全部' : '部分核验'
}

function toggleWithResearch() {
  onlyWithResearch.value = !onlyWithResearch.value
}

function getPriorityRank(id: string) {
  const index = priorityUniversityIds.indexOf(id)

  return index === -1 ? priorityUniversityIds.length : index
}

const filteredUniversities = computed(() => {
  const normalizedKeyword = keyword.value.trim().toLowerCase()

  return universities
    .filter((university) => {
      const matchesTier = selectedTier.value === '全部' || university.tier === selectedTier.value
      const matchesProvince =
        selectedProvince.value === '全部' || university.province === selectedProvince.value
      const matchesRelevance =
        selectedRelevance.value === '全部' || university.verification.relevanceLevel === selectedRelevance.value
      const matchesStatus =
        selectedStatus.value === '全部' || university.verification.status === selectedStatus.value
      const matchesResearch = !onlyWithResearch.value || Boolean(university.research)

      const searchableText = [
        university.name,
        university.shortName,
        university.city,
        university.province,
        university.tier,
        university.focus,
        university.overview,
        university.verification.status,
        university.verification.relevanceLevel,
        university.verification.summary,
        ...university.tags,
        ...university.suitableFor,
        ...university.reminders,
        ...university.verification.verifiedFields,
        ...university.verification.pendingFields,
      ]
        .join(' ')
        .toLowerCase()

      const matchesKeyword =
        normalizedKeyword.length === 0 || searchableText.includes(normalizedKeyword)

      return (
        matchesTier &&
        matchesProvince &&
        matchesRelevance &&
        matchesStatus &&
        matchesResearch &&
        matchesKeyword
      )
    })
    .sort((left, right) => {
      const priorityDiff = getPriorityRank(left.id) - getPriorityRank(right.id)

      if (priorityDiff !== 0) {
        return priorityDiff
      }

      const relevanceDiff =
        relevanceRank[left.verification.relevanceLevel] -
        relevanceRank[right.verification.relevanceLevel]

      if (relevanceDiff !== 0) {
        return relevanceDiff
      }

      return left.name.localeCompare(right.name, 'zh-Hans-CN')
    })
})

const universityPageCount = computed(() =>
  Math.max(Math.ceil(filteredUniversities.value.length / listPageSize), 1),
)
const universityPageStart = computed(() => (currentUniversityPage.value - 1) * listPageSize)
const visibleUniversities = computed(() =>
  filteredUniversities.value.slice(
    universityPageStart.value,
    universityPageStart.value + listPageSize,
  ),
)
const universityDisplayStart = computed(() =>
  filteredUniversities.value.length ? universityPageStart.value + 1 : 0,
)
const universityDisplayEnd = computed(() =>
  filteredUniversities.value.length ? universityPageStart.value + visibleUniversities.value.length : 0,
)
const universityPageNumbers = computed(() =>
  Array.from({ length: universityPageCount.value }, (_, index) => index + 1),
)

watch(filteredUniversities, () => {
  currentUniversityPage.value = 1
})

const tierCounts = computed(() => countBy(universities, (university) => university.tier))
const statusCounts = computed(() => countBy(universities, (university) => university.verification.status))
const highRelevanceCount = computed(
  () => universities.filter((university) => university.verification.relevanceLevel === '高').length,
)
const withResearchCount = computed(() => universities.filter((university) => university.research).length)

function getPrimaryLink(university: University) {
  return (
    university.links.find((link) => link.type === '招生网' || link.type === '招生目录') ||
    university.links.find((link) => link.type === '学院官网') ||
    university.links.find((link) => link.type === '学校官网') ||
    university.links[0]
  )
}

function getPendingPreview(university: University) {
  return university.verification.pendingFields.slice(0, 2).join('、') || '当年招生目录和录取数据'
}

function getPendingCount(university: University) {
  return university.verification.pendingFields.length
}

async function setUniversityPage(page: number) {
  const nextPage = Math.min(Math.max(page, 1), universityPageCount.value)

  if (nextPage === currentUniversityPage.value) {
    return
  }

  currentUniversityPage.value = nextPage
  await nextTick()
  universityListTop.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <section class="universities-page min-h-screen overflow-x-hidden bg-[var(--page-bg)] px-4 pb-8 pt-28 text-[var(--text-primary)] md:px-6 md:pb-12 md:pt-32">
    <div class="universities-shell mx-auto flex w-full min-w-0 max-w-7xl flex-col gap-7">
      <header
        class="university-list-hero rounded-xl border p-5 md:p-6"
        :style="{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--glass-shadow)',
        }"
      >
        <div class="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(22rem,0.82fr)] xl:items-end">
        <div>
          <p class="mb-3 text-sm tracking-[0.16em] text-[var(--text-secondary)]">院校索引</p>
          <h1 class="text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
            院校一览
          </h1>
          <p class="mt-4 max-w-2xl text-base leading-8 text-[var(--text-secondary)]">
            先看城市和层次，再看资料完整度和专业线索。
          </p>
          <div class="mt-5 flex flex-wrap gap-3">
            <ActionButton to="/about-major" variant="secondary" size="sm">
              专业介绍
            </ActionButton>
            <ActionButton to="/companies" variant="secondary" size="sm">
              企业名录
            </ActionButton>
            <ActionButton to="/graduate" variant="tonal" size="sm">
              考研方向
            </ActionButton>
          </div>
        </div>

        <div class="university-summary-grid grid grid-cols-2 gap-3 text-sm">
          <div class="university-summary-card" :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)' }">
            <p class="text-[var(--text-tertiary)]">已收录</p>
            <p class="mt-1 text-2xl font-semibold text-[var(--text-primary)]">{{ universities.length }}</p>
          </div>
          <div class="university-summary-card" :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)' }">
            <p class="text-[var(--text-tertiary)]">高相关</p>
            <p class="mt-1 text-2xl font-semibold text-[var(--text-primary)]">{{ highRelevanceCount }}</p>
          </div>
          <div class="university-summary-card" :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)' }">
            <p class="text-[var(--text-tertiary)]">有调研</p>
            <p class="mt-1 text-2xl font-semibold text-[var(--text-primary)]">{{ withResearchCount }}</p>
          </div>
          <div class="university-summary-card" :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)' }">
            <p class="text-[var(--text-tertiary)]">部分核验</p>
            <p class="mt-1 text-2xl font-semibold text-[var(--text-primary)]">
              {{ statusCounts['部分核验'] || 0 }}
            </p>
          </div>
        </div>
        </div>
      </header>

      <section
        class="flex flex-wrap items-center gap-2 rounded-xl border p-3"
        :style="{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--glass-shadow)',
        }"
      >
        <p class="mr-1 text-sm text-[var(--text-tertiary)]">先缩小范围</p>

        <button
          type="button"
          class="rounded-full border px-3 py-1.5 text-sm font-medium transition hover:-translate-y-0.5"
          :style="{
            backgroundColor: selectedRelevance === '高' ? 'var(--accent-soft)' : 'var(--surface-strong)',
            borderColor: selectedRelevance === '高' ? 'var(--accent)' : 'var(--border)',
            color: selectedRelevance === '高' ? 'var(--accent)' : 'var(--text-secondary)',
          }"
          @click="toggleHighRelevance"
        >
          高相关
        </button>

        <button
          type="button"
          class="rounded-full border px-3 py-1.5 text-sm font-medium transition hover:-translate-y-0.5"
          :style="{
            backgroundColor: onlyWithResearch ? 'var(--accent-soft)' : 'var(--surface-strong)',
            borderColor: onlyWithResearch ? 'var(--accent)' : 'var(--border)',
            color: onlyWithResearch ? 'var(--accent)' : 'var(--text-secondary)',
          }"
          @click="toggleWithResearch"
        >
          有调研
        </button>

        <button
          type="button"
          class="rounded-full border px-3 py-1.5 text-sm font-medium transition hover:-translate-y-0.5"
          :style="{
            backgroundColor: selectedStatus === '部分核验' ? 'var(--accent-soft)' : 'var(--surface-strong)',
            borderColor: selectedStatus === '部分核验' ? 'var(--accent)' : 'var(--border)',
            color: selectedStatus === '部分核验' ? 'var(--accent)' : 'var(--text-secondary)',
          }"
          @click="togglePartialVerification"
        >
          部分核验
        </button>
      </section>

      <div
        class="rounded-xl border p-3 md:hidden"
        :style="{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--glass-shadow)',
        }"
      >
        <div class="flex items-center justify-between gap-3">
          <div class="min-w-0">
            <p class="text-sm font-medium text-[var(--text-primary)]">换个条件再找</p>
            <p class="mt-1 truncate text-xs text-[var(--text-tertiary)]">
              {{ filterSummary }}
            </p>
          </div>
          <button
            type="button"
            class="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-white"
            :style="{ backgroundColor: 'var(--accent)' }"
            :aria-expanded="filtersOpen"
            @click="filtersOpen = !filtersOpen"
          >
            {{ filtersOpen ? '收起' : activeFilterCount ? `筛选 ${activeFilterCount}` : '筛选' }}
          </button>
        </div>
      </div>

      <section
        class="gap-3 rounded-xl border p-4 md:grid md:grid-cols-2 xl:grid-cols-[minmax(0,1.35fr)_repeat(4,minmax(8rem,0.7fr))_auto]"
        :class="filtersOpen ? 'grid' : 'hidden md:grid'"
        :style="{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--glass-shadow)',
        }"
      >
        <label class="flex flex-col gap-2">
          <span class="text-xs text-[var(--text-tertiary)]">搜索</span>
          <input
            v-model="keyword"
            type="text"
            placeholder="比如：北京、兵器、211"
            class="h-10 rounded-lg border px-3 text-sm outline-none transition"
            :style="{
              backgroundColor: 'var(--surface-strong)',
              borderColor: 'var(--border)',
              color: 'var(--text-primary)',
            }"
          />
        </label>

        <label class="flex flex-col gap-2">
          <span class="text-xs text-[var(--text-tertiary)]">层次</span>
          <select
            v-model="selectedTier"
            class="h-10 rounded-lg border px-3 text-sm outline-none transition"
            :style="{
              backgroundColor: 'var(--surface-strong)',
              borderColor: 'var(--border)',
              color: 'var(--text-primary)',
            }"
          >
            <option value="全部">全部</option>
            <option v-for="option in tierOptions" :key="option" :value="option">
              {{ option }}（{{ tierCounts[option] || 0 }}）
            </option>
          </select>
        </label>

        <label class="flex flex-col gap-2">
          <span class="text-xs text-[var(--text-tertiary)]">省份</span>
          <select
            v-model="selectedProvince"
            class="h-10 rounded-lg border px-3 text-sm outline-none transition"
            :style="{
              backgroundColor: 'var(--surface-strong)',
              borderColor: 'var(--border)',
              color: 'var(--text-primary)',
            }"
          >
            <option value="全部">全部</option>
            <option v-for="option in provinceOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </label>

        <label class="flex flex-col gap-2">
          <span class="text-xs text-[var(--text-tertiary)]">相关度</span>
          <select
            v-model="selectedRelevance"
            class="h-10 rounded-lg border px-3 text-sm outline-none transition"
            :style="{
              backgroundColor: 'var(--surface-strong)',
              borderColor: 'var(--border)',
              color: 'var(--text-primary)',
            }"
          >
            <option value="全部">全部</option>
            <option v-for="option in relevanceOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </label>

        <label class="flex flex-col gap-2">
          <span class="text-xs text-[var(--text-tertiary)]">资料</span>
          <select
            v-model="selectedStatus"
            class="h-10 rounded-lg border px-3 text-sm outline-none transition"
            :style="{
              backgroundColor: 'var(--surface-strong)',
              borderColor: 'var(--border)',
              color: 'var(--text-primary)',
            }"
          >
            <option value="全部">全部</option>
            <option v-for="option in statusOptions" :key="option" :value="option">
              {{ option }}（{{ statusCounts[option] || 0 }}）
            </option>
          </select>
        </label>

        <button
          type="button"
          class="mt-auto h-10 rounded-lg border px-4 text-sm font-medium transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
          :disabled="!hasActiveFilters"
          :style="{
            backgroundColor: 'var(--surface-strong)',
            borderColor: 'var(--border)',
            color: 'var(--text-secondary)',
          }"
          @click="resetFilters"
        >
          重置
        </button>
      </section>

      <div
        ref="universityListTop"
        class="flex flex-wrap items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm text-[var(--text-secondary)]"
        :style="{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--glass-shadow)',
        }"
      >
        <p>
          现在看到第 {{ currentUniversityPage }} / {{ universityPageCount }} 页，
          共 {{ filteredUniversities.length }} 所，当前是 {{ universityDisplayStart }}-{{ universityDisplayEnd }}
        </p>
      </div>

      <section v-if="filteredUniversities.length > 0" class="overflow-hidden rounded-xl border" :style="{ borderColor: 'var(--border)' }">
        <div
          class="hidden grid-cols-[minmax(20rem,1.35fr)_minmax(10rem,0.58fr)_minmax(17rem,0.92fr)_minmax(6rem,0.32fr)] gap-4 border-b px-5 py-3 text-xs text-[var(--text-tertiary)] xl:grid"
          :style="{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }"
        >
          <span>院校 / 状态</span>
          <span>地区与层次</span>
          <span>专业线索</span>
          <span class="text-right">操作</span>
        </div>

        <article
          v-for="university in visibleUniversities"
          :key="university.id"
          class="group grid gap-3 border-b px-4 py-3.5 transition last:border-b-0 hover:bg-[var(--surface)] xl:grid-cols-[minmax(20rem,1.35fr)_minmax(10rem,0.58fr)_minmax(17rem,0.92fr)_minmax(6rem,0.32fr)] xl:items-center xl:px-5"
          :style="{
            backgroundColor: 'var(--surface-strong)',
            borderColor: 'var(--border)',
          }"
        >
          <div class="order-1 flex min-w-0 items-start gap-3 xl:order-none">
            <div
              class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border p-1.5"
              :style="{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
              }"
            >
              <SchoolLogo :src="university.logo" :name="university.name" />
            </div>

            <div class="min-w-0 flex-1">
              <div class="mb-2 flex flex-wrap items-center gap-2">
                <StatusPill :value="university.verification.relevanceLevel" prefix="相关度" size="xs" />
                <StatusPill :value="university.verification.status" size="xs" />
              </div>
              <RouterLink
                :to="`/universities/${university.id}`"
                class="block text-lg font-semibold leading-7 text-[var(--text-primary)] transition hover:text-[var(--accent)]"
              >
                {{ university.name }}
              </RouterLink>
              <p class="mt-2 line-clamp-1 text-sm leading-6 text-[var(--text-secondary)]">
                {{ university.overview }}
              </p>
            </div>
          </div>

          <div class="order-3 text-sm leading-6 text-[var(--text-secondary)] xl:order-none">
            <p class="font-medium text-[var(--text-primary)]">{{ university.city }}</p>
            <p>{{ university.province }}</p>
            <p class="mt-1 text-[var(--text-tertiary)]">{{ university.tier }}</p>
          </div>

          <div class="order-4 min-w-0 text-sm leading-6 text-[var(--text-secondary)] xl:order-none">
            <p class="line-clamp-2">{{ university.focus }}</p>
            <div class="mt-2 flex flex-wrap gap-2">
              <span
                v-for="tag in university.tags.slice(0, 2)"
                :key="tag"
                class="rounded-full px-2.5 py-1 text-xs"
                :style="{ backgroundColor: 'var(--surface-muted)', color: 'var(--text-secondary)' }"
              >
                {{ tag }}
              </span>
            </div>
            <details class="mt-1 text-xs leading-5 text-[var(--text-tertiary)]">
              <summary class="w-fit cursor-pointer rounded-full px-2 py-0.5" :style="{ backgroundColor: 'var(--surface-muted)' }">
                待核对 {{ getPendingCount(university) }} 项
              </summary>
              <p class="mt-1 leading-5">{{ getPendingPreview(university) }}</p>
            </details>
          </div>

          <div class="order-2 grid gap-2 sm:flex sm:flex-wrap xl:order-none xl:justify-end">
            <ActionButton :to="`/universities/${university.id}`" variant="primary" size="sm">
              看详情
            </ActionButton>
            <ActionButton
              v-if="getPrimaryLink(university)"
              :href="getPrimaryLink(university)?.url"
              variant="secondary"
              size="sm"
              new-tab
            >
              外部入口
            </ActionButton>
          </div>
        </article>
      </section>

      <nav
        v-if="universityPageCount > 1"
        class="flex flex-col items-center justify-between gap-3 rounded-xl border p-3 text-sm md:flex-row"
        :style="{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--glass-shadow)',
        }"
        aria-label="院校列表分页"
      >
        <p class="text-[var(--text-secondary)]">每页 {{ listPageSize }} 所</p>

        <div class="flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            class="rounded-lg border px-3 py-2 font-medium transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45"
            :disabled="currentUniversityPage === 1"
            :style="{
              backgroundColor: 'var(--surface-strong)',
              borderColor: 'var(--border)',
              color: 'var(--text-secondary)',
            }"
            @click="setUniversityPage(currentUniversityPage - 1)"
          >
            上一页
          </button>

          <button
            v-for="page in universityPageNumbers"
            :key="page"
            type="button"
            class="min-h-10 min-w-10 rounded-lg border px-3 py-2 font-medium transition hover:-translate-y-0.5"
            :aria-current="page === currentUniversityPage ? 'page' : undefined"
            :style="{
              backgroundColor: page === currentUniversityPage ? 'var(--accent)' : 'var(--surface-strong)',
              borderColor: page === currentUniversityPage ? 'var(--accent)' : 'var(--border)',
              color: page === currentUniversityPage ? '#ffffff' : 'var(--text-secondary)',
            }"
            @click="setUniversityPage(page)"
          >
            {{ page }}
          </button>

          <button
            type="button"
            class="rounded-lg border px-3 py-2 font-medium transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45"
            :disabled="currentUniversityPage === universityPageCount"
            :style="{
              backgroundColor: 'var(--surface-strong)',
              borderColor: 'var(--border)',
              color: 'var(--text-secondary)',
            }"
            @click="setUniversityPage(currentUniversityPage + 1)"
          >
            下一页
          </button>
        </div>
      </nav>

      <div
        v-if="filteredUniversities.length > 0 && universityPageCount === 1"
        class="flex justify-center text-sm text-[var(--text-tertiary)]"
      >
        <span
          class="rounded-lg border px-4 py-2"
          :style="{
            backgroundColor: 'var(--surface-strong)',
            borderColor: 'var(--border)',
          }"
        >
          匹配到的院校都在这里了
        </span>
      </div>

      <EmptyStatePanel
        v-if="filteredUniversities.length === 0"
        eyebrow="院校索引"
        title="没有匹配的院校"
        description="换个省份、层次、相关度、资料状态，或者直接搜城市、方向、标签。"
      >
        <template #actions>
          <ActionButton variant="primary" @click="resetFilters">
            清空筛选
          </ActionButton>
        </template>
      </EmptyStatePanel>
    </div>
  </section>
</template>

<style scoped>
.universities-page {
  max-width: 100vw;
}

.universities-shell {
  max-width: min(84rem, 100%);
}

.university-list-hero {
  position: relative;
  overflow: hidden;
}

.university-list-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(135deg, rgba(190, 98, 82, 0.08), transparent 36%),
    linear-gradient(315deg, rgba(47, 125, 79, 0.06), transparent 42%);
  pointer-events: none;
}

.university-list-hero > * {
  position: relative;
  z-index: 1;
}

.university-summary-card {
  border: 1px solid;
  border-radius: 0.95rem;
  min-height: 6.8rem;
  padding: 1rem 1rem 0.95rem;
}

.universities-page :where(header, section, article, div, p, h1, h2, a, span, label, input, select, button) {
  min-width: 0;
}

.universities-page :where(p, h1, h2, a, span, button) {
  line-break: anywhere;
  overflow-wrap: anywhere;
  word-break: break-word;
}

@media (max-width: 639px) {
  .universities-page {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .universities-shell {
    inline-size: 100% !important;
    max-inline-size: 100% !important;
    margin-left: 0;
    margin-right: 0;
  }

  .university-summary-card {
    min-height: 0;
    padding: 0.85rem 0.85rem 0.8rem;
  }

  .universities-shell > :where(header, section, div) {
    inline-size: 100% !important;
    max-inline-size: 100% !important;
  }

  .universities-shell :where(header, section, div, p, h1, h2, a, span, label, input, select, button) {
    max-inline-size: 100% !important;
    box-sizing: border-box;
  }
}

@media (min-width: 900px) {
  .university-summary-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
