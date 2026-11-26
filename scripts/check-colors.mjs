import fs from 'fs';

async function checkConfigurator() {
  // Let's test M4, M3, X5, i7 pages on bmwusa.com
  const urls = [
    'https://www.bmwusa.com/vehicles/m-models/m4-coupe/overview.html',
    'https://www.bmwusa.com/vehicles/m-models/m8-gran-coupe/overview.html',
    'https://www.bmwusa.com/vehicles/all-electric/i7/sedan/overview.html',
    'https://www.bmwusa.com/vehicles/x-series/x5/overview.html'
  ];

  for (const u of urls) {
    try {
      const res = await fetch(u, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
      });
      console.log(u, 'status:', res.status);
      const text = await res.text();
      // Look for paint or colors
      const paintMatches = text.match(/"paintCode"|"colorCode"|"paintName"|"exteriorColors"|"swatch"|"cosyUrl"/gi) || [];
      console.log('Paint matches in', u, ':', paintMatches.length);
      // Look for any color names
      const sample = text.match(/(?:Alpine White|Black Sapphire|Isle of Man|Portimao|Dravit|Brooklyn|Toronto Red|Marina Bay|Sao Paulo|Tanzanite|Aventurin|Skyscraper|Carbon Black|Frozen)[^"']*/gi) || [];
      console.log('Color sample:', Array.from(new Set(sample)).slice(0, 10));
    } catch (e) {
      console.error('Error fetching', u, e.message);
    }
  }
}

checkConfigurator();
