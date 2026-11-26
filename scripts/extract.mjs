import fs from 'fs';

function decodeHtml(html) {
  return html
    .replace(/&#34;/g, '"')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'");
}

async function parse() {
  const raw = fs.readFileSync('scripts/page.html', 'utf-8');
  const decoded = decodeHtml(raw);

  // Look for models array
  // The structure seems to be: {"id":"...","name":"...","modelImageType":"cosy", ... "cosyImageData":{"source":{"url":"..."}}
  const modelRegex = /\{"id":"([^"]+)","name":"([^"]+)",(?:[^{}]|\{[^{}]*\})*?"cosyImageData":\{"source":\{"url":"([^"]+)"/g;
  const models = [];
  let m;
  while ((m = modelRegex.exec(decoded)) !== null) {
    models.push({
      id: m[1],
      name: m[2],
      imageUrl: m[3]
    });
  }

  console.log('Decoded models count:', models.length);
  console.log(models);
  fs.writeFileSync('scripts/extracted-models.json', JSON.stringify(models, null, 2));

  // Let's also search for categories and groups
  // Check if there are category headings like SUVs, Sedans, Coupes, BMW M, etc.
  const categoriesRegex = /"categoryTitle":"([^"]+)"/g;
  const categories = [];
  while ((m = categoriesRegex.exec(decoded)) !== null) {
    categories.push(m[1]);
  }
  console.log('Categories found:', categories);
}

parse();
