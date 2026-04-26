import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Skills } from './skills';

describe('Skills', () => {
  it('renders the skill list without client chart scaffolding', () => {
    const markup = renderToStaticMarkup(<Skills />);

    expect(markup).toContain('Technical Skills');
    expect(markup).toContain('id="skills"');
    expect(markup).toContain('scroll-mt-24');
    expect(markup).toContain('Core strengths');
    expect(markup).toContain('Linux');
    expect(markup).toContain('width:95%');
    expect(markup).not.toContain('recharts-responsive-container');
  });

  it('applies font-heading class to section heading', () => {
    const markup = renderToStaticMarkup(<Skills />);

    expect(markup).toContain('font-heading');
  });

  it('applies text-primary accent to section heading (R6)', () => {
    const markup = renderToStaticMarkup(<Skills />);

    // R6: Section headings SHALL use Space Grotesk with #00B3B3 (text-primary)
    expect(markup).toContain('text-primary');
  });

  it('uses primary accent for progress bar fills', () => {
    const markup = renderToStaticMarkup(<Skills />);

    expect(markup).toContain('bg-primary');
  });

  it('renders skill categories with actual skill names visible to users', () => {
    const markup = renderToStaticMarkup(<Skills />);

    // Behavioral: users can read skill names and categories
    expect(markup).toContain('Linux');
    expect(markup).toContain('Core strengths');
    // Progress bars must have visible width values
    expect(markup).toContain('width:');
  });
});
