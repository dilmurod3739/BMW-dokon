import fs from 'fs';

async function checkM4() {
  const res = await fetch('https://www.bmwusa.com/vehicles/m-models/m4-coupe/overview.html', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  });
  const html = await res.text();
  fs.writeFileSync('scripts/m4.html', html);

  // Search around 'Sao Paulo Yellow'
  const idx = html.indexOf('Sao Paulo Yellow');
  if (idx !== -1) {
    console.log('Context around Sao Paulo Yellow:');
    console.log(html.slice(Math.max(0, idx - 400), idx + 800));
  }
}

checkM4();
