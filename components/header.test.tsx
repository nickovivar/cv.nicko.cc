import React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('./theme-toggle', () => ({
  ThemeToggle: () => <button type="button">Toggle theme</button>,
}));

import { Header } from './header';

describe('Header', () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      writable: true,
      value: 0,
    });
  });

  afterEach(async () => {
    await act(async () => {
      root.unmount();
    });
    container.remove();
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  it('toggles the mobile menu and closes it after selecting a navigation link', async () => {
    await act(async () => {
      root.render(<Header />);
    });

    const toggleButton = container.querySelector<HTMLButtonElement>(
      'button[aria-label="Open navigation menu"]'
    );

    expect(toggleButton).not.toBeNull();
    expect(container.querySelector('#mobile-navigation')).toBeNull();

    await act(async () => {
      toggleButton?.click();
    });

    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');

    const aboutLink = container.querySelector<HTMLAnchorElement>('#mobile-navigation a[href="#about"]');

    expect(aboutLink).not.toBeNull();

    await act(async () => {
      aboutLink?.click();
    });

    expect(container.querySelector('#mobile-navigation')).toBeNull();
  });

  it('closes the mobile menu when Escape is pressed', async () => {
    await act(async () => {
      root.render(<Header />);
    });

    const toggleButton = container.querySelector<HTMLButtonElement>(
      'button[aria-label="Open navigation menu"]'
    );

    await act(async () => {
      toggleButton?.click();
    });

    expect(container.querySelector('#mobile-navigation')).not.toBeNull();

    await act(async () => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });

    expect(container.querySelector('#mobile-navigation')).toBeNull();
  });

  it('applies sticky header styling after the scroll threshold', async () => {
    await act(async () => {
      root.render(<Header />);
    });

    const header = container.querySelector('header');

    expect(header).not.toBeNull();
    expect(header?.className).toContain('bg-transparent');

    await act(async () => {
      window.scrollY = 80;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(header?.className).toContain('bg-background/80');
    expect(header?.className).toContain('backdrop-blur-md');
  });
});
