# 知识库审查问题沉淀

这个文件专门记录每次知识库审查发现的问题。

目的不是追责，而是把错误变成后续规则，避免 Codex 或 Antigravity 下次再犯。

## 使用规则

每次知识库审查后，如果出现 `基本合格但需修` 或 `不合格`，都要追加记录。

每条记录至少写：

- 日期。
- 来源：Codex / Antigravity / 其他。
- 文件。
- 审查结论：合格 / 基本合格需修 / 不合格。
- 主要问题。
- 应沉淀规则。
- 后续检查口径。

如果问题已经补进 `SHARED_CODEX_ANTIGRAVITY_RULES.md` 或 `ANTIGRAVITY_KNOWLEDGE_POOL_WORKFLOW.md`，也要写明。

## 问题记录

### 2026-06-09 Antigravity 测试条目：中钢集团武汉安全环保研究院有限公司

- 来源：Antigravity
- 文件：
  - `batches/enterprise/test-antigravity-wrisa-2026-06-09.md`
  - `raw-json/test-antigravity-wrisa-2026-06-09.raw.json`
- 审查结论：基本合格需修
- 主要问题：
  - 多个不同来源标题都使用官网首页 URL，无法追溯到具体页面。
  - 没有独立招聘页时，把官网首页写成了招聘入口。
  - 企业条目混用了院校口径来源类型，例如 `学校官网 / 招生目录`。
  - 作息写成 `双休`，但没有强/中证据支撑。
  - `searchTrace` 写了福利、作息、资质等结论，但 `sources` 没有对应具体链接。
- 应沉淀规则：
  - 不得用同一个首页 URL 冒充多个来源。
  - 没有独立招聘页时，招聘入口写 `待核对`。
  - 企业条目必须使用企业来源类型，不混用院校来源类型。
  - 薪资、作息、福利没有强/中证据时，写 `未知` / `待核对`。
  - `searchTrace` 中的结论必须能被 `sources` 对应链接支撑；否则写成待核对或缺口。
- 已同步到：
  - `rules/SHARED_CODEX_ANTIGRAVITY_RULES.md`
  - `README.md`
  - `E:\弹药网站\antigravity工作区\ANTIGRAVITY_KNOWLEDGE_POOL_WORKFLOW.md`
  - `CODEX_PROJECT_MEMORY.md`
- 后续检查口径：
  - 审查企业条目时，优先检查 URL 是否能追到具体页面。
  - 审查企业条目时，优先检查招聘、薪资、作息、福利是否被写死。
  - 审查企业条目时，检查来源类型是否混用了院校枚举。

### 2026-06-09 Antigravity 自修后二审：中钢集团武汉安全环保研究院有限公司

- 来源：Antigravity
- 文件：
  - `batches/enterprise/test-antigravity-wrisa-2026-06-09.md`
  - `raw-json/test-antigravity-wrisa-2026-06-09.raw.json`
- 审查结论：基本合格，接近合格
- 已修正：
  - `招聘入口 / 招聘公告` 已从官网首页改为 `待核对`。
  - `作息` 已从 `双休` 改为 `待核对`。
  - 院校口径来源类型已改掉。
  - 公司简介、研究生调剂公告、绿世纪入口已补为更具体 URL。
- 仍需注意：
  - `国聘机构公示主页` 仍是平台首页，且类型写成 `政府资料` 不够稳；更适合写 `招聘入口` 或 `其他`，除非能给出具体单位页。
  - `searchTrace` 仍提到国企背景、1959 年建院、中国宝武托管重组、五险一金等信息，但 `sources` 里未逐项给出可追溯具体链接；后续要么补来源，要么把这些表述降级为待核对线索。
  - Markdown 中出现 `风险 and 待核对`，应统一为中文 `风险和待核对`。
- 后续检查口径：
  - 自修后也要检查平台首页是否仍被当成具体来源。
  - 自修后也要检查 `searchTrace` 的事实结论是否都有 `sources` 对应。
  - 小语言问题不影响主体合格性，但正式批次应避免中英文混杂。
