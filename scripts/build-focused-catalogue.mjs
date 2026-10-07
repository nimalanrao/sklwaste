import fs from 'fs';
import path from 'path';

const INDEX_PATH = 'chinchunimages/products_index.json';
const rawData = JSON.parse(fs.readFileSync(INDEX_PATH, 'utf-8'));

function cleanTitle(raw) {
  let t = raw || '';
  t = t.replace(/\s*(Power Tools|Building Materials|Plumbing|Kitchen Sink|Tools|Machinery)?\s*(Selangor|KL|Shah Alam|Malaysia|Store|Supplier|Supply|,)+/gi, ' ');
  t = t.replace(/&amp;/g, '&');
  t = t.replace(/&quot;/g, '"');
  t = t.replace(/\s+/g, ' ').trim();
  return t;
}

// 1. Primary Building Supply Items explicitly specified by user:
// Pasir Kasar (coarse sand), Pasir Halus (fine sand), Batu Aggregate / Rock (crushed granite),
// Cement, Skim Coat, Tile Gum.
// SIZES: In TON (Lori 3 Tan / 10 Tan / Tipper) and GUNI (Bag / Beg 50kg / 40kg / 25kg)
const essentialBuildingSupplies = [
  {
    id: "skl-pasir-halus-sungai-guni-ton",
    title: "Pasir Halus Bersih (Fine Sand / Plastering Sand) - Per Guni & Per Ton",
    brand: "SKL Direct Quarry",
    mainCategory: "BUILDING MATERIALS",
    subCategory: "Pasir Halus",
    spec: "Saiz: Per Guni (Beg) & Per Ton (Lori 3 Tan / 10 Tan) • Ditapis halus bebas lumpur",
    description: "Pasir halus bersih sungai gred plastering yang telah ditapis rapi. Sangat sesuai untuk lepaan dinding licin (cement plastering), ikat bata kemas, dan bancuhan simen halus. Sedia dibekalkan dalam saiz Guni kecil untuk retail atau pukal Ton terus melalui lori tipper ke tapak projek.",
    unit: "Guni (Beg) / Ton (Lori 3 Tan & 10 Tan)",
    application: "Plastering dinding dalaman & luaran, rendering halus, lepaan kemas, ikat bata",
    localImage: "/catalogue/pbm-batu-angin-biasa-vb224-125.jpeg",
    fallbackImage: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "skl-pasir-kasar-konkrit-guni-ton",
    title: "Pasir Kasar Konkrit (Coarse Sand / Concrete Sand) - Per Guni & Per Ton",
    brand: "SKL Direct Quarry",
    mainCategory: "BUILDING MATERIALS",
    subCategory: "Pasir Kasar",
    spec: "Saiz: Per Guni (Beg) & Per Ton (Lori 3 Tan / 10 Tan) • Pasir tajam mampatan tinggi",
    description: "Pasir kasar sungai berkualiti tinggi dengan butiran berpasir tajam mengikut spesifikasi JKR. Menjamin ikatan simen dan batu baur yang sangat padu tanpa rongga mendapan untuk struktur galas beban. Boleh dibeli ikut Guni untuk kerja ubahsuai rumah atau muatan Ton untuk kontraktor.",
    unit: "Guni (Beg) / Ton (Lori 3 Tan & 10 Tan)",
    application: "Bancuhan konkrit tiang, slab lantai, footing struktur, ikat bata asas, longkang konkrit",
    localImage: "/catalogue/batu-merah-common-brick-per-pcs.jpeg",
    fallbackImage: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "skl-batu-agregat-3-4-guni-ton",
    title: "Batu Baur Kasar 3/4\" (Aggregate Rock / Crushed Granite) - Per Guni & Per Ton",
    brand: "SKL Direct Quarry",
    mainCategory: "BUILDING MATERIALS",
    subCategory: "Aggregate Rock",
    spec: "Saiz: Per Guni (Beg) & Per Ton (Lori 3 Tan / 10 Tan) • Granit hancur 20mm (3/4\")",
    description: "Batu aggregate granit hancur gred 3/4 inci berkekuatan mampatan tinggi, bersih dari tanah atau habuk lempung. Sesuai untuk bancuhan konkrit struktur bertetulang, jalan masuk berturap (driveway), parit saliran perancis (french drain), dan tapak paver. Dijual ikut saiz Guni atau timbangan Ton.",
    unit: "Guni (Beg) / Ton (Lori 3 Tan & 10 Tan)",
    application: "Bancuhan konkrit struktur tiang & rasuk, slab lantai tugas berat, tapak saliran",
    localImage: "/catalogue/heavy-duty-interlocking-paver-ip80.jpeg",
    fallbackImage: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "skl-simen-portland-opc-guni",
    title: "Simen Portland Biasa (OPC Ordinary Portland Cement 50kg)",
    brand: "YTL / Hume / CIMA",
    mainCategory: "BUILDING MATERIALS",
    subCategory: "Simen",
    spec: "Saiz: 50kg Guni (Beg) / Palet 40-50 Beg • Standard SIRIM MS 522",
    description: "Simen binaan utama standard industri untuk pembinaan dinding, konkrit bertetulang, lepaan simen dan lantai. Kualiti konsisten dengan ikatan hidraulik berkekuatan tinggi.",
    unit: "Guni 50kg / Palet (40-50 Beg)",
    application: "Kerja struktur konkrit, ikat bata simen & merah, kemasan lepaan asas",
    localImage: "/catalogue/cement-sand-brick-common-brick-per-pcs.jpeg",
    fallbackImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "skl-skim-coat-base-grey-guni",
    title: "Skim Coat Base Plaster (Plaster Asas Kelabu 40kg)",
    brand: "Sika / Weber / Dycote",
    mainCategory: "BUILDING MATERIALS",
    subCategory: "Skim Coat",
    spec: "Saiz: 40kg Guni (Beg) • Ketebalan lepaan 2mm - 4mm • Polimer bertetulang",
    description: "Serbuk skim coat siap bancuh untuk meratakan dinding konkrit atau bata tidak rata sebelum lapisan akhir. Mempunyai daya lekatan tinggi dan mengelakkan retak rambut.",
    unit: "Guni 40kg / Palet",
    application: "Meratakan dinding kasar, permukaan konkrit pratuang & lepaan asas",
    localImage: "/catalogue/pbm-ventilation-block-star-vb238-125.jpeg",
    fallbackImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "skl-skim-coat-finish-white-guni",
    title: "Skim Coat Finishing Topcoat (Plaster Licin Putih 25kg)",
    brand: "Sika / Weber / Dycote",
    mainCategory: "BUILDING MATERIALS",
    subCategory: "Skim Coat",
    spec: "Saiz: 25kg Guni (Beg) • Kemasan dinding ultra-licin sedia dicat",
    description: "Serbuk skim coat kemasan akhir putih untuk menghasilkan dinding dalaman dan siling yang sangat licin. Menjimatkan penggunaan cat dan memberikan kemasan cat yang sekata.",
    unit: "Guni 25kg / Palet",
    application: "Kemasan dinding dalaman licin, siling gipsum & permukaan siap cat",
    localImage: "/catalogue/pbm-ventilation-block-square-vb220-125.jpeg",
    fallbackImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "skl-tile-gum-c2te-guni",
    title: "Gam Jubin Tile Gum Heavy Duty (Tile Adhesive 25kg)",
    brand: "Sika / Bostik / Weber",
    mainCategory: "BUILDING MATERIALS",
    subCategory: "Tile Gum",
    spec: "Saiz: 25kg Guni (Beg) • Gred C2TE kalis air & daya lekatan fleksibel",
    description: "Perekat simen jubin polimer bertetulang (Tile Gum) kalis gelincir untuk jubin porselin, homogenous tile dan jubin saiz besar di kawasan basah mahupun kering.",
    unit: "Guni 25kg",
    application: "Pemasangan jubin bilik air, lantai dapur, balkoni luar & kolam air",
    localImage: "/catalogue/pbm-grass-paver-cb05.jpeg",
    fallbackImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=80",
    inStock: true
  },
  {
    id: "skl-batu-bata-merah-common",
    title: "Batu Bata Merah Tanah Liat (Clay Red Common Brick)",
    brand: "SKL Building Materials",
    mainCategory: "BUILDING MATERIALS",
    subCategory: "Bata & Blok",
    spec: "Saiz standard 215mm x 100mm x 65mm • Mampatan kukuh tahan panas",
    description: "Bata merah bakar tanah liat untuk dinding tahan api, penebat haba tinggi dan pembinaan struktur perimeter kekal. Boleh dibeli per keping atau per palet lori.",
    unit: "Keping / Palet (500-600 keping)",
    application: "Dinding kediaman, pagar sempadan, struktur tahan api & partition bilik",
    localImage: "/catalogue/batu-merah-common-brick-per-pcs.jpeg",
    fallbackImage: "/catalogue/batu-merah-common-brick-per-pcs.jpeg",
    inStock: true
  },
  {
    id: "skl-cement-sand-block-hollow",
    title: "Blok Pasir Simen Hollow (Cement Sand Block 100mm / 150mm)",
    brand: "SKL Building Materials",
    mainCategory: "BUILDING MATERIALS",
    subCategory: "Bata & Blok",
    spec: "Saiz: 390mm x 190mm x 100mm / 150mm • Ringan & cepat pasang",
    description: "Blok konkrit pasir simen berongga untuk pembinaan dinding perimeter, pagar kilang, retaining wall dan dinding bilik. Menjimatkan masa ikat bata dan mortar lepaan.",
    unit: "Keping / Palet",
    application: "Pagar industri, dinding retaining wall, bengkel dan partition besar",
    localImage: "/catalogue/cement-sand-block-per-pcs.jpeg",
    fallbackImage: "/catalogue/cement-sand-block-per-pcs.jpeg",
    inStock: true
  },
  {
    id: "skl-interlocking-paver-ip80",
    title: "Heavy Duty Interlocking Paver (IP80 - 80mm)",
    brand: "PBM Concrete",
    mainCategory: "BUILDING MATERIALS",
    subCategory: "Bata & Blok",
    spec: "Ketebalan 80mm • Gred galas beban kenderaan berat • Standard JKR",
    description: "Paver konkrit saling mengunci berketumpatan tinggi untuk jalan laluan lori, kawasan parkir komersial, perumahan dan laluan pejalan kaki berturap.",
    unit: "Keping / Meter Persegi / Palet",
    application: "Laluan lori, tapak parkir industri, laman rumah & jalan masuk premis",
    localImage: "/catalogue/heavy-duty-interlocking-paver-ip80.jpeg",
    fallbackImage: "/catalogue/heavy-duty-interlocking-paver-ip80.jpeg",
    inStock: true
  }
];

