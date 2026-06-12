# Codex 项目记忆

这个文件是给未来 Codex 会话读的项目记忆。新会话如果忘了上下文，先读这里。

## 项目定位

- 项目名：弹药工程与爆炸技术导航站。
- 目标用户：弹药工程与爆炸技术相关学生、考研党、就业求职学生。
- 内容风格：客观、克制、清单式、可核验，不写宣传稿。
- 当前技术栈：Vue 3、Vite、TypeScript、Tailwind CSS、Vue Router。
- 当前数据源：`src/data/companies.ts` 和 `src/data/universities.ts` 本地静态数据。
- 每次做网站体验、页面文案或内容维护时，先读 `QA_CHECKLIST.md`，按其中的“文案口吻”和“数据边界”检查，避免 AI 味、宣传味和把待核对内容写成确定事实。
- 当前阶段状态先读 `PROJECT_STATUS.md`：自 2026-06-10 起，执行“重质量轻数量，源头严卡，宁缺毋滥”标准。所有 Markdown 草稿必须过 `npm run score:markdown` 满分验证才能生成 clean JSON。

## 当前核心决策

### 0. 院校展示优先级

- 安徽理工大学是用户本人学校，院校列表需要优先展示在第一位。
- 安徽理工大学已经做过一轮系统调研，但仍要按质量闸门继续修正文案和来源。
- 其他院校暂时不要默认视为“已系统调研完成”；除非用户明确要求，不要批量调研或批量改写。

### 1. 入库预备级知识库先行，Grok 暂停使用

2026-06-08 晚，宇少确认当前先把本地知识库做起来。2026-06-09 进一步明确：知识库资料要尽量达到后续可入库条件，但暂时不正式入库。这里的知识库不是正式网站数据，而是企业和院校入库预备资料池，主要放在 `research-drafts/knowledge-pool/`。

知识库候选至少记录：

- 名称。
- 类型：企业 / 院校。
- 地区。
- 相关方向。
- 官网、招生网、招聘入口、公告、政府资料等关键链接。
- 后续 clean JSON 需要的关键字段。
- 证据强弱。
- 是否疑似重复。
- 建议动作：后续清洗 / 暂缓 / 跳过。

当前阶段正式入库可以慢慢来，优先把企业和院校入口、线索、证据强弱、风险和待核对字段攒齐，做到后续不需要重新大搜。

Grok 搜索暂时不作为主流程。原因是 Grok 搜索和 JSON 整理不稳定，出现过：

- 重复 `research` 字段。
- 缺少 `research.sources`。
- 文案过长。
- 弱来源当强证据。
- 来源类型不符合网站枚举。

2026-06-09 测试补充规则：

- 企业知识库条目里，不要用同一个官网首页 URL 充当多个不同来源。
- 没有独立招聘页时，`招聘入口 / 招聘公告` 写 `待核对`（但在新规中直接面临淘汰风险）。
- 企业来源类型保持企业口径，不混用院校来源类型。

**[🔥 核心系统重构] 2026-06-10 源头质量锁死机制（宁缺毋滥）：**
宇少明确下达指令，放弃“人工苦力洗数据”的落后模式，实行“源头严卡”：
1. **强制三源铁律**：在 Markdown 抓取阶段必须对企业进行深度搜索。每家企业**必须**提供至少 3 个独立的权威来源（官网、gov.cn、学校就业网等）。
2. **严禁空壳**：找不到独立官网或确切招聘入口的企业，**直接物理删除丢弃**，绝不允许写入知识库。基本字段严禁使用 `待核对` 糊弄。
3. **机器判官系统 `score:markdown`**：所有新抓取的 Markdown 批次文件，必须在后台执行 `npm run score:markdown` 命令进行自动化跑分。低于 80 分直接拦截报错！任何 Agent（包括底层的深洗分身）必须将草稿打磨到 100分 PASS 级，才允许汇报完工。

因此后续执行搜集时，必须在 Markdown 阶段就拿出 100 分的高质量内容，绝不允许批量丢垃圾数据。
### 2. Codex / Antigravity 分工

知识库搜集流程：

1. Codex 或 Antigravity 搜集企业 / 院校候选。
2. 输出到 `research-drafts/knowledge-pool/` 的分层目录：
   - Markdown 批次放 `research-drafts/knowledge-pool/batches/`
   - raw JSON 放 `research-drafts/knowledge-pool/raw-json/`
   - 规则文件固定放根目录和 `research-drafts/knowledge-pool/rules/`
3. 每条按入库预备标准保留关键字段、来源链接、证据强弱、检索关键词、重复风险和待核对事项。
4. 不深挖薪资、作息、分数线、招生人数、就业率；没有强证据统一写 `未知` / `待核对` / 风险。
5. 不改正式库，不改页面，不部署。
6. 不运行正式导入。

正式入库流程：

1. 从知识库候选池挑较强候选。
2. Antigravity 或 Codex 审查证据强弱。
3. 生成干净草稿 JSON。
4. 保存到 `research-drafts/companies/` 或 `research-drafts/universities/`。
5. 运行 `--dry-run`。
6. 评分并判断是否建议正式导入。
7. 当前阶段宇少已确认：dry-run 通过、评分 85 分及以上且无阻塞项，即可正式导入；人工逐条打开来源核对后置。

当前执行方式（2026-06-08）：Grok 暂停作为主流程；Codex 可以继续做知识库候选搜集和正式入库。后续如果 Codex 用不了，Antigravity 也可以按同一口径继续做知识库，不需要先做 clean JSON。

相关文档：

