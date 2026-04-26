import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { siteConfig } from '@/lib/constants';
import { createMetadataConfig, metadataConfig } from '@/lib/metadata';
import { publicAssetPaths } from '@/lib/public-paths';

const originalBasePath = process.env.NEXT_PUBLIC_BASE_PATH;

afterEach(() => {
  process.env.NEXT_PUBLIC_BASE_PATH = originalBasePath;
});

describe('site metadata', () => {
  it('exports the canonical SEO values', () => {
    expect(metadataConfig.title).toBe('Nicolas Vivar Davila - Platform & DevOps Engineer');
    expect(metadataConfig.description).toContain('Professional portfolio and CV');
    expect(metadataConfig.manifest).toBe(publicAssetPaths.manifest);
    expect(metadataConfig.alternates?.canonical).toBe('/');
    expect(metadataConfig.openGraph?.url).toBe('https://cv.nicko.cc/');
    expect('card' in (metadataConfig.twitter ?? {})).toBe(true);
  });

  it('prefixes metadata asset URLs with the configured basePath', () => {
    process.env.NEXT_PUBLIC_BASE_PATH = '/portfolio';

    const metadata = createMetadataConfig();
    const openGraphImages = metadata.openGraph?.images;
    const openGraphImage = Array.isArray(openGraphImages)
      ? openGraphImages[0]
      : openGraphImages;

    expect(metadata.manifest).toBe('/portfolio/manifest.webmanifest');
    expect(metadata.alternates?.canonical).toBe('/portfolio');
    expect(metadata.openGraph?.url).toBe('https://cv.nicko.cc/portfolio');
    const openGraphImageUrl =
      typeof openGraphImage === 'string'
        ? openGraphImage
        : openGraphImage instanceof URL
          ? openGraphImage.toString()
          : openGraphImage?.url;

    expect(openGraphImageUrl).toBe('https://cv.nicko.cc/portfolio/web-app-manifest-512x512.png');
    expect(metadata.twitter?.images).toEqual([
      'https://cv.nicko.cc/portfolio/web-app-manifest-512x512.png',
    ]);
  });

  it('references public assets that exist on disk', () => {
    const ogImagePath = resolve(process.cwd(), 'public', siteConfig.site.ogImagePath.slice(1));
    const manifestIconPath = resolve(
      process.cwd(),
      'public',
      publicAssetPaths.icons.maskable512.slice(1)
    );

    expect(existsSync(ogImagePath)).toBe(true);
    expect(existsSync(manifestIconPath)).toBe(true);
  });
});

describe('RootLayout — dark-only contract', () => {
  const layoutSource = readFileSync(resolve(process.cwd(), 'app', 'layout.tsx'), 'utf-8');

  it('hard-codes className="dark" on the <html> element', () => {
    // R1: Exclusive dark-mode rendering — html must always have class="dark"
    expect(layoutSource).toContain('className="dark"');
  });

  it('loads Space Grotesk with display: swap for headings', () => {
    // R2: Font loading without layout shift — display: swap prevents CLS
    expect(layoutSource).toContain("Space_Grotesk");
    expect(layoutSource).toContain("variable: '--font-heading'");
    expect(layoutSource).toContain("display: 'swap'");
  });

  it('loads Inter with display: swap for body text', () => {
    // R2: Font loading without layout shift
    expect(layoutSource).toContain("Inter(");
    expect(layoutSource).toContain("variable: '--font-body'");
    // display: 'swap' appears at least twice (both fonts)
    const swapCount = (layoutSource.match(/display: 'swap'/g) ?? []).length;
    expect(swapCount).toBeGreaterThanOrEqual(2);
  });

  it('applies both font CSS variables to the body className', () => {
    // R2: Font application — body must reference both font variables
    expect(layoutSource).toContain('inter.variable');
    expect(layoutSource).toContain('spaceGrotesk.variable');
    expect(layoutSource).toContain('font-body');
  });

  it('does NOT import or use ThemeProvider or next-themes', () => {
    // R1: No theme provider — dark-only site
    expect(layoutSource).not.toContain('ThemeProvider');
    expect(layoutSource).not.toContain('next-themes');
    expect(layoutSource).not.toContain('useTheme');
  });
});
