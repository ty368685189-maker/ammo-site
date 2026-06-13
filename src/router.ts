import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './views/HomePage.vue'
import AboutMajorPath from './views/AboutMajorPath.vue'

const siteTitle = '弹药导航'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage, meta: { title: '弹药导航' } },
    { path: '/about-major', name: 'about-major', component: () => import('./views/AboutMajor.vue'), meta: { title: '专业介绍 - 弹药导航' } },
    { path: '/about-major/curriculum', name: 'about-major-curriculum', component: () => import('./views/AboutMajorCurriculum.vue'), meta: { title: '学什么 - 弹药专业介绍 - 弹药导航' } },
    { path: '/about-major/path', name: 'about-major-path', component: AboutMajorPath, meta: { title: '四年节奏 - 弹药专业介绍 - 弹药导航' } },
    { path: '/about-major/career', name: 'about-major-career', component: () => import('./views/AboutMajorCareer.vue'), meta: { title: '毕业去向 - 弹药专业介绍 - 弹药导航' } },
    { path: '/about-major/checklist', name: 'about-major-checklist', component: () => import('./views/AboutMajorChecklist.vue'), meta: { title: '报考核对 - 弹药专业介绍 - 弹药导航' } },
    { path: '/companies', name: 'companies', component: () => import('./views/Companies.vue'), meta: { title: '企业名录 - 弹药导航' } },
    { path: '/companies/:id', name: 'company-detail', component: () => import('./views/CompanyDetail.vue'), meta: { title: '企业详情 - 弹药导航' } },
    { path: '/universities', name: 'universities', component: () => import('./views/Universities.vue'), meta: { title: '院校一览 - 弹药导航' } },
    { path: '/universities/:id', name: 'university-detail', component: () => import('./views/UniversityDetail.vue'), meta: { title: '院校详情 - 弹药导航' } },
    { path: '/graduate', name: 'graduate', component: () => import('./views/Graduate.vue'), meta: { title: '考研方向 - 弹药导航' } },
    { path: '/graduate/directions', name: 'graduate-directions', component: () => import('./views/GraduateDirections.vue'), meta: { title: '方向地图 - 考研方向 - 弹药导航' } },
    { path: '/graduate/compare', name: 'graduate-compare', component: () => import('./views/GraduateCompare.vue'), meta: { title: '方向对比 - 考研方向 - 弹药导航' } },
    { path: '/graduate/schools', name: 'graduate-schools', component: () => import('./views/GraduateSchools.vue'), meta: { title: '院校入口 - 考研方向 - 弹药导航' } },
    { path: '/graduate/timeline', name: 'graduate-timeline', component: () => import('./views/GraduateTimeline.vue'), meta: { title: '四年准备 - 考研方向 - 弹药导航' } },
    { path: '/about', name: 'about', component: () => import('./views/About.vue'), meta: { title: '关于 - 弹药导航' } },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('./views/NotFound.vue'), meta: { title: '页面不存在 - 弹药导航' } },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = typeof to.meta.title === 'string' ? to.meta.title : siteTitle
})

export default router
