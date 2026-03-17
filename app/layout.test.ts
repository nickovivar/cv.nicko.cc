import { describe, expect, it } from 'vitest';
import { metadataConfig } from '@/lib/metadata';

describe('site metadata', () => {
  it('exports the canonical SEO values', () => {
    expect(metadataConfig.title).toBe('Nicolas Vivar Davila - SRE Engineer');
    expect(metadataConfig.description).toContain('Professional portfolio and CV');
    expect(metadataConfig.manifest).toBe('/manifest.webmanifest');
    expect(metadataConfig.alternates?.canonical).toBe('/');
    expect(metadataConfig.openGraph?.url).toBe('https://cv.nicko.cc');
    expect(metadataConfig.twitter?.card).toBe('summary_large_image');
  });
});
