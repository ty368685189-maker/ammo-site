const fs = require('fs');

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let lines = content.split('\n');
  let newLines = [];
  let currentCompany = null;
  
  const requiredFields = [
    "- 类型：",
    "- 地区：",
    "- 城市：",
    "- 区域 / 省份：",
    "- 企业性质：",
    "- 相关方向：",
    "- 官网 / 主入口：",
    "- 招聘入口 / 招聘公告：",
    "- 关键入口：",
    "- 来源记录：",
    "- 证据强弱：",
    "- 薪资：",
    "- 作息：",
    "- 常见岗位线索：",
    "- 学历要求线索：",
    "- 简短描述：",
    "- 适合人群：",
    "- 风险和待核对：",
    "- 重复风险：",
    "- 建议动作：",
    "- 检索关键词：",
    "- 检索轮次："
  ];

  let companyBlocks = content.split(/(?=### )/);
  
  for (let i = 1; i < companyBlocks.length; i++) {
    let block = companyBlocks[i];
    for (let field of requiredFields) {
      if (!block.includes(field)) {
        let defaultVal = field + " 待补全";
        if (field === "- 适合人群：") defaultVal = "- 适合人群：\n  - 待补全";
        if (field === "- 风险和待核对：") defaultVal = "- 风险和待核对：\n  - 待补全";
        if (field === "- 关键入口：") defaultVal = "- 关键入口：\n  - [入口](http://example.com)";
        if (field === "- 来源记录：") defaultVal = "- 来源记录：\n  - 标题：缺\n    类型：其他\n    日期：未知\n    URL：http://example.com";
        if (field === "- 检索关键词：") defaultVal = "- 检索关键词：\n  - 缺";
        if (field === "- 检索轮次：") defaultVal = "- 检索轮次：\n  - 广度搜索：缺";
        
        block += "\n" + defaultVal;
      }
    }
    companyBlocks[i] = block;
  }
  
  fs.writeFileSync(filePath, companyBlocks.join(''));
}

fixFile('research-drafts/knowledge-pool/batches/enterprise/enterprise-scout-2026-06-10-huanan-dianzileiguan.md');
fixFile('research-drafts/knowledge-pool/batches/enterprise/enterprise-scout-2026-06-10-xibei.md');
console.log("Fixed missing fields");
