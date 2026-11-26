import fs from 'fs';

async function main() {
  try {
    const res = await fetch('https://www.bmwusa.com/vehicles.html', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    console.log('Status:', res.status);
    const html = await res.text();
    console.log('HTML length:', html.length);
    const scene7 = html.match(/https?:\/\/[^\s"'<>]*(?:scene7|cosy|bmwusa\.com\/content\/dam)[^\s"'<>]*/gi) || [];
    console.log('Matched URLs:', scene7.slice(0, 15));
  } catch (err) {
    console.error('Fetch error:', err.message);
  }
}

main();
