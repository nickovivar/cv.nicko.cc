import React from 'react';
import { navItems } from '@/lib/data/cv';
import { cn } from '@/lib/utils';

interface NavLinksProps {
  onItemClick?: () => void;
  className?: string;
}

export function NavLinks({ onItemClick, className }: NavLinksProps) {
  return (
    <ul className={cn('flex items-center gap-6', className)}>
      {navItems.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            className="text-foreground hover:text-primary transition-colors"
            onClick={onItemClick}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
