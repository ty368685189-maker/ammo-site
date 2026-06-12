<script setup lang="ts">
import ActionButton from '../components/ActionButton.vue'
import { companies } from '../data/companies'
import { universities } from '../data/universities'

type HeroRouteItem = {
  label: string
  note: string
  to: string
}

type ResourceMark = {
  name: string
  logo?: string
  note: string
  actionLabel: string
  to: string
}

const heroRouteItems: HeroRouteItem[] = [
  {
    label: '专业介绍',
    note: '课程与方向',
    to: '/about-major',
  },
  {
    label: '院校一览',
    note: '城市与层次',
    to: '/universities',
  },
  {
    label: '企业名录',
    note: '岗位与单位',
    to: '/companies',
  },
  {
    label: '考研方向',
    note: '方向与择校',
    to: '/graduate',
  },
]

const schoolMarks: ResourceMark[] = [
  { name: '北京理工大学', logo: '/logos/schools/北京理工大学.png', note: '兵器相关方向', actionLabel: '查看详情', to: '/universities/bit' },
  { name: '南京理工大学', logo: '/logos/schools/南京理工大学.png', note: '招生网有专业入口', actionLabel: '查看详情', to: '/universities/njust' },
  { name: '中北大学', logo: '/logos/schools/中北大学.png', note: '兵器与爆炸线索', actionLabel: '查看详情', to: '/universities/nuc' },
  { name: '沈阳理工大学', logo: '/logos/schools/沈阳理工大学.png', note: '北方院校线索', actionLabel: '查看详情', to: '/universities/syit' },
  { name: '安徽理工大学', logo: '/logos/schools/安徽理工大学.png', note: '民爆与工程应用', actionLabel: '查看详情', to: '/universities/aust' },
  { name: '西安工业大学', logo: '/logos/schools/西安工业大学.png', note: '西北方向入口', actionLabel: '查看详情', to: '/universities/xatu' },
]

const organizationMarks: ResourceMark[] = [
  { name: '中国兵器工业集团', logo: '/logos/organizations/norinco-group.jpg', note: '集团入口', actionLabel: '去企业名录', to: '/companies' },
  { name: '北方特种能源', logo: '/logos/organizations/north-special-energy.png', note: '特种能源与岗位线索', actionLabel: '查看详情', to: '/companies/1' },
  { name: '兵装自动化所', logo: '/logos/organizations/auto58.jpg', note: '自动化与科研试验', actionLabel: '查看详情', to: '/companies/2' },
  { name: '易普力股份', note: '民爆产品与爆破工程', actionLabel: '查看详情', to: '/companies/3' },
]

const schoolTickerItems = [...schoolMarks, ...schoolMarks].map((item, index) => ({
  ...item,
  key: `school-${index}-${item.name}`,
}))

const organizationTickerItems = [...organizationMarks, ...organizationMarks].map((item, index) => ({
  ...item,
  key: `organization-${index}-${item.name}`,
}))

const highRelevanceCount =
  companies.filter((company) => company.verification.relevanceLevel === '高').length +
  universities.filter((university) => university.verification.relevanceLevel === '高').length

const currentYear = new Date().getFullYear()
</script>

