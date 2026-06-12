export type UniversityTier = '985 / 211' | '211' | '普通本科'

export type VerificationStatus = '已核验' | '部分核验' | '过期待复查'

export type RelevanceLevel = '高' | '中' | '低' | '待核对'

export type UniversityLink = {
  title: string
  type:
    | '学校官网'
    | '招生网'
    | '学院官网'
    | '招生目录'
    | '就业报告'
    | '教学质量报告'
    | '研究生招生'
    | '新闻资料'
    | '其他'
  url: string
  note?: string
}

export type UniversityResearchSource = {
  title: string
  type: string
  date: string
  url: string
}

export type UniversityResearchTrace = {
  round: number
  queries: string[]
  usefulFindings: string[]
  gaps: string[]
}

export type UniversityVerification = {
  status: VerificationStatus
  relevanceLevel: RelevanceLevel
  updatedAt: string
  summary: string
  verifiedFields: string[]
  pendingFields: string[]
}

export type UniversityResearch = {
  updatedAt: string
  status: string
  relevanceLevel: Exclude<RelevanceLevel, '待核对'>
  conclusion: string
  keySignals: string[]
  suitableFor: string[]
  risks: string[]
  sources: UniversityResearchSource[]
  searchTrace?: UniversityResearchTrace[]
}

export type University = {
  id: string
  name: string
  shortName: string
  city: string
  province: string
  tier: UniversityTier
  logo: string
  officialUrl: string
  majorUrl?: string
  focus: string
  tags: string[]
  overview: string
  suitableFor: string[]
  reminders: string[]
  links: UniversityLink[]
  verification: UniversityVerification
  research?: UniversityResearch
}