// USER MANDATED ONLY THESE 6 REAL BUSINESS CATEGORIES:
// 1. BUILDING MATERIALS (including coarse sand, fine sand, aggregate rock in Ton & Guni, cement, skim, gum, bricks, blocks)
// 2. TOOLS
// 3. CUTTING TOOLS
// 4. WATERPROOFING & SEALANT
// 5. KITCHEN & BATH
// 6. PAINT

function classifyProduct(p) {
  const cat = (p.category || '').toUpperCase();
  const title = (p.title || '').toUpperCase();

  // Building Materials
  if (cat.includes('BRICK') || cat.includes('BLOCK') || cat.includes('PAVER') || cat.includes('BUILDING') || cat.includes('ADHESIVE CEMENT') || title.includes('PASIR') || title.includes('CEMENT') || title.includes('SIMEN') || title.includes('SKIM') || title.includes('GUM') || title.includes('PLASTER') || title.includes('MORTAR') || title.includes('AGGREGATE')) {
    return 'BUILDING MATERIALS';
  }
  // Waterproofing & Sealant
  if (cat.includes('WATERPROOF') || cat.includes('SEALANT') || cat.includes('SIKA') || cat.includes('BOSTIK')) {
    return 'WATERPROOFING & SEALANT';
  }
  // Kitchen & Bath
  if (cat.includes('KITCHEN') || cat.includes('BATH') || cat.includes('SINK') || cat.includes('BASIN') || cat.includes('CABINET') || cat.includes('MIRROR') || cat.includes('TAP') || cat.includes('FAUCET')) {
    return 'KITCHEN & BATH';
  }
  // Paint
  if (cat.includes('PAINT') || cat.includes('DULUX') || cat.includes('NIPPON') || cat.includes('GORI') || cat.includes('WOOD & METAL') || cat.includes('INTERIOR') || cat.includes('EXTERIOR')) {
    return 'PAINT';
  }
  // Cutting Tools
  if (cat.includes('CUTTING') || cat.includes('ROUTER BIT') || cat.includes('ARDEN') || cat.includes('AKODA') || cat.includes('COOLMAN') || cat.includes('BLADE') || cat.includes('CHAMFER') || cat.includes('BEVEL') || title.includes('BLADE') || title.includes('CUTTER') || title.includes('BIT')) {
    return 'CUTTING TOOLS';
  }
  // Tools (Hardware, Hand tools, Power tools, Wrenches, Drills, Grinders, Pliers)
  if (cat.includes('TOOL') || cat.includes('WRENCH') || cat.includes('SOCKET') || cat.includes('DRILL') || cat.includes('GRINDER') || cat.includes('SANDER') || cat.includes('SAW') || cat.includes('BOSCH') || cat.includes('MILWAUKEE') || cat.includes('DONGCHENG') || cat.includes('DEWALT') || cat.includes('HIKOKI') || cat.includes('MAKITA') || cat.includes('PLIER') || cat.includes('HAMMER')) {
    return 'TOOLS';
  }

  // Filter out unwanted categories like appliances, lighting, fans, decorative panels
  return null;
}

