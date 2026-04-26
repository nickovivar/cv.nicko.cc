import { publicAssetPaths } from '@/lib/public-paths';

export const siteConfig = {
  identity: {
    name: 'Nicolas Vivar Davila',
    shortName: 'Nicolas Vivar',
    role: 'Platform & DevOps Engineer',
    headline: 'Platform & DevOps Engineer',
    location: {
      city: 'Quito',
      country: 'Ecuador',
      label: 'Quito, Ecuador',
    },
    description:
      'Professional portfolio and CV of Nicolas Vivar Davila, Platform & DevOps Engineer specializing in DevOps and cloud technologies.',
    summary:
      'Platform & DevOps Engineer with a long-standing love for Linux (RHEL & Debian) and open source technologies, focused on cloud computing, DevOps, and automation. Experienced with Infrastructure as Code tools like Terraform and AWS CloudFormation, configuration management with Ansible, and CI/CD pipelines that ship fast, reliable, and secure systems.',
  },
  site: {
    url: 'https://cv.nicko.cc',
    ogImagePath: publicAssetPaths.ogImage,
    locale: 'en_US',
  },
  manifest: {
    name: 'Nicolas Vivar Davila - Platform & DevOps Engineer',
    shortName: 'Nicolas Vivar',
    themeColor: '#0A0A0A',
    backgroundColor: '#0A0A0A',
    display: 'standalone',
  },
  links: {
    github: 'https://github.com/nickovivar',
    linkedin: 'https://linkedin.com/in/nickovivar',
    email: 'mailto:nickovivar@gmail.com',
    credly:
      'https://www.credly.com/badges/c98e3f68-440b-4c3c-98b5-0c24a6f657e2/public_url',
  },
  socialLinks: [
    {
      key: 'github',
      label: 'GitHub',
      href: 'https://github.com/nickovivar',
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/nickovivar',
    },
    {
      key: 'email',
      label: 'Email',
      href: 'mailto:nickovivar@gmail.com',
    },
  ],
} as const;

export const siteMetadata = {
  title: `${siteConfig.identity.name} - ${siteConfig.identity.role}`,
  description: siteConfig.identity.description,
};
