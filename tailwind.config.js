/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: '#020617',
        surface: '#020617',
        primary: {
          DEFAULT: '#38bdf8',
          foreground: '#0f172a',
        },
        accent: '#6366f1',
      },
      boxShadow: {
        'soft-lg': '0 22px 45px rgba(15,23,42,0.85)',
      },
    },
  },
  plugins: [],
};

