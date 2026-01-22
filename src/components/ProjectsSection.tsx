import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

type Project = {
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  codeUrl?: string;
  thumbnail?: string;
};

// Real projects – timelines intentionally omitted on cards.
const PROJECTS: Project[] = [
  {
    title: 'LAW-GPT',
    description:
      'Python/React SaaS platform that uses fine‑tuned LLMs, secure authentication, and NLP pipelines to answer complex legal queries with chat-style UX.',
    technologies: [
      'Python',
      'React',
      'LangChain',
      'Node.js',
      'MongoDB',
      'NLP',
      'LLMs',
    ],
    liveUrl: 'https://lw-gpt.vercel.app/', // TODO: replace with your real live link
    codeUrl: 'https://github.com/your-username/law-gpt', // TODO: replace with your real repo
    thumbnail: 'lawgpt.png',
  },
  {
    title: 'DevTinder',
    description:
      'Full‑stack React/Node.js platform for swipe‑based developer matchmaking with JWT + cookie authentication, payments, college‑aware recommendations, and real‑time chat.',
    technologies: [
      'React',
      'Node.js',
      'Express',
      'JavaScript',
      'MongoDB',
      'Socket.io',
      'JWT',
    ],
    liveUrl: 'https://devtinder-iota.vercel.app/', // TODO: replace with your real live link
    codeUrl: 'https://github.com/Diwakar1706/devtinder', // TODO: replace with your real repo
    thumbnail: 'devtinder.png',
  },
  {
    title: 'LANDIT AI',
    description:
      'AI assistant that scrapes job postings, parses resumes with NLP, and generates personalized cold emails aligned to each role and candidate profile.',
    technologies: [
      'Python',
      'Flask',
      'NLP',
      'Gen AI',
      'Web Scraping',
      'REST APIs',
    ],
    liveUrl: 'https://your-landit-ai-demo-url.com', // TODO: replace with your real live link
    codeUrl: 'https://github.com/your-username/landit-ai', // TODO: replace with your real repo
    thumbnail: '/projects/landit-ai.png',
  },
];

/**
 * Responsive projects grid (3/2/1 columns) with hover effects
 * and external links for live demo + source code.
 */
const ProjectsSection = () => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {PROJECTS.map((project, index) => (
        <motion.article
          key={project.title}
          className="group flex flex-col overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/70 shadow-sm transition hover:border-sky-500/70 hover:shadow-soft-lg"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.4, delay: index * 0.06 }}
        >
          {/* Thumbnail */}
          <div className="relative aspect-[16/9] overflow-hidden">
            <div className="absolute inset-0 bg-slate-800/80" />
            {project.thumbnail ? (
              <img
                src={project.thumbnail}
                alt={`${project.title} screenshot`}
                loading="lazy"
                className="relative h-full w-full object-cover opacity-80 transition duration-300 group-hover:scale-[1.03] group-hover:opacity-100"
              />
            ) : (
              <div className="relative flex h-full items-center justify-center text-xs text-slate-400">
                Add screenshot in <code>/public/projects</code>
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
            <div>
              <h3 className="text-sm font-semibold text-slate-50 sm:text-base">
                {project.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-200">
                {project.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-slate-800/80 px-2.5 py-1 text-[11px] font-medium text-slate-200 ring-1 ring-slate-700/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex flex-wrap gap-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-sky-500 px-3 py-1.5 text-xs font-semibold text-slate-950 shadow-md transition hover:bg-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/80"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  View Live
                </a>
              )}
              {project.codeUrl && (
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-slate-700 bg-slate-950/80 px-3 py-1.5 text-xs font-semibold text-slate-100 shadow-sm transition hover:border-sky-400/80 hover:text-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/80"
                >
                  <Github className="h-3.5 w-3.5" />
                  View Code
                </a>
              )}
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
};

export default ProjectsSection;

