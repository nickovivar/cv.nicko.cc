import { describe, expect, it } from 'vitest';
import manifest from './manifest';

describe('web manifest', () => {
  it('uses the shared site identity and icons', () => {
    const result = manifest();

    expect(result.name).toBe('Nicolas Vivar Davila - SRE Engineer');
    expect(result.short_name).toBe('Nicolas Vivar');
    expect(result.description).toContain('Professional portfolio and CV');
    expect(result.icons).toHaveLength(2);
    expect(result.icons?.map((icon) => icon.src)).toEqual([
      '/web-app-manifest-192x192.png',
      '/web-app-manifest-512x512.png',
    ]);
  });
});
