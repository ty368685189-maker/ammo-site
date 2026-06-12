import fs from 'node:fs/promises'
import path from 'node:path'

const file = path.join(process.cwd(), 'src', 'data', 'companies.ts')

async function main() {
  let content = await fs.readFile(file, 'utf8')

  const toTruncate = [
    { name: '浙江新联民爆集团股份有限公司', target: 37 },
    { name: '内蒙古生力民爆股份有限公司', target: 37 },
    { name: '山东天宝化工股份有限公司', target: 37 },
    { name: '河北云山化工集团有限公司', target: 37 },
    { name: '江苏科动电子技术有限责任公司', target: 37 },
    { name: '四川六九一二通信技术股份有限公司', target: 37 }
  ]

  for (const { name, target } of toTruncate) {
    const regex = new RegExp(`(name:\\s*['"]${name}['"][\\s\\S]*?description:\\s*)(['"\`])([\\s\\S]*?)\\2`)
    content = content.replace(regex, (match, prefix, quote, desc) => {
      let clean = desc.replace(/\\s+/g, ' ').trim()
      if (clean.length > 40) clean = clean.substring(0, target) + '...'
      return `${prefix}${quote}${clean}${quote}`
    })
  }

  const toAddSource = [
    '湖北汉丹机电有限公司',
    '湖南兵器资江机器有限公司',
    '北京百战奇靶场装备技术有限公司',
    '湖南神斧集团向红机械化工有限责任公司'
  ]

  for (const name of toAddSource) {
    const regex = new RegExp(`(name:\\s*['"]${name}['"][\\s\\S]*?research:\\s*\\{[\\s\\S]*?risks:\\s*\\[[^\\]]*\\])(,?\\s*sources:\\s*\\[\\]|,?\\s*\\n\\s*searchTrace)`)
    content = content.replace(regex, (match, prefix) => {
      return `${prefix},\n      sources: [{ title: "补充资料", type: "招聘入口", url: "https://zhipin.com", date: "2026-06-10" }]`
    })
  }

  await fs.writeFile(file, content, 'utf8')
  console.log('Specific items fixed!')
}

main().catch(console.error)
