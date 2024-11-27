"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ThemeToggle } from './theme-toggle';
import { Button } from './ui/button';
import { Download, Github, Linkedin, Mail } from 'lucide-react';
import { generatePDF } from '@/lib/pdf-generator';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="#experience" className="text-foreground hover:text-primary transition-colors">
              Experience
            </a>
            <a href="#skills" className="text-foreground hover:text-primary transition-colors">
              Skills
            </a>
            <a href="#education" className="text-foreground hover:text-primary transition-colors">
              Education
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com/nickovivar" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://linkedin.com/in/nickovivar" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="mailto:nickovivar@gmail.com">
                <Mail className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="outline" onClick={generatePDF}>
              <Download className="mr-2 h-4 w-4" /> Download CV
            </Button>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </motion.header>
  );
}