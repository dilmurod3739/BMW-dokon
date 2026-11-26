import fs from 'fs';

const rawData = JSON.parse(fs.readFileSync('scripts/all-vehicle-colors.json', 'utf8'));
const cars = JSON.parse(fs.readFileSync('scripts/generated-cars-data.json', 'utf8'));

const INTERIOR_HEX_MAP = {
  // Black tones
  'Black Perforated SensaTec': { hex: '#1C1D21', material: 'Perforated SensaTec' },
  'Black Sensafin': { hex: '#1C1D21', material: 'Sensafin charm' },
  'Black Perforated Veganza': { hex: '#1A1B1E', material: 'Perforated Veganza' },
  'Black Veganza': { hex: '#1A1B1E', material: 'Vegan Veganza charm' },
  'Black Contemporary Interior Design': { hex: '#1D1E22', material: 'Contemporary charm' },
  'Black BMW M Interior Design': { hex: '#18191B', material: 'BMW M Sport charm' },
  'Black Perforated and Quilted Veganza': { hex: '#1A1B1E', material: 'Quilted Veganza charm' },
  'Black Extended Merino Leather': { hex: '#151619', material: 'BMW Individual Merino charm' },
  'Black M Alcantara/Veganza With Blue Contrast Stitching': { hex: '#1E2024', material: 'M Alcantara / Veganza' },

  // Cognac / Brown / Tartufo tones
  'Cognac Perforated SensaTec': { hex: '#935529', material: 'Perforated SensaTec' },
  'Cognac Sensafin': { hex: '#935529', material: 'Sensafin charm' },
  'Cognac Veganza': { hex: '#935529', material: 'Vegan Veganza charm' },
  'Coffee Sensafin': { hex: '#4A3528', material: 'Sensafin charm' },
  'Castanea Perforated Veganza': { hex: '#633B2E', material: 'Perforated Veganza' },
  'Castanea Contemporary Interior Design': { hex: '#633B2E', material: 'Contemporary charm' },
  'Copper Brown Contemporary Interior Design': { hex: '#7A4832', material: 'Contemporary charm' },
  'Espresso Brown Perforated and Quilted Veganza': { hex: '#3E2B22', material: 'Quilted Veganza charm' },
  'Mocha Perforated Veganza': { hex: '#4B3629', material: 'Perforated Veganza' },
  'Mocha Veganza': { hex: '#4B3629', material: 'Vegan Veganza charm' },
  'Tartufo Extended Merino Leather': { hex: '#874D28', material: 'BMW Individual Merino charm' },

  // Silverstone / White / Light tones
  'Smoke White Perforated Veganza': { hex: '#E2E3E7', material: 'Perforated Veganza' },
  'Smoke White Perforated and Quilted Veganza': { hex: '#E2E3E7', material: 'Quilted Veganza charm' },
  'Silverstone Sensafin': { hex: '#D8DADF', material: 'Sensafin charm' },
  'Silverstone II Contemporary Interior Design': { hex: '#D8DADF', material: 'Contemporary charm' },
  'Silverstone/Black Extended Merino Leather': { hex: '#D2D4D9', material: 'BMW Individual Merino charm' },
  'Canberra Beige Perforated SensaTec': { hex: '#D2C2A4', material: 'Perforated SensaTec' },
  'Digital White Contemporary Interior Design': { hex: '#EAEBEE', material: 'Contemporary charm' },
  'Oyster Perforated Veganza': { hex: '#DFE0E3', material: 'Perforated Veganza' },
  'Atlas Grey/Smoke White Bicolor Perforated Veganza': { hex: '#B0B4BC', material: 'Bicolor Veganza charm' },

  // Red / Orange / Sport tones
  'Tacora Red Perforated SensaTec': { hex: '#821D24', material: 'Perforated SensaTec' },
  'Tacora Red Sensafin': { hex: '#821D24', material: 'Sensafin charm' },
  'Burgundy Red Perforated and Quilted Veganza': { hex: '#671C25', material: 'Quilted Veganza charm' },
  'Red/Black Bicolor Perforated Veganza': { hex: '#8E2028', material: 'Bicolor Veganza charm' },
  'Fiona Red/Black Extended Merino Leather': { hex: '#991B24', material: 'BMW Individual Merino charm' },
  'Kyalami Orange/Black Extended Merino Leather': { hex: '#C2511F', material: 'BMW Individual Merino charm' },
  'Yas Marina Blue/Black Extended Merino Leather with Yellow Accent': { hex: '#236B8E', material: 'BMW M Merino charm' }
};

