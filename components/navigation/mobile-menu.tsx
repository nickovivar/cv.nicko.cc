"use client";

import { motion } from 'framer-motion';
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
        <div className="flex space-x-4 pt-2">
          <SocialLinks />
        </div>
      </div>
    </motion.div>
  );
}