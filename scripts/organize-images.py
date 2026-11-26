import os
import shutil
import json
import re

base_dir = os.path.join('public', 'images')
models_dir = os.path.join(base_dir, 'models')
common_dir = os.path.join(base_dir, 'common')

os.makedirs(models_dir, exist_ok=True)
os.makedirs(common_dir, exist_ok=True)

# 1. Map model folders and copy files
model_mappings = {
    'm8': {
        'folder': 'bmw-m8',
        'files': {
            'cars/m8.jpg': 'm8.jpg',
            'cars/m8-black.jpg': 'm8-black.jpg',
            'cars/m8-blue.jpg': 'm8-blue.jpg',
            'interiors/bmw-m8-gran-coupe-black.webp': 'interior-black.webp',
            'interiors/bmw-m8-gran-coupe-tartufo.webp': 'interior-tartufo.webp',
            'interiors/bmw-m8-gran-coupe-silverstone-black.webp': 'interior-silverstone.webp',
            'interiors/bmw-m8-gran-coupe-fiona.webp': 'interior-fiona.webp',
        }
    },
    'i7': {
        'folder': 'bmw-i7',
        'files': {
            'cars/i7.jpg': 'i7.jpg',
            'cars/i7-black.jpg': 'i7-black.jpg',
            'cars/i7-blue.jpg': 'i7-blue.jpg',
        }
    },
    'm4': {
        'folder': 'bmw-m4',
        'files': {
            'cars/m4.jpg': 'm4.jpg',
            'cars/m4-grey.jpg': 'm4-grey.jpg',
            'cars/m4-red.jpg': 'm4-red.jpg',
        }
    },
    'x7': {
        'folder': 'bmw-x7',
        'files': {
            'cars/x7.jpg': 'x7.jpg',
            'cars/x7-white.jpg': 'x7-white.jpg',
            'interiors/bmw-x7-m60i-black.webp': 'interior-black.webp',
            'interiors/bmw-x7-m60i-coffee.webp': 'interior-coffee.webp',
            'interiors/bmw-x7-m60i-cognac.webp': 'interior-cognac.webp',
            'interiors/bmw-x7-m60i-silverstone.webp': 'interior-silverstone.webp',
        }
    },
    'x5': {
        'folder': 'bmw-x5',
        'files': {
            'cars/x5.jpg': 'x5.jpg',
            'interiors/bmw-x5-suv-black.webp': 'interior-black.webp',
            'interiors/bmw-x5-suv-copper.webp': 'interior-copper.webp',
            'interiors/bmw-x5-suv-silverstone.webp': 'interior-silverstone.webp',
        }
    },
    '5-series': {
        'folder': 'bmw-5-series',
        'files': {
            'cars/530i.jpg': '530i.jpg',
            'interiors/bmw-i5-sedan-black.webp': 'interior-black.webp',
            'interiors/bmw-i5-sedan-burgundy.webp': 'interior-burgundy.webp',
            'interiors/bmw-i5-sedan-espresso.webp': 'interior-espresso.webp',
            'interiors/bmw-i5-sedan-smoke.webp': 'interior-smoke.webp',
        }
    },
    '7-series': {
        'folder': 'bmw-7-series',
        'files': {
            'cars/760i.jpg': '760i.jpg',
        }
    },
    'x1': {
        'folder': 'bmw-x1',
        'files': {
            'interiors/bmw-x1-suv-atlas.webp': 'interior-atlas.webp',
            'interiors/bmw-x1-suv-black.webp': 'interior-black.webp',
            'interiors/bmw-x1-suv-castanea.webp': 'interior-castanea.webp',
            'interiors/bmw-x1-suv-smoke.webp': 'interior-smoke.webp',
        }
    },
    'i4': {
        'folder': 'bmw-i4',
        'files': {
            'cars/i4.jpg': 'i4.jpg',
        }
    }
}

common_files = {
    'cars/hero.jpg': 'hero.jpg',
    'cars/interior.jpg': 'interior.jpg',
    'interiors/cockpit-curved-display.jpg': 'cockpit-curved-display.jpg',
    'interiors/luxury-comfort-suite.jpg': 'luxury-comfort-suite.jpg',
}

# Copy to common
for src_rel, dest_name in common_files.items():
    src_full = os.path.join(base_dir, src_rel)
    dest_full = os.path.join(common_dir, dest_name)
    if os.path.exists(src_full):
        shutil.copy2(src_full, dest_full)
        print(f"Copied {src_rel} -> common/{dest_name}")

# Copy to models
path_replacements = {}
for m_key, m_info in model_mappings.items():
    target_folder = os.path.join(models_dir, m_info['folder'])
    os.makedirs(target_folder, exist_ok=True)
    for src_rel, dest_name in m_info['files'].items():
        src_full = os.path.join(base_dir, src_rel)
        dest_full = os.path.join(target_folder, dest_name)
        if os.path.exists(src_full):
            shutil.copy2(src_full, dest_full)
            new_rel_path = f"/images/models/{m_info['folder']}/{dest_name}"
            old_rel_path = f"/images/{src_rel}"
            path_replacements[old_rel_path] = new_rel_path
            print(f"Copied {src_rel} -> models/{m_info['folder']}/{dest_name}")

# Common replacements
for src_rel, dest_name in common_files.items():
    old_rel_path = f"/images/{src_rel}"
    new_rel_path = f"/images/common/{dest_name}"
    path_replacements[old_rel_path] = new_rel_path

# Update scripts/generated-cars-data.json
json_path = os.path.join('scripts', 'generated-cars-data.json')
with open(json_path, 'r', encoding='utf-8') as f:
    cars = json.load(f)

for car in cars:
    # update gallery
    if 'gallery' in car:
        car['gallery'] = [path_replacements.get(img, img) for img in car['gallery']]
    # update interior colors
    for ic in car.get('interiorColors', []):
        if ic.get('image') in path_replacements:
            ic['image'] = path_replacements[ic['image']]

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(cars, f, indent=2, ensure_ascii=False)

print("Updated generated-cars-data.json with organized paths.")
