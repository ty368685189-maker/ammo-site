<script setup lang="ts">
import ActionButton from '../components/ActionButton.vue'
import EmptyStatePanel from '../components/EmptyStatePanel.vue'
import StatusPill from '../components/StatusPill.vue'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getCompanyById, type CompanyLink } from '../data/companies'
import SourceList from '../components/SourceList.vue'

const route = useRoute()

const companyId = computed(() => Number(route.params.id))
const company = computed(() => getCompanyById(companyId.value))
const research = computed(() => company.value?.research)
const verification = computed(() => company.value?.verification)
const activeSection = ref<'overview' | 'verification' | 'profile' | 'research'>('overview')

const pageSections = [
  { id: 'overview', label: '概览' },
  { id: 'verification', label: '核验' },
  { id: 'profile', label: '档案' },
  { id: 'research', label: '来源' },
] as const

const quickFacts = computed(() => {
  if (!company.value) {
    return []
  }

  return [
    { label: '性质', value: company.value.ownership },
    { label: '地区', value: `${company.value.city} · ${company.value.region}` },
    { label: '方向', value: company.value.scaleOrIndustry },
    { label: '更新', value: verification.value?.updatedAt || '待补充' },
  ]
})

const detailRows = computed(() => {
  if (!company.value) {
    return []
  }

  return [
    { label: '岗位线索', value: company.value.positions },
    { label: '学历要求', value: company.value.education },
    { label: '薪资范围', value: company.value.salaryRange },
    { label: '作息', value: company.value.schedule },
    { label: '行业 / 标签', value: [company.value.scaleOrIndustry, ...company.value.highlights].join(' / ') },
    { label: '官网 / 入口', value: company.value.website || '待核对' },
  ]
})

const frontRisks = computed(() => {
  const pendingFields = verification.value?.pendingFields || []
  const risks = research.value?.risks || []

  return [...pendingFields, ...risks].slice(0, 3)
})

const referenceLinks = computed(() => {
  if (!company.value) {
    return []
  }

  if (company.value.links.length) {
    return company.value.links
  }

  if (company.value.website) {
    const websiteLink: CompanyLink = {
      title: '公司官网 / 外部入口',
      type: '官网',
      url: company.value.website,
    }

    return [websiteLink]
  }

  return []
})

const priorityLinks = computed(() =>
  referenceLinks.value
    .filter((link) => ['官网', '招聘入口', '招聘公告', '学校就业网'].includes(link.type))
    .slice(0, 3),
)

const sourceCount = computed(() => research.value?.sources.length || 0)
const verifiedCount = computed(() => verification.value?.verifiedFields.length || 0)
const pendingCount = computed(() => verification.value?.pendingFields.length || 0)
const sourceTypes = computed(() =>
  Array.from(new Set((research.value?.sources || []).map((source) => source.type))).slice(0, 4),
)
</script>

