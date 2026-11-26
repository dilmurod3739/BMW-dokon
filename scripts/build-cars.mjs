import fs from 'fs';

const BMW_COLOR_HEX_MAP = {
  'Alpine White': '#F8F9FA',
  'Black Sapphire Metallic': '#121417',
  'Jet Black': '#0A0A0A',
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

function getColorsForUrl(url, extraPalette = []) {
  const v = rawData[url];
  const list = [];
  const seen = new Set();

  if (v && v.colors) {
    for (const c of v.colors) {
      if (
        !c.name.includes('Veganza') &&
        !c.name.includes('Sensafin') &&
        !c.name.includes('SensaTec') &&
        !c.name.includes('Interior') &&
        !c.name.includes('Leather')
      ) {
        if (!seen.has(c.name)) {
          seen.add(c.name);
          list.push({
            name: c.name,
            hex: BMW_COLOR_HEX_MAP[c.name] || '#70757D',
            image: c.url
          });
        }
      }
    }
  }

  // Ensure at least 7 colors
  for (const ep of extraPalette) {
    if (list.length >= 7) break;
    if (!seen.has(ep.name)) {
      seen.add(ep.name);
      list.push(ep);
    }
  }

  return list;
}

// Let's create the vehicles list
const vehicles = [
  // 1. BMW M8 Competition Gran Coupé (Flagship)
  {
    id: 'bmw-m8-gran-coupe',
    name: 'BMW M8 Competition Gran Coupé',
    series: 'M8 Seriyasi',
    category: 'm-power',
    badge: 'M Motorsport',
    tagline: 'Cheksiz quvvat va yuqori darajadagi hashamat uyg‘unligi',
    price: 138800,
    featured: true,
    heroImage: 'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVJ4Ws8wSRCzgqHyAL5lQa7sYXOSa2CpLQFrVBlZyh3NA%250MA8Kt4zQ53yxpYmrfZ7dWcBoHS94mvhz06kxbZzId4uzwbBL10t8kdqBz2aKwqHMLWqr%25f1hFUnzj15K908l5w1p75zfAtUDJACyXq2FgXAXHXaMv6jQ%25Q8S2YDafHOPjmqn1%25YGDyLOEfu%25qTJIs1SIL3uBrEVtJdSeZG4NuzVMRpsnSkNh56q4VA0ogYPFNF4HvVUH0Kc%252NKd4Wxfj0WucP81D4PnxbUEqcbe89GsLxSHUiprJ8z9Gw6ZuUInptYRSGBb67m5VpW2YCygN6dUmlTv0YPmyX324uAlTQdjcSQ73azDxVWCdnkq8NpFzOALU0MLkIFJG4hgABKupcoCFeWS6xHXKMPVY8AVWhbNmUFQPo90y7CbbHi4TCz99%25wc3lnHiftxdXrxw178zQZPtECUkaRu7slGAnV%25CrXpFON0lZQ6KIqSXRaYWBHOQ5nmPeIFagOybMJynvIT9JWeO2B3iuZZIjedwSUBBDMztMa0eqhk7hX4MLoACo0shJHFlHQ3ou%25KX%25flHSfWQfuj%25V1Pa1UQfNEbn4h110s9OcmZE4riICUtscZwBlrwrxRteXv%25Z857MQ2xRUgChajY5GvlonUhgpn%25WNRsmFt3aJQvCFKdqfkoZJptvM%25cO0%25lp7W3qTMq07Z%25fc1QcXApmxbZkVFxve%25WNRGmSk%25uR4SqVo71g',
    gallery: [
      'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVJ4Ws8wSRCzgqHyAL5lQa7sYXOSa2CpLQFrVBlZyh3NA%250MA8Kt4zQ53yxpYmrfZ7dWcBoHS94mvhz06kxbZzId4uzwbBL10t8kdqBz2aKwqHMLWqr%25f1hFUnzj15K908l5w1p75zfAtUDJACyXq2FgXAXHXaMv6jQ%25Q8S2YDafHOPjmqn1%25YGDyLOEfu%25qTJIs1SIL3uBrEVtJdSeZG4NuzVMRpsnSkNh56q4VA0ogYPFNF4HvVUH0Kc%252NKd4Wxfj0WucP81D4PnxbUEqcbe89GsLxSHUiprJ8z9Gw6ZuUInptYRSGBb67m5VpW2YCygN6dUmlTv0YPmyX324uAlTQdjcSQ73azDxVWCdnkq8NpFzOALU0MLkIFJG4hgABKupcoCFeWS6xHXKMPVY8AVWhbNmUFQPo90y7CbbHi4TCz99%25wc3lnHiftxdXrxw178zQZPtECUkaRu7slGAnV%25CrXpFON0lZQ6KIqSXRaYWBHOQ5nmPeIFagOybMJynvIT9JWeO2B3iuZZIjedwSUBBDMztMa0eqhk7hX4MLoACo0shJHFlHQ3ou%25KX%25flHSfWQfuj%25V1Pa1UQfNEbn4h110s9OcmZE4riICUtscZwBlrwrxRteXv%25Z857MQ2xRUgChajY5GvlonUhgpn%25WNRsmFt3aJQvCFKdqfkoZJptvM%25cO0%25lp7W3qTMq07Z%25fc1QcXApmxbZkVFxve%25WNRGmSk%25uR4SqVo71g',
      '/images/cars/m8.jpg',
      '/images/cars/interior.jpg'
    ],
    specs: {
      acceleration: '3.2 s',
      topSpeed: '305 km/soat',
      power: '625 ot kuchi',
      torque: '750 Nm',
      range: '11.2 l / 100 km',
      drivetrain: 'M xDrive to‘liq uzatma',
      transmission: '8-pog‘onali M Steptronic Drivelogic',
      engine: '4.4L BMW M TwinPower Turbo V8'
    },
    description: 'BMW M8 Competition Gran Coupé – bu motorsport DNKsi va to‘rt eshikli kupe qulayligining mutlaq cho‘qqisi. Har bir detal haydashdan eng yuqori zavq olish uchun loyihalashtirilgan.',
    colors: [
      { name: 'Isle of Man Green Metallic', hex: '#0A4D3C', image: 'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVd4Ws8wSRCzgqHyAL5lQa7sYeySzoVBzcAiN3lZyaBNODXYunWqe5Q53yxpYmrfZ7dWcMKHS94mvhD%25VicdTjO3gXA9bLL10tN2ZR5EiyhPS5qwlGmIqQ53nqPR9ayV7tQMw1p8ac1QUDCYbxbUx5WGe89GsLsbbUiprJqT9Gw6ZuLmMptYRSF3y67m5VKJXYCygNWusmlTv0PGdyX324bOQTQdjcyQt3azDxTa6dnkq83pgzOALUd1%25kIFJGzEQABKupklNFeWS6AFQKMPVY8weWhbNmUhIPo90yGCBbHi4Tpzt9%25wc36sciftxdYrIw178zQIftECUkaRU7slGAn5SCrXpFONflZQ6KIOmXRaYWBHOQ5nmPeLmagOybLKBnvIT9JWTO2B3iuZZIjedwSUBBDMztVAmeqhrhPeEQm2awpfQ53RpsBeayVOJx3w1pqSWvFSrW2vEyXqcfbYGWHRBDFBfpCb9EiyElNZkscCRbz1vbwx65efVubbWCmnvzIc1QrO2kn9MOXId4pvnWhcnzIWGjuekx97' },
      { name: 'Frozen Marina Bay Blue', hex: '#1C69D4', image: 'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVd4Ws8wSRCzgqHyAL5lQa7sYeySzoVBzcAiN3lZyaBNODXYunWqRwQ53yxpYmrfZ7dWcMKHS94mvhD%25VicdTjO3gXA9bLL10tN2ZR5EiyhPS5qwlGmIqQ53nqPR9ayV7tQMw1p8ac1QUDCPSxbUx5WGe89GsLsbbUiprJqT9Gw6ZuLmMptYRSF3y67m5VKJXYCygNWusmlTv0PGdyX324bOQTQdjcyQt3azDxTa6dnkq83pgzOALUd1%25kIFJGzEQABKupklNFeWS6AFQKMPVY8weWhbNmUhIPo90yGCBbHi4Tpzt9%25wc36sciftxdYrIw178zQIftECUkaRU7slGAn5SCrXpFONflZQ6KIOmXRaYWBHOQ5nmPeLmagOybLKBnvIT9JWTO2B3iuZZIjedwSUBBDMztVAmeqhrhPeEQm2awpfQ53RpsBeayVOJx3w1pqSWvFSrW2vEyXqcfbYGWHRBDFBfpCb9EiyElNZkscCRbz1vbwx65efVubbWCmnvzIc1QrO2kn9MOXId4pvnWhcnzIWGjuekx97' },
      { name: 'Black Sapphire Metallic', hex: '#121417', image: 'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVd4Ws8wSRCzgqHyAL5lQa7sYeySzoVBzcAiN3lZyaBNODXYunWl0QQ53yxpYmrfZ7dWcMKHS94mvhD%25VicdTjO3gXA9bLL10tN2ZR5EiyhPS5qwlGmIqQ53nqPR9ayV7tQMw1p8ac1QUD4IxxbUx5WGe89GsLsbbUiprJqT9Gw6ZuLmMptYRSF3y67m5VKJXYCygNWusmlTv0PGdyX324bOQTQdjcyQt3azDxTa6dnkq83pgzOALUd1%25kIFJGzEQABKupklNFeWS6AFQKMPVY8weWhbNmUhIPo90yGCBbHi4Tpzt9%25wc36sciftxdYrIw178zQIftECUkaRU7slGAn5SCrXpFONflZQ6KIOmXRaYWBHOQ5nmPeLmagOybLKBnvIT9JWTO2B3iuZZIjedwSUBBDMztVAmeqhrhPeEQm2awpfQ53RpsBeayVOJx3w1pqSWvFSrW2vEyXqcfbYGWHRBDFBfpCb9EiyElNZkscCRbz1vbwx65efVubbWCmnvzIc1QrO2kn9MOXId4pvnWhcnzIWGjuekx97' },
      { name: 'Alpine White', hex: '#F8F9FA', image: 'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVd4Ws8wSRCzgqHyAL5lQa7sYeySzoVBzcAiN3lZyaBNODXYunWHB1Q53yxpYmrfZ7dWcMKHS94mvhD%25VicdTjO3gXA9bLL10tN2ZR5EiyhPS5qwlGmIqQ53nqPR9ayV7tQMw1p8ac1QUD36kxbUx5WGe89GsLsbbUiprJqT9Gw6ZuLmMptYRSF3y67m5VKJXYCygNWusmlTv0PGdyX324bOQTQdjcyQt3azDxTa6dnkq83pgzOALUd1%25kIFJGzEQABKupklNFeWS6AFQKMPVY8weWhbNmUhIPo90yGCBbHi4Tpzt9%25wc36sciftxdYrIw178zQIftECUkaRU7slGAn5SCrXpFONflZQ6KIOmXRaYWBHOQ5nmPeLmagOybLKBnvIT9JWTO2B3iuZZIjedwSUBBDMztVAmeqhrhPeEQm2awpfQ53RpsBeayVOJx3w1pqSWvFSrW2vEyXqcfbYGWHRBDFBfpCb9EiyElNZkscCRbz1vbwx65efVubbWCmnvzIc1QrO2kn9MOXId4pvnWhcnzIWGjuekx97' },
      { name: 'Toronto Red Metallic', hex: '#B81D24', image: 'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVd4Ws8wSRCzgqHyAL5lQa7sYeySzoVBzcAiN3lZyaBNODXYunWqR5Q53yxpYmrfZ7dWcMKHS94mvhD%25VicdTjO3gXA9bLL10tN2ZR5EiyhPS5qwlGmIqQ53nqPR9ayV7tQMw1p8ac1QUDCPbxbUx5WGe89GsLsbbUiprJqT9Gw6ZuLmMptYRSF3y67m5VKJXYCygNWusmlTv0PGdyX324bOQTQdjcyQt3azDxTa6dnkq83pgzOALUd1%25kIFJGzEQABKupklNFeWS6AFQKMPVY8weWhbNmUhIPo90yGCBbHi4Tpzt9%25wc36sciftxdYrIw178zQIftECUkaRU7slGAn5SCrXpFONflZQ6KIOmXRaYWBHOQ5nmPeLmagOybLKBnvIT9JWTO2B3iuZZIjedwSUBBDMztVAmeqhrhPeEQm2awpfQ53RpsBeayVOJx3w1pqSWvFSrW2vEyXqcfbYGWHRBDFBfpCb9EiyElNZkscCRbz1vbwx65efVubbWCmnvzIc1QrO2kn9MOXId4pvnWhcnzIWGjuekx97' },
      { name: 'Brooklyn Grey Metallic', hex: '#9BA3A9', image: 'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVd4Ws8wSRCzgqHyAL5lQa7sYeySzoVBzcAiN3lZyaBNODXYunWqecQ53yxpYmrfZ7dWcMKHS94mvhD%25VicdTjO3gXA9bLL10tN2ZR5EiyhPS5qwlGmIqQ53nqPR9ayV7tQMw1p8ac1QUDCYexbUx5WGe89GsLsbbUiprJqT9Gw6ZuLmMptYRSF3y67m5VKJXYCygNWusmlTv0PGdyX324bOQTQdjcyQt3azDxTa6dnkq83pgzOALUd1%25kIFJGzEQABKupklNFeWS6AFQKMPVY8weWhbNmUhIPo90yGCBbHi4Tpzt9%25wc36sciftxdYrIw178zQIftECUkaRU7slGAn5SCrXpFONflZQ6KIOmXRaYWBHOQ5nmPeLmagOybLKBnvIT9JWTO2B3iuZZIjedwSUBBDMztVAmeqhrhPeEQm2awpfQ53RpsBeayVOJx3w1pqSWvFSrW2vEyXqcfbYGWHRBDFBfpCb9EiyElNZkscCRbz1vbwx65efVubbWCmnvzIc1QrO2kn9MOXId4pvnWhcnzIWGjuekx97' },
      { name: 'Dravit Grey Metallic', hex: '#4F5052', image: 'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVd4Ws8wSRCzgqHyAL5lQa7sYeySzoVBzcAiN3lZyaBNODXYunWqebQ53yxpYmrfZ7dWcMKHS94mvhD%25VicdTjO3gXA9bLL10tN2ZR5EiyhPS5qwlGmIqQ53nqPR9ayV7tQMw1p8ac1QUDCYLxbUx5WGe89GsLsbbUiprJqT9Gw6ZuLmMptYRSF3y67m5VKJXYCygNWusmlTv0PGdyX324bOQTQdjcyQt3azDxTa6dnkq83pgzOALUd1%25kIFJGzEQABKupklNFeWS6AFQKMPVY8weWhbNmUhIPo90yGCBbHi4Tpzt9%25wc36sciftxdYrIw178zQIftECUkaRU7slGAn5SCrXpFONflZQ6KIOmXRaYWBHOQ5nmPeLmagOybLKBnvIT9JWTO2B3iuZZIjedwSUBBDMztVAmeqhrhPeEQm2awpfQ53RpsBeayVOJx3w1pqSWvFSrW2vEyXqcfbYGWHRBDFBfpCb9EiyElNZkscCRbz1vbwx65efVubbWCmnvzIc1QrO2kn9MOXId4pvnWhcnzIWGjuekx97' },
      { name: 'Aventurin Red Metallic', hex: '#6D1A24', image: 'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVd4Ws8wSRCzgqHyAL5lQa7sYeySzoVBzcAiN3lZyaBNODXYunWq96Q53yxpYmrfZ7dWcMKHS94mvhD%25VicdTjO3gXA9bLL10tN2ZR5EiyhPS5qwlGmIqQ53nqPR9ayV7tQMw1p8ac1QUDCJfxbUx5WGe89GsLsbbUiprJqT9Gw6ZuLmMptYRSF3y67m5VKJXYCygNWusmlTv0PGdyX324bOQTQdjcyQt3azDxTa6dnkq83pgzOALUd1%25kIFJGzEQABKupklNFeWS6AFQKMPVY8weWhbNmUhIPo90yGCBbHi4Tpzt9%25wc36sciftxdYrIw178zQIftECUkaRU7slGAn5SCrXpFONflZQ6KIOmXRaYWBHOQ5nmPeLmagOybLKBnvIT9JWTO2B3iuZZIjedwSUBBDMztVAmeqhrhPeEQm2awpfQ53RpsBeayVOJx3w1pqSWvFSrW2vEyXqcfbYGWHRBDFBfpCb9EiyElNZkscCRbz1vbwx65efVubbWCmnvzIc1QrO2kn9MOXId4pvnWhcnzIWGjuekx97' },
      { name: 'Skyscraper Grey Metallic', hex: '#6B7077', image: 'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVd4Ws8wSRCzgqHyAL5lQa7sYeySzoVBzcAiN3lZyaBNODXYunWqebQ53yxpYmrfZ7dWcMKHS94mvhD%25VicdTjO3gXA9bLL10tN2ZR5EiyhPS5qwlGmIqQ53nqPR9ayV7tQMw1p8ac1QUDCYLxbUx5WGe89GsLsbbUiprJqT9Gw6ZuLmMptYRSF3y67m5VKJXYCygNWusmlTv0PGdyX324bOQTQdjcyQt3azDxTa6dnkq83pgzOALUd1%25kIFJGzEQABKupklNFeWS6AFQKMPVY8weWhbNmUhIPo90yGCBbHi4Tpzt9%25wc36sciftxdYrIw178zQIftECUkaRU7slGAn5SCrXpFONflZQ6KIOmXRaYWBHOQ5nmPeLmagOybLKBnvIT9JWTO2B3iuZZIjedwSUBBDMztVAmeqhrhPeEQm2awpfQ53RpsBeayVOJx3w1pqSWvFSrW2vEyXqcfbYGWHRBDFBfpCb9EiyElNZkscCRbz1vbwx65efVubbWCmnvzIc1QrO2kn9MOXId4pvnWhcnzIWGjuekx97' }
    ],
    highlights: [
      'M xDrive aqlli to‘liq tortish tizimi (2WD Drift rejimiga ega)',
      'BMW Laserlight moslashuvchan faralar',
      'Bowers & Wilkins Diamond Surround akustika tizimi',
      'M Carbon keramika tormoz disklari'
    ]
  },

  // 2. BMW i7 xDrive60 (Flagship Electric)
  {
    id: 'bmw-i7-xdrive60',
    name: 'BMW i7 xDrive60',
    series: 'i7 Seriyasi',
    category: 'bmw-i',
    badge: 'Pure Electric',
    tagline: 'Elektr harakatchanlik davrining yangi flagmani',
    price: 119300,
    featured: true,
    heroImage: 'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVJ4Ws8wSRCzgqHyAL5lQa7sYXOSa2CpLQF7VllZyh3NA%250MA8Kt4zQ53yxpYmrfZ7dWcmbHS94mvhz06kxbZzId4uzwbBL10t8kdqBz2aKwqHMLWqr%25f1hFUnzj15K908l5w1p75zfAtUDJACyXq2FgXAXHXTxv6jQ%25ohq2YDafHS6jmqn1%25JHDyLOEfuVqTJIs1SZL3uBrU0VJdSeZGEauzVMRpXlSkNh5uxMVA0ogSZWNF4HvVDt0Kc%252Nqz4Wxfj0zccP81D4knxbUEqctp89GsLxcEUiprJ8l3Gw6ZuUXJptYRSGjM67m5VpD5YCygN67BmlTv0YCayX324mlvTQdjcy923azDxTi5dnkq83FYzOALU0M5kIFJG4h%25ABKupczCFeWS6xnAKMPVYwGSWhbNmtppPo90y7CbbHi4TCz99%25wc3lsciftxdXrWw178zQ9ttECUkaQR7slGAn2uCrXpF2VllZQ6KQwqXRaYWa9LQ5nmPn9UagOybOIPnvIT9IgsO2B3iBvSIjedwqQBBDMztLcoeqhk7WSFMLoACPhVhJHFlb1Oou%25KX9EJHSfWQis4%25V1PawK2fNEbntWN10s9O7NnE4riIC66scZwBlKErxlMkJE%25GdbYCj7ZidzmvhTB1jxbZOMVXuMwx9kYv6Ovu91MhVo7VRi%25PNF1TLdNZnMkJEcGqTMDESqvLB9or',
    gallery: [
      'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVJ4Ws8wSRCzgqHyAL5lQa7sYXOSa2CpLQF7VllZyh3NA%250MA8Kt4zQ53yxpYmrfZ7dWcmbHS94mvhz06kxbZzId4uzwbBL10t8kdqBz2aKwqHMLWqr%25f1hFUnzj15K908l5w1p75zfAtUDJACyXq2FgXAXHXTxv6jQ%25ohq2YDafHS6jmqn1%25JHDyLOEfuVqTJIs1SZL3uBrU0VJdSeZGEauzVMRpXlSkNh5uxMVA0ogSZWNF4HvVDt0Kc%252Nqz4Wxfj0zccP81D4knxbUEqctp89GsLxcEUiprJ8l3Gw6ZuUXJptYRSGjM67m5VpD5YCygN67BmlTv0YCayX324mlvTQdjcy923azDxTi5dnkq83FYzOALU0M5kIFJG4h%25ABKupczCFeWS6xnAKMPVYwGSWhbNmtppPo90y7CbbHi4TCz99%25wc3lsciftxdXrWw178zQ9ttECUkaQR7slGAn2uCrXpF2VllZQ6KQwqXRaYWa9LQ5nmPn9UagOybOIPnvIT9IgsO2B3iBvSIjedwqQBBDMztLcoeqhk7WSFMLoACPhVhJHFlb1Oou%25KX9EJHSfWQis4%25V1PawK2fNEbntWN10s9O7NnE4riIC66scZwBlKErxlMkJE%25GdbYCj7ZidzmvhTB1jxbZOMVXuMwx9kYv6Ovu91MhVo7VRi%25PNF1TLdNZnMkJEcGqTMDESqvLB9or',
      '/images/cars/i7.jpg',
      '/images/cars/interior.jpg'
    ],
    specs: {
      acceleration: '4.7 s',
      topSpeed: '240 km/soat',
      power: '544 ot kuchi',
      torque: '745 Nm',
      range: '625 km (WLTP)',
      drivetrain: 'Ikki motorli xDrive to‘liq uzatma',
      transmission: 'Bir pog‘onali avtomat',
      engine: 'BMW eDrive texnologiyasi'
    },
    description: 'BMW i7 – to‘liq elektr hashamatli sedan. Orqa yo‘lovchilar uchun 31.3 dyuymli BMW Theatre Screen va Executive Lounge kreslolari orqali xususiy kinoteatr darajasidagi qulaylik taqdim etadi.',
    colors: getColorsForUrl('https://www.bmwusa.com/vehicles/7-series/sedan/bmw-7-series-sedan.html', [
      { name: 'Two-tone Oxide Grey / Black', hex: '#787773', image: '/images/cars/i7.jpg' },
      { name: 'Tanzanite Blue II Metallic', hex: '#0C2340', image: '/images/cars/i7-blue.jpg' },
      { name: 'Black Sapphire Metallic', hex: '#121417', image: '/images/cars/i7.jpg' },
      { name: 'Mineral White Metallic', hex: '#EFF0F2', image: '/images/cars/i7.jpg' },
      { name: 'Dravit Grey Metallic', hex: '#4F5052', image: '/images/cars/i7.jpg' },
      { name: 'Aventurin Red Metallic', hex: '#6D1A24', image: '/images/cars/i7.jpg' },
      { name: 'Frozen Space Silver Metallic', hex: '#9FA4A8', image: '/images/cars/i7.jpg' }
    ]),
    highlights: [
      '31.3 dyuymli 8K o‘lchamdagi BMW Theatre Screen',
      'Panoramic Sky Lounge LED yoritgichli shisha tom',
      'BMW Interaction Bar sensorli kristalli boshqaruv paneli',
      'Avtomatik ochiluvchi va yopiluvchi eshiklar'
    ]
  },

  // 3. BMW M4 Competition Coupé
  {
    id: 'bmw-m4-competition-coupe',
    name: 'BMW M4 Competition Coupé',
    series: 'M4 Seriyasi',
    category: 'm-power',
    badge: 'M Motorsport',
    tagline: 'Trek hayajoni va kundalik haydashning agressiv ifodasi',
    price: 83200,
    featured: true,
    heroImage: 'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVd4Ws8wSRCzgqHyAL5lQa7sYeySzoVBzcAiN3lZyaBNODXYunWqebQ53yxpYmrfZ7dWcMKHS94mvhD%25VicdTjO3gXA9bLL10tN2ZR5EiyhPS5qwlGmIqQ53nqPR9ayV7tQMw1p8ac1QUDCYLxbUx5WGe89GsLsbbUiprJqT9Gw6ZuLmMptYRSF3y67m5VKJXYCygNWusmlTv0PGdyX324bOQTQdjcyQt3azDxTa6dnkq83pgzOALUd1%25kIFJGzEQABKupklNFeWS6AFQKMPVY8weWhbNmUhIPo90yGCBbHi4Tpzt9%25wc36sciftxdYrIw178zQIftECUkaRU7slGAn5SCrXpFONflZQ6KIOmXRaYWBHOQ5nmPeLmagOybLKBnvIT9JWTO2B3iuZZIjedwSUBBDMztVAmeqhrhPeEQm2awpfQ53RpsBeayVOJx3w1pqSWvFSrW2vEyXqcfbYGWHRBDFBfpCb9EiyElNZkscCRbz1vbwx65efVubbWCmnvzIc1QrO2kn9MOXId4pvnWhcnzIWGjuekx97',
    gallery: [
      'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVd4Ws8wSRCzgqHyAL5lQa7sYeySzoVBzcAiN3lZyaBNODXYunWqebQ53yxpYmrfZ7dWcMKHS94mvhD%25VicdTjO3gXA9bLL10tN2ZR5EiyhPS5qwlGmIqQ53nqPR9ayV7tQMw1p8ac1QUDCYLxbUx5WGe89GsLsbbUiprJqT9Gw6ZuLmMptYRSF3y67m5VKJXYCygNWusmlTv0PGdyX324bOQTQdjcyQt3azDxTa6dnkq83pgzOALUd1%25kIFJGzEQABKupklNFeWS6AFQKMPVY8weWhbNmUhIPo90yGCBbHi4Tpzt9%25wc36sciftxdYrIw178zQIftECUkaRU7slGAn5SCrXpFONflZQ6KIOmXRaYWBHOQ5nmPeLmagOybLKBnvIT9JWTO2B3iuZZIjedwSUBBDMztVAmeqhrhPeEQm2awpfQ53RpsBeayVOJx3w1pqSWvFSrW2vEyXqcfbYGWHRBDFBfpCb9EiyElNZkscCRbz1vbwx65efVubbWCmnvzIc1QrO2kn9MOXId4pvnWhcnzIWGjuekx97',
      '/images/cars/m4.jpg',
      '/images/cars/interior.jpg'
    ],
    specs: {
      acceleration: '3.5 s',
      topSpeed: '290 km/soat',
      power: '510 ot kuchi',
      torque: '650 Nm',
      range: '10.1 l / 100 km',
      drivetrain: 'M xDrive / Orqa uzatma',
      transmission: '8-pog‘onali M Steptronic',
      engine: '3.0L BMW M TwinPower Turbo qatorli 6 silindr'
    },
    description: 'BMW M4 Competition Coupé – bu motorsport dunyosining eng zamonaviy yutug‘i. Yuqori aylanishlar soniga mo‘ljallangan M dvigateli va moslashuvchan M podveskasi har bir burilishda beqiyos aniqlik beradi.',
    colors: getColorsForUrl('https://www.bmwusa.com/vehicles/m-series/bmw-4-series-m-models/bmw-m4-coupe.html'),
    highlights: [
      'M Carbon tomi orqali og‘irlik markazi tushirilgan',
      'M Drive Professional va M Drift Analyzer',
      'M sport differensiali',
      'Moslashuvchan M osma tizimi'
    ]
  },

  // 4. BMW X5 xDrive40i / xDrive50e (Popular SAV)
  {
    id: 'bmw-x5-suv',
    name: 'BMW X5 xDrive40i',
    series: 'X5 Seriyasi',
    category: 'x-series',
    badge: 'SAV Flagship',
    tagline: 'Liderlikning har bir marshrutdagi qat’iy ifodasi',
    price: 68000,
    featured: true,
    heroImage: 'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVJ4Ws8wSRCzgqHyAL5lQa7sYXOSa2CpLQFjMflZyh3NA%250MA8Kt4zQ53yxpYmrfZ7dWc3SHS94mvhz06kxbZzId4uzwbBL10t8kdqBz2aKwqHMLWqr%25f1hFUnzj15K908l5w1p75zfAtUDJACyXq2FgXAXHXbMv6jQ%25Q9Z2YDafai2jmqn1nvGDyLOEfNmqTJIs1yvL3uBrEV1JdSeZG4YuzVMRpc0SkNh56rOVA0ogYLwNF4Hvmbw0Kc%252y714Wxfj0pUcP81D4VkxbUEqcNO89GsLxdNUiprJ8k%25Gw6ZujNmptYRSDX%2567m5VqQOYCygNzu5mlTv0kSSyX324AFTTQdjcFU33azDxKsjdnkq8WeqzOALUPMykIFJGbPhABKupK31FeWS6WwaKMPVYPt9WhbNmb3rPo90y9slbHi4Tiwy9%25wc3wHBiftxdt%255w178zsjltECUkYRp7slGAmC5CrXpFyn9lZQ6KTOrXRaYW3I2Q5nmPd6%25agOybzYgnvIT9kgbO2B3iApnIjedwsNkBDF7UrOQJxyVAfke3x8NHC4wnfDye975KZ7dDTUVHS9HZTn7C5lk5exgNgpn4sxgeb7UrOjJE471OREHswTlB',
    gallery: [
      'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVJ4Ws8wSRCzgqHyAL5lQa7sYXOSa2CpLQFjMflZyh3NA%250MA8Kt4zQ53yxpYmrfZ7dWc3SHS94mvhz06kxbZzId4uzwbBL10t8kdqBz2aKwqHMLWqr%25f1hFUnzj15K908l5w1p75zfAtUDJACyXq2FgXAXHXbMv6jQ%25Q9Z2YDafai2jmqn1nvGDyLOEfNmqTJIs1yvL3uBrEV1JdSeZG4YuzVMRpc0SkNh56rOVA0ogYLwNF4Hvmbw0Kc%252y714Wxfj0pUcP81D4VkxbUEqcNO89GsLxdNUiprJ8k%25Gw6ZujNmptYRSDX%2567m5VqQOYCygNzu5mlTv0kSSyX324AFTTQdjcFU33azDxKsjdnkq8WeqzOALUPMykIFJGbPhABKupK31FeWS6WwaKMPVYPt9WhbNmb3rPo90y9slbHi4Tiwy9%25wc3wHBiftxdt%255w178zsjltECUkYRp7slGAmC5CrXpFyn9lZQ6KTOrXRaYW3I2Q5nmPd6%25agOybzYgnvIT9kgbO2B3iApnIjedwsNkBDF7UrOQJxyVAfke3x8NHC4wnfDye975KZ7dDTUVHS9HZTn7C5lk5exgNgpn4sxgeb7UrOjJE471OREHswTlB',
      '/images/cars/hero.jpg'
    ],
    specs: {
      acceleration: '5.2 s',
      topSpeed: '250 km/soat',
      power: '375 ot kuchi',
      torque: '520 Nm',
      range: '8.8 l / 100 km',
      drivetrain: 'xDrive aqlli to‘liq uzatma',
      transmission: '8-pog‘onali Steptronic Sport',
      engine: '3.0L BMW TwinPower Turbo qatorli 6 silindr'
    },
    description: 'Yangi BMW X5 – kuch, dadillik va mislsiz hashamatning yorqin namunasi. Yoritilgan BMW Iconic Glow radiator panjarasi va 48V yengil gibrid tizimi orqali eng yuqori tejamkorlik va tezlikni birlashtiradi.',
    colors: getColorsForUrl('https://www.bmwusa.com/vehicles/x-series/suv/bmw-x5.html'),
    highlights: [
      'BMW Curved Display va iDrive 8.5 operatsion tizimi',
      'BMW Iconic Glow yoritilgan radiator panjarasi',
      'xOffroad paketi (4 xil yo‘lsizlik rejimi)',
      'Ikki o‘qli pnevmatik osma tizimi'
    ]
  },

  // 5. BMW X7 xDrive40i / M60i (Luxury SAV Flagship)
  {
    id: 'bmw-x7-m60i',
    name: 'BMW X7 M60i xDrive',
    series: 'X7 Seriyasi',
    category: 'x-series',
    badge: 'SAV Flagship',
    tagline: 'Cheksiz qulaylik va eng yuqori darajadagi 7 o‘rindiqli SAV',
    price: 110900,
    featured: true,
    heroImage: 'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVJ4Ws8wSRCzgqHyAL5lQa7sYXOSa2CpLQF7VllZyh3NA%250MA8Kt4zQ53yxpYmrfZ7dWcf6HS94mvhz06kxbZzId4uzwbBL10t8kdqBz2aKwqHMLWqr%25f1hFUnzj15K908l5w1p75zfAtUDJACyXq2FgXAXHXbMv6jQ%25Q9Z2YDafai2jmqn1nvjDyLOEOkUqTJIs1fSL3uBrE5JJdSeZs3EuzVMRr0sSkNh56xyVA0ogY8cNF4HvmRB0Kc%252yu84WxfjTSCcP81D3wCxbUEqdr289GsLxmEUiprJ8DsGw6ZuUqiptYRSGxP67m5Vp8IYCygN6komlTv0YxeyX324m8nTQdjcyIk3azDxTePdnkq83VEzOALUdNckIFJGzHkABKupkbXFeWS6ABuKMPVYFXqWhbNmKQWPo90yG10bHi4TpEX9%25wc36sJiftxdYrIw178zm9utECUkan77slGAnWCCrXpFOMslZQ6KIv6XRaYWB2tQ5nmPej4agOybMxrnvIT9hMdO2B3ioVcIjedwHsNBDMztMa0eqhk7h1gMLoACoE%25hJHFlHsoou%25KX%25n8HSfWQfxR%25V1Pa1OkfNEbnEsa10s9OsNLE4riIr6OscZwB8T5rxRteXpCZ857MQRrRUgChaj15GvlonDUgp2XHOqyv6jQ%25Il02YDafBAOjmqn1esnDyLOEMm1qTJIshKKL3uBroXvJdSeZHQNuzVMR%25aJSk%25gl6JDK7IbH8oVe7C9cvwRL8kIVrgyfYgMkBlbcPrcYBLgvy2oyWXdETQLwp7TVsgl6JzKGwgUJmGcpRB2S',
    gallery: [
      'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVJ4Ws8wSRCzgqHyAL5lQa7sYXOSa2CpLQF7VllZyh3NA%250MA8Kt4zQ53yxpYmrfZ7dWcf6HS94mvhz06kxbZzId4uzwbBL10t8kdqBz2aKwqHMLWqr%25f1hFUnzj15K908l5w1p75zfAtUDJACyXq2FgXAXHXbMv6jQ%25Q9Z2YDafai2jmqn1nvjDyLOEOkUqTJIs1fSL3uBrE5JJdSeZs3EuzVMRr0sSkNh56xyVA0ogY8cNF4HvmRB0Kc%252yu84WxfjTSCcP81D3wCxbUEqdr289GsLxmEUiprJ8DsGw6ZuUqiptYRSGxP67m5Vp8IYCygN6komlTv0YxeyX324m8nTQdjcyIk3azDxTePdnkq83VEzOALUdNckIFJGzHkABKupkbXFeWS6ABuKMPVYFXqWhbNmKQWPo90yG10bHi4TpEX9%25wc36sJiftxdYrIw178zm9utECUkan77slGAnWCCrXpFOMslZQ6KIv6XRaYWB2tQ5nmPej4agOybMxrnvIT9hMdO2B3ioVcIjedwHsNBDMztMa0eqhk7h1gMLoACoE%25hJHFlHsoou%25KX%25n8HSfWQfxR%25V1Pa1OkfNEbnEsa10s9OsNLE4riIr6OscZwB8T5rxRteXpCZ857MQRrRUgChaj15GvlonDUgp2XHOqyv6jQ%25Il02YDafBAOjmqn1esnDyLOEMm1qTJIshKKL3uBroXvJdSeZHQNuzVMR%25aJSk%25gl6JDK7IbH8oVe7C9cvwRL8kIVrgyfYgMkBlbcPrcYBLgvy2oyWXdETQLwp7TVsgl6JzKGwgUJmGcpRB2S',
      '/images/cars/interior.jpg'
    ],
    specs: {
      acceleration: '4.7 s',
      topSpeed: '250 km/soat',
      power: '530 ot kuchi',
      torque: '750 Nm',
      range: '12.1 l / 100 km',
      drivetrain: 'xDrive aqlli to‘liq uzatma',
      transmission: '8-pog‘onali Steptronic Sport',
      engine: '4.4L BMW M TwinPower Turbo V8'
    },
    description: 'BMW X7 M60i – BMW SUVlar oilasining eng yirik va eng hashamatli vakili. Uch qatorli 7 o‘rindiq, pnevmatik osma va V8 quvvati uni haqiqiy birinchi toifa kemasiga aylantiradi.',
    colors: getColorsForUrl('https://www.bmwusa.com/vehicles/x-series/x7/bmw-x7.html'),
    highlights: [
      '3 qatorli elektr boshqariluvchi 7 ta o‘rindiq',
      'Panoramic Sky Lounge LED yulduzli shift',
      'Integral faol rul boshqaruvi (orqa g‘ildiraklar burilishi)',
      'Executive Drive Pro faol barqarorlashtirish tizimi'
    ]
  },

  // 6. BMW M5 Sedan
  {
    id: 'bmw-m5-competition',
    name: 'BMW M5 Sedan',
    series: 'M5 Seriyasi',
    category: 'm-power',
    badge: 'M Motorsport',
    tagline: 'Gibrid quvvat va M motorsportning yangi davri',
    price: 119500,
    featured: true,
    heroImage: 'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVJ4Ws8wSRCzgqHyAL5lQa7sYXOSa2CpLQFjPGlZyh3NA%250MA8Kt4zQ53yxpYmrfZ7dWc3ZHS94mvhz06kxbZzId4uzwbBL10t8kdqBz2aKwqHMLWqr%25f1hFUnzj15K908l5w1p75zfAtUDJACyXq2FgXAXHXbMv6jQ%25Q9Z2YDafai2jmqn1nvjDyLOEOKeqTJIs1fSL3uBrEV1JdSeZsN7uzVMRpcmSkNh56x4VA0ogYZINF4HvmJx0Kc%252yu74Wxfj0p%25cP81D4vfxbUEqcNA89GsLx0QUiprJ8V%25Gw6ZuUk4ptYRSGAw67m5Vpe9YCygN6a3mlTv0YOFyX324mByTQdjcyXX3azDxTi5dnkq83wdzOALU06KkIFJG4hJABKupcowFeWS6xH2KMPVY8%25XWhbNmUFYPo90y7CbbHi4TCz99%25wc3lnHiftxdXrxw178zQZPtECUkaRu7slGAnV%25CrXpFON0lZQ6KIOmXRaYWBLVQ5nmPe%25JagOybLKsnvIT9JWOO2B3iuZZIjedwSUBBDMztMa0eqhk7h1gMLoACoE%25hJHFlHsoou%25KX%25n8HSfWQfxR%25V1Pa1OkfNEbnEsa10s9OsNLE4riIr6OscZwB8T5rxRteXpCZ857MQ2fRUgChaj85GvlonDmgp2XHOCNv6jQ%25Ikn2YDafB6%25jmqn1eAADyLOEMCjqTMrw8jgz9QFe0BLn9iKVZPE20TQLfrphUrOTawFVAfVUa2rZpRBpktmH672Px96L%25rw8jyzcPr4jGcVxEaRq',
    gallery: [
      'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVJ4Ws8wSRCzgqHyAL5lQa7sYXOSa2CpLQFjPGlZyh3NA%250MA8Kt4zQ53yxpYmrfZ7dWc3ZHS94mvhz06kxbZzId4uzwbBL10t8kdqBz2aKwqHMLWqr%25f1hFUnzj15K908l5w1p75zfAtUDJACyXq2FgXAXHXbMv6jQ%25Q9Z2YDafai2jmqn1nvjDyLOEOKeqTJIs1fSL3uBrEV1JdSeZsN7uzVMRpcmSkNh56x4VA0ogYZINF4HvmJx0Kc%252yu74Wxfj0p%25cP81D4vfxbUEqcNA89GsLx0QUiprJ8V%25Gw6ZuUk4ptYRSGAw67m5Vpe9YCygN6a3mlTv0YOFyX324mByTQdjcyXX3azDxTi5dnkq83wdzOALU06KkIFJG4hJABKupcowFeWS6xH2KMPVY8%25XWhbNmUFYPo90y7CbbHi4TCz99%25wc3lnHiftxdXrxw178zQZPtECUkaRu7slGAnV%25CrXpFON0lZQ6KIOmXRaYWBLVQ5nmPe%25JagOybLKsnvIT9JWOO2B3iuZZIjedwSUBBDMztMa0eqhk7h1gMLoACoE%25hJHFlHsoou%25KX%25n8HSfWQfxR%25V1Pa1OkfNEbnEsa10s9OsNLE4riIr6OscZwB8T5rxRteXpCZ857MQ2fRUgChaj85GvlonDmgp2XHOCNv6jQ%25Ikn2YDafB6%25jmqn1eAADyLOEMCjqTMrw8jgz9QFe0BLn9iKVZPE20TQLfrphUrOTawFVAfVUa2rZpRBpktmH672Px96L%25rw8jyzcPr4jGcVxEaRq',
      '/images/cars/m8.jpg'
    ],
    specs: {
      acceleration: '3.4 s',
      topSpeed: '305 km/soat',
      power: '727 ot kuchi',
      torque: '1000 Nm',
      range: '69 km elektr masofa',
      drivetrain: 'M xDrive to‘liq uzatma',
      transmission: '8-pog‘onali M Steptronic',
      engine: '4.4L M TwinPower Turbo V8 + M eDrive Electric'
    },
    description: 'Yangi avlod BMW M5 Sedan – V8 dvigatel va kuchli elektromotor kombinatsiyasiga asoslangan gibrid super-sedan. 727 ot kuchi va 1000 Nm aylantiruvchi moment unga aql bovar qilmas tezlanish beradi.',
    colors: getColorsForUrl('https://www.bmwusa.com/vehicles/m-series/m5-series/bmw-m5-sedan.html'),
    highlights: [
      'M HYBRID tizimi: 727 ot kuchi va 1000 Nm moment',
      'Orqa o‘qning boshqarilishi (Integral Active Steering)',
      'M xDrive tizimida toza orqa uzatmali (2WD) rejim',
      'M Carbon tomi va poyga tormozlari'
    ]
  },

  // 7. BMW M3 Competition Sedan
  {
    id: 'bmw-m3-competition',
    name: 'BMW M3 Competition Sedan',
    series: 'M3 Seriyasi',
    category: 'm-power',
    badge: 'M Motorsport',
    tagline: 'Afsonaviy sport sedanining eng mukammal evolyutsiyasi',
    price: 76000,
    featured: true,
    heroImage: 'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVJ4Ws8wSRCzgqHyAL5lQa7sYXOSa2CpLQFj%25slZyh3NA%250MA8Kt4zQ53yxpYmrfZ7dWcuPHS94mvhz06kxbZzId4uzwbBL10t8kdqBz2aKwqHMLWqr%25f1hFUnzj15K908l5w1p75zfAtUDJACyXq2FgXAXHXbMv6jQ%25Q9Z2YDafai2jmqn1nvGDyLOEfNmqTJIs1yvL3uBrEV1JdSeZsN4uzVMRragSkNh56x4VA0ogYZWNF4HvmRB0Kc%252yKH4WxfjTNBcP81D3UAxbUEqcaF89GsLxCqUiprJ8k%25Gw6ZuUAGptYRSDX%2567m5VqQOYCygNLgumlTv0J69yX324uYbTQdjcFN23azDxK00dnkq8WPzzOALUP6kkIFJGbtOABKup9ouFeWS6iHdKMPVYwi%25WhbNmbkrPo90y9CwbHi4TizR9%25wc3wZQiftxdt73w178z7fMtECUkC1v7slGAZ9CCrXpFRLalZQ6K5riXRaYWgZOQ5nmPvRNagOybzD3nvIT9kQqO2B3iAILIjedwFkpBDMztKHQeqhk7W%25DMLoACPfVhJHFlbk5ou%25KX9AuHSfWQiF2%25V1PawK3fNEbntp310s9O7NnE4riIC0AscZwBlLwrxRteXWyZ857MQPrRUQoFSr16kiyXql5tkATjHdMsqUi5Bo0aVo7UwFyjmBjVwsoH0%25l05kxO4Wsduk45IoFSr86JdoLrNJjuMw%25R',
    gallery: [
      'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVJ4Ws8wSRCzgqHyAL5lQa7sYXOSa2CpLQFj%25slZyh3NA%250MA8Kt4zQ53yxpYmrfZ7dWcuPHS94mvhz06kxbZzId4uzwbBL10t8kdqBz2aKwqHMLWqr%25f1hFUnzj15K908l5w1p75zfAtUDJACyXq2FgXAXHXbMv6jQ%25Q9Z2YDafai2jmqn1nvGDyLOEfNmqTJIs1yvL3uBrEV1JdSeZsN4uzVMRragSkNh56x4VA0ogYZWNF4HvmRB0Kc%252yKH4WxfjTNBcP81D3UAxbUEqcaF89GsLxCqUiprJ8k%25Gw6ZuUAGptYRSDX%2567m5VqQOYCygNLgumlTv0J69yX324uYbTQdjcFN23azDxK00dnkq8WPzzOALUP6kkIFJGbtOABKup9ouFeWS6iHdKMPVYwi%25WhbNmbkrPo90y9CwbHi4TizR9%25wc3wZQiftxdt73w178z7fMtECUkC1v7slGAZ9CCrXpFRLalZQ6K5riXRaYWgZOQ5nmPvRNagOybzD3nvIT9kQqO2B3iAILIjedwFkpBDMztKHQeqhk7W%25DMLoACPfVhJHFlbk5ou%25KX9AuHSfWQiF2%25V1PawK3fNEbntp310s9O7NnE4riIC0AscZwBlLwrxRteXWyZ857MQPrRUQoFSr16kiyXql5tkATjHdMsqUi5Bo0aVo7UwFyjmBjVwsoH0%25l05kxO4Wsduk45IoFSr86JdoLrNJjuMw%25R',
      '/images/cars/m4.jpg'
    ],
    specs: {
      acceleration: '3.4 s',
      topSpeed: '290 km/soat',
      power: '510 ot kuchi',
      torque: '650 Nm',
      range: '10.2 l / 100 km',
      drivetrain: 'M xDrive to‘liq uzatma',
      transmission: '8-pog‘onali M Steptronic',
      engine: '3.0L BMW M TwinPower Turbo qatorli 6 silindr'
    },
    description: 'BMW M3 Competition Sedan – to‘rt eshikli poyga mashinasi. O‘tkir boshqaruv, agresiv old radiator panjarasi va M xDrive to‘liq tortish tizimi bilan yo‘lda ham, trekda ham tengsiz.',
    colors: getColorsForUrl('https://www.bmwusa.com/vehicles/m-series/m3-series/bmw-m3-sedan.html'),
    highlights: [
      'M xDrive aqlli to‘liq tortish tizimi',
      'M Carbon tomi va sport egzoz tizimi',
      'BMW Curved Display M-dizaynli interfeys',
      'Moslashuvchan M sport osmasi'
    ]
  },

  // 8. BMW i5 eDrive40 / M60 (Business Electric)
  {
    id: 'bmw-i5-sedan',
    name: 'BMW i5 eDrive40',
    series: 'i5 Seriyasi',
    category: 'bmw-i',
    badge: 'Pure Electric',
    tagline: 'Biznes-klassning dinamik va raqamli elektr talqini',
    price: 66800,
    featured: true,
    heroImage: 'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVJ4Ws8wSRCzgqHyAL5lQa7sYXOSa2CpLQFjr7lZyh3NA%250MA8Kt4zQ53yxpYmrfZ7dWcnuHS94mvhz06kxbZzId4uzwbBL10t8kdqBz2aKwqHMLWqr%25f1hFUnzj15K908l5w1p75zfAtUDJACyXq2FgXAXHhJGv6jQ%25oqh2YDafHLujmqn1%25JxDyLOExVuqTJIs8fzL3uBrU1QJdSeZGjNuzVMRp6HSkNh5ux4VA0ogSZWNF4HvVFp0Kc%252Nqb4Wxfj0XkcP81D4wGxbUEqc7y89GsLxY8UiprJ89aGw6ZuUArptYRSGF167m5VpK6YCygN638mlTv0JxdyX324uOsTQdjcSI93azDxVBhdnkq8NT7zOALU03tkIFJG4QzABKup9iFFeWS6iyKKMPVYw%25VWhbNmtfkPo90y71jbHi4TCqe9%25wc3lrMiftxdXlUw178zQvqtECUkae27slGAvdHCrXpF2%25%25lZQ6KjNXXRaYWDF4Q5nmPn7JagOybOhsnvIT9IoeO2B3iB7VIjedwe7YBDMztMhweqhk7hD5MLoACo4AhJHFlHcCou%25KXVBHHSfWQNpE%25V1Pa0SefNEbn4Vr10s9O7QTE4riICUtscZwBlrGrxRteXZsZ857MQ2fRUgChaj35GvlonDcgp2XHOCpv6jQ%25Ikn2YDafB6%25jmqn1e7FDyLOEMsjqTMrw8jgz9QFe0BLn9iKVZPE20TQLfrphUrOTawFVAfVUa2rZpRBpkcmH672Px96L%25rw8jyzcPr4jGcVxEaRq',
    gallery: [
      'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVJ4Ws8wSRCzgqHyAL5lQa7sYXOSa2CpLQFjr7lZyh3NA%250MA8Kt4zQ53yxpYmrfZ7dWcnuHS94mvhz06kxbZzId4uzwbBL10t8kdqBz2aKwqHMLWqr%25f1hFUnzj15K908l5w1p75zfAtUDJACyXq2FgXAXHhJGv6jQ%25oqh2YDafHLujmqn1%25JxDyLOExVuqTJIs8fzL3uBrU1QJdSeZGjNuzVMRp6HSkNh5ux4VA0ogSZWNF4HvVFp0Kc%252Nqb4Wxfj0XkcP81D4wGxbUEqc7y89GsLxY8UiprJ89aGw6ZuUArptYRSGF167m5VpK6YCygN638mlTv0JxdyX324uOsTQdjcSI93azDxVBhdnkq8NT7zOALU03tkIFJG4QzABKup9iFFeWS6iyKKMPVYw%25VWhbNmtfkPo90y71jbHi4TCqe9%25wc3lrMiftxdXlUw178zQvqtECUkae27slGAvdHCrXpF2%25%25lZQ6KjNXXRaYWDF4Q5nmPn7JagOybOhsnvIT9IoeO2B3iB7VIjedwe7YBDMztMhweqhk7hD5MLoACo4AhJHFlHcCou%25KXVBHHSfWQNpE%25V1Pa0SefNEbn4Vr10s9O7QTE4riICUtscZwBlrGrxRteXZsZ857MQ2fRUgChaj35GvlonDcgp2XHOCpv6jQ%25Ikn2YDafB6%25jmqn1e7FDyLOEMsjqTMrw8jgz9QFe0BLn9iKVZPE20TQLfrphUrOTawFVAfVUa2rZpRBpkcmH672Px96L%25rw8jyzcPr4jGcVxEaRq'
    ],
    specs: {
      acceleration: '5.7 s',
      topSpeed: '230 km/soat',
      power: '340 ot kuchi',
      torque: '430 Nm',
      range: '582 km (WLTP)',
      drivetrain: 'Orqa uzatma (eDrive)',
      transmission: 'Bir pog‘onali avtomat',
      engine: '5-avlod BMW eDrive'
    },
    description: 'Yangi BMW i5 – 5-seriyaning ilk to‘liq elektr versiyasi. BMW Curved Display, AirConsole o‘yinlari va avtopilot imkoniyatlari bilan ish safari hamda kundalik haydashni zavqqa aylantiradi.',
    colors: getColorsForUrl('https://www.bmwusa.com/vehicles/i-series/i5/bmw-i5-overview.html'),
    highlights: [
      'Highway Assistant avtopilot tizimi',
      'AirConsole avtomobil ichidagi o‘yin platformasi',
      'BMW Interaction Bar kristalli yoritgich',
      '582 km gacha elektr masofasi'
    ]
  },

  // 9. BMW X1 xDrive28i (Compact SAV)
  {
    id: 'bmw-x1-suv',
    name: 'BMW X1 xDrive28i',
    series: 'X1 Seriyasi',
    category: 'x-series',
    badge: 'SAV Compact',
    tagline: 'Katta rejalar uchun ixcham va serharakat yo‘ldosh',
    price: 40500,
    featured: false,
    heroImage: 'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVJ4Ws8wSRCzgqHyAL5lQa7sYXOSa2CpLQFjr9lZyh3NA%250MA8Kt4zQ53yxpYmrfZ7dWc37HS94mvhz06kxbZzId4uzwbBL10t8kdqBz2aKwqHMLWqr%25f1hFUnzj15K908l5w1p75zfAtUDJACyXq2FgXAXHXy6v6jQ%25Q9h2YDafai2jmqn1nvUDyLOEOf1qTJIs10yL3uBrET2JdSeZsNEuzVMRr0cSkNh5Z4lVA0ogY8cNF4HvmJx0Kc%252yKH4WxfjTN0cP81D3s1xbUEqcYp89GsLx0FUiprJ8iKGw6ZuUw4ptYRSG0167m5VpFxYCygN6MimlTv0YnByX324mkETQdjcSI73azDxVBDdnkq8NewzOALU03CkIFJGbxXABKup9iFFeWS6iyKKMPVYw%25VWhbNmtfkPo90y7tcbHi4TCR29%25wc3lO5iftxdRyMw178z5hhtECUkgu77slGAvzVCrXpFXiDlZQ6KQBnXRaYWa9LQ5nmPnqhagOybOiGnvIT9IBbO2B3iBvrIjedwqQBBDMztLcoeqhk7JyRMLoACuqnhJHFlSLfou%25KXVJ6HSfWQi4b%25V1PawfcfNEbnt1%2510s9O7wkE4riIC5oscZwBlg4rxRteXvpZ857MQwuRUgChaHQ5GvlonUhgp2XHOG9v6jQ%25Iwk2YDafBtvjmBE9cvR3PlkIVODQPbAusKfgVmlDHEUexEamX9kuzHuxXgEsUrOUd66hGwgK4PGDoE9cvY30KENv80u4fXrj',
    gallery: [
      'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVJ4Ws8wSRCzgqHyAL5lQa7sYXOSa2CpLQFjr9lZyh3NA%250MA8Kt4zQ53yxpYmrfZ7dWc37HS94mvhz06kxbZzId4uzwbBL10t8kdqBz2aKwqHMLWqr%25f1hFUnzj15K908l5w1p75zfAtUDJACyXq2FgXAXHXy6v6jQ%25Q9h2YDafai2jmqn1nvUDyLOEOf1qTJIs10yL3uBrET2JdSeZsNEuzVMRr0cSkNh5Z4lVA0ogY8cNF4HvmJx0Kc%252yKH4WxfjTN0cP81D3s1xbUEqcYp89GsLx0FUiprJ8iKGw6ZuUw4ptYRSG0167m5VpFxYCygN6MimlTv0YnByX324mkETQdjcSI73azDxVBDdnkq8NewzOALU03CkIFJGbxXABKup9iFFeWS6iyKKMPVYw%25VWhbNmtfkPo90y7tcbHi4TCR29%25wc3lO5iftxdRyMw178z5hhtECUkgu77slGAvzVCrXpFXiDlZQ6KQBnXRaYWa9LQ5nmPnqhagOybOiGnvIT9IBbO2B3iBvrIjedwqQBBDMztLcoeqhk7JyRMLoACuqnhJHFlSLfou%25KXVJ6HSfWQi4b%25V1PawfcfNEbnt1%2510s9O7wkE4riIC5oscZwBlg4rxRteXvpZ857MQwuRUgChaHQ5GvlonUhgp2XHOG9v6jQ%25Iwk2YDafBtvjmBE9cvR3PlkIVODQPbAusKfgVmlDHEUexEamX9kuzHuxXgEsUrOUd66hGwgK4PGDoE9cvY30KENv80u4fXrj'
    ],
    specs: {
      acceleration: '6.2 s',
      topSpeed: '240 km/soat',
      power: '241 ot kuchi',
      torque: '400 Nm',
      range: '7.6 l / 100 km',
      drivetrain: 'xDrive to‘liq uzatma',
      transmission: '7-pog‘onali ikki muftali Steptronic',
      engine: '2.0L BMW TwinPower Turbo 4 silindr'
    },
    description: 'Yangi BMW X1 – shahar ichida chaqqon va uzoq sayohatlarda qulay ixcham krossover. BMW Curved Display va keng sig‘imli yukxona bilan yosh oilalar va faol insonlar uchun ideal.',
    colors: getColorsForUrl('https://www.bmwusa.com/vehicles/x-series/x1/bmw-x1.html'),
    highlights: [
      'BMW Curved Display panoramali ekran',
      'xDrive aqlli to‘liq tortish tizimi',
      'Yurish rejimini moslashtiruvchi My Modes',
      'Kengaytirilgan haydovchiga yordam tizimi'
    ]
  },

  // 10. BMW X6 xDrive40i (Sports Activity Coupé)
  {
    id: 'bmw-x6-coupe-suv',
    name: 'BMW X6 xDrive40i',
    series: 'X6 Seriyasi',
    category: 'x-series',
    badge: 'SAC Sport',
    tagline: 'Ekspressiv kupe silueti va SUVning qudratli kuchi',
    price: 74500,
    featured: false,
    heroImage: 'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVJ4Ws8wSRCzgqHyAL5lQa7sYXOSa2CpLQFjPGlZyh3NA%250MA8Kt4zQ53yxpYmrfZ7dWc3ZHS94mvhz06kxbZzId4uzwbBL10t8kdqBz2aKwqHMLWqr%25f1hFUnzj15K908l5w1p75zfAtUDJACyXq2FgXAXHXbMv6jQ%25Q9Z2YDafai2jmqn1nvjDyLOEOKeqTJIs1fSL3uBrEV1JdSeZsN7uzVMRpcmSkNh56x4VA0ogYZINF4HvmJx0Kc%252yu74Wxfj0p%25cP81D4vfxbUEqcNA89GsLx0QUiprJ8V%25Gw6ZuUk4ptYRSGAw67m5Vpe9YCygN6a3mlTv0YOFyX324mByTQdjcyXX3azDxTi5dnkq83wdzOALU06KkIFJG4hJABKupcowFeWS6xH2KMPVY8%25XWhbNmUFYPo90y7CbbHi4TCz99%25wc3lnHiftxdXrxw178zQZPtECUkaRu7slGAnV%25CrXpFON0lZQ6KIOmXRaYWBLVQ5nmPe%25JagOybLKsnvIT9JWOO2B3iuZZIjedwSUBBDMztMa0eqhk7h1gMLoACoE%25hJHFlHsoou%25KX%25n8HSfWQfxR%25V1Pa1OkfNEbnEsa10s9OsNLE4riIr6OscZwB8T5rxRteXpCZ857MQ2fRUgChaj85GvlonDmgp2XHOCNv6jQ%25Ikn2YDafB6%25jmqn1eAADyLOEMCjqTMrw8jgz9QFe0BLn9iKVZPE20TQLfrphUrOTawFVAfVUa2rZpRBpktmH672Px96L%25rw8jyzcPr4jGcVxEaRq',
    gallery: [
      'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVJ4Ws8wSRCzgqHyAL5lQa7sYXOSa2CpLQFjPGlZyh3NA%250MA8Kt4zQ53yxpYmrfZ7dWc3ZHS94mvhz06kxbZzId4uzwbBL10t8kdqBz2aKwqHMLWqr%25f1hFUnzj15K908l5w1p75zfAtUDJACyXq2FgXAXHXbMv6jQ%25Q9Z2YDafai2jmqn1nvjDyLOEOKeqTJIs1fSL3uBrEV1JdSeZsN7uzVMRpcmSkNh56x4VA0ogYZINF4HvmJx0Kc%252yu74Wxfj0p%25cP81D4vfxbUEqcNA89GsLx0QUiprJ8V%25Gw6ZuUk4ptYRSGAw67m5Vpe9YCygN6a3mlTv0YOFyX324mByTQdjcyXX3azDxTi5dnkq83wdzOALU06KkIFJG4hJABKupcowFeWS6xH2KMPVY8%25XWhbNmUFYPo90y7CbbHi4TCz99%25wc3lnHiftxdXrxw178zQZPtECUkaRu7slGAnV%25CrXpFON0lZQ6KIOmXRaYWBLVQ5nmPe%25JagOybLKsnvIT9JWOO2B3iuZZIjedwSUBBDMztMa0eqhk7h1gMLoACoE%25hJHFlHsoou%25KX%25n8HSfWQfxR%25V1Pa1OkfNEbnEsa10s9OsNLE4riIr6OscZwB8T5rxRteXpCZ857MQ2fRUgChaj85GvlonDmgp2XHOCNv6jQ%25Ikn2YDafB6%25jmqn1eAADyLOEMCjqTMrw8jgz9QFe0BLn9iKVZPE20TQLfrphUrOTawFVAfVUa2rZpRBpktmH672Px96L%25rw8jyzcPr4jGcVxEaRq'
    ],
    specs: {
      acceleration: '5.2 s',
      topSpeed: '250 km/soat',
      power: '375 ot kuchi',
      torque: '520 Nm',
      range: '8.9 l / 100 km',
      drivetrain: 'xDrive to‘liq uzatma',
      transmission: '8-pog‘onali Steptronic Sport',
      engine: '3.0L BMW TwinPower Turbo qatorli 6 silindr'
    },
    description: 'BMW X6 – sport kupeining maftunkor liniyalari va kuchli yo‘ltanlamas imkoniyatlarining o‘ziga xos uyg‘unligi. M Sport paketi va yoritilgan panjara unga yo‘lda tengsiz xarizma baxsh etadi.',
    colors: getColorsForUrl('https://www.bmwusa.com/vehicles/x-series/x6/bmw-x6.html'),
    highlights: [
      'Iconic Glow yoritilgan old panjara',
      'M Sport tormozlari va egzoz tizimi',
      'BMW Live Cockpit Professional',
      'Sport transmissiya va rul quloqchalari'
    ]
  },

  // 11. BMW M2 Coupe
  {
    id: 'bmw-m2-coupe',
    name: 'BMW M2 Coupé',
    series: 'M2 Seriyasi',
    category: 'm-power',
    badge: 'M Motorsport',
    tagline: 'Sof poyga tuyg‘ulari va ixcham orqa uzatmali hayajon',
    price: 64900,
    featured: false,
    heroImage: 'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVJ4Ws8wSRCzgqHyAL5lQa7sYXOSa2CpLQFjI0lZyh3NA%250MA8Kt4zQ53yxpYmrfZ7dWcBuHS94mvhz06kxbZzId4uzwbBL10t8kdqBz2aKwqHMLWqr%25f1hFUnzj15K908l5w1p75zfAtUDJACyXq2FgXAXHXbMv6jQ%25Q9v2YDafagLjmqn1nMbDyLOEfmgqTJIs1SfL3uBrEV0JdSeZsN7uzVMRpc0SkNh56q4VA0ogYAZNF4HvmH00Kc%252yVN4WxfjTEUcP81D3sOxbUEqcYp89GsLx9FUiprJ8i0Gw6ZuUwUptYRSG0167m5Vpe9YCygNLCimlTv0JnvyX324uObTQdjcSm43azDxVyidnkq8WPzzOALUP6kkIFJGbRQABKup9ouFeWS6iHdKMPVYwi0WhbNmtrgPo90ys6kbHi4Trze9%25wc3ZeeiftxdRLww178z53etECUkgp07slGAl9jCrXpFXI%25lZQ6KQBnXRaYWa9LQ5nmPnqhagOybOiGnvIT9IBbO2B3iBvrIjedwqQBBDMztLcoeqhk7JDaMLoACuq%25hJHFlSLpou%25KXVJ7HSfWQi4b%25V1PawfcfNEbnt1%2510s9O7wtE4riIC50scZwBlgGrxRteXiJZ857MQTWRUgCha8M5Gvlon9Rgpn%25WNRsmFt3aJQvCFKdqfkoZJptvM%25cO0%25lp7W3qTMq07Z%25fc1QcyU7exbZkVFxve%25WNRGmSk%25uR4SqVo71g',
    gallery: [
      'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVJ4Ws8wSRCzgqHyAL5lQa7sYXOSa2CpLQFjI0lZyh3NA%250MA8Kt4zQ53yxpYmrfZ7dWcBuHS94mvhz06kxbZzId4uzwbBL10t8kdqBz2aKwqHMLWqr%25f1hFUnzj15K908l5w1p75zfAtUDJACyXq2FgXAXHXbMv6jQ%25Q9v2YDafagLjmqn1nMbDyLOEfmgqTJIs1SfL3uBrEV0JdSeZsN7uzVMRpc0SkNh56q4VA0ogYAZNF4HvmH00Kc%252yVN4WxfjTEUcP81D3sOxbUEqcYp89GsLx9FUiprJ8i0Gw6ZuUwUptYRSG0167m5Vpe9YCygNLCimlTv0JnvyX324uObTQdjcSm43azDxVyidnkq8WPzzOALUP6kkIFJGbRQABKup9ouFeWS6iHdKMPVYwi0WhbNmtrgPo90ys6kbHi4Trze9%25wc3ZeeiftxdRLww178z53etECUkgp07slGAl9jCrXpFXI%25lZQ6KQBnXRaYWa9LQ5nmPnqhagOybOiGnvIT9IBbO2B3iBvrIjedwqQBBDMztLcoeqhk7JDaMLoACuq%25hJHFlSLpou%25KXVJ7HSfWQi4b%25V1PawfcfNEbnt1%2510s9O7wtE4riIC50scZwBlgGrxRteXiJZ857MQTWRUgCha8M5Gvlon9Rgpn%25WNRsmFt3aJQvCFKdqfkoZJptvM%25cO0%25lp7W3qTMq07Z%25fc1QcyU7exbZkVFxve%25WNRGmSk%25uR4SqVo71g'
    ],
    specs: {
      acceleration: '3.9 s',
      topSpeed: '285 km/soat',
      power: '473 ot kuchi',
      torque: '600 Nm',
      range: '9.8 l / 100 km',
      drivetrain: 'Orqa uzatma (RWD)',
      transmission: '8-pog‘onali M Steptronic yoki 6-pog‘onali mexanika',
      engine: '3.0L M TwinPower Turbo qatorli 6 silindr'
    },
    description: 'Yangi BMW M2 Coupé – haqiqiy avtoixlosmandlar orzusidagi ixcham poyga avtomobili. Orqa tortish va 473 ot kuchiga ega M TwinPower dvigateli sof haydash quvonchini taqdim etadi.',
    colors: getColorsForUrl('https://www.bmwusa.com/vehicles/m-series/bmw-2-series-m-models/bmw-m2-coupe.html'),
    highlights: [
      'Klassik orqa uzatma va 50:50 vazn taqsimoti',
      'Ixtiyoriy 6-pog‘onali mexanik uzatmalar qutisi',
      'Faol M differensial tizimi',
      'M Carbon sport o‘rindiqlari'
    ]
  },

  // 12. BMW 7 Series Sedan (760i xDrive)
  {
    id: 'bmw-7-series-sedan',
    name: 'BMW 760i xDrive Sedan',
    series: '7 Seriyasi',
    category: 'sedans',
    badge: 'Luxury Flagship',
    tagline: 'Oliy toifadagi yetakchilik va innovatsion shohona qulaylik',
    price: 121300,
    featured: false,
    heroImage: 'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVJ4Ws8wSRCzgqHyAL5lQa7sYXOSa2CpLQFjr5lZyh3NA%250MA8Kt4zQ53yxpYmrfZ7dWcm2HS94mvhz06kxbZzId4uzwbBL10t8kdqBz2aKwqHMLWqr%25f1hFUnzj15K908l5w1p75zfAtUDJACyXq2FgXAXHXbMv6jQ%25Q9Z2YDafai2jmqn1nvGDyLOEf%25uqTJIs10yL3uBrET1JdSeZsNEuzVMRr0cSkNh56x4VA0ogYZINF4HvmFo0Kc%252yOG4WxfjTIOcP81D30jxbUEqd4k89GsLzcxUiprJkR0Gw6ZuAVmptYRSG3Z67m5VpJXYCygN6CumlTv0YxeyX324mwTTQdjcyIk3azDxTePdnkq83MxzOALUdNskIFJGz0JABKupkIJFeWS6AlDKMPVY8%25jWhbNmUfsPo90yGKabHi4TpWq9%25wc3lm4iftxdXyyw178zQattECUkaK77slGAn5GCrXpFOgilZQ6KI7XXRaYWBI2Q5nmPeL0agOybLKsnvIT9JrrO2B3iu8IIjedweQNBDMztMfoeqhk7hXgMLoACoQchJHFlH4rou%25KX%25adHSfWQf1X%25V1Pa1SDfNEbnEVG10s9OcoEE4riIxyRscZwB84HrxRteUcgZ857MQ6lRUgChaeB5Gvlongmgp2XHOa9v6jQ%25ILr2YDafBJ6jmqn1eudDyLOEMaxqTJIshnTL3uBroPMJdSeZH3ruzVMR%25aJSk%25gl6JDK7IbH8oVe7C9cvwRL8kIVrgyfYgMkBlbcPrcYBLgvy2oyNedETQLwp7TVsgl6JzKGwgUJmGcpRB2S',
    gallery: [
      'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVJ4Ws8wSRCzgqHyAL5lQa7sYXOSa2CpLQFjr5lZyh3NA%250MA8Kt4zQ53yxpYmrfZ7dWcm2HS94mvhz06kxbZzId4uzwbBL10t8kdqBz2aKwqHMLWqr%25f1hFUnzj15K908l5w1p75zfAtUDJACyXq2FgXAXHXbMv6jQ%25Q9Z2YDafai2jmqn1nvGDyLOEf%25uqTJIs10yL3uBrET1JdSeZsNEuzVMRr0cSkNh56x4VA0ogYZINF4HvmFo0Kc%252yOG4WxfjTIOcP81D30jxbUEqd4k89GsLzcxUiprJkR0Gw6ZuAVmptYRSG3Z67m5VpJXYCygN6CumlTv0YxeyX324mwTTQdjcyIk3azDxTePdnkq83MxzOALUdNskIFJGz0JABKupkIJFeWS6AlDKMPVY8%25jWhbNmUfsPo90yGKabHi4TpWq9%25wc3lm4iftxdXyyw178zQattECUkaK77slGAn5GCrXpFOgilZQ6KI7XXRaYWBI2Q5nmPeL0agOybLKsnvIT9JrrO2B3iu8IIjedweQNBDMztMfoeqhk7hXgMLoACoQchJHFlH4rou%25KX%25adHSfWQf1X%25V1Pa1SDfNEbnEVG10s9OcoEE4riIxyRscZwB84HrxRteUcgZ857MQ6lRUgChaeB5Gvlongmgp2XHOa9v6jQ%25ILr2YDafBJ6jmqn1eudDyLOEMaxqTJIshnTL3uBroPMJdSeZH3ruzVMR%25aJSk%25gl6JDK7IbH8oVe7C9cvwRL8kIVrgyfYgMkBlbcPrcYBLgvy2oyNedETQLwp7TVsgl6JzKGwgUJmGcpRB2S'
    ],
    specs: {
      acceleration: '4.1 s',
      topSpeed: '250 km/soat',
      power: '536 ot kuchi',
      torque: '750 Nm',
      range: '10.5 l / 100 km',
      drivetrain: 'xDrive to‘liq uzatma',
      transmission: '8-pog‘onali Steptronic Sport',
      engine: '4.4L BMW TwinPower Turbo V8 Mild Hybrid'
    },
    description: 'BMW 760i xDrive Sedan – biznes elitasining nufuzli ramzi. Swarovski kristallari bilan bezatilgan faralar, avtomatik ochiluvchi eshiklar va mislsiz ovoz izolyatsiyasi bilan tengsiz tajriba taqdim etadi.',
    colors: getColorsForUrl('https://www.bmwusa.com/vehicles/7-series/sedan/bmw-7-series-sedan.html'),
    highlights: [
      'BMW Kristall faralar va Iconic Glow panjara',
      'Orqa eshiklarga o‘rnatilgan 5.5 dyuymli sensorli boshqaruv paneli',
      'Bowers & Wilkins 4D akustik tizimi (1965 Vt)',
      'Executive Drive Pro faol osma tizimi'
    ]
  },

  // 13. BMW iX3 All-Electric SAV
  {
    id: 'bmw-ix3-electric',
    name: 'BMW iX3 SAV',
    series: 'iX3 Seriyasi',
    category: 'bmw-i',
    badge: 'Pure Electric',
    tagline: 'Elektr energiyasining yangi avlod SAVida gavdalanishi',
    price: 59900,
    featured: false,
    heroImage: 'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVJ4Ws8wSRCzgqHyAL5lQa7sYXOSa2CpLQFjr7lZyh3NA%250MA8Kt4zQ53yxpYmrfZ7dWcnuHS94mvhz06kxbZzId4uzwbBL10t8kdqBz2aKwqHMLWqr%25f1hFUnzj15K908l5w1p75zfAtUDJACyXq2FgXAXHhJGv6jQ%25oqh2YDafHLujmqn1%25JxDyLOExVuqTJIs8fzL3uBrU1QJdSeZGjNuzVMRp6HSkNh5ux4VA0ogSZWNF4HvVFp0Kc%252Nqb4Wxfj0XkcP81D4wGxbUEqc7y89GsLxY8UiprJ89aGw6ZuUArptYRSGF167m5VpK6YCygN638mlTv0JxdyX324uOsTQdjcSI93azDxVBhdnkq8NT7zOALU03tkIFJG4QzABKup9iFFeWS6iyKKMPVYw%25VWhbNmtfkPo90y71jbHi4TCqe9%25wc3lrMiftxdXlUw178zQvqtECUkae27slGAvdHCrXpF2%25%25lZQ6KjNXXRaYWDF4Q5nmPn7JagOybOhsnvIT9IoeO2B3iB7VIjedwe7YBDMztMhweqhk7hD5MLoACo4AhJHFlHcCou%25KXVBHHSfWQNpE%25V1Pa0SefNEbn4Vr10s9O7QTE4riICUtscZwBlrGrxRteXZsZ857MQ2fRUgChaj35GvlonDcgp2XHOCpv6jQ%25Ikn2YDafB6%25jmqn1e7FDyLOEMsjqTMrw8jgz9QFe0BLn9iKVZPE20TQLfrphUrOTawFVAfVUa2rZpRBpkcmH672Px96L%25rw8jyzcPr4jGcVxEaRq',
    gallery: [
      'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVJ4Ws8wSRCzgqHyAL5lQa7sYXOSa2CpLQFjr7lZyh3NA%250MA8Kt4zQ53yxpYmrfZ7dWcnuHS94mvhz06kxbZzId4uzwbBL10t8kdqBz2aKwqHMLWqr%25f1hFUnzj15K908l5w1p75zfAtUDJACyXq2FgXAXHhJGv6jQ%25oqh2YDafHLujmqn1%25JxDyLOExVuqTJIs8fzL3uBrU1QJdSeZGjNuzVMRp6HSkNh5ux4VA0ogSZWNF4HvVFp0Kc%252Nqb4Wxfj0XkcP81D4wGxbUEqc7y89GsLxY8UiprJ89aGw6ZuUArptYRSGF167m5VpK6YCygN638mlTv0JxdyX324uOsTQdjcSI93azDxVBhdnkq8NT7zOALU03tkIFJG4QzABKup9iFFeWS6iyKKMPVYw%25VWhbNmtfkPo90y71jbHi4TCqe9%25wc3lrMiftxdXlUw178zQvqtECUkae27slGAvdHCrXpF2%25%25lZQ6KjNXXRaYWDF4Q5nmPn7JagOybOhsnvIT9IoeO2B3iB7VIjedwe7YBDMztMhweqhk7hD5MLoACo4AhJHFlHcCou%25KXVBHHSfWQNpE%25V1Pa0SefNEbn4Vr10s9O7QTE4riICUtscZwBlrGrxRteXZsZ857MQ2fRUgChaj35GvlonDcgp2XHOCpv6jQ%25Ikn2YDafB6%25jmqn1e7FDyLOEMsjqTMrw8jgz9QFe0BLn9iKVZPE20TQLfrphUrOTawFVAfVUa2rZpRBpkcmH672Px96L%25rw8jyzcPr4jGcVxEaRq'
    ],
    specs: {
      acceleration: '6.8 s',
      topSpeed: '180 km/soat',
      power: '286 ot kuchi',
      torque: '400 Nm',
      range: '460 km (WLTP)',
      drivetrain: 'Orqa uzatma (eDrive)',
      transmission: 'Bir pog‘onali avtomat',
      engine: '5-avlod BMW eDrive elektr motori'
    },
    description: 'BMW iX3 – klassik X3 sport krossoverining to‘liq elektr modeli. 80 kVt/soat akkumulyator va 150 kVt gacha tezkor zaryadlash stansiyalari orqali 34 daqiqada 80% quvvatga to‘ladi.',
    colors: getColorsForUrl('https://www.bmwusa.com/vehicles/x-series/ix3/bmw-ix3.html'),
    highlights: [
      '150 kVt DC tezkor zaryadlash (10 daqiqada 100 km)',
      'BMW IconicSounds Electric (Hans Zimmer musiqasi)',
      'M Sport aerodinamik disklari',
      'Moslashuvchan osma tizimi'
    ]
  },

  // 14. BMW 4 Series Gran Coupe
  {
    id: 'bmw-4-series-gran-coupe',
    name: 'BMW 430i Gran Coupé',
    series: '4 Seriyasi',
    category: 'sedans',
    badge: 'Gran Coupé',
    tagline: 'To‘rt eshikli kupe estetikasining hayratlanarli jozibasi',
    price: 49500,
    featured: false,
    heroImage: 'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVJ4Ws8wSRCzgqHyAL5lQa7sYXOSa2CpLQFj%25slZyh3NA%250MA8Kt4zQ53yxpYmrfZ7dWcuPHS94mvhz06kxbZzId4uzwbBL10t8kdqBz2aKwqHMLWqr%25f1hFUnzj15K908l5w1p75zfAtUDJACyXq2FgXAXHXbMv6jQ%25Q9Z2YDafai2jmqn1nvGDyLOEfNmqTJIs1yvL3uBrEV1JdSeZsN4uzVMRragSkNh56x4VA0ogYZWNF4HvmRB0Kc%252yKH4WxfjTNBcP81D3UAxbUEqcaF89GsLxCqUiprJ8k%25Gw6ZuUAGptYRSDX%2567m5VqQOYCygNLgumlTv0J69yX324uYbTQdjcFN23azDxK00dnkq8WPzzOALUP6kkIFJGbtOABKup9ouFeWS6iHdKMPVYwi%25WhbNmbkrPo90y9CwbHi4TizR9%25wc3wZQiftxdt73w178z7fMtECUkC1v7slGAZ9CCrXpFRLalZQ6K5riXRaYWgZOQ5nmPvRNagOybzD3nvIT9kQqO2B3iAILIjedwFkpBDMztKHQeqhk7W%25DMLoACPfVhJHFlbk5ou%25KX9AuHSfWQiF2%25V1PawK3fNEbntp310s9O7NnE4riIC0AscZwBlLwrxRteXWyZ857MQPrRUQoFSr16kiyXql5tkATjHdMsqUi5Bo0aVo75PrscCs2AManDOPD%256JtqTMGg6q%257amvhu05GaRhj5sgXAOH',
    gallery: [
      'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVJ4Ws8wSRCzgqHyAL5lQa7sYXOSa2CpLQFj%25slZyh3NA%250MA8Kt4zQ53yxpYmrfZ7dWcuPHS94mvhz06kxbZzId4uzwbBL10t8kdqBz2aKwqHMLWqr%25f1hFUnzj15K908l5w1p75zfAtUDJACyXq2FgXAXHXbMv6jQ%25Q9Z2YDafai2jmqn1nvGDyLOEfNmqTJIs1yvL3uBrEV1JdSeZsN4uzVMRragSkNh56x4VA0ogYZWNF4HvmRB0Kc%252yKH4WxfjTNBcP81D3UAxbUEqcaF89GsLxCqUiprJ8k%25Gw6ZuUAGptYRSDX%2567m5VqQOYCygNLgumlTv0J69yX324uYbTQdjcFN23azDxK00dnkq8WPzzOALUP6kkIFJGbtOABKup9ouFeWS6iHdKMPVYwi%25WhbNmbkrPo90y9CwbHi4TizR9%25wc3wZQiftxdt73w178z7fMtECUkC1v7slGAZ9CCrXpFRLalZQ6K5riXRaYWgZOQ5nmPvRNagOybzD3nvIT9kQqO2B3iAILIjedwFkpBDMztKHQeqhk7W%25DMLoACPfVhJHFlbk5ou%25KX9AuHSfWQiF2%25V1PawK3fNEbntp310s9O7NnE4riIC0AscZwBlLwrxRteXWyZ857MQPrRUQoFSr16kiyXql5tkATjHdMsqUi5Bo0aVo75PrscCs2AManDOPD%256JtqTMGg6q%257amvhu05GaRhj5sgXAOH'
    ],
    specs: {
      acceleration: '5.8 s',
      topSpeed: '250 km/soat',
      power: '255 ot kuchi',
      torque: '400 Nm',
      range: '7.4 l / 100 km',
      drivetrain: 'Orqa uzatma / xDrive',
      transmission: '8-pog‘onali Steptronic Sport',
      engine: '2.0L BMW TwinPower Turbo 4 silindr'
    },
    description: 'BMW 4 Series Gran Coupé – sport kupe nafosati va 5 eshikli keng avtomobil funksionalligining mukammal uyg‘unligi. Ramkasiz eshik oynalari unga betakror ko‘rk bag‘ishlaydi.',
    colors: getColorsForUrl('https://www.bmwusa.com/vehicles/4-series/4-series-gran-coupe/bmw-4-series-gran-coupe.html'),
    highlights: [
      'Ramkasiz oyna eshiklari va liftback orqa eshik',
      'BMW Curved Display va iDrive 8.5',
      'M Sport paketi va sport o‘rindiqlar',
      'Ko‘p funksiyali faol xavfsizlik assistentlari'
    ]
  },

  // 15. BMW X6 M Competition
  {
    id: 'bmw-x6-m-competition',
    name: 'BMW X6 M Competition',
    series: 'X6 M Seriyasi',
    category: 'm-power',
    badge: 'M Motorsport',
    tagline: 'High-Performance SAC sinfining mutlaq yetakchisi',
    price: 130400,
    featured: false,
    heroImage: 'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVJ4Ws8wSRCzgqHyAL5lQa7sYXOSa2CpLQFjPGlZyh3NA%250MA8Kt4zQ53yxpYmrfZ7dWc3lHS94mvhz06kxbZzId4uzwbBL10t8kdqBz2aKwqHMLWqr%25f1hFUnzj15K908l5w1p75zfAtUDJACyXq2FgXAXHXbMv6jQ%25Q9Z2YDafai2jmqn1nvBDyLOEOB9qTJIsIWiL3uBrETYJdSeZsNEuzVMRr0CSkNh5Z4vVA0ogY8TNF4HvmUx0Kc%252y5e4WxfjTSUcP81D3VlxbUEqd4c89GsLxmEUiprJ8DsGw6ZuUcWptYRSGxO67m5Vp4IYCygN6cQmlTv0YhwyX324mOzTQdjcyBW3azDxT3cdnkq83aazOALUdtzkIFJG4YWABKupcouFeWS6xHtKMPVY8%25jWhbNmUfQPo90yGKmbHi4TCl99%25wc3lkiiftxdXO%25w178zQZ8tECUkaRb7slGAn5SCrXpFONflZQ6KI04XRaYWBIyQ5nmPeJNagOybMfunvIT9JWrO2B3iuPIIjedwSRRBDMztVGeeqhk7hn4MLoACoEvhJHFlHsfou%25KX%25rHHSfWQfOU%25V1Pa185fNEbnEIA10s9OsrnE4riIr0JscZwBZYIrxRteU3gZ857MQ6lRUgChaj15GvlonDUgp2XHOqyv6jQ%25Il02YDafBAOjmqn1eYfDyLOEMFFqTJIshlDL3hZtUDvkiaKM4eJOiwWNRbsj43aJ1Z6oGZI3ntKNF1NGnjZR65e6A7y%25YCjb8iYJfZtUDTkxbZcDpxN8sn5L',
    gallery: [
      'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVJ4Ws8wSRCzgqHyAL5lQa7sYXOSa2CpLQFjPGlZyh3NA%250MA8Kt4zQ53yxpYmrfZ7dWc3lHS94mvhz06kxbZzId4uzwbBL10t8kdqBz2aKwqHMLWqr%25f1hFUnzj15K908l5w1p75zfAtUDJACyXq2FgXAXHXbMv6jQ%25Q9Z2YDafai2jmqn1nvBDyLOEOB9qTJIsIWiL3uBrETYJdSeZsNEuzVMRr0CSkNh5Z4vVA0ogY8TNF4HvmUx0Kc%252y5e4WxfjTSUcP81D3VlxbUEqd4c89GsLxmEUiprJ8DsGw6ZuUcWptYRSGxO67m5Vp4IYCygN6cQmlTv0YhwyX324mOzTQdjcyBW3azDxT3cdnkq83aazOALUdtzkIFJG4YWABKupcouFeWS6xHtKMPVY8%25jWhbNmUfQPo90yGKmbHi4TCl99%25wc3lkiiftxdXO%25w178zQZ8tECUkaRb7slGAn5SCrXpFONflZQ6KI04XRaYWBIyQ5nmPeJNagOybMfunvIT9JWrO2B3iuPIIjedwSRRBDMztVGeeqhk7hn4MLoACoEvhJHFlHsfou%25KX%25rHHSfWQfOU%25V1Pa185fNEbnEIA10s9OsrnE4riIr0JscZwBZYIrxRteU3gZ857MQ6lRUgChaj15GvlonDUgp2XHOqyv6jQ%25Il02YDafBAOjmqn1eYfDyLOEMFFqTJIshlDL3hZtUDvkiaKM4eJOiwWNRbsj43aJ1Z6oGZI3ntKNF1NGnjZR65e6A7y%25YCjb8iYJfZtUDTkxbZcDpxN8sn5L'
    ],
    specs: {
      acceleration: '3.7 s',
      topSpeed: '290 km/soat',
      power: '617 ot kuchi',
      torque: '750 Nm',
      range: '12.8 l / 100 km',
      drivetrain: 'M xDrive to‘liq uzatma',
      transmission: '8-pog‘onali M Steptronic',
      engine: '4.4L BMW M TwinPower Turbo V8 (48V Mild-Hybrid)'
    },
    description: 'BMW X6 M Competition – mislsiz quvvat va shiddatli kross-kupe dizayni. 617 ot kuchiga ega V8 dvigatel va M xDrive har qanday yo‘lda hayratomuz tezlanish va barqarorlikni ta’minlaydi.',
    colors: getColorsForUrl('https://www.bmwusa.com/vehicles/m-series/x6-m/bmw-x6-m-models.html'),
    highlights: [
      'M xDrive aqlli to‘liq uzatma tizimi (Active M Differensial)',
      'M Sport egzoz tizimi 4 ta qora xrom trubka bilan',
      'M Carbon tola salon bezaklari',
      'Harman Kardon / Bowers & Wilkins premium akustika'
    ]
  },

  // 16. BMW 550e xDrive Plug-in Hybrid
  {
    id: 'bmw-550e-phev',
    name: 'BMW 550e xDrive Sedan',
    series: '5 Seriyasi',
    category: 'sedans',
    badge: 'PHEV Hybrid',
    tagline: 'Elektr tejamkorligi va 6 silindrli kuchning mukammal uyg‘unligi',
    price: 74800,
    featured: false,
    heroImage: 'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVJ4Ws8wSRCzgqHyAL5lQa7sYXOSa2CpLQFjr7lZyh3NA%250MA8Kt4zQ53yxpYmrfZ7dWcnuHS94mvhz06kxbZzId4uzwbBL10t8kdqBz2aKwqHMLWqr%25f1hFUnzj15K908l5w1p75zfAtUDJACyXq2FgXAXHhJGv6jQ%25oqh2YDafHLujmqn1%25JxDyLOExVuqTJIs8fzL3uBrU1QJdSeZGjNuzVMRp6HSkNh5ux4VA0ogSZWNF4HvVFp0Kc%252Nqb4Wxfj0XkcP81D4wGxbUEqc7y89GsLxY8UiprJ89aGw6ZuUArptYRSGF167m5VpK6YCygN638mlTv0JxdyX324uOsTQdjcSI93azDxVBhdnkq8NT7zOALU03tkIFJG4QzABKup9iFFeWS6iyKKMPVYw%25VWhbNmtfkPo90y71jbHi4TCqe9%25wc3lrMiftxdXlUw178zQvqtECUkae27slGAvdHCrXpF2%25%25lZQ6KjNXXRaYWDF4Q5nmPn7JagOybOhsnvIT9IoeO2B3iB7VIjedwe7YBDMztMhweqhk7hD5MLoACo4AhJHFlHcCou%25KXVBHHSfWQNpE%25V1Pa0SefNEbn4Vr10s9O7QTE4riICUtscZwBlrGrxRteXZsZ857MQ2fRUgChaj35GvlonDcgp2XHOCpv6jQ%25Ikn2YDafB6%25jmqn1e7FDyLOEMsjqTMrw8jgz9QFe0BLn9iKVZPE20TQLfrphUrOTawFVAfVUa2rZpRBpkcmH672Px96L%25rw8jyzcPr4jGcVxEaRq',
    gallery: [
      'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVJ4Ws8wSRCzgqHyAL5lQa7sYXOSa2CpLQFjr7lZyh3NA%250MA8Kt4zQ53yxpYmrfZ7dWcnuHS94mvhz06kxbZzId4uzwbBL10t8kdqBz2aKwqHMLWqr%25f1hFUnzj15K908l5w1p75zfAtUDJACyXq2FgXAXHhJGv6jQ%25oqh2YDafHLujmqn1%25JxDyLOExVuqTJIs8fzL3uBrU1QJdSeZGjNuzVMRp6HSkNh5ux4VA0ogSZWNF4HvVFp0Kc%252Nqb4Wxfj0XkcP81D4wGxbUEqc7y89GsLxY8UiprJ89aGw6ZuUArptYRSGF167m5VpK6YCygN638mlTv0JxdyX324uOsTQdjcSI93azDxVBhdnkq8NT7zOALU03tkIFJG4QzABKup9iFFeWS6iyKKMPVYw%25VWhbNmtfkPo90y71jbHi4TCqe9%25wc3lrMiftxdXlUw178zQvqtECUkae27slGAvdHCrXpF2%25%25lZQ6KjNXXRaYWDF4Q5nmPn7JagOybOhsnvIT9IoeO2B3iB7VIjedwe7YBDMztMhweqhk7hD5MLoACo4AhJHFlHcCou%25KXVBHHSfWQNpE%25V1Pa0SefNEbn4Vr10s9O7QTE4riICUtscZwBlrGrxRteXZsZ857MQ2fRUgChaj35GvlonDcgp2XHOCpv6jQ%25Ikn2YDafB6%25jmqn1e7FDyLOEMsjqTMrw8jgz9QFe0BLn9iKVZPE20TQLfrphUrOTawFVAfVUa2rZpRBpkcmH672Px96L%25rw8jyzcPr4jGcVxEaRq'
    ],
    specs: {
      acceleration: '4.3 s',
      topSpeed: '250 km/soat',
      power: '489 ot kuchi',
      torque: '700 Nm',
      range: '103 km elektr masofasi',
      drivetrain: 'xDrive to‘liq uzatma',
      transmission: '8-pog‘onali Steptronic Sport',
      engine: '3.0L qatorli 6 silindr + eDrive Plug-in Hybrid'
    },
    description: 'BMW 550e xDrive – eng so‘nggi plagin-gibrid texnologiyasi. Shahar ichida 103 km gacha to‘liq elektrda jimjit harakatlanish va trassada 489 ot kuchi bilan zavqli sayohat imkoni.',
    colors: getColorsForUrl('https://www.bmwusa.com/vehicles/5-series/sedan/bmw-5-series-sedan-phev-overview.html'),
    highlights: [
      '103 km gacha faqat elektrda yurish (WLTP)',
      '7.4 kVt AC zaryadlash quvvati (3 soatda 100%)',
      'BMW Curved Display va Interaction Bar',
      'Moslashuvchan M podveska Professional'
    ]
  }
];

console.log('Vehicles configured:', vehicles.length);
for (const v of vehicles) {
  console.log(`Car: ${v.name} -> ${v.colors.length} colors`);
}

fs.writeFileSync('scripts/generated-cars-data.json', JSON.stringify(vehicles, null, 2));
