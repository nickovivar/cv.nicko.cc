import type { Metadata } from 'next';
import { siteConfig, siteMetadata } from '@/lib/constants';

export const metadataConfig: Metadata = {
  metadataBase: new URL(siteConfig.site.url),
  title: siteMetadata.title,
  description: siteMetadata.description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteConfig.site.url,
    siteName: siteConfig.manifest.shortName,
    locale: siteConfig.site.locale,
    type: 'website',
    images: [
      {
        url: siteConfig.site.ogImage,
        alt: siteMetadata.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteConfig.site.ogImage],
  },
  manifest: '/manifest.webmanifest',
};
