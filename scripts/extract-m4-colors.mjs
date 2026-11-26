import fs from 'fs';

function extractColors() {
  const html = fs.readFileSync('scripts/m4.html', 'utf-8');
  // Match picture or source with srcset and alt containing color
  const regex = /<source[^>]+srcset="([^"]+)"[^>]+alt="([^"]*)"/g;
  const colors = [];
  let m;
  while ((m = regex.exec(html)) !== null) {
    colors.push({
      url: m[1].replace(/&amp;/g, '&'),
      alt: m[2]
    });
  }
  console.log('Found source tags:', colors.length);

  // Also check swatch buttons or items
  const swatchRegex = /<button[^>]+class="[^"]*colorswitch[^"]*"[^>]*>([\s\S]*?)<\/button>/gi;
  // Let's look for "cmp-colorswitch"
  const csMatch = html.match(/<div class="cmp-colorswitch[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi);
  console.log('Color switch divs:', csMatch ? csMatch.length : 0);

  // Let's find all alt=" in [Color Name]"
  const altRegex = /alt="(?:\s*in\s*)?([^"]+)"/g;
  const uniqueAlts = new Set();
  while ((m = altRegex.exec(html)) !== null) {
    if (m[1].includes('Yellow') || m[1].includes('White') || m[1].includes('Blue') || m[1].includes('Red') || m[1].includes('Grey') || m[1].includes('Black') || m[1].includes('Green')) {
      uniqueAlts.add(m[1].trim());
    }
  }
  console.log('Unique color alts:', Array.from(uniqueAlts));

  // Let's pair color names with their cosy URLs
  const itemRegex = /<div class="cmp-colorswitchitem__image"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/g;
  // Let's find picture blocks
  const picRegex = /<picture[^>]*>[\s\S]*?<img[^>]+src="([^"]+)"[^>]+alt="([^"]*)"/g;
  const items = [];
  while ((m = picRegex.exec(html)) !== null) {
    items.push({ src: m[1], alt: m[2] });
  }
  console.log('Picture img items:', items);
}

extractColors();
