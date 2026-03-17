import React from 'react';
import { FileText } from 'lucide-react';
import { resumeAssetPath } from '@/lib/data/cv';
import { Button } from './ui/button';
import { ThemeToggle } from './theme-toggle';
import { NavLinks } from './navigation/nav-links';
import { SocialLinks } from './navigation/social-links';
import { HeaderShell } from './header-shell';

export function Header() {
  return (
    <HeaderShell
      desktopNavigation={
        <div className="hidden md:block">
          <NavLinks />
        </div>
      }
      actions={
        <>
          <Button
            variant="outline"
            size="sm"
            className="hidden items-center gap-2 sm:flex"
            asChild
          >
            <a href={resumeAssetPath} download aria-label="Download CV as PDF">
              <FileText className="h-4 w-4" aria-hidden="true" />
              Download CV
            </a>
          </Button>
          <SocialLinks className="hidden sm:flex" />
          <ThemeToggle />
        </>
      }
    />
  );
}
