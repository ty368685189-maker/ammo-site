# 弹药工程导航

面向弹药工程与爆炸技术相关学生的资料导航站，覆盖专业认知、院校报考、企业就业和考研方向。

## 技术栈

- Vue 3
- TypeScript
- Vite
- Tailwind CSS
- Vue Router

## 本地运行

```bash
npm install
npm run dev
```

## 上线前检查

```bash
npm run qa
```

`npm run qa` 会依次执行构建、依赖审计、正式数据结构检查、内容质量扫描和全量详情路由浏览器检查。临时预览服务和无头浏览器会自动关闭。

全量路由检查默认只输出汇总和失败项；如果要看每条路由明细：

```bash
npm run qa -- --verbose-routes
```

关键路由检查会自动覆盖所有企业详情页和院校详情页。只想快速检查本地页面、移动端横向滚动、缺图、外链和控制台错误时，可以运行：

```bash
npm run qa:routes
```

如果只想跑最基础的构建：

```bash
npm run build
npm audit --omit=dev
```

新增或更新正式库后，也可以单独跑内容质量扫描：

```bash
npm run check:data-quality
```

它会检查正式企业库和院校库里的枚举、空链接、重复链接、来源类型、过长字段、薪资/作息/就业率/分数线等硬信息边界。

当前项目没有单独配置 ESLint 或测试框架，构建命令会先执行 `vue-tsc -b` 完成 TypeScript 检查，再执行 Vite 生产构建。

## 部署提示

当前站点是纯前端静态站，构建产物在 `dist/`。推荐先用静态托管平台上线，比自己折腾 VPS 和 Nginx 简单。

常见托管平台填写：

```text
Build command: npm run build
Publish / Output directory: dist
```

项目已加入两类前端路由回退配置：

- `vercel.json`：给 Vercel 用，避免直接打开 `/companies/14` 这类页面时 404。
- `public/_redirects`：给 Netlify / Cloudflare Pages 这类平台用，构建后会复制到 `dist/_redirects`。

如果后续一定要部署到 VPS / Nginx，也需要配置“所有前端路由回退到 index.html”，不能只上传文件就完事。

## 知识库、草稿导入与更新

当前先做厚知识库候选池，位置是 [research-drafts/knowledge-pool](research-drafts/knowledge-pool)。知识库只收企业和院校候选：名称、地区、方向、官网/招生/招聘入口、证据强弱、重复风险和建议动作。

详细规则见 [research-drafts/README.md](research-drafts/README.md)。当前不优先使用 Grok；Codex 或 Antigravity 可以直接做知识库候选搜集。正式入库后置：从候选池挑强候选，生成 clean JSON，跑 dry-run 和评分，再导入。

新增条目前先 dry-run：

```bash
npm run import:company -- "research-drafts/companies/草稿.json" --dry-run
npm run import:university -- "research-drafts/universities/草稿.json" --dry-run
```

草稿进入人工确认前先评分：

```bash
npm run score:drafts
npm run score:drafts -- "research-drafts/companies/草稿.json"
```

评分规则见 [research-drafts/SCORECARD.md](research-drafts/SCORECARD.md)。当前阶段宇少已确认：`dry-run` 通过、评分 85 分及以上且无阻塞项的 clean 草稿可以正式导入；人工打开来源核对后置。

已有条目不要重复新增，先预览更新：

```bash
npm run import:company -- "research-drafts/companies/草稿.json" --dry-run --update
npm run import:university -- "research-drafts/universities/草稿.json" --dry-run --update
```

确认无误后，再去掉 `--dry-run` 正式更新。企业更新会保留原数字 `id`，院校更新会保留原路由 `id`。

## 内容维护原则

- 做页面体验、固定文案或资料维护前，先看 `QA_CHECKLIST.md`。
- 招生计划、录取分数、招聘岗位、薪资和作息以当年官方公告为准。
- 条目应区分“已确认”和“待核对”，避免把推测写成确定结论。
- 知识库候选先放 `research-drafts/knowledge-pool/`，不要直接改正式库。
- 新增企业或院校正式入库时，优先补充官网、招生网、招聘公告、学校就业网等可追溯来源。
