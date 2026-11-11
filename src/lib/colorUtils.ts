/**
 * BMW Luxury Color Utility Functions
 * Handles HEX parsing, RGBA conversions, luminance detection, blend modes,
 * and ambient underglow/reflection calculations for vehicle visuals.
 */

export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

/**
 * Converts a HEX color string (#RGB, #RRGGBB, #RRGGBBAA) to RGB components.
 */
export function hexToRgb(hex: string): RgbColor {
  if (!hex || typeof hex !== 'string') {
    return { r: 0, g: 102, b: 177 }; // fallback BMW Electric Blue
  }

  let clean = hex.replace('#', '').trim();

  // Support 8-digit hex (#RRGGBBAA)
  if (clean.length === 8) {
    clean = clean.substring(0, 6);
  }

  // Support 3-digit hex (#FFF)
  if (clean.length === 3) {
    clean = clean
      .split('')
      .map((c) => c + c)
      .join('');
  }

  const num = parseInt(clean, 16);
  if (isNaN(num) || clean.length !== 6) {
    return { r: 0, g: 102, b: 177 };
  }

  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

/**
 * Converts a HEX color string to a CSS rgba(...) string with specified alpha.
 */
export function hexToRgba(hex: string, alpha: number): string {
  const { r, g, b } = hexToRgb(hex);
  const clampedAlpha = Math.max(0, Math.min(1, Number.isFinite(alpha) ? alpha : 1));
  return `rgba(${r}, ${g}, ${b}, ${clampedAlpha})`;
}

/**
 * Calculates the relative perceptual luminance of a color (0.0 to 1.0).
 */
export function getColorLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

/**
 * Returns the optimal CSS mix-blend-mode for applying vehicle paint tint
 * over base automotive photographs.
 */
export function getColorBlendMode(
  hex: string
): 'color' | 'multiply' | 'soft-light' {
  const lum = getColorLuminance(hex);
  if (lum < 0.14) {
    // Very dark / black colors look best with multiply
    return 'multiply';
  }
  if (lum > 0.85) {
    // Very light / white colors look best with soft-light
    return 'soft-light';
  }
  // Rich colors (greens, blues, reds, yellows)
  return 'color';
}

/**
 * Calculates vehicle tint overlay opacity according to luminance and chroma.
 */
export function getColorTintOpacity(hex: string): number {
  const lum = getColorLuminance(hex);
  if (lum < 0.14) return 0.58;
  if (lum > 0.85) return 0.32;
  return 0.48;
}

/**
 * Generates the radial gradient string for ambient underglow & ground reflection.
 */
export function getAmbientUnderglowBackground(
  hex: string,
  peakAlpha: number = 0.75
): string {
  const coreAlpha = Math.min(1, Math.max(0, peakAlpha));
  const midAlpha = Math.max(0, coreAlpha * 0.35);
  return `radial-gradient(ellipse at 50% 100%, ${hexToRgba(
    hex,
    coreAlpha
  )} 0%, ${hexToRgba(hex, midAlpha)} 50%, transparent 75%)`;
}

/**
 * Categorizes official BMW Individual paint finish types by color name.
 */
export function getPaintFinishType(name: string): string {
  if (!name) return 'BMW Individual';
  const lower = name.toLowerCase();
  if (lower.includes('frozen') || lower.includes('matte')) {
    return 'BMW M Frozen (Matte)';
  }
  if (lower.includes('two-tone')) {
    return 'BMW Individual Two-Tone';
  }
  if (lower.includes('metallic')) {
    return 'BMW Individual Metallic';
  }
  return 'BMW High-Gloss Uni';
}
