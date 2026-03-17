import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { NavLinks } from './nav-links';

describe('NavLinks', () => {
  it('renders the expected section anchors', () => {
    const markup = renderToStaticMarkup(<NavLinks />);

    expect(markup).toContain('<ul');
    expect(markup).toContain('href="#about"');
    expect(markup).toContain('href="#experience"');
    expect(markup).toContain('href="#skills"');
    expect(markup).toContain('href="#education"');
  });
});
