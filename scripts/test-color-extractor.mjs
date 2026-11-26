import fs from 'fs';

const BMW_COLOR_HEX_MAP = {
  'Alpine White': '#F8F9FA',
  'Black Sapphire Metallic': '#121417',
  'Jet Black': '#080808',
  'Carbon Black Metallic': '#121622',
  'Mineral White Metallic': '#EFF0F2',
  'Portimao Blue Metallic': '#1C4782',
  'Tanzanite Blue II Metallic': '#0C2340',
  'Marina Bay Blue Metallic': '#0A4E88',
  'Phytonic Blue Metallic': '#194068',
  'Arctic Race Blue metallic': '#5B7B94',
  'Night Dusk Blue Metallic': '#152238',
  'Ocean Wave Blue Metallic': '#1F4A6E',
  'Zandvoort Blue': '#6AA2B8',
  'Isle of Man Green Metallic': '#0A4D3C',
  'Cape York Green Metallic': '#4D675E',
  'Vancouver Green Metallic': '#395246',
  'Eucalyptus Green Metallic': '#41574C',
  'Grey Pine Metallic': '#3D4E4A',
  'Manhattan Green Metallic': '#3E4D40',
  'Toronto Red Metallic': '#B81D24',
  'Vegas Red Metallic': '#941A25',
  'Aventurin Red Metallic': '#6D1A24',
  'Sao Paulo Yellow': '#DFFF00',
  'Brooklyn Grey Metallic': '#9BA3A9',
  'Skyscraper Grey Metallic': '#6B7077',
  'Space Silver Metallic': '#A2A8AE',
  'Frozen Space Silver Metallic': '#9FA4A8',
  'Polarized Grey Metallic': '#686C72',
  'Dravit Grey Metallic': '#4F5052',
  'Dark Graphite Metallic': '#32353A',
  'Storm Bay Metallic': '#4E5866',
  'Oxide Grey Metallic': '#787773',
  'Dune Grey Metallic': '#8A877E',
  'Sparkling Copper Metallic': '#684C3E',
  'Blue Ridge Mountain Metallic': '#4A6B72'
};

const rawData = JSON.parse(fs.readFileSync('scripts/all-vehicle-colors.json', 'utf8'));

// Helper to filter and map colors
function getVehicleColors(url, fallbackExtra = []) {
  const v = rawData[url];
  if (!v || !v.colors) return fallbackExtra;
  const filtered = v.colors.filter(c => 
    !c.name.includes('Veganza') && 
    !c.name.includes('Sensafin') && 
    !c.name.includes('SensaTec') && 
    !c.name.includes('Interior') &&
    !c.name.includes('Leather')
  ).map(c => ({
    name: c.name,
    hex: BMW_COLOR_HEX_MAP[c.name] || '#8E959B',
    image: c.url
  }));

  // Deduplicate by name
  const seen = new Set();
  const res = [];
  for (const c of filtered) {
    if (!seen.has(c.name)) {
      seen.add(c.name);
      res.push(c);
    }
  }

  // If fewer than 7, append from fallbackExtra if needed
  for (const f of fallbackExtra) {
    if (res.length >= 7) break;
    if (!seen.has(f.name)) {
      seen.add(f.name);
      res.push(f);
    }
  }

  return res;
}

console.log('Testing color extraction:');
console.log('M4 colors count:', getVehicleColors('https://www.bmwusa.com/vehicles/m-series/bmw-4-series-m-models/bmw-m4-coupe.html').length);
console.log('X5 colors count:', getVehicleColors('https://www.bmwusa.com/vehicles/x-series/suv/bmw-x5.html').length);
console.log('X7 colors count:', getVehicleColors('https://www.bmwusa.com/vehicles/x-series/x7/bmw-x7.html').length);
console.log('M5 colors count:', getVehicleColors('https://www.bmwusa.com/vehicles/m-series/m5-series/bmw-m5-sedan.html').length);
console.log('iX3 colors count:', getVehicleColors('https://www.bmwusa.com/vehicles/x-series/ix3/bmw-ix3.html').length);
console.log('M2 colors count:', getVehicleColors('https://www.bmwusa.com/vehicles/m-series/bmw-2-series-m-models/bmw-m2-coupe.html').length);
