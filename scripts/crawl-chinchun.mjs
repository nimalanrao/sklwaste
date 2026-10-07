import fs from "fs";
import path from "path";

const BASE_URL = "https://www.chinchunhardware.my";
const OUTPUT_DIR = path.join(process.cwd(), "chinchunimages");
const METADATA_FILE = path.join(OUTPUT_DIR, "products_index.json");
const SUMMARY_FILE = path.join(OUTPUT_DIR, "CATALOGUE_OVERVIEW.md");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 60);
}

function cleanHtml(html) {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
        }
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.text();
    } catch (e) {
      if (i === retries - 1) throw e;
      await new Promise((r) => setTimeout(r, 600 * (i + 1)));
    }
  }
}

async function downloadImage(url, destPath) {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });
    if (!res.ok) return false;
    const arrayBuffer = await res.arrayBuffer();
    fs.writeFileSync(destPath, Buffer.from(arrayBuffer));
    return true;
  } catch (e) {
    return false;
  }
}

// Concurrency pool helper
async function mapConcurrent(items, concurrency, fn) {
  const results = [];
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const current = index++;
      try {
        const res = await fn(items[current], current, items.length);
        results[current] = res;
      } catch (err) {
        results[current] = { error: err.message };
      }
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, items.length) }, () => worker());
  await Promise.all(workers);
  return results;
}

