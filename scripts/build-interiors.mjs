import fs from 'fs';

const rawData = JSON.parse(fs.readFileSync('scripts/all-vehicle-colors.json', 'utf8'));

// Interior color palette hex mapping
const INTERIOR_HEX_MAP = {
  // Black tones
  'Black Perforated SensaTec': { hex: '#1C1D21', material: 'Perforated SensaTec' },
  'Black Sensafin': { hex: '#1C1D21', material: 'BMW Sensafin charm' },
  'Black Perforated Veganza': { hex: '#1A1B1E', material: 'Perforated Veganza' },
  'Black Veganza': { hex: '#1A1B1E', material: 'Vegan Veganza charm' },
  'Black Contemporary Interior Design': { hex: '#1D1E22', material: 'BMW Contemporary charm' },
  'Black BMW M Interior Design': { hex: '#18191B', material: 'BMW M Sport charm' },
  'Black Perforated and Quilted Veganza': { hex: '#1A1B1E', material: 'Quilted Veganza charm' },
  'Black Extended Merino Leather': { hex: '#151619', material: 'BMW Individual Merino charm' },
  'Black M Alcantara/Veganza With Blue Contrast Stitching': { hex: '#1E2024', material: 'M Alcantara / Veganza' },

  // Cognac / Brown / Tartufo tones
  'Cognac Perforated SensaTec': { hex: '#935529', material: 'Perforated SensaTec' },
  'Cognac Sensafin': { hex: '#935529', material: 'BMW Sensafin charm' },
  'Cognac Veganza': { hex: '#935529', material: 'Vegan Veganza charm' },
  'Coffee Sensafin': { hex: '#4A3528', material: 'BMW Sensafin charm' },
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
  'Silverstone Sensafin': { hex: '#D8DADF', material: 'BMW Sensafin charm' },
  'Silverstone II Contemporary Interior Design': { hex: '#D8DADF', material: 'Contemporary charm' },
  'Silverstone/Black Extended Merino Leather': { hex: '#D2D4D9', material: 'BMW Individual Merino charm' },
  'Canberra Beige Perforated SensaTec': { hex: '#D2C2A4', material: 'Perforated SensaTec' },
  'Digital White Contemporary Interior Design': { hex: '#EAEBEE', material: 'Contemporary charm' },
  'Oyster Perforated Veganza': { hex: '#DFE0E3', material: 'Perforated Veganza' },
  'Atlas Grey/Smoke White Bicolor Perforated Veganza': { hex: '#B0B4BC', material: 'Bicolor Veganza charm' },

  // Red / Orange / Sport tones
  'Tacora Red Perforated SensaTec': { hex: '#821D24', material: 'Perforated SensaTec' },
  'Tacora Red Sensafin': { hex: '#821D24', material: 'BMW Sensafin charm' },
  'Burgundy Red Perforated and Quilted Veganza': { hex: '#671C25', material: 'Quilted Veganza charm' },
  'Red/Black Bicolor Perforated Veganza': { hex: '#8E2028', material: 'Bicolor Veganza charm' },
  'Fiona Red/Black Extended Merino Leather': { hex: '#991B24', material: 'BMW Individual Merino charm' },
  'Kyalami Orange/Black Extended Merino Leather': { hex: '#C2511F', material: 'BMW Individual Merino charm' },
  'Yas Marina Blue/Black Extended Merino Leather with Yellow Accent': { hex: '#236B8E', material: 'BMW M Merino charm' }
};

console.log('Total mapped interior colors:', Object.keys(INTERIOR_HEX_MAP).length);
