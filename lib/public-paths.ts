const normalizeBasePath = (basePath: string) => {
  if (!basePath) {
    return '';
  }

  const trimmedBasePath = basePath.trim().replace(/\/+$/, '');

  if (!trimmedBasePath) {
    return '';
  }

  return trimmedBasePath.startsWith('/') ? trimmedBasePath : `/${trimmedBasePath}`;
};

export const publicAssetPaths = {
  manifest: '/manifest.webmanifest',
  resume: '/cv.pdf',
  ogImage: '/web-app-manifest-512x512.png',
  icons: {
    maskable192: '/web-app-manifest-192x192.png',
    maskable512: '/web-app-manifest-512x512.png',
  },
} as const;

export function getBasePath() {
  return normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH ?? '');
}

export function withBasePath(path: `/${string}` | '/') {
  const basePath = getBasePath();

  if (path === '/') {
    return basePath || '/';
  }

  return `${basePath}${path}`;
}

export function withSiteUrl(origin: string, path: `/${string}` | '/') {
  return new URL(withBasePath(path), origin).toString();
}
