import fs from 'fs';
import path from 'path';

const SRC_PATH = 'src/data/all-products.json';
const THIRUMALVEL_PATH = 'thirumalvel/src/data/all-products.json';

const products = JSON.parse(fs.readFileSync(SRC_PATH, 'utf-8'));

function getNormalizedUOMAndTitle(p) {
  let title = (p.title || '').trim();
  const id = (p.id || '').toLowerCase();
  let lowerT = title.toLowerCase();

  // Specific high-priority title overrides for construction essentials
  if (id === 'skl-pasir-halus-siap-guni') {
    return { title: 'Pasir Halus', unit: 'TON' };
  }
  if (id === 'skl-pasir-kasar-siap-guni') {
    return { title: 'Pasir Kasar', unit: 'TON' };
  }
  if (id === 'skl-pasir-halus-sungai-guni-ton') {
    return { title: 'Pasir Halus (Pukal)', unit: 'TON' };
  }
  if (id === 'skl-pasir-kasar-konkrit-guni-ton') {
    return { title: 'Pasir Kasar (Pukal)', unit: 'TON' };
  }
  if (id === 'skl-batu-agregat-3-4-guni-ton') {
    return { title: 'Batu Baur 3/4" (Pukal)', unit: 'TON' };
  }
  if (id === 'skl-batu-agregat-3-4-siap-guni') {
    return { title: 'Batu Baur 3/4"', unit: 'BAG' };
  }
  if (id === 'skl-simen-portland-opc-guni') {
    return { title: 'Simen Portland OPC (50kg)', unit: 'BAG' };
  }
  if (id === 'skl-skim-coat-base-grey-guni') {
    return { title: 'Skim Coat Asas (40kg)', unit: 'BAG' };
  }
  if (id === 'skl-skim-coat-finish-white-guni') {
    return { title: 'Skim Coat Kemasan (25kg)', unit: 'BAG' };
  }
  if (id === 'skl-tile-gum-c2te-guni') {
    return { title: 'Gam Jubin Tile Gum (25kg)', unit: 'BAG' };
  }
  if (id === 'batu-pasir-per-pcs') {
    return { title: 'Bata Pasir Sand Brick', unit: 'UNIT' };
  }
  if (id === 'skl-cement-sand-block-hollow') {
    return { title: 'Blok Simen Pasir Hollow', unit: 'UNIT' };
  }

  // Strip awkward "(Guni)" or "(Beg)" or "Guni" from any titles where it was appended
  title = title.replace(/\s*\(guni\)/gi, '')
               .replace(/\s*guni\b/gi, '')
               .replace(/\s*\(beg\)/gi, '')
               .replace(/\s*beg\b/gi, '')
               .trim();

  lowerT = title.toLowerCase();

  // 1. ALL PASIR -> TON (Strict user rule: "FOR ALL PASIR USE TON")
  if (lowerT.includes('pasir') || id.includes('pasir')) {
    if (!lowerT.includes('block') && !lowerT.includes('blok') && !lowerT.includes('brick') && !lowerT.includes('bata')) {
      return { title, unit: 'TON' };
    }
  }

  // Bulk stone / Lori aggregates -> TON
  if (id.includes('guni-ton') || lowerT.includes('pukal') || lowerT.includes('lori')) {
    return { title, unit: 'TON' };
  }

  // 2. OTHERS IN BAG -> BAG (Strict user rule: "AND OTHERS THAT ARE IN BAG USE BAG UOM")
  if (
    lowerT.includes('simen') || id.includes('simen') ||
    lowerT.includes('cement') || id.includes('cement') ||
    lowerT.includes('skim coat') || id.includes('skim-coat') ||
    lowerT.includes('tile gum') || id.includes('tile-gum') ||
    lowerT.includes('gam jubin') || lowerT.includes('mortar') ||
    lowerT.includes('plaster') || lowerT.includes('grouting') ||
    lowerT.includes('premix') || id.includes('premix') ||
    lowerT.includes('cement render') || lowerT.includes('self levelling') ||
    lowerT.includes('waterproof 25kg') || lowerT.includes('waterproof 35kg') ||
    lowerT.includes('waterproof 43kg')
  ) {
    // Exclude fittings, glue bottles, liquids, bricks, blocks
    if (
      !lowerT.includes('elbow') && 
      !lowerT.includes('solvent') && 
      !lowerT.includes('susu') && 
      !lowerT.includes('admixture') && 
      !lowerT.includes('blok') && 
      !lowerT.includes('bata') &&
      !lowerT.includes('brick') &&
      !lowerT.includes('block') &&
      !lowerT.includes('glue')
    ) {
      return { title, unit: 'BAG' };
    }
  }

  // 3. MOST COMMON -> UNIT (Strict user rule: "UNIT (MOST COMMON)")
  return { title, unit: 'UNIT' };
}

const cleanedProducts = products.map(p => {
  const { title, unit } = getNormalizedUOMAndTitle(p);
  return {
    ...p,
    title,
    unit
  };
});

// Write to src/data/all-products.json
fs.writeFileSync(SRC_PATH, JSON.stringify(cleanedProducts, null, 2), 'utf-8');

// Write to thirumalvel/src/data/all-products.json if exists
if (fs.existsSync(THIRUMALVEL_PATH)) {
  fs.writeFileSync(THIRUMALVEL_PATH, JSON.stringify(cleanedProducts, null, 2), 'utf-8');
}

const counts = {};
cleanedProducts.forEach(p => {
  counts[p.unit] = (counts[p.unit] || 0) + 1;
});

console.log('Successfully updated all products with 1-word UOMs:');
console.log(counts);
