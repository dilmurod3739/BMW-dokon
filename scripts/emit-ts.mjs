import fs from 'fs';

const cars = JSON.parse(fs.readFileSync('scripts/generated-cars-data.json', 'utf8'));

const tsHeader = `import { Car, Dealership } from '@/types/car';

export const CARS_DATA: Car[] = `;

const tsFooter = `;

export const DEALERSHIPS: Dealership[] = [
  {
    id: 'tashkent-center',
    name: 'BMW Auto Center Tashkent',
    city: 'Toshkent',
    address: 'Amir Temur shox ko‘chasi, 107B',
    phone: '+998 71 200 44 44',
  },
  {
    id: 'tashkent-sergeli',
    name: 'BMW Experience Hub Sergeli',
    city: 'Toshkent',
    address: 'Yangi Sergeli ko‘chasi, 45',
    phone: '+998 71 200 55 55',
  },
  {
    id: 'samarkand',
    name: 'BMW Samarkand Showroom',
    city: 'Samarqand',
    address: 'Buyuk Ipak Yo‘li ko‘chasi, 210',
    phone: '+998 66 230 77 00',
  },
  {
    id: 'fergana',
    name: 'BMW Valley Motors Fergana',
    city: 'Farg‘ona',
    address: 'Al-Farg‘oniy ko‘chasi, 88',
    phone: '+998 73 244 11 22',
  },
  {
    id: 'bukhara',
    name: 'BMW Oasis Bukhara',
    city: 'Buxoro',
    address: 'Mustaqillik shoh ko‘chasi, 15',
    phone: '+998 65 221 88 99',
  },
];

export const CATEGORIES_CONFIG = [
  { id: 'all', label: 'Barcha Modellar', count: CARS_DATA.length },
  { id: 'm-power', label: 'M Power', count: CARS_DATA.filter((c) => c.category === 'm-power').length },
  { id: 'bmw-i', label: 'BMW i (Elektr)', count: CARS_DATA.filter((c) => c.category === 'bmw-i').length },
  { id: 'x-series', label: 'X-Series (SAV)', count: CARS_DATA.filter((c) => c.category === 'x-series').length },
  { id: 'sedans', label: 'Sedanlar', count: CARS_DATA.filter((c) => c.category === 'sedans').length },
] as const;
`;

const fullTs = tsHeader + JSON.stringify(cars, null, 2) + tsFooter;
fs.writeFileSync('src/data/cars.ts', fullTs);
console.log('Successfully wrote src/data/cars.ts with', cars.length, 'cars.');
