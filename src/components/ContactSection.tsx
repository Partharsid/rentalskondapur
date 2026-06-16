'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, MessageCircle, Mail } from 'lucide-react';
import { WHATSAPP_LINK, BROKER_PHONE, BROKER_EMAIL, PHONE_HREF } from '@/lib/constants';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

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

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 pb-32 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl font-bold text-white md:text-5xl">
          Get In <span className="text-gradient-emerald">Touch</span>
        </h2>
        <p className="mt-4 text-white/40 text-lg">
          Call, WhatsApp, or drop a message. We&apos;ll get back to you ASAP.
        </p>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-2">
        <motion.form
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-6 md:p-8"
        >
          <div className="mb-4">
            <label className="mb-2 block text-sm text-white/60">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none transition-colors focus:border-emerald-500/50"
              placeholder="Your name"
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm text-white/60">Phone</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none transition-colors focus:border-emerald-500/50"
              placeholder="Your phone number"
            />
          </div>
          <div className="mb-6">
            <label className="mb-2 block text-sm text-white/60">Message</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={4}
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none transition-colors focus:border-emerald-500/50 resize-none"
              placeholder="I'm looking for..."
            />
          </div>
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 font-semibold text-white transition-all hover:bg-emerald-500 disabled:opacity-50 glow-emerald"
          >
            <Send size={18} />
            {status === 'submitting' ? 'Sending...' : 'Send Message'}
          </button>
          {status === 'success' && (
            <p className="mt-3 text-center text-sm text-emerald-400">
              Message sent! We&apos;ll contact you shortly.
            </p>
          )}
          {status === 'error' && (
            <p className="mt-3 text-center text-sm text-red-400">
              Something went wrong. Please try again.
            </p>
          )}
        </motion.form>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4"
        >
          <a
            href={PHONE_HREF}
            className="glass flex items-center gap-4 rounded-2xl p-6 transition-all hover:bg-white/5"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600/20">
              <Phone size={22} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-white/40">Call Us</p>
              <p className="font-semibold text-white">{BROKER_PHONE || 'Not set'}</p>
            </div>
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="glass flex items-center gap-4 rounded-2xl p-6 transition-all hover:bg-white/5"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#25D366]/20">
              <MessageCircle size={22} className="text-[#25D366]" />
            </div>
            <div>
              <p className="text-sm text-white/40">WhatsApp</p>
              <p className="font-semibold text-white">Send a message</p>
            </div>
          </a>
          <div className="glass flex items-center gap-4 rounded-2xl p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5">
              <Mail size={22} className="text-white/40" />
            </div>
            <div>
              <p className="text-sm text-white/40">Email</p>
              <p className="font-semibold text-white">{BROKER_EMAIL}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}