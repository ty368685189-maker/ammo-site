export type GraduateDirectionLevel = '顺接' | '半跨' | '跨考'

export type GraduateDirection = {
  code: string
  title: string
  summary: string
  fit: string
  topics: string[]
  subjects: string[]
  bridge: string[]
  warning: string
  level: GraduateDirectionLevel
}

export type GraduateCompareRow = {
  direction: string
  match: string
  difficulty: string
  commonSubjects: string
  outcome: string
  notFor: string
}

export type GraduateSchoolSignal = {
  name: string
  position: string
  signal: string
  check: string
  url: string
}

export type GraduateTimelineStage = {
  time: string
  title: string
  focus: string
  actions: string[]
}

export type GraduateSourceLink = {
  title: string
  meta: string
  url: string
}

export const graduateNavItems = [
  { label: '概览', to: '/graduate' },
  { label: '方向地图', to: '/graduate/directions' },
  { label: '方向对比', to: '/graduate/compare' },
  { label: '院校入口', to: '/graduate/schools' },
  { label: '四年准备', to: '/graduate/timeline' },
]

export const graduateQuickJudgements = [
  {
    label: '最顺接',
    value: '兵器科学与技术',
    note: '想继续做弹药、战斗部、发射、毁伤、试验测试或仿真评价，先看这个方向。',
  },
  {
    label: '更好迁移',
    value: '力学 / 机械',
    note: '本科里的力学、机械、结构和测试能力，在这些方向里还能接着用。',
  },
  {
    label: '行业相关',
    value: '安全 / 材料',
    note: '适合关注工程安全、民爆、含能材料、可靠性和风险评价的学生。',
  },
  {
    label: '主动转向',
    value: '控制 / 电子信息 / 计算',
    note: '要早点补编程、信号处理、控制、机器学习或仿真计算基础。',
  },
]

export const graduateDecisionHints = [
  {
    title: '继续本专业相关方向',
    body: '先看兵器科学与技术，再细查弹药、发射、毁伤、测试、仿真和总体方向。',
  },
  {
    title: '拓宽工程就业面',
    body: '力学、机械、安全都能作为备选，把本科的结构、测试、工艺和工程基础迁移出去。',
  },
  {
    title: '主动转向智能化',
    body: '提前补控制、信号、电路、编程或仿真计算，复试时要能讲清为什么转。',
  },
]

export const graduateDirectionTags = ['兵器', '力学', '机械', '安全', '材料', '控制 / 电子信息']

export const graduateDirections: GraduateDirection[] = [
  {
    code: '0826',
    title: '兵器科学与技术',
    summary: '和本科内容最贴近，常见方向包括弹药系统、战斗部、毁伤效应、发射理论、武器系统总体、试验测试和仿真评价。',
    fit: '适合能接受本专业行业属性，想继续看军工、装备、试验或科研院所方向的学生。',
    topics: ['弹药系统', '毁伤与防护', '爆炸冲击', '发射与弹道', '动态测试', '仿真评估'],
    subjects: ['政治', '英语一或英语二', '数学一为主', '力学 / 机械 / 弹药类专业课'],
    bridge: ['理论力学', '材料力学', '弹道学', '机械设计', '测试技术', '科研论文阅读'],
    warning: '不要只看专业代码，要看导师和课题组到底偏弹药、火炮、发射、毁伤、测试还是总体。',
    level: '顺接',
  },
  {
    code: '0801',
    title: '力学',
    summary: '适合把爆炸、冲击、结构、弹道和仿真问题抽象成力学问题，后续可进入工程力学、固体力学、流体力学、爆炸力学等方向。',
    fit: '适合数学和力学基础比较扎实，愿意做建模、推导、仿真和实验分析的学生。',
    topics: ['工程力学', '爆炸力学', '冲击动力学', '结构响应', '数值仿真', '多物理场'],
    subjects: ['政治', '英语一为主', '数学一', '理论力学 / 材料力学 / 工程力学'],
    bridge: ['高等数学', '线性代数', '理论力学', '材料力学', '有限元基础', '数值计算'],
    warning: '力学读研对基础要求更硬，不能只靠背专业课，需要能长期处理抽象模型和公式。',
    level: '半跨',
  },
  {
    code: '0802 / 0855',
    title: '机械工程 / 机械',
    summary: '把弹药专业里的结构、机构、制造、工艺、可靠性和试验能力迁移到更宽的装备制造赛道。',
    fit: '适合不想被行业限制太窄，同时又希望保留工科研发、工艺、结构和测试路线的学生。',
    topics: ['机械设计', '结构强度', '智能制造', '可靠性', '试验测试', '装备工艺'],
    subjects: ['政治', '英语一或英语二', '数学一或数学二', '机械设计 / 理论力学 / 材料力学'],
    bridge: ['工程制图', '机械原理', '机械设计', '三维建模', '制造基础', '实验数据处理'],
    warning: '机械方向选择面更宽，但竞争者也多，必须用项目、软件和专业课成绩证明迁移能力。',
    level: '半跨',
  },
  {
    code: '0837 / 0857',
    title: '安全科学与工程 / 资源与环境',
    summary: '与民爆、工程爆破、安全评价、风险控制、灾害防治和工业安全关联度较高。',
    fit: '适合关注工程安全、现场管理、风险评价，能接受规范和责任要求的学生。',
    topics: ['安全评价', '爆破安全', '风险控制', '矿山安全', '应急技术', '工业安全'],
    subjects: ['政治', '英语一或英语二', '数学二较常见', '安全系统工程 / 工程力学 / 安全学原理'],
    bridge: ['安全工程基础', '工程力学', '概率统计', '规范标准检索', '事故案例分析', '现场调研能力'],
    warning: '要分清学术安全、工程安全和现场安全管理，毕业岗位的工作环境差异很大。',
    level: '半跨',
  },
  {
    code: '0805 / 0856',
    title: '材料科学与工程 / 材料与化工',
    summary: '适合转向含能材料、材料加工、复合材料、结构材料、可靠性和失效分析等方向。',
    fit: '适合化学、材料和实验能力较好，愿意长期做实验、表征、配方或性能分析的学生。',
    topics: ['含能材料', '复合材料', '材料表征', '失效分析', '材料加工', '安全性能'],
    subjects: ['政治', '英语一或英语二', '数学二较常见', '材料科学基础 / 物理化学 / 化工原理'],
    bridge: ['工科化学', '材料科学基础', '物理化学', '实验设计', '数据拟合', '文献阅读'],
    warning: '材料方向对实验周期和细节耐心要求高，跨到化工还要补大量化学基础。',
    level: '半跨',
  },
  {
    code: '0811 / 0854',
    title: '控制科学与工程 / 电子信息',
    summary: '适合从弹药智能化、制导控制、信号处理、测试系统、嵌入式和无人系统方向切入。',
    fit: '适合数学、编程、电路和控制基础愿意补起来，想往智能装备或测试系统转的学生。',
    topics: ['控制理论', '制导控制', '信号处理', '嵌入式', '测试系统', '智能装备'],
    subjects: ['政治', '英语一或英语二', '数学一或数学二', '自动控制原理 / 信号与系统 / 电路'],
    bridge: ['线性代数', '自动控制原理', '电工电子', 'C / Python', '信号处理', '单片机或嵌入式'],
    warning: '这是主动转向，不是天然顺接；越晚开始补控制和编程，复试越容易露怯。',
    level: '跨考',
  },
]

