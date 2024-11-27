import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { Experience } from '@/components/experience';
import { Skills } from '@/components/skills';
import { Education } from '@/components/education';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div id="cv-content">
        <Hero />
        <Experience />
        <Skills />
        <Education />
      </div>
    </main>
  );
}