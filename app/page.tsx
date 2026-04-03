import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { Experience } from '@/components/experience';
import { Skills } from '@/components/skills';
import { Education } from '@/components/education';

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen scroll-mt-24 bg-background md:scroll-mt-28">
      <Header />
      <div>
        <Hero />
        <Experience />
        <Skills />
        <Education />
      </div>
    </main>
  );
}
