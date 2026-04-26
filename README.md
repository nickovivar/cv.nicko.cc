# Nicolas Vivar Davila CV

Static Next.js portfolio and resume site for Nicolas Vivar Davila.

## Stack

- Next.js 14 App Router with static export enabled
- React 18
- TypeScript
- Tailwind CSS
- Dark-only theme with Space Grotesk + Inter typography
- Vitest plus Testing Library for regression coverage

## Project Structure

- `app/` - App Router entrypoints, layout metadata, and web manifest
- `components/` - Page sections, header/navigation, and UI primitives
- `lib/constants.ts` - Shared site identity, links, and metadata copy
- `lib/data/cv.ts` - Resume content and navigation data
- `lib/public-paths.ts` - Base-path-aware helpers for public assets and metadata URLs
- `public/` - Static assets such as the PDF resume, icons, and favicons

## Local Development

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:3000`.

## Tests

```bash
npm test
```

## Deployment Notes

The site is configured for static export via `next.config.js`.

- `NEXT_PUBLIC_BASE_PATH` can be set to deploy under a subpath.
- Public asset URLs, manifest links, and social metadata are generated through `lib/public-paths.ts` so they stay valid when `basePath` is set.

## Content Updates

- Update personal details, links, and summary text in `lib/constants.ts`.
- Update experience, skills, education, certifications, and languages in `lib/data/cv.ts`.
- Replace assets in `public/` if you want different resume files or social/share images.
