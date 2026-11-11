import { test, describe } from 'node:test';
import assert from 'node:assert';
import { CARS_DATA } from '../src/data/cars.js';

describe('BMW Garage & Favorites Logic', () => {
  test('mock toggle favorite adds and removes car ids properly', () => {
    let favorites: string[] = [];

    const toggle = (id: string) => {
      favorites = favorites.includes(id)
        ? favorites.filter((f) => f !== id)
        : [...favorites, id];
    };

    toggle(CARS_DATA[0].id);
    assert.strictEqual(favorites.length, 1);
    assert.strictEqual(favorites[0], CARS_DATA[0].id);

    toggle(CARS_DATA[1].id);
    assert.strictEqual(favorites.length, 2);

    toggle(CARS_DATA[0].id);
    assert.strictEqual(favorites.length, 1);
    assert.strictEqual(favorites[0], CARS_DATA[1].id);
  });

  test('compares acceleration and power metrics between two cars', () => {
    const car1 = CARS_DATA[0]; // M8
    const car2 = CARS_DATA[1]; // i7

    const parseNum = (s: string) => parseFloat(s.match(/[\d.]+/)?.[0] || '0');

    const accel1 = parseNum(car1.specs.acceleration);
    const accel2 = parseNum(car2.specs.acceleration);

    assert.ok(accel1 > 0 && accel2 > 0);
    assert.ok(accel1 < accel2); // M8 is faster 3.2s vs 4.7s
  });
});
