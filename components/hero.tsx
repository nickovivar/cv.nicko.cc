import React from 'react';
import { MapPin } from 'lucide-react';
import { siteConfig } from '@/lib/constants';

export function Hero() {
  const { identity } = siteConfig;

  return (
    <section id="about" className="min-h-screen flex items-center justify-center pt-20">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {identity.name}
          </h1>
          <h2 className="text-2xl md:text-3xl text-muted-foreground mb-6">
            {identity.headline}
          </h2>
          <div className="flex items-center justify-center text-muted-foreground mb-8">
            <MapPin className="h-5 w-5 mr-2" />
            <span>{identity.location.label}</span>
          </div>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            {identity.summary}
          </p>
        </div>
      </div>
    </section>
  );
}
