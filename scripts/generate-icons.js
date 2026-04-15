const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '../assets/logo.svg');
const outputDir = path.join(__dirname, '../assets/images');

const sizes = {
  'icon.png': 1024,
  'adaptive-icon.png': 1024,
  'splash-icon.png': 1284,
  'favicon.png': 48
};

async function generateIcons() {
  const svg = fs.readFileSync(svgPath);
  
  for (const [filename, size] of Object.entries(sizes)) {
    const outputPath = path.join(outputDir, filename);
    await sharp(svg)
      .resize(size, size)
      .png()
      .toFile(outputPath);
    console.log(`Generated ${filename} (${size}x${size})`);
  }
}

generateIcons().catch(console.error);