function generateHumanDesc(p, title) {
  const tUpper = title.toUpperCase();
  const brand = p.brand || 'SKL Hardware';

  if (tUpper.includes('ROUTER') || tUpper.includes('TRIMMER') || tUpper.includes('BIT')) {
    return `Mata pemotong atau perkakasan pertukangan kayu tepat jenama ${brand}. Dihasilkan daripada karbida tungsten berketumpatan tinggi untuk pemotongan profil dan ketahanan geseran berpanjangan.`;
  }
  if (tUpper.includes('BLADE') || tUpper.includes('SAW') || tUpper.includes('CUT')) {
    return `Bilah pemotong tahan lasak gred industri daripada ${brand}. Menghasilkan pemotongan bersih merentasi kayu, aluminium, rebar besi dan jubin konkrit.`;
  }
  if (tUpper.includes('DRILL') || tUpper.includes('IMPACT WRENCH') || tUpper.includes('IMPACT DRIVER')) {
    return `Alat gerudi dan pengikat tork tinggi gred kontraktor jenama ${brand}. Direka untuk pemasangan struktur rangka keluli, kayu tebal, dan kerja tebuk dinding konkrit.`;
  }
  if (tUpper.includes('GRINDER') || tUpper.includes('SANDER') || tUpper.includes('POLISHER')) {
    return `Alat penyediaan permukaan tugas berat daripada ${brand}. Sesuai untuk memotong rebar, meratakan kesan kimpalan, dan melicinkan permukaan logam serta konkrit.`;
  }
  if (tUpper.includes('WRENCH') || tUpper.includes('SOCKET') || tUpper.includes('SPANNER')) {
    return `Set perengkuh dan soket mekanikal chrome vanadium tempaan haba untuk kerja penyelenggaraan tapak, jentera lori dan kerja perpaipan industri.`;
  }
  if (tUpper.includes('SINK') || tUpper.includes('BASIN') || tUpper.includes('TAP')) {
    return `Kelengkapan sanitari berkualiti tinggi diperbuat daripada keluli tahan karat SUS304 tebal dengan kemasan satin tahan karat untuk kegunaan dapur komersial dan kediaman.`;
  }
  if (tUpper.includes('PAINT') || tUpper.includes('CAT') || tUpper.includes('COAT')) {
    return `Cat binaan berkualiti tinggi daripada ${brand} yang dirumus khas untuk cuaca panas dan lembap Malaysia. Memberikan daya perlindungan kulat dan kemasan warna kekal sekata.`;
  }
  if (tUpper.includes('WATERPROOF') || tUpper.includes('SEALANT') || tUpper.includes('SIKA') || tUpper.includes('BOSTIK')) {
    return `Bahan kimia binaan kalis air dan pengedap poliuretana/silikon gred profesional dari ${brand} untuk mencegah kebocoran sambungan struktur konkrit dan bingkai.`;
  }
  return `Perkakasan dan peralatan binaan gred kontraktor jenama ${brand} untuk kegunaan tapak binaan, kerja ubah suai dan kerja penyelenggaraan harian.`;
}

