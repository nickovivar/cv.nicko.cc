import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/constants';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.manifest.name,
    short_name: siteConfig.manifest.shortName,
    description: siteConfig.identity.description,
    start_url: '/',
    display: siteConfig.manifest.display,
    background_color: siteConfig.manifest.backgroundColor,
    theme_color: siteConfig.manifest.themeColor,
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
