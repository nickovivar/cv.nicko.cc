import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface SocialLinksProps {
  ariaLabel?: string;
  className?: string;
}

export function SocialLinks({ ariaLabel = 'Social links', className }: SocialLinksProps) {
  const iconMap = {
    github: Github,
    linkedin: Linkedin,
    email: Mail,
  } as const;

  return (
    <ul aria-label={ariaLabel} className={cn('flex items-center gap-2', className)}>
      {siteConfig.socialLinks.map(({ href, key, label }) => {
        const Icon = iconMap[key];
        const isExternal = href.startsWith('http');
        const accessibleLabel = isExternal ? `${label} (opens in a new tab)` : label;

        return (
          <li key={label}>
            <Button
              variant="ghost"
              size="icon"
              asChild
            >
              <a
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                aria-label={accessibleLabel}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </a>
            </Button>
          </li>
        );
      })}
    </ul>
  );
}
