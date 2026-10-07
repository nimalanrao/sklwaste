import fs from 'fs';
import path from 'path';

const INDEX_PATH = 'chinchunimages/products_index.json';
const data = JSON.parse(fs.readFileSync(INDEX_PATH, 'utf-8'));

// Helper to clean titles
function cleanTitle(raw) {
  let t = raw;
  t = t.replace(/\s*(Power Tools|Building Materials|Plumbing|Kitchen Sink|Tools|Machinery)?\s*(Selangor|KL|Shah Alam|Malaysia|Store|Supplier|Supply|,)+/gi, ' ');
  t = t.replace(/&amp;/g, '&');
  t = t.replace(/&quot;/g, '"');
  t = t.replace(/\s+/g, ' ').trim();
  return t;
}

// Generate tailored human description based on product name, specs, brand and trade application
function generateDescription(p, title) {
  const tUpper = title.toUpperCase();
  const brand = p.brand || 'Hardware';
  
  if (tUpper.includes('ROUTER') || tUpper.includes('TRIMMER')) {
    return `Precision woodworking tool suited for edge profiling, grooving, and cabinetry. Fitted with a heavy-duty motor, smooth depth adjustment guide, and ergonomic grip for site carpentry and joinery work.`;
  }
  if (tUpper.includes('DRILL') || tUpper.includes('IMPACT WRENCH') || tUpper.includes('IMPACT DRIVER')) {
    return `High-torque contractor-grade drilling and fastening tool. Engineered for structural timber, steel frames, and masonry fastening. Compact body with rapid heat dissipation and dual-speed transmission.`;
  }
  if (tUpper.includes('GRINDER') || tUpper.includes('SANDER') || tUpper.includes('POLISHER')) {
    return `Heavy-duty surface preparation tool designed for cutting rebar, smoothing welds, deburring metal, and finishing wood surfaces. Features reinforced gear housing and dust-sealed switch.`;
  }
  if (tUpper.includes('SAW') || tUpper.includes('JIG SAW') || tUpper.includes('CIRCULAR')) {
    return `Rugged cutting equipment delivering straight, rip, and bevel cuts across plywood, hardwood, PVC, and sheet metals. Built for jobsite durability with tool-less blade changes.`;
  }
  if (tUpper.includes('PUMP') || tUpper.includes('BOOSTER')) {
    return `Reliable water pressure boosting system for residential and commercial premises. Stainless steel or cast iron housing ensuring stable water flow and corrosion-resistant continuous duty.`;
  }
  if (tUpper.includes('GENERATOR')) {
    return `Dependable backup site power generator with low-noise copper alternator and automatic voltage regulation (AVR). Ideal for construction sites, remote power, and emergency supply.`;
  }
  if (tUpper.includes('SINK') || tUpper.includes('BASIN') || tUpper.includes('TAP') || tUpper.includes('FAUCET')) {
    return `Commercial-grade sanitary ware manufactured from corrosion-resistant stainless steel or glazed ceramic. Resistant to water stains, thermal shock, and heavy everyday utility use.`;
  }
  if (tUpper.includes('BATTERY') || tUpper.includes('CHARGER')) {
    return `Genuine manufacturer high-density lithium-ion battery system or intelligent fast charger. Built with thermal management and overload protection for uninterrupted trade use.`;
  }
  if (tUpper.includes('BRICK') || tUpper.includes('BLOCK') || tUpper.includes('PAVER')) {
    return `High compressive strength structural masonry element meeting Malaysian standard specifications (SIRIM). Designed for load-bearing walls, landscape paving, or structural perimeter fencing.`;
  }
  if (tUpper.includes('CEMENT') || tUpper.includes('MORTAR') || tUpper.includes('GROUT') || tUpper.includes('SIKA')) {
    return `Premixed trade-formulated construction chemical or cementitious bonding agent. Provides water resistance, high adhesive strength, and crack minimization for concrete repair and laying.`;
  }
  if (tUpper.includes('PIPE') || tUpper.includes('FITTING') || tUpper.includes('VALVE')) {
    return `Class-certified pressure pipe or fitting tested for domestic plumbing and industrial irrigation. Smooth internal bore to minimize friction loss and prevent scale buildup.`;
  }
  if (tUpper.includes('BLOWER') || tUpper.includes('VACUUM')) {
    return `High-velocity air mover for jobsite cleanup, duct clearing, and outdoor lawn maintenance. Lightweight chassis with variable speed trigger for controlled airflow.`;
  }
  return `Contractor-grade ${brand} hardware engineered for daily jobsite durability. Complies with industry trade standards for commercial maintenance, renovation, and construction.`;
}