// Global default 4 interior colors for fallback
const DEFAULT_4_INTERIORS = [
  {
    name: 'Black Extended Merino Leather',
    material: 'BMW Individual Merino charm',
    hex: '#151619',
    image: 'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVJ4Ws8wSRCz9wK2EL6Jxt7sYeySzoVBzcAiN3lZyaBNODXYunWq96Q53yxpYmrfZ7dWcMKHS94mvhD%25VicdTjO3gXA9bLL10tN2ZR5EiyhPS5qwlGmIqQ53nqPR9ayV7tQMw1p8ac1QUDCJfxbUx5WGe89GsLsbbUiprJqT9Gw6ZuLmMptYRSF3y67m5VKJXYCygNWusmlTv0PGdyX324bOQTQdjcyQt3azDxTa6dnkq83pgzOALUd1%25kIFJGzEQABKupklNFeWS6AFQKMPVY8weWhbNmUhIPo90yGCBbHi4Tpzt9%25wc36sciftxdYrIw178zQIftECUkaRU7slGAn5SCrXpFONflZQ6KIOmXRaYWBHOQ5nmPeLmagOybLKBnvIT9JWTO2B3iuZZIjedwSUBBDMztVAmeqhrhPeEQm2awpfQ53RpsBeayVOJx3w1pqSWvFSrW2vEyXqyFExSVWNRW8e9jPoxiS2K7S0HswTFBOSSJxZ672moKGbYCj6V3YUmvhE76Jdo62mJ1lOTjHVc'
  },
  {
    name: 'Tartufo Extended Merino Leather',
    material: 'BMW Individual Merino charm',
    hex: '#874D28',
    image: 'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVJ4Ws8wSRCz9wK2EL6Jxt7sYeySzoVBzcAiN3lZyaBNODXYunWq96Q53yxpYmrfZ7dWcMKHS94mvhD%25VicdTjO3gXA9bLL10tN2ZR5EiyhPS5qwlGmIqQ53nqPR9ayV7tQMw1p8ac1QUDCJfxbUxjFPZ89GsLsbbUiprJqT9Gw6ZuLmMptYRSF3y67m5VKJXYCygNWusmlTv0PGdyX324bOQTQdjcyQt3azDxTa6dnkq83pgzOALUd1%25kIFJGzEQABKupklNFeWS6AFQKMPVY8weWhbNmUhIPo90yGCBbHi4Tpzt9%25wc36sciftxdYrIw178zQIftECUkaRU7slGAn5SCrXpFONflZQ6KIOmXRaYWBHOQ5nmPeLmagOybLKBnvIT9JWTO2B3iuZZIjedwSUBBDMztVAmeqhrhPeEQm2awpfQ53RpsBeayVOJx3w1pqSWvFSrW2vEyXqyFExSVWNRW6IMcPoxiS2K7S0HswTFBOSSJxZ672moKGbYCj6V3YUmvhE76Jdo62mJ1lOTjHVc'
  },
  {
    name: 'Silverstone/Black Extended Merino Leather',
    material: 'BMW Individual Merino charm',
    hex: '#D2D4D9',
    image: 'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVJ4Ws8wSRCz9wK2EL6Jxt7sYeySzoVBzcAiN3lZyaBNODXYunWq96Q53yxpYmrfZ7dWcMKHS94mvhD%25VicdTjO3gXA9bLL10tN2ZR5EiyhPS5qwlGmIqQ53nqPR9ayV7tQMw1p8ac1QUDCJfxbUx5W1O89GsLsbbUiprJqT9Gw6ZuLmMptYRSF3y67m5VKJXYCygNWusmlTv0PGdyX324bOQTQdjcyQt3azDxTa6dnkq83pgzOALUd1%25kIFJGzEQABKupklNFeWS6AFQKMPVY8weWhbNmUhIPo90yGCBbHi4Tpzt9%25wc36sciftxdYrIw178zQIftECUkaRU7slGAn5SCrXpFONflZQ6KIOmXRaYWBHOQ5nmPeLmagOybLKBnvIT9JWTO2B3iuZZIjedwSUBBDMztVAmeqhrhPeEQm2awpfQ53RpsBeayVOJx3w1pqSWvFSrW2vEyXqyFExSVWNRW8eVgPoxiS2K7S0HswTFBOSSJxZ672moKGbYCj6V3YUmvhE76Jdo62mJ1lOTjHVc'
  },
  {
    name: 'Fiona Red/Black Extended Merino Leather',
    material: 'BMW Individual Merino charm',
    hex: '#991B24',
    image: 'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVJ4Ws8wSRCz9wK2EL6Jxt7sYeySzoVBzcAiN3lZyaBNODXYunWq96Q53yxpYmrfZ7dWcMKHS94mvhD%25VicdTjO3gXA9bLL10tN2ZR5EiyhPS5qwlGmIqQ53nqPR9ayV7tQMw1p8ac1QUDCJfxbUxjF5c89GsLsbbUiprJqT9Gw6ZuLmMptYRSF3y67m5VKJXYCygNWusmlTv0PGdyX324bOQTQdjcyQt3azDxTa6dnkq83pgzOALUd1%25kIFJGzEQABKupklNFeWS6AFQKMPVY8weWhbNmUhIPo90yGCBbHi4Tpzt9%25wc36sciftxdYrIw178zQIftECUkaRU7slGAn5SCrXpFONflZQ6KIOmXRaYWBHOQ5nmPeLmagOybLKBnvIT9JWTO2B3iuZZIjedwSUBBDMztVAmeqhrhPeEQm2awpfQ53RpsBeayVOJx3w1pqSWvFSrW2vEyXqyFExSVWNRW6I8KPoxiS2K7S0HswTFBOSSJxZ672moKGbYCj6V3YUmvhE76Jdo62mJ1lOTjHVc'
  }
];

