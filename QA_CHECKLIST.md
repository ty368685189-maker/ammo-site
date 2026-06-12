# 弹药工程导航站 QA 清单

每轮改完页面后，按这份清单收尾。重点是保证页面像资料导航站，而不是宣传页或 AI 报告。

## 1. 构建检查

- 优先运行 `npm run qa`。
- 如果只做很小的代码改动，至少运行 `npm run build`。
- `npm run qa` 已包含内容质量扫描；如果只想看内容提示，可以单独运行 `npm run check:data-quality`。
- 如果出现 Browserslist / caniuse-lite 过期提示，先当作依赖数据提示；只有构建失败才阻塞本轮交付。
- `npm run qa` 会额外检查数据结构、内容质量、全量企业/院校详情路由、移动端横向滚动、缺图、外链 `noopener` 和控制台错误。
- 全量路由默认只输出汇总和失败项；需要看每条路由时运行 `npm run qa -- --verbose-routes`。

## 2. 关键路由

这些固定页面需要能打开；企业详情和院校详情由 `npm run qa` 自动按正式库全量检查：

- `/`
- `/about-major`
- `/about-major/curriculum`
- `/about-major/path`
- `/about-major/career`
- `/about-major/checklist`
- `/graduate`
- `/graduate/directions`
- `/graduate/compare`
- `/graduate/schools`
- `/graduate/timeline`
- `/universities`
- `/universities/aust`
- `/companies`
- `/companies/1`
- `/about`

## 3. 移动端显示

- 手机宽度下不能出现横向滚动。
- 标题、按钮、标签和表格不能互相挤压。
- 目录页优先保持紧凑行，不要变成厚重宣传卡片。

## 4. 文案口吻

- 少写“全面、赋能、价值、体系、框架、路径、打造、助力”等空泛词。
- 少用“这是一个……”“真正……”“帮助你……”这类模板句。
- 多写学生会问的问题：先看什么、去哪查、哪些话不能当真。
- 待核对内容必须保留边界，不能写成确定事实。
- 不用吓人话术，不制造焦虑，不替学生下结论。

## 5. 数据边界

- 当前阶段优先做知识库候选池，位置是 `research-drafts/knowledge-pool/`。
- 知识库就是企业和院校候选信息；候选池可以数量优先，但必须保留链接、证据强弱和重复风险。
- 当前不优先使用 Grok / Cherry。
- 知识库候选不直接变成正式库，不改 `src/data/companies.ts` 或 `src/data/universities.ts`。
- 正式入库时，再从知识库挑强候选，做 clean 草稿、dry-run 和质量评分。
- 草稿评分命令：`npm run score:drafts` 或 `npm run score:drafts -- "research-drafts/companies/草稿.json"`。
- 当前项目状态允许评分 85 分及以上、dry-run 通过、无阻塞项的 clean 草稿入库；人工打开来源核对后置。

## 6. 预览进程

- 如果启动了临时 dev / preview 服务，验证结束后关闭。
- 如果启动了临时浏览器或 headless Chrome，验证结束后关闭。
