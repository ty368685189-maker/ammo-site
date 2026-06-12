import fs from 'node:fs/promises'
import path from 'node:path'

async function main() {
  const reportPath = path.join(process.cwd(), 'research-drafts', 'score-report.json')
  const data = JSON.parse(await fs.readFile(reportPath, 'utf8'))

  const targets = data.results.filter(r => r.file.includes('clean') && !r.file.includes('codex-clean'))
  
  let markdown = `# 知识库 Clean JSON 自动化评分报告\n\n`
  markdown += `本次评分范围：最新生成的 Clean JSON 候选文件（共 ${targets.length} 份）。\n\n`

  const passed = targets.filter(t => t.verdict === '可进入人工确认' || t.score >= 85)
  const failed = targets.filter(t => t.score < 85)

  markdown += `## 总体结论\n`
  markdown += `- **🟢 达标可确认**：${passed.length} 份\n`
  markdown += `- **🔴 需修复/拦截**：${failed.length} 份\n\n`

  if (failed.length > 0) {
    markdown += `## 拦截与扣分项明细\n\n`
    for (const item of failed) {
      markdown += `### ${item.target} (${item.score} 分)\n`
      markdown += `- **状态**：${item.verdict}\n`
      markdown += `- **文件**：\`${path.basename(item.file)}\`\n`
      markdown += `- **拦截原因**：\n`
      for (const issue of item.issues) {
        if (issue.level === 'blocker') markdown += `  - 🚫 **阻塞**: ${issue.message}\n`
        else if (issue.level === 'major') markdown += `  - ⚠️ **严重**: ${issue.message}\n`
        else if (issue.level === 'minor') markdown += `  - 🟡 **轻微**: ${issue.message}\n`
      }
      markdown += '\n'
    }
  }

  if (passed.length > 0) {
    markdown += `## 高分通过清单\n\n`
    for (const item of passed) {
      markdown += `- **${item.target}** (${item.score} 分)\n`
    }
  }

  console.log(markdown)
}

main().catch(console.error)
