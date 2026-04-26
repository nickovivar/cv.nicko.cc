import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Experience } from './experience';

describe('Experience', () => {
  it('renders semantic static markup for the timeline', () => {
    const markup = renderToStaticMarkup(<Experience />);

    expect(markup).toContain('id="experience"');
    expect(markup).toContain('scroll-mt-24');
    expect(markup).toContain('aria-labelledby="experience-heading"');
    expect(markup).toContain('<ol');
    expect(markup).toContain('aria-label="Platform &amp; DevOps Engineer at Devlane"');
    expect(markup).toContain('Continuous Integration and Continuous Delivery optimization with Circle CI.');
  });

  it('applies border-l-2 border-primary accent to experience cards', () => {
    const markup = renderToStaticMarkup(<Experience />);

    expect(markup).toContain('border-l-2');
    expect(markup).toContain('border-primary');
  });

  it('renders experience cards with visible company and role information', () => {
    const markup = renderToStaticMarkup(<Experience />);

    // Behavioral: user can see company names and roles
    expect(markup).toContain('Devlane');
    expect(markup).toContain('Platform &amp; DevOps Engineer');
  });

  it('uses an ordered list for the experience timeline (semantic markup)', () => {
    const markup = renderToStaticMarkup(<Experience />);

    // Semantic: timeline items are in an ordered list for screen readers
    expect(markup).toContain('<ol');
    expect(markup).toContain('aria-label="Platform &amp; DevOps Engineer at Devlane"');
  });

  it('applies font-heading class to section heading', () => {
    const markup = renderToStaticMarkup(<Experience />);

    expect(markup).toContain('font-heading');
  });

  it('applies text-primary accent to section heading (R6)', () => {
    const markup = renderToStaticMarkup(<Experience />);

    // R6: Section headings SHALL use Space Grotesk with #00B3B3 (text-primary)
    expect(markup).toContain('text-primary');
  });
});
