'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Home, Phone, MessageCircle, ChevronDown, Heart, GitCompare } from 'lucide-react';
import type { Property } from '@/lib/types';
import { WHATSAPP_LINK, BROKER_PHONE, PHONE_HREF, WHATSAPP_NUMBER } from '@/lib/constants';
import { useUserPreferences } from '@/context/UserPreferencesContext';

export default function PropertyDetailClient({ property }: { property: Property }) {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const { isFavorite, toggleFavorite, isComparing, addToCompare, removeFromCompare, compareList } = useUserPreferences();
  const favorite = isFavorite(property.slug);
  const comparing = isComparing(property.slug);

  const handleCompareClick = () => {
    if (comparing) {
      removeFromCompare(property.slug);
    } else {
      if (compareList.length >= 3) {
        alert('You can only compare up to 3 properties at a time.');
        return;
      }
      addToCompare(property);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, property_slug: property.slug }),
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

  const propertyWhatsAppLink = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi! I'm interested in "${property.name}" (${property.bhk}, ₹${property.rent?.toLocaleString()}/month) in ${property.location}. Please share more details.`
  )}`
    : '#';

  const faqs = [
    { q: 'Is there a visiting fee?', a: 'No. We do not charge any visiting fee. Only brokerage applies upon finalizing the property.' },
    { q: 'What is the brokerage charge?', a: 'Brokerage is typically one month\'s rent. This is clearly communicated upfront with no hidden charges.' },
    { q: 'Can I get a video walkthrough?', a: 'Yes! Every property listing includes a video walkthrough so you can preview before visiting.' },
    { q: 'What documents are needed?', a: 'You\'ll need Aadhaar card, PAN card, and employment proof. We\'ll guide you through the process.' },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-20">
      <div className="grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative aspect-video overflow-hidden rounded-2xl bg-obsidian"
          >
            {property.video_url ? (
              <video
                src={property.video_url}
                muted
                autoPlay
                loop
                playsInline
                controls
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Home size={64} className="text-white/20" />
              </div>
            )}
            <div className="absolute top-3 left-3 flex gap-2">
              <span className="rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                {property.bhk}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm ${
                  property.available_now
                    ? 'bg-emerald-500/90 text-white'
                    : 'bg-red-500/80 text-white'
                }`}
              >
                {property.available_now ? 'Available' : 'Rented'}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6"
          >
            <h1 className="text-3xl font-bold text-white md:text-4xl">{property.name}</h1>
            <div className="mt-2 flex items-center gap-1 text-white/50">
              <MapPin size={16} />
              <span>{property.location}{property.area ? `, ${property.area}` : ''}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              {property.sqft && (
                <div className="glass rounded-xl px-4 py-2">
                  <p className="text-white/40">Area</p>
                  <p className="font-semibold text-white">{property.sqft} sq.ft</p>
                </div>
              )}
              {property.floor && (
                <div className="glass rounded-xl px-4 py-2">
                  <p className="text-white/40">Floor</p>
                  <p className="font-semibold text-white">{property.floor}</p>
                </div>
              )}
              {property.deposit && (
                <div className="glass rounded-xl px-4 py-2">
                  <p className="text-white/40">Deposit</p>
                  <p className="font-semibold text-white">₹{property.deposit.toLocaleString()}</p>
                </div>
              )}
            </div>
            {property.description && (
              <p className="mt-6 text-white/60 leading-relaxed">{property.description}</p>
            )}
          </motion.div>

          {property.amenities && property.amenities.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <h2 className="text-xl font-semibold text-white mb-4">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((a) => (
                  <span key={a} className="glass rounded-full px-4 py-1.5 text-sm text-white/70">
                    {a}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="glass rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between px-5 py-4 text-left text-white/80 hover:text-white transition-colors"
                  >
                    <span className="font-medium">{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 text-sm text-white/50 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="sticky top-24 glass rounded-2xl p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="text-3xl font-bold text-white">
                ₹{property.rent?.toLocaleString()}
                <span className="text-base font-normal text-white/40 block sm:inline"> /month</span>
              </p>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => toggleFavorite(property.slug)}
                  className={`p-2.5 rounded-xl transition-colors ${favorite ? 'bg-red-500/20 text-red-500' : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'}`}
                  title={favorite ? 'Remove from Favorites' : 'Add to Favorites'}
                >
                  <Heart size={20} fill={favorite ? 'currentColor' : 'none'} />
                </button>
                <button
                  onClick={handleCompareClick}
                  className={`p-2.5 rounded-xl transition-colors ${comparing ? 'bg-blue-500/20 text-blue-500' : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'}`}
                  title={comparing ? 'Remove from Compare' : 'Add to Compare'}
                >
                  <GitCompare size={20} />
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href={PHONE_HREF}
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 font-semibold text-white transition-all hover:bg-emerald-500 glow-emerald"
              >
                <Phone size={18} />
                Call Now
              </a>
              <a
                href={propertyWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 font-semibold text-white transition-all hover:bg-[#20BD5A]"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
            </div>

            <div className="mt-8">
              <h3 className="mb-4 text-sm font-semibold text-white/60 uppercase tracking-wider">
                Send Inquiry
              </h3>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  placeholder="Your name"
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500/50"
                />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                  placeholder="Your phone"
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500/50"
                />
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={3}
                  placeholder="Message (optional)"
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500/50 resize-none"
                />
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10 disabled:opacity-50"
                >
                  {status === 'submitting' ? 'Sending...' : 'Send'}
                </button>
                {status === 'success' && (
                  <p className="text-xs text-emerald-400 text-center">Inquiry sent!</p>
                )}
                {status === 'error' && (
                  <p className="text-xs text-red-400 text-center">Failed to send. Try again.</p>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}