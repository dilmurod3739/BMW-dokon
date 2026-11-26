import fs from 'fs';

async function fetchAllVehicleData() {
  const urls = JSON.parse(fs.readFileSync('scripts/vehicle-urls.json', 'utf8'));
  const results = {};

  for (const url of urls) {
    try {
      console.log('Fetching', url);
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
      });
      if (!res.ok) {
        console.log('Failed:', res.status);
        continue;
      }
      const html = await res.text();

      // Extract colors: <img ... src="url" ... alt=" in ColorName"
      const colors = [];
      const colorRegex = /<img[^>]+src="([^"]+)"[^>]+alt=" in ([^"]+)"/g;
      let m;
      while ((m = colorRegex.exec(html)) !== null) {
        // filter out leather interior
        if (!m[2].toLowerCase().includes('leather') && !m[2].toLowerCase().includes('seats')) {
          colors.push({
            name: m[2].trim(),
            url: m[1].replace(/&amp;/g, '&')
          });
        }
      }

      // Also look for specs if available (like horsepower, 0-60 mph)
      const hpMatch = html.match(/(\d{3})\s*(?:hp|horsepower)/i);
      const accelMatch = html.match(/0-60\s*mph\s*(?:in)?\s*(\d+\.?\d*)\s*sec/i) || html.match(/(\d+\.?\d*)\s*sec(?:\.|onds)?\s*0-60/i);
      const msrpMatch = html.match(/Starting\s*MSRP\s*[:$]?\s*\$([0-9,]+)/i) || html.match(/\$([0-9]{2,3},[0-9]{3})\s*Starting\s*MSRP/i);

      // Car title / h1
      const titleMatch = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
      const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '';

      results[url] = {
        title,
        colors,
        hp: hpMatch ? hpMatch[1] : null,
        accel: accelMatch ? accelMatch[1] : null,
        msrp: msrpMatch ? msrpMatch[1] : null
      };

      console.log(`-> Found ${colors.length} colors for ${title || url}`);
    } catch (err) {
      console.error('Error fetching', url, err.message);
    }
  }

  fs.writeFileSync('scripts/all-vehicle-colors.json', JSON.stringify(results, null, 2));
  console.log('Finished fetching all vehicles data!');
}

fetchAllVehicleData();
