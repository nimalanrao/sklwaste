import fs from 'fs';
import path from 'path';

const INDEX_PATH = 'chinchunimages/products_index.json';
const rawData = JSON.parse(fs.readFileSync(INDEX_PATH, 'utf-8'));

// Helper to clean titles
function cleanTitle(raw) {
  let t = raw || '';
  t = t.replace(/\s*(Power Tools|Building Materials|Plumbing|Kitchen Sink|Tools|Machinery)?\s*(Selangor|KL|Shah Alam|Malaysia|Store|Supplier|Supply|,)+/gi, ' ');
  t = t.replace(/&amp;/g, '&');
  t = t.replace(/&quot;/g, '"');
  t = t.replace(/\s+/g, ' ').trim();
  return t;
}

// 1. Primary Building Supply Items specifically requested by user:
// pasir halus, pasir kasar, cement (OPC / Portland), skim coat (skim basah / kering), tile gum / adhesive, etc.
const essentialBuildingSupplies = [
  {
    id: "skl-pasir-halus-sungai",
    title: "Pasir Halus Bersih (River Sand / Plastering Sand) - Per Bag / Per Lori",
    brand: "SKL Quarry Direct",
    mainCategory: "BUILDING MATERIALS",
    subCategory: "Pasir & Agregat",
    spec: "Gred halus bertapis • Bebas bendasing lumpur • Sesuai kerja lepaan & simen",
    description: "Pasir halus berkualiti tinggi yang telah ditapis rapi untuk bancuhan simen lepaan (plastering), kemasan dinding licin, dan ikatan bata rapi. Boleh didapati dalam kuantiti beg retail atau muatan lori 3 tan & 10 tan terus ke tapak bina.",
    unit: "Beg / Lori (3 Ton / 10 Ton)",
    application: "Kerja plastering, rendering dinding, lepaan kemas & kerja kemasan konkrit halus",
    localImage: "/catalogue/pbm-batu-angin-biasa-vb224-125.jpeg",
    fallbackImage: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "skl-pasir-kasar-konkrit",
    title: "Pasir Kasar Konkrit (Coarse Sand / Concrete Sand) - Per Bag / Per Lori",
    brand: "SKL Quarry Direct",
    mainCategory: "BUILDING MATERIALS",
    subCategory: "Pasir & Agregat",
    spec: "Gred kasar berpasir tajam • Kekuatan mampatan tinggi • Standard JKR",
    description: "Pasir kasar bermutu tinggi untuk bancuhan struktur konkrit, tiang, rasuk (beam), tapak tiang (footing), dan lantai konkrit tebal. Memastikan ikatan agregat batu baur dan simen yang kukuh tanpa mendapan.",
    unit: "Beg / Lori (3 Ton / 10 Ton)",
    application: "Bancuhan konkrit tiang, slab lantai, footing struktur, longkang simen & ikat bata asas",
    localImage: "/catalogue/batu-merah-common-brick-per-pcs.jpeg",
    fallbackImage: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "skl-simen-portland-biasa",
    title: "Simen Portland Biasa (Ordinary Portland Cement / OPC 50kg)",
    brand: "YTL / Hume / CIMA",
    mainCategory: "BUILDING MATERIALS",
    subCategory: "Simen & Binder",
    spec: "50kg per beg • Pensijilan SIRIM MS 522 • Kekuatan awal & jangka panjang tinggi",
    description: "Simen serbaguna standard binaan Malaysia untuk semua jenis kerja struktur, pembinaan dinding batu-bata, plastering asas, dan pembancuhan mortar konkrit. Penghantaran satu palet (40-50 beg) atau per beg disediakan.",
    unit: "50kg Beg / Palet",
    application: "Struktur konkrit am, ikatan bata pasir/merah, lepaan simen kasar & slab lantai",
    localImage: "/catalogue/cement-sand-brick-common-brick-per-pcs.jpeg",
    fallbackImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "skl-skim-coat-base-grey",
    title: "Skim Coat Base Plaster (Kelabu / Grey Undercoat 40kg)",
    brand: "Sika / Weber / Dycote",
    mainCategory: "BUILDING MATERIALS",
    subCategory: "Skim Coat & Plaster",
    spec: "40kg beg • Campuran polimer khas • Ketebalan lepaan 2mm - 4mm",
    description: "Plaster skim coat asas kelabu siap campur untuk meratakan permukaan dinding konkrit pratuang atau dinding bata yang tidak rata sebelum lapisan kemasan akhir. Daya lekatan tinggi dan meminimumkan risiko retak rambut.",
    unit: "40kg Beg / Palet",
    application: "Lapisan dasar dinding konkrit, dinding lepaan luar & dalaman bangunan",
    localImage: "/catalogue/pbm-ventilation-block-star-vb238-125.jpeg",
    fallbackImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "skl-skim-coat-finish-white",
    title: "Skim Coat Finishing Plaster (Putih / White Topcoat 25kg)",
    brand: "Sika / Weber / Dycote",
    mainCategory: "BUILDING MATERIALS",
    subCategory: "Skim Coat & Plaster",
    spec: "25kg beg • Permukaan licin sutera • Sedia untuk cat terus",
    description: "Serbuk skim coat kemasan akhir putih untuk menghasilkan permukaan dinding dan siling yang ultra-licin sebelum kerja mengecat. Mengurangkan penyerapan cat dan menghasilkan warna cat yang sekata dan premium.",
    unit: "25kg Beg / Palet",
    application: "Kemasan licin dinding dalaman, plaster siling gipsum & kemasan bilik",
    localImage: "/catalogue/pbm-ventilation-block-square-vb220-125.jpeg",
    fallbackImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "skl-tile-gum-heavy-duty",
    title: "Gam Jubin Heavy Duty Tile Adhesive (Tile Gum 25kg)",
    brand: "Sika / Weber / Bostik",
    mainCategory: "BUILDING MATERIALS",
    subCategory: "Gam Jubin & Perekat",
    spec: "Gred C2TE fleksibel • Lekatan tinggi untuk jubin homogen & porselin besar",
    description: "Perekat jubin polimer bertetulang (Tile Gum) kalis air untuk pemasangan jubin seramik, homogenous tile, porcelain, dan batu semula jadi pada lantai serta dinding basah. Tiada lendutan ketika pemasangan dinding menegak.",
    unit: "25kg Beg",
    application: "Pemasangan jubin bilik air, kolam, balkoni luar, dapur basah & jubin lantai saiz besar",
    localImage: "/catalogue/pbm-grass-paver-cb05.jpeg",
    fallbackImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "skl-batu-split-agregat",
    title: "Batu Baur Kasar 3/4\" (Aggregate Stone / Crushed Granite Stone)",
    brand: "SKL Quarry Direct",
    mainCategory: "BUILDING MATERIALS",
    subCategory: "Pasir & Agregat",
    spec: "Saiz 20mm (3/4 inci) granit hancur • Bersih tanpa debu tanah",
    description: "Batu aggregate granit berkualiti untuk bancuhan konkrit struktur bertetulang, slab jalan masuk, saliran parit perancis (french drain), dan tapak paver. Mempunyai kekuatan galas beban yang tinggi.",
    unit: "Beg / Lori (3 Ton / 10 Ton)",
    application: "Konkrit struktur bertetulang, konkrit jalan masuk kenderaan berat & tapak saliran",
    localImage: "/catalogue/heavy-duty-interlocking-paver-ip80.jpeg",
    fallbackImage: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "skl-gam-jubin-latex-admix",
    title: "Latex Admixture Perekat Simen & Kalis Air (Latex Gum 4L / 20L)",
    brand: "Sika / Bostik / Pentens",
    mainCategory: "WATERPROOFING & SEALANT",
    subCategory: "Waterproofing & Admixture",
    spec: "Pek 4 Liter / Tong 20 Liter • Meningkatkan kekuatan lekatan mortar & kalis air",
    description: "Cecair emulsi polimer sintetik untuk ditambah ke dalam bancuhan simen dan gam jubin bagi meningkatkan fleksibiliti, rintangan calar, dan keupayaan kalis air pada kawasan basah.",
    unit: "4L Botol / 20L Tong",
    application: "Kawasan tandas, balkoni terdedah, kolam takungan air & lantai simen rendered",
    localImage: "/catalogue/pbm-ventilation-block-circle-vb221-125.jpeg",
    fallbackImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=80",
    inStock: true
  }
];

