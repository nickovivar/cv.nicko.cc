"use client";

import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { MobileMenu } from './navigation/mobile-menu';

interface HeaderShellProps {
  desktopNavigation: React.ReactNode;
  actions: React.ReactNode;
}

export function HeaderShell({ desktopNavigation, actions }: HeaderShellProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const nextIsScrolled = window.scrollY > 50;
      setIsScrolled((currentIsScrolled) =>
        currentIsScrolled === nextIsScrolled ? currentIsScrolled : nextIsScrolled
      );
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'shadow-sm border-b border-border/50' : ''
      } bg-background/95 backdrop-blur-md`}
    >
      <div className="container mx-auto px-4 py-4">
        <a
          href="#main-content"
          className="sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:not-sr-only focus:rounded-md focus:bg-background focus:px-3 focus:py-2"
        >
          Skip to main content
        </a>
        <nav aria-label="Primary navigation" className="flex items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen((currentIsMenuOpen) => !currentIsMenuOpen)}
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </Button>

          {desktopNavigation}

          <div className="flex items-center space-x-2 md:space-x-4">{actions}</div>
        </nav>

        <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
      </div>
    </header>
  );
}
