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
  const primaryEducation = educationItems[0]!;

  return (
    <section id="education" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Education & Certifications
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold mb-2">{primaryEducation.degree}</h3>
                <p className="text-muted-foreground mb-2">{primaryEducation.institution}</p>
                <p className="text-sm text-muted-foreground">
                  {primaryEducation.period}, {primaryEducation.location}
                </p>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Certifications & Languages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Certifications</h3>
                  {certificationItems.map((certification) => (
                    <div key={certification.name} className="flex items-center space-x-2">
                      <Badge variant="secondary">{certification.name}</Badge>
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
                <div>
                  <h3 className="font-semibold mb-2">Languages</h3>
                  <div className="space-x-2">
                    {languageItems.map((language) => (
                      <Badge key={language.name}>
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
