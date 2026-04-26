import React from 'react';
import { MapPin } from 'lucide-react';
import { siteConfig } from '@/lib/constants';

export function Hero() {
  const { identity } = siteConfig;

  return (
    <section
      id="about"
      className="flex min-h-[80vh] scroll-mt-24 items-center justify-center pt-20 md:scroll-mt-28 md:min-h-screen"
    >
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="font-heading text-4xl font-bold tracking-tight md:text-6xl mb-4">
            {identity.name}
          </h1>
          <h2 className="text-2xl md:text-3xl text-primary mb-6">
            {identity.headline}
          </h2>
          <div className="accent-underline mx-auto w-16 h-1 bg-primary rounded-full mb-6" aria-hidden="true" />
          <div className="flex items-center justify-center text-muted-foreground mb-8">
            <MapPin className="h-5 w-5 mr-2" />
            <span>{identity.location.label}</span>
          </div>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
            {identity.summary}
          </p>
        </div>
      </div>
    </section>
  );
}
