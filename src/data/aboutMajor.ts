export type MajorQuickFact = {
  label: string
  value: string
  note: string
}

export type MajorInsight = {
  title: string
  body: string
}

export type MajorLearningBlock = {
  eyebrow: string
  title: string
  description: string
  items: string[]
}

export type MajorStudyStage = {
  year: string
  title: string
  focus: string
  actions: string[]
}

export type MajorAbility = {
  name: string
  detail: string
}

export type MajorDirection = {
  title: string
  summary: string
  examples: string[]
  check: string
}

export type MajorFitItem = {
  title: string
  description: string
}

export type MajorCheckItem = {
  label: string
  detail: string
}

export type MajorSourceLink = {
  title: string
  meta: string
  url: string
}

export const majorNavItems = [
  { label: '概览', to: '/about-major' },
  { label: '学什么', to: '/about-major/curriculum' },
  { label: '四年节奏', to: '/about-major/path' },
  { label: '毕业去向', to: '/about-major/career' },
  { label: '报考核对', to: '/about-major/checklist' },
]

export const majorQuickFacts: MajorQuickFact[] = [
  {
    label: '专业代码',
    value: '082104',
    note: '普通高等学校本科专业目录中的兵器类本科专业。',
  },
  {
    label: '所属门类',
    value: '工学 · 兵器类',
    note: '常会用到力学、机械、材料、测试、安全和系统工程。',
  },
  {
    label: '常见学制',
    value: '四年 · 工学学士',
    note: '具体学制、分流与培养方向以各校当年培养方案为准。',
  },
  {
    label: '关键词',
    value: '弹药 / 爆炸 / 安全 / 测试',
    note: '不要只按名字理解，它本质上是强工程约束下的交叉专业。',
  },
]

export const majorFirstInsights: MajorInsight[] = [
  {
    title: '前两年不会天天上“弹药课”',
    body: '大部分时间都在学数学、物理、力学、机械、计算机和电工电子。基础课撑不住，后面的专业课和课程设计会很吃力。',
  },
  {
    title: '学校方向差别很大',
    body: '有的学校偏国防弹药、毁伤效应、智能化弹药，有的学校偏民爆器材、工程爆破和安全技术。报考前先看学院、培养方案和近年就业去向。',
  },
  {
    title: '它不是“动手玩危险品”',
    body: '学习和工作更看重规范、审批、实验安全、数据记录和工程责任。越接近真实工程，越不能靠想当然。',
  },
]

export const majorLearningBlocks: MajorLearningBlock[] = [
  {
    eyebrow: '01',
    title: '数理与工程基础',
    description: '后面学弹道、冲击、结构和测试，基本都要靠这层基础。',
    items: ['高等数学', '线性代数', '大学物理', '工科化学', 'C 语言 / Python', '工程制图'],
  },
  {
    eyebrow: '02',
    title: '力学、机械与电测底座',
    description: '弹药和爆炸不是只看化学，结构、运动、载荷和测试也很重要。',
    items: ['理论力学', '材料力学', '机械设计', '机械制造基础', '电工电子', '传感与测试'],
  },
  {
    eyebrow: '03',
    title: '专业课',
    description: '各校课程名不完全一样，常见内容是弹药系统、爆炸作用和安全评价。',
    items: ['弹药概论', '弹道学', '爆炸力学', '弹药设计理论', '终点效应', '安全与防护'],
  },
  {
    eyebrow: '04',
    title: '实践与工程训练',
    description: '课程设计、实验和毕设都绕不开一件事：说清楚、算清楚、测清楚、写清楚。',
    items: ['金工实习', '课程设计', '仿真计算', '动态测试', '实验报告', '毕业设计'],
  },
]

export const majorStudyStages: MajorStudyStage[] = [
  {
    year: '大一',
    title: '夯实基础课程',
    focus: '数学、物理、化学、工程图、程序设计和大学适应。',
    actions: ['结合数学、物理、化学等基础课表现判断学习压力。', '开始了解本校是大类招生、专业直招还是后续分流。'],
  },
  {
    year: '大二',
    title: '进入工程语言',
    focus: '力学、机械、电工电子、材料和测试课程会明显增多。',
    actions: ['把 CAD、数据处理和基础编程练起来。', '尽早问清楚学院里不同团队偏弹药、民爆、安全还是仿真。'],
  },
  {
    year: '大三',
    title: '专业课开始分化',
    focus: '弹药、爆炸、弹道、测试、安全等课程和实验集中出现。',
    actions: ['用课程设计试着分清自己更偏研发、试验、工艺、现场还是继续读研。', '关注目标单位和目标院校的岗位/方向关键词。'],
  },
  {
    year: '大四',
    title: '用毕设和去向收口',
    focus: '毕业设计、实习、考研复试、秋招和签约选择同时推进。',
    actions: ['准备能展示的项目、图纸、仿真、实验数据或调研报告。', '投递前逐项核对工作地点、岗位内容、签约主体和保密要求。'],
  },
]

