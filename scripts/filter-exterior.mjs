import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scripts/all-vehicle-colors.json', 'utf8'));

const carList = [];
for (const [url, v] of Object.entries(data)) {
  const exteriorColors = v.colors.filter(c => 
    !c.name.includes('Veganza') && 
    !c.name.includes('Sensafin') && 
    !c.name.includes('SensaTec') && 
    !c.name.includes('Interior') &&
    !c.name.includes('Leather')
  );

  carList.push({
    url,
    title: v.title,
    exteriorCount: exteriorColors.length,
    colors: exteriorColors.map(c => c.name)
  });
}

console.log(carList.filter(c => c.exteriorCount >= 7));
