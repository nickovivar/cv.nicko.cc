import React from 'react';
import { experienceItems } from '@/lib/data/cv';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export function Experience() {
  const headingId = 'experience-heading';

  return (
    <section id="experience" aria-labelledby={headingId} className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 id={headingId} className="text-3xl font-bold text-center mb-12">
          Work Experience
        </h2>
        <ol className="space-y-8">
          {experienceItems.map((exp) => (
            <li key={`${exp.company}-${exp.period}`}>
              <article aria-label={`${exp.title} at ${exp.company}`}>
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">{exp.title}</CardTitle>
                      <p className="text-lg font-medium text-primary">{exp.company}</p>
                    </div>
                    <div className="mt-2 md:mt-0 text-right">
                      <p className="text-muted-foreground">{exp.period}</p>
                      <p className="text-muted-foreground">{exp.location}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    {exp.responsibilities.map((resp) => (
                      <li key={resp} className="text-base leading-relaxed">{resp}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
