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
    expect(markup).toContain('aria-label="DevOps Specialist at Devlane - Huckleberry Labs"');
    expect(markup).toContain('Continuous Integration and Continuous Delivery optimization with Circle CI.');
  });
});