export const majorAbilities: MajorAbility[] = [
  {
    name: '工程计算',
    detail: '能用数学、力学和数值工具分析结构、冲击、运动和载荷问题。',
  },
  {
    name: '建模与制图',
    detail: '熟悉工程图、三维建模、基础机械设计和必要的仿真软件。',
  },
  {
    name: '测试与数据',
    detail: '能理解传感、采集、动态测试、误差分析和实验报告写作。',
  },
  {
    name: '工艺与质量意识',
    detail: '知道设计、制造、检验、可靠性和安全规范会互相影响。',
  },
  {
    name: '资料检索与表达',
    detail: '能查标准、读论文/公告、写技术文档，并把复杂问题讲清楚。',
  },
  {
    name: '合规与安全边界',
    detail: '理解专业相关场景的审批、保密、职业规范和工程责任。',
  },
]

export const majorDirections: MajorDirection[] = [
  {
    title: '国防军工 / 科研院所',
    summary: '更偏弹药系统、战斗部、毁伤效应、试验测试、仿真分析、工艺质量和项目管理。',
    examples: ['军工集团及下属研究院所', '装备相关试验与评价单位', '高校和科研单位'],
    check: '重点核对签约主体、工作地点、岗位性质、保密要求、学历门槛和轮岗安排。',
  },
  {
    title: '民爆 / 工程爆破 / 安全技术',
    summary: '更偏民用爆破器材、矿山与基础设施工程、安全评价、项目技术和现场管理。',
    examples: ['民爆生产企业', '爆破工程公司', '矿山、交通、水利等工程场景'],
    check: '重点核对现场比例、证书要求、安全责任、出差频率、项目所在地和作息制度。',
  },
  {
    title: '装备制造 / 测试评价 / 质量可靠性',
    summary: '把力学、机械、测试和数据能力迁移到更广泛的工程岗位。',
    examples: ['机械与装备制造', '可靠性与试验测试', '质量、工艺、仿真和技术支持'],
    check: '重点核对岗位是否真的需要本专业能力，还是泛机械/质量岗位。',
  },
  {
    title: '继续深造 / 跨方向转向',
    summary: '常见去向有兵器科学与技术、力学、机械、安全工程、材料、化工、控制和仿真计算。',
    examples: ['兵器科学与技术', '工程力学 / 机械工程', '安全工程 / 材料与化工'],
    check: '重点核对考试科目、导师方向、实验条件、复试要求和毕业去向。',
  },
]

export const majorSuitableFor: MajorFitItem[] = [
  {
    title: '理工基础愿意硬啃',
    description: '能接受数学、物理、力学、机械这些课程长期打底，不只看“专业课听起来有意思”。',
  },
  {
    title: '对国防、民爆或工程安全有长期兴趣',
    description: '兴趣不是猎奇，而是愿意理解工程约束、责任边界和行业规则。',
  },
  {
    title: '能接受地点和岗位的不确定性',
    description: '相关岗位不一定都在一线城市，也不一定都是研发岗，工艺、试验、质量、现场都可能出现。',
  },
]

export const majorCautionFor: MajorFitItem[] = [
  {
    title: '只想找轻松泛互联网岗位',
    description: '这个专业常见去向不是轻量办公和纯软件岗位，想转向需要提前补技能。',
  },
  {
    title: '排斥实验、现场和严格流程',
    description: '越靠近真实工程，越强调安全规范、记录、审批、纪律和团队协作。',
  },
  {
    title: '只按名字做决定',
    description: '同名专业在不同学校可能差别很大，应重点核对培养方案、实验条件、升学就业数据和口碑。',
  },
]

export const majorCheckItems: MajorCheckItem[] = [
  {
    label: '招生方式',
    detail: '是专业直招还是大类招生？分流规则、选科要求、体检限制和转专业政策是什么？',
  },
  {
    label: '培养方向',
    detail: '学院偏国防弹药、民爆工程、安全技术、含能材料、仿真测试还是智能化方向？',
  },
  {
    label: '课程与实践',
    detail: '近版培养方案里有哪些专业课、课程设计、实验课、实习和毕业设计要求？',
  },
  {
    label: '升学数据',
    detail: '近三届考研比例、主要去向、校内保研政策、导师方向和复试科目分别是什么？',
  },
  {
    label: '就业数据',
    detail: '毕业生主要去哪些城市和单位？研发、工艺、试验、质量、现场岗位各占多少？',
  },
  {
    label: '个人约束',
    detail: '自己能否接受保密、地点、现场、作息、实验安全、长期学习和行业周期这些现实因素？',
  },
]

export const majorSourceLinks: MajorSourceLink[] = [
  {
    title: '教育部：普通高等学校本科专业目录（2026 年）',
    meta: '核对专业目录、专业类与专业代码',
    url: 'https://www.moe.gov.cn/srcsite/A08/moe_1034/s3882/202604/t20260427_1434931.html',
  },
  {
    title: '南京理工大学本科招生：兵器类（弹药工程与爆炸技术）',
    meta: '参考培养目标、能力要求、课程和实践环节',
    url: 'https://zsb.njust.edu.cn/detail?id=452',
  },
  {
    title: '北京理工大学机电学院：本科生培养 / 专业介绍',
    meta: '参考专业特色、毕业要求和方向表述',
    url: 'https://smen.bit.edu.cn/rcpy/bkspy/index.htm',
  },
]
