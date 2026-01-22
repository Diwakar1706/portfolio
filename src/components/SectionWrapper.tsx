import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SectionWrapperProps {
  id: string;
  title?: string;
  eyebrow?: string;
  children: ReactNode;
}

/**
 * Generic section wrapper that:
 * - Provides shared max-width and spacing
 * - Adds an optional eyebrow + title heading block
 * - Animates in with a subtle fade + slide when the section enters the viewport
 */
const SectionWrapper = ({ id, title, eyebrow, children }: SectionWrapperProps) => {
  return (
    <motion.section
      id={id}
      className="scroll-mt-28"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      viewport={{ once: false, amount: 0.25 }}
    >
      {(title || eyebrow) && (
        <header className="mb-8 max-w-3xl">
          {eyebrow && (
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-400">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
              {title}
            </h2>
          )}
        </header>
      )}
      {children}
    </motion.section>
  );
};

export default SectionWrapper;