<template>
  <div class="home-page min-h-screen overflow-x-hidden bg-[var(--page-bg)] text-[var(--text-primary)]">
    <div class="home-shell mx-auto flex min-h-screen w-full min-w-0 max-w-none flex-col px-4 pb-40 sm:px-6 sm:pb-10 sm:pt-44 md:pt-24">
      <main class="flex flex-1 flex-col pt-2 md:pt-4">
        <section class="home-hero mt-1 xl:mt-3">
          <div class="home-top-grid">
            <div class="home-hero-copy">
              <p class="mb-4 text-sm tracking-[0.08em] text-[var(--text-secondary)]">
                弹药工程与爆炸技术专业导航站 / 学业、升学、就业入口
              </p>
              <h1 class="home-title text-[2.35rem] font-semibold leading-[1.04] tracking-tight text-[var(--text-primary)] sm:text-[3.55rem] lg:text-[3.95rem] xl:text-[4.2rem]">
                <span class="block">给弹药孩子</span>
                <span class="mt-2 block lg:mt-3">
                  一个<span class="text-gradient">温暖的家</span>
                </span>
              </h1>
              <p class="mt-4 max-w-[38rem] text-base leading-relaxed text-[var(--text-secondary)] md:text-[1.02rem]">
                把专业、院校、企业和考研入口放在一处，先找方向，再看学校和单位。
              </p>
              <div class="home-hero-actions mt-4 flex flex-wrap gap-3">
                <ActionButton to="/about-major" variant="primary">
                  专业介绍
                </ActionButton>
                <ActionButton to="/universities" variant="secondary">
                  院校一览
                </ActionButton>
              </div>
            </div>

            <aside
              class="home-reading-rail rounded-[1.1rem] border p-6 md:p-8"
              :style="{
                backgroundColor: 'color-mix(in srgb, var(--surface) 84%, rgba(255, 255, 255, 0.38))',
                borderColor: 'color-mix(in srgb, var(--border) 92%, transparent)',
                boxShadow: 'var(--glass-shadow)',
              }"
            >
              <div class="home-reading-header">
                <p class="text-sm tracking-[0.06em] text-[var(--text-tertiary)]">站内收录</p>
                <h2 class="mt-2 text-[1.15rem] font-semibold text-[var(--text-primary)]">先看这些</h2>
              </div>

              <div class="home-stat-grid mt-4">
                <div
                  class="home-stat-item"
                  :style="{
                    backgroundColor: 'color-mix(in srgb, var(--surface) 60%, rgba(255, 255, 255, 0.2))',
                    borderColor: 'color-mix(in srgb, var(--border) 60%, rgba(255, 255, 255, 0.4))',
                    boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.3)',
                  }"
                >
                  <span class="block text-xs tracking-wider text-[var(--text-tertiary)]">企业</span>
                  <strong class="mt-2 block text-3xl xl:text-4xl font-bold tracking-tight text-[var(--text-primary)] font-sans">{{ companies.length }}</strong>
                </div>
                <div
                  class="home-stat-item"
                  :style="{
                    backgroundColor: 'color-mix(in srgb, var(--surface) 60%, rgba(255, 255, 255, 0.2))',
                    borderColor: 'color-mix(in srgb, var(--border) 60%, rgba(255, 255, 255, 0.4))',
                    boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.3)',
                  }"
                >
                  <span class="block text-xs tracking-wider text-[var(--text-tertiary)]">院校</span>
                  <strong class="mt-2 block text-3xl xl:text-4xl font-bold tracking-tight text-[var(--text-primary)] font-sans">{{ universities.length }}</strong>
                </div>
                <div
                  class="home-stat-item"
                  :style="{
                    backgroundColor: 'color-mix(in srgb, var(--surface) 60%, rgba(255, 255, 255, 0.2))',
                    borderColor: 'color-mix(in srgb, var(--border) 60%, rgba(255, 255, 255, 0.4))',
                    boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.3)',
                  }"
                >
                  <span class="block text-xs tracking-wider text-[var(--text-tertiary)]">高相关</span>
                    <strong class="mt-2 block text-3xl xl:text-4xl font-bold tracking-tight text-[var(--text-primary)] font-sans">{{ highRelevanceCount }}</strong>
                </div>
              </div>
            </aside>
          </div>

          <div
            class="home-route-band mt-3 rounded-xl border px-4 py-3 sm:px-5 lg:px-5"
            :style="{
              backgroundColor: 'color-mix(in srgb, var(--surface) 80%, var(--surface-muted) 20%)',
              borderColor: 'color-mix(in srgb, var(--border) 96%, transparent)',
              boxShadow: 'var(--glass-shadow)',
            }"
          >
            <div class="home-route-head flex flex-wrap items-center justify-between gap-3">
              <div class="min-w-0">
                <p class="text-sm tracking-[0.06em] text-[var(--text-tertiary)]">先从这里看</p>
                <h2 class="mt-2 text-lg font-semibold text-[var(--text-primary)]">四个入口</h2>
              </div>
            </div>

            <div
              class="home-route-surface mt-3 rounded-[1.05rem] border p-3 sm:p-4"
              :style="{
                backgroundColor: 'color-mix(in srgb, var(--surface) 72%, rgba(255, 255, 255, 0.18))',
                borderColor: 'color-mix(in srgb, var(--border) 82%, transparent)',
              }"
            >
              <div class="home-route-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 lg:gap-4">
                <RouterLink
                  v-for="(item, index) in heroRouteItems"
                  :key="item.to"
                  :to="item.to"
                  class="home-route-card group flex flex-col justify-between"
                  :style="{
                    backgroundColor: 'color-mix(in srgb, var(--surface-strong) 60%, rgba(255, 255, 255, 0.15))',
                    borderColor: 'color-mix(in srgb, var(--border) 96%, transparent)',
                  }"
                >
                  <div class="flex justify-between items-start mb-5">
                    <span class="text-3xl font-bold opacity-10 text-[var(--text-primary)] transition-opacity group-hover:opacity-20 pointer-events-none select-none font-sans">
                      0{{ index + 1 }}
                    </span>
                    <span class="home-route-arrow text-sm text-[var(--text-secondary)] transition-all duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
                  </div>
                  <span class="home-route-copy min-w-0">
                    <span class="block text-[1.05rem] font-semibold text-[var(--text-primary)] transition group-hover:text-[var(--accent)]">
                      {{ item.label }}
                    </span>
                    <span class="mt-1.5 block text-xs leading-5 text-[var(--text-tertiary)]">
                      {{ item.note }}
                    </span>
                  </span>
                </RouterLink>
              </div>
            </div>
          </div>
        </section>

        <section class="home-relations mt-5 border-t pt-4 pb-2" :style="{ borderColor: 'var(--border)' }">
          <div class="home-relations-grid gap-5 xl:gap-7">
            <div class="home-relations-copy">
              <p class="text-sm tracking-[0.06em] text-[var(--text-tertiary)]">顺手看看</p>
              <h2 class="mt-2 text-lg font-semibold text-[var(--text-primary)]">院校和单位线索</h2>
            </div>

            <div class="home-resource-flow space-y-3">
              <div class="home-resource-row">
                <div class="home-resource-head">
                  <p class="text-sm font-semibold text-[var(--text-primary)]">院校线索</p>
                </div>

                <div class="home-resource-marquee">
                  <div class="home-resource-track home-resource-track-left" aria-label="相关院校">
                    <RouterLink
                      v-for="school in schoolTickerItems"
                      :key="school.key"
                      :to="school.to"
                      class="home-resource-token group"
                      :style="{
                        backgroundColor: 'color-mix(in srgb, var(--surface) 90%, rgba(255, 255, 255, 0.24))',
                        borderColor: 'color-mix(in srgb, var(--border) 88%, transparent)',
                      }"
                    >
                      <span v-if="school.logo" class="home-resource-logo">
                        <img
                          :src="school.logo"
                          :alt="school.name"
                          class="logo-image"
                        />
                      </span>
                      <span class="min-w-0">
                        <span class="home-resource-name">{{ school.name }}</span>
                        <span class="home-resource-note">{{ school.note }}</span>
                      </span>
                    </RouterLink>
                  </div>
                </div>
              </div>

              <div class="home-resource-row">
                <div class="home-resource-head">
                  <p class="text-sm font-semibold text-[var(--text-primary)]">单位线索</p>
                </div>

                <div class="home-resource-marquee">
                  <div class="home-resource-track home-resource-track-right" aria-label="相关单位">
                    <RouterLink
                      v-for="organization in organizationTickerItems"
                      :key="organization.key"
                      :to="organization.to"
                      class="home-resource-token group"
                      :class="{ 'home-resource-token-text': !organization.logo }"
                      :style="{
                        backgroundColor: 'color-mix(in srgb, var(--surface) 90%, rgba(255, 255, 255, 0.24))',
                        borderColor: 'color-mix(in srgb, var(--border) 88%, transparent)',
                      }"
                    >
                      <span v-if="organization.logo" class="home-resource-logo">
                        <img
                          :src="organization.logo"
                          :alt="organization.name"
                          class="logo-image"
                        />
                      </span>
                      <span class="min-w-0">
                        <span class="home-resource-name">{{ organization.name }}</span>
                        <span class="home-resource-note">{{ organization.note }}</span>
                      </span>
                    </RouterLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer class="mt-10 border-t border-[var(--border)] pt-4">
        <div class="flex flex-col gap-4 text-sm text-[var(--text-secondary)] md:flex-row md:items-center md:justify-between">
          <div class="flex flex-wrap items-center gap-4">
            <RouterLink to="/about" class="transition hover:text-[var(--accent)]">关于</RouterLink>
            <a href="mailto:ty368685189@gmail.com" class="transition hover:text-[var(--accent)]">
              联系方式
            </a>
            <span class="text-[var(--text-tertiary)]">© {{ currentYear }}</span>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  max-width: 100vw;
  background:
    radial-gradient(circle at 12% 8%, rgba(214, 137, 85, 0.14), transparent 30rem),
    radial-gradient(circle at 84% 10%, rgba(222, 118, 118, 0.12), transparent 28rem),
    linear-gradient(180deg, rgba(255, 255, 255, 0.6), transparent 24rem),
    linear-gradient(135deg, rgba(255, 255, 255, 0.4), transparent 42%),
    var(--page-bg);
  position: relative;
}

