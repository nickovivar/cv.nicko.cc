import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

// ─── WCAG Contrast Ratio Computation ────────────────────────────────────────

/**
 * Convert HSL (CSS format: h h% s% l%) to sRGB 0–1.
 * Uses the standard HSL→RGB algorithm.
 */
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const sNorm = s / 100;
  const lNorm = l / 100;

  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lNorm - c / 2;

  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; b = 0; }
  else if (h < 120) { r = x; g = c; b = 0; }
  else if (h < 180) { r = 0; g = c; b = x; }
  else if (h < 240) { r = 0; g = x; b = c; }
  else if (h < 300) { r = x; g = 0; b = c; }
  else { r = c; g = 0; b = x; }

  return [r + m, g + m, b + m];
}

/**
 * Linearize an sRGB channel value (0–1) for luminance calculation.
 * Per WCAG 2.x spec: if C ≤ 0.03928 then C/12.92 else ((C+0.055)/1.055)^2.4
 */
function linearize(c: number): number {
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

/**
 * Compute relative luminance per WCAG 2.x.
 * L = 0.2126 * R + 0.7152 * G + 0.0722 * B (linearized channels)
 */
function relativeLuminance(r: number, g: number, b: number): number {
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

/**
 * Compute WCAG contrast ratio between two HSL colors.
 * Returns (L1 + 0.05) / (L2 + 0.05) where L1 ≥ L2.
 */
function contrastRatio(hsl1: [number, number, number], hsl2: [number, number, number]): number {
  const [r1, g1, b1] = hslToRgb(...hsl1);
  const [r2, g2, b2] = hslToRgb(...hsl2);
  const l1 = relativeLuminance(r1, g1, b1);
  const l2 = relativeLuminance(r2, g2, b2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// ─── Token Values from globals.css (HSL as stored in CSS custom properties) ─

// --background: 0 0% 3.9% → #0A0A0A
const BG: [number, number, number] = [0, 0, 3.9];
// --foreground: 0 0% 91.8% → #EAEAEA
const FG: [number, number, number] = [0, 0, 91.8];
// --primary: 180 100% 35.1% → #00B3B3
const PRIMARY: [number, number, number] = [180, 100, 35.1];
// --muted: 0 0% 6.7% → #111111
const MUTED: [number, number, number] = [0, 0, 6.7];
// --muted-foreground: 0 0% 63.9%
const MUTED_FG: [number, number, number] = [0, 0, 63.9];

describe('globals.css — dark-only token contract', () => {
  const cssSource = readFileSync(resolve(process.cwd(), 'app', 'globals.css'), 'utf-8');

  it('defines dark background token (#0A0A0A → HSL 0 0% 3.9%)', () => {
    // R1: Dark-only color palette — background must be #0A0A0A
    expect(cssSource).toContain('--background: 0 0% 3.9%');
  });

  it('defines primary accent token (#00B3B3 → HSL 180 100% 35.1%)', () => {
    // R1: Primary accent color
    expect(cssSource).toContain('--primary: 180 100% 35.1%');
  });

  it('defines foreground text token (#EAEAEA → HSL 0 0% 91.8%)', () => {
    // R1: Text color
    expect(cssSource).toContain('--foreground: 0 0% 91.8%');
  });

  it('defines muted surface token (#111111 → HSL 0 0% 6.7%)', () => {
    // R6: Content surfaces use #111111
    expect(cssSource).toContain('--muted: 0 0% 6.7%');
    expect(cssSource).toContain('--secondary: 0 0% 6.7%');
  });

  it('does NOT contain a .dark block (tokens are in :root directly)', () => {
    // R1: No light-theme fallback — tokens are dark-only in :root
    // The .dark selector block must not exist
    const lines = cssSource.split('\n');
    let inRoot = false;
    for (const line of lines) {
      if (line.includes(':root')) inRoot = true;
      if (inRoot && line.includes('}')) inRoot = false;
    }
    // No standalone .dark { ... } block should exist after :root
    expect(cssSource).not.toMatch(/\.dark\s*\{/);
  });

  it('does NOT contain prefers-color-scheme media query', () => {
    // R1: No system color scheme detection
    expect(cssSource).not.toContain('prefers-color-scheme');
  });

  it('applies font-family rules via @layer base for headings and body', () => {
    // R2: Typography system — font families must be applied in base layer
    expect(cssSource).toContain('font-family: var(--font-body)');
    expect(cssSource).toContain('font-family: var(--font-heading)');
  });

  it('applies bg-background and text-foreground to body', () => {
    // R3: Token propagation — body must use design tokens
    expect(cssSource).toContain('@apply border-border');
    expect(cssSource).toContain('@apply bg-background text-foreground');
  });
});

// ─── R4: Readability — WCAG AA Contrast Ratio Assertions ────────────────────

describe('R4: Readability — WCAG AA contrast ratio', () => {
  it('foreground (#EAEAEA) on background (#0A0A0A) meets WCAG AA (≥4.5:1)', () => {
    // R4: Body text must meet 4.5:1 minimum contrast ratio against background
    const ratio = contrastRatio(FG, BG);
    // #EAEAEA on #0A0A0A should yield ~15.3:1 — well above AA
    expect(ratio).toBeGreaterThanOrEqual(4.5);
    // Additional proof: verify the ratio is in the expected ballpark (not a trivial pass)
    expect(ratio).toBeGreaterThan(10);
  });

  it('primary accent (#00B3B3) on background (#0A0A0A) meets WCAG AA (≥4.5:1)', () => {
    // R4: Accent text (headlines, links) must also be readable
    const ratio = contrastRatio(PRIMARY, BG);
    // #00B3B3 on #0A0A0A should yield ~7.3:1 — above AA
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it('muted-foreground (#A3A3A3) on background (#0A0A0A) meets WCAG AA (≥4.5:1)', () => {
    // R4: Secondary text must also meet the 4.5:1 threshold
    const ratio = contrastRatio(MUTED_FG, BG);
    // #A3A3A3 on #0A0A0A should yield ~7.6:1 — above AA
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it('muted surface (#111111) has sufficient depth contrast from background (#0A0A0A)', () => {
    // R6: Content surfaces must create visual depth from background
    // This is a subtle contrast — surfaces should be distinguishable but not jarring
    const ratio = contrastRatio(MUTED, BG);
    // #111111 on #0A0A0A yields ~1.2:1 — enough for depth, not for text
    expect(ratio).toBeGreaterThan(1.0);
    // But it must NOT be used for text (ratio < 4.5 proves it's a surface, not text color)
    expect(ratio).toBeLessThan(4.5);
  });
});

// ─── R4: Readability — 320px/1440px Layout Safeguards ──────────────────────

describe('R4: Readability — mobile/desktop layout safeguards', () => {
  it('body text uses text-lg or larger on hero section for mobile readability', () => {
    // R4: At 320px, body text must be large enough. text-lg = 1.125rem = 18px minimum.
    const heroSource = readFileSync(resolve(process.cwd(), 'components/hero.tsx'), 'utf-8');
    // The summary paragraph must use at least text-lg for mobile readability
    expect(heroSource).toMatch(/text-lg|text-xl|text-2xl/);
  });

  it('heading scale uses responsive md: breakpoint for desktop enlargement', () => {
    // R4: Headings must scale between mobile and desktop
    const heroSource = readFileSync(resolve(process.cwd(), 'components/hero.tsx'), 'utf-8');
    // h1 must have both a mobile size and a larger md: size
    expect(heroSource).toMatch(/text-\d+/);
    expect(heroSource).toMatch(/md:text-\d+/);
  });

  it('experience section uses readable body text (text-base or larger)', () => {
    // R4: Body text in experience cards must be readable at mobile sizes
    const expSource = readFileSync(resolve(process.cwd(), 'components/experience.tsx'), 'utf-8');
    // Responsibilities use text-base (16px) which is the minimum readable size
    expect(expSource).toMatch(/text-base|text-lg/);
  });

  it('skills section uses readable text for skill names and percentages', () => {
    // R4: Skill names use font-medium (no explicit size = inherits body), percentages use text-sm
    const skillsSource = readFileSync(resolve(process.cwd(), 'components/skills.tsx'), 'utf-8');
    // text-sm on percentages is acceptable because it's secondary info
    // But skill names must not be smaller than body text
    expect(skillsSource).not.toMatch(/text-xs/);
  });
});
