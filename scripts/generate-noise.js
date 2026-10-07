import fs from "fs";
import zlib from "zlib";

// CRC32 implementation for PNG chunks
const crcTable = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[i] = c;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const typeBuf = Buffer.from(type, "ascii");
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);

  const toCrc = Buffer.concat([typeBuf, data]);
  const crcVal = crc32(toCrc);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crcVal, 0);

  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

// Generate 256x256 realistic film grain noise PNG
const width = 256;
const height = 256;

// RGBA raw scanlines: each row starts with filter byte 0
const rowSize = 1 + width * 4;
const rawData = Buffer.alloc(rowSize * height);

for (let y = 0; y < height; y++) {
  const rowOffset = y * rowSize;
  rawData[rowOffset] = 0; // Filter: None
  for (let x = 0; x < width; x++) {
    const pxOffset = rowOffset + 1 + x * 4;
    // High-frequency photographic grain
    // Random luminance centered around neutral gray (128)
    const grain = Math.floor(Math.random() * 256);
    // Alpha for tactile opacity
    const alpha = Math.floor(180 + Math.random() * 75);
    
    rawData[pxOffset] = grain;     // R
    rawData[pxOffset + 1] = grain; // G
    rawData[pxOffset + 2] = grain; // B
    rawData[pxOffset + 3] = alpha; // A
  }
}

const compressed = zlib.deflateSync(rawData, { level: 9 });

const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(width, 0);
ihdr.writeUInt32BE(height, 4);
ihdr[8] = 8; // Bit depth: 8
ihdr[9] = 6; // Color type: 6 (RGBA)
ihdr[10] = 0; // Compression: 0
ihdr[11] = 0; // Filter: 0
ihdr[12] = 0; // Interlace: 0

const ihdrChunk = makeChunk("IHDR", ihdr);
const idatChunk = makeChunk("IDAT", compressed);
const iendChunk = makeChunk("IEND", Buffer.alloc(0));

const pngBuffer = Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
fs.writeFileSync("public/noise.png", pngBuffer);
console.log("Successfully generated public/noise.png (" + pngBuffer.length + " bytes)");

// Also write an SVG noise filter
const svgNoise = `<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
  <filter id="noiseFilter">
    <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/>
    <feComponentTransfer>
      <feFuncA type="linear" slope="0.35"/>
    </feComponentTransfer>
  </filter>
  <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
</svg>`;

fs.writeFileSync("public/noise.svg", svgNoise.trim());
console.log("Successfully generated public/noise.svg");
