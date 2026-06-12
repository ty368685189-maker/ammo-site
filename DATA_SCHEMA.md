# 数据结构定义

当前项目先使用 `src/data/*.ts` 本地数据。后续接 Directus 时，建议保持下面这些字段名和枚举，避免页面、导入脚本和知识库候选搜集规则再次返工。

## 通用核验字段

`verification` 用来告诉读者：哪些信息已经有来源支撑，哪些仍需要复查。

| 字段名 | 类型 | 说明 | 必填 |
|--------|------|------|------|
| status | enum | `已核验` / `部分核验` / `过期待复查` | yes |
| relevanceLevel | enum | `高` / `中` / `低` / `待核对` | yes |
| updatedAt | string | 核验日期，格式 `YYYY-MM-DD` | yes |
| summary | text | 一句话说明资料可信度和主要不确定点 | yes |
| verifiedFields | string[] | 已有来源支撑的信息 | yes |
| pendingFields | string[] | 仍需人工或最新公告核对的信息 | yes |

`research` 用来承载压缩后的调研报告。长篇原始报告不要直接放进页面。

| 字段名 | 类型 | 说明 | 必填 |
|--------|------|------|------|
| updatedAt | string | 调研日期，格式 `YYYY-MM-DD` | yes |
| status | text | 一句话说明资料状态 | yes |
| relevanceLevel | enum | `高` / `中` / `低` | yes |
| conclusion | text | 80-160 字左右的谨慎结论 | yes |
| keySignals | string[] | 3-5 条事实信号 | yes |
| suitableFor | string[] | 2-4 条适合人群 | yes |
| risks | string[] | 2-5 条风险和待核对事项 | yes |
| sources | Source[] | 调研来源 | yes |
| searchTrace | SearchTrace[] | 深度搜索过程记录，可选 | no |

`Source`：

| 字段名 | 类型 | 说明 | 必填 |
|--------|------|------|------|
| title | string | 来源标题 | yes |
| type | string | 来源类型 | yes |
| date | string | 发布日期、年份或 `待核对` | yes |
| url | string | 来源链接 | yes |

`SearchTrace`：

| 字段名 | 类型 | 说明 | 必填 |
|--------|------|------|------|
| round | number | 检索轮次 | yes |
| queries | string[] | 实际搜索关键词 | yes |
| usefulFindings | string[] | 本轮有效发现 | yes |
| gaps | string[] | 本轮仍未找到的信息 | yes |

## 1. companies 企业

对应源码：[companies.ts](src/data/companies.ts)

| 字段名 | 类型 | 说明 | 必填 |
|--------|------|------|------|
| id | number | 本地自增 id | yes |
| name | string | 企业名称 | yes |
| ownership | enum | `国企` / `民企` / `外企` / `创业公司` / `待核对` | yes |
| city | string | 所在城市，不确定写 `待核对` | yes |
| region | string | 区域、园区或省份，不确定写 `待核对` | yes |
| salaryRange | string | 薪资范围；没来源写 `未知`，有金额但不确定标 `待核对` | yes |
| schedule | enum | `双休` / `大小周` / `单休` / `待核对` | yes |
| scaleOrIndustry | string | 行业或规模标签 | yes |
| highlights | string[] | 2-6 个短标签 | yes |
| positions | string | 常见岗位；不确定写 `待核对` | yes |
| education | string | 学历要求；不确定写 `待核对` | yes |
| website | string | 官网或主要入口；没有写空字符串 | yes |
| links | CompanyLink[] | 官网、招聘、社媒、新闻等入口 | yes |
| description | string | 40 字以内客观简介 | yes |
| verification | Verification | 核验状态 | yes |
| research | Research | 调研报告，可选但重点企业建议填写 | no |

`CompanyLink.type` 允许值：

```text
官网 / 招聘入口 / 招聘公告 / 公众号 / 抖音号 / 视频号 / 新闻资料 / 政府资料 / 学校就业网 / 其他
```

## 2. universities 院校

对应源码：[universities.ts](src/data/universities.ts)

| 字段名 | 类型 | 说明 | 必填 |
|--------|------|------|------|
| id | string | 短 id，用于 `/universities/:id` | yes |
| name | string | 学校全称 | yes |
| shortName | string | 常用简称 | yes |
| city | string | 城市 | yes |
| province | string | 省份 | yes |
| tier | enum | `985 / 211` / `211` / `普通本科` | yes |
| logo | string | 校徽图片路径，通常为 `/logos/schools/学校名.png` | yes |
| officialUrl | string | 学校官网 | yes |
| majorUrl | string | 学院、专业或招生入口 | no |
| focus | string | 一句话专业侧重点 | yes |
| tags | string[] | 2-6 个短标签 | yes |
| overview | string | 60 字以内院校概览 | yes |
| suitableFor | string[] | 2-4 条适合人群 | yes |
| reminders | string[] | 2-4 条报考提醒 | yes |
| links | UniversityLink[] | 官网、招生网、学院官网、就业报告等入口 | yes |
| verification | Verification | 核验状态 | yes |
| research | Research | 调研报告，可选但重点院校建议填写 | no |

`UniversityLink.type` 允许值：

```text
学校官网 / 招生网 / 学院官网 / 招生目录 / 就业报告 / 教学质量报告 / 研究生招生 / 新闻资料 / 其他
```

层次说明：

- `985 / 211`：同时属于 985 和 211。
- `211`：属于 211 但不是 985。
- `普通本科`：非 211 本科院校；如果是双一流但非 211，`tier` 仍写 `普通本科`，在 `tags` 里写 `双一流`。

## 3. graduate_directions 考研方向

当前仍是静态页面内容，后续接 CMS 时可按下面字段建表。

| 字段名 | 类型 | 说明 | 必填 |
|--------|------|------|------|
| id | integer | 自增主键 | auto |
| name | string | 方向名称 | yes |
| description | text | 方向简介，通俗易懂 | yes |
| exam_subjects | text | 考试科目 | yes |
| target_schools | text | 哪些学校招这个方向 | no |
| difficulty | enum | `简单` / `中等` / `困难` | no |
| advice | text | 一句话建议 | no |
| career_after | text | 读出来能干嘛 | no |

## 4. experience_posts 经验分享

| 字段名 | 类型 | 说明 | 必填 |
|--------|------|------|------|
| id | integer | 自增主键 | auto |
| title | string | 标题 | yes |
| author | string | 作者或昵称 | yes |
| category | enum | `考研` / `就业` / `校园生活` / `其他` | yes |
| content | text | 正文，Markdown 格式 | yes |
| featured | boolean | 是否置顶 | no |
| publish_date | datetime | 发布时间 | auto |

## Directus 迁移建议

- `companies`、`universities` 主表存基础字段。
- `links`、`sources`、`verifiedFields`、`pendingFields`、`keySignals`、`suitableFor`、`risks` 可以先用 JSON 字段，等数据量变大再拆子表。
- Public 角色只给只读权限。
- 管理员录入时先走 `research-drafts/*` 草稿和导入脚本，人工确认后再发布。