export const graduateCompareRows: GraduateCompareRow[] = [
  {
    direction: '兵器科学与技术',
    match: '和本科最贴近',
    difficulty: '难在名额、导师方向和学校筛选',
    commonSubjects: '政治、英语、数学一、力学/机械/兵器类专业课',
    outcome: '军工院所、装备单位、高校科研、试验测试、仿真评价',
    notFor: '完全排斥军工属性、保密要求或非一线城市工作的人',
  },
  {
    direction: '力学',
    match: '力学基础好更容易接上',
    difficulty: '难在数学、建模和专业课要求',
    commonSubjects: '政治、英语一、数学一、理论力学/材料力学',
    outcome: '仿真分析、结构强度、冲击动力学、工程研发',
    notFor: '只想背题、不愿做推导和建模的人',
  },
  {
    direction: '机械',
    match: '结构、制图、工艺和测试能力可迁移',
    difficulty: '竞争面宽，需要项目和软件能力',
    commonSubjects: '政治、英语、数学一/二、机械设计/力学',
    outcome: '装备制造、结构设计、工艺、质量可靠性、试验',
    notFor: '不愿补机械设计、三维建模和制造基础的人',
  },
  {
    direction: '安全 / 资源与环境',
    match: '民爆、爆破、安全评价相关度高',
    difficulty: '难在分清研究方向与实际岗位',
    commonSubjects: '政治、英语、数学二、安全系统工程/工程力学',
    outcome: '安全评价、工程安全、矿山与爆破、应急技术',
    notFor: '不能接受现场、规范和安全责任的人',
  },
  {
    direction: '材料 / 材化',
    match: '含能材料或实验方向可衔接',
    difficulty: '需要补材料、化学和实验方法',
    commonSubjects: '政治、英语、数学二、材料科学基础/物化',
    outcome: '材料研发、含能材料、质量检测、失效分析',
    notFor: '排斥长期实验和细碎数据处理的人',
  },
  {
    direction: '控制 / 电子信息',
    match: '适合智能化、测试和制导控制转向',
    difficulty: '跨考难度较高，复试会看基础',
    commonSubjects: '政治、英语、数学、自动控制/信号/电路',
    outcome: '控制算法、测试系统、嵌入式、智能装备',
    notFor: '临近考研才开始补编程和电控基础的人',
  },
]

