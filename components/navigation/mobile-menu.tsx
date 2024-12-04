"use client";

import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
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
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="md:hidden bg-background/95 backdrop-blur-sm mt-4 rounded-lg shadow-lg p-4"
    >
      <div className="flex flex-col space-y-4">
        <NavLinks isMobile onItemClick={onClose} />
        <Button
          variant="outline"
          size="sm"
          className="w-full flex items-center justify-center gap-2"
          asChild
        >
          <a href="/cv.pdf" download>
            <FileText className="h-4 w-4" />
            Download CV
          </a>
        </Button>
        <div className="flex space-x-4 pt-2">
          <SocialLinks />
        </div>
      </div>
    </motion.div>
  );
}