import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/constants';
import { publicAssetPaths, withBasePath } from '@/lib/public-paths';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.manifest.name,
    short_name: siteConfig.manifest.shortName,
    description: siteConfig.identity.description,
    start_url: withBasePath('/'),
    display: siteConfig.manifest.display,
    background_color: siteConfig.manifest.backgroundColor,
    theme_color: siteConfig.manifest.themeColor,
    icons: [
      {
        src: withBasePath(publicAssetPaths.icons.maskable192),
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: withBasePath(publicAssetPaths.icons.maskable512),
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
