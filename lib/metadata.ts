import type { Metadata } from 'next';
import { siteConfig, siteMetadata } from '@/lib/constants';
import { publicAssetPaths, withBasePath, withSiteUrl } from '@/lib/public-paths';

export function createMetadataConfig(): Metadata {
  const ogImageUrl = withSiteUrl(siteConfig.site.url, siteConfig.site.ogImagePath);

  return {
    metadataBase: new URL(siteConfig.site.url),
    title: siteMetadata.title,
    description: siteMetadata.description,
    alternates: {
      canonical: withBasePath('/'),
    },
    openGraph: {
      title: siteMetadata.title,
      description: siteMetadata.description,
      url: withSiteUrl(siteConfig.site.url, '/'),
      siteName: siteConfig.manifest.shortName,
      locale: siteConfig.site.locale,
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          alt: siteMetadata.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteMetadata.title,
      description: siteMetadata.description,
      images: [ogImageUrl],
    },
    manifest: withBasePath(publicAssetPaths.manifest),
  };
}

export const metadataConfig: Metadata = createMetadataConfig();
