import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { publicAssetPaths } from '@/lib/public-paths';
import manifest from './manifest';

const originalBasePath = process.env.NEXT_PUBLIC_BASE_PATH;

afterEach(() => {
  process.env.NEXT_PUBLIC_BASE_PATH = originalBasePath;
});

describe('web manifest', () => {
  it('uses the shared site identity and icons', () => {
    const result = manifest();

    expect(result.name).toBe('Nicolas Vivar Davila - Platform & DevOps Engineer');
    expect(result.short_name).toBe('Nicolas Vivar');
    expect(result.description).toContain('Professional portfolio and CV');
    expect(result.start_url).toBe('/');
    expect(result.icons).toHaveLength(2);
    expect(result.icons?.map((icon) => icon.src)).toEqual([
      publicAssetPaths.icons.maskable192,
      publicAssetPaths.icons.maskable512,
    ]);
  });

  it('uses dark theme colors for theme_color and background_color', () => {
    const result = manifest();

    expect(result.theme_color).toBe('#0A0A0A');
    expect(result.background_color).toBe('#0A0A0A');
  });

  it('prefixes manifest URLs with the configured basePath', () => {
    process.env.NEXT_PUBLIC_BASE_PATH = '/portfolio';

    const result = manifest();

    expect(result.start_url).toBe('/portfolio');
    expect(result.icons?.map((icon) => icon.src)).toEqual([
      '/portfolio/web-app-manifest-192x192.png',
      '/portfolio/web-app-manifest-512x512.png',
    ]);
  });

  it('only references icon assets that exist on disk', () => {
    expect(
      existsSync(resolve(process.cwd(), 'public', publicAssetPaths.icons.maskable192.slice(1)))
    ).toBe(true);
    expect(
      existsSync(resolve(process.cwd(), 'public', publicAssetPaths.icons.maskable512.slice(1)))
    ).toBe(true);
  });
});
