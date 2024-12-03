"use client";

import { motion } from 'framer-motion';

interface NavLinksProps {
  isMobile?: boolean;
  onItemClick?: () => void;
}

export function NavLinks({ isMobile = false, onItemClick }: NavLinksProps) {
  const links = [
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#skills', label: 'Skills' },
    { href: '#education', label: 'Education' },
  ];

  return (
    <>
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="text-foreground hover:text-primary transition-colors"
          onClick={onItemClick}
        >
          {link.label}
        </a>
      ))}
    </>
  );
}