import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, Loader2 } from 'lucide-react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import EducationSection from './components/EducationSection';
import ContactSection from './components/ContactSection';
import SectionWrapper from './components/SectionWrapper';

const sections = [
  'home',
  'experience',
  'projects',
  'skills',
  'education',
  'contact',
] as const;

export type SectionId = (typeof sections)[number];

/**
 * Root application component.
 * Handles:
 * - Global layout & background styling
 * - Sticky navbar + active section tracking
 * - Back-to-top button visibility
 * - Initial loading animation
 */
function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initial splash loader for a more polished first impression
  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timeout);
  }, []);

  // Track scroll position for active section + back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollTop(scrollY > 400);

      const offset = 96; // navbar height offset

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY - offset;
        const bottom = top + rect.height;
        if (scrollY >= top && scrollY < bottom) {
          setActiveSection(id);
        }
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100 font-sans">
      {/* Initial lightweight loading overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              <Loader2 className="h-10 w-10 animate-spin text-sky-400" />
              <p className="text-sm tracking-wide text-slate-300">
                Preparing your portfolio…
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky navbar */}
      <Navbar activeSection={activeSection} />

      {/* Main content */}
      <main className="mx-auto flex max-w-6xl flex-col gap-24 px-4 pb-24 pt-28 sm:px-6 lg:px-8 lg:gap-28 lg:pt-32">
        <SectionWrapper id="home">
          <HeroSection />
        </SectionWrapper>

        <SectionWrapper id="experience" title="Experience" eyebrow="Internships">
          <ExperienceSection />
        </SectionWrapper>

        <SectionWrapper id="projects" title="Projects" eyebrow="Featured Work">
          <ProjectsSection />
        </SectionWrapper>

        <SectionWrapper id="skills" title="Skills" eyebrow="What I Work With">
          <SkillsSection />
        </SectionWrapper>

        <SectionWrapper id="education" title="Education" eyebrow="Academic Journey">
          <EducationSection />
        </SectionWrapper>

        <SectionWrapper id="contact" title="Contact" eyebrow="Let’s Talk">
          <ContactSection />
        </SectionWrapper>
      </main>

      {/* Back-to-top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            type="button"
            onClick={scrollToTop}
            className="fixed bottom-6 right-4 z-30 rounded-full bg-slate-900/80 p-3 text-sky-400 shadow-soft-lg backdrop-blur transition hover:bg-slate-800 sm:bottom-8 sm:right-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

