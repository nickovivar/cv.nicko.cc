import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Extract all className string values from a TSX source file.
 * Returns an array of the raw className attribute values (without quotes).
 */
function extractClassNames(source: string): string[] {
  const matches = source.match(/className="([^"]*)"/g) ?? [];
  return matches.map((m) => {
    // Strip className=" and trailing "
    return m.replace(/^className="/, '').replace(/"$/, '');
  });
}

/**
 * Check if any className string contains a hardcoded hex color.
 * Returns an array of offending className strings.
 */
function findHardcodedHex(classNames: string[]): string[] {
  const hexRegex = /#[0-9a-fA-F]{3,8}/;
  return classNames.filter((cls) => hexRegex.test(cls));
}

describe('Visual identity consistency — no ad-hoc colors (R8)', () => {
  const componentFiles = [
    { path: 'components/hero.tsx', label: 'hero.tsx' },
    { path: 'components/experience.tsx', label: 'experience.tsx' },
    { path: 'components/skills.tsx', label: 'skills.tsx' },
    { path: 'components/education.tsx', label: 'education.tsx' },
    { path: 'components/header.tsx', label: 'header.tsx' },
    { path: 'components/header-shell.tsx', label: 'header-shell.tsx' },
  ];

  it('hero.tsx uses only tokenized colors (no hardcoded hex)', () => {
    const source = readFileSync(resolve(process.cwd(), 'components/hero.tsx'), 'utf-8');
    const classNames = extractClassNames(source);

    // CRITICAL: Prove the file actually has className attributes — otherwise the test is a ghost loop
    expect(classNames.length, 'hero.tsx must have className attributes to verify').toBeGreaterThan(0);

    const offending = findHardcodedHex(classNames);
    expect(offending, `hero.tsx has hardcoded hex in classNames: ${offending.join(', ')}`).toHaveLength(0);
  });

  it('experience.tsx uses only tokenized colors (no hardcoded hex)', () => {
    const source = readFileSync(resolve(process.cwd(), 'components/experience.tsx'), 'utf-8');
    const classNames = extractClassNames(source);

    expect(classNames.length, 'experience.tsx must have className attributes to verify').toBeGreaterThan(0);

    const offending = findHardcodedHex(classNames);
    expect(offending, `experience.tsx has hardcoded hex in classNames: ${offending.join(', ')}`).toHaveLength(0);
  });

  it('skills.tsx uses only tokenized colors (no hardcoded hex)', () => {
    const source = readFileSync(resolve(process.cwd(), 'components/skills.tsx'), 'utf-8');
    const classNames = extractClassNames(source);

    expect(classNames.length, 'skills.tsx must have className attributes to verify').toBeGreaterThan(0);

    const offending = findHardcodedHex(classNames);
    expect(offending, `skills.tsx has hardcoded hex in classNames: ${offending.join(', ')}`).toHaveLength(0);
  });

  it('education.tsx uses only tokenized colors (no hardcoded hex)', () => {
    const source = readFileSync(resolve(process.cwd(), 'components/education.tsx'), 'utf-8');
    const classNames = extractClassNames(source);

    expect(classNames.length, 'education.tsx must have className attributes to verify').toBeGreaterThan(0);

    const offending = findHardcodedHex(classNames);
    expect(offending, `education.tsx has hardcoded hex in classNames: ${offending.join(', ')}`).toHaveLength(0);
  });

  it('header.tsx uses only tokenized colors (no hardcoded hex)', () => {
    const source = readFileSync(resolve(process.cwd(), 'components/header.tsx'), 'utf-8');
    const classNames = extractClassNames(source);

    expect(classNames.length, 'header.tsx must have className attributes to verify').toBeGreaterThan(0);

    const offending = findHardcodedHex(classNames);
    expect(offending, `header.tsx has hardcoded hex in classNames: ${offending.join(', ')}`).toHaveLength(0);
  });

  it('header-shell.tsx uses only tokenized colors (no hardcoded hex)', () => {
    const source = readFileSync(resolve(process.cwd(), 'components/header-shell.tsx'), 'utf-8');
    const classNames = extractClassNames(source);

    expect(classNames.length, 'header-shell.tsx must have className attributes to verify').toBeGreaterThan(0);

    const offending = findHardcodedHex(classNames);
    expect(offending, `header-shell.tsx has hardcoded hex in classNames: ${offending.join(', ')}`).toHaveLength(0);
  });
});
