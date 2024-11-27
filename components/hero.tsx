"use client";

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

export function Hero() {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center pt-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Nicolas Vivar Davila
          </h1>
          <h2 className="text-2xl md:text-3xl text-muted-foreground mb-6">
            SRE Engineer (DevOps)
          </h2>
          <div className="flex items-center justify-center text-muted-foreground mb-8">
            <MapPin className="h-5 w-5 mr-2" />
            <span>Quito, Ecuador</span>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-2xl mx-auto text-lg text-muted-foreground"
          >
            Engineer with a passion for Linux (RHEL & Debian) and OpenSource technologies, 
            focusing on cloud computing, DevOps, and automation. Experienced with Infrastructure 
            as Code (IaC) tools like Terraform and AWS CloudFormation, Configuration Management 
            tools like Ansible, and CI/CD pipeline setup, delivering fast, reliable, and secure systems.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}