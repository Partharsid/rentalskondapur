'use client';

import { useRef, useState, useEffect } from 'react';
import { Phone, MessageCircle, Home, MapPin } from 'lucide-react';
import type { Property } from '@/lib/types';
import { BROKER_PHONE, WHATSAPP_NUMBER } from '@/lib/constants';

export default function PropertyVideoCard({ property }: { property: Property }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

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

  const phoneNumber = BROKER_PHONE || '#';

  return (
    <div
      ref={cardRef}
      className="group video-card h-full flex flex-col"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-obsidian">
        {!videoLoaded && !videoError && property.video_url && (
          <div className="absolute inset-0 flex items-center justify-center bg-matte z-10">
            <div className="h-8 w-8 animate-pulse rounded-full bg-emerald-500/30" />
          </div>
        )}
        {property.video_url && !videoError ? (
          <video
            ref={videoRef}
            src={property.video_url}
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => setVideoError(true)}
            onCanPlay={() => setVideoLoaded(true)}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-matte">
            <Home size={48} className="text-white/20" />
          </div>
        )}
        <div className="video-overlay" />

        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
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

        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <p className="text-2xl font-bold text-white drop-shadow-lg">
            ₹{property.rent?.toLocaleString()}
            <span className="text-sm font-normal text-white/70">/mo</span>
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-3 p-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{property.name}</h3>
          <div className="mt-1 flex items-center gap-1 text-sm text-white/40">
            <MapPin size={14} />
            <span>{property.location}{property.area ? `, ${property.area}` : ''}</span>
          </div>
          {property.sqft && (
            <p className="mt-1 text-sm text-white/50">{property.sqft} sq.ft</p>
          )}
          {property.floor && (
            <p className="text-sm text-white/40">{property.floor}</p>
          )}
        </div>

        <div className="flex gap-2">
          <a
            href={`tel:${phoneNumber}`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-emerald-600/20 py-2.5 text-xs font-semibold text-emerald-400 transition-all hover:bg-emerald-600/30"
          >
            <Phone size={14} />
            Call
          </a>
          {propertyWhatsAppLink !== '#' && (
            <a
              href={propertyWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#25D366]/20 py-2.5 text-xs font-semibold text-[#25D366] transition-all hover:bg-[#25D366]/30"
            >
              <MessageCircle size={14} />
              WhatsApp
            </a>
          )}
        </div>
      </div>
    </div>
  );
}