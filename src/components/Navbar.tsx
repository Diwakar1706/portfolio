import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
import type { SectionId, ThemeMode } from '../App';

const navItems: { id: SectionId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'profile', label: 'Profile' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

interface NavbarProps {
  activeSection: SectionId;
  theme: ThemeMode;
  onToggleTheme: () => void;
}

const Navbar = ({ activeSection, theme, onToggleTheme }: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const isDarkTheme = theme === 'dark';

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
    <header
      className={`fixed inset-x-0 top-0 z-30 border-b backdrop-blur transition-colors duration-300 ${
        isDarkTheme
          ? 'border-slate-800/80 bg-slate-950/80'
          : 'border-slate-200 bg-white/80'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={() => handleNavClick('home')}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-400 via-cyan-400 to-indigo-500 font-semibold text-slate-950 shadow-soft-lg">
            D
          </div>
          <div className="hidden flex-col sm:flex">
            <span
              className={`text-sm font-semibold tracking-tight ${
                isDarkTheme ? 'text-slate-50' : 'text-slate-950'
              }`}
            >
              Diwakar Shaw
            </span>
            <span
              className={`text-[11px] font-medium uppercase tracking-[0.16em] ${
                isDarkTheme ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              Full-Stack Developer · AWS · AI/ML
            </span>
          </div>
        </div>

        <div
          className={`hidden items-center gap-1 rounded-full px-2 py-1 text-xs shadow-soft-lg ring-1 md:flex ${
            isDarkTheme
              ? 'bg-slate-900/80 ring-slate-700/80'
              : 'bg-white/90 ring-slate-200'
          }`}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`relative rounded-full px-3 py-1.5 font-medium tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/80 ${
                  isActive
                    ? isDarkTheme
                      ? 'text-sky-300'
                      : 'text-sky-700'
                    : isDarkTheme
                      ? 'text-slate-300 hover:text-sky-200'
                      : 'text-slate-600 hover:text-sky-700'
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

          <button
            type="button"
            onClick={onToggleTheme}
            className={`ml-1 inline-flex h-8 w-8 items-center justify-center rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/80 ${
              isDarkTheme
                ? 'bg-slate-800 text-amber-300 hover:bg-slate-700'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
            aria-label={`Switch to ${isDarkTheme ? 'light' : 'dark'} theme`}
            title={`Switch to ${isDarkTheme ? 'light' : 'dark'} theme`}
          >
            {isDarkTheme ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            className={`inline-flex items-center justify-center rounded-full border p-2 shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
              isDarkTheme
                ? 'border-slate-700 bg-slate-900/90 text-amber-300'
                : 'border-slate-200 bg-white/90 text-slate-700'
            }`}
            onClick={onToggleTheme}
            aria-label={`Switch to ${isDarkTheme ? 'light' : 'dark'} theme`}
          >
            {isDarkTheme ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          <button
            type="button"
            className={`inline-flex items-center justify-center rounded-full border p-2 shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
              isDarkTheme
                ? 'border-slate-700 bg-slate-900/90 text-slate-100'
                : 'border-slate-200 bg-white/90 text-slate-700'
            }`}
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

      {open && (
        <div
          className={`border-t px-4 pb-4 pt-2 shadow-soft-lg sm:px-6 lg:hidden ${
            isDarkTheme
              ? 'border-slate-800/80 bg-slate-950/95'
              : 'border-slate-200 bg-white/95'
          }`}
        >
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
                      ? isDarkTheme
                        ? 'bg-slate-800 text-sky-300'
                        : 'bg-sky-50 text-sky-700'
                      : isDarkTheme
                        ? 'text-slate-200 hover:bg-slate-900'
                        : 'text-slate-700 hover:bg-slate-100'
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
