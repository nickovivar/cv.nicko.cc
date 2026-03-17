import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { SocialLinks } from './social-links';

describe('SocialLinks', () => {
  it('adds explicit labels for external links and keeps mail links local', () => {
    const markup = renderToStaticMarkup(<SocialLinks />);

    expect(markup).toContain('aria-label="GitHub (opens in a new tab)"');
    expect(markup).toContain('aria-label="LinkedIn (opens in a new tab)"');
    expect(markup).toContain('href="mailto:nickovivar@gmail.com"');
    expect(markup).not.toContain('href="mailto:nickovivar@gmail.com" target="_blank"');
  });
});
