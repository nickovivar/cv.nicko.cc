import React from 'react';
import { ExternalLink } from 'lucide-react';
import {
  certificationItems,
  educationItems,
  languageItems,
} from '@/lib/data/cv';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export function Education() {
  const primaryEducation = educationItems[0];

  return (
    <section id="education" className="scroll-mt-24 bg-muted/50 py-20 md:scroll-mt-28">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-3xl font-bold text-center text-primary mb-12">
          Education & Certifications
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Education</CardTitle>
              </CardHeader>
              <CardContent>
                {primaryEducation ? (
                  <>
                    <h3 className="font-semibold mb-2">{primaryEducation.degree}</h3>
                    <p className="text-muted-foreground mb-2">{primaryEducation.institution}</p>
                    <p className="text-sm text-muted-foreground">
                      {primaryEducation.period}, {primaryEducation.location}
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Education information coming soon.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Certifications & Languages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Certifications</h3>
                  <div className="flex flex-wrap gap-2">
                    {certificationItems.map((certification) => (
                      <div key={certification.name} className="flex items-center">
                        <Badge variant="secondary" className="border-primary/30">{certification.name}</Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2"
                          asChild
                        >
                          <a
                            href={certification.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center"
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span className="sr-only">View Certificate</span>
                          </a>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {languageItems.map((language) => (
                      <Badge key={language.name} className="border-primary/30">
                        {language.name} ({language.proficiency})
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