.home-page::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(75, 96, 88, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(75, 96, 88, 0.04) 1px, transparent 1px);
  background-size: 3.6rem 3.6rem;
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.15) 42%, transparent 90%);
}

:global(:root[data-theme='dark']) .home-page {
  background:
    radial-gradient(circle at 12% 8%, rgba(214, 137, 85, 0.12), transparent 30rem),
    radial-gradient(circle at 84% 10%, rgba(222, 118, 118, 0.10), transparent 28rem),
    linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 24rem),
    linear-gradient(135deg, rgba(255, 255, 255, 0.02), transparent 42%),
    var(--page-bg);
}

.home-shell {
  max-width: min(88rem, calc(100vw - 1.5rem));
  position: relative;
  z-index: 1;
}

.home-hero {
  position: relative;
}

.home-hero-copy {
  position: relative;
  padding-top: 0.15rem;
}

.home-hero-copy::before {
  content: '';
  position: absolute;
  inset: -3rem auto auto -3rem;
  width: 28rem;
  height: 28rem;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.56), transparent 72%);
  opacity: 0.9;
  pointer-events: none;
}

.home-hero-copy > * {
  position: relative;
  z-index: 1;
}

.home-title {
  text-wrap: balance;
  letter-spacing: 0;
  max-inline-size: 100%;
}

