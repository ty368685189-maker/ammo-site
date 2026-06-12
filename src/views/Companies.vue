<script setup lang="ts">
import ActionButton from '../components/ActionButton.vue'
import EmptyStatePanel from '../components/EmptyStatePanel.vue'
import StatusPill from '../components/StatusPill.vue'
import { computed, nextTick, ref, watch } from 'vue'
import {
  companies,
  companyOwnershipOptions,
  type Company,
  type RelevanceLevel,
  type VerificationStatus,
} from '../data/companies'
import { countBy } from '../utils/status'

const keyword = ref('')
const selectedOwnership = ref<'全部' | (typeof companyOwnershipOptions)[number]>('全部')
const selectedCity = ref('全部')
const selectedDirection = ref<'全部' | CompanyDirection>('全部')
const selectedRelevance = ref<'全部' | RelevanceLevel>('全部')
const selectedStatus = ref<'全部' | VerificationStatus>('全部')
const onlyWithResearch = ref(false)
const filtersOpen = ref(false)
const listPageSize = 10
const currentCompanyPage = ref(1)
const companyListTop = ref<HTMLElement | null>(null)

type CompanyDirection =
  | '民爆产品'
  | '爆破工程'
  | '电子雷管'
  | '含能材料'
  | '火工品'
  | '安全评价 / 检测'
  | '智能装备'
  | '军工科研 / 试验'

const cityOptions = computed(() =>
  Array.from(new Set(companies.map((company) => `${company.city} · ${company.region}`))).sort(),
)

const directionOptions: CompanyDirection[] = [
  '民爆产品',
  '爆破工程',
  '电子雷管',
  '含能材料',
  '火工品',
  '安全评价 / 检测',
  '智能装备',
  '军工科研 / 试验',
]
const relevanceOptions: RelevanceLevel[] = ['高', '中', '低', '待核对']
const statusOptions: VerificationStatus[] = ['已核验', '部分核验', '过期待复查']
const relevanceRank: Record<RelevanceLevel, number> = {
  高: 0,
  中: 1,
  低: 2,
  待核对: 3,
}

const activeFilterCount = computed(
  () =>
    [
      keyword.value.trim(),
      selectedOwnership.value !== '全部' ? selectedOwnership.value : '',
      selectedCity.value !== '全部' ? selectedCity.value : '',
      selectedDirection.value !== '全部' ? selectedDirection.value : '',
      selectedRelevance.value !== '全部' ? `相关度${selectedRelevance.value}` : '',
      selectedStatus.value !== '全部' ? selectedStatus.value : '',
      onlyWithResearch.value ? '有调研' : '',
    ].filter(Boolean).length,
)

const hasActiveFilters = computed(() => activeFilterCount.value > 0)

const filterSummary = computed(() => {
  const activeItems = [
    keyword.value.trim() ? `关键词：${keyword.value.trim()}` : '',
    selectedOwnership.value !== '全部' ? `性质：${selectedOwnership.value}` : '',
    selectedCity.value !== '全部' ? `地区：${selectedCity.value}` : '',
    selectedDirection.value !== '全部' ? `方向：${selectedDirection.value}` : '',
    selectedRelevance.value !== '全部' ? `相关度：${selectedRelevance.value}` : '',
    selectedStatus.value !== '全部' ? `资料：${selectedStatus.value}` : '',
    onlyWithResearch.value ? '仅看：有调研' : '',
  ].filter(Boolean)

  return activeItems.length ? activeItems.join(' / ') : '未设置筛选'
})

