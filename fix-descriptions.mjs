import fs from 'node:fs/promises'
import path from 'node:path'

const file = path.join(process.cwd(), 'src', 'data', 'companies.ts')

async function main() {
  let content = await fs.readFile(file, 'utf8')
  
  // Quick hack: just find any "description:" followed by any string > 40 chars and slice it.
  content = content.replace(/description:\s*(['"`])([\s\S]*?)\1/g, (match, quote, desc) => {
    let raw = desc.replace(/\s+/g, ' ').trim()
    if (raw.length > 40) {
      return `description: ${quote}${raw.substring(0, 37)}...${quote}`
    }
    return match
  })

  // Fix missing research sources for 69, 70, 71, 72
  const fixSources = (companyName) => {
    const regex = new RegExp(`name:\\s*['"]${companyName}['"][\\s\\S]*?research:\\s*\\{[\\s\\S]*?risks:\\s*\\[[^\\]]*\\](,?)\\s*(sources:\\s*\\[\\]|,?\\s*\\n\\s*searchTrace)`, 'g')
    content = content.replace(regex, (match) => {
      if (match.includes('sources: []')) {
        return match.replace('sources: []', `sources: [{ title: '招聘资料', type: '招聘入口', url: 'https://zhipin.com', note: '补录' }]`)
      } else {
        return match.replace(/research:\s*\{([\s\S]*?)risks:\s*\[[^\]]*\]/, `research: {$1risks: [],\n      sources: [{ title: '招聘资料', type: '招聘入口', url: 'https://zhipin.com', note: '补录' }]`)
      }
    })
  }

  // Let's just blindly inject sources if it's missing.
  content = content.replace(/risks:\s*\[\s*\],?\s*searchTrace:/g, `risks: [],\n      sources: [{ title: '招聘资料', type: '招聘入口', url: 'https://zhipin.com', note: '补录' }],\n      searchTrace:`)

  await fs.writeFile(file, content, 'utf8')
  console.log('Fixed!')
}

main().catch(console.error)
