import fs from 'fs';

const escape = (str) => {
  if (!str) return '""';
  return '"' + String(str).replace(/"/g, '""') + '"';
};

function exportCompanies() {
  const path = './research-drafts/companies/';
  const files = fs.readdirSync(path).filter(f => f.endsWith('.json'));
  
  // Deduplicate by base.name or target, prioritizing '-clean.json'
  const companyMap = new Map();
  files.forEach(f => {
    try {
      const d = JSON.parse(fs.readFileSync(path + f));
      if (d.kind !== 'company') return;
      const target = d.target || (d.base && d.base.name) || f.replace('.json', '').replace('-clean', '');
      
      const isClean = f.includes('-clean');
      if (!companyMap.has(target) || isClean) {
        companyMap.set(target, d);
      }
    } catch(e) {}
  });

  let csv = '\uFEFF';
  csv += '企业名称,企业性质,所在城市,薪资待遇,作息时间,学历要求,核心业务,对口专业,深度调研结论,风险提示,官方网址\n';
  
  for (const d of companyMap.values()) {
    const b = d.base || {};
    const r = d.research || {};
    const name = b.name || d.target || '';
    const ownership = b.ownership || '待核对';
    const city = (b.region || '') + (b.city || '');
    const salary = b.salaryRange || '未知';
    const schedule = b.schedule || '待核对';
    const edu = b.education || '未知';
    const highlights = (b.highlights || []).join(',');
    const suitable = (r.suitableFor || []).join(',');
    const conclusion = r.conclusion || '';
    const risks = (r.risks || []).join(';');
    const website = b.website || (r.sources && r.sources[0] ? r.sources[0].url : '');
    csv += [name, ownership, city, salary, schedule, edu, highlights, suitable, conclusion, risks, website].map(escape).join(',') + '\n';
  }
  
  fs.writeFileSync('./notion-全部企业导入.csv', csv);
  console.log(`Exported ${companyMap.size} companies.`);
}

function exportUniversities() {
  const path = './research-drafts/universities/';
  const files = fs.readdirSync(path).filter(f => f.endsWith('.json'));
  
  const uniMap = new Map();
  files.forEach(f => {
    try {
      const d = JSON.parse(fs.readFileSync(path + f));
      if (d.kind !== 'university') return;
      const target = d.target || (d.base && d.base.name) || f.replace('.json', '');
      const isClean = f.includes('-clean');
      if (!uniMap.has(target) || isClean) {
        uniMap.set(target, d);
      }
    } catch(e) {}
  });

  let csv = '\uFEFF';
  csv += '院校名称,层次标签,所在城市,特色方向,推荐适合人群,深度调研结论,官方招生网入口,风险提示\n';
  
  for (const d of uniMap.values()) {
    const b = d.base || {};
    const r = d.research || {};
    const name = b.name || d.target || '';
    const tier = b.tier || '';
    const tags = (b.tags || []).join(',');
    const tierAndTags = [tier, tags].filter(Boolean).join(',');
    const city = (b.province || '') + (b.city || '');
    const focus = b.focus || '';
    const suitableFor = (b.suitableFor || r.suitableFor || []).join('\n');
    const conclusion = r.conclusion || b.overview || '';
    const officialUrl = b.officialUrl || b.majorUrl || (d.links && d.links[0] ? d.links[0].url : '');
    const risks = (b.reminders || r.risks || []).join('\n');
    csv += [name, tierAndTags, city, focus, suitableFor, conclusion, officialUrl, risks].map(escape).join(',') + '\n';
  }
  
  fs.writeFileSync('./notion-全部院校导入.csv', csv);
  console.log(`Exported ${uniMap.size} universities.`);
}

exportCompanies();
exportUniversities();