<template>
  <section class="company-detail-page min-h-screen overflow-x-clip bg-[var(--page-bg)] px-4 pb-8 pt-28 text-[var(--text-primary)] md:px-6 md:pb-12 md:pt-32">
    <div class="company-detail-shell mx-auto flex w-full min-w-0 max-w-6xl flex-col gap-6">
      <template v-if="company">
        <header
          class="company-detail-hero rounded-xl border p-5 md:p-6"
          :style="{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
            boxShadow: 'var(--glass-shadow)',
          }"
        >
          <div class="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,0.45fr)] xl:items-start">
            <div class="min-w-0">
              <div class="mb-4 flex flex-wrap gap-2">
                <ActionButton to="/companies" variant="secondary" size="sm">
                  回企业名录
                </ActionButton>
                <ActionButton to="/universities" variant="secondary" size="sm">
                  看院校一览
                </ActionButton>
                <ActionButton to="/about-major" variant="tonal" size="sm">
                  专业介绍
                </ActionButton>
              </div>
              <p class="mb-3 text-sm tracking-[0.16em] text-[var(--text-secondary)]">企业档案</p>
              <h1 class="company-name-title max-w-full text-xl font-semibold leading-tight text-[var(--text-primary)] sm:text-2xl md:max-w-4xl md:text-3xl">
                {{ company.name }}
              </h1>
              <p class="mt-3 max-w-3xl text-sm leading-7 text-[var(--text-secondary)] md:text-base">
                {{ company.description }}
              </p>

              <div class="mt-4 flex flex-wrap gap-2">
                <StatusPill :value="verification?.relevanceLevel" prefix="相关度" />
                <StatusPill :value="verification?.status || '资料待核对'" />
                <span
                  class="rounded-lg px-3 py-1 text-sm"
                  :style="{ backgroundColor: 'var(--surface-muted)', color: 'var(--text-secondary)' }"
                >
                  {{ company.city }} · {{ company.region }}
                </span>
              </div>

              <p class="mt-4 max-w-4xl text-sm font-medium leading-7 text-[var(--text-primary)]">
                {{ company.positions !== '待核对' ? company.positions : company.scaleOrIndustry }}
              </p>
            </div>

            <aside
              class="rounded-xl border p-4"
              :style="{
                backgroundColor: 'color-mix(in srgb, var(--surface) 86%, var(--status-warning-soft) 14%)',
                borderColor: 'var(--status-warning-border)',
              }"
            >
              <div class="flex items-start justify-between gap-3">
                <div>
                  <p class="text-sm font-medium" :style="{ color: 'var(--status-warning)' }">待核对</p>
                </div>
                <span
                  class="rounded-lg px-2.5 py-1 text-xs font-medium"
                  :style="{ backgroundColor: 'var(--surface)', color: 'var(--status-warning)' }"
                >
                  {{ pendingCount }} 项
                </span>
              </div>
              <div v-if="frontRisks.length" class="mt-3 flex flex-wrap gap-2">
                <span
                  v-for="risk in frontRisks"
                  :key="risk"
                  class="rounded-lg border px-2.5 py-1 text-xs"
                  :style="{
                    backgroundColor: 'var(--surface)',
                    borderColor: 'var(--status-warning-border)',
                    color: 'var(--text-secondary)',
                  }"
                >
                  {{ risk }}
                </span>
              </div>

              <div v-if="priorityLinks.length" class="mt-4 flex flex-wrap gap-2">
                <ActionButton
                  v-for="link in priorityLinks"
                  :key="`${link.type}-${link.url}`"
                  :href="link.url"
                  variant="secondary"
                  size="sm"
                  new-tab
                >
                  {{ link.type }}
                </ActionButton>
              </div>
            </aside>
          </div>

          <div class="mt-5 grid gap-3 border-t pt-4 text-sm sm:grid-cols-2 xl:grid-cols-4" :style="{ borderColor: 'var(--border)' }">
            <div v-for="fact in quickFacts" :key="fact.label">
              <p class="text-[var(--text-tertiary)]">{{ fact.label }}</p>
              <p class="mt-1 font-medium leading-6 text-[var(--text-primary)]">{{ fact.value }}</p>
            </div>
          </div>
        </header>

        <nav
          class="company-detail-subnav sticky top-32 z-30 overflow-x-auto rounded-xl border p-2 backdrop-blur md:top-24"
          :style="{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
            boxShadow: 'var(--glass-shadow)',
          }"
          aria-label="企业详情小导航"
        >
          <div class="flex min-w-max gap-2">
            <button
              v-for="section in pageSections"
              :key="section.id"
              type="button"
              class="rounded-lg px-4 py-2 text-sm font-medium transition"
              :aria-pressed="activeSection === section.id"
              :style="{
                backgroundColor: activeSection === section.id ? 'var(--accent)' : 'var(--surface-strong)',
                color: activeSection === section.id ? '#ffffff' : 'var(--text-secondary)',
              }"
              @click="activeSection = section.id"
            >
              {{ section.label }}
            </button>
          </div>
        </nav>

        <section
          class="detail-content-shell rounded-xl border p-5 md:p-6"
          :style="{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
            boxShadow: 'var(--glass-shadow)',
          }"
        >
          <div v-if="activeSection === 'overview'">
            <div class="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p class="text-sm tracking-[0.14em] text-[var(--text-tertiary)]">概览</p>
                <h2 class="mt-2 text-xl font-semibold text-[var(--text-primary)]">关键信息摘要</h2>
              </div>
            </div>

            <div class="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,0.42fr)]">
              <div class="grid gap-3 md:grid-cols-2">
                <div class="detail-panel rounded-xl border p-4" :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)' }">
                  <p class="text-sm font-medium text-[var(--text-primary)]">岗位线索</p>
                  <p class="mt-2 text-sm leading-7 text-[var(--text-secondary)]">{{ company.positions }}</p>
                  <p class="mt-2 text-xs leading-5 text-[var(--text-tertiary)]">{{ company.education }}</p>
                </div>

                <div class="detail-panel rounded-xl border p-4" :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)' }">
                  <p class="text-sm font-medium text-[var(--text-primary)]">待遇口径</p>
                  <p class="mt-2 text-sm leading-7 text-[var(--text-secondary)]">薪资：{{ company.salaryRange }}</p>
                  <p class="mt-1 text-sm leading-7 text-[var(--text-secondary)]">作息：{{ company.schedule }}</p>
                </div>

                <div class="detail-panel rounded-xl border p-4 md:col-span-2" :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--status-warning-border)' }">
                  <p class="text-sm font-medium" :style="{ color: 'var(--status-warning)' }">不确定信息</p>
                  <div v-if="frontRisks.length" class="mt-3 flex flex-wrap gap-2">
                    <span
                      v-for="risk in frontRisks"
                      :key="risk"
                      class="rounded-lg border px-2.5 py-1 text-xs"
                      :style="{
                        backgroundColor: 'var(--surface)',
                        borderColor: 'var(--status-warning-border)',
                        color: 'var(--text-secondary)',
                      }"
                    >
                      {{ risk }}
                    </span>
                  </div>
                </div>
              </div>

              <aside class="detail-panel rounded-xl border p-4" :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)' }">
                <p class="text-sm font-medium text-[var(--text-primary)]">外部链接</p>
                <div v-if="priorityLinks.length" class="mt-3 flex flex-col gap-2">
                  <ActionButton
                    v-for="link in priorityLinks"
                    :key="`${link.type}-${link.url}`"
                    :href="link.url"
                    variant="secondary"
                    size="sm"
                    new-tab
                  >
                    {{ link.type }}
                  </ActionButton>
                </div>
              </aside>
            </div>
          </div>

          <div v-else-if="activeSection === 'research'">
            <div class="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p class="text-sm tracking-[0.14em] text-[var(--text-tertiary)]">外部链接</p>
                <h2 class="mt-2 text-xl font-semibold text-[var(--text-primary)]">官网与招聘</h2>
              </div>
            </div>

            <div class="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              <template v-if="referenceLinks.length">
                <a
                  v-for="link in referenceLinks"
                  :key="`${link.type}-${link.url}`"
                  :href="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group block rounded-lg border px-4 py-4 text-sm transition hover:-translate-y-0.5"
                  :style="{
                    backgroundColor: 'var(--surface-strong)',
                    borderColor: 'var(--border)',
                    color: 'var(--text-primary)',
                  }"
                >
                  <span class="flex items-start justify-between gap-3">
                    <span>
                      <span class="block font-medium leading-6">{{ link.title }}</span>
                      <span class="mt-1 block text-[var(--text-tertiary)]">{{ link.type }}</span>
                    </span>
                    <span
                      class="shrink-0 rounded-lg border px-2.5 py-1 text-xs transition group-hover:-translate-y-0.5"
                      :style="{
                        backgroundColor: 'var(--accent-soft)',
                        borderColor: 'var(--border)',
                        color: 'var(--accent)',
                      }"
                    >
                      打开
                    </span>
                  </span>
                  <span v-if="link.note" class="mt-2 block leading-6 text-[var(--text-secondary)]">
                    {{ link.note }}
                  </span>
                </a>
              </template>

              <div
                v-else
                class="rounded-lg border px-4 py-4"
                :style="{
                  backgroundColor: 'var(--surface-strong)',
                  borderColor: 'var(--border)',
                }"
                >
                <p class="text-sm font-medium text-[var(--text-primary)]">暂无入口</p>
              </div>
            </div>

            <div class="mt-8 border-t pt-6" :style="{ borderColor: 'var(--border)' }">
              <p class="text-sm tracking-[0.14em] text-[var(--text-tertiary)]">调研来源与信号</p>
              <template v-if="research">
                <div class="mt-3 grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,0.42fr)]">
                  <div>
                <div class="flex flex-wrap items-center gap-2">
                      <StatusPill :value="research.relevanceLevel" prefix="相关度：" />
                      <span class="text-sm text-[var(--text-tertiary)]">最后更新：{{ research.updatedAt }}</span>
                    </div>
                    <p class="mt-4 text-sm font-medium text-[var(--text-primary)]">结论摘要</p>
                    <p class="mt-2 text-sm leading-7 text-[var(--text-secondary)]">{{ research.conclusion }}</p>
                  </div>

                  <div class="rounded-lg border p-4" :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)' }">
                    <p class="text-sm font-medium text-[var(--text-primary)]">来源概况</p>
                <div class="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div class="detail-mini-stat rounded-lg border px-3 py-3" :style="{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }">
                    <p class="text-[var(--text-tertiary)]">来源数</p>
                    <p class="mt-1 text-lg font-semibold text-[var(--text-primary)]">{{ sourceCount }}</p>
                  </div>
                  <div class="detail-mini-stat rounded-lg border px-3 py-3" :style="{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }">
                    <p class="text-[var(--text-tertiary)]">状态</p>
                    <p class="mt-1 text-sm font-medium leading-6 text-[var(--text-primary)]">{{ research.status }}</p>
                  </div>
                    </div>
                    <div v-if="sourceTypes.length" class="mt-3 flex flex-wrap gap-2">
                      <span
                        v-for="type in sourceTypes"
                        :key="type"
                        class="rounded-lg px-2.5 py-1 text-xs"
                        :style="{ backgroundColor: 'var(--surface-muted)', color: 'var(--text-secondary)' }"
                      >
                        {{ type }}
                      </span>
                    </div>
                  </div>
                </div>

                <div class="mt-6 grid gap-4 md:grid-cols-2">
                  <div class="detail-panel rounded-xl border p-4" :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)' }">
                    <p class="text-sm font-medium text-[var(--text-primary)]">关键信号</p>
                    <ul class="mt-3 space-y-2 text-sm leading-6 text-[var(--text-secondary)]">
                      <li v-for="signal in research.keySignals" :key="signal">{{ signal }}</li>
                    </ul>
                  </div>

                  <div class="detail-panel rounded-xl border p-4" :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)' }">
                    <p class="text-sm font-medium text-[var(--text-primary)]">注意事项</p>
                    <ul class="mt-3 space-y-2 text-sm leading-6 text-[var(--text-secondary)]">
                      <li v-for="risk in research.risks" :key="risk">{{ risk }}</li>
                    </ul>
                  </div>
                </div>

                <details class="mt-6 rounded-xl border p-4" :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--border)' }">
                  <summary class="cursor-pointer text-sm font-medium text-[var(--text-primary)]">
                    展开来源列表
                  </summary>
                  <SourceList :sources="research.sources" />
                </details>
              </template>

              <template v-else>
              <EmptyStatePanel
                eyebrow="调研来源"
                title="暂无调研报告"
                description="当前尚未收录公开资料整理、岗位相关性、招聘信号和注意事项。"
              />
            </template>
          </div>
          </div>

          <div v-else-if="activeSection === 'verification' && verification">
            <div class="grid gap-5 xl:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)_minmax(0,1fr)]">
              <div>
                <p class="text-sm tracking-[0.14em] text-[var(--text-tertiary)]">资料核验情况</p>
                <h2 class="mt-2 text-lg font-semibold text-[var(--text-primary)]">{{ verification.status }}</h2>
                <p class="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{{ verification.summary }}</p>
                <div class="mt-4 grid grid-cols-3 gap-3 text-sm">
                  <div class="detail-mini-stat rounded-lg border px-3 py-3" :style="{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }">
                    <p class="text-[var(--text-tertiary)]">已核验</p>
                    <p class="mt-1 text-lg font-semibold text-[var(--text-primary)]">{{ verifiedCount }}</p>
                  </div>
                  <div class="detail-mini-stat rounded-lg border px-3 py-3" :style="{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }">
                    <p class="text-[var(--text-tertiary)]">待核对</p>
                    <p class="mt-1 text-lg font-semibold text-[var(--text-primary)]">{{ pendingCount }}</p>
                  </div>
                  <div class="detail-mini-stat rounded-lg border px-3 py-3" :style="{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }">
                    <p class="text-[var(--text-tertiary)]">来源</p>
                    <p class="mt-1 text-lg font-semibold text-[var(--text-primary)]">{{ sourceCount }}</p>
                  </div>
                </div>
              </div>

              <div
                class="detail-panel rounded-xl border p-4"
                :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--status-positive-border)' }"
              >
                <p class="text-sm font-medium" :style="{ color: 'var(--status-positive)' }">已核验信息</p>
                <ul v-if="verification.verifiedFields.length" class="mt-3 space-y-2 text-sm leading-6 text-[var(--text-secondary)]">
                  <li v-for="field in verification.verifiedFields" :key="field">{{ field }}</li>
                </ul>
                <p v-else class="mt-3 text-sm leading-6 text-[var(--text-tertiary)]">
                  暂无已核验信息。
                </p>
              </div>

              <div
                class="detail-panel rounded-xl border p-4"
                :style="{ backgroundColor: 'var(--surface-strong)', borderColor: 'var(--status-warning-border)' }"
              >
                <p class="text-sm font-medium" :style="{ color: 'var(--status-warning)' }">待核对信息</p>
                <ul class="mt-3 space-y-2 text-sm leading-6 text-[var(--text-secondary)]">
                  <li v-for="field in verification.pendingFields" :key="field">{{ field }}</li>
                </ul>
              </div>
            </div>
          </div>

          <div v-else-if="activeSection === 'profile'">
            <p class="text-sm tracking-[0.14em] text-[var(--text-tertiary)]">信息表格</p>
            <h2 class="mt-2 text-xl font-semibold text-[var(--text-primary)]">企业基础信息档案</h2>
            <div class="mt-5 overflow-hidden rounded-xl border" :style="{ borderColor: 'var(--border)' }">
              <div
                v-for="row in detailRows"
                :key="row.label"
                class="grid gap-3 border-b px-4 py-4 last:border-b-0 md:grid-cols-[9rem_minmax(0,1fr)]"
                :style="{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-strong)' }"
              >
                <p class="text-sm text-[var(--text-tertiary)]">{{ row.label }}</p>
                <p class="text-sm leading-7 text-[var(--text-secondary)]">{{ row.value }}</p>
              </div>
            </div>
          </div>

        </section>
      </template>

      <EmptyStatePanel
        v-else
        eyebrow="企业档案"
        title="没有找到这家公司"
        description="可能是链接有误，或者该公司尚未收录。"
      />
    </div>
  </section>
