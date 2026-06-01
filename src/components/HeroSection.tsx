import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Points, PointMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';

/**
 * Simple, performant particle field using Three.js via React Three Fiber.
 * On mobile we render fewer particles for smoother performance.
 */
const ParticlesBackground = () => {
  const [positions, setPositions] = useState<Float32Array | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    const count = isMobile ? 1500 : 3500;
    const arr = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // random position within a sphere for a soft volumetric effect
      const radius = 1.4 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      arr[i * 3] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
    }

    setPositions(arr);
  }, [isMobile]);

  if (!positions) return null;

  return (
    <Points positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#38bdf8"
        size={isMobile ? 0.01 : 0.012}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
};

/**
 * Home / hero section with:
 * - Three.js particle background
 * - Name, title, about summary
 * - Avatar placeholder
 * - CTA button scrolling to contact section
 */
const HeroSection = () => {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (!el) return;
    const offset = 100;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <section className="hero-card relative overflow-hidden rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-5 py-8 shadow-soft-lg sm:px-8 sm:py-10 lg:flex lg:items-center lg:gap-10 lg:px-10 lg:py-12">
      {/* Three.js canvas background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Canvas
          camera={{ position: [0, 0, 2.4], fov: 65 }}
          dpr={[1, 1.8]}
        >
          <Suspense fallback={null}>
            <ParticlesBackground />
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              autoRotate
              autoRotateSpeed={0.3}
            />
          </Suspense>
        </Canvas>
        <div className="hero-canvas-overlay pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/20 to-slate-950/90" />
      </div>

      {/* Left: Text content */}
      <div className="relative flex-1 space-y-6">
        <motion.p
          className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-sky-300 ring-1 ring-sky-500/40 backdrop-blur"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          Open to opportunities
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="space-y-3"
        >
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
            Hi, I&apos;m{' '}
            <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              Diwakar Shaw
            </span>
            .
          </h1>
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-sky-300 sm:text-xs">
            Full‑Stack Developer &nbsp;·&nbsp; Problem Solver
          </p>
        </motion.div>

        <motion.p
          className="max-w-xl text-sm leading-relaxed text-slate-200 sm:text-base"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.4 }}
        >
          I&apos;m a passionate developer with a strong foundation in modern web
          technologies. I enjoy building clean, performant experiences and
          learning new tools quickly. This portfolio highlights my experience,
          projects, and the skills I&apos;m ready to bring to your team.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <button
            type="button"
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 rounded-full bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-md shadow-sky-500/40 transition hover:bg-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/80"
          >
            Contact Me
            <ArrowRight className="h-4 w-4" />
          </button>

          {/* Link to your resume file in /public (e.g. /resume.pdf) */}
          <a
            href="/resume.pdf"
            download="Diwakar_Resume.pdf"
            className="inline-flex items-center gap-2 rounded-full border border-slate-600/80 bg-slate-900/80 px-4 py-2 text-sm font-medium text-slate-100 shadow-sm backdrop-blur transition hover:border-sky-400/80 hover:text-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/80"
          >
            <Mail className="h-4 w-4" />
            get Resume
          </a>
        </motion.div>
      </div>

      {/* Right: Avatar / photo */}
      <motion.div
        className="relative mt-8 flex justify-center lg:mt-0 lg:w-[260px]"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.28, duration: 0.5 }}
      >
        <div className="hero-photo-card relative h-40 w-40 overflow-hidden rounded-3xl border border-sky-500/40 bg-slate-900/80 shadow-soft-lg backdrop-blur sm:h-44 sm:w-44 lg:h-56 lg:w-56">
          {/* Placeholder avatar – replace src with your photo in /public */}
          <img
            src="/diwakar.jpg"
            alt="Your avatar"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-sky-500/10" />
        </div>

        <div className="hero-role-badge pointer-events-none absolute -bottom-3 -left-3 rounded-2xl bg-slate-900/90 px-3 py-2 text-xs shadow-soft-lg ring-1 ring-slate-700/80">
          <p className="font-semibold text-slate-50">Full‑Stack Developer</p>
          <p className="text-[11px] text-slate-400">
            
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

