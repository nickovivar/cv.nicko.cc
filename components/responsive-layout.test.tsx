import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { Hero } from '@/components/hero';
import { Experience } from '@/components/experience';
import { Skills } from '@/components/skills';
import { Education } from '@/components/education';

describe('Responsive layout — no horizontal scroll (R9)', () => {
  it('hero section uses container with responsive padding (px-4)', () => {
    // R9: Mobile-to-desktop readability — padding adapts to viewport
    const markup = renderToStaticMarkup(<Hero />);

    expect(markup).toContain('px-4');
    expect(markup).toContain('container');
  });

  it('experience section uses container with responsive padding', () => {
    const markup = renderToStaticMarkup(<Experience />);

    expect(markup).toContain('container');
    expect(markup).toContain('px-4');
  });

  it('skills section uses container with responsive padding', () => {
    const markup = renderToStaticMarkup(<Skills />);

    expect(markup).toContain('container');
    expect(markup).toContain('px-4');
  });

  it('no component source files contain fixed pixel widths that could cause horizontal overflow', () => {
    // R9: No horizontal scroll — components must not use fixed widths > viewport
    const componentFiles = [
      'components/hero.tsx',
      'components/experience.tsx',
      'components/skills.tsx',
      'components/education.tsx',
      'components/header.tsx',
      'components/header-shell.tsx',
    ];

    for (const file of componentFiles) {
      const source = readFileSync(resolve(process.cwd(), file), 'utf-8');
      // No fixed widths larger than typical mobile viewport (320px)
      // Allow max-w-* (max-width constraints are safe) but flag w-[Npx] where N > 320
      const fixedWidthMatch = source.match(/w-\[(\d+)px\]/g);
      if (fixedWidthMatch) {
        for (const match of fixedWidthMatch) {
          const width = parseInt(match.match(/\d+/)?.[0] ?? '0', 10);
          expect(width, `${file} has fixed width ${match} that could overflow on mobile`).toBeLessThanOrEqual(320);
        }
      }
    }
  });

  it('globals.css sets box-sizing border-box to prevent overflow from padding', () => {
    // R9: box-sizing ensures padding doesn't add to element width
    const cssSource = readFileSync(resolve(process.cwd(), 'app', 'globals.css'), 'utf-8');

    // Tailwind's preflight sets this, but verify it's not overridden
    expect(cssSource).not.toContain('box-sizing: content-box');
  });
});

// ─── R6: Section Visual Hierarchy — Spacing & Depth ─────────────────────────

describe('R6: Section visual hierarchy — spacing and depth', () => {
  const sectionComponents = [
    { path: 'components/hero.tsx', label: 'hero.tsx' },
    { path: 'components/experience.tsx', label: 'experience.tsx' },
    { path: 'components/skills.tsx', label: 'skills.tsx' },
    { path: 'components/education.tsx', label: 'education.tsx' },
  ];

  it('all sections use ≥4rem vertical spacing', () => {
    // R6: ≥4rem vertical spacing between sections
    // py-20 = 5rem = 80px, which exceeds the 4rem minimum
    // Hero uses pt-20 (top only) since it's a full-viewport flex section
    for (const { path, label } of sectionComponents) {
      const source = readFileSync(resolve(process.cwd(), path), 'utf-8');
      // py-20/pt-20/pb-20 = 5rem vertical spacing (exceeds 4rem minimum)
      // Match vertical padding classes: py-, pt-, pb- with values ≥ 20 (5rem)
      const hasVerticalSpacing = /\b(py|pt|pb)-(20|24|28|32)\b/.test(source);
      expect(
        hasVerticalSpacing,
        `${label} must have ≥4rem (py-20/pt-20 = 5rem) vertical spacing for R6 compliance`
      ).toBe(true);
    }
  });

  it('sections with alternating backgrounds use bg-muted/50 for depth', () => {
    // R6: Content surfaces on #111111 create depth from #0A0A0A background
    // Experience and Education use bg-muted/50 to create visual rhythm
    const expSource = readFileSync(resolve(process.cwd(), 'components/experience.tsx'), 'utf-8');
    const eduSource = readFileSync(resolve(process.cwd(), 'components/education.tsx'), 'utf-8');

    expect(expSource, 'experience.tsx must use bg-muted/50 for surface depth').toContain('bg-muted/50');
    expect(eduSource, 'education.tsx must use bg-muted/50 for surface depth').toContain('bg-muted/50');
  });

  it('hero and skills sections use transparent/default background for contrast rhythm', () => {
    // R6: Alternating pattern — hero and skills are on pure background,
    // experience and education are on muted surfaces
    const heroSource = readFileSync(resolve(process.cwd(), 'components/hero.tsx'), 'utf-8');
    const skillsSource = readFileSync(resolve(process.cwd(), 'components/skills.tsx'), 'utf-8');

    // They should NOT have bg-muted/50 (that's the alternating pair)
    expect(heroSource).not.toContain('bg-muted/50');
    expect(skillsSource).not.toContain('bg-muted/50');
  });

  it('experience section renders with bg-muted/50 in markup', () => {
    // Runtime proof: the rendered markup contains the surface class
    const markup = renderToStaticMarkup(<Experience />);
    expect(markup).toContain('bg-muted/50');
  });

  it('education section renders with bg-muted/50 in markup', () => {
    // Runtime proof: the rendered markup contains the surface class
    const markup = renderToStaticMarkup(<Education />);
    expect(markup).toContain('bg-muted/50');
  });

  it('section headings use text-primary (#00B3B3) for accent treatment', () => {
    // R6: Section headings SHALL use Space Grotesk with #00B3B3
    for (const { path, label } of sectionComponents) {
      const source = readFileSync(resolve(process.cwd(), path), 'utf-8');
      expect(
        source,
        `${label} section heading must use text-primary for R6 accent treatment`
      ).toMatch(/text-primary/);
    }
  });
});
