import fs from 'fs';
const path='./research-drafts/companies/';
const files=fs.readdirSync(path).filter(f=>f.endsWith('-clean.json')&&!f.includes('codex'));
let csv = '\uFEFF';
csv += '企业名称,企业性质,所在城市,薪资待遇,作息时间,学历要求,核心业务,对口专业,深度调研结论,风险提示,官方网址\n';
const escape = (str) => {
  if (!str) return '""';
  return '"' + String(str).replace(/"/g, '""') + '"';
};
files.forEach(f => {
  try {
    const d=JSON.parse(fs.readFileSync(path+f));
    if(d.kind!=='company') return;
    const b=d.base||{};
    const r=d.research||{};
    const name=b.name||d.target||'';
    const ownership=b.ownership||'待核对';
    const city=(b.region||'')+(b.city||'');
    const salary=b.salaryRange||'未知';
    const schedule=b.schedule||'待核对';
    const edu=b.education||'未知';
    const highlights=(b.highlights||[]).join(',');
    const suitable=(r.suitableFor||[]).join(',');
    const conclusion=r.conclusion||'';
    const risks=(r.risks||[]).join(';');
    const website=b.website||(r.sources&&r.sources[0]?r.sources[0].url:'');
    csv += [name, ownership, city, salary, schedule, edu, highlights, suitable, conclusion, risks, website].map(escape).join(',') + '\n';
  } catch(e){}
});
fs.writeFileSync('./notion-企业导入.csv', csv);
console.log("CSV generated.");