// 2. Classify function matching screenshot left sidebar
function classifyProduct(p) {
  const cat = (p.category || '').toUpperCase();
  const title = (p.title || '').toUpperCase();

  if (cat.includes('BRICK') || cat.includes('BLOCK') || cat.includes('PAVER') || cat.includes('BUILDING') || cat.includes('ADHESIVE CEMENT') || title.includes('PASIR') || title.includes('CEMENT') || title.includes('SIMEN') || title.includes('SKIM') || title.includes('GUM') || title.includes('PLASTER') || title.includes('MORTAR')) {
    return 'BUILDING MATERIALS';
  }
  if (cat.includes('WATERPROOF') || cat.includes('SEALANT') || cat.includes('SIKA') || cat.includes('BOSTIK')) {
    return 'WATERPROOFING & SEALANT';
  }
  if (cat.includes('PLUMBING') || cat.includes('PIPE') || cat.includes('FITTING') || cat.includes('UPVC') || cat.includes('PPR') || cat.includes('PVC PIPE')) {
    return 'PLUMBING MATERIALS';
  }
  if (cat.includes('KITCHEN') || cat.includes('BATH') || cat.includes('SINK') || cat.includes('BASIN') || cat.includes('CABINET') || cat.includes('MIRROR') || cat.includes('TAP') || cat.includes('FAUCET')) {
    return 'KITCHEN & BATH';
  }
  if (cat.includes('ELECTRICAL') || cat.includes('SCHNEIDER') || cat.includes('AVATARON') || cat.includes('SWITCH') || cat.includes('BREAKER') || cat.includes('CABLE')) {
    return 'ELECTRICAL';
  }
  if (cat.includes('LIGHT') || cat.includes('DOWNLIGHT') || cat.includes('ECOBRIGHT') || cat.includes('LED') || cat.includes('TRACK LIGHT') || cat.includes('BULB')) {
    return 'LIGHTING';
  }
  if (cat.includes('FAN') || cat.includes('VENTILAT') || cat.includes('ALKOVA') || cat.includes('ALPHA') || cat.includes('COSA') || cat.includes('HOUM') || cat.includes('AIREGARD')) {
    return 'FAN & VENTILATOR';
  }
  if (cat.includes('PAINT') || cat.includes('DULUX') || cat.includes('NIPPON') || cat.includes('GORI') || cat.includes('WOOD & METAL') || cat.includes('INTERIOR') || cat.includes('EXTERIOR')) {
    return 'PAINT';
  }
  if (cat.includes('DOOR LOCK') || cat.includes('AEGLOC') || cat.includes('ARMOR') || cat.includes('LOCK') || cat.includes('HANDLESET')) {
    return 'DOOR LOCK';
  }
  if (cat.includes('SAFETY') || cat.includes('GLOVE') || cat.includes('HELMET') || cat.includes('BOOT') || cat.includes('BOX')) {
    return 'SAFETY EQUIPMENTS';
  }
  if (cat.includes('CUTTING') || cat.includes('ROUTER BIT') || cat.includes('ARDEN') || cat.includes('AKODA') || cat.includes('COOLMAN') || cat.includes('BLADE') || cat.includes('CHAMFER') || cat.includes('BEVEL')) {
    return 'CUTTING TOOLS';
  }
  if (cat.includes('MACHINERY') || cat.includes('PUMP') || cat.includes('GENERATOR') || cat.includes('TSUNAMI') || cat.includes('ENGINE') || cat.includes('KARCHER') || cat.includes('PRESSURE WASHER') || cat.includes('WHEEL BARROW')) {
    return 'MACHINERY';
  }
  if (cat.includes('POWER') || cat.includes('CORDLESS') || cat.includes('BOSCH') || cat.includes('DEWALT') || cat.includes('DONGCHENG') || cat.includes('HIKOKI') || cat.includes('MILWAUKEE') || cat.includes('MAKITA') || cat.includes('GRINDER') || cat.includes('DRILL') || cat.includes('PLANER') || cat.includes('SANDER') || cat.includes('ROUTER') || cat.includes('BATTERY & CHARGER')) {
    return 'POWER TOOLS';
  }
  if (cat.includes('HOME APPLIANCE') || cat.includes('MIDEA') || cat.includes('FOTILE') || cat.includes('ELBA') || cat.includes('HOOD') || cat.includes('HOB') || cat.includes('DISHWASHER')) {
    return 'HOME APPLIANCES';
  }
  if (cat.includes('DECORATION') || cat.includes('PANEL') || cat.includes('WALL PANEL') || cat.includes('PROFILE')) {
    return 'HOME DECORATION';
  }
  return 'TOOLS';
}