- `research-drafts/knowledge-pool/00-宇少先看这个.md`
- `research-drafts/README.md`
- `research-drafts/knowledge-pool/README.md`
- `research-drafts/knowledge-pool/rules/SHARED_CODEX_ANTIGRAVITY_RULES.md`
- `research-drafts/knowledge-pool/rules/IMPORT_READY_KNOWLEDGE_STANDARD.md`
- `research-drafts/knowledge-pool/rules/KNOWLEDGE_POOL_ENTRY_TEMPLATE.md`
- `../antigravity工作区/ANTIGRAVITY_KNOWLEDGE_POOL_WORKFLOW.md`

### 3. 入库必须有质量闸门

企业：

- `description` 不超过 40 字。
- `ownership` 只能是：国企、民企、外企、创业公司、待核对。
- `schedule` 只能是：双休、大小周、单休、待核对。
- `salaryRange` 没强/中证据写 `未知`；只有样本写 `样本值（待核对）`。
- `research.sources` 必须存在，尽量 5 条以上。
- `research.conclusion` 控制在 80 到 160 字。

院校：

- `tier` 只能是：985 / 211、211、普通本科。
- 双一流但非 211：`tier` 写普通本科，`tags` 写双一流。
- `overview` 不超过 60 字。
- `focus` 不超过 35 字。
- `research.sources` 必须存在，尽量 6 条以上。
- 不得把研究生方向或科研平台误写成本科招生专业。

通用：

- JSON 必须合法。
- 不能有重复字段。
- links 和 sources 不能有空 URL。
- 弱证据不得单独支撑核心字段。
- 没有强/中证据的荣誉、处罚、就业率、分数线、招生人数、薪资、作息必须降级或删除。
- 文案不要宣传化。

## 已知踩坑

### 2026-06-10 批量转换 Clean JSON 翻车事故 (严禁脚本暴力洗数据)

- **事故描述**：试图使用 Node 脚本 (`bulk-import.mjs`) 将 37 份 `raw-json` 暴力转换为 `clean-json` 并绕过打分直接入库，导致格式全面崩溃。
- **根本原因 1（格式与枚举违规）**：脚本生成丢失了顶层 `kind: "company"`；同时将爬取的非结构化长句直接塞入 `ownership` 和 `schedule`，严重违反严格枚举限制。
- **根本原因 2（强塞废话）**：为图省事将 `research.conclusion` 硬编码成 8 个字，远未达到 80-160 字和多维度的专业分析要求。
- **根本原因 3（信源不足）**：原始抓取结果信源不足 5 条时，未做二次补全就强行闯关。
- **不可逾越的红线教训**：
  1. **禁止用死代码暴力拼接 Clean JSON**：从 Raw JSON 到 Clean JSON 的转换，必须依靠大模型的理解能力，逐条重写、提炼，确保严格符合结构、字数（结论80-160字）与枚举要求。
  2. **严禁绕过 Dry-run 强行入库**：必须先在 `research-drafts/companies/` 生成草稿，执行 `npm run score:drafts`，只有分数合格、0 阻塞（Blocker）的情况下，才允许考虑正式合并入库。

### 锡源爆破有限公司

- Grok 曾把“高新技术企业”写成已核验，但来源不足。
- Grok 曾把“行政处罚记录”写成风险事实，但没有强来源。
- 百度百科不能作为核心来源。
- 行业标签优先写“爆破工程 / 民爆服务”，不要轻易写“含能材料”。

### 安徽理工大学

- 用户本人学校，院校列表优先展示。
- 曾出现 `shortName: 安理大 / AUST`，应改成常用中文简称。
- 曾出现英文 `and`，需要改成中文。
- 就业率不能用来源不明 PDF 镜像写成强结论。
- “显著行业影响力”“就业竞争力强”等表述偏宣传，应收敛。
- 必须防止把安徽工业大学 `ahut.edu.cn` 和安徽理工大学 `aust.edu.cn` 混淆。

## 常用命令

开发：

```bash
npm run dev
```

构建：

```bash
npm run build
```

企业 dry-run：

```bash
npm run import:company -- "research-drafts/companies/草稿.json" --dry-run
```

企业正式导入：

```bash
npm run import:company -- "research-drafts/companies/草稿.json"
```

院校 dry-run：

```bash
npm run import:university -- "research-drafts/universities/草稿.json" --dry-run
```

院校正式导入：

```bash
npm run import:university -- "research-drafts/universities/草稿.json"
```

## 未来会话建议

如果用户问“现在流程是什么”，回答：

> 现在先做本地入库预备级知识库：Codex 和 Antigravity 用同一套规则搜企业和院校，保存到 `research-drafts/knowledge-pool/`，按统一模板补齐字段、来源、证据强弱、检索关键词、重复风险和待核对事项；暂时不正式入库。后续再从知识库挑强候选做 clean JSON、dry-run、评分，达标后导入。

如果宇少只说这类一句话指令，也默认直接开始扩知识库，不需要再单独分配任务：

- `继续扩知识库`
- `做一轮知识库`
- `继续补企业知识库`
- `继续补院校知识库`
- `先扩一点知识库`

默认执行方式：

- 没说类型时：优先企业知识库扩充。
- 说了企业：直接做企业批次。
- 说了院校：直接做院校批次。
- 没说“测试 / 只看效果 / 不写文件”时：必须落 `knowledge-pool` 文件并更新 `INDEX.md`。

如果用户贴外部搜索结果，让 Codex 做：

1. 审查来源强弱。
2. 删除/降级不稳结论。
3. 生成合规 JSON。
4. 保存草稿。
5. 跑 dry-run。
6. 给出评分和是否建议导入。
