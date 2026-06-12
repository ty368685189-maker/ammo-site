import fs from 'node:fs/promises'
import path from 'node:path'

const file = path.join(process.cwd(), 'src', 'data', 'companies.ts')

async function main() {
  let content = await fs.readFile(file, 'utf8')
  
  // Find the exact line where id 57 begins:
  // Usually the import script adds:
  //   {
  //     "id": 57,
  //     "name": "浙江新联民爆集团股份有限公司",
  const match = content.match(/(\s*\{\s*"id": 57,[\s\S]*?)(?=\r?\n\]\r?\n\r?\nexport function getCompanyById)/)

  if (match) {
    const toRemove = match[1]
    content = content.replace(toRemove, '')
    await fs.writeFile(file, content, 'utf8')
    console.log('Successfully removed all added companies (id >= 57).')
  } else {
    console.log('Could not find id 57, perhaps they are already removed or the format is different.')
  }
}

main().catch(console.error)
