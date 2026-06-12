# 知识库候选池流程

第一次看这个目录，先看 `00-宇少先看这个.md`。

这个目录放企业和院校的“入库预备资料”，不是正式网站库。

宇少当前目标是先把知识库做厚：企业、院校、研究所、检测评价机构、爆破工程公司、安全/含能/兵器/矿业安全相关院校线索，都可以先收集到这里。资料质量要尽量达到“后续可入库”的程度，但暂时不写正式库、不改页面、不部署。

## 1. 知识库是什么

知识库 = 企业和院校入库预备信息池。

它和正式库不同：

- 知识库：放在 `research-drafts/knowledge-pool/`，数量要做起来，但每条要尽量达到入库预备标准。
- 正式企业库：`src/data/companies.ts`，会直接显示到网站。
- 正式院校库：`src/data/universities.ts`，会直接显示到网站。

知识库要把线索、入口、来源、证据强弱、风险和待核对字段攒齐；不要求立刻入正式库，但要尽量减少后续重新大搜的工作。

固定保存位置：

```text
E:\弹药网站\ammo-site\research-drafts\knowledge-pool\
```

不要把知识库文件保存到这个根目录之外。

目录分层固定如下：

```text
knowledge-pool/
  00-宇少先看这个.md
  README.md
  INDEX.md
  FORMAL_LIBRARY_SNAPSHOT.md
  rules/
    SHARED_CODEX_ANTIGRAVITY_RULES.md
    IMPORT_READY_KNOWLEDGE_STANDARD.md
    KNOWLEDGE_POOL_ENTRY_TEMPLATE.md
  batches/
    mixed/
    enterprise/
    university/
  raw-json/
  notes/
```

根目录只放入口、索引、正式库快照和规则，不再堆历史批次文件。

## 2. 每条候选最低字段

企业或院校候选至少写这些：

- 名称。
- 类型：企业 / 院校。
- 地区。
- 相关方向。
- 关键入口链接：官网、集团页、招生网、学院官网、研究生招生、招聘入口、政府资料、公告等。
- 证据强弱：强 / 中 / 弱 / 待核对。
- 重复风险：是否可能和已入库主体、旧名、集团总部或子公司重复。
- 建议动作：后续清洗 / 暂缓 / 跳过。

不要为了补字段硬编薪资、作息、分数线、招生人数、就业率、就业去向。没有强证据统一写 `未知`、`待核对` 或放进风险。

## 3. 谁可以做

Codex 和 Antigravity 都可以做知识库。

当前不优先使用 Grok，因为 Grok 搜索和整理不稳定。除非宇少明确要求，否则不要把 Grok 作为主流程。

Antigravity 接手时，只要按这个目录的格式继续新建 batch 文件即可，不需要改正式库，也不需要跑导入脚本。

Antigravity 开工前还要读：

- `INDEX.md`：看已经搜过哪些批次。
- `FORMAL_LIBRARY_SNAPSHOT.md`：看正式库已经有哪些企业和院校，避免重复。
- `rules/SHARED_CODEX_ANTIGRAVITY_RULES.md`：看 Codex / Antigravity 统一规则。
- `rules/IMPORT_READY_KNOWLEDGE_STANDARD.md`：看入库预备级知识库标准。
- `rules/KNOWLEDGE_POOL_ENTRY_TEMPLATE.md`：按模板落地候选。
- `rules/KNOWLEDGE_POOL_REVIEW_LESSONS.md`：看历史审查踩坑，避免重复犯错。
- `E:\弹药网站\antigravity工作区\ANTIGRAVITY_PROJECT_CONTEXT.md`：看项目只读记忆。
- `E:\弹药网站\antigravity工作区\ANTIGRAVITY_KNOWLEDGE_POOL_WORKFLOW.md`：看 Antigravity 专用执行流程。

默认规则：

- Antigravity 可以读项目来理解上下文。
- Antigravity 不改正式库、页面、源码、脚本或部署文件。
- 只要宇少说“做知识库 / 扩知识库 / 继续知识库”，默认就要写本目录的新候选文件并更新 `INDEX.md`。
- 宇少只要一句话说这类指令，也算正式开工，不需要再额外写任务单：
  - `继续扩知识库`
  - `做一轮知识库`
  - `继续补企业知识库`
  - `继续补院校知识库`
  - `先扩一点知识库`
- 没特别说明类型时，默认优先企业知识库扩充。
- 只有宇少明确说“测试 / 只看效果 / 不写文件”时，才只在聊天里输出候选清单。

合格知识库不是聊天摘要，必须沉淀为文件。每条候选至少保留：

- 入库预备字段。
- 关键入口链接。
- 来源记录：标题、类型、日期或待核对、URL。
- 证据强弱。
- 重复风险。
- 建议动作。
- 检索关键词。

企业条目常见错误红线：

- 不要把官网首页同时当作“公司简介”“招聘公告”“子公司概况”等多个不同来源。
- 没有独立招聘页时，`招聘入口 / 招聘公告` 写 `待核对`，不要硬填官网首页。
- 企业来源类型按企业口径写，不要混进院校条目的 `学校官网 / 招生目录` 这类类型。
- 薪资、作息、福利没证据时只写 `未知` / `待核对`。
- `searchTrace` 里写到的福利、作息、资质、岗位结论，最好都能在 `sources` 里找到对应链接；找不到就降级成待核对。

Codex 和 Antigravity 必须按同一套规则做知识库。不要出现 Codex 一种格式、Antigravity 另一种格式。

搜索深度要求：

- 先做广度搜索，用方向词找一批候选。
- 再对每个入选候选做多轮核验。
- 企业至少搜：主体名称官网、主体名称招聘/学校就业网、主体名称+方向词。
- 院校至少搜：学校招生网/本科招生、学院/专业介绍、研究生招生目录+方向词。
- 只搜一次的企业或院校，不能写成强候选。

质量目标：

- 每条尽量做到后续可直接转 clean JSON。
- 企业要尽量补齐城市、区域、性质、官网、招聘入口、来源、风险。
- 院校要尽量补齐城市、省份、层次、招生/学院/研招入口、口径、风险。
- 知识库阶段不入库，不改正式库。

## 4. 推荐文件命名

普通批次：

```text
batches/mixed/knowledge-pool-YYYY-MM-DD-batchN.md
raw-json/knowledge-pool-YYYY-MM-DD-batchN.raw.json
```

只搜企业：

```text
batches/enterprise/enterprise-scout-YYYY-MM-DD-HHMM.md
```

只搜院校：

```text
batches/university/university-scout-YYYY-MM-DD-HHMM.md
```

交接或辅助说明：

```text
notes/说明文件名.md
```

索引文件：

```text
INDEX.md
```

每轮结束后更新 `INDEX.md`，记录本轮文件、候选数量、较强候选、暂缓候选和下一步建议。

每次审查后，如果发现 `基本合格需修` 或 `不合格`，要把问题追加到：

```text
rules/KNOWLEDGE_POOL_REVIEW_LESSONS.md
```

这是知识库错题本，用来防止下次再犯同类问题。

## 5. 边界

做知识库时不要：

- 不改 `src/data/companies.ts`。
- 不改 `src/data/universities.ts`。
- 不改页面。
- 不部署。
- 不碰服务器、VPS、域名。
- 不把待核对内容写成确定事实。
- 不用百科、工商聚合页、第三方汇总单独支撑核心事实。

后续要正式入库时，再从知识库里挑强候选，另行生成 `research-drafts/companies/` 或 `research-drafts/universities/` 下的 clean JSON，并跑 dry-run、评分和数据质量检查。