function getCarInteriors(car) {
  // Find vehicle in rawData
  let found = null;
  for (const [url, v] of Object.entries(rawData)) {
    if (v.title && (v.title.toLowerCase().includes(car.series.toLowerCase()) || (car.id.includes('x6-m') && url.includes('x6-m')) || (car.id.includes('m4') && url.includes('m4-coupe')) || (car.id.includes('m5') && url.includes('m5-sedan')) || (car.id.includes('x1') && url.includes('x1.html')) || (car.id.includes('x5') && url.includes('x5.html')) || (car.id.includes('x7') && url.includes('x7.html')) || (car.id.includes('i5') && url.includes('i5-overview')))) {
      found = v;
      break;
    }
  }

  const list = [];
  const seen = new Set();
  if (found && found.colors) {
    for (const c of found.colors) {
      if (
        c.name.includes('Veganza') ||
        c.name.includes('Sensafin') ||
        c.name.includes('SensaTec') ||
        c.name.includes('Interior') ||
        c.name.includes('Leather')
      ) {
        if (!seen.has(c.name)) {
          seen.add(c.name);
          const meta = INTERIOR_HEX_MAP[c.name] || { hex: '#1C1D21', material: 'BMW Premium charm' };
          list.push({
            name: c.name,
            material: meta.material,
            hex: meta.hex,
            image: c.url
          });
        }
      }
    }
  }

  // Ensure exactly 4 or more distinct interiors
  for (const d of DEFAULT_4_INTERIORS) {
    if (list.length >= 4) break;
    if (!seen.has(d.name)) {
      seen.add(d.name);
      list.push(d);
    }
  }

  return list.slice(0, 4);
}

for (const c of cars) {
  c.interiorColors = getCarInteriors(c);
  console.log(`${c.name}: ${c.interiorColors.length} interior colors`);
  c.interiorColors.forEach(ic => console.log(`  - ${ic.name} (${ic.hex})`));
}

fs.writeFileSync('scripts/generated-cars-data.json', JSON.stringify(cars, null, 2));
console.log('Saved updated cars with interiorColors to scripts/generated-cars-data.json');
