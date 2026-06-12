import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const KNOWLEDGE_POOL_DIR = path.resolve(__dirname, '../research-drafts/knowledge-pool');

// 需要检查的目录
const DIRS_TO_CHECK = [
  path.join(KNOWLEDGE_POOL_DIR, 'batches', 'enterprise'),
  path.join(KNOWLEDGE_POOL_DIR, 'batches', 'university'),
  path.join(KNOWLEDGE_POOL_DIR, 'batches', 'mixed')
];

// 企业必需字段
const ENTERPRISE_REQUIRED_FIELDS = [
  '- 类型：',
  '- 地区：',
  '- 城市：',
  '- 区域 / 省份：',
  '- 企业性质：',
  '- 相关方向：',
  '- 官网 / 主入口：',
  '- 招聘入口 / 招聘公告：',
  '- 关键入口：',
  '- 来源记录：',
  '- 证据强弱：',
  '- 薪资：',
  '- 作息：',
  '- 常见岗位线索：',
  '- 学历要求线索：',
  '- 简短描述：',
  '- 适合人群：',
  '- 风险和待核对：',
  '- 重复风险：',
  '- 建议动作：',
  '- 检索关键词：',
  '- 检索轮次：'
];

// 院校必需字段
const UNIVERSITY_REQUIRED_FIELDS = [
  '- 类型：',
  '- 地区：',
  '- 城市：',
  '- 省份：',
  '- 层次：',
  '- 候选分层：',
  '- 本科/考研/跨考口径：',
  '- 相关方向：',
  '- 学校官网：',
  '- 招生网：',
  '- 学院官网：',
  '- 本科专业入口 / 研究生招生目录：',
  '- 关键入口：',
  '- 来源记录：',
  '- 证据强弱：',
  '- 专业 / 方向线索：',
  '- 简短概览：',
  '- 适合人群：',
  '- 报考提醒和风险：',
  '- 重复风险：',
  '- 建议动作：',
  '- 检索关键词：',
  '- 检索轮次：'
];

let hasErrors = false;

function scanDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      scanDirectory(filePath);
    } else if (file.endsWith('.md')) {
      lintFile(filePath);
    }
  }
}

function lintFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // 以 "## " 开头通常是条目切块的标识（有些可能是 "### "）
  // 为了健壮性，按 "## " 或 "### " 后面跟着数字分割条目
  const entries = content.split(/\n##+ \d+\. /).slice(1); 
  // 如果没有按数字分割，尝试按标题分割
  if (entries.length === 0) {
      // no entries found or different format.
      return; 
  }

  entries.forEach((entryText, index) => {
    const entryNameMatch = entryText.match(/^(.*)\n/);
    const entryName = entryNameMatch ? entryNameMatch[1].trim() : `条目 ${index + 1}`;
    
    const isUniversity = entryText.includes('- 类型：院校');
    const isEnterprise = entryText.includes('- 类型：企业') || (!isUniversity && entryText.includes('- 企业性质：'));

    if (!isUniversity && !isEnterprise) {
      console.error(`❌ [错误] 文件 ${path.basename(filePath)} -> ${entryName}：缺少明确的类型声明 (- 类型：企业 或 - 类型：院校)`);
      hasErrors = true;
      return;
    }

    const requiredFields = isUniversity ? UNIVERSITY_REQUIRED_FIELDS : ENTERPRISE_REQUIRED_FIELDS;

    for (const field of requiredFields) {
      // 检查字段是否存在
      if (!entryText.includes(field)) {
        console.error(`❌ [缺失字段] 文件 ${path.basename(filePath)} -> ${entryName}：缺少必需字段 "${field}"`);
        hasErrors = true;
      } else {
        // 检查字段是否为空 (冒号后没有内容，或者下一行立刻是另一个字段)
        // 简单正则：查找字段所在行，看冒号后是否有非空白字符，或者它的下一行是否有缩进内容
        const lines = entryText.split('\n');
        const fieldLineIndex = lines.findIndex(l => l.trim().startsWith(field));
        if (fieldLineIndex !== -1) {
            const lineContent = lines[fieldLineIndex].trim();
            const value = lineContent.substring(field.length).trim();
            
            // 如果同行没有值，检查下一行是不是缩进列表 (比如关键入口：\n  - [链接])
            if (value === '') {
                const nextLine = lines[fieldLineIndex + 1];
                if (!nextLine || (!nextLine.startsWith('  -') && !nextLine.startsWith('    -') && !nextLine.startsWith('> '))) {
                     console.error(`❌ [字段为空] 文件 ${path.basename(filePath)} -> ${entryName}：字段 "${field}" 值为空，不允许敷衍了事！未确认请写"待核对"或"未知"。`);
                     hasErrors = true;
                }
            }
        }
      }
    }
  });
}

console.log('🔍 开始执行 Knowledge Pool Draft Markdown 校验...');

// 允许传入特定文件路径进行扫描
const args = process.argv.slice(2);
if (args.length > 0) {
    args.forEach(arg => lintFile(path.resolve(process.cwd(), arg)));
} else {
    DIRS_TO_CHECK.forEach(scanDirectory);
}

if (hasErrors) {
  console.error('\n🚫 校验失败！发现如上错误。AI Agent，你必须修复这些格式问题才能结束你的回合。绝不允许偷懒！');
  process.exit(1);
} else {
  console.log('\n✅ 校验通过！所有草稿文件格式均符合标准。');
}
