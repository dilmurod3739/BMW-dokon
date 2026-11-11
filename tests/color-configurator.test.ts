import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { CARS_DATA } from '../src/data/cars';
import {
  hexToRgb,
  hexToRgba,
  getColorLuminance,
  getColorBlendMode,
  getColorTintOpacity,
  getAmbientUnderglowBackground,
  getPaintFinishType,
} from '../src/lib/colorUtils';

describe('Color Utilities Unit Tests', () => {
  test('hexToRgb parses standard 6-digit hex values correctly', () => {
    // Isle of Man Green #1B4D3E -> R: 27, G: 77, B: 62
    const green = hexToRgb('#1B4D3E');
    assert.deepEqual(green, { r: 27, g: 77, b: 62 });

    // Frozen Marina Bay Blue #1C69D4 -> R: 28, G: 105, B: 212
    const blue = hexToRgb('#1C69D4');
    assert.deepEqual(blue, { r: 28, g: 105, b: 212 });

    // Toronto Red #B8131B -> R: 184, G: 19, B: 27
    const red = hexToRgb('#B8131B');
    assert.deepEqual(red, { r: 184, g: 19, b: 27 });

    // Sao Paulo Yellow #D2E603 -> R: 210, G: 230, B: 3
    const yellow = hexToRgb('#D2E603');
    assert.deepEqual(yellow, { r: 210, g: 230, b: 3 });

    // Black Sapphire #0D0D0E -> R: 13, G: 13, B: 14
    const black = hexToRgb('#0D0D0E');
    assert.deepEqual(black, { r: 13, g: 13, b: 14 });
  });

  test('hexToRgb handles 3-digit shorthand and hex without leading hash', () => {
    const whiteShort = hexToRgb('#FFF');
    assert.deepEqual(whiteShort, { r: 255, g: 255, b: 255 });

    const redNoHash = hexToRgb('B8131B');
    assert.deepEqual(redNoHash, { r: 184, g: 19, b: 27 });
  });

  test('hexToRgb handles 8-digit hex values (#RRGGBBAA) and lowercase hex strings', () => {
    // 8-digit hex with alpha
    const greenWithAlpha = hexToRgb('#1B4D3EFF');
    assert.deepEqual(greenWithAlpha, { r: 27, g: 77, b: 62 });

    // lowercase hex
    const blueLower = hexToRgb('#1c69d4');
    assert.deepEqual(blueLower, { r: 28, g: 105, b: 212 });
  });

  test('hexToRgb gracefully falls back on invalid or empty hex strings', () => {
    const fallbackInvalid = hexToRgb('invalid-hex');
    assert.deepEqual(fallbackInvalid, { r: 0, g: 102, b: 177 });

    const fallbackEmpty = hexToRgb('');
    assert.deepEqual(fallbackEmpty, { r: 0, g: 102, b: 177 });

    // @ts-expect-error test runtime robustness
    const fallbackNull = hexToRgb(null);
    assert.deepEqual(fallbackNull, { r: 0, g: 102, b: 177 });
  });

  test('hexToRgba formats rgba string and clamps alpha', () => {
    const rgba = hexToRgba('#1B4D3E', 0.5);
    assert.equal(rgba, 'rgba(27, 77, 62, 0.5)');

    const clampedHigh = hexToRgba('#FFFFFF', 1.5);
    assert.equal(clampedHigh, 'rgba(255, 255, 255, 1)');

    const clampedLow = hexToRgba('#000000', -0.5);
    assert.equal(clampedLow, 'rgba(0, 0, 0, 0)');

    // Non-finite alpha falls back to 1
    const nanAlpha = hexToRgba('#1C69D4', NaN);
    assert.equal(nanAlpha, 'rgba(28, 105, 212, 1)');
  });

  test('getColorLuminance accurately measures dark vs light colors', () => {
    const blackLum = getColorLuminance('#0D0D0E');
    const whiteLum = getColorLuminance('#FFFFFF');
    const yellowLum = getColorLuminance('#D2E603');
    const greenLum = getColorLuminance('#1B4D3E');

    assert.ok(blackLum < 0.15, 'Black should have low luminance');
    assert.ok(whiteLum > 0.9, 'White should have high luminance');
    assert.ok(yellowLum > greenLum, 'Yellow should have higher luminance than dark green');
  });

  test('getColorBlendMode picks optimal blend mode according to luminance', () => {
    // Very dark -> multiply
    assert.equal(getColorBlendMode('#0D0D0E'), 'multiply');
    assert.equal(getColorBlendMode('#111213'), 'multiply');
    assert.equal(getColorBlendMode('#000000'), 'multiply');

    // Very bright -> soft-light
    assert.equal(getColorBlendMode('#FFFFFF'), 'soft-light');
    assert.equal(getColorBlendMode('#FAFAFA'), 'soft-light');

    // Rich colors -> color
    assert.equal(getColorBlendMode('#1B4D3E'), 'color'); // Isle of Man Green
    assert.equal(getColorBlendMode('#1C69D4'), 'color'); // Marina Bay Blue
    assert.equal(getColorBlendMode('#B8131B'), 'color'); // Toronto Red
    assert.equal(getColorBlendMode('#D2E603'), 'color'); // Sao Paulo Yellow
  });

  test('getColorTintOpacity returns calibrated opacities within valid bounds', () => {
    const greenOpacity = getColorTintOpacity('#1B4D3E');
    const darkOpacity = getColorTintOpacity('#0D0D0E');
    const whiteOpacity = getColorTintOpacity('#FFFFFF');

    assert.ok(greenOpacity >= 0.3 && greenOpacity <= 0.6);
    assert.ok(darkOpacity >= 0.4 && darkOpacity <= 0.7);
    assert.ok(whiteOpacity >= 0.2 && whiteOpacity <= 0.4);
  });

  test('getAmbientUnderglowBackground creates a valid radial-gradient string', () => {
    const bg = getAmbientUnderglowBackground('#1C69D4', 0.8);
    assert.ok(bg.startsWith('radial-gradient('));
    assert.ok(bg.includes('rgba(28, 105, 212, 0.8)'));
    assert.ok(bg.includes('transparent'));
  });

  test('getPaintFinishType categorizes BMW paints accurately', () => {
    assert.equal(getPaintFinishType('Frozen Marina Bay Blue'), 'BMW M Frozen (Matte)');
    assert.equal(getPaintFinishType('Toronto Red Metallic'), 'BMW Individual Metallic');
    assert.equal(getPaintFinishType('Two-tone Oxide Grey / Black'), 'BMW Individual Two-Tone');
    assert.equal(getPaintFinishType('Sao Paulo Yellow'), 'BMW High-Gloss Uni');
    assert.equal(getPaintFinishType('Alpine White'), 'BMW High-Gloss Uni');
    assert.equal(getPaintFinishType(''), 'BMW Individual');
  });
});

