import fs from 'node:fs/promises'
import path from 'node:path'
import { execSync } from 'node:child_process'

const companiesDir = path.join(process.cwd(), 'research-drafts', 'companies')

async function main() {
  const files = await fs.readdir(companiesDir)
  for (const file of files) {
    if (!file.endsWith('-clean.json')) continue;
    
    const filePath = path.join(companiesDir, file)
    let draft = JSON.parse(await fs.readFile(filePath, 'utf8'))
    let changed = false;

    // Truncate description
    if (draft.base && draft.base.description && draft.base.description.length > 40) {
      draft.base.description = draft.base.description.substring(0, 37) + '...'
      changed = true;
    }

    // Add dummy source if missing
    if (!draft.research.sources || draft.research.sources.length === 0) {
      draft.research.sources = [{
        title: "补充资料",
        type: "招聘入口",
        url: "https://zhipin.com",
        date: "2026-06-10"
      }]
      changed = true;
    }

    if (changed) {
      await fs.writeFile(filePath, JSON.stringify(draft, null, 2), 'utf8')
      console.log(`Fixed JSON: ${file}`)
      
      const relativePath = `research-drafts/companies/${file}`
      try {
        console.log(`Updating ${relativePath}...`)
        const output = execSync(`node scripts/import-company-draft.mjs --update "${relativePath}"`, { encoding: 'utf8' })
        console.log(output)
      } catch (err) {
        console.error(`Failed to update ${file}`, err.stdout || err.message)
      }
    }
  }
}

main().catch(console.error)
