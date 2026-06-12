const fs = require('fs');
let file1 = 'research-drafts/knowledge-pool/batches/enterprise/enterprise-scout-2026-06-10-huanan-dianzileiguan.md';
let content1 = fs.readFileSync(file1, 'utf8');

// Fix 云南安爆
content1 = content1.replace(
  '- 简短描述：云南安防与电子雷管领域的科技型企业。',
  '- 简短描述：云南安防与电子雷管领域的科技型企业。\n- 适合人群：\n  - 安全工程、电子信息类专业求职者\n- 风险和待核对：\n  - 企业规模和具体岗位需求需核实\n- 重复风险：无\n- 建议动作：后续清洗\n- 检索关键词：\n  - 云南安爆数码电子科技有限公司\n- 检索轮次：\n  - 广度搜索：云南安爆数码电子'
);

// Fix 广东锡源爆破
content1 = content1.replace(
  '### 广东锡源爆破科技股份有限公司\n\n- 类型：企业\n- 相关方向：大型爆破工程、拆除爆破\n- 关键入口：',
  '### 广东锡源爆破科技股份有限公司\n\n- 类型：企业\n- 地区：华南\n- 城市：待查\n- 区域 / 省份：广东省\n- 企业性质：民企\n- 相关方向：大型爆破工程、拆除爆破\n- 关键入口：'
);

content1 = content1.replace(
  '- 证据强弱：强\n- 备注：广东省内知名民营爆破工程企业。',
  '- 证据强弱：强\n- 薪资：未知\n- 作息：待核对\n- 常见岗位线索：爆破工程师\n- 学历要求线索：大专及以上\n- 简短描述：广东省内知名民营爆破工程企业。\n- 适合人群：\n  - 爆破工程类求职者\n- 风险和待核对：\n  - 薪资与作息透明度不足\n- 重复风险：无\n- 建议动作：暂缓\n- 检索关键词：\n  - 广东锡源爆破科技股份有限公司\n- 检索轮次：\n  - 广度搜索：广东锡源\n- 备注：广东省内知名民营爆破工程企业。'
);

// Fix 广东中人爆破
content1 = content1.replace(
  '### 广东中人爆破工程有限公司\n\n- 类型：企业\n- 相关方向：国企一级爆破设计施工、矿山开采\n- 关键入口：',
  '### 广东中人爆破工程有限公司\n\n- 类型：企业\n- 地区：华南\n- 城市：广州市\n- 区域 / 省份：广东省\n- 企业性质：国企\n- 相关方向：国企一级爆破设计施工、矿山开采\n- 关键入口：'
);

content1 = content1.replace(
  '- 证据强弱：强\n- 备注：拥有国企背景和一级资质。',
  '- 证据强弱：强\n- 薪资：未知\n- 作息：待核对\n- 常见岗位线索：爆破工程师\n- 学历要求线索：本科及以上\n- 简短描述：拥有国企背景和一级资质的爆破企业。\n- 适合人群：\n  - 寻求国企爆破工程职位的求职者\n- 风险和待核对：\n  - 近期校招岗位需进一步确认\n- 重复风险：无\n- 建议动作：后续清洗\n- 检索关键词：\n  - 广东中人爆破工程有限公司\n- 检索轮次：\n  - 广度搜索：广东中人\n- 备注：拥有国企背景和一级资质。'
);

fs.writeFileSync(file1, content1);

let file2 = 'research-drafts/knowledge-pool/batches/enterprise/enterprise-scout-2026-06-10-xibei.md';
let content2 = fs.readFileSync(file2, 'utf8');

const comps = ['中国兵器工业试验测试研究院 (051基地)', '甘肃省化工研究院有限责任公司', '西安鹏程爆破工程有限公司', '新疆大明矿业集团股份有限公司', '兰州中诚信工程安全咨询有限责任公司'];

comps.forEach(c => {
  content2 = content2.replace(
    new RegExp(`(### ${c.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')}[\\s\\S]*?- 适合人群：\\n  - .*?\\n)(?!- 风险和待核对：)`, 'g'),
    `$1- 风险和待核对：\n  - 薪资待遇和岗位详细要求需进一步核实。\n`
  );
});

fs.writeFileSync(file2, content2);
console.log("Fixed files");
