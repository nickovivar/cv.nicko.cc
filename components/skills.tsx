import React from 'react';
import { skillItems } from '@/lib/data/cv';

export function Skills() {
  const topSkills = skillItems.filter((skill) => skill.value >= 90);

  return (
    <section id="skills" className="scroll-mt-24 py-20 md:scroll-mt-28">
      <div className="container mx-auto px-4">
        <h2 className="font-heading mb-12 text-center text-3xl font-bold text-primary">Technical Skills</h2>
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] md:items-start">
          <div className="space-y-6">
            {skillItems.map((skill) => (
              <div key={skill.name}>
                <div className="mb-2 flex items-baseline justify-between gap-4">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-sm text-muted-foreground">{skill.value}%</span>
                </div>
                <div
                  className="h-2 overflow-hidden rounded-full bg-secondary"
                  aria-hidden="true"
                >
                  <div
                    className="h-full rounded-full bg-primary transition-[width]"
                    style={{ width: `${skill.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-3xl border border-border/60 bg-card/80 p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Core strengths
            </p>
            <ul className="mt-4 space-y-3">
              {topSkills.map((skill) => (
                <li
                  key={skill.name}
                  className="flex items-center justify-between rounded-2xl bg-secondary/70 px-4 py-3"
                >
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-sm text-muted-foreground">{skill.value}%</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-6 text-muted-foreground">
              Strongest areas stay visible without shipping a client-side chart bundle for a
              mostly informational section.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
