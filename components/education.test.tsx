import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
  vi.resetModules();
  vi.doUnmock('@/lib/data/cv');
});

describe('Education', () => {
  it('renders the education section with hash navigation offset classes', async () => {
    const { Education } = await import('./education');
    const markup = renderToStaticMarkup(<Education />);

    expect(markup).toContain('id="education"');
    expect(markup).toContain('scroll-mt-24');
    expect(markup).toContain('Education &amp; Certifications');
  });

  it('renders a fallback instead of crashing when education data is empty', async () => {
    vi.doMock('@/lib/data/cv', async () => {
      const actual = await vi.importActual<typeof import('@/lib/data/cv')>('@/lib/data/cv');

      return {
        ...actual,
        educationItems: [],
      };
    });

    const { Education } = await import('./education');
    const markup = renderToStaticMarkup(<Education />);

    expect(markup).toContain('Education information coming soon.');
  });
});