</template>

<style scoped>
.company-detail-page {
  max-width: 100vw;
}

.company-detail-shell {
  max-width: min(72rem, 100%);
}

.company-detail-hero {
  position: relative;
  overflow: hidden;
}

.company-detail-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(135deg, rgba(190, 98, 82, 0.08), transparent 34%),
    linear-gradient(315deg, rgba(47, 125, 79, 0.06), transparent 42%);
  pointer-events: none;
}

.company-detail-hero > * {
  position: relative;
  z-index: 1;
}

.company-detail-subnav {
  scrollbar-width: none;
}

.company-detail-subnav::-webkit-scrollbar {
  display: none;
}

.detail-content-shell {
  position: relative;
}

.detail-panel {
  min-height: 100%;
}

.detail-mini-stat {
  min-width: 0;
}

.company-detail-page :where(header, section, nav, div, p, h1, h2, a, li, span, button, details, summary) {
  min-width: 0;
}

.company-detail-page :where(p, h1, h2, a, li, span, button, summary) {
  line-break: anywhere;
  overflow-wrap: anywhere;
  word-break: break-word;
}

.company-name-title {
  line-break: anywhere;
  overflow-wrap: anywhere;
  word-break: break-all;
}

@media (max-width: 639px) {
  .company-detail-page {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .company-detail-shell {
    inline-size: 100% !important;
    max-inline-size: 100% !important;
    margin-left: 0;
    margin-right: 0;
  }

  .company-detail-shell > :where(header, section, nav, div) {
    inline-size: 100% !important;
    max-inline-size: 100% !important;
  }

  .company-detail-shell :where(header, section, nav, div, p, h1, h2, a, li, span, button, details, summary) {
    max-inline-size: 100% !important;
    box-sizing: border-box;
  }
}
</style>
