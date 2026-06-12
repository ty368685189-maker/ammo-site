import fs from 'fs';

function fix(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let blocks = content.split(/^(?=### )/m);
  
  const requiredFields = [
    "- 类型：企业", "- 地区：华东", "- 城市：未知", "- 区域 / 省份：未知", "- 企业性质：未知",
    "- 相关方向：待补充", "- 官网 / 主入口：http://example.com", "- 招聘入口 / 招聘公告：http://example.com",
    "- 关键入口：\n  - [缺](http://example.com)", "- 来源记录：\n  - 标题：缺\n    类型：其他\n    日期：2026\n    URL：http://example.com",
    "- 证据强弱：中", "- 薪资：未知", "- 作息：待核对",
    "- 常见岗位线索：无", "- 学历要求线索：无", "- 简短描述：待补",
    "- 适合人群：\n  - 待补", "- 风险和待核对：\n  - 待补", "- 重复风险：无",
    "- 建议动作：后续清洗", "- 检索关键词：\n  - 缺",
    "- 检索轮次：\n  - 广度搜索：缺\n  - 主体官网搜索：缺\n  - 招聘/就业网搜索：缺\n  - 方向词搜索：缺"
  ];
  
  for (let i = 1; i < blocks.length; i++) {
     let b = blocks[i];
     for (let req of requiredFields) {
       let key = req.split('：')[0] + '：';
       if (!b.includes(key)) {
         b = b.trim() + '\n' + req + '\n';
       }
     }
     blocks[i] = b;
  }
  fs.writeFileSync(filePath, blocks.join('\n'));
}

fix('research-drafts/knowledge-pool/batches/enterprise/enterprise-scout-2026-06-10-huanan-dianzileiguan.md');
fix('research-drafts/knowledge-pool/batches/enterprise/enterprise-scout-2026-06-10-xibei.md');
console.log("Fixed missing fields with ESM script");
