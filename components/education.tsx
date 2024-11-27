"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLink } from 'lucide-react';

export function Education() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="education" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-12"
        >
          Education & Certifications
        </motion.h2>
        <div ref={ref} className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold mb-2">
                  Ing. Electrónico en Redes y Comunicación de Datos
                </h3>
                <p className="text-muted-foreground mb-2">
                  Escuela Politécnica del Ejército
                </p>
                <p className="text-sm text-muted-foreground">2007 – 2013, Quito, Ecuador</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Certifications & Languages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Certifications</h3>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">
                      AWS Certified Cloud Practitioner
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2"
                      asChild
                    >
                      <a
                        href="https://www.credly.com/badges/c98e3f68-440b-4c3c-98b5-0c24a6f657e2/public_url"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">View Certificate</span>
                      </a>
                    </Button>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Languages</h3>
                  <div className="space-x-2">
                    <Badge>Spanish (Fluent)</Badge>
                    <Badge>English (Fluent)</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}