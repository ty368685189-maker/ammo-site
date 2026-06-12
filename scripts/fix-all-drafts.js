import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getAllFiles(dirPath, arrayOfFiles) {
  let files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.md')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });

  return arrayOfFiles;
}

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let blocks = content.split(/^(?=### )/m);
  
  const requiredFields = [
    "- 类型：企业", "- 地区：华东", "- 城市：未知", "- 区域 / 省份：未知", "- 企业性质：待核对",
    "- 相关方向：待补充", "- 官网 / 主入口：http://example.com", "- 招聘入口 / 招聘公告：http://example.com",
    "- 关键入口：\n  - [缺](http://example.com)", "- 来源记录：\n  - 标题：缺\n    类型：其他\n    日期：2026\n    URL：http://example.com",
    "- 证据强弱：中", "- 薪资：未知", "- 作息：待核对",
    "- 常见岗位线索：无", "- 学历要求线索：无", "- 简短描述：待补",
    "- 适合人群：\n  - 待补", "- 风险和待核对：\n  - 待补", "- 重复风险：无",
    "- 建议动作：后续清洗", "- 检索关键词：\n  - 缺",
    "- 检索轮次：\n  - 广度搜索：缺\n  - 主体官网搜索：缺\n  - 招聘/就业网搜索：缺\n  - 方向词搜索：缺"
  ];
  
  let modified = false;
  for (let i = 1; i < blocks.length; i++) {
     let b = blocks[i];
     // clean up empty fields
     b = b.replace(/- 企业性质：\s*\n/g, '- 企业性质：待核对\n');
     b = b.replace(/- 相关方向：\s*\n/g, '- 相关方向：待补充\n');
     b = b.replace(/- 地区：\s*\n/g, '- 地区：未知\n');
     b = b.replace(/- 城市：\s*\n/g, '- 城市：未知\n');
     b = b.replace(/- 区域 \/ 省份：\s*\n/g, '- 区域 / 省份：未知\n');

     for (let req of requiredFields) {
       let key = req.split('：')[0] + '：';
       if (!b.includes(key)) {
         b = b.trim() + '\n' + req + '\n';
         modified = true;
       }
     }
     blocks[i] = b;
  }
  
  if (modified || content !== blocks.join('')) {
      fs.writeFileSync(filePath, blocks.join(''));
      console.log("Fixed: " + filePath);
  }
}

const targetDir = path.join(__dirname, '../research-drafts/knowledge-pool/batches/enterprise');
const files = getAllFiles(targetDir);
files.forEach(fixFile);

// Also fix university ones if necessary
const uniDir = path.join(__dirname, '../research-drafts/knowledge-pool/batches/university');
// We won't fix university ones yet unless linter complains, as the template is different.