async function main() {
  console.log("=== CHIN CHUN CONCURRENT HARDWARE SCRAPER ===");
  console.log(`Target Directory: ${OUTPUT_DIR}`);

  // 1. Fetch root page to extract main categories
  console.log("Fetching /ourproducts root...");
  const rootHtml = await fetchWithRetry(`${BASE_URL}/ourproducts/`);

  const categoryMap = new Map();
  const catRegex = /href=["'](\/ourproducts\/cid\/(\d+)\/[^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = catRegex.exec(rootHtml)) !== null) {
    const relUrl = match[1];
    const catName = cleanHtml(match[3]);
    if (
      catName &&
      !catName.toLowerCase().includes("view all") &&
      !catName.toLowerCase().includes("our products") &&
      catName.length > 2 &&
      !categoryMap.has(relUrl)
    ) {
      categoryMap.set(relUrl, catName);
    }
  }

  const categories = Array.from(categoryMap.entries()).map(([relUrl, catName]) => ({
    url: `${BASE_URL}${relUrl}`,
    name: catName,
    slug: slugify(catName)
  }));

  console.log(`Discovered ${categories.length} categories.`);

  // 2. Discover product URLs concurrently
  console.log("Scanning categories for product links (concurrency: 8)...");
  const productLinks = new Map();

  await mapConcurrent(categories, 8, async (cat, i, total) => {
    try {
      const html = await fetchWithRetry(cat.url);
      const prodRegex = /href=["'](\/showproducts\/productid\/(\d+)\/[^"']*)["']/gi;
      let pMatch;
      let count = 0;
      while ((pMatch = prodRegex.exec(html)) !== null) {
        const prodUrl = `${BASE_URL}${pMatch[1]}`;
        if (!productLinks.has(prodUrl)) {
          productLinks.set(prodUrl, {
            categoryName: cat.name,
            categorySlug: cat.slug
          });
          count++;
        }
      }
      if (count > 0) {
        console.log(`[${i + 1}/${total}] ${cat.name} -> found ${count} products`);
      }
    } catch (e) {
      // ignore individual timeouts
    }
  });

  const allProductsList = Array.from(productLinks.entries()).map(([url, meta]) => ({
    url,
    ...meta
  }));

  console.log(`\nFound ${allProductsList.length} total unique product pages across the catalogue!`);

  // 3. Process products and download images concurrently (concurrency: 6)
  const products = [];
  let downloadedCount = 0;

  console.log("\nStarting product details & image download (concurrency: 6)...");

  await mapConcurrent(allProductsList, 6, async (item, i, total) => {
    try {
      const prodHtml = await fetchWithRetry(item.url);

      const ogTitleMatch = prodHtml.match(/<meta property=["']og:title["'] content=["']([^"']+)["']/i);
      const ogImgMatch = prodHtml.match(/<meta property=["']og:image["'] content=["']([^"']+)["']/i);
      const ogDescMatch = prodHtml.match(/<meta property=["']og:description["'] content=["']([^"']+)["']/i);
      const brandMatch = prodHtml.match(/<meta property=["']product:brand["'] content=["']([^"']+)["']/i);
      const catMatch = prodHtml.match(/<meta property=["']product:category["'] content=["']([^"']+)["']/i);

      let title = ogTitleMatch ? ogTitleMatch[1].split(" | ")[0].split(" Building Materials")[0].trim() : "";
      title = title.replace(/&amp;/g, "&").replace(/&quot;/g, '"');
      const rawDesc = ogDescMatch ? ogDescMatch[1].trim() : "";
      const brand = brandMatch ? brandMatch[1].trim() : "Standard";
      const category = catMatch ? catMatch[1].trim() : item.categoryName;
      const imageUrl = ogImgMatch ? ogImgMatch[1].trim() : "";

      if (!title) {
        title = `Product-${path.basename(item.url)}`;
      }

      // Group into clean category folders
      const catFolder = slugify(category) || "general";
      const catDir = path.join(OUTPUT_DIR, catFolder);
      if (!fs.existsSync(catDir)) {
        fs.mkdirSync(catDir, { recursive: true });
      }

      const prodSlug = slugify(title);
      let localImageRel = "";

      if (imageUrl) {
        const imgExt = path.extname(imageUrl.split("?")[0]) || ".jpeg";
        const imgFilename = `${prodSlug}${imgExt.length > 5 ? ".jpeg" : imgExt}`;
        const localImgPath = path.join(catDir, imgFilename);

        const ok = await downloadImage(imageUrl, localImgPath);
        if (ok) {
          localImageRel = `${catFolder}/${imgFilename}`;
          downloadedCount++;
        }
      }

      const record = {
        id: path.basename(item.url.split("/showproducts/productid/")[1] || "").split("/")[0],
        title,
        brand,
        category,
        categoryFolder: catFolder,
        rawDescription: rawDesc,
        localImage: localImageRel,
        remoteImage: imageUrl,
        sourceUrl: item.url,
      };

      // Save individual product descriptor JSON right next to the image
      const productJsonPath = path.join(catDir, `${prodSlug}.json`);
      fs.writeFileSync(productJsonPath, JSON.stringify(record, null, 2));

      products.push(record);

      if (i % 20 === 0 || i === total - 1) {
        console.log(`[Progress ${i + 1}/${total}] Saved ${products.length} products, ${downloadedCount} images.`);
        fs.writeFileSync(METADATA_FILE, JSON.stringify(products, null, 2));
      }
    } catch (e) {
      // continue
    }
  });

  // Final flush of main index
  fs.writeFileSync(METADATA_FILE, JSON.stringify(products, null, 2));

  // Build Markdown summary
  let md = "# Chin Chun Hardware Catalogue Archive\n\n";
  md += `**Total Products Downloaded:** ${products.length}\n`;
  md += `**Total Images Stored:** ${downloadedCount}\n`;
  md += `**Root Folder:** \`chinchunimages/\`\n`;
  md += `**Date:** ${new Date().toLocaleString()}\n\n`;
  md += "> Note: This data was scraped to provide real Malaysian hardware product references and authentic images for SKL Waste. Custom non-AI-slop descriptions will be authored based on these specifications.\n\n";

  const grouped = {};
  for (const p of products) {
    if (!grouped[p.category]) grouped[p.category] = [];
    grouped[p.category].push(p);
  }

  for (const [cat, items] of Object.entries(grouped)) {
    md += `## Category: ${cat} (${items.length} products)\n\n`;
    md += `| Photo | Product Name | Brand | Local Image Path | Raw Details |\n`;
    md += `| :---: | :--- | :---: | :--- | :--- |\n`;
    for (const item of items) {
      const imgPath = item.localImage || "No Image";
      md += `| ![](${imgPath}) | **${item.title}** | ${item.brand} | \`${imgPath}\` | ${item.rawDescription.slice(0, 100)}... |\n`;
    }
    md += "\n---\n\n";
  }

  fs.writeFileSync(SUMMARY_FILE, md);
  console.log("\n=======================================================");
  console.log(`SUCCESS: Scraped ${products.length} products with ${downloadedCount} images!`);
  console.log(`Organized in folder: ${OUTPUT_DIR}`);
  console.log(`Index file: ${METADATA_FILE}`);
  console.log(`Catalogue overview: ${SUMMARY_FILE}`);
  console.log("=======================================================");
}

main().catch(console.error);