.home-top-grid {
  display: grid;
  align-items: start;
  gap: 1.15rem;
}

.home-reading-rail {
  position: relative;
  overflow: hidden;
}

.home-reading-rail::before {
  content: '';
  position: absolute;
  inset: 1rem auto 1rem 0;
  width: 0.32rem;
  border-radius: 999px;
  background: linear-gradient(180deg, var(--accent), rgba(47, 125, 79, 0.72));
  opacity: 0.78;
}

.home-stat-grid {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.home-stat-item {
  min-height: 5.6rem;
  min-width: 0;
  border: 1px solid;
  border-radius: 0.95rem;
  padding: 0.78rem 0.88rem 0.76rem;
}

.home-route-band {
  display: grid;
  gap: 0.58rem;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.home-route-band::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(135deg, rgba(190, 98, 82, 0.08), transparent 36%),
    linear-gradient(315deg, rgba(47, 125, 79, 0.07), transparent 44%);
  pointer-events: none;
}

.home-route-band > * {
  position: relative;
  z-index: 1;
}

.home-route-grid {
  position: relative;
}

.home-route-head {
  align-items: flex-start;
}

.home-route-surface {
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.32);
}

.home-route-card {
  position: relative;
  border: 1px solid;
  border-radius: 1.1rem;
  padding: 1.15rem 1.25rem 1.15rem;
  color: var(--text-primary);
  overflow: hidden;
  transition:
    transform 0.25s cubic-bezier(0.4, 0, 0.2, 1),
    border-color 0.25s ease,
    background-color 0.25s ease,
    box-shadow 0.25s ease;
}

