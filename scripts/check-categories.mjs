import fs from 'fs';
import path from 'path';

const INDEX_PATH = 'chinchunimages/products_index.json';
const data = JSON.parse(fs.readFileSync(INDEX_PATH, 'utf-8'));

const catCounts = {};
for (const p of data) {
  catCounts[p.category] = (catCounts[p.category] || 0) + 1;
}

console.log('Top categories:');
const sorted = Object.entries(catCounts).sort((a,b) => b[1] - a[1]);
for (const [cat, count] of sorted.slice(0, 30)) {
  console.log(`- ${cat}: ${count}`);
}
