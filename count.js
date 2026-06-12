const fs = require('fs');
const txt = fs.readFileSync('src/data/companies.ts', 'utf8');
const matches = txt.match(/name:\s*['"].*?['"]/g);
console.log('Total formally imported companies:', matches ? matches.length : 0);
