"use client";

import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/constants';

interface SocialLinksProps {
  className?: string;
}

export function SocialLinks({ className = '' }: SocialLinksProps) {
  const socialLinks = [
    { href: siteConfig.links.github, icon: Github, label: 'GitHub' },
    { href: siteConfig.links.linkedin, icon: Linkedin, label: 'LinkedIn' },
    { href: siteConfig.links.email, icon: Mail, label: 'Email' },
  ];

  return (
    <>
      {socialLinks.map(({ href, icon: Icon, label }) => (
        <Button
          key={label}
          variant="ghost"
          size="icon"
          asChild
          className={className}
        >
          <a href={href} target="_blank" rel="noopener noreferrer">
            <Icon className="h-5 w-5" />
          </a>
        </Button>
      ))}
    </>
  );
}