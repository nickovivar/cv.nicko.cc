"use client";

import React from 'react';
import { FileText } from 'lucide-react';
import { resumeAssetPath } from '@/lib/data/cv';
import { Button } from '../ui/button';
import { NavLinks } from './nav-links';
import { SocialLinks } from './social-links';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <nav
      id="mobile-navigation"
      aria-label="Mobile navigation"
      className="md:hidden bg-background/95 backdrop-blur-sm mt-4 rounded-lg shadow-lg p-4"
    >
      <div className="flex flex-col space-y-4">
        <NavLinks onItemClick={onClose} className="flex-col items-start gap-4" />
        <Button
          variant="outline"
          size="sm"
          className="w-full flex items-center justify-center gap-2"
          asChild
        >
          <a href={resumeAssetPath} download aria-label="Download CV as PDF">
            <FileText className="h-4 w-4" aria-hidden="true" />
            Download CV
          </a>
        </Button>
        <div className="pt-2">
          <SocialLinks />
        </div>
      </div>
    </nav>
  );
}