const allProducts = [...essentialBuildingSupplies];
const seenTitles = new Set(essentialBuildingSupplies.map(p => p.title));

for (const p of rawData) {
  const mainCategory = classifyProduct(p);
  if (!mainCategory) continue; // Exclude non-relevant categories

  const title = cleanTitle(p.title);
  if (seenTitles.has(title)) continue;
  seenTitles.add(title);

  allProducts.push({
    id: p.id,
    title,
    brand: p.brand || 'SKL Hardware',
    mainCategory,
    subCategory: p.category || mainCategory,
    spec: `${p.brand || 'Contractor Quality'} • Ready Stock`,
    description: generateHumanDesc(p, title),
    unit: 'Unit / Box / Pallet',
    application: `Sesuai untuk kerja-kerja ${mainCategory.toLowerCase()} dan pemasangan kontraktor profesional`,
    localImage: `/chinchunimages/${p.localImage}`,
    fallbackImage: p.remoteImage || `/chinchunimages/${p.localImage}`,
    inStock: true
  });
}

console.log(`Filtered master dataset down to relevant categories with ${allProducts.length} total products!`);

const counts = {};
for (const p of allProducts) {
  counts[p.mainCategory] = (counts[p.mainCategory] || 0) + 1;
}
console.log('Category Counts:', counts);

fs.writeFileSync('src/data/all-products.json', JSON.stringify(allProducts, null, 2));
console.log('Saved to src/data/all-products.json');
