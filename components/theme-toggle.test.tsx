import React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const setTheme = vi.fn();
let resolvedTheme: 'light' | 'dark' = 'light';

vi.mock('next-themes', () => ({
  useTheme: () => ({
    resolvedTheme,
    setTheme,
  }),
}));

import { ThemeToggle } from './theme-toggle';

describe('ThemeToggle', () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
    setTheme.mockReset();
    resolvedTheme = 'light';
  });

  afterEach(async () => {
    await act(async () => {
      root.unmount();
    });
    container.remove();
    document.body.innerHTML = '';
  });

  it('switches from the resolved light theme to dark mode', async () => {
    resolvedTheme = 'light';

    await act(async () => {
      root.render(<ThemeToggle />);
    });

    const button = container.querySelector<HTMLButtonElement>('button');

    expect(button).not.toBeNull();
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
    expect(button).not.toBeDisabled();

    await act(async () => {
      button?.click();
    });

    expect(setTheme).toHaveBeenCalledWith('dark');
  });

  it('switches from the resolved dark theme to light mode', async () => {
    resolvedTheme = 'dark';

    await act(async () => {
      root.render(<ThemeToggle />);
    });

    const button = container.querySelector<HTMLButtonElement>('button');

    expect(button).not.toBeNull();
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode');

    await act(async () => {
      button?.click();
    });

    expect(setTheme).toHaveBeenCalledWith('light');
  });
});
