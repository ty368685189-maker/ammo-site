# 知识库治理与渐进式入库 任务进度卡

- `[x]` **步骤 1: 知识库数据非标警告治理**
  - `[x]` 标准化 54 个 non-standard ownership (企业性质) 字段（将国企体系/国企上市/民企上市等规整为国企/民企/外企）
  - `[x]` 清理 8 个 sources 记录中重复的链接
  - `[x]` 在脚本/转换时为 Batch 9 映射 `keyEntries`/`sourceLinks`
- `[x]` **步骤 2: 优选候选并生成 Clean JSON**
  - `[x]` 从 500 条数据中挑选首批企业候选 (华荣科技, 新黎明科技, 飞策防爆, 卧龙南阳防爆, 汉威科技, 河南驰诚, 大连度达, 江苏八方, 上海华理) 并转换为 clean JSON
  - `[x]` 挑选首批院校候选 (中国科学技术大学, 北京科技大学) 并转换为 clean JSON
- `[x]` **步骤 3: 运行 Dry-Run 与质量评分**
  - `[x]` 对草稿运行 `npm run import:company -- --dry-run` 和 `npm run import:university -- --dry-run`
  - `[x]` 运行 `npm run score:drafts` 确保评分 >= 85 且无阻塞项
- `[/]` **步骤 4: 执行导入与全站 QA 验证**
  - `[/]` 正式写入 `src/data/companies.ts` 和 `src/data/universities.ts`
  - `[/]` 运行 `npm run check:data-quality` 确认无错误
  - `[/]` 运行 `npm run qa` 确认构建与路由无死链
