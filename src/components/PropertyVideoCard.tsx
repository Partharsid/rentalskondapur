'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Home, MapPin, Maximize2, Layers, ArrowUpRight } from 'lucide-react';
import type { Property } from '@/lib/types';
import { BROKER_PHONE, WHATSAPP_NUMBER } from '@/lib/constants';
import Link from 'next/link';

export default function PropertyVideoCard({ property }: { property: Property }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView && videoRef.current && property.video_url) {
      videoRef.current.play().catch(() => {});
    }
  }, [isInView, property.video_url]);

  const propertyWhatsAppLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi! I'm interested in "${property.name}" (${property.bhk}, ₹${property.rent?.toLocaleString()}/month) in ${property.location}. Please share more details.`
  )}`;

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d1117] transition-all duration-300"
      style={{
        boxShadow: isHovered
          ? '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(16,185,129,0.15)'
          : '0 4px 20px rgba(0,0,0,0.4)',
      }}
    >
      {/* Media area */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#0d1117]">
        {/* Loading shimmer */}
        {!videoLoaded && !videoError && property.video_url && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0d1117]">
            <div className="relative">
              <div className="h-10 w-10 rounded-full border-2 border-emerald-500/20 border-t-emerald-500 animate-spin" />
              <div className="absolute inset-0 h-10 w-10 rounded-full border-2 border-emerald-500/10 animate-pulse" />
            </div>
          </div>
        )}

        {/* Video / fallback */}
        {property.video_url && !videoError ? (
          <motion.video
            ref={videoRef}
            src={property.video_url}
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => setVideoError(true)}
            onCanPlay={() => setVideoLoaded(true)}
            animate={{ scale: isHovered ? 1.06 : 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0d1117] to-[#161b22]">
            <Home size={48} className="text-white/10" />
          </div>
        )}

        {/* Gradient overlay */}
        <div className="video-overlay" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-emerald-500/80 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-bold text-white tracking-wide border border-emerald-400/20">
            {property.bhk}
          </span>
          <span
            className={`rounded-full backdrop-blur-md px-2.5 py-0.5 text-[11px] font-bold tracking-wide border ${
              property.available_now
                ? 'bg-green-500/70 text-white border-green-400/20'
                : 'bg-red-500/70 text-white border-red-400/20'
            }`}
          >
            {property.available_now ? '● Available' : '● Rented'}
          </span>
        </div>

        {/* Top right — view detail */}
        <div className="absolute top-3 right-3">
          <Link
            href={`/properties/${property.slug}`}
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-black/40 backdrop-blur-md border border-white/10 text-white/60 opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10 hover:text-white"
          >
            <ArrowUpRight size={13} />
          </Link>
        </div>

        {/* Bottom price overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-black text-white leading-none">
                ₹{property.rent?.toLocaleString()}
                <span className="text-sm font-normal text-white/50 ml-1">/mo</span>
              </p>
              {property.deposit && (
                <p className="mt-0.5 text-xs text-white/35">
                  Deposit: ₹{property.deposit?.toLocaleString()}
                </p>
              )}
            </div>
            {property.sqft && (
              <span className="flex items-center gap-1 text-xs text-white/40">
                <Maximize2 size={10} />
                {property.sqft} sq.ft
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-4 p-4">
        {/* Title + location */}
        <div>
          <h3 className="text-base font-semibold text-white leading-tight">{property.name}</h3>
          <div className="mt-1.5 flex items-center gap-1 text-xs text-white/35">
            <MapPin size={11} />
            <span>{property.location}{property.area ? `, ${property.area}` : ''}</span>
          </div>
          {property.floor && (
            <div className="mt-1 flex items-center gap-1 text-xs text-white/30">
              <Layers size={11} />
              <span>{property.floor}</span>
            </div>
          )}
        </div>

        {/* Amenities */}
        {property.amenities?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {property.amenities.slice(0, 3).map((a) => (
              <span
                key={a}
                className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[10px] text-white/40 font-medium"
              >
                {a}
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[10px] text-white/30 font-medium">
                +{property.amenities.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="mt-auto flex gap-2">
          <a
            href={`tel:${BROKER_PHONE}`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-emerald-500/20 bg-emerald-500/8 py-2.5 text-xs font-semibold text-emerald-400 transition-all hover:bg-emerald-500/15 hover:border-emerald-500/30"
          >
            <Phone size={13} />
            Call
          </a>
          <a
            href={propertyWhatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#25D366]/20 bg-[#25D366]/8 py-2.5 text-xs font-semibold text-[#25D366] transition-all hover:bg-[#25D366]/15 hover:border-[#25D366]/30"
          >
            <MessageCircle size={13} />
            WhatsApp
          </a>
          <Link
            href={`/properties/${property.slug}`}
            className="flex items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 text-xs font-semibold text-white/40 transition-all hover:bg-white/[0.06] hover:text-white/70"
          >
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
