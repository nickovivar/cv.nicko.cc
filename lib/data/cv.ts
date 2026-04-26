import { siteConfig } from '@/lib/constants';
import { publicAssetPaths, withBasePath } from '@/lib/public-paths';

export type NavItem = {
  href: `#${string}`;
  label: string;
};

export type ExperienceItem = {
  title: string;
  company: string;
  period: string;
  location: string;
  responsibilities: string[];
};

export type SkillItem = {
  name: string;
  value: number;
};

export type EducationItem = {
  degree: string;
  institution: string;
  period: string;
  location: string;
};

export type CertificationItem = {
  name: string;
  href: string;
};

export type LanguageItem = {
  name: string;
  proficiency: string;
};

export const resumeAssetPath = withBasePath(publicAssetPaths.resume);

export const navItems: NavItem[] = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#education', label: 'Education' },
];

export const experienceItems: ExperienceItem[] = [
  {
    title: 'Platform & DevOps Engineer',
    company: 'Devlane',
    period: '05/2024 – Present',
    location: 'Remote',
    responsibilities: [
      'Continuous Integration and Continuous Delivery optimization with Circle CI.',
      'Terraform management of GCP (Cloud Functions) infrastructure.',
      'Load and Stress test of Cloud Functions.',
      'Setup alerting and monitoring with Grafana, and GCP monitoring tools.',
      'Mobile application deployment support.',
      'Bash scripting automation.',
    ],
  },
  {
    title: 'DevOps/SRE Engineer',
    company: 'Stack Builders',
    period: '06/2018 – 05/2024',
    location: 'Quito, Ecuador',
    responsibilities: [
      'Configuration management and automation with Ansible.',
      'Continuous Integration and Continuous Delivery with Circle CI and GitHub Actions.',
      'Cloud infrastructure management in AWS with Terraform.',
      'Management and setup of serverless functions.',
      'Docker, Docker-compose and container orchestration tools administration.',
      'Load and stress tests on web applications.',
      'Head of the Internal IT department.',
      'Security audits to multiple projects.',
      'Cloudfront CDN setup and customization for high traffic sites.',
    ],
  },
  {
    title: 'Systems Administrator',
    company: 'Indra',
    period: '03/2016 – 06/2018',
    location: 'Quito, Ecuador',
    responsibilities: [
      'Deployment, support and maintenance of virtualized servers using VMWare software tools.',
      'Linux (RHEL: Red Hat Enterprise Linux) servers installation and configuration.',
      'Installation, deployment and update of a military surveillance application.',
      'Installation and maintenance of external systems connections.',
      'Bash shell scripting for maintenance tasks automation on virtualized servers and workstations.',
    ],
  },
];

export const skillItems: SkillItem[] = [
  { name: 'Linux', value: 95 },
  { name: 'AWS', value: 90 },
  { name: 'Ansible', value: 85 },
  { name: 'Google Cloud', value: 80 },
  { name: 'Docker', value: 90 },
  { name: 'Kubernetes', value: 85 },
  { name: 'Terraform', value: 90 },
  { name: 'CI/CD', value: 95 },
];

export const educationItems: EducationItem[] = [
  {
    degree: 'Ing. Electrónico en Redes y Comunicación de Datos',
    institution: 'Escuela Politécnica del Ejército',
    period: '2007 – 2013',
    location: siteConfig.identity.location.label,
  },
];

export const certificationItems: CertificationItem[] = [
  {
    name: 'AWS Certified Cloud Practitioner',
    href: siteConfig.links.credly,
  },
];

export const languageItems: LanguageItem[] = [
  { name: 'Spanish', proficiency: 'Fluent' },
  { name: 'English', proficiency: 'Fluent' },
];
