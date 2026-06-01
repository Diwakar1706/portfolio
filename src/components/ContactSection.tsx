import type { FormEvent } from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, CheckCircle2, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

type Status = { type: 'success' | 'error'; message: string } | null;

/**
 * Contact section with EmailJS integration.
 *
 * Credentials are hard-coded for simplicity. Replace the values below with
 * the exact strings from the EmailJS dashboard (same account for all three):
 *
 *   SERVICE_ID  → Email Services → Service ID  (e.g. service_ctwq5zr)
 *   TEMPLATE_ID → Email Templates → Template ID (e.g. template_65j07sf)
 *   PUBLIC_KEY  → Account → API Keys → Public Key
 *   YOUR_EMAIL  → The inbox where you want to receive messages
 */
const SERVICE_ID = 'service_ctwq5zr';
const TEMPLATE_ID = 'template_65j07sf';
const PUBLIC_KEY = 'mo5l8DeLihqUs7qDD';
const YOUR_EMAIL = 'n13955181@gmail.com';

// Initialize EmailJS once with the public key so we can use the simple
// emailjs.send(serviceId, templateId, params) signature.
emailjs.init({ publicKey: PUBLIC_KEY });

const ContactSection = () => {
  const [status, setStatus] = useState<Status>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    // These keys must match the variable names defined in your EmailJS template.
    // In your template screenshot you are using: {{name}}, {{email}}, {{title}}, {{message}}.
    const payload = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      title: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    try {
      // Use the simple EmailJS signature that matches the official snippet:
      // emailjs.send('service_ctwq5zr', 'template_65j07sf', templateParams)
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, payload);

      setStatus({
        type: 'success',
        message: 'Thank you! Your message has been sent successfully.',
      });
      form.reset();
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatus({
        type: 'error',
        message:
          'Something went wrong while sending your message. Please try again or email me directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid gap-8 md:grid-cols-[minmax(0,1.3fr),minmax(0,1fr)]">
      {/* Form */}
      <motion.div
        className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-4 shadow-soft-lg backdrop-blur-sm sm:p-5"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.4 }}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="mb-1 block text-xs font-medium text-slate-200"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-100 outline-none ring-sky-500/40 placeholder:text-slate-500 focus:border-sky-400/80 focus:ring-2"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-xs font-medium text-slate-200"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-100 outline-none ring-sky-500/40 placeholder:text-slate-500 focus:border-sky-400/80 focus:ring-2"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="subject"
              className="mb-1 block text-xs font-medium text-slate-200"
            >
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              placeholder="How can I help you?"
              className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-100 outline-none ring-sky-500/40 placeholder:text-slate-500 focus:border-sky-400/80 focus:ring-2"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-1 block text-xs font-medium text-slate-200"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              minLength={10}
              rows={4}
              placeholder="Write your message here..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-100 outline-none ring-sky-500/40 placeholder:text-slate-500 focus:border-sky-400/80 focus:ring-2"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-sky-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-md transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Mail className="h-4 w-4" />
            {isSubmitting ? 'Sending…' : 'Send Message'}
          </button>

          {status && (
            <div
              className={`flex items-start gap-2 rounded-xl border px-3 py-2 text-xs ${
                status.type === 'success'
                  ? 'border-emerald-500/60 bg-emerald-500/10 text-emerald-200'
                  : 'border-rose-500/60 bg-rose-500/10 text-rose-200'
              }`}
            >
              {status.type === 'success' ? (
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" />
              ) : (
                <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
              )}
              <p>{status.message}</p>
            </div>
          )}
        </form>
      </motion.div>

      {/* Contact details + socials */}
      <motion.div
        className="space-y-4 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-4 shadow-sm backdrop-blur-sm sm:p-5"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Email
          </p>
          <a
            href={`mailto:${YOUR_EMAIL}`}
            className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-sky-300 hover:text-sky-200"
          >
            <Mail className="h-4 w-4" />
            {YOUR_EMAIL}
          </a>
          <p className="mt-2 text-xs text-slate-400">
            connect collaborate and develop together!
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Socials
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <a
              href="https://www.linkedin.com/in/diwakarshaw/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-950/80 px-3 py-1.5 text-xs font-medium text-slate-100 transition hover:border-sky-400/80 hover:text-sky-200"
            >
              <Linkedin className="h-3.5 w-3.5" />
              LinkedIn
            </a>
            <a
              href="https://github.com/Diwakar1706"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-950/80 px-3 py-1.5 text-xs font-medium text-slate-100 transition hover:border-sky-400/80 hover:text-sky-200"
            >
              <Github className="h-3.5 w-3.5" />
              GitHub
            </a>
            <a
              href="https://twitter.com/your-twitter"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-950/80 px-3 py-1.5 text-xs font-medium text-slate-100 transition hover:border-sky-400/80 hover:text-sky-200"
            >
              <Twitter className="h-3.5 w-3.5" />
              Twitter
            </a>
          </div>
        </div>

        <p className="text-[11px] text-slate-500">
         
        </p>
      </motion.div>
    </div>
  );
};

export default ContactSection;