// Generate application
function generateApplication(title, category) {
  const tUpper = title.toUpperCase();
  if (tUpper.includes('DRILL') || tUpper.includes('WRENCH')) return 'Structural steel fastening, masonry anchoring & cabinet assembly';
  if (tUpper.includes('GRINDER') || tUpper.includes('CUT')) return 'Metal fabrication, rebar cutting, weld dressing & brick chasing';
  if (tUpper.includes('SANDER') || tUpper.includes('PLANER') || tUpper.includes('ROUTER')) return 'Cabinetry, furniture finishing, doors & carpentry joinery';
  if (tUpper.includes('PUMP')) return 'Residential water pressure boosting, rainwater harvesting & site transfer';
  if (tUpper.includes('GENERATOR')) return 'Off-grid construction tools, lighting towers & standby workshop power';
  if (tUpper.includes('SINK') || tUpper.includes('KITCHEN')) return 'Commercial kitchens, wet kitchens, pantry renovations & sculleries';
  if (tUpper.includes('BRICK') || tUpper.includes('BLOCK')) return 'Load-bearing masonry, boundary retaining walls & residential partitions';
  if (tUpper.includes('PAVER')) return 'Driveways, pedestrian walkways, commercial carparks & landscape architecture';
  if (tUpper.includes('BATTERY') || tUpper.includes('CHARGER')) return 'Power tool cordless fleet powering & jobsite charging setups';
  return 'General construction, maintenance, repair & contractor installations';
}

// Group into overarching catalogue sections
function mapMajorCategory(category, title) {
  const cLower = (category || '').toLowerCase();
  const tLower = (title || '').toLowerCase();

  if (cLower.includes('power') || cLower.includes('drill') || cLower.includes('grinder') || cLower.includes('jigsaw') || cLower.includes('bosch') || cLower.includes('dewalt') || cLower.includes('dongcheng') || cLower.includes('hikoki') || cLower.includes('milwaukee') || cLower.includes('makita') || cLower.includes('sander') || cLower.includes('saw')) {
    return { section: 'Power Tools', sectionMs: 'Alat Kuasa', filter: 'power-tools' };
  }
  if (cLower.includes('building') || cLower.includes('brick') || cLower.includes('block') || cLower.includes('paver') || cLower.includes('sika') || tLower.includes('batu') || tLower.includes('cement')) {
    return { section: 'Building Materials', sectionMs: 'Bahan Binaan', filter: 'building' };
  }
  if (cLower.includes('machinery') || cLower.includes('pump') || cLower.includes('generator') || cLower.includes('blower') || cLower.includes('tsunami') || cLower.includes('agricultural')) {
    return { section: 'Machinery & Pumps', sectionMs: 'Jentera & Pam', filter: 'machinery' };
  }
  if (cLower.includes('sink') || cLower.includes('hood') || cLower.includes('pipe') || cLower.includes('fitting') || cLower.includes('plumbing') || cLower.includes('sanitary') || cLower.includes('midea')) {
    return { section: 'Plumbing & Sanitary', sectionMs: 'Paip & Kebersihan', filter: 'plumbing' };
  }
  return { section: 'Hardware & Tools', sectionMs: 'Alat & Perkakasan', filter: 'tools' };
}

// Let's create an organized comprehensive list of 250+ prime items across all categories
// Make sure images exist in public/catalogue
const publicDir = 'public/catalogue';
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Let's copy top 300 products from scraped index to public/catalogue and build the rich catalogue json
const finalProducts = [];
const seenTitles = new Set();

for (const p of data) {
  const title = cleanTitle(p.title);
  if (seenTitles.has(title)) continue;
  if (!p.localImage) continue;

  const srcImgPath = path.join('chinchunimages', p.localImage);
  if (!fs.existsSync(srcImgPath)) continue;

  seenTitles.add(title);

  // Dest image in public/catalogue
  const imgBasename = path.basename(p.localImage);
  const destImgPath = path.join(publicDir, imgBasename);
  
  if (!fs.existsSync(destImgPath)) {
    fs.copyFileSync(srcImgPath, destImgPath);
  }

  const { section, sectionMs, filter } = mapMajorCategory(p.category, title);

  finalProducts.push({
    id: p.id,
    title,
    brand: p.brand || 'SKL Hardware',
    category: section,
    categoryMs: sectionMs,
    subCategory: filter,
    spec: `${p.brand || 'Trade Quality'} standard specification • Contractor series`,
    description: generateDescription(p, title),
    application: generateApplication(title, section),
    unit: 'Per Unit / Box / Pallet',
    localImage: `/catalogue/${imgBasename}`,
    fallbackImage: p.remoteImage || `/catalogue/${imgBasename}`,
    inStock: true
  });

  if (finalProducts.length >= 350) break;
}

console.log(`Generated ${finalProducts.length} enriched products for SKL Waste!`);
fs.writeFileSync('src/data/catalogue-products.json', JSON.stringify(finalProducts, null, 2));
console.log('Saved to src/data/catalogue-products.json');
