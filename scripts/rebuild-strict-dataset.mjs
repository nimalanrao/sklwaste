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

// 1. Pinned Primary Building Materials
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
    localImage: "/catalogue/pasir-halus-bersih-clean.jpeg",
    fallbackImage: "/catalogue/pasir-halus-bersih-clean.jpeg",
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
    localImage: "/catalogue/pasir-kasar-konkrit-clean.jpeg",
    fallbackImage: "/catalogue/pasir-kasar-konkrit-clean.jpeg",
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
    localImage: "/catalogue/batu-agregat-granit-clean.jpeg",
    fallbackImage: "/catalogue/batu-agregat-granit-clean.jpeg",
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
    localImage: "/catalogue/cement-portland-50kg.jpeg",
    fallbackImage: "/catalogue/cement-portland-50kg.jpeg",
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
    localImage: "/catalogue/weber-skimcoat-base-grey.jpeg",
    fallbackImage: "/catalogue/weber-skimcoat-base-grey.jpeg",
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
    localImage: "/catalogue/weber-skimcoat-finish-white.jpeg",
    fallbackImage: "/catalogue/weber-skimcoat-finish-white.jpeg",
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
    localImage: "/catalogue/tile-gum-weber-easyflex.jpeg",
    fallbackImage: "/catalogue/tile-gum-weber-easyflex.jpeg",
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
    localImage: "/catalogue/batu-merah-common-brick.jpeg",
    fallbackImage: "/catalogue/batu-merah-common-brick.jpeg",
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
    localImage: "/catalogue/hollow-block-clean.jpeg",
    fallbackImage: "/catalogue/hollow-block-clean.jpeg",
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
    localImage: "/catalogue/batu-agregat-granit-clean.jpeg",
    fallbackImage: "/catalogue/batu-agregat-granit-clean.jpeg",
    inStock: true
  }
];

// 2. Strict Whitelist Mapping based exclusively on original Chin Chun Hardware category names
const BUILDING_MATERIALS_CATS = new Set([
  'Building Materials',
  'Brick, Block &amp; Paver',
  'Ventilation Block',
  'PBM VB',
  'PBM VB+',
  'PBM Veil Breeze Blocks',
  'Skimcoat, Render, Self-Levelling Cement & Grouting',
  'Adhesive Cement & Latex Admixture',
  'Mapei',
  'Weber'
]);

const WATERPROOFING_CATS = new Set([
  'Waterproofing & Sealant',
  'Sika',
  'Bostik',
  'Tekbond',
  'Pentens'
]);

const KITCHEN_BATH_CATS = new Set([
  'Kitchen & Bath',
  'Kitchen Sink',
  'Kitchen Sink Tap',
  'Kitchen Sink Tap &amp; Sink Mixer',
  'Sink Tap',
  'Bathroom Cabinet',
  'Water Closets',
  'Shower',
  'Urinal Flush Valve',
  'Glorex Mirror',
  'Joven Storage Water heater',
  'Joven instant Water Heater',
  'Joven',
  'Water Heater',
  'Sorento',
  'Mocha',
  'Livinox',
  'Levanzo'
]);

const PAINT_CATS = new Set([
  'Paint',
  'Nippon Paint',
  'Dulux Paint',
  'SKK Paint',
  'Interior',
  'Exterior',
  'Wood &amp; Metal',
  'Wood Stain',
  'Protective &amp; Industrial',
  'Texture Paint',
  'Gori'
]);

const CUTTING_TOOLS_CATS = new Set([
  'Cutting Tools',
  'Arden Router Bit',
  'Coolman',
  'Akoda',
  'Circular Saw Blade',
  'Diamond Cutting Blade',
  'Diamond Core Bit',
  'Diamond Grinding Cup Wheel',
  '45° Lock Miter Bit',
  '3-Wing Cutter &amp; Arbor',
  '90° V-Grooving Bit',
  '15° Bevel Bit',
  '45° Chamfer Bit',
  '45° Laminate Mitter Joint Bit',
  'Bottom Cleaning Bit',
  'Core Box Bit',
  'Corner Rounding Bit',
  'Flat Head Straight Bit',
  'Bevel Trim Bit',
  'Drawer Lock Bit',
  'Keyhole Bit',
  'Dovetail Bit',
  'Drawer Pull Bit',
  'Hinge Boring Bit',
  'Point Cutting Roundover Bit',
  'Straight Bit Single Flute',
  'Straight Bit With 1-Bearing',
  'Track Bit',
  'Straight Bit Double Flute',
  'Straight Bit With 2-Bearing',
  'Top Bearing Flush Bit',
  'Arden Reduction Sleeve'
]);

