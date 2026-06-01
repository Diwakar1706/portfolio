import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

type EducationItem = {
  level: string;
  institution: string;
  boardOrUniversity: string;
  year: string;
  scoreLabel: string;
};

// Placeholder education – replace with your actual data.
const EDUCATION: EducationItem[] = [
  {
    level: 'B.Tech in Computer Science & Engineering',
    institution: 'Lakshmi Narain College of Technology and Science',
    boardOrUniversity: 'Bhopal, Madhya Pradesh',
    year: '2023 – 2027',
    scoreLabel: 'CGPA: 8 / 10 ',
  },
  {
    level: '12th Standard',
    institution: 'Kendriya Vidyalaya No.3, Bokaro Steel City',
    boardOrUniversity: 'CBSE ',
    year: '2022',
    scoreLabel: 'Percentage: 76% ',
  },
  {
    level: '10th Standard',
    institution: 'Kendriya Vidyalaya No.3, Bokaro Steel City',
    boardOrUniversity: 'CBSE ',
    year: '2020',
    scoreLabel: 'Percentage: 86% ',
  },
];

/**
 * Clean education timeline / card layout.
 */
const EducationSection = () => {
  return (
    <div className="space-y-4">
      {EDUCATION.map((item, index) => (
        <motion.article
          key={item.level}
          className="relative flex gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/70 p-4 shadow-sm backdrop-blur-sm sm:gap-4 sm:p-5"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
        >
          <div className="mt-1 hidden h-full w-px bg-slate-800/80 sm:block" />
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-2xl bg-slate-800 text-sky-300 sm:h-10 sm:w-10">
            <GraduationCap className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-50 sm:text-base">
              {item.level}
            </h3>
            <p className="mt-0.5 text-xs font-medium text-sky-300 sm:text-sm">
              {item.institution}
            </p>
            <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
              {item.boardOrUniversity} · {item.year}
            </p>
            <p className="mt-2 text-sm font-medium text-slate-200">
              {item.scoreLabel}
            </p>
          </div>
        </motion.article>
      ))}
    </div>
  );
};

export default EducationSection;

