import Link from 'next/link';
import { SITE_NAME } from '@/lib/constants';
import { Building2, Instagram, Youtube, Phone, Mail, MapPin } from 'lucide-react';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/properties', label: 'Properties' },
  { href: '/about', label: 'About' },
];

const socialLinks = [
  {
    href: 'https://www.instagram.com/flats_for_rent_sale_hyderabad?utm_source=qr&igsh=MWt2M3JuOTMxaHQyNA==',
    label: 'Instagram',
    icon: Instagram,
    color: 'hover:text-[#E1306C]',
  },
  {
    href: 'https://youtube.com/@prproperties-je9bc?si=lxZKyF-duS0XlAa1',
    label: 'YouTube',
    icon: Youtube,
    color: 'hover:text-[#FF0000]',
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.05] bg-[#060810]">
      {/* Top section */}
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-10 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <Building2 size={16} className="text-emerald-400" />
              </div>
              <span className="text-base font-bold tracking-tight">
                <span className="text-white">RENTALS </span>
                <span className="text-gradient-emerald">KONDAPUR</span>
              </span>
            </Link>
            <p className="text-sm text-white/35 leading-relaxed max-w-xs">
              Premium rental properties in Kondapur, Hyderabad. Zero visiting fee,
              only brokerage. Your perfect home is just a call away.
            </p>
            {/* Social */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-white/35 transition-all ${s.color} hover:border-white/[0.12]`}
                    aria-label={s.label}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/25">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/45 hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/25">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-white/40">
                <MapPin size={14} className="text-white/20 mt-0.5 shrink-0" />
                <span>Kondapur, Hyderabad<br />Telangana, India</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/40">
                <Phone size={14} className="text-white/20 shrink-0" />
                <a href="tel:+917971442220" className="hover:text-emerald-400 transition-colors">
                  +91 79714 42220
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/40">
                <Mail size={14} className="text-white/20 shrink-0" />
                <a href="mailto:rentalskondapur@email.com" className="hover:text-emerald-400 transition-colors truncate">
                  rentalskondapur@email.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.04]">
        <div className="mx-auto max-w-7xl px-4 py-5 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-white/20">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] text-white/20">Serving Kondapur since 2022</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