export const graduateSchoolSignals: GraduateSchoolSignal[] = [
  {
    name: '北京理工大学',
    position: '兵器方向公开入口多，竞争也不小',
    signal: '成绩、数学和科研基础较好时，可以考虑冲层次更高的学校或院所。',
    check: '重点看学院专业目录、实际统考名额、复试线、拟录取名单和导师方向。',
    url: 'https://grd.bit.edu.cn/zsgz/ssyjs/index.htm',
  },
  {
    name: '南京理工大学',
    position: '兵器、弹药、发射、毁伤等方向特色明显',
    signal: '想继续沿本专业相关方向深造，重点筛课题组方向。',
    check: '南理工研究生院已发布 2026 硕士招生章程与招生目录入口，报考时要逐项核对考试科目和招生计划。',
    url: 'https://gs.njust.edu.cn/zsw/6b/27/c4587a355111/page.htm',
  },
  {
    name: '中北大学',
    position: '兵器、仪器、机械、安全等方向都有相关入口',
    signal: '兵器相关方向值得看，同时也能保留机械、测试、安全等备选。',
    check: '中北大学研究生院已发布 2026 硕士研究生招生目录，适合按学院和专业代码细查方向。',
    url: 'https://grs.nuc.edu.cn/info/1015/8485.htm',
  },
  {
    name: '中国工程物理研究院',
    position: '科研院所属性强，方向和要求更偏研究能力',
    signal: '适合基础扎实、目标科研、能接受院所培养方式和地区要求的学生。',
    check: '中物院 2026 招生专业目录中可查到 082600 兵器科学与技术等相关专业入口。',
    url: 'https://zsxx.gscaep.ac.cn/master/1970',
  },
]

export const graduateTimeline: GraduateTimelineStage[] = [
  {
    time: '大一',
    title: '夯实公共基础',
    focus: '数学、物理、程序设计、工程图和大学学习节奏。',
    actions: ['把高数、线代、大学物理尽量学扎实。', '用一门编程语言做基础数据处理，不要只停留在过课。'],
  },
  {
    time: '大二',
    title: '开始识别自己更像哪类工科生',
    focus: '力学、机械、电工电子、材料和基础实验开始拉开差距。',
    actions: ['如果喜欢推导和仿真，重点关注力学、兵器和计算方向。', '如果喜欢结构、工艺和图纸，重点关注机械和装备方向。', '如果喜欢规范、风险和现场问题，顺手了解安全工程。'],
  },
  {
    time: '大三上',
    title: '确定 2-3 个候选方向',
    focus: '开始查研招网、学校研究生院、学院官网、复试办法和拟录取名单。',
    actions: ['每个方向至少选 3 所学校做对照，不要只看一个目标。', '把考试科目、招生人数、复试科目、导师方向放进同一张表。'],
  },
  {
    time: '大三下',
    title: '收敛到目标院校和专业课',
    focus: '根据初试科目、复试风险、地区接受度和未来去向做取舍。',
    actions: ['确定主目标、稳妥目标和保底/调剂备选。', '专业课不要频繁换，换方向的代价通常比想象中高。'],
  },
  {
    time: '大四',
    title: '初试、复试和备选一起推进',
    focus: '初试只是第一关，复试会看本科课程、项目、毕业设计和表达能力。',
    actions: ['提前准备项目介绍、成绩单解释、毕业设计方向和读研计划。', '关注调剂政策、单位招聘和毕业去向，不要把所有判断押在一个结果上。'],
  },
]

export const graduateSourceLinks: GraduateSourceLink[] = [
  {
    title: '教育部：2026 年全国硕士研究生招生工作管理规定',
    meta: '核对初试、复试、调剂、录取和招生单位职责',
    url: 'https://yz.chsi.com.cn/kyzx/jybzc/202509/20250925/2293432170-11.html',
  },
  {
    title: '教育部：研究生教育学科专业目录（2022 年）',
    meta: '核对学科门类、一级学科和专业学位类别',
    url: 'https://www.moe.gov.cn/srcsite/A22/moe_833/202209/t20220914_660828.html',
  },
  {
    title: '中国研究生招生信息网：硕士专业目录',
    meta: '按地区、学校、学科和专业检索当年招生专业',
    url: 'https://yz.chsi.com.cn/zsml/',
  },
  {
    title: '南京理工大学：2026 年硕士招生章程与目录',
    meta: '院校招生目录入口之一',
    url: 'https://gs.njust.edu.cn/zsw/6b/27/c4587a355111/page.htm',
  },
  {
    title: '中北大学：2026 年硕士研究生招生目录',
    meta: '院校招生目录入口之一',
    url: 'https://grs.nuc.edu.cn/info/1015/8485.htm',
  },
  {
    title: '中国工程物理研究院：2026 年硕士招生专业目录',
    meta: '科研院所招生目录入口之一',
    url: 'https://zsxx.gscaep.ac.cn/master/1970',
  },
]

export function graduateLevelStyle(level: GraduateDirectionLevel) {
  if (level === '顺接') {
    return {
      backgroundColor: 'var(--status-positive-soft)',
      borderColor: 'var(--status-positive-border)',
      color: 'var(--status-positive)',
    }
  }

  if (level === '半跨') {
    return {
      backgroundColor: 'var(--status-warning-soft)',
      borderColor: 'var(--status-warning-border)',
      color: 'var(--status-warning)',
    }
  }

  return {
    backgroundColor: 'var(--status-risk-soft)',
    borderColor: 'var(--status-risk-border)',
    color: 'var(--status-risk)',
  }
}
