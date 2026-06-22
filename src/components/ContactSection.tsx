'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Phone, MessageCircle, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { WHATSAPP_LINK, BROKER_PHONE, BROKER_EMAIL, PHONE_HREF } from '@/lib/constants';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', phone: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const contacts = [
    {
      icon: Phone,
      label: 'Call Us',
      value: BROKER_PHONE || 'Not set',
      href: PHONE_HREF,
      color: 'emerald',
      description: 'Available 9am – 8pm daily',
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: 'Send a message',
      href: WHATSAPP_LINK,
      external: true,
      color: 'green',
      description: 'Fastest response channel',
    },
    {
      icon: Mail,
      label: 'Email',
      value: BROKER_EMAIL,
      href: `mailto:${BROKER_EMAIL}`,
      color: 'blue',
      description: 'For formal inquiries',
    },
  ];

  const colorMap = {
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    green: 'bg-[#25D366]/10 border-[#25D366]/20 text-[#25D366]',
    blue: 'bg-sky-500/10 border-sky-500/20 text-sky-400',
  };

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 pb-32 md:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-14 text-center"
      >
        <span className="section-label">Contact</span>
        <h2 className="mt-3 text-3xl font-bold text-white md:text-5xl">
          Get In <span className="text-gradient-emerald">Touch</span>
        </h2>
        <p className="mt-4 text-white/35 text-base max-w-md mx-auto">
          Call, WhatsApp, or drop a message. We get back to you fast — no waiting, no runaround.
        </p>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
        {/* Contact form */}
        <motion.form
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          onSubmit={handleSubmit}
          className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-white/[0.04] to-transparent p-7 md:p-9"
        >
          {/* Glow accent */}
          <div className="pointer-events-none absolute top-0 right-0 h-64 w-64 -translate-y-1/3 translate-x-1/3 rounded-full bg-emerald-500/5 blur-3xl" />

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center gap-4 py-16 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/15 border border-emerald-500/25">
                  <CheckCircle2 size={32} className="text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Message Sent!</h3>
                  <p className="mt-2 text-sm text-white/40">We'll get back to you within hours.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Send another →
                </button>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h3 className="mb-6 text-lg font-semibold text-white">Send us a message</h3>
                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-white/40">Your Name</label>
                    <div className={`relative rounded-xl border transition-all duration-200 ${
                      focused === 'name' ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-white/[0.08] bg-white/[0.03]'
                    }`}>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused(null)}
                        required
                        className="w-full rounded-xl bg-transparent px-4 py-3 text-sm text-white placeholder-white/20 outline-none"
                        placeholder="Rahul Sharma"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-white/40">Phone Number</label>
                    <div className={`relative rounded-xl border transition-all duration-200 ${
                      focused === 'phone' ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-white/[0.08] bg-white/[0.03]'
                    }`}>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        onFocus={() => setFocused('phone')}
                        onBlur={() => setFocused(null)}
                        required
                        className="w-full rounded-xl bg-transparent px-4 py-3 text-sm text-white placeholder-white/20 outline-none"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-white/40">Your Message</label>
                    <div className={`relative rounded-xl border transition-all duration-200 ${
                      focused === 'message' ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-white/[0.08] bg-white/[0.03]'
                    }`}>
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        onFocus={() => setFocused('message')}
                        onBlur={() => setFocused(null)}
                        rows={4}
                        className="w-full rounded-xl bg-transparent px-4 py-3 text-sm text-white placeholder-white/20 outline-none resize-none"
                        placeholder="I'm looking for a 2BHK in Kondapur, semi-furnished, available immediately..."
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="group flex w-full items-center justify-center gap-2.5 rounded-xl bg-emerald-600 py-3.5 text-sm font-semibold text-white transition-all hover:bg-emerald-500 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 glow-emerald"
                  >
                    <Send size={15} />
                    {status === 'submitting' ? 'Sending...' : 'Send Message'}
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </button>

                  {status === 'error' && (
                    <p className="text-center text-xs text-red-400">
                      Something went wrong. Please try again or call us directly.
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>

        {/* Contact cards */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-4"
        >
          {contacts.map((c, i) => {
            const Icon = c.icon;
            const colors = colorMap[c.color as keyof typeof colorMap];
            const isExternal = 'external' in c && c.external;
            return (
              <motion.a
                key={c.label}
                href={c.href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                className="group flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-gradient-to-br from-white/[0.04] to-transparent p-5 transition-all hover:border-white/[0.12] hover:bg-white/[0.05]"
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${colors}`}>
                  <Icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white/35 uppercase tracking-wider">{c.label}</p>
                  <p className="mt-0.5 text-sm font-semibold text-white truncate">{c.value}</p>
                  <p className="mt-0.5 text-xs text-white/25">{c.description}</p>
                </div>
                <ArrowRight size={14} className="text-white/20 transition-all group-hover:text-white/50 group-hover:translate-x-0.5 shrink-0" />
              </motion.a>
            );
          })}

          {/* Hours */}
          <div className="mt-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/25 mb-3">Hours</p>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-white/40">Mon – Sat</span>
                <span className="text-white/70 font-medium">9:00 AM – 8:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Sunday</span>
                <span className="text-white/70 font-medium">10:00 AM – 6:00 PM</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <div className="relative h-2 w-2">
                <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
                <div className="relative h-2 w-2 rounded-full bg-emerald-500" />
              </div>
              <span className="text-xs text-emerald-400 font-medium">Currently Open</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
