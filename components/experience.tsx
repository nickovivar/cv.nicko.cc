"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const experiences = [
  {
    title: "DevOps Specialist",
    company: "Devlane - Huckleberry Labs",
    period: "05/2024 – Present",
    location: "Remote",
    responsibilities: [
      "Continuous Integration and Continuous Delivery optimization with Circle CI.",
      "Terraform management of GCP (Cloud Functions) infrastrucuture.",
      "Load and Stress test of Cloud Functions.",
      "Setup alerting and monitoring with Grafana, and GCP monitoring tools.",
      "Mobile application deployment support.",
      "Bash scripting automation."
    ]
  },
  {
    title: "DevOps/SRE Engineer",
    company: "Stack Builders",
    period: "06/2018 – 05/2024",
    location: "Quito, Ecuador",
    responsibilities: [
      "Configuration management and automation with Ansible.",
      "Continuous Integration and Continuous Delivery with Circle CI and GitHub Actions.",
      "Cloud infrastructure management in AWS with Terraform.",
      "Management and setup of serverless functions.",
      "Docker, Docker-compose and container orchestration tools administration.",
      "Load and stress tests on web applications.",
      "Head of the Internal IT department.",
      "Security audits to multiple projects.",
      "Cloudfront CDN setup and customization for high traffic sites."
    ]
  },
  {
    title: "Systems Administrator",
    company: "Indra",
    period: "03/2016 – 06/2018",
    location: "Quito, Ecuador",
    responsibilities: [
      "Deployment, support and maintenance of virtualized servers using VMWare software tools.",
      "Linux (RHEL: Red Hat Enterprise Linux) servers installation and configuration.",
      "Installation, deployment and update of a military surveillance application.",
      "Installation and maintenance of external systems connections.",
      "Bash shell scripting for maintenance tasks automation on virtualized servers and workstations."
    ]
  }
];

export function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="experience" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-12"
        >
          Work Experience
        </motion.h2>
        <div ref={ref} className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
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
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx} className="text-base leading-relaxed">{resp}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
