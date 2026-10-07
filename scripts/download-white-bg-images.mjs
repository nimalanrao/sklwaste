import fs from 'fs';

async function download(url, dest) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } });
    if (res.ok) {
      const buf = await res.arrayBuffer();
      fs.writeFileSync(dest, Buffer.from(buf));
      console.log('Saved', dest, buf.byteLength, 'bytes');
      return true;
    }
  } catch (e) {
    console.error('Failed', url, e.message);
  }
  return false;
}

async function run() {
  // Tile gum - WEBERSET EasyFLEX
  await download('https://cdn1.npcdn.net/images/9c336b9e54a9d701da86f4ef1179ea81_1669864205.jpeg?md5id=8a0ee38fc64016dbd30c621b3aa655e0&new_width=450&new_height=450&w=1725950964&type=9', 'public/catalogue/tile-gum-weber-easyflex.jpeg');
  
  // Tile gum - SikaCeram 188
  await download('https://cdn1.npcdn.net/images/ca7a27a00d8d7bfa5a93943da35e39d7_1669866299.jpeg?md5id=8a0ee38fc64016dbd30c621b3aa655e0&new_width=450&new_height=450&w=1725950964&type=9', 'public/catalogue/sikaceram-188-tile-gum.jpeg');

  // Skim coat finish white
  await download('https://cdn1.npcdn.net/images/3466797ae1f5ad5c040405567c4f361a_1756369600.jpeg?md5id=8a0ee38fc64016dbd30c621b3aa655e0&new_width=450&new_height=450&w=1725950964&type=9', 'public/catalogue/weber-skimcoat-finish-white.jpeg');

  // Skim coat base grey
  await download('https://cdn1.npcdn.net/images/df58da4b6209ec79d81d4cdaaacb90ce_1756364661.jpeg?md5id=8a0ee38fc64016dbd30c621b3aa655e0&new_width=450&new_height=450&w=1725950964&type=9', 'public/catalogue/weber-skimcoat-base-grey.jpeg');

  // Cement / Render bag
  await download('https://cdn1.npcdn.net/images/280f3136e66a8116a9c893a6f4272883_1756369833.jpeg?md5id=8a0ee38fc64016dbd30c621b3aa655e0&new_width=450&new_height=450&w=1725950964&type=9', 'public/catalogue/cement-portland-50kg.jpeg');

  console.log('Finished downloading all white background building images!');
}
run();