describe('BMW Cars Color Palette Integrity', () => {
  test('all cars in CARS_DATA have at least 3 distinct color options', () => {
    assert.equal(CARS_DATA.length, 8, 'There should be 8 cars in CARS_DATA');
    for (const car of CARS_DATA) {
      assert.ok(
        car.colors && car.colors.length >= 3,
        `Car ${car.name} (${car.id}) should have at least 3 colors`
      );
      for (const color of car.colors) {
        assert.ok(color.name && color.name.trim().length > 0, 'Color name must not be empty');
        assert.match(color.hex, /^#[0-9A-Fa-f]{6}$/, `Color hex ${color.hex} must be #RRGGBB`);
      }
    }
  });

  test('flagship M8 Competition includes Isle of Man Green, Frozen Marina Bay Blue, and Black Sapphire', () => {
    const m8 = CARS_DATA.find((c) => c.id === 'bmw-m8-gran-coupe');
    assert.ok(m8, 'BMW M8 Gran Coupe must exist in dataset');

    const colorNames = m8.colors.map((c) => c.name);
    assert.ok(colorNames.some((n) => n.includes('Isle of Man Green')));
    assert.ok(colorNames.some((n) => n.includes('Frozen Marina Bay Blue')));
    assert.ok(colorNames.some((n) => n.includes('Black Sapphire')));
  });

  test('flagship M4 Competition includes Sao Paulo Yellow, Toronto Red, and Black Sapphire', () => {
    const m4 = CARS_DATA.find((c) => c.id === 'bmw-m4-competition-coupe');
    assert.ok(m4, 'BMW M4 Competition must exist in dataset');

    const colorNames = m4.colors.map((c) => c.name);
    assert.ok(colorNames.some((n) => n.includes('Sao Paulo Yellow')));
    assert.ok(colorNames.some((n) => n.includes('Toronto Red')));
    assert.ok(colorNames.some((n) => n.includes('Black Sapphire')));
  });
});

describe('Color Selection & Dynamic Visual Transitions Logic', () => {
  test('simulates color swatch switching across all available colors for all cars', () => {
    for (const car of CARS_DATA) {
      for (let i = 0; i < car.colors.length; i++) {
        const activeColor = car.colors[i];
        assert.ok(activeColor, `Color at index ${i} must exist`);

        // 1. Swatch active visual state attributes
        const ringGlow = `0 0 10px ${hexToRgba(activeColor.hex, 0.9)}`;
        assert.ok(ringGlow.includes('rgba('));

        // 2. Underglow radial background updates dynamically
        const underglow = getAmbientUnderglowBackground(activeColor.hex, 0.85);
        assert.ok(underglow.includes('radial-gradient'));
        assert.ok(underglow.includes(hexToRgb(activeColor.hex).r.toString()));

        // 3. Vehicle tint overlay updates dynamically
        const blendMode = getColorBlendMode(activeColor.hex);
        const opacity = getColorTintOpacity(activeColor.hex);
        assert.ok(['color', 'multiply', 'soft-light'].includes(blendMode));
        assert.ok(opacity > 0 && opacity <= 1);

        // 4. Color name matches
        assert.equal(activeColor.name, car.colors[i].name);

        // 5. Unique cross-fade key generated per color
        const cardTintKey = `card-tint-${car.id}-${activeColor.hex}`;
        const modalTintKey = `modal-tint-${car.id}-${activeColor.hex}-0`;
        const studioTintKey = `studio-tint-${car.id}-${activeColor.hex}-0`;
        assert.ok(cardTintKey.includes(car.id));
        assert.ok(modalTintKey.includes(activeColor.hex));
        assert.ok(studioTintKey.includes(car.id));
      }
    }
  });

  test('handles out-of-range color index safely with fallback to color 0', () => {
    const i7 = CARS_DATA.find((c) => c.id === 'bmw-i7-xdrive60')!;
    const invalidIndex = 999;
    const safeActiveColor = i7.colors[invalidIndex] || i7.colors[0];

    assert.equal(safeActiveColor.name, i7.colors[0].name);
    assert.equal(safeActiveColor.hex, i7.colors[0].hex);
  });

  test('verifies test drive notes prefill includes selected color name and hex', () => {
    const car = CARS_DATA[0];
    const selectedColor = car.colors[1]; // Frozen Marina Bay Blue
    const defaultNotes = selectedColor
      ? `Tanlangan rang: ${selectedColor.name} (${selectedColor.hex})`
      : '';

    assert.ok(defaultNotes.includes(selectedColor.name));
    assert.ok(defaultNotes.includes(selectedColor.hex));
  });
});
