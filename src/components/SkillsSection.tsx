import { motion } from 'framer-motion';
import React from 'react';
import { Braces, Cloud, Cpu, LayoutTemplate, Server } from 'lucide-react';

type SkillCategory = {
  name: string;
  icon: React.ReactNode;
  skills: string[];
};

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Backend',
    icon: <Server className="h-4 w-4" />,
    skills: [
      'Node.js',
      'Express.js',
      'MongoDB',
      'MySQL',
      'AWS',
      'Cognito',
      'DynamoDB',
      'MERN Stack',
    ],
  },
  {
    name: 'Frontend',
    icon: <LayoutTemplate className="h-4 w-4" />,
    skills: [
      'React.js',
      'Next.js',
      'React Native',
      'JavaScript',
      'TypeScript',
      'Tailwind CSS',
    ],
  },
  {
    name: 'Languages',
    icon: <Cpu className="h-4 w-4" />,
    skills: ['Java', 'C', 'C++', 'Python', 'JavaScript', 'TypeScript'],
  },
  {
    name: 'Tools & AI/ML',
    icon: <Cloud className="h-4 w-4" />,
    skills: [
      'TensorFlow',
      'PyTorch',
      'LangChain',
      'OpenCV',
      'NLP',
      'Generative AI',
      'Git',
      'GitHub',
      'Postman',
    ],
  },
];

/**
 * Skills section with four clearly separated categories and
 * badges for individual tools/technologies.
 */
const SkillsSection = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {SKILL_CATEGORIES.map((category, index) => (
        <motion.div
          key={category.name}
          className="flex flex-col rounded-2xl border border-slate-800/80 bg-slate-900/70 p-4 shadow-sm backdrop-blur-sm"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
        >
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-slate-800 text-sky-300">
              {category.icon}
            </div>
            <h3 className="text-sm font-semibold text-slate-50 sm:text-base">
              {category.name}
            </h3>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {category.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 rounded-full bg-slate-800/80 px-2.5 py-1 text-[11px] font-medium text-slate-100 ring-1 ring-slate-700/80"
              >
                <Braces className="h-3 w-3 text-sky-300" />
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SkillsSection;

