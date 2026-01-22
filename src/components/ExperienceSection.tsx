import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';

type Internship = {
  role: string;
  company: string;
  duration: string;
  description: string;
  technologies: string[];
  certificateUrl?: string;
};

// Real internship data – Kalpvrik Technologies only.
const INTERNSHIPS: Internship[] = [
  {
    role: 'SDE Intern',
    company: 'Kalpvrik Technologies Private Limited',
    duration: 'Nov 2025 – Jan 2026 · Remote',
    description:
      'Working on React Native UI, AWS Cognito with DynamoDB, and real-time AI chat to improve performance, reliability, and engagement.',
    technologies: [
      'React Native',
      'TypeScript',
      'AWS Cognito',
      'DynamoDB',
      'WebSockets',
      'AI/ML',
    ],
    // Put your actual certificate file at: public/certificates/kalpvrik-sde-intern.pdf (or change the path below)
    certificateUrl: '/certificates/kalpvrik-sde-intern.pdf',
  },
];

/**
 * Experience section showing internship cards with a small
 * modal/lightbox to preview certificates (image/PDF opened in new tab).
 */
const ExperienceSection = () => {
  const [selected, setSelected] = useState<Internship | null>(null);

  const openCertificate = (internship: Internship) => {
    if (!internship.certificateUrl) return;
    setSelected(internship);
  };

  const closeModal = () => setSelected(null);

  return (
    <div className="space-y-6">
      <div className="relative border-l border-slate-800/80 pl-4 sm:pl-6">
        <div className="absolute -left-[3px] top-1 h-2 w-2 rounded-full bg-sky-400" />
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
          
        </p>

        <div className="space-y-4">
          {INTERNSHIPS.map((internship, index) => (
            <motion.article
              key={internship.company + internship.role}
              className="relative rounded-2xl border border-slate-800/80 bg-slate-900/70 p-4 shadow-sm backdrop-blur-sm transition hover:border-sky-500/60 hover:shadow-soft-lg sm:p-5"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <h3 className="text-sm font-semibold text-slate-50 sm:text-base">
                {internship.role}
              </h3>
              <p className="mt-0.5 text-xs font-medium text-sky-300 sm:text-sm">
                {internship.company}
              </p>
              <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
                {internship.duration}
              </p>

              <p className="mt-3 text-sm leading-relaxed text-slate-200">
                {internship.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {internship.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-slate-800/80 px-2.5 py-1 text-[11px] font-medium text-slate-200 ring-1 ring-slate-700/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {internship.certificateUrl && (
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => openCertificate(internship)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/60 bg-slate-950/80 px-3 py-1.5 text-xs font-semibold text-sky-200 shadow-sm transition hover:bg-sky-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/80"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    View Certificate
                  </button>
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>

      {/* Certificate modal / lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/80 px-4 py-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative max-h-full w-full max-w-xl overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-900 shadow-soft-lg"
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <header className="flex items-start justify-between border-b border-slate-800 px-4 py-3 sm:px-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Internship Certificate
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-50">
                    {selected.role} · {selected.company}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-full p-1 text-slate-300 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/80"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </header>

              <div className="max-h-[70vh] overflow-auto bg-slate-950/80 p-4 sm:p-5">
                {/* If the file is a PDF, we prefer to open it in a new tab. */}
                {selected.certificateUrl?.toLowerCase().endsWith('.pdf') ? (
                  <div className="space-y-3 text-sm text-slate-200">
                    <p>
                      This certificate is a PDF. Click the button below to open
                      it in a new tab.
                    </p>
                    <a
                      href={selected.certificateUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-sky-500 px-3 py-1.5 text-xs font-semibold text-slate-950 shadow-md transition hover:bg-sky-400"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Open PDF Certificate
                    </a>
                  </div>
                ) : (
                  <img
                    src={selected.certificateUrl}
                    alt="Internship certificate"
                    className="mx-auto max-h-[60vh] w-full rounded-lg object-contain"
                    loading="lazy"
                  />
                )}

                <p className="mt-3 text-[11px] text-slate-500">
                  {/* Guidance for you when configuring assets */}
                  Place your certificate files inside the{' '}
                  <span className="font-semibold text-slate-300">public</span>{' '}
                  folder, e.g. <code>/public/certificates/internship-1.png</code>,
                  and update the URLs in <code>ExperienceSection.tsx</code>.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExperienceSection;