export const universities: University[] = [
  {
    id: 'bit',
    name: '北京理工大学',
    shortName: '北理工',
    city: '北京',
    province: '北京',
    tier: '985 / 211',
    logo: '/logos/schools/北京理工大学.png',
    officialUrl: 'https://www.bit.edu.cn',
    majorUrl: 'https://smen.bit.edu.cn/xygk/xkzy/index.htm',
    focus: '兵器科学与技术、智能无人系统、装备总体等方向有相关线索。',
    tags: ['985', '北京', '兵器方向', '科研平台'],
    overview: '北京理工大学国防特色明显，适合关注兵器科学、装备技术、智能系统和继续深造的学生。',
    suitableFor: ['目标较高，关注办学层次和国防特色院校的学生。', '关注科研、竞赛、升学和军工体系发展的学生。'],
    reminders: ['报考热度通常较高，需要结合招生计划和近年录取位次判断。', '具体专业名称和培养方向以当年招生目录为准。'],
    links: [
      {
        title: '北京理工大学官网',
        type: '学校官网',
        url: 'https://www.bit.edu.cn',
        note: '学校基础信息、信息公开和院系导航入口。',
      },
      {
        title: '北京理工大学本科招生网',
        type: '招生网',
        url: 'https://admission.bit.edu.cn',
        note: '查招生章程、招生计划、专业介绍和录取查询的主入口。',
      },
      {
        title: '机电学院学科专业',
        type: '学院官网',
        url: 'https://smen.bit.edu.cn/xygk/xkzy/index.htm',
        note: '重点核对兵器科学与技术、安全科学与工程、智能无人系统等方向。',
      },
      {
        title: '本科招生计划说明',
        type: '招生目录',
        url: 'https://xxgk.bit.edu.cn/zsksxx/lqxxyfsxcx/qrzptbks2/a191207.htm',
        note: '信息公开网说明分省招生计划在本科招生网公布。',
      },
      {
        title: '北京理工大学就业资讯网',
        type: '其他',
        url: 'https://career.bit.edu.cn',
        note: '可追踪校招公告、实习信息、宣讲会和重点单位线索。',
      },
      {
        title: '本科教学质量报告',
        type: '教学质量报告',
        url: 'https://xxgk.bit.edu.cn/docs/2024-12/cbdbc5da18604d5496444fa909061351.pdf',
        note: '用于核对本科专业、培养数据和教学质量公开信息。',
      },
    ],
    verification: {
      status: '部分核验',
      relevanceLevel: '高',
      updatedAt: '2026-06-08',
      summary: '已补充官网、本科招生网、机电学院学科专业、本科培养方案、就业资讯网和教学质量报告入口；分省计划、录取位次和就业质量仍需逐年复查。',
      verifiedFields: ['学校名称、城市、层次和官网入口', '本科招生网、机电学院学科专业和就业资讯网入口', '本科培养方案公开入口', '兵器科学与技术、安全科学与工程等相关方向线索'],
      pendingFields: ['当年分省招生专业名称与计划', '近年录取分数线和位次', '年度就业质量报告和具体去向'],
    },
    research: {
      updatedAt: '2026-06-08',
      status: '已补充官方入口，仍需按年度复查招生和就业数据。',
      relevanceLevel: '高',
      conclusion: '北京理工大学办学层次高，机电学院公开页面显示兵器科学与技术、安全科学与工程等方向线索，适合关注兵器、装备和智能系统方向的学生。报考时仍要按当年本科招生网核对大类、专业、省份计划和录取位次。',
      keySignals: [
        '机电学院学科专业页面显示兵器科学与技术、安全科学与工程等相关学科线索。',
        '教务部公开的本科培养方案可作为核对专业培养要求的补充入口。',
        '本科招生网是招生章程、专业介绍、招生计划和录取查询的主入口。',
        '就业资讯网可用于追踪校招公告、实习信息、宣讲会和重点单位。',
      ],
      suitableFor: ['成绩目标较高，关注办学层次和国防特色院校的学生。', '关注兵器、智能无人系统、安全防控、装备总体等方向的学生。'],
      risks: ['招生专业可能以大类呈现，必须结合当年省份计划确认具体专业。', '录取位次、分数线和就业去向需要使用当年官方数据复核。', '国防特色不等于所有学院和专业都直接对口弹药方向。'],
      sources: [
        {
          title: '北京理工大学官网',
          type: '学校官网',
          date: '2026-06-06访问',
          url: 'https://www.bit.edu.cn',
        },
        {
          title: '北京理工大学本科招生网',
          type: '招生网',
          date: '2026-06-06访问',
          url: 'https://admission.bit.edu.cn',
        },
        {
          title: '北京理工大学机电学院学科专业',
          type: '学院官网',
          date: '2026-06-06访问',
          url: 'https://smen.bit.edu.cn/xygk/xkzy/index.htm',
        },
        {
          title: '北京理工大学就业资讯网',
          type: '其他',
          date: '2026-06-06访问',
          url: 'https://career.bit.edu.cn',
        },
        {
          title: '北京理工大学本科教学质量报告',
          type: '教学质量报告',
          date: '2023-2024学年',
          url: 'https://xxgk.bit.edu.cn/docs/2024-12/cbdbc5da18604d5496444fa909061351.pdf',
        },
        {
          title: '北京理工大学2024版本科培养方案：弹药工程与爆炸技术',
          type: '其他',
          date: '2026-03发布',
          url: 'https://jwb.bit.edu.cn/docs/2026-03/2024%E7%89%88%E5%BC%B9%E8%8D%AF%E5%B7%A5%E7%A8%8B%E4%B8%8E%E7%88%86%E7%82%B8%E6%8A%80%E6%9C%AF.pdf',
        },
      ],
    },
  },
    {
    "id": "njust",
    "name": "南京理工大学",
    "shortName": "南理工",
    "city": "南京",
    "province": "江苏",
    "tier": "211",
    "logo": "/logos/schools/南京理工大学.png",
    "officialUrl": "https://www.njust.edu.cn/",
    "majorUrl": "https://zsb.njust.edu.cn/detail?id=452",
    "focus": "兵器、弹药、爆炸相关方向有官方专业入口。",
    "tags": [
      "211",
      "双一流",
      "南京",
      "兵器相关",
      "弹药工程"
    ],
    "overview": "南京理工大学位于南京，招生网有弹药工程与爆炸技术专业介绍。",
    "suitableFor": [
      "关注兵器、弹药、爆炸技术相关本科专业的学生。",
      "希望通过官方招生网核对专业介绍和分省计划的学生。"
    ],
    "reminders": [
      "弹药工程与爆炸技术专业介绍页面较早，报考前需核对当年招生计划。",
      "分省计划、专业组、录取分数和选科要求要以当年招生网及省招办公布为准。",
      "就业去向和升学数据需回到学校官方就业质量报告逐项复核。"
    ],
    "links": [
      {
        "title": "南京理工大学官网",
        "type": "学校官网",
        "url": "https://www.njust.edu.cn/",
        "note": "学校主入口。"
      },
      {
        "title": "南京理工大学本科招生网",
        "type": "招生网",
        "url": "https://zsb.njust.edu.cn/",
        "note": "招生章程、招生计划、专业介绍和录取查询入口。"
      },
      {
        "title": "南京理工大学2026年招生章程",
        "type": "招生目录",
        "url": "https://zsb.njust.edu.cn/detail?id=1349",
        "note": "当年招生规则入口，分省分专业计划仍需按省份核对。"
      },
      {
        "title": "兵器类（弹药工程与爆炸技术）专业介绍",
        "type": "招生网",
        "url": "https://zsb.njust.edu.cn/detail?id=452",
        "note": "本科招生网专业介绍，页面时间为 2018-05-28。"
      },
      {
        "title": "南京理工大学机械工程学院官网",
        "type": "学院官网",
        "url": "https://sme.njust.edu.cn/",
        "note": "学院入口，用于继续核对专业和培养信息。"
      },
      {
        "title": "南京理工大学2023年毕业生就业质量报告入口",
        "type": "就业报告",
        "url": "https://xxgk.njust.edu.cn/2c/5a/c14493a339034/page.htm",
        "note": "学校公开信息入口，具体就业结论需逐项核对报告内容。"
      }
    ],
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-06-07",
      "summary": "已核对学校官网、本科招生网、2026招生章程和弹药工程与爆炸技术专业介绍；分省计划、录取数据和就业去向仍需逐年复查。",
      "verifiedFields": [
        "学校全称、城市、省份、官网和本科招生网入口",
        "2026年招生章程公开入口",
        "本科招生网存在兵器类（弹药工程与爆炸技术）专业介绍",
        "专业介绍中列出主干学科、学制、学位和核心课程等信息"
      ],
      "pendingFields": [
        "2026年分省分专业招生计划、专业组和选科要求",
        "近年录取分数线和位次",
        "就业质量报告中的就业率、行业去向和升学数据",
        "专业介绍页面较早，需复核最新培养方案和专业名称口径"
      ]
    },
    "research": {
      "updatedAt": "2026-06-07",
      "status": "已核对官网、本科招生网、2026招生章程和专业介绍；招生计划、录取与就业数据仍需按最新官方入口复查。",
      "relevanceLevel": "高",
      "conclusion": "南京理工大学本科招生网有兵器类（弹药工程与爆炸技术）专业介绍，2026年招生章程也已发布，专业方向与弹药、爆炸技术和兵器科学相关。报考时仍需按省份核对当年招生计划、专业组、录取分数和就业报告。",
      "keySignals": [
        "本科招生网专业介绍页面明确列出兵器类（弹药工程与爆炸技术）。",
        "专业介绍中提到主干学科为兵器科学与技术，标准学制四年，授予工学学士。",
        "2026年招生章程说明学校隶属于工业和信息化部，并列出招生计划以省级招生机构公布为准。",
        "本科招生网首页提供招生计划、招生章程、专业介绍和录取分数等入口。",
        "就业报告入口可作为后续核对就业率和去向的来源，但本草稿不直接写就业强结论。"
      ],
      "suitableFor": [
        "关注弹药工程与爆炸技术本科专业入口的学生。",
        "需要对比兵器、机械、力学、爆炸技术相关培养方向的学生。",
        "愿意按省份逐项核对招生计划和录取数据的报考学生。"
      ],
      "risks": [
        "专业介绍页面发布时间较早，最新培养方案、专业组和招生口径需复核。",
        "2026分省分专业计划、选科要求和录取分数不能从总章程直接判断。",
        "就业报告没有逐项复核前，不应写成具体就业率或行业去向结论。",
        "研究生招生目录只能作为升学方向线索，不能替代本科招生专业证据。"
      ],
      "sources": [
        {
          "title": "南京理工大学官网",
          "type": "学校官网",
          "date": "2026-06-07",
          "url": "https://www.njust.edu.cn/"
        },
        {
          "title": "南京理工大学本科招生网",
          "type": "招生网",
          "date": "2026-06-07",
          "url": "https://zsb.njust.edu.cn/"
        },
        {
          "title": "南京理工大学2026年招生章程",
          "type": "招生目录",
          "date": "2026-06-05",
          "url": "https://zsb.njust.edu.cn/detail?id=1349"
        },
        {
          "title": "兵器类（弹药工程与爆炸技术）专业介绍",
          "type": "招生网",
          "date": "2018-05-28",
          "url": "https://zsb.njust.edu.cn/detail?id=452"
        },
        {
          "title": "南京理工大学机械工程学院官网",
          "type": "学院官网",
          "date": "待核对",
          "url": "https://sme.njust.edu.cn/"
        },
        {
          "title": "南京理工大学2023年毕业生就业质量报告入口",
          "type": "就业报告",
          "date": "2024",
          "url": "https://xxgk.njust.edu.cn/2c/5a/c14493a339034/page.htm"
        }
      ],
      "searchTrace": [
        {
          "round": 1,
          "queries": [
            "南京理工大学 弹药工程与爆炸技术 本科招生网",
            "南京理工大学 2026 招生章程"
          ],
          "usefulFindings": [
            "本科招生网存在兵器类（弹药工程与爆炸技术）专业介绍。",
            "本科招生网已发布 2026 年招生章程。"
          ],
          "gaps": [
            "仍需按省份核对 2026 分省分专业招生计划、专业组和录取数据。"
          ]
        },
        {
          "round": 2,
          "queries": [
            "南京理工大学 就业质量报告",
            "南京理工大学 机械工程学院"
          ],
          "usefulFindings": [
            "找到学校公开信息中的 2023 年就业质量报告入口。",
            "找到机械工程学院官网入口。"
          ],
          "gaps": [
            "就业报告内容未逐项抽取，暂不写就业率、行业去向或升学率强结论。"
          ]
        }
      ]
    }
  },
  {
    id: 'nuc',
    name: '中北大学',
    shortName: '中北大学',
    city: '太原',
    province: '山西',
    tier: '普通本科',
    logo: '/logos/schools/中北大学.png',
    officialUrl: 'https://www.nuc.edu.cn',
    majorUrl: 'https://jdgc.nuc.edu.cn/',
    focus: '兵器、弹药、测试与工程应用方向具有行业辨识度。',
    tags: ['太原', '兵工特色', '工程应用', '方向相关'],
    overview: '中北大学具有兵工特色，适合关注工程应用、军工相关就业和专业方向匹配的学生。',
    suitableFor: ['希望选择专业特色明确院校的学生。', '更看重专业方向和就业方向关联的学生。'],
    reminders: ['需要关注具体专业批次、招生省份和就业地域。', '岗位质量与个人能力、学历层次和实习经历关系很大。'],
    links: [
      {
        title: '中北大学官网',
        type: '学校官网',
        url: 'https://www.nuc.edu.cn',
      },
      {
        title: '中北大学本科招生信息网',
        type: '招生网',
        url: 'https://zbzs.nuc.edu.cn/',
        note: '招生章程、招生计划、专业介绍和历年录取入口。',
      },
      {
        title: '中北大学本科招生专业介绍',
        type: '招生网',
        url: 'https://zbzs.nuc.edu.cn/bkzn/zyjs.htm',
        note: '招生网专业介绍入口，需按当年招生口径复查。',
      },
      {
        title: '中北大学招生计划',
        type: '招生目录',
        url: 'https://zbzs.nuc.edu.cn/index/zsjh.htm',
        note: '分省分专业计划入口，具体年份和省份需逐项核对。',
      },
      {
        title: '中北大学机电工程学院',
        type: '学院官网',
        url: 'https://jdgc.nuc.edu.cn/',
        note: '兵器类、航空航天类相关学院入口。',
      },
      {
        title: '中北大学招生与就业工作处',
        type: '其他',
        url: 'https://zsjyc.nuc.edu.cn/',
        note: '招生就业管理入口，继续核对就业材料。',
      },
    ],
    verification: {
      status: '部分核验',
      relevanceLevel: '高',
      updatedAt: '2026-06-08',
      summary: '已补充官网、本科招生网、专业介绍、招生计划和机电工程学院入口；录取、就业和最新培养方案仍需逐年核对。',
      verifiedFields: [
        '学校名称、城市和官网入口',
        '本科招生信息网、招生计划和专业介绍入口',
        '招生网专业介绍中出现兵器类及弹药工程与爆炸技术线索',
        '机电工程学院入口可继续核对学院和专业资料',
      ],
      pendingFields: [
        '当年招生省份、批次和专业组',
        '具体专业培养方案和专业分流规则',
        '近年录取分数线、位次和招生人数',
        '就业去向、升学数据和行业分布',
      ],
    },
    research: {
      updatedAt: '2026-06-08',
      status: '官方入口已补齐，招生和就业数据仍需逐年复查。',
      relevanceLevel: '高',
      conclusion:
        '中北大学本科招生网专业介绍中列出兵器类，并包含弹药工程与爆炸技术等专业线索，专业相关性较明确。报考时仍要按当年招生计划核对省份、批次、专业组、录取位次和就业材料。',
      keySignals: [
        '本科招生信息网提供招生章程、招生计划、专业介绍和历年录取入口。',
        '专业介绍页面显示机电工程学院对应兵器类、航空航天类。',
        '招生网列出的兵器类包含弹药工程与爆炸技术等专业线索。',
        '机电工程学院官网提供学科专业、教学工作和就业资讯入口。',
      ],
      suitableFor: [
        '关注兵器类、弹药工程与爆炸技术和工程应用方向的学生。',
        '愿意按省份逐项核对招生计划、录取位次和专业分流规则的学生。',
      ],
      risks: [
        '2022 年报考指南不能直接代表当前所有省份招生口径。',
        '录取分数线、招生人数和专业组需回到当年招生计划核对。',
        '就业率和就业去向未逐项核验前不写成确定结论。',
      ],
      sources: [
        {
          title: '中北大学官网',
          type: '学校官网',
          date: '2026-06-08访问',
          url: 'https://www.nuc.edu.cn',
        },
        {
          title: '中北大学本科招生信息网',
          type: '招生网',
          date: '2026-06-08访问',
          url: 'https://zbzs.nuc.edu.cn/',
        },
        {
          title: '中北大学本科招生专业介绍',
          type: '招生网',
          date: '2026-06-08访问',
          url: 'https://zbzs.nuc.edu.cn/bkzn/zyjs.htm',
        },
        {
          title: '中北大学招生计划',
          type: '招生目录',
          date: '2026-06-08访问',
          url: 'https://zbzs.nuc.edu.cn/index/zsjh.htm',
        },
        {
          title: '中北大学招生章程',
          type: '招生目录',
          date: '2026-06-08访问',
          url: 'https://zbzs.nuc.edu.cn/bkzn/zszc.htm',
        },
        {
          title: '中北大学机电工程学院',
          type: '学院官网',
          date: '2026-06-08访问',
          url: 'https://jdgc.nuc.edu.cn/',
        },
      ],
    },
  },
  {
    id: 'syit',
    name: '沈阳理工大学',
    shortName: '沈理工',
    city: '沈阳',
    province: '辽宁',
    tier: '普通本科',
    logo: '/logos/schools/沈阳理工大学.png',
    officialUrl: 'https://www.sylu.edu.cn',
    majorUrl: 'https://zbgcxy.sylu.edu.cn/jxjy/zyjs.htm',
    focus: '装备制造、兵器相关工程方向和东北区域资源有一定基础。',
    tags: ['沈阳', '装备制造', '兵器相关', '东北'],
    overview: '沈阳理工大学适合关注装备制造、兵器相关工程岗位和东北地区就业资源的学生。',
    suitableFor: ['能接受偏工程应用和制造场景的学生。', '考虑东北地区院校和就业资源的学生。'],
    reminders: ['建议对比同层次院校的专业方向、实习资源和就业地域。', '具体专业出口需要结合学院公布信息和招聘情况判断。'],
    links: [
      {
        title: '沈阳理工大学官网',
        type: '学校官网',
        url: 'https://www.sylu.edu.cn',
      },
      {
        title: '沈阳理工大学本科招生网',
        type: '招生网',
        url: 'https://zs.sylu.edu.cn/',
        note: '招生章程、招生计划、学院专业和录取信息入口。',
      },
      {
        title: '沈阳理工大学招生计划',
        type: '招生目录',
        url: 'https://zs.sylu.edu.cn/index/zsjh.htm',
        note: '分省分专业计划入口，具体年份、省份和专业组需逐项核对。',
      },
      {
        title: '沈阳理工大学学院专业',
        type: '招生网',
        url: 'https://zs.sylu.edu.cn/index/xyzy.htm',
        note: '本科招生网学院专业入口，可继续打开装备工程学院介绍。',
      },
      {
        title: '沈阳理工大学装备工程学院及专业介绍',
        type: '学院官网',
        url: 'https://zs.sylu.edu.cn/info/1126/1774.htm',
        note: '本科招生网中的装备工程学院及专业介绍页面。',
      },
      {
        title: '沈阳理工大学装备工程学院',
        type: '学院官网',
        url: 'https://zbgcxy.sylu.edu.cn/',
        note: '学院官网入口。',
      },
      {
        title: '沈阳理工大学装备工程学院专业介绍',
        type: '学院官网',
        url: 'https://zbgcxy.sylu.edu.cn/jxjy/zyjs.htm',
        note: '学院专业介绍入口，需按当年本科招生口径复查。',
      },
    ],
    verification: {
      status: '部分核验',
      relevanceLevel: '高',
      updatedAt: '2026-06-08',
      summary: '已补充学校官网、本科招生网、招生计划、学院专业和装备工程学院专业介绍入口；录取和就业仍需逐年核对。',
      verifiedFields: [
        '学校名称、城市和官网入口',
        '本科招生网、招生计划和学院专业入口',
        '装备工程学院专业介绍中出现弹药工程与爆炸技术等兵器类专业线索',
        '装备工程学院官网可继续核对学院和专业资料',
      ],
      pendingFields: [
        '当年招生省份、批次和专业组',
        '具体专业培养方案和专业调整情况',
        '近年录取分数线、位次和招生人数',
        '就业去向、升学数据和行业分布',
      ],
    },
    research: {
      updatedAt: '2026-06-08',
      status: '官方招生和学院入口已补齐，录取和就业数据仍需逐年复查。',
      relevanceLevel: '高',
      conclusion:
        '沈阳理工大学本科招生网和装备工程学院专业介绍中可核到弹药工程与爆炸技术、探测制导与控制技术、特种能源技术与工程等兵器类专业线索，专业相关性较明确。报考仍要按当年招生计划核对省份、批次、录取位次和就业材料。',
      keySignals: [
        '本科招生网提供招生章程、招生计划、学院专业和录取信息入口。',
        '本科招生网学院专业页面列出装备工程学院及专业介绍。',
        '装备工程学院专业介绍页面列出弹药工程与爆炸技术等专业线索。',
        '学院官网提供专业介绍、培养计划和就业工作等继续核对入口。',
      ],
      suitableFor: [
        '关注弹药工程与爆炸技术、兵器类和装备工程应用方向的学生。',
        '愿意逐项核对东北地区招生计划、录取位次和就业出口的学生。',
      ],
      risks: [
        '招生计划、录取分数线和招生人数需按当年省份逐项核对。',
        '学院专业介绍不能直接替代当年本科招生计划。',
        '就业率、就业去向和升学数据未逐项核验前不写成确定结论。',
      ],
      sources: [
        {
          title: '沈阳理工大学官网',
          type: '学校官网',
          date: '2026-06-08访问',
          url: 'https://www.sylu.edu.cn',
        },
        {
          title: '沈阳理工大学本科招生网',
          type: '招生网',
          date: '2026-06-08访问',
          url: 'https://zs.sylu.edu.cn/',
        },
        {
          title: '沈阳理工大学招生计划',
          type: '招生目录',
          date: '2026-06-08访问',
          url: 'https://zs.sylu.edu.cn/index/zsjh.htm',
        },
        {
          title: '沈阳理工大学学院专业',
          type: '招生网',
          date: '2026-06-08访问',
          url: 'https://zs.sylu.edu.cn/index/xyzy.htm',
        },
        {
          title: '沈阳理工大学装备工程学院及专业介绍',
          type: '学院官网',
          date: '2026-06-08访问',
          url: 'https://zs.sylu.edu.cn/info/1126/1774.htm',
        },
        {
          title: '沈阳理工大学装备工程学院专业介绍',
          type: '学院官网',
          date: '2026-06-08访问',
          url: 'https://zbgcxy.sylu.edu.cn/jxjy/zyjs.htm',
        },
      ],
    },
  },
  {
    id: 'xatu',
    name: '西安工业大学',
    shortName: '西安工大',
    city: '西安',
    province: '陕西',
    tier: '普通本科',
    logo: '/logos/schools/西安工业大学.png',
    officialUrl: 'https://www.xatu.edu.cn',
    majorUrl: 'https://bqxy.xatu.edu.cn/bkpy/zyjs.htm',
    focus: '兵工、光电、装备制造和西安军工产业资源相关。',
    tags: ['西安', '兵工背景', '装备制造', '区域资源'],
    overview: '西安工业大学适合关注西安区域军工资源、装备制造和工程技术岗位的学生。',
    suitableFor: ['希望留在西安或西北地区发展的学生。', '关注工程技术、制造和军工相关单位的学生。'],
    reminders: ['建议结合西安区域企业、研究所和校招情况一起判断。', '不同岗位对学历、方向和工程能力要求差异明显。'],
    links: [
      {
        title: '西安工业大学官网',
        type: '学校官网',
        url: 'https://www.xatu.edu.cn',
      },
      {
        title: '西安工业大学本科招生网',
        type: '招生网',
        url: 'https://zsb.xatu.edu.cn/index.htm',
        note: '招生章程、招生计划、录取查询和专业介绍入口。',
      },
      {
        title: '西安工业大学招生计划与录取查询',
        type: '招生目录',
        url: 'http://zsdata.xatu.edu.cn/zsdata/lqxx/#/',
        note: '招生计划和历年录取入口，具体年份和省份需逐项核对。',
      },
      {
        title: '西安工业大学本科专业介绍',
        type: '招生网',
        url: 'https://zsb.xatu.edu.cn/xkzy.htm',
        note: '本科招生网专业介绍入口。',
      },
      {
        title: '西安工业大学兵器科学与技术学院',
        type: '学院官网',
        url: 'https://bqxy.xatu.edu.cn/xygk/xyjj.htm',
        note: '兵器科学与技术学院简介入口。',
      },
      {
        title: '西安工业大学兵器科学与技术学院专业介绍',
        type: '学院官网',
        url: 'https://bqxy.xatu.edu.cn/bkpy/zyjs.htm',
        note: '学院本科专业介绍入口，需按当年招生计划复查。',
      },
    ],
    verification: {
      status: '部分核验',
      relevanceLevel: '中',
      updatedAt: '2026-06-08',
      summary: '已补充学校官网、本科招生网、招生计划、专业介绍和兵器科学与技术学院入口；弹药方向匹配和就业仍需复查。',
      verifiedFields: [
        '学校名称、城市和官网入口',
        '本科招生网、招生计划和本科专业介绍入口',
        '本科专业介绍中出现兵器科学与技术学院及相关专业线索',
        '兵器科学与技术学院官网可继续核对专业和学院资料',
      ],
      pendingFields: [
        '当年招生省份、批次和专业组',
        '弹药工程方向的直接匹配程度',
        '近年录取分数线、位次和招生人数',
        '就业去向、升学数据和行业分布',
      ],
    },
    research: {
      updatedAt: '2026-06-08',
      status: '官方招生和学院入口已补齐，弹药方向匹配、录取和就业仍需复查。',
      relevanceLevel: '中',
      conclusion:
        '西安工业大学本科招生网专业介绍与兵器科学与技术学院页面可核到探测制导与控制技术、武器系统与工程等兵器相关本科专业线索，区域军工和装备制造关联较清楚。弹药方向匹配、招生计划、录取位次和就业去向仍需逐年核对。',
      keySignals: [
        '本科招生网提供招生章程、招生计划、录取查询和专业介绍入口。',
        '本科专业介绍页面列出兵器科学与技术学院及相关本科专业。',
        '兵器科学与技术学院专业介绍列出探测制导与控制技术、武器系统与工程等专业线索。',
        '学院页面可继续核对师资、培养方案、研究生教育和学生工作资料。',
      ],
      suitableFor: [
        '关注兵器相关、装备制造和西安区域产业资源的学生。',
        '能接受先核对专业匹配度，再判断是否报考的学生。',
      ],
      risks: [
        '弹药工程与爆炸技术的直接本科专业匹配程度需继续核对。',
        '招生计划、录取分数线和招生人数需按当年省份逐项核对。',
        '就业率、就业去向和升学数据未逐项核验前不写成确定结论。',
      ],
      sources: [
        {
          title: '西安工业大学官网',
          type: '学校官网',
          date: '2026-06-08访问',
          url: 'https://www.xatu.edu.cn',
        },
        {
          title: '西安工业大学本科招生网',
          type: '招生网',
          date: '2026-06-08访问',
          url: 'https://zsb.xatu.edu.cn/index.htm',
        },
        {
          title: '西安工业大学招生章程',
          type: '招生目录',
          date: '2026-06-08访问',
          url: 'https://zsb.xatu.edu.cn/bkzn/zszc.htm',
        },
        {
          title: '西安工业大学招生计划与录取查询',
          type: '招生目录',
          date: '2026-06-08访问',
          url: 'http://zsdata.xatu.edu.cn/zsdata/lqxx/#/',
        },
        {
          title: '西安工业大学本科专业介绍',
          type: '招生网',
          date: '2026-06-08访问',
          url: 'https://zsb.xatu.edu.cn/xkzy.htm',
        },
        {
          title: '西安工业大学兵器科学与技术学院专业介绍',
          type: '学院官网',
          date: '2026-06-08访问',
          url: 'https://bqxy.xatu.edu.cn/bkpy/zyjs.htm',
        },
      ],
    },
  },
    {
    "id": "aust",
    "name": "安徽理工大学",
    "shortName": "安理工",
    "city": "淮南",
    "province": "安徽",
    "tier": "普通本科",
    "logo": "/logos/schools/安徽理工大学.png",
    "officialUrl": "https://www.aust.edu.cn",
    "majorUrl": "https://hgxy.aust.edu.cn",
    "focus": "安全工程、弹药工程与爆炸技术等方向相关。",
    "tags": [
      "普通本科",
      "淮南",
      "安全工程",
      "弹药工程",
      "民爆相关"
    ],
    "overview": "安徽理工大学位于淮南，安全工程、弹药工程与爆炸技术等方向和民爆场景关联较高。",
    "suitableFor": [
      "关注安全工程、爆破工程或特种能源材料工程应用的学生。",
      "希望了解民爆、化工安全及应急管理相关去向的学生。"
    ],
    "reminders": [
      "需要区分弹药工程与爆炸技术、安全工程等专业在培养方向和就业场景上的差异。",
      "部分现场类岗位或野外爆破作业对身体素质、性别或工作环境有特定要求，应提前了解。",
      "报考前需通过官方招生网核对各省最新招生专业、分省计划和录取数据。"
    ],
    "links": [
      {
        "title": "安徽理工大学官网",
        "type": "学校官网",
        "url": "https://www.aust.edu.cn",
        "note": "学校主入口，招生、专业和就业信息仍需核对对应官方页面。"
      },
      {
        "title": "安徽理工大学学院 / 专业入口",
        "type": "学院官网",
        "url": "https://hgxy.aust.edu.cn",
        "note": "用于核对专业介绍、学院设置或培养方向。"
      },
      {
        "title": "安徽理工大学本科招生网",
        "type": "招生网",
        "url": "https://zs.aust.edu.cn",
        "note": "招生网 · 2026-06-06"
      },
      {
        "title": "安徽理工大学安全科学与工程学院官网",
        "type": "学院官网",
        "url": "https://aqxy.aust.edu.cn",
        "note": "学院官网 · 2026-06-06"
      },
      {
        "title": "安徽理工大学研究生招生网",
        "type": "研究生招生",
        "url": "https://yjszs.aust.edu.cn",
        "note": "研究生招生 · 2026-06-06"
      },
      {
        "title": "安徽理工大学2023-2024学年本科教学质量报告",
        "type": "教学质量报告",
        "url": "https://jwc.aust.edu.cn/info/1888/8137.htm",
        "note": "教学质量报告 · 2024-12"
      }
    ],
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-06-06",
      "summary": "已核对学校官网、招生网、化工与爆破学院、安全科学与工程学院、研究生招生网和教学质量报告入口；分省计划、录取数据和就业去向仍需逐年复查。",
      "verifiedFields": [
        "学校全称、常用简称、省份城市、办学层次和官网入口",
        "化工与爆破学院、安全科学与工程学院等相关学院入口",
        "本科招生网、研究生招生网和教学质量报告公开入口"
      ],
      "pendingFields": [
        "当年分省招生专业、招生计划和录取分数线",
        "就业质量报告官方原始入口、就业率和具体就业去向",
        "不同专业在民爆、特能、安全和应急方向上的培养差异"
      ]
    },
    "research": {
      "updatedAt": "2026-06-06",
      "status": "已核对官网、招生网和学院入口，招生计划、录取与就业去向仍需逐年复查。",
      "relevanceLevel": "高",
      "conclusion": "安徽理工大学在安全工程、弹药工程与爆炸技术等方向有辨识度，适合关注民爆、应急安全和工程应用的学生。报考时应以本科招生网核对分省计划、专业名称和录取数据；就业数据需以学校官方最新报告为准。",
      "keySignals": [
        "化工与爆破学院入口可用于核对弹药工程与爆炸技术、特种能源技术与工程等相关专业信息。",
        "安全科学与工程学院入口可用于核对安全工程、消防工程等相关专业信息。",
        "本科招生网是招生章程、招生计划、专业介绍和录取信息的主要核对入口。",
        "教学与就业数据需要回到学校官方原始页面或官方报告复核。"
      ],
      "suitableFor": [
        "关注民用爆破、弹药工程、特种能源材料等特种行业方向的学生。",
        "倾向于学习安全工程、现场施工安全管理或消防应急安全管理的学生。"
      ],
      "risks": [
        "部分爆破和现场安全岗位工作环境较艰苦，报考前需充分了解专业培养与就业场景。",
        "分省招生计划及各省录取分数差异大，需通过本科招生网按省份、年份复核。",
        "就业率、就业去向和升学数据未取得学校官方原始报告时，不应写成确定结论。"
      ],
      "sources": [
        {
          "title": "安徽理工大学官网",
          "type": "学校官网",
          "date": "2026-06-06",
          "url": "https://www.aust.edu.cn"
        },
        {
          "title": "安徽理工大学本科招生网",
          "type": "招生网",
          "date": "2026-06-06",
          "url": "https://zs.aust.edu.cn"
        },
        {
          "title": "安徽理工大学化工与爆破学院官网",
          "type": "学院官网",
          "date": "2026-06-06",
          "url": "https://hgxy.aust.edu.cn"
        },
        {
          "title": "安徽理工大学安全科学与工程学院官网",
          "type": "学院官网",
          "date": "2026-06-06",
          "url": "https://aqxy.aust.edu.cn"
        },
        {
          "title": "安徽理工大学研究生招生网",
          "type": "研究生招生",
          "date": "2026-06-06",
          "url": "https://yjszs.aust.edu.cn"
        },
        {
          "title": "安徽理工大学2023-2024学年本科教学质量报告",
          "type": "教学质量报告",
          "date": "2024-12",
          "url": "https://jwc.aust.edu.cn/info/1888/8137.htm"
        }
      ],
      "searchTrace": [
        {
          "round": 1,
          "queries": [
            "安徽理工大学 安全科学与工程学院 官网",
            "安徽理工大学 化工与爆破学院 官网"
          ],
          "usefulFindings": [
            "安全科学与工程学院官网为 aqxy.aust.edu.cn。",
            "化工与爆破学院相关入口为 hgxy.aust.edu.cn。"
          ],
          "gaps": [
            "证据包中曾出现 ahut.edu.cn 域名混淆，需排除安徽工业大学页面。"
          ]
        },
        {
          "round": 2,
          "queries": [
            "安徽理工大学 本科招生网",
            "安徽理工大学 本科教学质量报告"
          ],
          "usefulFindings": [
            "本科招生网为 zs.aust.edu.cn。",
            "研究生招生网为 yjszs.aust.edu.cn。",
            "找到学校教务处发布的 2023-2024 学年本科教学质量报告入口。"
          ],
          "gaps": [
            "仍需补学校官网原始就业质量报告入口，第三方镜像 PDF 不作为强结论来源。"
          ]
        }
      ]
    }
  },
  {
    "id": "hrbeu",
    "name": "哈尔滨工程大学",
    "shortName": "哈工程",
    "city": "哈尔滨",
    "province": "黑龙江",
    "tier": "211",
    "logo": "/logos/schools/哈尔滨工程大学.png",
    "officialUrl": "https://www.hrbeu.edu.cn/",
    "majorUrl": "https://zsb.hrbeu.edu.cn/",
    "focus": "船海、核、航天等国防装备方向相关。",
    "tags": [
      "211",
      "双一流",
      "哈尔滨",
      "国防特色",
      "装备方向"
    ],
    "overview": "哈尔滨工程大学位于哈尔滨，国防装备、船海、核和航天方向线索较多。",
    "suitableFor": [
      "关注国防装备、船海工程、核安全或航天工程方向的学生。",
      "希望通过招生网逐项核对专业大类和学院入口的学生。"
    ],
    "reminders": [
      "未把弹药工程与爆炸技术写成本科招生事实，需以当年招生计划为准。",
      "国防特色不等于所有专业都对口弹药或爆炸方向。",
      "分省计划、选科要求、录取分数和就业去向需逐年复查。"
    ],
    "links": [
      {
        "title": "哈尔滨工程大学官网",
        "type": "学校官网",
        "url": "https://www.hrbeu.edu.cn/",
        "note": "学校主入口，用于核对学校身份和院系导航。"
      },
      {
        "title": "哈尔滨工程大学本科招生网",
        "type": "招生网",
        "url": "https://zsb.hrbeu.edu.cn/",
        "note": "招生章程、招生计划、专业介绍和录取信息入口。"
      },
      {
        "title": "哈尔滨工程大学信息公开网",
        "type": "其他",
        "url": "https://xxgk.hrbeu.edu.cn/",
        "note": "用于继续核对质量报告、就业报告和公开信息。"
      },
      {
        "title": "哈尔滨工程大学就业信息网",
        "type": "就业报告",
        "url": "https://job.hrbeu.edu.cn/",
        "note": "就业信息和就业质量报告入口，具体数据需逐项核对。"
      },
      {
        "title": "哈尔滨工程大学船舶工程学院",
        "type": "学院官网",
        "url": "https://sec.hrbeu.edu.cn/",
        "note": "船海与装备相关学院入口。"
      },
      {
        "title": "哈尔滨工程大学航天与建筑工程学院",
        "type": "学院官网",
        "url": "https://cace.hrbeu.edu.cn/",
        "note": "航天、力学和工程方向线索入口，需继续核对本科专业。"
      }
    ],
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-06-08",
      "summary": "已整理学校官网、本科招生网、学院和就业入口；弹药本科专业、分省计划和就业去向仍需官方逐项核对。",
      "verifiedFields": [
        "学校名称、城市、省份、211层次和官网入口",
        "本科招生网、信息公开网、就业信息网入口",
        "船海、核、航天等国防装备相关公开入口"
      ],
      "pendingFields": [
        "当年分省招生专业、大类名称和选科要求",
        "是否存在直接弹药或爆炸技术本科招生口径",
        "近年录取分数、招生人数和专业就业去向"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "官方入口已整理，专业和就业数据仍需按年度复核。",
      "relevanceLevel": "中",
      "conclusion": "哈尔滨工程大学的国防装备、船海、核和航天方向与军工装备场景相关，但本草稿不把弹药工程与爆炸技术写成本科招生事实。建议优先核对装备、力学和安全相关入口，再按招生网核对当年专业大类、计划和录取数据。",
      "keySignals": [
        "学校官网和招生网可核对学校身份、招生章程和专业入口。",
        "信息公开网和就业信息网可继续追踪教学质量、就业报告和公开数据。",
        "船舶工程学院、航天与建筑工程学院提供装备、力学和工程方向线索。",
        "相关性主要来自国防装备和工程场景，不等同于弹药本科专业。"
      ],
      "suitableFor": [
        "关注船海、核、航天、装备工程等国防特色方向的学生。",
        "准备把专业大类、学院和就业报告逐项核对的报考学生。"
      ],
      "risks": [
        "弹药工程与爆炸技术本科招生未在本草稿中确认，不能据此直接报考。",
        "学院方向、科研平台和国防背景不能替代本科招生专业证据。",
        "录取分数、招生人数、就业率和就业去向未逐项核验，需回到官方年度材料。"
      ],
      "sources": [
        {
          "title": "哈尔滨工程大学官网",
          "type": "学校官网",
          "date": "2026-06-08访问",
          "url": "https://www.hrbeu.edu.cn/"
        },
        {
          "title": "哈尔滨工程大学本科招生网",
          "type": "招生网",
          "date": "2026-06-08访问",
          "url": "https://zsb.hrbeu.edu.cn/"
        },
        {
          "title": "哈尔滨工程大学信息公开网",
          "type": "其他",
          "date": "2026-06-08访问",
          "url": "https://xxgk.hrbeu.edu.cn/"
        },
        {
          "title": "哈尔滨工程大学就业信息网",
          "type": "就业报告",
          "date": "2026-06-08访问",
          "url": "https://job.hrbeu.edu.cn/"
        },
        {
          "title": "哈尔滨工程大学船舶工程学院",
          "type": "学院官网",
          "date": "2026-06-08访问",
          "url": "https://sec.hrbeu.edu.cn/"
        },
        {
          "title": "哈尔滨工程大学航天与建筑工程学院",
          "type": "学院官网",
          "date": "2026-06-08访问",
          "url": "https://cace.hrbeu.edu.cn/"
        }
      ]
    }
  },
  {
    "id": "nwpu",
    "name": "西北工业大学",
    "shortName": "西工大",
    "city": "西安",
    "province": "陕西",
    "tier": "985 / 211",
    "logo": "/logos/schools/西北工业大学.png",
    "officialUrl": "https://www.nwpu.edu.cn/",
    "majorUrl": "https://zsb.nwpu.edu.cn/",
    "focus": "航空、航天、航海和国防装备方向相关。",
    "tags": [
      "985",
      "211",
      "双一流",
      "西安",
      "三航特色"
    ],
    "overview": "西北工业大学位于西安，航空、航天、航海等国防装备方向线索较多。",
    "suitableFor": [
      "关注国防装备、飞行器、航天和工程力学方向的学生。",
      "目标较高，愿意按招生网核对专业大类和录取位次的学生。"
    ],
    "reminders": [
      "本条不确认弹药工程与爆炸技术本科招生，需查当年专业计划。",
      "三航特色和军工背景不能直接等同于弹药或爆炸专业。",
      "分省计划、专业组、选科要求和就业报告需逐年核对。"
    ],
    "links": [
      {
        "title": "西北工业大学官网",
        "type": "学校官网",
        "url": "https://www.nwpu.edu.cn/",
        "note": "学校主入口。"
      },
      {
        "title": "西北工业大学本科招生网",
        "type": "招生网",
        "url": "https://zsb.nwpu.edu.cn/",
        "note": "招生章程、招生计划、专业介绍和录取信息入口。"
      },
      {
        "title": "西北工业大学信息公开网",
        "type": "其他",
        "url": "https://xxgk.nwpu.edu.cn/",
        "note": "教学质量、就业质量和信息公开入口。"
      },
      {
        "title": "西北工业大学就业信息网",
        "type": "就业报告",
        "url": "https://job.nwpu.edu.cn/",
        "note": "就业公告和就业质量材料入口。"
      },
      {
        "title": "西北工业大学航天学院",
        "type": "学院官网",
        "url": "https://hangtian.nwpu.edu.cn/",
        "note": "航天工程和相关力学方向入口。"
      },
      {
        "title": "西北工业大学航海学院",
        "type": "学院官网",
        "url": "https://hanghai.nwpu.edu.cn/",
        "note": "航海、无人系统和装备方向入口。"
      }
    ],
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-06-08",
      "summary": "已整理官网、本科招生网、信息公开、就业和三航学院入口；弹药本科专业、招生计划和就业去向仍需复查。",
      "verifiedFields": [
        "学校名称、城市、省份、985 / 211层次和官网入口",
        "本科招生网、信息公开网和就业信息入口",
        "航天、航海等国防装备相关学院入口"
      ],
      "pendingFields": [
        "当年本科专业大类、分省计划和选科要求",
        "是否存在直接弹药、爆炸或含能材料本科招生口径",
        "近年录取数据和分专业就业去向"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "官方入口已整理，专业和就业细节仍需按年度核对。",
      "relevanceLevel": "中",
      "conclusion": "西北工业大学的航空、航天、航海和国防装备方向与军工装备场景相关。草稿只把这些作为专业关联线索，不写成弹药工程本科招生事实。报考时应先查本科招生网，再按省份核对专业大类、计划、录取位次和就业报告。",
      "keySignals": [
        "学校官网和本科招生网可核对学校层次、章程、计划和专业入口。",
        "信息公开网、就业信息网可继续核对教学质量和就业资料。",
        "航天学院、航海学院提供装备、力学和系统工程方向线索。",
        "相关性来自国防装备和工程场景，不替代弹药本科招生证据。"
      ],
      "suitableFor": [
        "关注航空航天、航海工程、装备系统和工程力学方向的学生。",
        "准备用官方招生计划逐项比对专业和录取数据的学生。"
      ],
      "risks": [
        "三航特色不等于所有专业都对口弹药或爆炸技术。",
        "科研方向、学院平台和研究生方向不能替代本科招生专业。",
        "录取分数、招生人数、就业率和行业去向未逐项核验。"
      ],
      "sources": [
        {
          "title": "西北工业大学官网",
          "type": "学校官网",
          "date": "2026-06-08访问",
          "url": "https://www.nwpu.edu.cn/"
        },
        {
          "title": "西北工业大学本科招生网",
          "type": "招生网",
          "date": "2026-06-08访问",
          "url": "https://zsb.nwpu.edu.cn/"
        },
        {
          "title": "西北工业大学信息公开网",
          "type": "其他",
          "date": "2026-06-08访问",
          "url": "https://xxgk.nwpu.edu.cn/"
        },
        {
          "title": "西北工业大学就业信息网",
          "type": "就业报告",
          "date": "2026-06-08访问",
          "url": "https://job.nwpu.edu.cn/"
        },
        {
          "title": "西北工业大学航天学院",
          "type": "学院官网",
          "date": "2026-06-08访问",
          "url": "https://hangtian.nwpu.edu.cn/"
        },
        {
          "title": "西北工业大学航海学院",
          "type": "学院官网",
          "date": "2026-06-08访问",
          "url": "https://hanghai.nwpu.edu.cn/"
        }
      ]
    }
  },
  {
    "id": "swust",
    "name": "西南科技大学",
    "shortName": "西南科大",
    "city": "绵阳",
    "province": "四川",
    "tier": "普通本科",
    "logo": "/logos/schools/西南科技大学.png",
    "officialUrl": "https://www.swust.edu.cn/",
    "majorUrl": "https://zs.swust.edu.cn/",
    "focus": "国防科工共建、材料与安全方向有线索。",
    "tags": [
      "普通本科",
      "绵阳",
      "国防科工共建",
      "材料方向",
      "安全方向"
    ],
    "overview": "西南科技大学位于绵阳，材料、安全和国防科工共建背景值得核对。",
    "suitableFor": [
      "关注材料、安全工程、军民融合区域资源的学生。",
      "希望在绵阳及西南区域对比工科院校的学生。"
    ],
    "reminders": [
      "本条不确认弹药工程与爆炸技术本科招生，须查当年计划。",
      "国防科工共建背景只能作为学校关联线索，不能当成专业证据。",
      "分省计划、录取分数和就业去向需回到官方年度材料核对。"
    ],
    "links": [
      {
        "title": "西南科技大学官网",
        "type": "学校官网",
        "url": "https://www.swust.edu.cn/",
        "note": "学校主入口。"
      },
      {
        "title": "西南科技大学本科招生网",
        "type": "招生网",
        "url": "https://zs.swust.edu.cn/",
        "note": "招生章程、招生计划、专业介绍和录取信息入口。"
      },
      {
        "title": "西南科技大学信息公开网",
        "type": "其他",
        "url": "https://xxgk.swust.edu.cn/",
        "note": "信息公开和质量报告入口，具体内容需逐项核对。"
      },
      {
        "title": "西南科技大学就业信息网",
        "type": "就业报告",
        "url": "https://job.swust.edu.cn/",
        "note": "就业信息与就业质量材料入口。"
      },
      {
        "title": "西南科技大学教务处",
        "type": "其他",
        "url": "https://jwc.swust.edu.cn/",
        "note": "本科教学与培养资料入口。"
      },
      {
        "title": "西南科技大学研究生院",
        "type": "研究生招生",
        "url": "https://gs.swust.edu.cn/",
        "note": "研究生方向线索入口，不能替代本科招生证据。"
      }
    ],
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-06-08",
      "summary": "已整理官网、招生、信息公开、就业和教务入口；专业方向只作为线索，弹药本科招生和就业数据待核对。",
      "verifiedFields": [
        "学校名称、城市、省份、官网和本科招生网入口",
        "信息公开网、就业信息网、教务处和研究生院入口",
        "材料、安全和国防科工共建背景作为需继续核对的方向线索"
      ],
      "pendingFields": [
        "当年本科招生专业、分省计划和选科要求",
        "是否有直接弹药、爆炸或含能材料本科招生口径",
        "就业质量报告中的专业去向和升学数据"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "官方入口已整理，专业相关性需继续核对招生和学院页面。",
      "relevanceLevel": "中",
      "conclusion": "西南科技大学可作为材料、安全工程和国防科工共建背景的对比院校，但草稿不把这些线索写成弹药或爆炸技术本科招生事实。报考前应以本科招生网、教务入口和官方年度报告核对专业名称、分省计划和就业去向。",
      "keySignals": [
        "学校官网和本科招生网可核对学校身份、章程、计划和专业入口。",
        "信息公开网、就业信息网和教务处可继续核对质量报告与培养资料。",
        "研究生院只作为升学方向线索，不用于支撑本科招生专业。",
        "相关性主要来自材料、安全和国防科工背景，需谨慎表述。"
      ],
      "suitableFor": [
        "关注材料、安全、军民融合区域资源的学生。",
        "愿意按官方招生目录核对专业口径的报考学生。"
      ],
      "risks": [
        "国防科工共建背景不能直接推出弹药工程本科专业。",
        "研究生方向、科研平台和学院新闻不能替代本科招生证据。",
        "录取分数、招生人数、就业率和去向没有逐项核验，不写成确定结论。"
      ],
      "sources": [
        {
          "title": "西南科技大学官网",
          "type": "学校官网",
          "date": "2026-06-08访问",
          "url": "https://www.swust.edu.cn/"
        },
        {
          "title": "西南科技大学本科招生网",
          "type": "招生网",
          "date": "2026-06-08访问",
          "url": "https://zs.swust.edu.cn/"
        },
        {
          "title": "西南科技大学信息公开网",
          "type": "其他",
          "date": "2026-06-08访问",
          "url": "https://xxgk.swust.edu.cn/"
        },
        {
          "title": "西南科技大学就业信息网",
          "type": "就业报告",
          "date": "2026-06-08访问",
          "url": "https://job.swust.edu.cn/"
        },
        {
          "title": "西南科技大学教务处",
          "type": "其他",
          "date": "2026-06-08访问",
          "url": "https://jwc.swust.edu.cn/"
        },
        {
          "title": "西南科技大学研究生院",
          "type": "研究生招生",
          "date": "2026-06-08访问",
          "url": "https://gs.swust.edu.cn/"
        }
      ]
    }
  },
  {
    "id": "cumt",
    "name": "中国矿业大学",
    "shortName": "中国矿大",
    "city": "徐州",
    "province": "江苏",
    "tier": "211",
    "logo": "/logos/schools/中国矿业大学.png",
    "officialUrl": "https://www.cumt.edu.cn/",
    "majorUrl": "https://safe.cumt.edu.cn/",
    "focus": "安全工程、矿业安全和工程力学方向相关。",
    "tags": [
      "211",
      "双一流",
      "徐州",
      "安全工程",
      "矿业安全"
    ],
    "overview": "中国矿业大学位于徐州，安全工程、矿业安全和工程力学方向相关。",
    "suitableFor": [
      "关注安全工程、矿山安全、工程力学和爆破安全的学生。",
      "希望把安全类专业与矿业工程场景一起比较的学生。"
    ],
    "reminders": [
      "爆破、爆炸力学多为工程和研究方向线索，不等于本科弹药专业。",
      "分省计划、录取分数、专业组和选科要求需以招生网为准。",
      "就业率和行业去向未逐项核验前只作待核对。"
    ],
    "links": [
      {
        "title": "中国矿业大学官网",
        "type": "学校官网",
        "url": "https://www.cumt.edu.cn/",
        "note": "学校主入口。"
      },
      {
        "title": "中国矿业大学本科招生网",
        "type": "招生网",
        "url": "https://zs.cumt.edu.cn/",
        "note": "本科招生章程、计划、专业和录取信息入口。"
      },
      {
        "title": "中国矿业大学安全工程学院",
        "type": "学院官网",
        "url": "https://safe.cumt.edu.cn/",
        "note": "安全工程与矿业安全方向入口。"
      },
      {
        "title": "中国矿业大学力学与土木工程学院",
        "type": "学院官网",
        "url": "https://cace.cumt.edu.cn/",
        "note": "工程力学、土木与相关工程方向入口。"
      },
      {
        "title": "中国矿业大学信息公开网",
        "type": "其他",
        "url": "https://xxgk.cumt.edu.cn/",
        "note": "教学质量、就业质量和公开信息入口。"
      },
      {
        "title": "中国矿业大学就业指导中心",
        "type": "就业报告",
        "url": "https://job.cumt.edu.cn/",
        "note": "就业信息和就业质量材料入口。"
      }
    ],
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-06-08",
      "summary": "已整理官网、本科招生网、安全工程学院、力土学院和就业入口；爆破细分、录取和就业数据仍需年度核对。",
      "verifiedFields": [
        "学校名称、城市、省份、211层次和官网入口",
        "本科招生网、安全工程学院和力学与土木工程学院入口",
        "安全工程、矿业安全和工程力学相关公开入口"
      ],
      "pendingFields": [
        "当年本科招生专业名称、分省计划和选科要求",
        "工程爆破或爆炸力学是否属于本科培养内容",
        "近年录取数据、招生人数和分专业就业去向"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "官方入口已整理，爆破和就业细分仍需逐项复核。",
      "relevanceLevel": "高",
      "conclusion": "中国矿业大学与安全工程、矿业安全、工程力学和爆破安全场景关联较明确，适合关注安全与矿业工程方向的学生。本条不把研究方向写成本科弹药专业，分省计划、录取数据和就业去向仍需回到本科招生网和官方报告核对。",
      "keySignals": [
        "本科招生网可核对当年章程、计划、专业和录取信息。",
        "安全工程学院提供安全工程、矿业安全等方向入口。",
        "力学与土木工程学院提供工程力学和相关工程方向入口。",
        "信息公开网和就业中心可继续核对质量报告和就业资料。"
      ],
      "suitableFor": [
        "关注安全工程、矿山安全、工程力学和爆破安全的学生。",
        "愿意结合行业场景核对专业培养和就业方向的学生。"
      ],
      "risks": [
        "工程爆破、爆炸力学等线索不能自动等同于本科招生专业。",
        "研究生目录、科研平台和学院新闻不能替代本科招生证据。",
        "录取分数、招生人数、就业率和行业去向未逐项核验。"
      ],
      "sources": [
        {
          "title": "中国矿业大学官网",
          "type": "学校官网",
          "date": "2026-06-08访问",
          "url": "https://www.cumt.edu.cn/"
        },
        {
          "title": "中国矿业大学本科招生网",
          "type": "招生网",
          "date": "2026-06-08访问",
          "url": "https://zs.cumt.edu.cn/"
        },
        {
          "title": "中国矿业大学安全工程学院",
          "type": "学院官网",
          "date": "2026-06-08访问",
          "url": "https://safe.cumt.edu.cn/"
        },
        {
          "title": "中国矿业大学力学与土木工程学院",
          "type": "学院官网",
          "date": "2026-06-08访问",
          "url": "https://cace.cumt.edu.cn/"
        },
        {
          "title": "中国矿业大学信息公开网",
          "type": "其他",
          "date": "2026-06-08访问",
          "url": "https://xxgk.cumt.edu.cn/"
        },
        {
          "title": "中国矿业大学就业指导中心",
          "type": "就业报告",
          "date": "2026-06-08访问",
          "url": "https://job.cumt.edu.cn/"
        }
      ]
    }
  },
  {
    "id": "cumtb",
    "name": "中国矿业大学（北京）",
    "shortName": "矿大北京",
    "city": "北京",
    "province": "北京",
    "tier": "211",
    "logo": "/logos/schools/中国矿业大学（北京）.png",
    "officialUrl": "https://www.cumtb.edu.cn/",
    "majorUrl": "https://aqxy.cumtb.edu.cn/",
    "focus": "安全工程、矿业安全和应急方向相关。",
    "tags": [
      "211",
      "双一流",
      "北京",
      "安全工程",
      "应急管理"
    ],
    "overview": "中国矿业大学（北京）位于北京，安全工程、矿业安全和应急方向相关。",
    "suitableFor": [
      "关注安全工程、矿山安全、应急管理和工程安全的学生。",
      "希望在北京对比安全类和矿业类院校资源的学生。"
    ],
    "reminders": [
      "爆破和爆炸方向多为工程或研究线索，不能替代本科招生证据。",
      "分省招生计划、录取分数和选科要求需以当年招生入口为准。",
      "就业率、就业单位和升学去向未逐项核验前不要当确定结论。"
    ],
    "links": [
      {
        "title": "中国矿业大学（北京）官网",
        "type": "学校官网",
        "url": "https://www.cumtb.edu.cn/",
        "note": "学校主入口。"
      },
      {
        "title": "中国矿业大学（北京）本科招生网",
        "type": "招生网",
        "url": "https://zb.cumtb.edu.cn/",
        "note": "本科招生章程、计划、专业和录取信息入口。"
      },
      {
        "title": "中国矿业大学（北京）应急管理与安全工程学院",
        "type": "学院官网",
        "url": "https://aqxy.cumtb.edu.cn/",
        "note": "安全工程、应急管理和矿业安全方向入口。"
      },
      {
        "title": "中国矿业大学（北京）力学与建筑工程学院",
        "type": "学院官网",
        "url": "https://lxy.cumtb.edu.cn/",
        "note": "力学与工程方向入口，需核对本科专业口径。"
      },
      {
        "title": "中国矿业大学（北京）信息公开网",
        "type": "其他",
        "url": "https://xxgk.cumtb.edu.cn/",
        "note": "公开信息、质量报告和就业报告入口。"
      },
      {
        "title": "中国矿业大学（北京）就业创业信息网",
        "type": "就业报告",
        "url": "https://jy.cumtb.edu.cn/",
        "note": "就业信息和就业质量材料入口。"
      }
    ],
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-06-08",
      "summary": "已整理官网、招生网、安全学院、力建学院和就业入口；爆破细分、录取和就业数据仍需官方年度核对。",
      "verifiedFields": [
        "学校名称、城市、省份、211层次和官网入口",
        "本科招生网、应急管理与安全工程学院、力学与建筑工程学院入口",
        "安全工程、矿业安全和应急管理相关公开入口"
      ],
      "pendingFields": [
        "当年本科招生专业名称、分省计划和选科要求",
        "爆破、爆炸力学等方向是否进入本科培养口径",
        "近年录取数据、招生人数和分专业就业去向"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "官方入口已整理，爆破和就业细分仍需逐项复核。",
      "relevanceLevel": "高",
      "conclusion": "中国矿业大学（北京）与安全工程、矿业安全、应急管理和工程安全场景关联较明确。本条只把爆破、爆炸力学等内容作为进一步核对线索，不写成本科弹药专业。报考时需按招生网核对专业、计划、分数和就业报告。",
      "keySignals": [
        "本科招生网可核对当年章程、计划、专业和录取信息。",
        "应急管理与安全工程学院提供安全工程和应急方向入口。",
        "力学与建筑工程学院提供力学和工程方向入口。",
        "信息公开网和就业创业信息网可继续核对质量报告和就业资料。"
      ],
      "suitableFor": [
        "关注安全工程、应急管理、矿业安全和工程力学方向的学生。",
        "希望在北京查找安全类专业和矿业行业资源的学生。"
      ],
      "risks": [
        "爆破、爆炸力学和科研平台不能替代本科招生专业证据。",
        "研究生方向和学院新闻只能作线索，不能写成报考事实。",
        "录取分数、招生人数、就业率和去向未逐项核验。"
      ],
      "sources": [
        {
          "title": "中国矿业大学（北京）官网",
          "type": "学校官网",
          "date": "2026-06-08访问",
          "url": "https://www.cumtb.edu.cn/"
        },
        {
          "title": "中国矿业大学（北京）本科招生网",
          "type": "招生网",
          "date": "2026-06-08访问",
          "url": "https://zb.cumtb.edu.cn/"
        },
        {
          "title": "中国矿业大学（北京）应急管理与安全工程学院",
          "type": "学院官网",
          "date": "2026-06-08访问",
          "url": "https://aqxy.cumtb.edu.cn/"
        },
        {
          "title": "中国矿业大学（北京）力学与建筑工程学院",
          "type": "学院官网",
          "date": "2026-06-08访问",
          "url": "https://lxy.cumtb.edu.cn/"
        },
        {
          "title": "中国矿业大学（北京）信息公开网",
          "type": "其他",
          "date": "2026-06-08访问",
          "url": "https://xxgk.cumtb.edu.cn/"
        },
        {
          "title": "中国矿业大学（北京）就业创业信息网",
          "type": "就业报告",
          "date": "2026-06-08访问",
          "url": "https://jy.cumtb.edu.cn/"
        }
      ]
    }
  },
  {
    "id": "lntu",
    "name": "辽宁工程技术大学",
    "shortName": "辽工大",
    "city": "阜新",
    "province": "辽宁",
    "tier": "普通本科",
    "logo": "/logos/schools/辽宁工程技术大学.png",
    "officialUrl": "https://www.lntu.edu.cn/",
    "majorUrl": "https://aqxy.lntu.edu.cn/",
    "focus": "安全工程、矿业安全和工程爆破方向相关。",
    "tags": [
      "普通本科",
      "阜新",
      "安全工程",
      "矿业安全",
      "爆破线索"
    ],
    "overview": "辽宁工程技术大学位于阜新，安全工程、矿业安全和工程爆破方向相关。",
    "suitableFor": [
      "关注安全工程、矿山安全、工程爆破和现场工程场景的学生。",
      "希望比较东北地区矿业与安全类院校的学生。"
    ],
    "reminders": [
      "爆破方向多为工程场景或研究线索，不能替代本科专业证据。",
      "分省招生计划、录取分数和选科要求需以当年招生网为准。",
      "现场类方向可能涉及艰苦环境，应提前核对培养和就业场景。"
    ],
    "links": [
      {
        "title": "辽宁工程技术大学官网",
        "type": "学校官网",
        "url": "https://www.lntu.edu.cn/",
        "note": "学校主入口。"
      },
      {
        "title": "辽宁工程技术大学招生就业处",
        "type": "招生网",
        "url": "https://zsjy.lntu.edu.cn/",
        "note": "招生、就业和相关公告入口。"
      },
      {
        "title": "辽宁工程技术大学安全科学与工程学院",
        "type": "学院官网",
        "url": "https://aqxy.lntu.edu.cn/",
        "note": "安全工程、矿业安全和灾害防控方向入口。"
      },
      {
        "title": "辽宁工程技术大学力学与工程学院",
        "type": "学院官网",
        "url": "https://lxy.lntu.edu.cn/",
        "note": "力学和工程方向入口，需核对本科专业。"
      },
      {
        "title": "辽宁工程技术大学教务处",
        "type": "其他",
        "url": "https://jwc.lntu.edu.cn/",
        "note": "本科教学与培养资料入口。"
      },
      {
        "title": "辽宁工程技术大学信息公开网",
        "type": "其他",
        "url": "https://xxgk.lntu.edu.cn/",
        "note": "信息公开、质量报告和就业材料入口。"
      }
    ],
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-06-08",
      "summary": "已整理官网、招生就业、安全学院、力学学院和教学入口；爆破细分、录取和就业数据需年度核对。",
      "verifiedFields": [
        "学校名称、城市、省份、官网和招生就业入口",
        "安全科学与工程学院、力学与工程学院和教务处入口",
        "安全工程、矿业安全、工程爆破相关线索"
      ],
      "pendingFields": [
        "当年本科专业、分省招生计划和选科要求",
        "爆破方向是否为本科专业培养内容",
        "近年录取分数、招生人数和就业去向"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "官方入口已整理，爆破方向和就业数据仍需逐项复核。",
      "relevanceLevel": "高",
      "conclusion": "辽宁工程技术大学与安全工程、矿业安全、工程力学和工程爆破场景关联较强，适合作为安全与爆破工程方向的对比院校。本条不把爆破研究或工程场景写成本科招生专业，具体专业、计划、录取和就业去向仍需查官方年度材料。",
      "keySignals": [
        "官网和招生就业处可核对学校信息、招生公告和就业入口。",
        "安全科学与工程学院提供安全工程、矿业安全和灾害防控方向入口。",
        "力学与工程学院提供力学和工程技术方向线索。",
        "教务处、信息公开网可继续核对培养和质量报告资料。"
      ],
      "suitableFor": [
        "关注安全工程、矿山安全、工程爆破和灾害防控的学生。",
        "能接受现场工程场景并愿意核对就业环境的学生。"
      ],
      "risks": [
        "爆破方向线索不能直接写成本科弹药或爆炸技术专业。",
        "学院介绍和科研平台不能替代当年本科招生计划。",
        "录取分数、招生人数、就业率和就业去向未逐项核验。"
      ],
      "sources": [
        {
          "title": "辽宁工程技术大学官网",
          "type": "学校官网",
          "date": "2026-06-08访问",
          "url": "https://www.lntu.edu.cn/"
        },
        {
          "title": "辽宁工程技术大学招生就业处",
          "type": "招生网",
          "date": "2026-06-08访问",
          "url": "https://zsjy.lntu.edu.cn/"
        },
        {
          "title": "辽宁工程技术大学安全科学与工程学院",
          "type": "学院官网",
          "date": "2026-06-08访问",
          "url": "https://aqxy.lntu.edu.cn/"
        },
        {
          "title": "辽宁工程技术大学力学与工程学院",
          "type": "学院官网",
          "date": "2026-06-08访问",
          "url": "https://lxy.lntu.edu.cn/"
        },
        {
          "title": "辽宁工程技术大学教务处",
          "type": "其他",
          "date": "2026-06-08访问",
          "url": "https://jwc.lntu.edu.cn/"
        },
        {
          "title": "辽宁工程技术大学信息公开网",
          "type": "其他",
          "date": "2026-06-08访问",
          "url": "https://xxgk.lntu.edu.cn/"
        }
      ]
    }
  },
  {
    "id": "hpu",
    "name": "河南理工大学",
    "shortName": "河南理工",
    "city": "焦作",
    "province": "河南",
    "tier": "普通本科",
    "logo": "/logos/schools/河南理工大学.png",
    "officialUrl": "https://www.hpu.edu.cn/",
    "majorUrl": "https://aqxy.hpu.edu.cn/",
    "focus": "安全工程、矿业安全和灾害防控方向相关。",
    "tags": [
      "普通本科",
      "焦作",
      "安全工程",
      "矿业安全",
      "灾害防控"
    ],
    "overview": "河南理工大学位于焦作，安全工程、矿业安全和灾害防控方向相关。",
    "suitableFor": [
      "关注安全工程、矿山安全、灾害防控和工程管理的学生。",
      "希望在中部地区比较安全类工科院校的学生。"
    ],
    "reminders": [
      "爆破或爆炸相关内容需回到专业介绍和培养方案核对。",
      "分省招生计划、录取分数和选科要求以当年招生网为准。",
      "就业率和具体去向未逐项核验前只作待核对。"
    ],
    "links": [
      {
        "title": "河南理工大学官网",
        "type": "学校官网",
        "url": "https://www.hpu.edu.cn/",
        "note": "学校主入口。"
      },
      {
        "title": "河南理工大学本科招生网",
        "type": "招生网",
        "url": "https://zhaosheng.hpu.edu.cn/",
        "note": "本科招生章程、计划、专业和录取信息入口。"
      },
      {
        "title": "河南理工大学安全科学与工程学院",
        "type": "学院官网",
        "url": "https://aqxy.hpu.edu.cn/",
        "note": "安全工程、矿业安全和灾害防控方向入口。"
      },
      {
        "title": "河南理工大学应急管理学院",
        "type": "学院官网",
        "url": "https://yjgl.hpu.edu.cn/",
        "note": "应急管理和安全治理方向入口。"
      },
      {
        "title": "河南理工大学教务处",
        "type": "其他",
        "url": "https://jwc.hpu.edu.cn/",
        "note": "本科教学与培养资料入口。"
      },
      {
        "title": "河南理工大学就业创业指导中心",
        "type": "就业报告",
        "url": "https://job.hpu.edu.cn/",
        "note": "就业信息和就业质量材料入口。"
      }
    ],
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-06-08",
      "summary": "已整理官网、招生网、安全学院、应急学院和就业入口；爆破细分、录取和就业数据仍需年度核对。",
      "verifiedFields": [
        "学校名称、城市、省份、官网和本科招生网入口",
        "安全科学与工程学院、应急管理学院、教务和就业入口",
        "安全工程、矿业安全和灾害防控相关公开入口"
      ],
      "pendingFields": [
        "当年本科专业名称、分省计划和选科要求",
        "爆破或爆炸相关内容是否属于本科培养口径",
        "近年录取数据、招生人数和分专业就业去向"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "官方入口已整理，爆破细分和就业去向仍需逐项核对。",
      "relevanceLevel": "高",
      "conclusion": "河南理工大学与安全工程、矿业安全、灾害防控和应急管理方向关联较明确，适合作为安全类工科院校对比。本条不把研究方向或行业场景写成本科弹药专业，具体招生专业、计划、录取和就业去向仍需查官方年度材料。",
      "keySignals": [
        "本科招生网可核对当年章程、计划、专业和录取信息。",
        "安全科学与工程学院提供安全工程、矿业安全和灾害防控方向入口。",
        "应急管理学院提供安全治理和应急方向入口。",
        "教务处和就业创业指导中心可继续核对培养与就业资料。"
      ],
      "suitableFor": [
        "关注安全工程、矿山安全、灾害防控和应急管理的学生。",
        "愿意把专业介绍、培养方案和就业环境一起核对的学生。"
      ],
      "risks": [
        "爆破、爆炸相关线索不能直接写成本科弹药专业。",
        "学院介绍、科研平台和研究生方向不能替代本科招生计划。",
        "录取分数、招生人数、就业率和就业去向未逐项核验。"
      ],
      "sources": [
        {
          "title": "河南理工大学官网",
          "type": "学校官网",
          "date": "2026-06-08访问",
          "url": "https://www.hpu.edu.cn/"
        },
        {
          "title": "河南理工大学本科招生网",
          "type": "招生网",
          "date": "2026-06-08访问",
          "url": "https://zhaosheng.hpu.edu.cn/"
        },
        {
          "title": "河南理工大学安全科学与工程学院",
          "type": "学院官网",
          "date": "2026-06-08访问",
          "url": "https://aqxy.hpu.edu.cn/"
        },
        {
          "title": "河南理工大学应急管理学院",
          "type": "学院官网",
          "date": "2026-06-08访问",
          "url": "https://yjgl.hpu.edu.cn/"
        },
        {
          "title": "河南理工大学教务处",
          "type": "其他",
          "date": "2026-06-08访问",
          "url": "https://jwc.hpu.edu.cn/"
        },
        {
          "title": "河南理工大学就业创业指导中心",
          "type": "就业报告",
          "date": "2026-06-08访问",
          "url": "https://job.hpu.edu.cn/"
        }
      ]
    }
  },
  {
    "id": "sdust",
    "name": "山东科技大学",
    "shortName": "山科大",
    "city": "青岛",
    "province": "山东",
    "tier": "普通本科",
    "logo": "/logos/schools/山东科技大学.png",
    "officialUrl": "https://www.sdust.edu.cn/",
    "majorUrl": "https://aqxy.sdust.edu.cn/",
    "focus": "安全工程、矿业安全和工程技术方向相关。",
    "tags": [
      "普通本科",
      "青岛",
      "安全工程",
      "矿业安全",
      "工程技术"
    ],
    "overview": "山东科技大学位于青岛，安全工程、矿业安全和工程技术方向相关。",
    "suitableFor": [
      "关注安全工程、矿业安全、工程技术和山东区域资源的学生。",
      "希望对比普通本科安全类院校和就业区域的学生。"
    ],
    "reminders": [
      "爆破或爆炸技术相关内容需按专业介绍和培养方案核对。",
      "分省计划、专业组、选科要求和录取分数以当年招生网为准。",
      "就业去向和就业率未逐项官方核验前只作待核对。"
    ],
    "links": [
      {
        "title": "山东科技大学官网",
        "type": "学校官网",
        "url": "https://www.sdust.edu.cn/",
        "note": "学校主入口。"
      },
      {
        "title": "山东科技大学本科招生网",
        "type": "招生网",
        "url": "https://zs.sdust.edu.cn/",
        "note": "本科招生章程、计划、专业和录取信息入口。"
      },
      {
        "title": "山东科技大学安全与环境工程学院",
        "type": "学院官网",
        "url": "https://aqxy.sdust.edu.cn/",
        "note": "安全工程、环境安全和矿业安全方向入口。"
      },
      {
        "title": "山东科技大学能源与矿业工程学院",
        "type": "学院官网",
        "url": "https://nyxy.sdust.edu.cn/",
        "note": "矿业工程和资源安全方向入口。"
      },
      {
        "title": "山东科技大学教务处",
        "type": "其他",
        "url": "https://jwc.sdust.edu.cn/",
        "note": "本科教学和培养资料入口。"
      },
      {
        "title": "山东科技大学就业信息网",
        "type": "就业报告",
        "url": "https://jy.sdust.edu.cn/",
        "note": "就业信息和就业质量材料入口。"
      }
    ],
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-06-08",
      "summary": "已整理官网、招生网、安全学院、矿业学院和就业入口；爆破细分、录取和就业数据仍需年度核对。",
      "verifiedFields": [
        "学校名称、城市、省份、官网和本科招生网入口",
        "安全与环境工程学院、能源与矿业工程学院、教务和就业入口",
        "安全工程、矿业安全和工程技术相关公开入口"
      ],
      "pendingFields": [
        "当年本科专业名称、分省计划和选科要求",
        "爆破或爆炸相关内容是否属于本科培养口径",
        "近年录取数据、招生人数和分专业就业去向"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "官方入口已整理，专业细分和就业数据仍需逐项核验。",
      "relevanceLevel": "中",
      "conclusion": "山东科技大学与安全工程、矿业安全和工程技术方向相关，可作为安全类和矿业类普通本科院校对比。本条只保留工程安全线索，不把爆破或爆炸相关内容写成本科弹药专业。招生、录取和就业去向需查官方年度材料。",
      "keySignals": [
        "本科招生网可核对当年章程、计划、专业和录取信息。",
        "安全与环境工程学院提供安全工程和工程安全方向入口。",
        "能源与矿业工程学院提供矿业工程和资源安全方向入口。",
        "教务处和就业信息网可继续核对培养与就业材料。"
      ],
      "suitableFor": [
        "关注安全工程、矿业安全、工程技术和山东就业区域的学生。",
        "希望对比普通本科安全类院校的学生。"
      ],
      "risks": [
        "爆破或爆炸技术线索不能直接写成本科弹药专业。",
        "学院介绍、科研平台和研究生方向不能替代本科招生计划。",
        "录取分数、招生人数、就业率和就业去向未逐项核验。"
      ],
      "sources": [
        {
          "title": "山东科技大学官网",
          "type": "学校官网",
          "date": "2026-06-08访问",
          "url": "https://www.sdust.edu.cn/"
        },
        {
          "title": "山东科技大学本科招生网",
          "type": "招生网",
          "date": "2026-06-08访问",
          "url": "https://zs.sdust.edu.cn/"
        },
        {
          "title": "山东科技大学安全与环境工程学院",
          "type": "学院官网",
          "date": "2026-06-08访问",
          "url": "https://aqxy.sdust.edu.cn/"
        },
        {
          "title": "山东科技大学能源与矿业工程学院",
          "type": "学院官网",
          "date": "2026-06-08访问",
          "url": "https://nyxy.sdust.edu.cn/"
        },
        {
          "title": "山东科技大学教务处",
          "type": "其他",
          "date": "2026-06-08访问",
          "url": "https://jwc.sdust.edu.cn/"
        },
        {
          "title": "山东科技大学就业信息网",
          "type": "就业报告",
          "date": "2026-06-08访问",
          "url": "https://jy.sdust.edu.cn/"
        }
      ]
    }
  },
  {
    "id": "tyut",
    "name": "太原理工大学",
    "shortName": "太原理工",
    "city": "太原",
    "province": "山西",
    "tier": "211",
    "logo": "/logos/schools/太原理工大学.png",
    "officialUrl": "https://www.tyut.edu.cn/",
    "majorUrl": "https://zs.tyut.edu.cn/",
    "focus": "安全工程、力学和能源工程方向需核对。",
    "tags": [
      "211",
      "双一流",
      "太原",
      "安全工程",
      "力学线索"
    ],
    "overview": "太原理工大学位于太原，安全工程、力学和能源工程方向可作对比。",
    "suitableFor": [
      "关注安全工程、力学、能源工程和山西区域资源的学生。",
      "希望在211层次内对比安全与工程方向的学生。"
    ],
    "reminders": [
      "本条不确认弹药工程与爆炸技术本科招生，需查当年计划。",
      "力学和安全方向多为相关线索，不能替代本科专业证据。",
      "分省计划、录取分数和就业去向需逐年核对。"
    ],
    "links": [
      {
        "title": "太原理工大学官网",
        "type": "学校官网",
        "url": "https://www.tyut.edu.cn/",
        "note": "学校主入口。"
      },
      {
        "title": "太原理工大学本科招生网",
        "type": "招生网",
        "url": "https://zs.tyut.edu.cn/",
        "note": "本科招生章程、计划、专业和录取信息入口。"
      },
      {
        "title": "太原理工大学教务部",
        "type": "其他",
        "url": "https://jwc.tyut.edu.cn/",
        "note": "本科教学和培养资料入口。"
      },
      {
        "title": "太原理工大学就业信息网",
        "type": "就业报告",
        "url": "https://career.tyut.edu.cn/",
        "note": "就业信息和就业质量材料入口。"
      },
      {
        "title": "太原理工大学安全与应急管理工程学院",
        "type": "学院官网",
        "url": "https://aqyjy.tyut.edu.cn/",
        "note": "安全与应急方向入口，需继续核对专业页面。"
      },
      {
        "title": "太原理工大学机械与运载工程学院",
        "type": "学院官网",
        "url": "https://me.tyut.edu.cn/",
        "note": "机械、运载和工程方向入口。"
      }
    ],
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-06-08",
      "summary": "已整理官网、招生网、教务、就业和学院入口；弹药本科专业、爆破细分和就业数据仍需核对。",
      "verifiedFields": [
        "学校名称、城市、省份、211层次和官网入口",
        "本科招生网、教务部、就业信息网入口",
        "安全工程、力学和能源工程方向线索"
      ],
      "pendingFields": [
        "当年本科专业、分省计划和选科要求",
        "是否存在直接弹药、爆炸或爆破本科培养口径",
        "近年录取数据、招生人数和分专业就业去向"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "官方入口已整理，专业相关性需继续核对招生和学院页面。",
      "relevanceLevel": "中",
      "conclusion": "太原理工大学可作为211层次内安全工程、力学和能源工程方向的对比院校。本条不把力学、能源或安全平台写成弹药本科专业，报考前应通过本科招生网、教务入口和就业信息网核对专业、计划、录取和就业材料。",
      "keySignals": [
        "本科招生网可核对当年章程、计划、专业和录取信息。",
        "教务部和就业信息网可继续核对培养与就业材料。",
        "安全与应急管理工程学院提供安全方向线索。",
        "机械与运载工程学院提供工程装备方向线索。"
      ],
      "suitableFor": [
        "关注安全工程、力学、能源工程和山西区域资源的学生。",
        "希望在211院校中比较工程类方向的学生。"
      ],
      "risks": [
        "安全、力学和能源方向不能直接推出弹药工程本科专业。",
        "研究生方向、科研平台和学院新闻不能替代本科招生计划。",
        "录取分数、招生人数、就业率和就业去向未逐项核验。"
      ],
      "sources": [
        {
          "title": "太原理工大学官网",
          "type": "学校官网",
          "date": "2026-06-08访问",
          "url": "https://www.tyut.edu.cn/"
        },
        {
          "title": "太原理工大学本科招生网",
          "type": "招生网",
          "date": "2026-06-08访问",
          "url": "https://zs.tyut.edu.cn/"
        },
        {
          "title": "太原理工大学教务部",
          "type": "其他",
          "date": "2026-06-08访问",
          "url": "https://jwc.tyut.edu.cn/"
        },
        {
          "title": "太原理工大学就业信息网",
          "type": "就业报告",
          "date": "2026-06-08访问",
          "url": "https://career.tyut.edu.cn/"
        },
        {
          "title": "太原理工大学安全与应急管理工程学院",
          "type": "学院官网",
          "date": "2026-06-08访问",
          "url": "https://aqyjy.tyut.edu.cn/"
        },
        {
          "title": "太原理工大学机械与运载工程学院",
          "type": "学院官网",
          "date": "2026-06-08访问",
          "url": "https://me.tyut.edu.cn/"
        }
      ]
    }
  },
  {
    "id": "kmust",
    "name": "昆明理工大学",
    "shortName": "昆理工",
    "city": "昆明",
    "province": "云南",
    "tier": "普通本科",
    "logo": "/logos/schools/昆明理工大学.png",
    "officialUrl": "https://www.kmust.edu.cn/",
    "majorUrl": "https://aqyjxy.kmust.edu.cn/",
    "focus": "安全工程、应急管理和防灾方向相关。",
    "tags": [
      "普通本科",
      "昆明",
      "安全工程",
      "应急管理",
      "防灾减灾"
    ],
    "overview": "昆明理工大学位于昆明，安全工程、应急管理和防灾减灾方向相关。",
    "suitableFor": [
      "关注安全工程、应急管理、防灾减灾和区域工程场景的学生。",
      "希望比较西南地区安全类普通本科院校的学生。"
    ],
    "reminders": [
      "本条不确认弹药工程与爆炸技术本科招生，需查当年计划。",
      "安全工程和应急管理不能直接等同于爆炸或弹药方向。",
      "分省计划、录取分数和就业去向需回到官方年度材料。"
    ],
    "links": [
      {
        "title": "昆明理工大学官网",
        "type": "学校官网",
        "url": "https://www.kmust.edu.cn/",
        "note": "学校主入口。"
      },
      {
        "title": "昆明理工大学本科招生网",
        "type": "招生网",
        "url": "https://zsb.kmust.edu.cn/",
        "note": "本科招生章程、计划、专业和录取信息入口。"
      },
      {
        "title": "昆明理工大学公共安全与应急管理学院",
        "type": "学院官网",
        "url": "https://aqyjxy.kmust.edu.cn/",
        "note": "安全工程、应急管理和防灾减灾方向入口。"
      },
      {
        "title": "昆明理工大学教务处",
        "type": "其他",
        "url": "https://jwc.kmust.edu.cn/",
        "note": "本科教学和培养资料入口。"
      },
      {
        "title": "昆明理工大学就业指导中心",
        "type": "就业报告",
        "url": "https://jy.kmust.edu.cn/",
        "note": "就业信息和就业质量材料入口。"
      },
      {
        "title": "昆明理工大学信息公开网",
        "type": "其他",
        "url": "https://xxgk.kmust.edu.cn/",
        "note": "信息公开、质量报告和就业材料入口。"
      }
    ],
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-06-08",
      "summary": "已整理官网、招生网、公共安全学院、教务和就业入口；弹药本科专业、录取和就业数据仍需核对。",
      "verifiedFields": [
        "学校名称、城市、省份、官网和本科招生网入口",
        "公共安全与应急管理学院、教务和就业入口",
        "安全工程、应急管理和防灾减灾相关公开入口"
      ],
      "pendingFields": [
        "当年本科专业、分省计划和选科要求",
        "是否存在直接弹药、爆炸或爆破本科培养口径",
        "近年录取数据、招生人数和分专业就业去向"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "官方入口已整理，专业相关性和就业数据仍需年度复核。",
      "relevanceLevel": "中",
      "conclusion": "昆明理工大学与安全工程、应急管理和防灾减灾方向相关，可作为西南地区安全类院校对比。本条不把安全工程写成弹药或爆炸技术本科专业，招生计划、录取数据和就业去向仍需通过官方入口逐项核对。",
      "keySignals": [
        "本科招生网可核对当年章程、计划、专业和录取信息。",
        "公共安全与应急管理学院提供安全工程和应急方向入口。",
        "教务处可继续核对本科培养资料。",
        "就业指导中心和信息公开网可继续核对就业与质量报告。"
      ],
      "suitableFor": [
        "关注安全工程、应急管理、防灾减灾和区域工程场景的学生。",
        "希望在西南地区比较安全类院校的学生。"
      ],
      "risks": [
        "安全工程和应急管理不能直接等同于弹药或爆炸技术方向。",
        "学院介绍、科研平台和研究生方向不能替代本科招生计划。",
        "录取分数、招生人数、就业率和就业去向未逐项核验。"
      ],
      "sources": [
        {
          "title": "昆明理工大学官网",
          "type": "学校官网",
          "date": "2026-06-08访问",
          "url": "https://www.kmust.edu.cn/"
        },
        {
          "title": "昆明理工大学本科招生网",
          "type": "招生网",
          "date": "2026-06-08访问",
          "url": "https://zsb.kmust.edu.cn/"
        },
        {
          "title": "昆明理工大学公共安全与应急管理学院",
          "type": "学院官网",
          "date": "2026-06-08访问",
          "url": "https://aqyjxy.kmust.edu.cn/"
        },
        {
          "title": "昆明理工大学教务处",
          "type": "其他",
          "date": "2026-06-08访问",
          "url": "https://jwc.kmust.edu.cn/"
        },
        {
          "title": "昆明理工大学就业指导中心",
          "type": "就业报告",
          "date": "2026-06-08访问",
          "url": "https://jy.kmust.edu.cn/"
        },
        {
          "title": "昆明理工大学信息公开网",
          "type": "其他",
          "date": "2026-06-08访问",
          "url": "https://xxgk.kmust.edu.cn/"
        }
      ]
    }
  },
  {
    "id": "sygy",
    "name": "沈阳工学院",
    "shortName": "沈阳工学院",
    "city": "抚顺",
    "province": "辽宁",
    "tier": "普通本科",
    "logo": "/logos/schools/沈阳工学院.png",
    "officialUrl": "https://www.situ.edu.cn/",
    "majorUrl": "https://zsxx.situ.edu.cn/info/1055/1348.htm",
    "focus": "弹药工程、特种能源和兵器类本科。",
    "tags": [
      "普通本科",
      "民办本科",
      "抚顺",
      "兵器类",
      "弹药工程"
    ],
    "overview": "沈阳工学院位于抚顺，本科招生章程列出弹药工程与爆炸技术等专业。",
    "suitableFor": [
      "关注弹药工程与爆炸技术本科专业的学生。",
      "关注特种能源、含能材料和工程爆破应用的学生。"
    ],
    "reminders": [
      "民办本科，学费和办学成本需按当年招生章程核对。",
      "招生计划、分省专业组、录取分数和选科要求需按省份复核。",
      "就业率、薪资和就业单位只能作为待核对线索，不能写成稳定承诺。"
    ],
    "links": [
      {
        "title": "沈阳工学院官网",
        "type": "学校官网",
        "url": "https://www.situ.edu.cn/",
        "note": "学校主入口。"
      },
      {
        "title": "沈阳工学院招生信息网",
        "type": "招生网",
        "url": "https://zsxx.situ.edu.cn/",
        "note": "本科招生章程、招生计划和专业介绍入口。"
      },
      {
        "title": "沈阳工学院2026年招生章程",
        "type": "招生目录",
        "url": "https://zsxx.situ.edu.cn/info/1002/2548.htm",
        "note": "官方招生章程，专业设置表列出弹药工程与爆炸技术、特种能源技术与工程等本科专业。"
      },
      {
        "title": "招生网兵器类专业介绍",
        "type": "招生网",
        "url": "https://zsxx.situ.edu.cn/info/1055/1348.htm",
        "note": "招生网专业介绍，注明兵器类包含弹药工程与爆炸技术、特种能源技术与工程。"
      },
      {
        "title": "能源与水利学院官网",
        "type": "学院官网",
        "url": "https://nyfy.situ.edu.cn/",
        "note": "学院入口，专业介绍栏列出兵器类专业。"
      },
      {
        "title": "能源与水利学院兵器类专业介绍",
        "type": "学院官网",
        "url": "https://nyfy.situ.edu.cn/jmnddxzy/bqlzy.htm",
        "note": "学院官网兵器类专业介绍，包含弹药工程与爆炸技术和特种能源技术与工程培养口径。"
      }
    ],
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "高",
      "updatedAt": "2026-06-08",
      "summary": "已核对学校官网、招生信息网、2026年招生章程、招生网兵器类专业页和能源与水利学院专业页；分省计划、录取和就业数据仍需逐年复查。",
      "verifiedFields": [
        "学校名称、城市、省份、民办普通本科层次和官网入口",
        "2026年招生章程专业设置表列出弹药工程与爆炸技术本科专业",
        "2026年招生章程专业设置表列出特种能源技术与工程本科专业",
        "招生网兵器类专业介绍显示兵器类包含弹药工程与爆炸技术、特种能源技术与工程",
        "能源与水利学院官网专业介绍栏和兵器类专业页可核对学院口径"
      ],
      "pendingFields": [
        "当年分省分专业招生计划、专业组和选科要求",
        "近年录取分数线、位次和招生人数",
        "就业质量报告中的分专业去向和行业分布",
        "专业培养方案最新版和课程设置",
        "就业率、薪资、合作单位等宣传信息的年度官方报告支撑"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "已清洗旧 raw，保留直接本科专业证据，就业和薪资均为待核对线索。",
      "relevanceLevel": "高",
      "conclusion": "沈阳工学院属于本批少数可确认直接相关的候选。2026年招生章程列出弹药工程与爆炸技术、特种能源技术与工程本科专业，招生网和学院页也有兵器类专业介绍。分省计划、录取分数待核对，就业去向需另查官方年度材料。",
      "keySignals": [
        "2026年招生章程本科专业设置表列出弹药工程与爆炸技术，专业代码 082104。",
        "2026年招生章程本科专业设置表列出特种能源技术与工程，专业代码 082105。",
        "招生网兵器类专业介绍写明包含弹药工程与爆炸技术、特种能源技术与工程两个专业。",
        "能源与水利学院官网专业介绍栏列出兵器类专业。",
        "学院兵器类专业页说明弹药工程与爆炸技术和特种能源技术与工程的培养口径。"
      ],
      "suitableFor": [
        "关注弹药工程与爆炸技术本科专业的学生。",
        "关注特种能源、含能材料和工程爆破应用的学生。"
      ],
      "risks": [
        "沈阳工学院为民办本科，学费、住宿、转专业和培养成本需按当年章程核对。",
        "分省计划、专业组、选科要求和录取分数不能用专业介绍页替代。",
        "就业率、薪资、国企就业比例和合作单位信息只作待核对线索，不能写成稳定承诺。",
        "学院宣传页含就业薪资等表述，入库时需删除或降级，避免误导报考决策。",
        "专业名称、招生省份和招生规模可能年度调整，需以最新招生计划为准。"
      ],
      "sources": [
        {
          "title": "沈阳工学院官网",
          "type": "学校官网",
          "date": "2026-06-08访问",
          "url": "https://www.situ.edu.cn/"
        },
        {
          "title": "沈阳工学院招生信息网",
          "type": "招生网",
          "date": "2026-06-08访问",
          "url": "https://zsxx.situ.edu.cn/"
        },
        {
          "title": "沈阳工学院2026年招生章程",
          "type": "招生目录",
          "date": "2026-05-25",
          "url": "https://zsxx.situ.edu.cn/info/1002/2548.htm"
        },
        {
          "title": "沈阳工学院招生网兵器类专业介绍",
          "type": "招生网",
          "date": "2023-05-14",
          "url": "https://zsxx.situ.edu.cn/info/1055/1348.htm"
        },
        {
          "title": "沈阳工学院能源与水利学院官网",
          "type": "学院官网",
          "date": "2026-06-08访问",
          "url": "https://nyfy.situ.edu.cn/"
        },
        {
          "title": "沈阳工学院能源与水利学院兵器类专业介绍",
          "type": "学院官网",
          "date": "2026-06-08访问",
          "url": "https://nyfy.situ.edu.cn/jmnddxzy/bqlzy.htm"
        }
      ]
    }
  },
  {
    "id": "cust",
    "name": "长春理工大学",
    "shortName": "长理工",
    "city": "长春",
    "province": "吉林",
    "tier": "普通本科",
    "logo": "/logos/schools/长春理工大学.png",
    "officialUrl": "https://www.cust.edu.cn/",
    "majorUrl": "https://zsb.cust.edu.cn/xkzy/zszy/27d59898d7ad4107998691fcfaa24ea7.htm",
    "focus": "探测制导、信息对抗和光电国防方向。",
    "tags": [
      "普通本科",
      "长春",
      "光电特色",
      "兵器类",
      "探测制导"
    ],
    "overview": "长春理工大学位于长春，光电特色明显，设有探测制导与信息对抗本科专业。",
    "suitableFor": [
      "关注探测制导、信息对抗和光电国防方向的学生。",
      "希望比较兵器类近相关本科院校的学生。"
    ],
    "reminders": [
      "未确认开设弹药工程与爆炸技术本科专业。",
      "探测制导和信息对抗属于兵器类近相关，不能写成弹药本科。",
      "分省计划、录取分数、招生人数和就业去向均需待核对。"
    ],
    "links": [
      {
        "title": "长春理工大学官网",
        "type": "学校官网",
        "url": "https://www.cust.edu.cn/",
        "note": "学校主入口。"
      },
      {
        "title": "本科招生网",
        "type": "招生网",
        "url": "https://zsb.cust.edu.cn/",
        "note": "本科招生章程、招生专业和录取信息入口。"
      },
      {
        "title": "本科招生专业一览表",
        "type": "招生网",
        "url": "https://zsb.cust.edu.cn/xkzy/zszy/27d59898d7ad4107998691fcfaa24ea7.htm",
        "note": "本科招生网专业一览，列出光电工程学院相关本科专业。"
      },
      {
        "title": "光电工程学院官网",
        "type": "学院官网",
        "url": "https://gd.cust.edu.cn/",
        "note": "探测制导与控制技术、信息对抗技术所在学院入口。"
      },
      {
        "title": "光电工程学院简介",
        "type": "学院官网",
        "url": "https://gd.cust.edu.cn/xygk/xyjj/index.htm",
        "note": "学院官网列出光电信息、测控、信息对抗、探测制导、智能感知等本科专业。"
      },
      {
        "title": "探测制导与控制技术专业介绍",
        "type": "学院官网",
        "url": "https://gd.cust.edu.cn/bkjy/zyjj/062746d1b93648e1873f5021adf290d9.htm",
        "note": "学院官网本科专业介绍。"
      },
      {
        "title": "信息对抗技术专业介绍",
        "type": "学院官网",
        "url": "https://gd.cust.edu.cn/bkjy/zyjj/3a43b6e73c8f40a6a4763e712797418c.htm",
        "note": "学院官网本科专业介绍，体现光电对抗和国防特色。"
      }
    ],
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-06-08",
      "summary": "已核对学校官网、本科招生网、招生专业一览和光电工程学院专业介绍；弹药本科、分省计划、录取和就业数据仍需复查。",
      "verifiedFields": [
        "学校名称、城市、省份、普通本科层次和官网入口",
        "本科招生网和本科招生专业一览入口",
        "光电工程学院官网列出信息对抗技术、探测制导与控制技术等本科专业",
        "探测制导与控制技术专业介绍为学院官网本科专业页",
        "信息对抗技术专业介绍为学院官网本科专业页"
      ],
      "pendingFields": [
        "是否开设弹药工程与爆炸技术本科专业",
        "当年分省分专业招生计划、专业组和选科要求",
        "近年录取分数线、位次和招生人数",
        "就业质量报告中的分专业去向和行业分布",
        "各专业培养方案最新版和课程细节"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "已清洗旧 raw，保留本科兵器类近相关证据，不写弹药本科结论。",
      "relevanceLevel": "中",
      "conclusion": "长春理工大学不属于弹药工程直接对应院校，但本科招生网和光电工程学院页面可核到探测制导与控制技术、信息对抗技术等兵器类近相关专业。后续可作为光电国防和探测制导方向候选人工确认，不能写成弹药工程本科招生。",
      "keySignals": [
        "本科招生网提供招生专业一览入口。",
        "光电工程学院官网列出信息对抗技术、探测制导与控制技术等本科专业。",
        "探测制导与控制技术专业介绍为官方学院页面。",
        "信息对抗技术专业介绍体现光电对抗和国防特色。",
        "旧 raw 中的就业率、升学率等宏观表述均为待核对线索，未写成确定结论。"
      ],
      "suitableFor": [
        "关注探测制导、信息对抗和光电国防方向的学生。",
        "希望比较兵器类近相关本科院校的学生。"
      ],
      "risks": [
        "未确认弹药工程与爆炸技术本科招生，不能写成直接相关。",
        "探测制导、信息对抗和国防特色不能替代弹药工程本科证据。",
        "分数线、招生人数、就业率和就业去向需按官方年度材料复核。",
        "学院整体就业或升学数据不能自动推导到具体专业。"
      ],
      "sources": [
        {
          "title": "长春理工大学官网",
          "type": "学校官网",
          "date": "2026-06-08访问",
          "url": "https://www.cust.edu.cn/"
        },
        {
          "title": "长春理工大学本科招生网",
          "type": "招生网",
          "date": "2026-06-08访问",
          "url": "https://zsb.cust.edu.cn/"
        },
        {
          "title": "长春理工大学本科招生专业一览表",
          "type": "招生网",
          "date": "2025",
          "url": "https://zsb.cust.edu.cn/xkzy/zszy/27d59898d7ad4107998691fcfaa24ea7.htm"
        },
        {
          "title": "长春理工大学光电工程学院官网",
          "type": "学院官网",
          "date": "2026-06-08访问",
          "url": "https://gd.cust.edu.cn/"
        },
        {
          "title": "长春理工大学光电工程学院简介",
          "type": "学院官网",
          "date": "2025-06-10",
          "url": "https://gd.cust.edu.cn/xygk/xyjj/index.htm"
        },
        {
          "title": "长春理工大学探测制导与控制技术专业介绍",
          "type": "学院官网",
          "date": "2023-01-16",
          "url": "https://gd.cust.edu.cn/bkjy/zyjj/062746d1b93648e1873f5021adf290d9.htm"
        },
        {
          "title": "长春理工大学信息对抗技术专业介绍",
          "type": "学院官网",
          "date": "2023-01-16",
          "url": "https://gd.cust.edu.cn/bkjy/zyjj/3a43b6e73c8f40a6a4763e712797418c.htm"
        }
      ]
    }
  },
  {
    "id": "buaa",
    "name": "北京航空航天大学",
    "shortName": "北航",
    "city": "北京",
    "province": "北京",
    "tier": "985 / 211",
    "logo": "/logos/schools/北京航空航天大学.png",
    "officialUrl": "https://www.buaa.edu.cn/",
    "majorUrl": "https://www.buaa.edu.cn/jyjx/bksjy1/bkzy.htm",
    "focus": "航天探测制导和飞行器控制近相关。",
    "tags": [
      "985",
      "211",
      "北京",
      "航空航天",
      "探测制导"
    ],
    "overview": "北京航空航天大学位于北京，探测制导与控制技术等航天方向近相关。",
    "suitableFor": [
      "关注航天探测制导、飞行器控制和国防科技的学生。",
      "希望比较高层次航空航天类近相关院校的学生。"
    ],
    "reminders": [
      "未确认开设弹药工程与爆炸技术本科专业。",
      "探测制导与控制技术不能替代弹药工程本科证据。",
      "分省计划、录取分数、招生人数和就业去向均需待核对。"
    ],
    "links": [
      {
        "title": "北京航空航天大学官网",
        "type": "学校官网",
        "url": "https://www.buaa.edu.cn/",
        "note": "学校主入口。"
      },
      {
        "title": "北航招生网",
        "type": "招生网",
        "url": "https://zs.buaa.edu.cn/",
        "note": "本科招生章程、招生政策和专业信息入口。"
      },
      {
        "title": "本科专业介绍",
        "type": "学校官网",
        "url": "https://www.buaa.edu.cn/jyjx/bksjy1/bkzy.htm",
        "note": "学校官网本科专业介绍，含探测制导与控制技术等专业。"
      },
      {
        "title": "宇航学院简介",
        "type": "学院官网",
        "url": "https://www.sa.buaa.edu.cn/xygk/xyjs.htm",
        "note": "学院官网列出探测制导与控制技术等本科专业。"
      },
      {
        "title": "航天制导导航与控制系",
        "type": "学院官网",
        "url": "https://www.sa.buaa.edu.cn/info/1007/3092.htm",
        "note": "宇航学院页面提到探测制导与控制技术本科专业。"
      },
      {
        "title": "探测制导与控制技术专业",
        "type": "学院官网",
        "url": "https://yqgdxy.buaa.edu.cn/info/1006/4279.htm",
        "note": "仪器科学与光电工程学院专业介绍页面。"
      }
    ],
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-06-08",
      "summary": "已核对学校官网、招生网、本科专业页、宇航学院和探测制导相关专业页；弹药本科、录取和就业数据仍需复查。",
      "verifiedFields": [
        "学校名称、城市、省份、985/211层次和官网入口",
        "本科招生网入口",
        "学校官网本科专业页列出探测制导与控制技术",
        "宇航学院官网列出探测制导与控制技术等本科专业",
        "探测制导与控制技术相关学院专业介绍入口"
      ],
      "pendingFields": [
        "是否开设弹药工程与爆炸技术本科专业",
        "当年分省分专业招生计划、专业组和选科要求",
        "近年录取分数线、位次和招生人数",
        "就业质量报告中的分专业去向和行业分布",
        "探测制导与控制技术不同学院/培养方向的当年招生口径"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "已清洗旧 raw，保留航天探测制导近相关证据，不写弹药本科结论。",
      "relevanceLevel": "中",
      "conclusion": "北京航空航天大学不属于弹药工程直接对应院校，但学校本科专业页、宇航学院和仪器光电学院可核到探测制导与控制技术等航天制导控制本科方向。后续可作为航天探测制导近相关候选人工确认，不能写成弹药工程本科招生。",
      "keySignals": [
        "北航招生网可继续核对章程、政策和专业信息。",
        "学校官网本科专业页列出探测制导与控制技术。",
        "宇航学院简介列出探测制导与控制技术等本科专业。",
        "宇航学院航天制导导航与控制系页面提到相关本科专业。",
        "仪器科学与光电工程学院有探测制导与控制技术专业介绍。"
      ],
      "suitableFor": [
        "关注航天探测制导、飞行器控制和国防科技的学生。",
        "希望比较高层次航空航天类近相关院校的学生。"
      ],
      "risks": [
        "未确认弹药工程与爆炸技术本科招生，不能写成直接相关。",
        "探测制导、航天控制和国防特色不能替代弹药工程本科证据。",
        "分数线、招生人数、就业率和就业去向需按官方年度材料复核。",
        "不同学院方向和当年招生大类可能变化，需以本科招生网最新材料为准。"
      ],
      "sources": [
        {
          "title": "北京航空航天大学官网",
          "type": "学校官网",
          "date": "2026-06-08访问",
          "url": "https://www.buaa.edu.cn/"
        },
        {
          "title": "北京航空航天大学招生网",
          "type": "招生网",
          "date": "2026-06-08访问",
          "url": "https://zs.buaa.edu.cn/"
        },
        {
          "title": "北京航空航天大学本科专业介绍",
          "type": "学校官网",
          "date": "2026-06-08访问",
          "url": "https://www.buaa.edu.cn/jyjx/bksjy1/bkzy.htm"
        },
        {
          "title": "北京航空航天大学宇航学院简介",
          "type": "学院官网",
          "date": "2026-06-08访问",
          "url": "https://www.sa.buaa.edu.cn/xygk/xyjs.htm"
        },
        {
          "title": "北京航空航天大学航天制导导航与控制系",
          "type": "学院官网",
          "date": "2021",
          "url": "https://www.sa.buaa.edu.cn/info/1007/3092.htm"
        },
        {
          "title": "北京航空航天大学探测制导与控制技术专业",
          "type": "学院官网",
          "date": "2022",
          "url": "https://yqgdxy.buaa.edu.cn/info/1006/4279.htm"
        }
      ]
    }
  },
  {
    "id": "nuaa",
    "name": "南京航空航天大学",
    "shortName": "南航",
    "city": "南京",
    "province": "江苏",
    "tier": "211",
    "logo": "/logos/schools/南京航空航天大学.png",
    "officialUrl": "https://www.nuaa.edu.cn/",
    "majorUrl": "https://cae.nuaa.edu.cn/5430/list.htm",
    "focus": "航空航天探测制导和控制近相关。",
    "tags": [
      "211",
      "双一流",
      "南京",
      "航空航天",
      "探测制导"
    ],
    "overview": "南京航空航天大学位于南京，探测制导与控制技术等航空航天方向近相关。",
    "suitableFor": [
      "关注航空航天制导、飞行控制和国防科技的学生。",
      "希望比较工信部航空航天类近相关院校的学生。"
    ],
    "reminders": [
      "未确认开设弹药工程与爆炸技术本科专业。",
      "探测制导与控制技术属于近相关，不能写成弹药本科。",
      "分省计划、录取分数、招生人数和就业去向均需待核对。"
    ],
    "links": [
      {
        "title": "南京航空航天大学官网",
        "type": "学校官网",
        "url": "https://www.nuaa.edu.cn/",
        "note": "学校主入口。"
      },
      {
        "title": "南航招生网",
        "type": "招生网",
        "url": "https://zs.nuaa.edu.cn/",
        "note": "本科招生章程、招生政策和招生信息入口。"
      },
      {
        "title": "2026年本科招生章程",
        "type": "招生目录",
        "url": "https://zs.nuaa.edu.cn/2026/0528/c9155a400357/page.htm",
        "note": "官方本科招生章程入口，用于核对当年招生政策。"
      },
      {
        "title": "自动化学院官网",
        "type": "学院官网",
        "url": "https://cae.nuaa.edu.cn/",
        "note": "探测制导与控制技术所在学院入口。"
      },
      {
        "title": "自动化学院专业介绍入口",
        "type": "学院官网",
        "url": "https://cae.nuaa.edu.cn/5368/list.htm",
        "note": "学院官网专业介绍入口，列出本科专业设置。"
      },
      {
        "title": "探测制导与控制技术专业介绍",
        "type": "学院官网",
        "url": "https://cae.nuaa.edu.cn/5430/list.htm",
        "note": "自动化学院旧版本科专业介绍页面。"
      },
      {
        "title": "探测制导与控制技术一流专业材料",
        "type": "学院官网",
        "url": "https://shpg.nuaa.edu.cn/2024/0508/c18900a338678/page.htm",
        "note": "学校本科教育教学审核评估专题页面，补充专业历史和培养口径。"
      }
    ],
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-06-08",
      "summary": "已核对学校官网、本科招生网、2026本科招生章程、自动化学院和探测制导专业页；弹药本科、录取和就业数据仍需复查。",
      "verifiedFields": [
        "学校名称、城市、省份、211层次和官网入口",
        "本科招生网和2026年本科招生章程入口",
        "自动化学院官网专业介绍入口列出探测制导与控制技术",
        "探测制导与控制技术专业介绍为学院官网本科专业页",
        "学校专题页面提供探测制导与控制技术一流专业材料"
      ],
      "pendingFields": [
        "是否开设弹药工程与爆炸技术本科专业",
        "当年分省分专业招生计划、专业组和选科要求",
        "近年录取分数线、位次和招生人数",
        "就业质量报告中的分专业去向和行业分布",
        "探测制导与控制技术当年招生计划和培养方案最新版"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "已清洗旧 raw，保留航空航天探测制导近相关证据，不写弹药本科结论。",
      "relevanceLevel": "中",
      "conclusion": "南京航空航天大学不属于弹药工程直接对应院校，但本科招生网、2026招生章程和自动化学院页面可核到探测制导与控制技术等航空航天制导控制本科方向。后续可作为航空航天制导控制近相关候选人工确认，不能写成弹药工程本科招生。",
      "keySignals": [
        "南航招生网和2026年本科招生章程可用于核对当年招生政策。",
        "自动化学院专业介绍入口列出探测制导与控制技术等本科专业。",
        "探测制导与控制技术专业介绍为官方学院页面。",
        "一流专业材料显示该专业与飞行器制导与控制、火控与指挥等方向相关。",
        "旧 raw 中的就业率为待核对线索，学科排名表述未写成确定结论。"
      ],
      "suitableFor": [
        "关注航空航天制导、飞行控制和国防科技的学生。",
        "希望比较工信部航空航天类近相关院校的学生。"
      ],
      "risks": [
        "未确认弹药工程与爆炸技术本科招生，不能写成直接相关。",
        "探测制导、火控与指挥等方向不能替代弹药工程本科证据。",
        "分数线、招生人数、就业率和就业去向需按官方年度材料复核。",
        "专业介绍旧版页面只能支撑专业线索，入库前仍需核当年招生计划。"
      ],
      "sources": [
        {
          "title": "南京航空航天大学官网",
          "type": "学校官网",
          "date": "2026-06-08访问",
          "url": "https://www.nuaa.edu.cn/"
        },
        {
          "title": "南京航空航天大学招生网",
          "type": "招生网",
          "date": "2026-06-08访问",
          "url": "https://zs.nuaa.edu.cn/"
        },
        {
          "title": "南京航空航天大学2026年本科招生章程",
          "type": "招生目录",
          "date": "2026-05-28",
          "url": "https://zs.nuaa.edu.cn/2026/0528/c9155a400357/page.htm"
        },
        {
          "title": "南京航空航天大学自动化学院官网",
          "type": "学院官网",
          "date": "2026-06-08访问",
          "url": "https://cae.nuaa.edu.cn/"
        },
        {
          "title": "南京航空航天大学自动化学院专业介绍入口",
          "type": "学院官网",
          "date": "2026-06-08访问",
          "url": "https://cae.nuaa.edu.cn/5368/list.htm"
        },
        {
          "title": "南京航空航天大学探测制导与控制技术专业介绍",
          "type": "学院官网",
          "date": "待核对",
          "url": "https://cae.nuaa.edu.cn/5430/list.htm"
        },
        {
          "title": "南京航空航天大学探测制导与控制技术一流专业材料",
          "type": "学院官网",
          "date": "2024-05-08",
          "url": "https://shpg.nuaa.edu.cn/2024/0508/c18900a338678/page.htm"
        }
      ]
    }
  },
  {
    "id": "cczu",
    "name": "常州大学",
    "shortName": "常大",
    "city": "常州",
    "province": "江苏",
    "tier": "普通本科",
    "logo": "/logos/schools/常州大学.png",
    "officialUrl": "https://www.cczu.edu.cn/",
    "majorUrl": "https://sse.cczu.edu.cn/2022/0919/c18755a304465/page.htm",
    "focus": "石油化工安全和安全工程近相关。",
    "tags": [
      "普通本科",
      "江苏",
      "安全工程",
      "消防工程",
      "化工安全"
    ],
    "overview": "常州大学位于江苏常州，安全工程、消防工程和应急管理方向与化工安全近相关。",
    "suitableFor": [
      "关注石油化工安全、安全评价和应急管理的学生。",
      "希望把安全工程作为弹药爆炸方向相邻参考的学生。"
    ],
    "reminders": [
      "未确认开设弹药工程与爆炸技术本科专业。",
      "分省计划、招生人数和录取分数需按当年招生网核对。",
      "就业率和就业去向未逐项核验前只能写待核对。"
    ],
    "links": [
      {
        "title": "常州大学官网",
        "type": "学校官网",
        "url": "https://www.cczu.edu.cn/",
        "note": "学校主入口。"
      },
      {
        "title": "常州大学本科招生网",
        "type": "招生网",
        "url": "https://cdzs.cczu.edu.cn/",
        "note": "本科招生章程、计划和专业信息入口。"
      },
      {
        "title": "安全科学与工程学院官网",
        "type": "学院官网",
        "url": "https://sse.cczu.edu.cn/",
        "note": "安全工程、消防工程和应急技术与管理相关学院入口。"
      },
      {
        "title": "安全工程专业简介",
        "type": "学院官网",
        "url": "https://sse.cczu.edu.cn/2022/0919/c18755a304465/page.htm",
        "note": "学院官网专业介绍，说明安全工程本科专业和石油石化安全培养口径。"
      },
      {
        "title": "学院介绍",
        "type": "学院官网",
        "url": "https://sse.cczu.edu.cn/xyjs/list.htm",
        "note": "学院官网说明本科专业设置。"
      },
      {
        "title": "本科教学质量报告入口",
        "type": "教学质量报告",
        "url": "https://jwc.cczu.edu.cn/jxzlw/2024/0727/c1479a368347/page.htm",
        "note": "用于后续核对本科教学质量和就业相关公开材料。"
      }
    ],
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-06-08",
      "summary": "已核对学校官网、本科招生网和安全科学与工程学院入口；本科弹药专业、分省计划、录取和就业数据仍需年度复查。",
      "verifiedFields": [
        "学校名称、城市、省份、普通本科层次和官网入口",
        "本科招生网和安全科学与工程学院入口",
        "学院官网存在安全工程、消防工程和应急技术与管理相关公开信息",
        "安全工程专业介绍体现石油石化行业安全培养口径"
      ],
      "pendingFields": [
        "是否开设弹药工程与爆炸技术本科专业",
        "当年分省分专业招生计划、专业组和选科要求",
        "近年录取分数线、位次和招生人数",
        "就业质量报告中的分专业去向和行业分布"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "已整理官方入口，适合作为安全工程近相关候选继续人工核对。",
      "relevanceLevel": "中",
      "conclusion": "常州大学与弹药工程不属于直接对应关系，但安全工程、消防工程和应急技术与管理方向与化工安全、火灾爆炸风险防控近相关。后续若进入人工确认，应只写近相关，不写弹药本科结论。",
      "keySignals": [
        "本科招生网可继续核对章程、计划和专业信息。",
        "安全科学与工程学院官网列出安全工程、消防工程和应急技术与管理相关入口。",
        "安全工程专业介绍强调石油石化行业和区域安全培养口径。",
        "本科教学质量报告入口可用于后续核对教学和就业公开材料。"
      ],
      "suitableFor": [
        "关注石油化工安全、安全评价和应急管理的学生。",
        "希望比较安全工程近相关院校的学生。"
      ],
      "risks": [
        "未确认弹药工程与爆炸技术本科招生，不能写成直接相关。",
        "研究方向、实验平台和课程名不能替代本科招生专业证据。",
        "分数线、招生人数、就业率和就业去向均需按官方年度材料复核。"
      ],
      "sources": [
        {
          "title": "常州大学官网",
          "type": "学校官网",
          "date": "2026-06-08访问",
          "url": "https://www.cczu.edu.cn/"
        },
        {
          "title": "常州大学本科招生网",
          "type": "招生网",
          "date": "2026-06-08访问",
          "url": "https://cdzs.cczu.edu.cn/"
        },
        {
          "title": "常州大学安全科学与工程学院官网",
          "type": "学院官网",
          "date": "2026-06-08访问",
          "url": "https://sse.cczu.edu.cn/"
        },
        {
          "title": "常州大学安全工程专业简介",
          "type": "学院官网",
          "date": "2022-09-19",
          "url": "https://sse.cczu.edu.cn/2022/0919/c18755a304465/page.htm"
        },
        {
          "title": "常州大学安全科学与工程学院介绍",
          "type": "学院官网",
          "date": "待核对",
          "url": "https://sse.cczu.edu.cn/xyjs/list.htm"
        },
        {
          "title": "常州大学本科教学质量报告入口",
          "type": "教学质量报告",
          "date": "2024",
          "url": "https://jwc.cczu.edu.cn/jxzlw/2024/0727/c1479a368347/page.htm"
        }
      ]
    }
  },
  {
    "id": "cqust",
    "name": "重庆科技大学",
    "shortName": "重科大",
    "city": "重庆",
    "province": "重庆",
    "tier": "普通本科",
    "logo": "/logos/schools/重庆科技大学.png",
    "officialUrl": "https://www.cqust.edu.cn/",
    "majorUrl": "https://aqxy.cqust.edu.cn/xygk/xyjj.htm",
    "focus": "安全工程、防火防爆和应急方向近相关。",
    "tags": [
      "普通本科",
      "重庆",
      "安全工程",
      "消防工程",
      "化工安全"
    ],
    "overview": "重庆科技大学位于重庆，安全工程、消防工程和化工安全工程方向与安全防控近相关。",
    "suitableFor": [
      "关注安全生产、防火防爆、消防工程和应急管理的学生。",
      "希望在应用型本科中比较安全工程方向的学生。"
    ],
    "reminders": [
      "未确认开设弹药工程与爆炸技术本科专业。",
      "本科招生计划、专业组和录取分数需按当年招生网核对。",
      "就业去向和就业率未逐项核验前只能写待核对。"
    ],
    "links": [
      {
        "title": "重庆科技大学官网",
        "type": "学校官网",
        "url": "https://www.cqust.edu.cn/",
        "note": "学校主入口。"
      },
      {
        "title": "重庆科技大学本科招生网",
        "type": "招生网",
        "url": "https://zs.cqust.edu.cn/",
        "note": "本科招生章程、计划和专业信息入口。"
      },
      {
        "title": "安全科学与工程学院官网",
        "type": "学院官网",
        "url": "https://aqxy.cqust.edu.cn/",
        "note": "安全工程、消防工程、化工安全工程和应急技术与管理相关学院入口。"
      },
      {
        "title": "安全科学与工程学院简介",
        "type": "学院官网",
        "url": "https://aqxy.cqust.edu.cn/xygk/xyjj.htm",
        "note": "学院官网说明本科专业设置和安全学科方向。"
      },
      {
        "title": "招生专业介绍",
        "type": "学院官网",
        "url": "https://aqxy.cqust.edu.cn/info/1194/2576.htm",
        "note": "学院官网本科招生专业介绍入口。"
      },
      {
        "title": "本科生培养相关动态",
        "type": "学院官网",
        "url": "https://aqxy.cqust.edu.cn/info/1175/3367.htm",
        "note": "用于后续核对安全工程和应急技术与管理培养方案线索。"
      }
    ],
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-06-08",
      "summary": "已核对学校官网、本科招生网和安全科学与工程学院入口；本科弹药专业、招生计划、录取和就业数据仍需复查。",
      "verifiedFields": [
        "学校名称、城市、省份、普通本科层次和官网入口",
        "本科招生网和安全科学与工程学院入口",
        "学院官网显示安全工程、消防工程、化工安全工程、应急技术与管理等本科专业线索"
      ],
      "pendingFields": [
        "是否开设弹药工程与爆炸技术本科专业",
        "当年分省分专业招生计划、专业组和选科要求",
        "近年录取分数线、位次和招生人数",
        "就业质量报告中的分专业去向和行业分布"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "已整理官方入口，适合作为安全工程近相关候选继续人工核对。",
      "relevanceLevel": "中",
      "conclusion": "重庆科技大学不属于弹药工程直接对应院校，但安全工程、消防工程、化工安全工程和应急技术与管理方向与防火防爆、化工安全近相关。后续清洗时应保留边界，不写弹药本科结论。",
      "keySignals": [
        "本科招生网可继续核对章程、计划和专业信息。",
        "安全科学与工程学院官网显示安全工程、消防工程、化工安全工程等本科专业线索。",
        "学院简介显示安全工程相关学科和应用型安全人才培养口径。",
        "本科生培养动态可作为继续核对培养方案的线索。"
      ],
      "suitableFor": [
        "关注安全生产、防火防爆、消防工程和化工安全的学生。",
        "希望比较应用型安全工程院校的学生。"
      ],
      "risks": [
        "未确认弹药工程与爆炸技术本科招生，不能写成直接相关。",
        "研究生招生目录和教师科研方向不能替代本科招生专业证据。",
        "分数线、招生人数、就业率和就业去向均需按官方年度材料复核。"
      ],
      "sources": [
        {
          "title": "重庆科技大学官网",
          "type": "学校官网",
          "date": "2026-06-08访问",
          "url": "https://www.cqust.edu.cn/"
        },
        {
          "title": "重庆科技大学本科招生网",
          "type": "招生网",
          "date": "2026-06-08访问",
          "url": "https://zs.cqust.edu.cn/"
        },
        {
          "title": "重庆科技大学安全科学与工程学院官网",
          "type": "学院官网",
          "date": "2026-06-08访问",
          "url": "https://aqxy.cqust.edu.cn/"
        },
        {
          "title": "重庆科技大学安全科学与工程学院简介",
          "type": "学院官网",
          "date": "2026-05访问",
          "url": "https://aqxy.cqust.edu.cn/xygk/xyjj.htm"
        },
        {
          "title": "重庆科技大学安全科学与工程学院招生专业",
          "type": "学院官网",
          "date": "2025",
          "url": "https://aqxy.cqust.edu.cn/info/1194/2576.htm"
        },
        {
          "title": "安全工程系研讨培养方案",
          "type": "学院官网",
          "date": "2025",
          "url": "https://aqxy.cqust.edu.cn/info/1175/3367.htm"
        }
      ]
    }
  },
  {
    "id": "sau",
    "name": "沈阳航空航天大学",
    "shortName": "沈航",
    "city": "沈阳",
    "province": "辽宁",
    "tier": "普通本科",
    "logo": "/logos/schools/沈阳航空航天大学.png",
    "officialUrl": "https://www.sau.edu.cn/",
    "majorUrl": "https://scas.sau.edu.cn/info/1071/1107.htm",
    "focus": "航空安全、消防工程和火爆防控近相关。",
    "tags": [
      "普通本科",
      "沈阳",
      "航空航天",
      "安全工程",
      "消防工程"
    ],
    "overview": "沈阳航空航天大学位于沈阳，安全工程、消防工程和航空安全方向与火灾爆炸防控近相关。",
    "suitableFor": [
      "关注航空安全、消防工程和风险评估的学生。",
      "希望比较航空特色安全工程院校的学生。"
    ],
    "reminders": [
      "未确认开设弹药工程与爆炸技术本科专业。",
      "学校不是 211，不能沿用 raw 包里的 211 口径。",
      "分省计划、录取数据和就业去向需按官方年度材料核对。"
    ],
    "links": [
      {
        "title": "沈阳航空航天大学官网",
        "type": "学校官网",
        "url": "https://www.sau.edu.cn/",
        "note": "学校主入口。"
      },
      {
        "title": "沈阳航空航天大学本科招生网",
        "type": "招生网",
        "url": "https://zs.sau.edu.cn/",
        "note": "本科招生章程、计划和专业介绍入口。"
      },
      {
        "title": "本科招生网安全工程学院专业介绍",
        "type": "招生网",
        "url": "https://zs.sau.edu.cn/zyjs/aqgcxy.htm",
        "note": "本科招生网按学院列出的专业介绍入口。"
      },
      {
        "title": "安全工程学院官网",
        "type": "学院官网",
        "url": "https://scas.sau.edu.cn/",
        "note": "安全工程、消防工程和保险学相关学院入口。"
      },
      {
        "title": "安全工程专业简介",
        "type": "学院官网",
        "url": "https://scas.sau.edu.cn/info/1071/1107.htm",
        "note": "学院官网安全工程专业介绍，含航空安全和飞机火爆防控相关线索。"
      },
      {
        "title": "本科教学质量报告入口",
        "type": "教学质量报告",
        "url": "https://www.sau.edu.cn/info/1033/3296.htm",
        "note": "用于后续核对本科教学公开材料。"
      }
    ],
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-06-08",
      "summary": "已核对学校官网、本科招生网和安全工程学院入口；本科弹药专业、分省招生和就业去向仍需年度复查。",
      "verifiedFields": [
        "学校名称、城市、省份、普通本科层次和官网入口",
        "本科招生网、安全工程学院和安全工程专业介绍入口",
        "安全工程专业介绍存在航空安全和飞机火爆防控相关线索"
      ],
      "pendingFields": [
        "是否开设弹药工程与爆炸技术本科专业",
        "当年分省分专业招生计划、专业组和选科要求",
        "近年录取分数线、位次和招生人数",
        "就业质量报告中的分专业去向和行业分布"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "已整理官方入口，适合作为航空安全近相关候选继续人工核对。",
      "relevanceLevel": "中",
      "conclusion": "沈阳航空航天大学不属于弹药工程直接对应院校，但安全工程、消防工程和航空安全方向与火灾爆炸防控近相关。raw 包中的 211 和双一流口径应删除，后续只能写普通本科近相关。",
      "keySignals": [
        "本科招生网可继续核对招生章程、计划和专业介绍。",
        "安全工程学院官网提供安全工程、消防工程等相关入口。",
        "安全工程专业简介包含航空安全和飞机火爆防控相关线索。",
        "本科教学质量报告入口可用于后续核对教学公开材料。"
      ],
      "suitableFor": [
        "关注航空安全、消防工程和风险评估的学生。",
        "希望比较航空特色安全工程院校的学生。"
      ],
      "risks": [
        "未确认弹药工程与爆炸技术本科招生，不能写成直接相关。",
        "航空火爆防控、国防特色和科研平台不能替代本科弹药专业证据。",
        "分数线、招生人数、就业率和就业去向均需按官方年度材料复核。"
      ],
      "sources": [
        {
          "title": "沈阳航空航天大学官网",
          "type": "学校官网",
          "date": "2026-06-08访问",
          "url": "https://www.sau.edu.cn/"
        },
        {
          "title": "沈阳航空航天大学本科招生网",
          "type": "招生网",
          "date": "2026-06-08访问",
          "url": "https://zs.sau.edu.cn/"
        },
        {
          "title": "沈阳航空航天大学本科招生网安全工程学院专业介绍",
          "type": "招生网",
          "date": "2026-06-08访问",
          "url": "https://zs.sau.edu.cn/zyjs/aqgcxy.htm"
        },
        {
          "title": "沈阳航空航天大学安全工程学院官网",
          "type": "学院官网",
          "date": "2026-06-08访问",
          "url": "https://scas.sau.edu.cn/"
        },
        {
          "title": "沈阳航空航天大学安全工程专业简介",
          "type": "学院官网",
          "date": "2025",
          "url": "https://scas.sau.edu.cn/info/1071/1107.htm"
        },
        {
          "title": "沈阳航空航天大学本科教学质量报告入口",
          "type": "教学质量报告",
          "date": "2022-2023学年",
          "url": "https://www.sau.edu.cn/info/1033/3296.htm"
        }
      ]
    }
  },
  {
    "id": "emu",
    "name": "应急管理大学",
    "shortName": "应急管理大学",
    "city": "廊坊",
    "province": "河北",
    "tier": "普通本科",
    "logo": "/logos/schools/应急管理大学.png",
    "officialUrl": "https://www.ncist.edu.cn/",
    "majorUrl": "https://ncist.yz.eol.cn/specialshow/",
    "focus": "安全工程、应急管理和化工安全近相关。",
    "tags": [
      "普通本科",
      "应急管理",
      "安全工程",
      "化工安全",
      "矿山安全"
    ],
    "overview": "应急管理大学由华北科技学院、防灾科技学院合并设置，安全和应急方向近相关。",
    "suitableFor": [
      "关注安全工程、应急技术与管理和化工安全的学生。",
      "希望比较应急管理部直属安全类院校的学生。"
    ],
    "reminders": [
      "新设学校招生口径需按当年官方章程核对。",
      "未确认开设弹药工程与爆炸技术本科专业。",
      "分省计划、招生人数、录取分数和就业去向均需待核对。"
    ],
    "links": [
      {
        "title": "华北科技学院官网",
        "type": "学校官网",
        "url": "https://www.ncist.edu.cn/",
        "note": "原华北科技学院官网入口，后续需核对新设应急管理大学官网口径。"
      },
      {
        "title": "教育部关于同意设置应急管理大学的函",
        "type": "其他",
        "url": "https://www.moe.gov.cn/srcsite/A03/s181/202603/t20260319_1431495.html",
        "note": "用于核对新设学校名称和原建制变更。"
      },
      {
        "title": "本科招生信息网",
        "type": "招生网",
        "url": "https://ncist.yz.eol.cn/",
        "note": "招生章程、学校概况和专业介绍入口。"
      },
      {
        "title": "招生章程入口",
        "type": "招生目录",
        "url": "https://ncist.yz.eol.cn/admissions/",
        "note": "需按最新年份核对学校名称、专业和招生规则。"
      },
      {
        "title": "专业介绍入口",
        "type": "招生网",
        "url": "https://ncist.yz.eol.cn/specialshow/",
        "note": "本科招生信息网专业介绍入口。"
      },
      {
        "title": "安全工程学院入口",
        "type": "学院官网",
        "url": "https://safe.ncist.edu.cn/",
        "note": "安全工程相关学院入口。"
      }
    ],
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-06-08",
      "summary": "已核对教育部同意设置应急管理大学文件和原华北科技学院招生入口；新设学校最新官网、招生专业和就业材料仍需复查。",
      "verifiedFields": [
        "教育部文件显示以华北科技学院、防灾科技学院为基础设置应急管理大学",
        "原华北科技学院招生入口提供普通本科招生章程和专业介绍入口",
        "安全工程、应急技术与管理、化工安全等方向存在公开招生线索"
      ],
      "pendingFields": [
        "应急管理大学最新官网和正式招生章程",
        "当年分省分专业招生计划、专业组和选科要求",
        "是否开设弹药工程与爆炸技术本科专业",
        "录取分数、招生人数、就业率和分专业去向"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "已按新设学校口径整理，适合作为应急安全近相关候选继续人工核对。",
      "relevanceLevel": "中",
      "conclusion": "应急管理大学不属于弹药工程直接对应院校，但安全工程、应急技术与管理、化工安全和矿山安全方向与爆炸灾害防治近相关。因学校为新设，后续必须按最新官方招生章程核对专业口径。",
      "keySignals": [
        "教育部文件显示应急管理大学由华北科技学院、防灾科技学院合并设置。",
        "本科招生信息网提供招生章程、学校概况和专业介绍入口。",
        "原华北科技学院办学方向长期围绕应急管理和公共安全。",
        "安全工程学院入口可继续核对安全工程相关本科专业。"
      ],
      "suitableFor": [
        "关注安全工程、应急技术与管理和化工安全的学生。",
        "希望比较应急管理系统安全类院校的学生。"
      ],
      "risks": [
        "新设学校名称、官网和招生专业口径需按最新官方材料复核。",
        "未确认弹药工程与爆炸技术本科招生，不能写成直接相关。",
        "研究生方向、科研平台和应急特色不能替代本科弹药专业证据。",
        "分数线、招生人数、就业率和就业去向均需按官方年度材料复核。"
      ],
      "sources": [
        {
          "title": "教育部关于同意设置应急管理大学的函",
          "type": "其他",
          "date": "2026-01-13",
          "url": "https://www.moe.gov.cn/srcsite/A03/s181/202603/t20260319_1431495.html"
        },
        {
          "title": "华北科技学院官网",
          "type": "学校官网",
          "date": "2026-06-08访问",
          "url": "https://www.ncist.edu.cn/"
        },
        {
          "title": "华北科技学院本科招生信息网",
          "type": "招生网",
          "date": "2026-06-08访问",
          "url": "https://ncist.yz.eol.cn/"
        },
        {
          "title": "华北科技学院招生章程入口",
          "type": "招生目录",
          "date": "2025",
          "url": "https://ncist.yz.eol.cn/admissions/"
        },
        {
          "title": "华北科技学院专业介绍入口",
          "type": "招生网",
          "date": "2026-06-08访问",
          "url": "https://ncist.yz.eol.cn/specialshow/"
        },
        {
          "title": "华北科技学院安全工程学院入口",
          "type": "学院官网",
          "date": "2026-06-08访问",
          "url": "https://safe.ncist.edu.cn/"
        }
      ]
    }
  },
  {
    "id": "xust",
    "name": "西安科技大学",
    "shortName": "西科大",
    "city": "西安",
    "province": "陕西",
    "tier": "普通本科",
    "logo": "/logos/schools/西安科技大学.png",
    "officialUrl": "https://www.xust.edu.cn/",
    "majorUrl": "https://aqxy.xust.edu.cn/rcpy/bkspy/zyjs.htm",
    "focus": "矿山安全、消防工程和应急管理近相关。",
    "tags": [
      "普通本科",
      "西安",
      "安全工程",
      "消防工程",
      "应急管理"
    ],
    "overview": "西安科技大学位于西安，安全工程、消防工程和应急技术与管理方向与工业安全近相关。",
    "suitableFor": [
      "关注矿山安全、消防工程和应急技术的学生。",
      "希望比较安全科学与工程特色院校的学生。"
    ],
    "reminders": [
      "未确认开设弹药工程与爆炸技术本科专业。",
      "安全学科实力不能替代本科弹药专业证据。",
      "分省计划、录取分数和就业去向需按官方年度材料核对。"
    ],
    "links": [
      {
        "title": "西安科技大学官网",
        "type": "学校官网",
        "url": "https://www.xust.edu.cn/",
        "note": "学校主入口。"
      },
      {
        "title": "西安科技大学本科招生信息网",
        "type": "招生网",
        "url": "https://zs.xust.edu.cn/",
        "note": "本科招生章程、计划和学院专业入口。"
      },
      {
        "title": "安全科学与工程学院官网",
        "type": "学院官网",
        "url": "https://aqxy.xust.edu.cn/",
        "note": "安全工程、消防工程、应急技术与管理相关学院入口。"
      },
      {
        "title": "本科专业介绍入口",
        "type": "学院官网",
        "url": "https://aqxy.xust.edu.cn/rcpy/bkspy/zyjs.htm",
        "note": "学院官网本科专业介绍列表。"
      },
      {
        "title": "安全工程专业介绍",
        "type": "学院官网",
        "url": "https://aqxy.xust.edu.cn/default/view/23061614cutx8.html",
        "note": "学院官网安全工程本科专业介绍。"
      },
      {
        "title": "应急技术与管理专业介绍",
        "type": "学院官网",
        "url": "https://aqxy.xust.edu.cn/default/view/23061615Meowb.html",
        "note": "学院官网应急技术与管理本科专业介绍。"
      }
    ],
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-06-08",
      "summary": "已核对学校官网、本科招生网和安全科学与工程学院专业介绍；本科弹药专业、录取和就业数据仍需复查。",
      "verifiedFields": [
        "学校名称、城市、省份、普通本科层次和官网入口",
        "本科招生信息网和安全科学与工程学院入口",
        "学院官网显示安全工程、消防工程、应急技术与管理等本科专业线索"
      ],
      "pendingFields": [
        "是否开设弹药工程与爆炸技术本科专业",
        "当年分省分专业招生计划、专业组和选科要求",
        "近年录取分数线、位次和招生人数",
        "就业质量报告中的分专业去向和行业分布"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "已整理官方入口，适合作为安全工程近相关候选继续人工核对。",
      "relevanceLevel": "中",
      "conclusion": "西安科技大学不属于弹药工程直接对应院校，但安全工程、消防工程、应急技术与管理方向与矿山安全、火灾防控和工业安全近相关。后续清洗时应保留边界，不写弹药本科结论或就业强结论。",
      "keySignals": [
        "本科招生信息网可继续核对章程、计划和学院专业入口。",
        "安全科学与工程学院官网提供本科专业介绍列表。",
        "安全工程专业介绍体现安全工程本科培养口径。",
        "应急技术与管理专业介绍可作为应急安全方向线索。"
      ],
      "suitableFor": [
        "关注矿山安全、消防工程和应急技术的学生。",
        "希望比较安全科学与工程特色院校的学生。"
      ],
      "risks": [
        "未确认弹药工程与爆炸技术本科招生，不能写成直接相关。",
        "学科评估、科研平台和研究方向不能替代本科弹药专业证据。",
        "分数线、招生人数、就业率和就业去向均需按官方年度材料复核。"
      ],
      "sources": [
        {
          "title": "西安科技大学官网",
          "type": "学校官网",
          "date": "2026-06-08访问",
          "url": "https://www.xust.edu.cn/"
        },
        {
          "title": "西安科技大学本科招生信息网",
          "type": "招生网",
          "date": "2026-06-08访问",
          "url": "https://zs.xust.edu.cn/"
        },
        {
          "title": "西安科技大学安全科学与工程学院官网",
          "type": "学院官网",
          "date": "2026-06-08访问",
          "url": "https://aqxy.xust.edu.cn/"
        },
        {
          "title": "西安科技大学安全科学与工程学院本科专业介绍",
          "type": "学院官网",
          "date": "2026-06-08访问",
          "url": "https://aqxy.xust.edu.cn/rcpy/bkspy/zyjs.htm"
        },
        {
          "title": "西安科技大学安全工程专业介绍",
          "type": "学院官网",
          "date": "2023-06-16",
          "url": "https://aqxy.xust.edu.cn/default/view/23061614cutx8.html"
        },
        {
          "title": "西安科技大学应急技术与管理专业介绍",
          "type": "学院官网",
          "date": "2023-06-15",
          "url": "https://aqxy.xust.edu.cn/default/view/23061615Meowb.html"
        }
      ]
    }
  },
  {
    "id": "qust",
    "name": "青岛科技大学",
    "shortName": "青科大",
    "city": "青岛",
    "province": "山东",
    "tier": "普通本科",
    "logo": "/logos/schools/青岛科技大学.png",
    "officialUrl": "https://www.qust.edu.cn/",
    "majorUrl": "https://ha.qust.edu.cn/info/1057/3004.htm",
    "focus": "化工安全、安全工程和应急方向近相关。",
    "tags": [
      "普通本科",
      "青岛",
      "安全工程",
      "化工安全",
      "应急管理"
    ],
    "overview": "青岛科技大学位于青岛，安全工程和应急技术与管理方向与化工安全近相关。",
    "suitableFor": [
      "关注化工安全、安全生产和应急管理的学生。",
      "希望比较山东地区安全工程近相关院校的学生。"
    ],
    "reminders": [
      "未确认开设弹药工程与爆炸技术本科专业。",
      "raw 包相关性写高，清洗时应降为中。",
      "分省计划、录取数据和就业去向需按官方年度材料核对。"
    ],
    "links": [
      {
        "title": "青岛科技大学官网",
        "type": "学校官网",
        "url": "https://www.qust.edu.cn/",
        "note": "学校主入口。"
      },
      {
        "title": "青岛科技大学本科招生信息网",
        "type": "招生网",
        "url": "https://zs.qust.edu.cn/",
        "note": "本科招生章程、计划和录取信息入口。"
      },
      {
        "title": "环境与安全工程学院官网",
        "type": "学院官网",
        "url": "https://ha.qust.edu.cn/",
        "note": "安全工程、环境工程和应急方向相关学院入口。"
      },
      {
        "title": "安全工程专业介绍",
        "type": "学院官网",
        "url": "https://ha.qust.edu.cn/info/1057/3004.htm",
        "note": "学院官网安全工程本科专业介绍。"
      },
      {
        "title": "应急技术与管理专业介绍",
        "type": "学院官网",
        "url": "https://ha.qust.edu.cn/info/1057/3713.htm",
        "note": "学院官网应急技术与管理专业介绍。"
      },
      {
        "title": "学院招生就业入口",
        "type": "学院官网",
        "url": "https://ha.qust.edu.cn/zsjy.htm",
        "note": "学院招生就业和专业宣传入口。"
      }
    ],
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-06-08",
      "summary": "已核对学校官网、本科招生网和环境与安全工程学院专业介绍；本科弹药专业、招生计划、录取和就业数据仍需复查。",
      "verifiedFields": [
        "学校名称、城市、省份、普通本科层次和官网入口",
        "本科招生信息网和环境与安全工程学院入口",
        "学院官网显示安全工程和应急技术与管理专业线索",
        "安全工程专业介绍体现化工安全特色"
      ],
      "pendingFields": [
        "是否开设弹药工程与爆炸技术本科专业",
        "当年分省分专业招生计划、专业组和选科要求",
        "近年录取分数线、位次和招生人数",
        "就业质量报告中的分专业去向和行业分布"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "已整理官方入口，适合作为化工安全近相关候选继续人工核对。",
      "relevanceLevel": "中",
      "conclusion": "青岛科技大学不属于弹药工程直接对应院校，但安全工程和应急技术与管理方向与化工安全、危险化学品事故应急近相关。raw 包相关性偏高，clean 草稿已降为中相关。",
      "keySignals": [
        "本科招生信息网可继续核对章程、计划和录取信息。",
        "环境与安全工程学院官网提供安全工程本科专业介绍。",
        "安全工程专业介绍体现化工安全特色人才培养口径。",
        "应急技术与管理专业介绍体现危险化学品事故应急方向线索。"
      ],
      "suitableFor": [
        "关注化工安全、安全生产和应急管理的学生。",
        "希望比较山东地区安全工程近相关院校的学生。"
      ],
      "risks": [
        "未确认弹药工程与爆炸技术本科招生，不能写成直接相关。",
        "化工安全、应急训练和研究生培养不能替代本科弹药专业证据。",
        "分数线、招生人数、就业率和就业去向均需按官方年度材料复核。"
      ],
      "sources": [
        {
          "title": "青岛科技大学官网",
          "type": "学校官网",
          "date": "2026-06-08访问",
          "url": "https://www.qust.edu.cn/"
        },
        {
          "title": "青岛科技大学本科招生信息网",
          "type": "招生网",
          "date": "2026-06-08访问",
          "url": "https://zs.qust.edu.cn/"
        },
        {
          "title": "青岛科技大学环境与安全工程学院官网",
          "type": "学院官网",
          "date": "2026-06-08访问",
          "url": "https://ha.qust.edu.cn/"
        },
        {
          "title": "青岛科技大学安全工程专业介绍",
          "type": "学院官网",
          "date": "2025",
          "url": "https://ha.qust.edu.cn/info/1057/3004.htm"
        },
        {
          "title": "青岛科技大学应急技术与管理专业介绍",
          "type": "学院官网",
          "date": "2026",
          "url": "https://ha.qust.edu.cn/info/1057/3713.htm"
        },
        {
          "title": "青岛科技大学环境与安全工程学院招生就业入口",
          "type": "学院官网",
          "date": "2026-06-08访问",
          "url": "https://ha.qust.edu.cn/zsjy.htm"
        }
      ]
    }
  },
  {
    "id": "syuct",
    "name": "沈阳化工大学",
    "shortName": "沈化",
    "city": "沈阳",
    "province": "辽宁",
    "tier": "普通本科",
    "logo": "/logos/schools/沈阳化工大学.png",
    "officialUrl": "https://www.syuct.edu.cn/",
    "majorUrl": "https://huanjing.syuct.edu.cn/info/1015/1218.htm",
    "focus": "化工安全、安全工程和防火防爆近相关。",
    "tags": [
      "普通本科",
      "沈阳",
      "化工安全",
      "安全工程",
      "应急管理"
    ],
    "overview": "沈阳化工大学位于沈阳，安全工程专业以化工安全和防火防爆方向近相关。",
    "suitableFor": [
      "关注化工过程安全、防火防爆和应急管理的学生。",
      "希望比较辽宁地区化工安全近相关院校的学生。"
    ],
    "reminders": [
      "未确认开设弹药工程与爆炸技术本科专业。",
      "raw 包双一流口径需删除，正式层次写普通本科。",
      "分省计划、录取数据和就业去向需按官方年度材料核对。"
    ],
    "links": [
      {
        "title": "沈阳化工大学官网",
        "type": "学校官网",
        "url": "https://www.syuct.edu.cn/",
        "note": "学校主入口。"
      },
      {
        "title": "沈阳化工大学招生信息网",
        "type": "招生网",
        "url": "https://zhaosheng.syuct.edu.cn/",
        "note": "本科招生公告和招生信息入口。"
      },
      {
        "title": "环境与安全工程学院官网",
        "type": "学院官网",
        "url": "https://huanjing.syuct.edu.cn/",
        "note": "安全工程和环境工程相关学院入口。"
      },
      {
        "title": "安全工程专业介绍",
        "type": "学院官网",
        "url": "https://huanjing.syuct.edu.cn/info/1015/1218.htm",
        "note": "学院官网安全工程本科专业介绍。"
      },
      {
        "title": "本科教育入口",
        "type": "学院官网",
        "url": "https://huanjing.syuct.edu.cn/rcpy/bkjy/1.htm",
        "note": "学院官网本科教育和培养方案入口。"
      },
      {
        "title": "教学质量信息入口",
        "type": "教学质量报告",
        "url": "https://www.syuct.edu.cn/xxgk/jxzlxx.htm",
        "note": "学校信息公开网本科教学质量报告入口。"
      }
    ],
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-06-08",
      "summary": "已核对学校官网、招生信息网和环境与安全工程学院安全工程专业介绍；本科弹药专业、录取和就业数据仍需复查。",
      "verifiedFields": [
        "学校名称、城市、省份、普通本科层次和官网入口",
        "招生信息网、环境与安全工程学院和安全工程专业介绍入口",
        "安全工程专业介绍体现化工安全、防火防爆等培养线索"
      ],
      "pendingFields": [
        "是否开设弹药工程与爆炸技术本科专业",
        "当年分省分专业招生计划、专业组和选科要求",
        "近年录取分数线、位次和招生人数",
        "就业质量报告中的分专业去向和行业分布"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "已整理官方入口，适合作为化工安全近相关候选继续人工核对。",
      "relevanceLevel": "中",
      "conclusion": "沈阳化工大学不属于弹药工程直接对应院校，但安全工程专业以化工安全为特色，涉及防火防爆、化工过程安全和职业卫生等近相关内容。后续只能写近相关，不写弹药本科结论或就业强结论。",
      "keySignals": [
        "招生信息网可继续核对本科招生公告和计划。",
        "环境与安全工程学院官网提供安全工程专业介绍。",
        "安全工程专业介绍体现化工安全、防火防爆和化工过程安全口径。",
        "教学质量信息入口可用于后续核对本科教学公开材料。"
      ],
      "suitableFor": [
        "关注化工过程安全、防火防爆和应急管理的学生。",
        "希望比较辽宁地区化工安全近相关院校的学生。"
      ],
      "risks": [
        "未确认弹药工程与爆炸技术本科招生，不能写成直接相关。",
        "化工特色和课程名不能替代本科弹药专业证据。",
        "分数线、招生人数、就业率和就业去向均需按官方年度材料复核。"
      ],
      "sources": [
        {
          "title": "沈阳化工大学官网",
          "type": "学校官网",
          "date": "2026-06-08访问",
          "url": "https://www.syuct.edu.cn/"
        },
        {
          "title": "沈阳化工大学招生信息网",
          "type": "招生网",
          "date": "2026-06-08访问",
          "url": "https://zhaosheng.syuct.edu.cn/"
        },
        {
          "title": "沈阳化工大学环境与安全工程学院官网",
          "type": "学院官网",
          "date": "2026-06-08访问",
          "url": "https://huanjing.syuct.edu.cn/"
        },
        {
          "title": "沈阳化工大学安全工程专业介绍",
          "type": "学院官网",
          "date": "2020-06-09",
          "url": "https://huanjing.syuct.edu.cn/info/1015/1218.htm"
        },
        {
          "title": "沈阳化工大学环境与安全工程学院本科教育入口",
          "type": "学院官网",
          "date": "2026-06-08访问",
          "url": "https://huanjing.syuct.edu.cn/rcpy/bkjy/1.htm"
        },
        {
          "title": "沈阳化工大学教学质量信息入口",
          "type": "教学质量报告",
          "date": "2026-06-08访问",
          "url": "https://www.syuct.edu.cn/xxgk/jxzlxx.htm"
        }
      ]
    }
  },
  {
    "id": "upc",
    "name": "中国石油大学（华东）",
    "shortName": "中石大华东",
    "city": "青岛",
    "province": "山东",
    "tier": "211",
    "logo": "/logos/schools/中国石油大学（华东）.png",
    "officialUrl": "https://www.upc.edu.cn/",
    "majorUrl": "https://cmee.upc.edu.cn/2024/0308/c21298a424824/page.htm",
    "focus": "油气化工安全和安全工程近相关。",
    "tags": [
      "211",
      "双一流",
      "青岛",
      "安全工程",
      "油气安全"
    ],
    "overview": "中国石油大学（华东）位于青岛，安全工程方向与油气化工安全近相关。",
    "suitableFor": [
      "关注油气化工安全、安全评价和应急处置的学生。",
      "希望比较能源行业背景安全工程院校的学生。"
    ],
    "reminders": [
      "未确认开设弹药工程与爆炸技术本科专业。",
      "课程或学科方向不能替代本科弹药专业证据。",
      "分省计划、招生人数、录取分数和就业去向均需待核对。"
    ],
    "links": [
      {
        "title": "中国石油大学（华东）官网",
        "type": "学校官网",
        "url": "https://www.upc.edu.cn/",
        "note": "学校主入口。"
      },
      {
        "title": "本科招生网",
        "type": "招生网",
        "url": "https://zhaosheng.upc.edu.cn/",
        "note": "本科招生章程、计划和专业信息入口。"
      },
      {
        "title": "机电工程学院官网",
        "type": "学院官网",
        "url": "https://cmee.upc.edu.cn/",
        "note": "安全工程所在学院入口。"
      },
      {
        "title": "机电工程学院招生专业页",
        "type": "学院官网",
        "url": "https://cmee.upc.edu.cn/21298/list.htm",
        "note": "学院招生专业入口。"
      },
      {
        "title": "安全工程专业简介",
        "type": "学院官网",
        "url": "https://cmee.upc.edu.cn/2024/0308/c21298a424824/page.htm",
        "note": "学院官网安全工程本科专业介绍。"
      },
      {
        "title": "本科教学质量报告入口",
        "type": "教学质量报告",
        "url": "https://xxgk.upc.edu.cn/3276/list.htm",
        "note": "用于后续核对本科教学质量公开材料。"
      }
    ],
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-06-08",
      "summary": "已核对学校官网、本科招生网、机电工程学院和安全工程专业介绍；本科弹药专业、招生计划、录取和就业数据仍需复查。",
      "verifiedFields": [
        "学校名称、城市、省份、211层次和官网入口",
        "本科招生网、机电工程学院和安全工程专业介绍入口",
        "安全工程专业介绍体现油气、化工等行业安全培养口径"
      ],
      "pendingFields": [
        "是否开设弹药工程与爆炸技术本科专业",
        "当年分省分专业招生计划、专业组和选科要求",
        "近年录取分数线、位次和招生人数",
        "就业质量报告中的分专业去向和行业分布"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "已整理官方入口，适合作为油气化工安全近相关候选继续人工核对。",
      "relevanceLevel": "中",
      "conclusion": "中国石油大学（华东）不属于弹药工程直接对应院校，但安全工程专业与油气、化工安全管理、安全评价和应急处置近相关。后续可作为能源行业安全工程候选人工确认，不能写成弹药工程本科招生。",
      "keySignals": [
        "本科招生网可继续核对章程、计划和专业信息。",
        "机电工程学院官网提供安全工程所在学院入口。",
        "安全工程专业简介体现油气、化工等行业安全培养口径。",
        "本科教学质量报告入口可用于后续核对本科教学公开材料。"
      ],
      "suitableFor": [
        "关注油气化工安全、安全评价和应急处置的学生。",
        "希望比较能源行业背景安全工程院校的学生。"
      ],
      "risks": [
        "未确认弹药工程与爆炸技术本科招生，不能写成直接相关。",
        "课程名、学科评估和能源特色不能替代本科弹药专业证据。",
        "分数线、招生人数、就业率和就业去向均需按官方年度材料复核。"
      ],
      "sources": [
        {
          "title": "中国石油大学（华东）官网",
          "type": "学校官网",
          "date": "2026-06-08访问",
          "url": "https://www.upc.edu.cn/"
        },
        {
          "title": "中国石油大学（华东）本科招生网",
          "type": "招生网",
          "date": "2026-06-08访问",
          "url": "https://zhaosheng.upc.edu.cn/"
        },
        {
          "title": "中国石油大学（华东）机电工程学院官网",
          "type": "学院官网",
          "date": "2026-06-08访问",
          "url": "https://cmee.upc.edu.cn/"
        },
        {
          "title": "中国石油大学（华东）机电工程学院招生专业页",
          "type": "学院官网",
          "date": "2026-06-08访问",
          "url": "https://cmee.upc.edu.cn/21298/list.htm"
        },
        {
          "title": "中国石油大学（华东）安全工程专业简介",
          "type": "学院官网",
          "date": "2024-03-08",
          "url": "https://cmee.upc.edu.cn/2024/0308/c21298a424824/page.htm"
        },
        {
          "title": "中国石油大学（华东）本科教学质量报告入口",
          "type": "教学质量报告",
          "date": "2024",
          "url": "https://xxgk.upc.edu.cn/3276/list.htm"
        }
      ]
    }
  },
  {
    "id": "bipt",
    "name": "北京石油化工学院",
    "shortName": "北石化",
    "city": "北京",
    "province": "北京",
    "tier": "普通本科",
    "logo": "/logos/schools/北京石油化工学院.png",
    "officialUrl": "https://www.bipt.edu.cn/",
    "majorUrl": "https://www.bipt.edu.cn/pub/aqgcxy/bksjy/zyjs/240326.htm",
    "focus": "危化品安全、城市安全和应急管理近相关。",
    "tags": [
      "普通本科",
      "北京",
      "安全工程",
      "危化品安全",
      "应急管理"
    ],
    "overview": "北京石油化工学院位于北京，安全工程专业与危化品安全和城市安全近相关。",
    "suitableFor": [
      "关注危险化学品安全、城市安全和应急管理的学生。",
      "希望比较北京地区安全工程近相关院校的学生。"
    ],
    "reminders": [
      "未确认开设弹药工程与爆炸技术本科专业。",
      "研究方向和科研平台不能替代本科弹药专业证据。",
      "分省计划、招生人数、录取分数和就业去向均需待核对。"
    ],
    "links": [
      {
        "title": "北京石油化工学院官网",
        "type": "学校官网",
        "url": "https://www.bipt.edu.cn/",
        "note": "学校主入口。"
      },
      {
        "title": "本科招生入口",
        "type": "招生网",
        "url": "https://www.bipt.edu.cn/zsjy/bkszs/index.htm",
        "note": "本科招生信息入口。"
      },
      {
        "title": "安全工程学院官网",
        "type": "学院官网",
        "url": "https://www.bipt.edu.cn/pub/aqgcxy/xygk/index.htm",
        "note": "安全工程学院概况入口。"
      },
      {
        "title": "安全工程专业介绍",
        "type": "学院官网",
        "url": "https://www.bipt.edu.cn/pub/aqgcxy/bksjy/zyjs/240326.htm",
        "note": "学院官网本科安全工程专业介绍。"
      },
      {
        "title": "安全工程本科专业培养方案",
        "type": "其他",
        "url": "https://www.bipt.edu.cn/pub/jwc/docs/2025-11/65b9072a9db849509b3164d7f9160b65.pdf",
        "note": "本科培养方案 PDF，后续人工核对课程和培养口径。"
      },
      {
        "title": "安全工程学院招生就业入口",
        "type": "学院官网",
        "url": "https://www.bipt.edu.cn/pub/aqgcxy/zsjy/index.htm",
        "note": "学院招生就业和专业宣传入口。"
      }
    ],
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-06-08",
      "summary": "已核对学校官网、本科招生入口、安全工程学院和安全工程专业介绍；本科弹药专业、招生计划、录取和就业数据仍需复查。",
      "verifiedFields": [
        "学校名称、城市、省份、普通本科层次和官网入口",
        "本科招生入口、安全工程学院和安全工程专业介绍入口",
        "安全工程专业介绍体现城市公共安全、化学品安全和职业安全健康培养口径"
      ],
      "pendingFields": [
        "是否开设弹药工程与爆炸技术本科专业",
        "当年分省分专业招生计划、专业组和选科要求",
        "近年录取分数线、位次和招生人数",
        "就业质量报告中的分专业去向和行业分布"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "已整理官方入口，适合作为危化品安全近相关候选继续人工核对。",
      "relevanceLevel": "中",
      "conclusion": "北京石油化工学院不属于弹药工程直接对应院校，但安全工程专业与城市公共安全、化学品安全和职业安全健康近相关。后续可作为危化品安全和城市安全候选人工确认，不能写成弹药工程本科招生。",
      "keySignals": [
        "本科招生入口可继续核对招生章程、计划和专业信息。",
        "安全工程学院官网显示安全工程本科办学入口。",
        "安全工程专业介绍体现城市公共安全、化学品安全和职业安全健康方向。",
        "本科培养方案可用于后续核对课程和培养要求。"
      ],
      "suitableFor": [
        "关注危险化学品安全、城市安全和应急管理的学生。",
        "希望比较北京地区安全工程近相关院校的学生。"
      ],
      "risks": [
        "未确认弹药工程与爆炸技术本科招生，不能写成直接相关。",
        "爆炸安全研究、科研平台和专业认证新闻不能替代本科弹药专业证据。",
        "分数线、招生人数、就业率和就业去向均需按官方年度材料复核。"
      ],
      "sources": [
        {
          "title": "北京石油化工学院官网",
          "type": "学校官网",
          "date": "2026-06-08访问",
          "url": "https://www.bipt.edu.cn/"
        },
        {
          "title": "北京石油化工学院本科招生入口",
          "type": "招生网",
          "date": "2026-06-08访问",
          "url": "https://www.bipt.edu.cn/zsjy/bkszs/index.htm"
        },
        {
          "title": "北京石油化工学院安全工程学院官网",
          "type": "学院官网",
          "date": "2026-06-08访问",
          "url": "https://www.bipt.edu.cn/pub/aqgcxy/xygk/index.htm"
        },
        {
          "title": "北京石油化工学院安全工程专业介绍",
          "type": "学院官网",
          "date": "2019-12-30",
          "url": "https://www.bipt.edu.cn/pub/aqgcxy/bksjy/zyjs/240326.htm"
        },
        {
          "title": "北京石油化工学院安全工程本科专业培养方案",
          "type": "其他",
          "date": "2025",
          "url": "https://www.bipt.edu.cn/pub/jwc/docs/2025-11/65b9072a9db849509b3164d7f9160b65.pdf"
        },
        {
          "title": "北京石油化工学院安全工程学院招生就业入口",
          "type": "学院官网",
          "date": "2026-06-08访问",
          "url": "https://www.bipt.edu.cn/pub/aqgcxy/zsjy/index.htm"
        }
      ]
    }
  },
  {
    "id": "njtech",
    "name": "南京工业大学",
    "shortName": "南工",
    "city": "南京",
    "province": "江苏",
    "tier": "普通本科",
    "logo": "/logos/schools/南京工业大学.png",
    "officialUrl": "https://www.njtech.edu.cn/",
    "majorUrl": "https://cces.njtech.edu.cn/info/1032/4725.htm",
    "focus": "化工安全、安全工程和消防工程近相关。",
    "tags": [
      "普通本科",
      "南京",
      "安全工程",
      "消防工程",
      "化工安全"
    ],
    "overview": "南京工业大学位于南京，安全工程、消防工程和化工安全工程方向近相关。",
    "suitableFor": [
      "关注化工安全、危险化学品安全和消防工程的学生。",
      "希望比较江苏地区安全工程近相关院校的学生。"
    ],
    "reminders": [
      "未确认开设弹药工程与爆炸技术本科专业。",
      "研究生方向和学科评估不能替代本科专业证据。",
      "分省计划、招生人数、录取分数和就业去向均需待核对。"
    ],
    "links": [
      {
        "title": "南京工业大学官网",
        "type": "学校官网",
        "url": "https://www.njtech.edu.cn/",
        "note": "学校主入口。"
      },
      {
        "title": "本科招生网",
        "type": "招生网",
        "url": "https://zhaosheng.njtech.edu.cn/",
        "note": "本科招生章程、计划和专业信息入口。"
      },
      {
        "title": "安全科学与工程学院官网",
        "type": "学院官网",
        "url": "https://cces.njtech.edu.cn/",
        "note": "安全工程、消防工程相关学院入口。"
      },
      {
        "title": "安全工程专业培养方案",
        "type": "学院官网",
        "url": "https://cces.njtech.edu.cn/info/1032/4725.htm",
        "note": "学院官网 2025 级安全工程专业培养方案。"
      },
      {
        "title": "化工安全工程专业介绍",
        "type": "学院官网",
        "url": "https://hgy.njtech.edu.cn/info/1019/3713.htm",
        "note": "化工学院官网化工安全工程本科专业介绍。"
      },
      {
        "title": "新增本科专业通知",
        "type": "新闻资料",
        "url": "https://www.njtech.edu.cn/info/1081/4621886.htm",
        "note": "学校官网新增化工安全工程等本科专业通知。"
      }
    ],
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-06-08",
      "summary": "已核对学校官网、本科招生入口、安全学院和化工安全工程专业介绍；本科弹药专业、录取和就业数据仍需复查。",
      "verifiedFields": [
        "学校名称、城市、省份、普通本科层次和官网入口",
        "本科招生网、安全科学与工程学院和安全工程培养方案入口",
        "学校官网新增化工安全工程本科专业线索",
        "化工学院官网存在化工安全工程专业介绍"
      ],
      "pendingFields": [
        "是否开设弹药工程与爆炸技术本科专业",
        "当年分省分专业招生计划、专业组和选科要求",
        "近年录取分数线、位次和招生人数",
        "就业质量报告中的分专业去向和行业分布"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "已补充本科层面官方证据，可作为化工安全近相关候选继续人工核对。",
      "relevanceLevel": "中",
      "conclusion": "南京工业大学不属于弹药工程直接对应院校，但安全工程、消防工程和化工安全工程方向与危险化学品安全、燃烧爆炸理论近相关。后续只能写安全工程近相关，不写弹药本科结论。",
      "keySignals": [
        "本科招生网可继续核对章程、计划和专业信息。",
        "安全科学与工程学院官网提供安全工程培养方案入口。",
        "安全工程培养方案包含危险化学品安全、化工过程安全和燃烧与爆炸理论等课程线索。",
        "学校官网和化工学院官网提供化工安全工程本科专业线索。"
      ],
      "suitableFor": [
        "关注化工安全、危险化学品安全和消防工程的学生。",
        "希望比较江苏地区安全工程近相关院校的学生。"
      ],
      "risks": [
        "未确认弹药工程与爆炸技术本科招生，不能写成直接相关。",
        "研究生招生目录、学科评估和科研平台不能替代本科弹药专业证据。",
        "分数线、招生人数、就业率和就业去向均需按官方年度材料复核。"
      ],
      "sources": [
        {
          "title": "南京工业大学官网",
          "type": "学校官网",
          "date": "2026-06-08访问",
          "url": "https://www.njtech.edu.cn/"
        },
        {
          "title": "南京工业大学本科招生网",
          "type": "招生网",
          "date": "2026-06-08访问",
          "url": "https://zhaosheng.njtech.edu.cn/"
        },
        {
          "title": "南京工业大学安全科学与工程学院官网",
          "type": "学院官网",
          "date": "2026-06-08访问",
          "url": "https://cces.njtech.edu.cn/"
        },
        {
          "title": "南京工业大学安全工程专业2025级培养方案",
          "type": "学院官网",
          "date": "2025",
          "url": "https://cces.njtech.edu.cn/info/1032/4725.htm"
        },
        {
          "title": "南京工业大学化工安全工程专业介绍",
          "type": "学院官网",
          "date": "2022",
          "url": "https://hgy.njtech.edu.cn/info/1019/3713.htm"
        },
        {
          "title": "南京工业大学新增10个本科专业",
          "type": "新闻资料",
          "date": "2022",
          "url": "https://www.njtech.edu.cn/info/1081/4621886.htm"
        }
      ]
    }
  },
  {
    "id": "nudt",
    "name": "国防科技大学",
    "shortName": "国防科大",
    "city": "长沙",
    "province": "湖南",
    "tier": "985 / 211",
    "logo": "/logos/schools/国防科技大学.png",
    "officialUrl": "https://www.nudt.edu.cn/",
    "majorUrl": "https://www.nudt.edu.cn/bkzs/yxzy/lxy1/index.htm",
    "focus": "武器系统、导弹工程和信息对抗近相关。",
    "tags": [
      "985",
      "211",
      "双一流",
      "军校",
      "武器系统"
    ],
    "overview": "国防科技大学位于长沙，本科招生口径含武器系统与工程等军工装备方向。",
    "suitableFor": [
      "关注武器系统、导弹工程和国防科技方向的学生。",
      "能接受军校政治考核、体检和服役要求的学生。"
    ],
    "reminders": [
      "军校招生口径特殊，须以当年本科招生网、招生计划和省级招办信息为准。",
      "武器系统与工程不能写成弹药工程与爆炸技术本科。",
      "分数线、招生人数、就业去向和服役安排均需按官方年度材料复核。"
    ],
    "links": [
      {
        "title": "国防科技大学官网",
        "type": "学校官网",
        "url": "https://www.nudt.edu.cn/",
        "note": "学校主入口。"
      },
      {
        "title": "国防科技大学本科招生网",
        "type": "招生网",
        "url": "https://www.nudt.edu.cn/bkzs/",
        "note": "本科招生信息、院系专业和信息公开入口。"
      },
      {
        "title": "理学院专业页",
        "type": "学院官网",
        "url": "https://www.nudt.edu.cn/bkzs/yxzy/lxy1/index.htm",
        "note": "学院页面列出武器系统与工程等本科专业。"
      },
      {
        "title": "理学院生长军官本科学员专业介绍",
        "type": "招生网",
        "url": "https://www.nudt.edu.cn/bkzs/yxzy/lxy1/scjgbkxylxy/07cf0934c7f54957a479376e3de6eb8c.htm",
        "note": "官方本科专业介绍，支撑武器系统与工程口径。"
      },
      {
        "title": "选考科目要求",
        "type": "招生目录",
        "url": "https://www.nudt.edu.cn/bkzs/yxzy/xkkmyq/index.htm",
        "note": "2025年选考科目页面列出武器系统与工程、导弹工程、信息对抗技术等专业。"
      },
      {
        "title": "信息公开专业相关入口",
        "type": "招生网",
        "url": "https://www.nudt.edu.cn/bkzs/xxgk/zyxg/index.htm",
        "note": "招生简章、招生计划、录取分数、选考科目等官方入口。"
      }
    ],
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-06-08",
      "summary": "已核对学校官网、本科招生网、理学院页面、武器系统与工程专业介绍和选考科目入口；军校招生计划、分省名额和录取口径仍需逐年复查。",
      "verifiedFields": [
        "学校名称、官网、本科招生网和长沙校址线索",
        "理学院页面列出武器系统与工程本科专业",
        "理学院生长军官本科学员专业介绍支撑武器系统与工程培养口径",
        "选考科目页面列出武器系统与工程、导弹工程、信息对抗技术等专业",
        "招生网信息公开入口提供招生简章、计划、录取分数和选考科目入口"
      ],
      "pendingFields": [
        "当年各省招生计划、招考方向和性别限制",
        "政治考核、体检标准、军籍/无军籍口径",
        "录取分数线、招生人数和选科要求",
        "毕业分配、服役安排和就业去向",
        "武器系统与工程当年是否在目标省份招生"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "已清洗旧 raw，保留本科武器系统与工程等兵器强近相关证据，不写弹药本科结论。",
      "relevanceLevel": "中",
      "conclusion": "国防科技大学不属于弹药工程直接对应院校，但本科招生网和理学院页面可核到武器系统与工程，选考科目页面还列出导弹工程、信息对抗技术等方向。可作为军工装备强近相关院校，军校招生计划、体检政审和分省录取均需待核对。",
      "keySignals": [
        "理学院页面列出武器系统与工程本科专业。",
        "武器系统与工程专业介绍涉及爆炸与冲击动力学、武器系统发射、飞行弹道等内容。",
        "选考科目页面列出武器系统与工程，科目要求为物理、化学。",
        "选考科目页面还列出导弹工程、信息对抗技术等军工装备相关专业。",
        "招生网信息公开入口提供招生简章、计划、录取分数和选考科目入口。"
      ],
      "suitableFor": [
        "关注武器系统、导弹工程和国防装备方向的学生。",
        "能接受军校招生、体检、政审和服役要求的学生。"
      ],
      "risks": [
        "不能把武器系统与工程写成弹药工程与爆炸技术本科。",
        "军校招生计划、招考方向、性别限制和体检标准每年可能调整。",
        "分数线、招生人数、就业去向和服役安排均需按官方年度材料复核。",
        "生长军官本科学员和无军籍地方本科生口径必须分开核对。",
        "若目标省份当年不投放相关专业计划，则不能作为报考入口。"
      ],
      "sources": [
        {
          "title": "国防科技大学官网",
          "type": "学校官网",
          "date": "2026-06-08访问",
          "url": "https://www.nudt.edu.cn/"
        },
        {
          "title": "国防科技大学本科招生网",
          "type": "招生网",
          "date": "2026-06-08访问",
          "url": "https://www.nudt.edu.cn/bkzs/"
        },
        {
          "title": "国防科技大学本科招生网理学院页面",
          "type": "学院官网",
          "date": "2026-05-26",
          "url": "https://www.nudt.edu.cn/bkzs/yxzy/lxy1/index.htm"
        },
        {
          "title": "国防科技大学生长军官本科学员专业介绍（理学院）",
          "type": "招生网",
          "date": "2024-05-31",
          "url": "https://www.nudt.edu.cn/bkzs/yxzy/lxy1/scjgbkxylxy/07cf0934c7f54957a479376e3de6eb8c.htm"
        },
        {
          "title": "国防科技大学选考科目要求",
          "type": "招生目录",
          "date": "2025-07-18",
          "url": "https://www.nudt.edu.cn/bkzs/yxzy/xkkmyq/index.htm"
        },
        {
          "title": "国防科技大学本科招生信息公开专业相关入口",
          "type": "招生网",
          "date": "2026-06-08访问",
          "url": "https://www.nudt.edu.cn/bkzs/xxgk/zyxg/index.htm"
        }
      ]
    }
  },
  {
    "id": "nue",
    "name": "海军工程大学",
    "shortName": "海工大",
    "city": "武汉",
    "province": "湖北",
    "tier": "普通本科",
    "logo": "/logos/schools/海军工程大学.png",
    "officialUrl": "https://www.nue.edu.cn/",
    "majorUrl": "https://www.nue.edu.cn/cover-8k08f4q9/wuqixitongyugongcheng",
    "focus": "舰艇武器系统和水中兵器近相关。",
    "tags": [
      "军校",
      "武汉",
      "武器系统",
      "水中兵器",
      "海军装备"
    ],
    "overview": "海军工程大学位于武汉，本科专业页列出武器系统与工程。",
    "suitableFor": [
      "关注舰艇武器系统、水中兵器和海军装备方向的学生。",
      "能接受军校政治考核、体检和服役要求的学生。"
    ],
    "reminders": [
      "军校招生政策、体检标准和分省计划必须按当年官方入口核对。",
      "武器系统与工程属于兵器强近相关，不能写成弹药工程本科。",
      "录取分数、招生人数和毕业去向均需保留待核对边界。"
    ],
    "links": [
      {
        "title": "海军工程大学官网",
        "type": "学校官网",
        "url": "https://www.nue.edu.cn/",
        "note": "学校和招生信息主入口。"
      },
      {
        "title": "海军工程大学专业介绍入口",
        "type": "招生网",
        "url": "https://www.nue.edu.cn/list-4xnh77go/zhuanyejieshao/1/10",
        "note": "本科专业介绍列表入口。"
      },
      {
        "title": "武器系统与工程专业页",
        "type": "招生网",
        "url": "https://www.nue.edu.cn/cover-8k08f4q9/wuqixitongyugongcheng",
        "note": "官方专业页列出 082101 武器系统与工程、本科学制四年、授工学学士。"
      },
      {
        "title": "本科招生简章入口",
        "type": "招生目录",
        "url": "https://www.nue.edu.cn/list-71gms6m0/benkezhaoshengjianzhang/1/10",
        "note": "本科招生简章和专业介绍等官方入口。"
      },
      {
        "title": "招生政策入口",
        "type": "招生网",
        "url": "https://www.nue.edu.cn/list-c64365re/zhaoshengzhengce/1/10",
        "note": "军校招生政策、政治考核等信息入口。"
      },
      {
        "title": "招生计划入口",
        "type": "招生目录",
        "url": "https://www.nue.edu.cn/list-5wiw1pef/zhaoshengjihua/1/10",
        "note": "招生计划列表入口，分省计划需逐年核对。"
      }
    ],
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-06-08",
      "summary": "已核对学校官网、专业介绍入口、武器系统与工程专业页、本科招生简章、招生政策和招生计划入口；军校招生限制和分省计划需逐年复查。",
      "verifiedFields": [
        "学校名称、官网和武汉校址线索",
        "官方专业页列出 082101 武器系统与工程",
        "专业页说明本科学制四年，授予工学学士学位",
        "专业页说明培养舰艇水中兵器初级技术军官",
        "本科招生简章、招生政策、招生计划入口可核对年度招生口径"
      ],
      "pendingFields": [
        "当年分省招生计划、性别限制和招考方向",
        "政治考核、体检标准和军校报考政策",
        "录取分数线、招生人数和专业投放省份",
        "毕业分配、服役安排和就业去向",
        "武器系统与工程当年是否在目标省份招生"
      ]
    },
    "research": {
      "updatedAt": "2026-06-08",
      "status": "已清洗旧 raw，保留本科武器系统与工程强近相关证据，不写弹药本科结论。",
      "relevanceLevel": "中",
      "conclusion": "海军工程大学不属于弹药工程直接对应院校，但官方专业页列出 082101 武器系统与工程，本科学制四年，培养舰艇水中兵器初级技术军官。可作为海军装备和水中兵器强近相关院校，分省计划、体检政审和录取口径需待核对。",
      "keySignals": [
        "官方专业页列出 082101 武器系统与工程。",
        "专业页写明本科学制四年，授予工学学士学位。",
        "专业页说明培养舰艇水中兵器初级技术军官。",
        "课程线索包含武器装备系统工程、精确制导原理、兵器动力与推进原理等。",
        "招生网站提供本科招生简章、招生政策和招生计划入口。"
      ],
      "suitableFor": [
        "关注舰艇武器系统、水中兵器和海军装备方向的学生。",
        "能接受军校招生、体检、政审和服役要求的学生。"
      ],
      "risks": [
        "不能把武器系统与工程写成弹药工程与爆炸技术本科。",
        "军校招生计划、性别限制、体检标准和政治考核要求每年可能调整。",
        "录取分数、招生人数、专业投放省份和毕业去向需按官方年度材料复核。",
        "专业页支撑本科专业存在，不代表所有省份当年都有招生计划。",
        "军校毕业去向和服役安排不能按普通高校就业口径理解。"
      ],
      "sources": [
        {
          "title": "海军工程大学官网",
          "type": "学校官网",
          "date": "2026-06-08访问",
          "url": "https://www.nue.edu.cn/"
        },
        {
          "title": "海军工程大学专业介绍入口",
          "type": "招生网",
          "date": "2026-06-08访问",
          "url": "https://www.nue.edu.cn/list-4xnh77go/zhuanyejieshao/1/10"
        },
        {
          "title": "海军工程大学武器系统与工程专业页",
          "type": "招生网",
          "date": "2025-06-12",
          "url": "https://www.nue.edu.cn/cover-8k08f4q9/wuqixitongyugongcheng"
        },
        {
          "title": "海军工程大学本科招生简章入口",
          "type": "招生目录",
          "date": "2026-06-08访问",
          "url": "https://www.nue.edu.cn/list-71gms6m0/benkezhaoshengjianzhang/1/10"
        },
        {
          "title": "海军工程大学招生政策入口",
          "type": "招生网",
          "date": "2026-06-08访问",
          "url": "https://www.nue.edu.cn/list-c64365re/zhaoshengzhengce/1/10"
        },
        {
          "title": "海军工程大学招生计划入口",
          "type": "招生目录",
          "date": "2026-06-08访问",
          "url": "https://www.nue.edu.cn/list-5wiw1pef/zhaoshengjihua/1/10"
        }
      ]
    }
  },
  {
    "id": "ustc",
    "name": "中国科学技术大学",
    "shortName": "中科大",
    "city": "合肥",
    "province": "安徽",
    "tier": "985 / 211",
    "logo": "/logos/schools/中国科学技术大学.png",
    "officialUrl": "https://www.ustc.edu.cn/",
    "majorUrl": "https://sklfs.ustc.edu.cn/2025/0606/c5825a687065/page.htm",
    "focus": "火灾爆炸动力学与安全科学高相关。",
    "tags": [
      "985",
      "211",
      "双一流",
      "合肥",
      "火灾爆炸",
      "安全科学"
    ],
    "overview": "中国科学技术大学位于合肥，火灾科学国家重点实验室在爆炸与火灾安全领域全球顶尖。",
    "suitableFor": [
      "关注火灾科学、爆炸动力学及高精尖科研的学生。",
      "希望在安全科学与工程领域继续读研深造的学生。"
    ],
    "reminders": [
      "未开设弹药工程与爆炸技术本科专业，以安全工程及考研方向高相关报考。",
      "火灾与爆炸动力学课程不作为本科弹药工程对应，主要面向高水平研招。",
      "分省招生人数和各省位次需按招生章程核对。"
    ],
    "links": [
      {
        "title": "中国科学技术大学官网",
        "type": "学校官网",
        "url": "https://www.ustc.edu.cn/",
        "note": "学校主入口。"
      },
      {
        "title": "火灾科学国家重点实验室2026年研招科目通告",
        "type": "研究生招生",
        "url": "https://sklfs.ustc.edu.cn/2025/0606/c5825a687065/page.htm",
        "note": "包含安全科学与工程等专业硕士报考科目调整细节。"
      },
      {
        "title": "安全科学与工程系博士招生简章",
        "type": "研究生招生",
        "url": "https://safetyse.ustc.edu.cn/2024/1214/c4546a665348/page.htm",
        "note": "系部官方网站，提供研究生与博士层次培养点线索。"
      },
      {
        "title": "肖华华教授导师主页",
        "type": "其他",
        "url": "https://faculty.ustc.edu.cn/xiaohuahua/zh_CN/index.htm",
        "note": "导师介绍及火灾爆炸动力学、爆燃转爆轰研究团队方向。"
      }
    ],
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-06-10",
      "summary": "已核对高校官网、二级学院系部页面和学术团队方向；本科及研招计划、分数位次待复核。",
      "verifiedFields": [
        "学校全称",
        "地理位置",
        "层级属性",
        "研究生招生及特色课程线索"
      ],
      "pendingFields": [
        "是否包含直接本科弹药工程方向",
        "分省招生计划与专业组划分",
        "近三年实际录取分数线",
        "毕业生精确去向报告"
      ]
    },
    "research": {
      "updatedAt": "2026-06-10",
      "status": "已整理官方学术及培养入口，适合作为爆炸力学或工业防爆近相关/跨考参考。",
      "relevanceLevel": "中",
      "conclusion": "中国科学技术大学在火灾爆炸与安全科学研究及安全工程培养方向上具备深厚底蕴。不属于直接开设弹药工程本科的学校，但其研究生方向、国家重点平台等在爆炸、冲击、工业防爆领域高相关，适合作为优质考研与跨考参考。",
      "keySignals": [
        "拥有高水平的安全科学与工程或力学学科背景。",
        "拥有官方研招大纲或学院系部介绍佐证。",
        "导师团队在爆炸动力学或防爆防灾领域具备学术声誉。"
      ],
      "suitableFor": [
        "关注火灾科学、爆炸动力学及高精尖科研的学生。",
        "希望在安全科学与工程领域继续读研深造的学生。"
      ],
      "risks": [
        "不能误读成本科直接对应的弹药工程与爆炸技术专业。",
        "招生人数、分数位次及教学报告需以后续每年官方发布的最新文件为准。",
        "研究生具体方向与名额受导师项目分配影响。"
      ],
      "sources": [
        {
          "title": "中国科学技术大学官网",
          "type": "学校官网",
          "date": "2026-06-10访问",
          "url": "https://www.ustc.edu.cn/"
        },
        {
          "title": "火灾实验室2026研招科目通告",
          "type": "研究生招生",
          "date": "2025-06-06",
          "url": "https://sklfs.ustc.edu.cn/2025/0606/c5825a687065/page.htm"
        },
        {
          "title": "安全科学与工程系博士招生简章",
          "type": "研究生招生",
          "date": "2024-12-14",
          "url": "https://safetyse.ustc.edu.cn/2024/1214/c4546a665348/page.htm"
        },
        {
          "title": "肖华华教授导师主页",
          "type": "其他",
          "date": "2026-06-10访问",
          "url": "https://faculty.ustc.edu.cn/xiaohuahua/zh_CN/index.htm"
        }
      ]
    }
  },
  {
    "id": "ustb",
    "name": "北京科技大学",
    "shortName": "北科大",
    "city": "北京",
    "province": "北京",
    "tier": "211",
    "logo": "/logos/schools/北京科技大学.png",
    "officialUrl": "https://www.ustb.edu.cn/",
    "majorUrl": "https://srse.ustb.edu.cn/xssz/aqkxygcx.htm",
    "focus": "矿山安全与工业防爆近相关。",
    "tags": [
      "211",
      "双一流",
      "北京",
      "安全工程",
      "矿山安全"
    ],
    "overview": "北京科技大学安全科学与工程专业在矿山安全、工业防爆及灾害评价领域底蕴深厚。",
    "suitableFor": [
      "关注工业防爆、矿山通风防尘及安全评价的学生。",
      "希望在北京高校深造安全科学与工程的学生。"
    ],
    "reminders": [
      "无弹药工程本科专业，以安全工程近相关口径报考。",
      "研究生方向包含火灾与爆炸灾害控制、工业系统风险评价。",
      "录取位次和分省招生人数需按各省报考政策核对。"
    ],
    "links": [
      {
        "title": "北京科技大学官网",
        "type": "学校官网",
        "url": "https://www.ustb.edu.cn/",
        "note": "学校主入口。"
      },
      {
        "title": "资源与安全工程学院安全工程系介绍",
        "type": "学院官网",
        "url": "https://srse.ustb.edu.cn/xssz/aqkxygcx.htm",
        "note": "系部介绍，体现火灾理论、工业爆炸灾害控制等方向。"
      },
      {
        "title": "北京科技大学研究生招生网",
        "type": "研究生招生",
        "url": "https://www.ustb.edu.cn/zsjy/yjszs/index.htm",
        "note": "提供历年研究生录取及考试大纲入口。"
      },
      {
        "title": "资安学院2026研究生推免预报名通知",
        "type": "研究生招生",
        "url": "https://srse.ustb.edu.cn/info/1099/8916.htm",
        "note": "用于核查最新推荐免试招生规模及考试范围。"
      }
    ],
    "verification": {
      "status": "部分核验",
      "relevanceLevel": "中",
      "updatedAt": "2026-06-10",
      "summary": "已核对高校官网、二级学院系部页面和学术团队方向；本科及研招计划、分数位次待复核。",
      "verifiedFields": [
        "学校全称",
        "地理位置",
        "层级属性",
        "研究生招生及特色课程线索"
      ],
      "pendingFields": [
        "是否包含直接本科弹药工程方向",
        "分省招生计划与专业组划分",
        "近三年实际录取分数线",
        "毕业生精确去向报告"
      ]
    },
    "research": {
      "updatedAt": "2026-06-10",
      "status": "已整理官方学术及培养入口，适合作为爆炸力学或工业防爆近相关/跨考参考。",
      "relevanceLevel": "中",
      "conclusion": "北京科技大学在矿山安全与undefined研究及安全工程培养方向上具备深厚底蕴。不属于直接开设弹药工程本科的学校，但其研究生方向、国家重点平台等在爆炸、冲击、工业防爆领域高相关，适合作为优质考研与跨考参考。",
      "keySignals": [
        "拥有高水平的安全科学与工程或力学学科背景。",
        "拥有官方研招大纲或学院系部介绍佐证。",
        "导师团队在爆炸动力学或防爆防灾领域具备学术声誉。"
      ],
      "suitableFor": [
        "关注工业防爆、矿山通风防尘及安全评价的学生。",
        "希望在北京高校深造安全科学与工程的学生。"
      ],
      "risks": [
        "不能误读成本科直接对应的弹药工程与爆炸技术专业。",
        "招生人数、分数位次及教学报告需以后续每年官方发布的最新文件为准。",
        "研究生具体方向与名额受导师项目分配影响。"
      ],
      "sources": [
        {
          "title": "北京科技大学官网",
          "type": "学校官网",
          "date": "2026-06-10访问",
          "url": "https://www.ustb.edu.cn/"
        },
        {
          "title": "资安学院安全工程系介绍",
          "type": "学院官网",
          "date": "2026-06-10访问",
          "url": "https://srse.ustb.edu.cn/xssz/aqkxygcx.htm"
        },
        {
          "title": "北京科技大学研究生招生网",
          "type": "研究生招生",
          "date": "2026-06-10访问",
          "url": "https://www.ustb.edu.cn/zsjy/yjszs/index.htm"
        },
        {
          "title": "资安学院研究生推免通知",
          "type": "研究生招生",
          "date": "2025",
          "url": "https://srse.ustb.edu.cn/info/1099/8916.htm"
        }
      ]
    }
  },
]

export function getUniversityById(id: string) {
  return universities.find((university) => university.id === id)
}
