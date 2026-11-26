import fs from 'fs';

function findUrls() {
  const pageHtml = fs.readFileSync('scripts/page.html', 'utf-8');
  const urls = [];
  const regex = /https:\/\/www\.bmwusa\.com\/vehicles\/[^&#"'<\s]+/g;
  let m;
  while ((m = regex.exec(pageHtml)) !== null) {
    urls.push(m[0]);
  }
  const uniqueUrls = Array.from(new Set(urls));
  console.log('Unique vehicle page URLs found:', uniqueUrls.length);
  console.log(uniqueUrls);
  fs.writeFileSync('scripts/vehicle-urls.json', JSON.stringify(uniqueUrls, null, 2));
}

findUrls();
