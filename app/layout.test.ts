import { existsSync } from 'node:fs';
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
    expect(metadataConfig.title).toBe('Nicolas Vivar Davila - SRE Engineer');
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