function resetFilters() {
  keyword.value = ''
  selectedOwnership.value = '全部'
  selectedCity.value = '全部'
  selectedDirection.value = '全部'
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

function getSearchableCompanyText(company: Company) {
  return [
    company.name,
    company.city,
    company.region,
    company.ownership,
    company.scaleOrIndustry,
    company.positions,
    company.education,
    company.description,
    company.schedule,
    company.salaryRange,
    company.verification.status,
    company.verification.relevanceLevel,
    company.verification.summary,
    ...company.highlights,
    ...company.verification.verifiedFields,
    ...company.verification.pendingFields,
  ]
    .join(' ')
    .toLowerCase()
}

function matchesCompanyDirection(company: Company) {
  if (selectedDirection.value === '全部') {
    return true
  }

  const searchableText = getSearchableCompanyText(company)
  const includesAny = (terms: string[]) => terms.some((term) => searchableText.includes(term))

  const directionTerms: Record<CompanyDirection, string[]> = {
    民爆产品: ['民爆', '炸药', '雷管', '导爆索', '爆破器材'],
    爆破工程: ['爆破工程', '工程爆破', '爆破施工', '矿山爆破'],
    电子雷管: ['电子雷管', '数码雷管', '起爆器', '起爆控制', '芯片'],
    含能材料: ['含能材料', '火炸药', '推进剂', '发射药', '装药'],
    火工品: ['火工品', '引信', '点火', '起爆药'],
    '安全评价 / 检测': ['安全评价', '防爆检测', '检测检验', '安全技术', '消防安全', '风险评估'],
    智能装备: ['智能装备', '自动化', '智能制造', '生产线', '控制系统'],
    '军工科研 / 试验': ['研究所', '研究院', '试验', '测试', '兵器', '航天', '军工'],
  }

  return includesAny(directionTerms[selectedDirection.value])
}

const filteredCompanies = computed(() => {
  const normalizedKeyword = keyword.value.trim().toLowerCase()

  return companies
    .filter((company) => {
      const matchesOwnership =
        selectedOwnership.value === '全部' || company.ownership === selectedOwnership.value
      const matchesCity =
        selectedCity.value === '全部' || `${company.city} · ${company.region}` === selectedCity.value
      const matchesDirection = matchesCompanyDirection(company)
      const matchesRelevance =
        selectedRelevance.value === '全部' ||
        company.verification.relevanceLevel === selectedRelevance.value
      const matchesStatus =
        selectedStatus.value === '全部' || company.verification.status === selectedStatus.value
      const matchesResearch = !onlyWithResearch.value || Boolean(company.research)

      const searchableText = getSearchableCompanyText(company)

      const matchesKeyword =
        normalizedKeyword.length === 0 || searchableText.includes(normalizedKeyword)

      return (
        matchesOwnership &&
        matchesCity &&
        matchesDirection &&
        matchesRelevance &&
        matchesStatus &&
        matchesResearch &&
        matchesKeyword
      )
    })
    .sort((left, right) => {
      const relevanceDiff =
        relevanceRank[left.verification.relevanceLevel] -
        relevanceRank[right.verification.relevanceLevel]

      if (relevanceDiff !== 0) {
        return relevanceDiff
      }

      return left.name.localeCompare(right.name, 'zh-Hans-CN')
    })
})

const companyPageCount = computed(() =>
  Math.max(Math.ceil(filteredCompanies.value.length / listPageSize), 1),
)
const companyPageStart = computed(() => (currentCompanyPage.value - 1) * listPageSize)
const visibleCompanies = computed(() =>
  filteredCompanies.value.slice(companyPageStart.value, companyPageStart.value + listPageSize),
)
const companyDisplayStart = computed(() =>
  filteredCompanies.value.length ? companyPageStart.value + 1 : 0,
)
const companyDisplayEnd = computed(() =>
  filteredCompanies.value.length ? companyPageStart.value + visibleCompanies.value.length : 0,
)
const companyPageNumbers = computed(() =>
  Array.from({ length: companyPageCount.value }, (_, index) => index + 1),
)

watch(filteredCompanies, () => {
  currentCompanyPage.value = 1
})

const ownershipCounts = computed(() => countBy(companies, (company) => company.ownership))
const statusCounts = computed(() => countBy(companies, (company) => company.verification.status))
const highRelevanceCount = computed(
  () => companies.filter((company) => company.verification.relevanceLevel === '高').length,
)
const withResearchCount = computed(() => companies.filter((company) => company.research).length)

function getPrimaryLink(company: Company) {
  return (
    company.links.find((link) => link.type === '招聘公告' || link.type === '招聘入口') ||
    company.links.find((link) => link.type === '官网') ||
    company.links[0]
  )
}

function getPendingPreview(company: Company) {
  return company.verification.pendingFields.slice(0, 2).join('、') || '最新公告和具体岗位'
}

function getPendingCount(company: Company) {
  return company.verification.pendingFields.length
}

async function setCompanyPage(page: number) {
  const nextPage = Math.min(Math.max(page, 1), companyPageCount.value)

  if (nextPage === currentCompanyPage.value) {
    return
  }

  currentCompanyPage.value = nextPage
  await nextTick()
  companyListTop.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <section class="companies-page min-h-screen bg-[var(--page-bg)] px-4 pb-8 pt-28 text-[var(--text-primary)] md:px-6 md:pb-12 md:pt-32">
    <div class="companies-shell mx-auto flex w-full flex-col gap-7">
      <header
        class="company-list-hero rounded-xl border p-5 md:p-6"
        :style="{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--glass-shadow)',
        }"
      >
        <div class="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(22rem,0.82fr)] xl:items-end">
        <div>
          <p class="mb-3 text-sm tracking-[0.16em] text-[var(--text-secondary)]">企业索引</p>
          <h1 class="text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
            企业名录
          </h1>
          <p class="mt-4 max-w-2xl text-base leading-8 text-[var(--text-secondary)]">
            先看地区和方向，再判断值不值得继续细看岗位和资料。
          </p>
          <div class="mt-5 flex flex-wrap gap-3">
            <ActionButton to="/about-major" variant="secondary" size="sm">
              专业介绍
            </ActionButton>
            <ActionButton to="/universities" variant="secondary" size="sm">
              院校一览
            </ActionButton>
            <ActionButton to="/graduate" variant="tonal" size="sm">
              考研方向
            </ActionButton>
          </div>
        </div>

        <div class="company-summary-grid grid grid-cols-2 gap-3 text-sm">
          <div class="company-summary-card" :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)' }">
            <p class="text-[var(--text-tertiary)]">已收录</p>
            <p class="mt-1 text-2xl font-semibold text-[var(--text-primary)]">{{ companies.length }}</p>
          </div>
          <div class="company-summary-card" :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)' }">
            <p class="text-[var(--text-tertiary)]">高相关</p>
            <p class="mt-1 text-2xl font-semibold text-[var(--text-primary)]">{{ highRelevanceCount }}</p>
          </div>
          <div class="company-summary-card" :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)' }">
            <p class="text-[var(--text-tertiary)]">有调研</p>
            <p class="mt-1 text-2xl font-semibold text-[var(--text-primary)]">{{ withResearchCount }}</p>
          </div>
          <div class="company-summary-card" :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)' }">
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
        class="gap-3 rounded-xl border p-4 md:grid md:grid-cols-2 xl:grid-cols-[minmax(0,1.25fr)_repeat(5,minmax(7.5rem,0.7fr))_auto]"
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
            placeholder="公司、城市、岗位、民爆、火工品"
            class="h-10 rounded-lg border px-3 text-sm outline-none transition"
            :style="{
              backgroundColor: 'var(--surface-strong)',
              borderColor: 'var(--border)',
              color: 'var(--text-primary)',
            }"
          />
        </label>

        <label class="flex flex-col gap-2">
          <span class="text-xs text-[var(--text-tertiary)]">性质</span>
          <select
            v-model="selectedOwnership"
            class="h-10 rounded-lg border px-3 text-sm outline-none transition"
            :style="{
              backgroundColor: 'var(--surface-strong)',
              borderColor: 'var(--border)',
              color: 'var(--text-primary)',
            }"
          >
            <option value="全部">全部</option>
            <option v-for="option in companyOwnershipOptions" :key="option" :value="option">
              {{ option }}（{{ ownershipCounts[option] || 0 }}）
            </option>
          </select>
        </label>

        <label class="flex flex-col gap-2">
          <span class="text-xs text-[var(--text-tertiary)]">地区</span>
          <select
            v-model="selectedCity"
            class="h-10 rounded-lg border px-3 text-sm outline-none transition"
            :style="{
              backgroundColor: 'var(--surface-strong)',
              borderColor: 'var(--border)',
              color: 'var(--text-primary)',
            }"
          >
            <option value="全部">全部</option>
            <option v-for="option in cityOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </label>

        <label class="flex flex-col gap-2">
          <span class="text-xs text-[var(--text-tertiary)]">方向</span>
          <select
            v-model="selectedDirection"
            class="h-10 rounded-lg border px-3 text-sm outline-none transition"
            :style="{
              backgroundColor: 'var(--surface-strong)',
              borderColor: 'var(--border)',
              color: 'var(--text-primary)',
            }"
          >
            <option value="全部">全部</option>
            <option v-for="option in directionOptions" :key="option" :value="option">
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
        ref="companyListTop"
        class="flex flex-wrap items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm text-[var(--text-secondary)]"
        :style="{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--glass-shadow)',
        }"
      >
        <p>
          现在看到第 {{ currentCompanyPage }} / {{ companyPageCount }} 页，
          共 {{ filteredCompanies.length }} 家，当前是 {{ companyDisplayStart }}-{{ companyDisplayEnd }}
        </p>
      </div>

      <section v-if="filteredCompanies.length > 0" class="overflow-hidden rounded-xl border" :style="{ borderColor: 'var(--border)' }">
        <div
          class="hidden grid-cols-[minmax(20rem,1.35fr)_minmax(10rem,0.58fr)_minmax(16rem,0.9fr)_minmax(6rem,0.32fr)] gap-4 border-b px-5 py-3 text-xs text-[var(--text-tertiary)] xl:grid"
          :style="{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }"
        >
          <span>企业 / 状态</span>
          <span>地区与性质</span>
          <span>岗位线索</span>
          <span class="text-right">操作</span>
        </div>

        <article
          v-for="company in visibleCompanies"
          :key="company.id"
          class="grid gap-3 border-b px-4 py-4 transition last:border-b-0 hover:bg-[var(--surface)] xl:grid-cols-[minmax(20rem,1.35fr)_minmax(10rem,0.58fr)_minmax(16rem,0.9fr)_minmax(6rem,0.32fr)] xl:items-center xl:px-5"
          :style="{
            backgroundColor: 'var(--surface-strong)',
            borderColor: 'var(--border)',
          }"
        >
          <div class="min-w-0">
            <div class="mb-2 flex flex-wrap items-center gap-2">
              <StatusPill :value="company.verification.relevanceLevel" prefix="相关度" size="xs" />
              <StatusPill :value="company.verification.status" size="xs" />
            </div>
            <RouterLink
              :to="`/companies/${company.id}`"
              class="block text-lg font-semibold leading-7 text-[var(--text-primary)] transition hover:text-[var(--accent)]"
            >
              {{ company.name }}
            </RouterLink>
            <p class="mt-2 line-clamp-1 text-sm leading-6 text-[var(--text-secondary)]">
              {{ company.description }}
            </p>
            <div class="mt-3 flex flex-wrap gap-2">
              <span
                class="rounded-full px-2.5 py-1 text-xs"
                :style="{ backgroundColor: 'var(--surface-muted)', color: 'var(--text-secondary)' }"
              >
                {{ company.scaleOrIndustry }}
              </span>
              <span
                v-for="tag in company.highlights.slice(0, 2)"
                :key="tag"
                class="rounded-full px-2.5 py-1 text-xs"
                :style="{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent)' }"
              >
                {{ tag }}
              </span>
            </div>
          </div>

          <div class="order-3 text-sm leading-6 text-[var(--text-secondary)] xl:order-none">
            <p class="font-medium text-[var(--text-primary)]">{{ company.city }}</p>
            <p>{{ company.region }}</p>
            <p class="mt-1 text-[var(--text-tertiary)]">{{ company.ownership }}</p>
          </div>

          <div class="order-4 text-sm leading-6 text-[var(--text-secondary)] xl:order-none">
            <p class="line-clamp-2">{{ company.positions }}</p>
            <p class="mt-1 text-xs text-[var(--text-tertiary)]">{{ company.education }}</p>
            <details class="mt-1 text-xs leading-5 text-[var(--text-tertiary)]">
              <summary class="w-fit cursor-pointer rounded-full px-2 py-0.5" :style="{ backgroundColor: 'var(--surface-muted)' }">
                待核对 {{ getPendingCount(company) }} 项
              </summary>
              <p class="mt-1 leading-5">{{ getPendingPreview(company) }}</p>
            </details>
          </div>

          <div class="order-2 grid gap-2 sm:flex sm:flex-wrap xl:order-none xl:justify-end">
            <ActionButton :to="`/companies/${company.id}`" variant="primary" size="sm">
              看详情
            </ActionButton>
            <ActionButton
              v-if="getPrimaryLink(company)"
              :href="getPrimaryLink(company)?.url"
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
        v-if="companyPageCount > 1"
        class="flex flex-col items-center justify-between gap-3 rounded-xl border p-3 text-sm md:flex-row"
        :style="{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--glass-shadow)',
        }"
        aria-label="企业列表分页"
      >
        <p class="text-[var(--text-secondary)]">每页 {{ listPageSize }} 家</p>

        <div class="flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            class="rounded-lg border px-3 py-2 font-medium transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45"
            :disabled="currentCompanyPage === 1"
            :style="{
              backgroundColor: 'var(--surface-strong)',
              borderColor: 'var(--border)',
              color: 'var(--text-secondary)',
            }"
            @click="setCompanyPage(currentCompanyPage - 1)"
          >
            上一页
          </button>

          <button
            v-for="page in companyPageNumbers"
            :key="page"
            type="button"
            class="min-h-10 min-w-10 rounded-lg border px-3 py-2 font-medium transition hover:-translate-y-0.5"
            :aria-current="page === currentCompanyPage ? 'page' : undefined"
            :style="{
              backgroundColor: page === currentCompanyPage ? 'var(--accent)' : 'var(--surface-strong)',
              borderColor: page === currentCompanyPage ? 'var(--accent)' : 'var(--border)',
              color: page === currentCompanyPage ? '#ffffff' : 'var(--text-secondary)',
            }"
            @click="setCompanyPage(page)"
          >
            {{ page }}
          </button>

          <button
            type="button"
            class="rounded-lg border px-3 py-2 font-medium transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45"
            :disabled="currentCompanyPage === companyPageCount"
            :style="{
              backgroundColor: 'var(--surface-strong)',
              borderColor: 'var(--border)',
              color: 'var(--text-secondary)',
            }"
            @click="setCompanyPage(currentCompanyPage + 1)"
          >
            下一页
          </button>
        </div>
      </nav>

      <div
        v-if="filteredCompanies.length > 0 && companyPageCount === 1"
        class="flex justify-center text-sm text-[var(--text-tertiary)]"
      >
        <span
          class="rounded-lg border px-4 py-2"
          :style="{
            backgroundColor: 'var(--surface-strong)',
            borderColor: 'var(--border)',
          }"
        >
          匹配到的企业都在这里了
        </span>
      </div>

      <EmptyStatePanel
        v-if="filteredCompanies.length === 0"
        eyebrow="企业索引"
        title="没有匹配的企业"
        description="换个地区、相关度、资料状态，或者直接搜岗位、行业、城市。"
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
.companies-page {
  max-width: 100vw;
}

.companies-shell {
  max-width: min(84rem, 100%);
}

.company-list-hero {
  position: relative;
  overflow: hidden;
}

.company-list-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(135deg, rgba(190, 98, 82, 0.08), transparent 36%),
    linear-gradient(315deg, rgba(47, 125, 79, 0.06), transparent 42%);
  pointer-events: none;
}

.company-list-hero > * {
  position: relative;
  z-index: 1;
}

.company-summary-grid {
  align-self: stretch;
}

.company-summary-card {
  border: 1px solid;
  border-radius: 0.95rem;
  min-height: 6.8rem;
  padding: 1rem 1rem 0.95rem;
}

.companies-page :where(header, section, article, div, p, h1, h2, a, span, label, input, select, button, details, summary) {
  min-width: 0;
}

.companies-page :where(p, h1, h2, a, span, button, summary) {
  line-break: anywhere;
  overflow-wrap: anywhere;
  word-break: break-word;
}

@media (max-width: 639px) {
  .companies-page {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .companies-shell {
    inline-size: 100%;
    max-inline-size: 100%;
  }

  .company-summary-card {
    min-height: 0;
    padding: 0.85rem 0.85rem 0.8rem;
  }
}

@media (min-width: 900px) {
  .company-summary-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
