import fs from 'fs';
import path from 'path';

const SRC_PATH = 'src/data/all-products.json';
const THIRUMALVEL_PATH = 'thirumalvel/src/data/all-products.json';

const products = JSON.parse(fs.readFileSync(SRC_PATH, 'utf-8'));

function simplifyTitle(p) {
  let t = p.title || '';

  // Decode HTML entities
  t = t.replace(/&#039;/g, "'")
       .replace(/&quot;/g, '"')
       .replace(/&amp;/g, '&')
       .replace(/&lt;/g, '<')
       .replace(/&gt;/g, '>');

  // Strip trailing category clutter
  t = t.replace(/\s*(Waterproofing & Sealant|Paint Nippon Paint|Kitchen & Bath|Cutting Tools|Cutting|Power Tools|Building Materials|Plumbing|Kitchen Sink|Tools|Machinery)\s*$/gi, '');
  t = t.replace(/\s*(Livinox Kitchen Sink Tap & Sink Mixer|Kitchen Sink Tap & Sink Mixer)\s*$/gi, '');

  // Exact pinned building materials
  if (p.id.includes('pasir-halus-siap-guni')) return 'Pasir Halus (Guni)';
  if (p.id.includes('pasir-kasar-siap-guni')) return 'Pasir Kasar (Guni)';
  if (p.id.includes('batu-agregat-3-4-siap-guni')) return 'Batu Baur 3/4" (Guni)';
  if (p.id.includes('pasir-halus-sungai-guni-ton')) return 'Pasir Halus (Pukal / Lori)';
  if (p.id.includes('pasir-kasar-konkrit-guni-ton')) return 'Pasir Kasar (Pukal / Lori)';
  if (p.id.includes('batu-agregat-3-4-guni-ton')) return 'Batu Baur 3/4" (Pukal / Lori)';
  if (p.id.includes('simen-portland-opc-guni')) return 'Simen Portland OPC (50kg)';
  if (p.id.includes('skim-coat-base-grey-guni')) return 'Skim Coat Asas Kelabu (40kg)';
  if (p.id.includes('skim-coat-finish-white-guni')) return 'Skim Coat Kemasan Putih (25kg)';
  if (p.id.includes('tile-gum-c2te-guni')) return 'Gam Jubin Tile Gum (25kg)';
  if (p.id.includes('batu-bata-merah-common')) return 'Bata Merah Tanah Liat';
  if (p.id.includes('cement-sand-block-hollow')) return 'Blok Simen Pasir Hollow';
  if (p.id.includes('interlocking-paver-ip80')) return 'Interlocking Paver 80mm';

  // Hansen fittings: remove redundant translation descriptions
  t = t.replace(/\s*-\s*(Penyambung Paip|Siku Paip|Penyambung Tiga Hala|Penyambung Benang|Siku Benang|Cabang Tiga|Pengecil Saiz|Penyambung Masuk).*$/i, '');
  
  // PVC pipes & Poly: clean lengths and parentheses
  t = t.replace(/\s*-\s*Gulungan 100 Meter.*$/i, ' (100m)');
  t = t.replace(/\s*\(Panjang 5\.8 Meter.*$/i, ' (5.8m)');
  t = t.replace(/\s*\(20mm \/ 25mm \/ 32mm\)/g, '');
  t = t.replace(/\s*\(Clay Red Common Brick\)/i, '');
  t = t.replace(/\s*\(Cement Sand Block 100mm \/ 150mm\)/i, '');

  // Clean common tile gum technical jargon for customer readability
  t = t.replace(/CEMENT GUM/gi, 'Gam Jubin');
  t = t.replace(/LOW DUST/gi, '');
  t = t.replace(/GRADE\s*:\s*[A-Z0-9-]+/gi, '');
  t = t.replace(/C2TE(\s*S1)?/gi, '');
  t = t.replace(/-\s*SIRIM/gi, '');
  t = t.replace(/SIRIM/gi, '');

  // Strip supplier location suffixes
  t = t.replace(/\s*(Selangor|KL|Shah Alam|Malaysia|Supplier|Store|Hardware Store)\s*/gi, ' ');
  t = t.replace(/\s*-\s*(Selangor|KL|Malaysia)\s*$/gi, '');

  // Clean trailing hyphens and excessive spaces
  t = t.replace(/\s*-\s*$/g, '');
  t = t.replace(/\s+/g, ' ').trim();

  return t;
}

function assignUOM(p, cleanT) {
  const lt = cleanT.toLowerCase();
  const id = p.id.toLowerCase();
  const cat = (p.mainCategory || '').toUpperCase();
  const sub = (p.subCategory || '').toLowerCase();

  // 1. BUILDING MATERIALS:
  if (cat === 'BUILDING MATERIALS') {
    // Bricks, blocks, pavers first (must NOT be Guni even if contains "pasir")
    if (
      lt.includes('bata') || lt.includes('brick') || lt.includes('blok') || 
      lt.includes('block') || lt.includes('paver') || lt.includes('plywood') || 
      lt.includes('papan') || lt.includes('ventilation')
    ) {
      return 'Keping';
    }

    // Liquid admixtures (susu simen, latex, bonding agent)
    if (lt.includes('sikalatex') || lt.includes('admixture') || lt.includes('susu') || lt.includes('latex') || lt.includes('18lit') || lt.includes('4lit') || lt.includes('tong')) {
      return 'Tong';
    }

    // Guni (sand, aggregate in bag)
    if (
      lt.includes('(guni)') || lt.includes('guni') || id.includes('siap-guni') || 
      (lt.includes('pasir') && !lt.includes('pukal') && !lt.includes('lori') && !id.includes('ton'))
    ) {
      return 'Guni';
    }

    // Lori (Bulk / Pukal delivery)
    if (lt.includes('pukal') || lt.includes('lori') || id.includes('ton') || id.includes('pukal')) {
      return 'Lori';
    }

    // Beg (Cement, skim coat, tile gum, plaster, mortar)
    if (
      lt.includes('simen') || lt.includes('cement') || lt.includes('skim coat') || 
      lt.includes('gam jubin') || lt.includes('plaster') || lt.includes('weber') || 
      lt.includes('mapei') || lt.includes('sikaceram') || lt.includes('adesilex') || 
      lt.includes('kerabond') || lt.includes('grout') || sub.includes('simen') || 
      sub.includes('skim coat') || sub.includes('gam jubin')
    ) {
      return 'Beg';
    }

    // Wire mesh, canvas, netting
    if (lt.includes('mesh') || lt.includes('brc') || lt.includes('dawai') || lt.includes('canvas') || lt.includes('roll')) {
      return 'Gulung';
    }

    return 'Beg';
  }

  // 2. PIPING & PLUMBING:
  if (cat === 'PIPING & PLUMBING') {
    if (lt.includes('roll') || lt.includes('100m') || lt.includes('gulung')) return 'Gulung';
    if (lt.includes('paip pvc') || lt.includes('5.8m') || (lt.includes('paip') && !lt.includes('fitting') && !lt.includes('kepala paip') && !lt.includes('siku') && !lt.includes('socket'))) {
      return 'Batang';
    }
    if (lt.includes('gam') || lt.includes('solvent cement')) return 'Tin';
    return 'Unit';
  }

  // 3. CUTTING TOOLS:
  if (cat === 'CUTTING TOOLS') {
    if (lt.includes('set') || lt.includes('kit') || lt.includes('pack')) return 'Set';
    if (lt.includes('blade') || lt.includes('disc') || lt.includes('saw') || lt.includes('mata')) return 'Keping';
    return 'Unit';
  }

  // 4. WATERPROOFING & SEALANT:
  if (cat === 'WATERPROOFING & SEALANT') {
    if (lt.includes('silicone') || lt.includes('sealant') || lt.includes('caulk') || lt.includes('sikasil') || lt.includes('maxbond') || lt.includes('gap filler') || lt.includes("x'traseal") || lt.includes('easynail') || lt.includes('cartridge')) {
      return 'Tiub';
    }
    if (lt.includes('membrane') || lt.includes('roll') || lt.includes('tape')) return 'Gulung';
    if (lt.includes('slurry') || lt.includes('25kg') || lt.includes('set') || lt.includes('sikatop')) return 'Set';
    if (lt.includes('pail') || lt.includes('tong') || lt.includes('20kg') || lt.includes('5kg')) return 'Tong';
    return 'Tiub';
  }

  // 5. PAINT:
  if (cat === 'PAINT') {
    if (lt.includes('spray') || lt.includes('tin') || lt.includes('1 lit') || lt.includes('1l')) return 'Tin';
    if (lt.includes('berus') || lt.includes('brush') || lt.includes('roller') || lt.includes('tray')) return 'Unit';
    return 'Tong';
  }

  // 6. KITCHEN & BATH:
  if (cat === 'KITCHEN & BATH') {
    if (lt.includes('set') || lt.includes('kit') || lt.includes('pair')) return 'Set';
    return 'Unit';
  }

  // 7. TOOLS:
  if (cat === 'TOOLS') {
    if (lt.includes('set') || lt.includes('kit') || lt.includes('combo')) return 'Set';
    if (lt.includes('screw') || lt.includes('skru') || lt.includes('paku') || (lt.includes('nail') && !lt.includes('nailer'))) return 'Kotak';
    return 'Unit';
  }

  // Generic fallback
  return 'Unit';
}

const cleanedProducts = products.map(p => {
  const cleanTitle = simplifyTitle(p);
  const uom = assignUOM(p, cleanTitle);

  return {
    ...p,
    title: cleanTitle,
    unit: uom
  };
});

// Write to src/data/all-products.json
fs.writeFileSync(SRC_PATH, JSON.stringify(cleanedProducts, null, 2), 'utf-8');

// Write to thirumalvel/src/data/all-products.json
if (fs.existsSync(THIRUMALVEL_PATH)) {
  fs.writeFileSync(THIRUMALVEL_PATH, JSON.stringify(cleanedProducts, null, 2), 'utf-8');
}

console.log(`Successfully updated ${cleanedProducts.length} products!`);

// Breakdown
const counts = {};
cleanedProducts.forEach(p => counts[p.unit] = (counts[p.unit] || 0) + 1);
console.log('Final UOM Breakdown:', counts);

// Check Building materials list
console.log('\nBuilding materials sample:');
cleanedProducts.filter(p => p.mainCategory === 'BUILDING MATERIALS').slice(0, 15).forEach(p => {
  console.log(`[${p.unit.padEnd(6)}] ${p.title}`);
});
