# Nicolas Vivar Davila - SRE Engineer

A modern, interactive portfolio and CV for Nicolas Vivar Davila, an SRE Engineer focused on DevOps, cloud technologies, and automation.

Core site identity and metadata live in `lib/constants.ts`, so branding updates should start there.

## 🚀 Features

- Responsive design for all devices
- Dark/Light mode toggle
- Interactive skill charts and progress bars
- Smooth animations and transitions
- PDF export functionality
- SEO optimized
- Fully accessible

## 🛠️ Tech Stack

- Next.js 13
- Tailwind CSS
- Framer Motion
- Recharts
- shadcn/ui
- TypeScript

## 🏃‍♂️ Running Locally

1. Clone the repository:
```bash
git clone https://github.com/nickovivar/cv.nicko.cc.git
cd cv.nicko.cc
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔨 Building for Production

```bash
npm run build
```

The static output will be generated in the `out` directory.

## 📝 Deployment

This site is automatically deployed to GitHub Pages using GitHub Actions. Every push to the `main` branch triggers a new deployment.

The live site can be accessed at: [https://cv.nicko.cc](https://cv.nicko.cc)

## 📄 License

MIT License - feel free to use this code for your own CV!
