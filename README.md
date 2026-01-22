## Portfolio (React + Three.js)

Modern, responsive portfolio website for a fresher, built with **Vite + React + TypeScript**, **Three.js (via React Three Fiber)**, **Tailwind CSS**, **Framer Motion**, **Lucide icons**, and **EmailJS**.

### 1. Getting started

```bash
npm install
npm run dev
```

The site will be available at `http://localhost:5173` by default.

### 2. Project structure (important files)

- `src/App.tsx` – Root layout, section order, sticky navbar + back‑to‑top.
- `src/components/Navbar.tsx` – Sticky navbar, smooth scroll, active section highlight, mobile hamburger.
- `src/components/HeroSection.tsx` – Home section with Three.js particle background, intro, about text, avatar, and CTA.
- `src/components/ExperienceSection.tsx` – Internship cards + certificate modal/lightbox.
- `src/components/ProjectsSection.tsx` – Responsive project grid with live/code buttons and thumbnails.
- `src/components/SkillsSection.tsx` – 4 skill categories (Backend, Frontend, DevOps, Machine Learning).
- `src/components/EducationSection.tsx` – 3 education entries (B.Tech, 12th, 10th).
- `src/components/ContactSection.tsx` – Contact form with EmailJS + social links.
- `src/style.css` – Tailwind imports and small global tweaks.
- `tailwind.config.js` – Tailwind theme configuration (colors, fonts, shadows).

### 3. Customizing your content

- **Name, tagline, about text, CTA** – Edit `HeroSection.tsx`:
  - Replace `"Your Name"` and the about paragraph with your own details.
  - Replace `/avatar-placeholder.png` with your own photo (see assets section below).
- **Internships** – Edit the `INTERNSHIPS` array in `ExperienceSection.tsx`.
- **Projects** – Edit the `PROJECTS` array in `ProjectsSection.tsx` (titles, descriptions, tech tags, live/code URLs, thumbnails).
- **Skills** – Edit `SKILL_CATEGORIES` in `SkillsSection.tsx` (backend, frontend, DevOps, ML).
- **Education** – Edit the `EDUCATION` array in `EducationSection.tsx` for B.Tech, 12th, 10th.
- **Contact email & socials** – Update `YOUR_EMAIL` and the LinkedIn/GitHub/Twitter URLs in `ContactSection.tsx`.

All placeholder content is grouped in the top of each component file so it is easy to find and replace.

### 4. Setting up EmailJS (contact form)

1. Go to [`https://www.emailjs.com`](https://www.emailjs.com) and create an account.
2. Add an **Email Service** (e.g. Gmail, Outlook, custom SMTP) and note the **Service ID**.
3. Create an **Email Template** with variables:
   - `from_name`
   - `from_email`
   - `subject`
   - `message`
4. In the EmailJS dashboard, go to **Account** → **API Keys** and copy your **Public Key**.
5. Open `src/components/ContactSection.tsx` and replace the placeholders:

   ```ts
   const SERVICE_ID = 'YOUR_SERVICE_ID';
   const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
   const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
   const YOUR_EMAIL = 'youremail@example.com';
   ```

6. (Optional, recommended) Use environment variables instead of hard‑coding:

   - Create a `.env` file in the project root:

     ```env
     VITE_EMAILJS_SERVICE_ID=your_service_id
     VITE_EMAILJS_TEMPLATE_ID=your_template_id
     VITE_EMAILJS_PUBLIC_KEY=your_public_key
     VITE_CONTACT_EMAIL=youremail@example.com
     ```

   - Then, in `ContactSection.tsx`, read them via `import.meta.env.VITE_*`.

7. Run `npm run dev`, open the contact form, submit a test message, and verify it reaches your inbox.

### 5. Adding your images & certificates

Place static assets in the `public` folder so they are served directly:

- **Avatar/photo**
  - Save your image as `public/avatar-placeholder.png` (or change the path in `HeroSection.tsx`).
- **Project thumbnails**
  - Save screenshots under `public/projects/` (e.g. `public/projects/portfolio.png`) and update the `thumbnail` fields in `ProjectsSection.tsx`.
- **Internship certificates**
  - Save image or PDF files under `public/certificates/` (e.g. `public/certificates/internship-1.png` or `.pdf`).
  - Update the `certificateUrl` fields in `ExperienceSection.tsx`.
  - PDF certificates will show a button in the modal to open them in a new tab; images are previewed directly.

### 6. Three.js / performance notes

- The 3D background uses a **particle field** built with **React Three Fiber** and **@react-three/drei** (`HeroSection.tsx`):
  - On mobile screens, the particle count is automatically reduced for smoother performance.
  - Rendering is handled inside a `Canvas` with `dpr={[1, 1.8]}` to balance sharpness vs. performance.
- Components use `loading="lazy"` for images to improve initial load speed.
- The total JS bundle is relatively large because of Three.js and Framer Motion; for even smaller bundles you can:
  - Use dynamic `import()` for heavy sections (e.g. lazily load the Three.js hero on desktop only).
  - Reduce particle count further or simplify the 3D scene.

### 7. Responsive behavior

- **Navbar**
  - Sticky at the top with smooth scroll and active section highlighting.
  - On mobile, a hamburger menu toggles a full‑width menu with large touch targets.
- **Sections**
  - Projects: 3‑column grid on large screens, 2 on tablets, 1 on mobile.
  - Skills: 2 columns on desktop, stacked on small screens.
  - All buttons and cards are sized and spaced for comfortable use on touch devices.

### 8. Animations

- **Framer Motion** is used for:
  - Section fade‑in/slide‑in (`SectionWrapper.tsx`).
  - Navbar pill highlight and transitions (`Navbar.tsx`).
  - Hero content entrance and loading overlay (`App.tsx`, `HeroSection.tsx`).
  - Certificate modal transitions (`ExperienceSection.tsx`).
- Animations are kept lightweight to avoid jank, even on mid‑range mobile devices.

### 9. Building for production

```bash
npm run build
npm run preview
```

This compiles the app into the `dist` folder and serves a local preview. You can deploy `dist` to any static hosting provider (Vercel, Netlify, GitHub Pages, etc.).

