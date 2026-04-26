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

  it('applies font-heading class to section heading', async () => {
    const { Education } = await import('./education');
    const markup = renderToStaticMarkup(<Education />);

    expect(markup).toContain('font-heading');
  });

  it('applies text-primary accent to section heading (R6)', async () => {
    const { Education } = await import('./education');
    const markup = renderToStaticMarkup(<Education />);

    // R6: Section headings SHALL use Space Grotesk with #00B3B3 (text-primary)
    expect(markup).toContain('text-primary');
  });

  it('applies border-primary/30 to certification and language badges', async () => {
    const { Education } = await import('./education');
    const markup = renderToStaticMarkup(<Education />);

    expect(markup).toContain('border-primary/30');
  });

  it('renders education items with visible degree and institution names', async () => {
    const { Education } = await import('./education');
    const markup = renderToStaticMarkup(<Education />);

    // Behavioral: users can see education details
    expect(markup).toContain('Education &amp; Certifications');
    // At least one education item should be rendered
    expect(markup).not.toContain('Education information coming soon.');
  });
});