.home-route-card::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--accent) 80%, transparent),
    color-mix(in srgb, var(--status-positive) 50%, transparent) 72%,
    transparent
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.home-route-card:hover {
  transform: translateY(-4px);
  border-color: color-mix(in srgb, var(--accent) 60%, var(--border));
  box-shadow: 0 16px 32px rgba(43, 72, 60, 0.08);
}

.home-route-card:hover::before {
  opacity: 1;
}

.home-route-arrow {
  font-size: 1rem;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.85rem;
  height: 1.85rem;
  border-radius: 999px;
  background: var(--surface);
  border: 1px solid color-mix(in srgb, var(--border) 80%, transparent);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
  transition: all 0.25s ease;
}

.home-route-card:hover .home-route-arrow {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
  box-shadow: 0 4px 12px color-mix(in srgb, var(--accent) 30%, transparent);
}

.home-relations-grid {
  display: grid;
  align-items: start;
  gap: 0.95rem;
}

.home-relations-copy {
  display: grid;
  gap: 0.45rem;
  max-width: 70rem;
}

.home-resource-flow {
  display: grid;
  gap: 0.64rem;
}

.home-resource-row {
  display: grid;
  gap: 0.62rem;
  border-top: 1px solid color-mix(in srgb, var(--border) 82%, transparent);
  padding-top: 0.72rem;
}

.home-resource-head {
  min-width: 0;
}

.home-resource-marquee {
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  padding-block: 0.15rem;
}

.home-resource-marquee::before,
.home-resource-marquee::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 4rem;
  z-index: 2;
  pointer-events: none;
}

.home-resource-marquee::before {
  left: 0;
  background: linear-gradient(90deg, var(--page-bg), transparent);
}

.home-resource-marquee::after {
  right: 0;
  background: linear-gradient(270deg, var(--page-bg), transparent);
}

.home-resource-track {
  display: flex;
  width: max-content;
  gap: 0.72rem;
  align-items: stretch;
  will-change: transform;
}

.home-resource-track-left {
  animation: home-resource-scroll-left 28s linear infinite;
}

.home-resource-track-right {
  animation: home-resource-scroll-right 30s linear infinite;
}

.home-resource-marquee:hover .home-resource-track {
  animation-play-state: paused;
}

.home-resource-token {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 0.72rem;
  align-items: center;
  min-width: 11.6rem;
  max-width: 11.6rem;
  border: 1px solid;
  border-radius: 999px;
  padding: 0.55rem 0.82rem 0.55rem 0.58rem;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease,
    box-shadow 0.2s ease;
}

.home-resource-token:hover {
  transform: translateY(-1px);
  border-color: color-mix(in srgb, var(--accent) 42%, var(--border));
  background-color: color-mix(in srgb, var(--surface-strong) 94%, rgba(255, 255, 255, 0.22));
  box-shadow: 0 10px 18px rgba(43, 72, 60, 0.06);
}

.home-resource-token-text {
  grid-template-columns: minmax(0, 1fr);
}

