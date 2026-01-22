import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import type { SectionId } from '../App';

const navItems: { id: SectionId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

interface NavbarProps {
  activeSection: SectionId;
}

/**
 * Sticky, responsive navbar with active section highlighting
 * and smooth scrolling to sections. Includes a mobile hamburger
 * menu with touch-friendly targets.
 */
const Navbar = ({ activeSection }: NavbarProps) => {
  const [open, setOpen] = useState(false);

  const handleNavClick = (id: SectionId) => {
    const el = document.getElementById(id);
    if (!el) return;

    const navbarOffset = 88;
    const top =
      el.getBoundingClientRect().top + window.scrollY - navbarOffset;

    window.scrollTo({ top, behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={() => handleNavClick('home')}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-400 via-cyan-400 to-indigo-500 text-slate-950 font-semibold shadow-soft-lg">
            D
          </div>
          <div className="hidden flex-col sm:flex">
            <span className="text-sm font-semibold tracking-tight text-slate-50">
              Diwakar Shaw
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
              Full‑Stack Developer &nbsp;·&nbsp; AWS &nbsp;·&nbsp; AI/ML
            </span>
          </div>
        </div>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 rounded-full bg-slate-900/80 px-2 py-1 text-xs shadow-soft-lg ring-1 ring-slate-700/80 md:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`relative rounded-full px-3 py-1.5 font-medium tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/80 ${
                  isActive
                    ? 'text-sky-300'
                    : 'text-slate-300 hover:text-sky-200'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-sky-500/25 via-cyan-400/25 to-indigo-500/25"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/90 p-2 text-slate-100 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            {open ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-slate-800/80 bg-slate-950/95 px-4 pb-4 pt-2 shadow-soft-lg sm:px-6 lg:hidden">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-medium transition ${
                    isActive
                      ? 'bg-slate-800 text-sky-300'
                      : 'text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

