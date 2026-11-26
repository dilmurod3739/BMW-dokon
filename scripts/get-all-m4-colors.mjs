import fs from 'fs';

function getAllColors() {
  const html = fs.readFileSync('scripts/m4.html', 'utf-8');
  const regex = /<img[^>]+src="([^"]+)"[^>]+alt=" in ([^"]+)"/g;
  const colors = [];
  let m;
  while ((m = regex.exec(html)) !== null) {
    colors.push({
      color: m[2],
      url: m[1].replace(/&amp;/g, '&')
    });
  }
  console.log('M4 Colors found:', colors.length);
  console.log(JSON.stringify(colors, null, 2));
}

getAllColors();