.home-resource-logo {
  display: inline-flex;
  min-height: 2.7rem;
  min-width: 2.7rem;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: var(--surface);
  border: 1px solid color-mix(in srgb, var(--border) 60%, transparent);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  padding: 0.38rem;
}

:global(:root[data-theme='dark']) .home-resource-logo {
  background: linear-gradient(135deg, #2a3832, #1d2722);
  border-color: transparent;
  box-shadow: 0 0.45rem 1rem rgba(0, 0, 0, 0.3);
}

.home-resource-name {
  display: block;
  font-size: 0.88rem;
  line-height: 1.3;
  color: var(--text-primary);
  font-weight: 600;
}

.home-resource-note {
  display: block;
  margin-top: 0.1rem;
  font-size: 0.73rem;
  line-height: 1.35;
  color: var(--text-tertiary);
}

.home-page :where(header, section, div, p, h1, h2, a, span, nav) {
  min-width: 0;
}

.home-page :where(p, h1, h2, a, span) {
  line-break: anywhere;
  overflow-wrap: anywhere;
  word-break: break-word;
}

.logo-image {
  display: block;
  max-height: 1.95rem;
  max-width: 1.95rem;
  object-fit: contain;
  opacity: 1;
  filter: drop-shadow(0 0.08rem 0.08rem rgba(0, 0, 0, 0.26));
}

@keyframes home-resource-scroll-left {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(calc(-50% - 0.475rem));
  }
}

@keyframes home-resource-scroll-right {
  from {
    transform: translateX(calc(-50% - 0.475rem));
  }

  to {
    transform: translateX(0);
  }
}

@media (max-width: 639px) {
  .home-shell {
    inline-size: 100%;
    max-inline-size: 100%;
  }

  .home-stat-grid {
    gap: 0.55rem;
  }

  .home-stat-item {
    min-height: 0;
    padding: 0.76rem 0.76rem 0.72rem;
  }

  .home-resource-track {
    gap: 0.62rem;
  }

  .home-resource-token {
    min-width: 10.6rem;
    max-width: 10.6rem;
    padding: 0.5rem 0.74rem 0.5rem 0.52rem;
  }

  .home-resource-marquee::before,
  .home-resource-marquee::after {
    width: 2rem;
  }

  .home-resource-note {
    display: none;
  }
}

@media (max-width: 899px) {
  .home-reading-rail {
    padding-top: 1.3rem;
  }

  .home-reading-rail::before {
    inset: 0 1rem auto 1rem;
    width: 100%;
    height: 0.28rem;
  }

}

@media (min-width: 900px) {
  .home-top-grid {
    grid-template-columns: minmax(0, 1.28fr) minmax(18.8rem, 0.82fr);
    gap: 1.2rem;
    align-items: center;
  }

  .home-title > span {
    white-space: nowrap;
  }

  .home-relations-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 1.08rem;
  }
}

@media (min-width: 1024px) {
  .home-shell {
    max-width: min(80rem, calc(100vw - 4rem));
  }

  .home-route-band {
    max-width: 60rem;
    margin-inline: auto;
    grid-template-columns: minmax(0, 1fr);
    gap: 0.45rem;
  }

  .home-route-card {
    min-height: 8.5rem;
  }

  .home-resource-row {
    grid-template-columns: minmax(8.4rem, 9.6rem) minmax(0, 1fr);
    align-items: start;
    gap: 0.8rem;
  }
}

@media (min-width: 1280px) {
  .home-shell {
    max-width: min(80rem, calc(100vw - 6rem));
  }

  .home-top-grid {
    grid-template-columns: minmax(0, 1.24fr) minmax(18rem, 0.8fr);
    gap: 1.15rem;
  }

  .home-relations-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 1.15rem;
  }

  .home-resource-row {
    grid-template-columns: minmax(9rem, 10rem) minmax(0, 1fr);
    gap: 0.85rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-resource-track-left,
  .home-resource-track-right {
    animation: none;
  }
}
</style>
