const fs = require('fs');

let content = fs.readFileSync('INDEX.md', 'utf8');

// Update the table
const tableRow = `| nuc-shuangxuan | 2026-06-10 | \`batches/enterprise/enterprise-scout-2026-06-10-nuc-shuangxuan.md\` | 22 条：企业 22 | 中北大学军工双选会截获名录，兵器/弹药/航空航天配套强相关企业 |\n`;

content = content.replace(/\| huanan-scout \|.*?\n/, match => match + tableRow);

// Add the latest section
const latestSection = `## 最新批次：enterprise-scout-2026-06-10-nuc-shuangxuan（2026-06-10）

### 新增候选

- 兵器/航天制造：湖南兵器跃进机电、中航隆盛、航发中传、华兴机电、新成机器、北方重工、江河机械、淮海工业、长江动力、晋西精密、红旗机电等。
- 军工科研与装备：航天科工二十三所、新华防化装备研究院、航天博目电子、平原光电、中电科电子装备。

### 较强候选

- 中国航天科工二院二十三所、内蒙古北方重工业集团有限公司、淮海工业集团有限公司、山西新华防化装备研究院有限公司（均需进一步补强官网与确切入口）

### 暂缓或需补强

- 本批次均通过高校双选会截获名单，当前只有“中北大学就业网”单一来源。后续需逐个清洗补充企业独立官网与具体招聘页面。

### 下一轮建议

- 针对本批次企业进行第二轮深度清洗，补齐它们各自的官方网站及具体校招公告。

`;

content = content.replace(/## 最新批次：.*?\n/, match => latestSection + match);

fs.writeFileSync('INDEX.md', content);
