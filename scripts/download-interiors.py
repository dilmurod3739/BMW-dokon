import urllib.request
import ssl
import json
import os
import re
from concurrent.futures import ThreadPoolExecutor

ctx = ssl._create_unverified_context()
out_dir = os.path.join('public', 'images', 'interiors')
os.makedirs(out_dir, exist_ok=True)

with open('scripts/generated-cars-data.json', 'r', encoding='utf-8') as f:
    cars = json.load(f)

# Build a mapping from remote URL to a clean local filename
url_to_local_path = {}
for car in cars:
    car_slug = car['id']
    for ic in car.get('interiorColors', []):
        url = ic['image']
        if url not in url_to_local_path:
            clean_name = re.sub(r'[^a-zA-Z0-9]+', '-', ic['name'].split()[0].lower()).strip('-')
            file_name = f"{car_slug}-{clean_name}.webp"
            url_to_local_path[url] = f"/images/interiors/{file_name}"

print(f"Total unique images to ensure: {len(url_to_local_path)}")

def download(item):
    url, local_rel_path = item
    fname = os.path.basename(local_rel_path)
    file_path = os.path.join(out_dir, fname)
    if os.path.exists(file_path) and os.path.getsize(file_path) > 10000:
        return fname, True, os.path.getsize(file_path)
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, context=ctx, timeout=20) as res, open(file_path, 'wb') as out:
            data = res.read()
            out.write(data)
            return fname, True, len(data)
    except Exception as e:
        return fname, False, str(e)

with ThreadPoolExecutor(max_workers=6) as ex:
    results = list(ex.map(download, url_to_local_path.items()))

success_count = sum(1 for _, ok, _ in results if ok)
print(f"Downloaded {success_count}/{len(url_to_local_path)} successfully.")

# Update cars data to use local relative paths
for car in cars:
    for ic in car.get('interiorColors', []):
        url = ic['image']
        if url in url_to_local_path:
            ic['image'] = url_to_local_path[url]

with open('scripts/generated-cars-data.json', 'w', encoding='utf-8') as f:
    json.dump(cars, f, indent=2, ensure_ascii=False)

print("Updated scripts/generated-cars-data.json with local paths.")
