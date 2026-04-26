import React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

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

  it('renders with a dark background from initial load (not transparent)', async () => {
    await act(async () => {
      root.render(<Header />);
    });

    const header = container.querySelector('header');

    expect(header).not.toBeNull();
    // Header must have a dark background immediately — no transparent flash
    expect(header?.className).toContain('bg-background/95');
    expect(header?.className).toContain('backdrop-blur-md');
  });

  it('adds a bottom border after scrolling past the threshold', async () => {
    await act(async () => {
      root.render(<Header />);
    });

    const header = container.querySelector('header');

    expect(header).not.toBeNull();
    // Initial state: no border
    expect(header?.className).not.toContain('border-b');

    await act(async () => {
      window.scrollY = 80;
      window.dispatchEvent(new Event('scroll'));
    });

    // Scrolled state: border appears
    expect(header?.className).toContain('border-b');
    expect(header?.className).toContain('border-border/50');
  });

  it('does not render a ThemeToggle component', async () => {
    await act(async () => {
      root.render(<Header />);
    });

    const header = container.querySelector('header');

    expect(header).not.toBeNull();
    expect(header?.textContent).not.toContain('Toggle theme');
    expect(header?.textContent).not.toContain('Switch to');
  });

  it('retains Download CV button and social links in header actions', async () => {
    await act(async () => {
      root.render(<Header />);
    });

    // Download CV link must be present
    const downloadLink = container.querySelector('a[aria-label="Download CV as PDF"]');
    expect(downloadLink).not.toBeNull();
    expect(downloadLink?.textContent).toContain('Download CV');

    // Social links container must be present
    const socialLinks = container.querySelector('[aria-label="Social links"]');
    expect(socialLinks).not.toBeNull();
  });
});
