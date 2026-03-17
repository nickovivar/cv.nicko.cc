import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Skills } from './skills';

describe('Skills', () => {
  it('renders the skill list without client chart scaffolding', () => {
    const markup = renderToStaticMarkup(<Skills />);

    expect(markup).toContain('Technical Skills');
    expect(markup).toContain('Core strengths');
    expect(markup).toContain('Linux');
    expect(markup).toContain('width:95%');
    expect(markup).not.toContain('recharts-responsive-container');
  });
});
