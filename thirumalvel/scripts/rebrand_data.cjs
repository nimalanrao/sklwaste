const fs = require('fs');
const path = require('path');

const allProductsPath = path.join(__dirname, '..', 'src', 'data', 'all-products.json');
if (fs.existsSync(allProductsPath)) {
  let raw = fs.readFileSync(allProductsPath, 'utf8');
  let replaced = raw
    .replaceAll('SKL Direct Quarry', 'Thirumal Vel Quarry')
    .replaceAll('SKL Building Materials', 'Thirumal Vel Building Materials')
    .replaceAll('SKL Hardware', 'Thirumal Vel Hardware')
    .replaceAll('"skl-', '"tv-');
  fs.writeFileSync(allProductsPath, replaced, 'utf8');
  console.log('Updated all-products.json');
}

const catProductsPath = path.join(__dirname, '..', 'src', 'data', 'catalogue-products.json');
if (fs.existsSync(catProductsPath)) {
  let raw = fs.readFileSync(catProductsPath, 'utf8');
  let replaced = raw
    .replaceAll('SKL Direct Quarry', 'Thirumal Vel Quarry')
    .replaceAll('SKL Building Materials', 'Thirumal Vel Building Materials')
    .replaceAll('SKL Hardware', 'Thirumal Vel Hardware')
    .replaceAll('"skl-', '"tv-');
  fs.writeFileSync(catProductsPath, replaced, 'utf8');
  console.log('Updated catalogue-products.json');
}

const scrapedPath = path.join(__dirname, '..', 'src', 'data', 'scraped-catalogue.json');
if (fs.existsSync(scrapedPath)) {
  let raw = fs.readFileSync(scrapedPath, 'utf8');
  let replaced = raw
    .replaceAll('SKL Direct Quarry', 'Thirumal Vel Quarry')
    .replaceAll('SKL Building Materials', 'Thirumal Vel Building Materials')
    .replaceAll('SKL Hardware', 'Thirumal Vel Hardware')
    .replaceAll('"skl-', '"tv-');
  fs.writeFileSync(scrapedPath, replaced, 'utf8');
  console.log('Updated scraped-catalogue.json');
}
