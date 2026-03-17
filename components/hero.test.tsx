import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Hero } from './hero';

describe('Hero', () => {
  it('renders the core profile copy from shared config', () => {
    const markup = renderToStaticMarkup(<Hero />);

    expect(markup).toContain('Nicolas Vivar Davila');
    expect(markup).toContain('SRE Engineer (DevOps)');
    expect(markup).toContain('Quito, Ecuador');
    expect(markup).toContain('Engineer with a passion for Linux');
  });
});
