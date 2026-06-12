import fs from 'fs';

function fix(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  content = content.replace(/- 企业性质：\s*\n/g, '- 企业性质：待核对\n');
  content = content.replace(/- 相关方向：\s*\n/g, '- 相关方向：待补充\n');
  content = content.replace(/- 地区：\s*\n/g, '- 地区：未知\n');
  content = content.replace(/- 城市：\s*\n/g, '- 城市：未知\n');
  content = content.replace(/- 区域 \/ 省份：\s*\n/g, '- 区域 / 省份：未知\n');
  
  fs.writeFileSync(filePath, content);
}

fix('research-drafts/knowledge-pool/batches/enterprise/enterprise-scout-2026-06-10-huanan-dianzileiguan.md');
fix('research-drafts/knowledge-pool/batches/enterprise/enterprise-scout-2026-06-10-xibei.md');
console.log("Fixed empty fields");
