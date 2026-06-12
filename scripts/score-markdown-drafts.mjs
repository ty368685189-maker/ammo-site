import fs from 'fs';
import path from 'path';

function scoreMarkdown(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ 文件不存在: ${filePath}`);
    process.exit(1);
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const blocks = content.split(/^###\s+/m);
  
  if (blocks.length <= 1) {
    console.log('⚠️ 未检测到任何企业条目 (需以 `### 企业名` 开头)');
    return;
  }

  let allPass = true;
  console.log(`\n🔍 开始扫描草稿文件: ${path.basename(filePath)}\n`);

  // Skip the first block (which is the document header before the first ###)
  for (let i = 1; i < blocks.length; i++) {
    const block = blocks[i];
    const lines = block.split('\n');
    const name = lines[0].trim();
    
    let score = 100;
    const deductions = [];

    // Count sources
    const sourceMatches = block.match(/-\s*标题：/g);
    const sourceCount = sourceMatches ? sourceMatches.length : 0;
    if (sourceCount < 3) {
      score -= 30;
      deductions.push(`独立来源不足 3 个 (当前: ${sourceCount}个) [-30分]`);
    }

    // Check crucial fields
    const websiteMatch = block.match(/-\s*官网 \/ 主入口：(.*)/);
    const recruitMatch = block.match(/-\s*招聘入口 \/ 招聘公告：(.*)/);
    
    const website = websiteMatch ? websiteMatch[1].trim() : '';
    const recruit = recruitMatch ? recruitMatch[1].trim() : '';

    if ((website.includes('待核对') || website === '') && (recruit.includes('待核对') || recruit === '')) {
      score -= 50;
      deductions.push('缺乏确切的官网或招聘入口 (禁止全为待核对) [-50分]');
    }

    // Penalty for "待核对"
    const pendingMatches = block.match(/待核对/g);
    // Ignore the ones in the crucial fields if they were already penalized, but simple math:
    const pendingCount = pendingMatches ? pendingMatches.length : 0;
    if (pendingCount > 0) {
      score -= (pendingCount * 10);
      deductions.push(`发现 ${pendingCount} 处 "待核对" [-${pendingCount * 10}分]`);
    }

    // Has gov.cn?
    if (block.includes('gov.cn')) {
      score += 10;
      deductions.push(`包含 gov.cn 权威信源 [+10分]`);
    }

    // Output result for this company
    if (score < 80) {
      allPass = false;
      console.log(`❌ [REJECT] ${name} | 得分: ${score}`);
      deductions.forEach(d => console.log(`   └ ${d}`));
    } else {
      console.log(`✅ [PASS] ${name} | 得分: ${score}`);
      if (deductions.length > 0) {
        deductions.forEach(d => console.log(`   └ ${d}`));
      }
    }
  }

  console.log('\n=======================================');
  if (!allPass) {
    console.error('💥 扫描失败！存在得分低于 80 分的劣质草稿。请补充完整信息后重试。');
    process.exit(1);
  } else {
    console.log('🎉 扫描通过！所有草稿条目均达到准成品质量。');
    process.exit(0);
  }
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('用法: npm run score:markdown <path/to/markdown.md>');
  process.exit(1);
}

args.forEach(file => {
  scoreMarkdown(path.resolve(process.cwd(), file));
});