function generateHumanDesc(p, title) {
  const tUpper = title.toUpperCase();
  const brand = p.brand || 'SKL Hardware';

  if (tUpper.includes('AVATARON') || tUpper.includes('SWITCH') || tUpper.includes('SOCKET')) {
    return `Sirim-certified architectural wiring accessory from ${brand}. Features seamless frameless rock switches, fire-retardant polycarbonate housing, and durable silver contact points for residential and commercial fit-outs.`;
  }
  if (tUpper.includes('CIRCUIT') || tUpper.includes('BREAKER') || tUpper.includes('MCB') || tUpper.includes('RCCB')) {
    return `Industrial-grade modular circuit protection device from ${brand}. Designed for standard distribution boards with high breaking capacity and rapid thermal-magnetic trip response.`;
  }
  if (tUpper.includes('ROUTER') || tUpper.includes('TRIMMER')) {
    return `Precision woodworking equipment suited for edge profiling, grooving, and cabinetry joinery. Heavy-duty motor with micro-fine depth adjustments.`;
  }
  if (tUpper.includes('DRILL') || tUpper.includes('IMPACT WRENCH') || tUpper.includes('IMPACT DRIVER')) {
    return `High-torque contractor-grade drilling and fastening tool. Engineered for timber frames, structural steel fastening, and heavy masonry anchor holes.`;
  }
  if (tUpper.includes('GRINDER') || tUpper.includes('SANDER') || tUpper.includes('POLISHER')) {
    return `Heavy-duty surface preparation tool designed for cutting rebar, smoothing concrete edges, and grinding structural welds.`;
  }
  if (tUpper.includes('PUMP') || tUpper.includes('BOOSTER')) {
    return `Reliable water pressure boosting system with thermal overload protection and rust-proof stainless steel impeller for consistent household and commercial water pressure.`;
  }
  if (tUpper.includes('SINK') || tUpper.includes('BASIN') || tUpper.includes('TAP')) {
    return `Commercial-grade sanitary fixture crafted from corrosion-resistant SUS304 stainless steel with satin finish and anti-condensation undercoating.`;
  }
  if (tUpper.includes('LIGHT') || tUpper.includes('DOWNLIGHT') || tUpper.includes('LED')) {
    return `Energy-saving architectural LED luminaire with high colour rendering (CRI > 80), aluminium heat sink, and uniform glare-free light distribution.`;
  }
  if (tUpper.includes('FAN') || tUpper.includes('VENTILAT')) {
    return `Quiet high-efficiency ventilation solution with aerodynamic blades and durable ball-bearing motor for continuous residential or commercial airflow.`;
  }
  if (tUpper.includes('PAINT') || tUpper.includes('COAT')) {
    return `Premium trade coating formulated for Malaysian weather conditions. Provides mould resistance, strong scrubbability, and long-lasting colour retention.`;
  }
  if (tUpper.includes('LOCK') || tUpper.includes('CYLINDER')) {
    return `High-security mechanical or digital access locking hardware constructed from solid brass and reinforced zinc alloy to prevent forced entry.`;
  }
  return `Contractor-grade ${brand} hardware engineered for daily jobsite durability. Complies with industry trade standards for commercial maintenance, renovation, and construction.`;
}

const allProducts = [...essentialBuildingSupplies];
const seenTitles = new Set(essentialBuildingSupplies.map(p => p.title));

for (const p of rawData) {
  const title = cleanTitle(p.title);
  if (seenTitles.has(title)) continue;
  seenTitles.add(title);

  const mainCategory = classifyProduct(p);

  allProducts.push({
    id: p.id,
    title,
    brand: p.brand || 'SKL Hardware',
    mainCategory,
    subCategory: p.category || mainCategory,
    spec: `${p.brand || 'Contractor Quality'} • Ready Stock`,
    description: generateHumanDesc(p, title),
    unit: 'Unit / Box / Pallet',
    application: `Ideal for ${mainCategory.toLowerCase()} works and professional contractor installations`,
    localImage: `/chinchunimages/${p.localImage}`,
    fallbackImage: p.remoteImage || `/chinchunimages/${p.localImage}`,
    inStock: true
  });
}

console.log(`Generated master dataset with ${allProducts.length} total products!`);

// Write out to src/data/all-products.json
fs.writeFileSync('src/data/all-products.json', JSON.stringify(allProducts, null, 2));
console.log('Saved to src/data/all-products.json');
