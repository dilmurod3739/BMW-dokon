import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { bookingFormSchema } from '../src/lib/validations';
import { CARS_DATA, DEALERSHIPS } from '../src/data/cars';
import { formatPrice, cn } from '../src/lib/utils';

describe('Validation Schema Tests', () => {
  test('valid booking form data passes validation', () => {
    const validData = {
      fullName: 'Alisher Navoiy',
      phone: '+998 90 123 45 67',
      email: 'alisher@bmw.uz',
      carId: 'bmw-m8-gran-coupe',
      preferredDate: '2026-11-20',
      dealership: 'tashkent-center',
      notes: 'M sport test drive',
    };

    const result = bookingFormSchema.safeParse(validData);
    assert.equal(result.success, true);
  });

  test('validates phone with parentheses and dashes (e.g. +998 (90) 123-45-67)', () => {
    const validData = {
      fullName: 'Bobur Mirzo',
      phone: '+998 (90) 123-45-67',
      email: 'bobur@bmw.uz',
      carId: 'bmw-i7-xdrive60',
      preferredDate: '2026-11-22',
      dealership: 'samarkand',
    };

    const result = bookingFormSchema.safeParse(validData);
    assert.equal(result.success, true);
  });

  test('fails if fullName is too short', () => {
    const invalidData = {
      fullName: 'A',
      phone: '+998901234567',
      email: 'test@example.com',
      carId: 'bmw-m8-gran-coupe',
      preferredDate: '2026-11-20',
      dealership: 'tashkent-center',
    };

    const result = bookingFormSchema.safeParse(invalidData);
    assert.equal(result.success, false);
    if (!result.success) {
      assert.ok(result.error.issues.some((i) => i.path.includes('fullName')));
    }
  });

  test('fails if phone format is invalid', () => {
    const invalidData = {
      fullName: 'Valid Name',
      phone: '123', // too short
      email: 'test@example.com',
      carId: 'bmw-m8-gran-coupe',
      preferredDate: '2026-11-20',
      dealership: 'tashkent-center',
    };

    const result = bookingFormSchema.safeParse(invalidData);
    assert.equal(result.success, false);
    if (!result.success) {
      assert.ok(result.error.issues.some((i) => i.path.includes('phone')));
    }
  });

  test('fails if phone contains mostly non-digit characters', () => {
    const invalidData = {
      fullName: 'Valid Name',
      phone: '+ ( - - )   ',
      email: 'test@example.com',
      carId: 'bmw-m8-gran-coupe',
      preferredDate: '2026-11-20',
      dealership: 'tashkent-center',
    };

    const result = bookingFormSchema.safeParse(invalidData);
    assert.equal(result.success, false);
  });

  test('fails if email format is invalid', () => {
    const invalidData = {
      fullName: 'Valid Name',
      phone: '+998901234567',
      email: 'not-an-email',
      carId: 'bmw-m8-gran-coupe',
      preferredDate: '2026-11-20',
      dealership: 'tashkent-center',
    };

    const result = bookingFormSchema.safeParse(invalidData);
    assert.equal(result.success, false);
    if (!result.success) {
      assert.ok(result.error.issues.some((i) => i.path.includes('email')));
    }
  });

  test('fails if carId or dealership is empty', () => {
    const invalidData = {
      fullName: 'Valid Name',
      phone: '+998901234567',
      email: 'valid@example.com',
      carId: '',
      preferredDate: '2026-11-20',
      dealership: '',
    };

    const result = bookingFormSchema.safeParse(invalidData);
    assert.equal(result.success, false);
  });
});

describe('Utils and Formatters', () => {
  test('formatPrice formats USD currency correctly', () => {
    const formatted = formatPrice(138800);
    assert.ok(formatted.includes('138,800') || formatted.includes('$'));
  });

  test('cn merges classes properly', () => {
    const result = cn('base-class', false && 'hidden', 'text-white', 'text-white');
    assert.ok(result.includes('base-class'));
    assert.ok(result.includes('text-white'));
    assert.ok(!result.includes('hidden'));
  });
});

describe('Search and Filter Logic', () => {
  function normalizeSearchText(text: string): string {
    return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  test('search matches Coupé without accent (e.g. coupe)', () => {
    const q = normalizeSearchText('coupe');
    const matched = CARS_DATA.filter((car) => {
      const nameNorm = normalizeSearchText(car.name);
      return nameNorm.includes(q);
    });

    assert.ok(matched.length >= 2, 'Should find M8 and M4 Coupes');
    assert.ok(matched.some((c) => c.id === 'bmw-m8-gran-coupe'));
    assert.ok(matched.some((c) => c.id === 'bmw-m4-competition-coupe'));
  });

  test('search matches engine types like V8', () => {
    const q = normalizeSearchText('v8');
    const matched = CARS_DATA.filter((car) => {
      const engineNorm = normalizeSearchText(car.specs.engine);
      return engineNorm.includes(q);
    });

    assert.ok(matched.length >= 3, 'Should find V8 powered BMW models');
    assert.ok(matched.some((c) => c.id === 'bmw-m8-gran-coupe'));
    assert.ok(matched.some((c) => c.id === 'bmw-x7-m60i'));
  });

  test('categories properly isolate models', () => {
    const mPowerCars = CARS_DATA.filter((c) => c.category === 'm-power');
    const electricCars = CARS_DATA.filter((c) => c.category === 'bmw-i');
    const savCars = CARS_DATA.filter((c) => c.category === 'x-series');
    const sedans = CARS_DATA.filter((c) => c.category === 'sedans');

    assert.ok(mPowerCars.length >= 2);
    assert.ok(electricCars.length >= 2);
    assert.ok(savCars.length >= 2);
    assert.ok(sedans.length >= 2);
  });

  test('sorting by price ascending and descending works', () => {
    const asc = [...CARS_DATA].sort((a, b) => a.price - b.price);
    const desc = [...CARS_DATA].sort((a, b) => b.price - a.price);

    assert.ok(asc[0].price <= asc[asc.length - 1].price);
    assert.ok(desc[0].price >= desc[desc.length - 1].price);
  });

  test('sorting by power descending puts highest horsepower first', () => {
    const sorted = [...CARS_DATA].sort((a, b) => {
      const pA = parseInt(a.specs.power, 10) || 0;
      const pB = parseInt(b.specs.power, 10) || 0;
      return pB - pA;
    });

    assert.ok(parseInt(sorted[0].specs.power, 10) >= 600);
  });
});

describe('BMW Cars Data Integrity', () => {
  test('contains at least 6 flagship BMW models as per PROJECT.md', () => {
    assert.ok(CARS_DATA.length >= 6);
  });

  test('every car has valid specs, colors, and prices', () => {
    for (const car of CARS_DATA) {
      assert.ok(car.id.length > 0);
      assert.ok(car.name.length > 0);
      assert.ok(car.price > 10000);
      assert.ok(car.colors.length >= 2);
      assert.ok(car.gallery.length >= 1);
      assert.ok(car.specs.acceleration.length > 0);
      assert.ok(car.specs.power.length > 0);
      assert.ok(car.specs.topSpeed.length > 0);
      assert.ok(car.specs.drivetrain.length > 0);
      assert.ok(car.specs.engine.length > 0);
    }
  });

  test('dealerships are properly configured with addresses and phones', () => {
    assert.ok(DEALERSHIPS.length >= 3);
    for (const dealer of DEALERSHIPS) {
      assert.ok(dealer.name.length > 0);
      assert.ok(dealer.city.length > 0);
      assert.ok(dealer.address.length > 0);
      assert.ok(dealer.phone.length > 0);
    }
  });
});
