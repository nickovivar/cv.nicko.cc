"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Progress } from './ui/progress';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';

const skills = [
  { name: 'Linux', value: 95 },
  { name: 'AWS', value: 90 },
  { name: 'Ansible', value: 85 },
  { name: 'Google Cloud', value: 80 },
  { name: 'Docker', value: 90 },
  { name: 'Kubernetes', value: 85 },
  { name: 'Terraform', value: 90 },
  { name: 'CI/CD', value: 95 },
];

const radarData = skills.map(skill => ({
  subject: skill.name,
  A: skill.value,
  fullMark: 100,
}));

export function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-12"
        >
          Technical Skills
        </motion.h2>
        <div ref={ref} className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-muted-foreground">{skill.value}%</span>
                </div>
                <Progress value={skill.value} className="h-2" />
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="h-[400px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="Skills"
                  dataKey="A"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
}