const TOOLS_CATS = new Set([
  'Tools',
  'Power Tools',
  'Bosch',
  'DongCheng',
  'Dewalt',
  'Hikoki',
  'Milwaukee',
  'Makita',
  'Wrench &amp; Socket',
  'Screwdriver',
  'Measuring Tape',
  'Ladder',
  'Vessel',
  'Cordless Drill, Driver, &amp; Impact Wrench',
  'Cordless Drill &amp; Driver',
  'Cordless Grinder &amp; Circular Saw',
  'Cordless Impact Drill, Impact driver, Rotary Hammer',
  'Cordless Polisher, Sander, Router &amp; Planner',
  'Electric Angle Grinder, Die Grinder, Mitre Saw, Cut Off Machine',
  'Electrical Angle Grinder, Straight Grinder &amp; Bench Grinder',
  'Electric Impact Drill, Rotary Hammer &amp; Percussion Hammer',
  'Electric Jigsaw, Trimmer, Router, Planer, Electric Sander &amp; Polisher',
  'Battery &amp; Charger',
  'Nibbler'
]);

function getStrictCategory(p) {
  const cat = p.category;
  if (BUILDING_MATERIALS_CATS.has(cat)) return 'BUILDING MATERIALS';
  if (WATERPROOFING_CATS.has(cat)) return 'WATERPROOFING & SEALANT';
  if (KITCHEN_BATH_CATS.has(cat)) return 'KITCHEN & BATH';
  if (PAINT_CATS.has(cat)) return 'PAINT';
  if (CUTTING_TOOLS_CATS.has(cat)) return 'CUTTING TOOLS';
  if (TOOLS_CATS.has(cat)) return 'TOOLS';
  return null;
}

function generateHumanDesc(p, title, cat) {
  const brand = p.brand || 'SKL Hardware';
  switch (cat) {
    case 'BUILDING MATERIALS':
      return `Bahan binaan struktur berkualiti tinggi dari ${brand} mengikut piawaian industri Malaysia. Sesuai untuk pembinaan asas, ikatan bata kukuh, dan lepaan dinding licin.`;
    case 'WATERPROOFING & SEALANT':
      return `Sistem kalis air dan pengedap poliuretana/silikon berkeupayaan tinggi dari ${brand} untuk mencegah kebocoran sambungan struktur dan permukaan basah.`;
    case 'PAINT':
      return `Cat kemasan dinding dan permukaan berkualiti tinggi dari ${brand} dengan ketahanan cuaca tropika, rintangan kulat dan warna tahan pudar.`;
    case 'CUTTING TOOLS':
      return `Mata pemotong karbida dan bilah gergaji tahan geseran gred industri daripada ${brand} untuk pemotongan kayu, rebar, jubin dan aluminium.`;
    case 'KITCHEN & BATH':
      return `Kelengkapan sanitari dan dapur gred komersial daripada ${brand} diperbuat daripada bahan tahan karat dengan reka bentuk ergonomik moden.`;
    case 'TOOLS':
      return `Alat kuasa dan perkakasan manual tahan lasak gred kontraktor daripada ${brand} untuk kerja tapak binaan, mekanikal dan pertukangan.`;
    default:
      return `Perkakasan standard industri daripada ${brand} untuk kegunaan profesional dan kontraktor.`;
  }
}

const allProducts = [...essentialBuildingSupplies];
const seenTitles = new Set(essentialBuildingSupplies.map(p => cleanTitle(p.title).toLowerCase()));
const seenIds = new Set(essentialBuildingSupplies.map(p => p.id));

for (const p of rawData) {
  const mainCat = getStrictCategory(p);
  if (!mainCat) continue; // Excludes all fans, lighting, appliances, door locks, cables, etc.

  if (seenIds.has(p.id)) continue;

  const title = cleanTitle(p.title);
  const normalizedTitle = title.toLowerCase();
  if (seenTitles.has(normalizedTitle)) continue;

  seenIds.add(p.id);
  seenTitles.add(normalizedTitle);

  allProducts.push({
    id: p.id,
    title,
    brand: p.brand || 'SKL Hardware',
    mainCategory: mainCat,
    subCategory: p.category || mainCat,
    spec: `${p.brand || 'Contractor Quality'} • Ready Stock`,
    description: generateHumanDesc(p, title, mainCat),
    unit: mainCat === 'BUILDING MATERIALS' ? 'Ton / Guni / Palet' : 'Unit / Box',
    application: `Sesuai untuk kerja-kerja ${mainCat.toLowerCase()} dan pemasangan kontraktor profesional`,
    localImage: `/chinchunimages/${p.localImage}`,
    fallbackImage: p.remoteImage || `/chinchunimages/${p.localImage}`,
    inStock: true
  });
}

console.log(`Master filtered dataset: ${allProducts.length} items across exactly 6 categories.`);
const counts = {};
for (const p of allProducts) {
  counts[p.mainCategory] = (counts[p.mainCategory] || 0) + 1;
}
console.log('Category Counts:', counts);

fs.writeFileSync('src/data/all-products.json', JSON.stringify(allProducts, null, 2));
console.log('Written to src/data/all-products.json');
