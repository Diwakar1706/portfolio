import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, Loader2 } from 'lucide-react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TechMarquee from './components/TechMarquee';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import CodingStreak from './components/CodingStreak.jsx';
import EducationSection from './components/EducationSection';
import ContactSection from './components/ContactSection';
import SectionWrapper from './components/SectionWrapper';

const sections = [
  'home',
  'experience',
  'projects',
  'skills',
  'profile',
  'education',
  'contact',
] as const;

export type SectionId = (typeof sections)[number];
export type ThemeMode = 'dark' | 'light';

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
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'dark';
    return (localStorage.getItem('theme') as ThemeMode) || 'dark';
  });

  // Initial splash loader for a more polished first impression
  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

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

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === 'dark' ? 'light' : 'dark',
    );
  };

  const isDarkTheme = theme === 'dark';

  return (
    <div
      data-theme={theme}
      className={`min-h-screen font-sans transition-colors duration-300 ${
        isDarkTheme
          ? 'bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100'
          : 'bg-gradient-to-b from-slate-50 via-white to-sky-50 text-slate-950'
      }`}
    >
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
      <Navbar
        activeSection={activeSection}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main content */}
      <main className="mx-auto flex max-w-6xl flex-col gap-24 px-4 pb-24 pt-28 sm:px-6 lg:px-8 lg:gap-28 lg:pt-32">
        <SectionWrapper id="home">
          <HeroSection />
          <div className="mt-8">
            <TechMarquee />
          </div>
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

        <SectionWrapper id="profile" title="Coding Activity" eyebrow="Profile">
          <CodingStreak />
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
              className={`fixed bottom-6 right-4 z-30 rounded-full p-3 shadow-soft-lg backdrop-blur transition sm:bottom-8 sm:right-6 ${
                isDarkTheme
                  ? 'bg-slate-900/80 text-sky-400 hover:bg-slate-800'
                  : 'bg-white/85 text-sky-600 ring-1 ring-slate-200 hover:bg-slate-100'
              }`}
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

