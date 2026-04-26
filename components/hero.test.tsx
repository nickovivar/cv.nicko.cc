import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Hero } from './hero';

describe('Hero', () => {
  it('renders the core profile copy from shared config', () => {
    const markup = renderToStaticMarkup(<Hero />);

    expect(markup).toContain('id="about"');
    expect(markup).toContain('scroll-mt-24');
    expect(markup).toContain('Nicolas Vivar Davila');
    expect(markup).toContain('Platform &amp; DevOps Engineer');
    expect(markup).toContain('Quito, Ecuador');
    expect(markup).toContain('Platform &amp; DevOps Engineer with a long-standing love for Linux');
  });

  it('applies font-heading class to the name heading', () => {
    const markup = renderToStaticMarkup(<Hero />);

    expect(markup).toContain('font-heading');
  });

  it('renders the name as the most prominent text element (h1)', () => {
    const markup = renderToStaticMarkup(<Hero />);

    // The h1 must contain the identity name — this is the primary visual hierarchy
    expect(markup).toContain('<h1');
    expect(markup).toContain('Nicolas Vivar Davila');
    // The h1 must come before the h2 headline in the DOM
    const h1Index = markup.indexOf('<h1');
    const h2Index = markup.indexOf('<h2');
    expect(h1Index).toBeLessThan(h2Index);
  });

  it('renders the headline with primary accent color', () => {
    const markup = renderToStaticMarkup(<Hero />);

    expect(markup).toContain('text-primary');
  });

  it('renders an accent underline decoration beneath the headline', () => {
    const markup = renderToStaticMarkup(<Hero />);

    // The headline h2 must have an accent underline element
    expect(markup).toContain('accent-underline');
    expect(markup).toContain('bg-primary');
  });

  it('occupies at least 80% viewport height (min-h-[80vh])', () => {
    // R5: Hero viewport occupation — must be ≥80vh
    const markup = renderToStaticMarkup(<Hero />);

    expect(markup).toContain('min-h-[80vh]');
  });

  it('includes responsive breakpoint classes for desktop enhancement', () => {
    // R9: Responsive layout — hero adapts at md breakpoint
    const markup = renderToStaticMarkup(<Hero />);

    expect(markup).toContain('md:min-h-screen');
    expect(markup).toContain('md:text-6xl');
  });

  it('uses muted-foreground for summary text (not hardcoded colors)', () => {
    // R8: Visual identity consistency — summary uses tokenized color
    const markup = renderToStaticMarkup(<Hero />);

    expect(markup).toContain('text-muted-foreground');
    // No hardcoded hex colors in the hero component
    expect(markup).not.toMatch(/#[0-9a-fA-F]{3,8}/);
  });
});
