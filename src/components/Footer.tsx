import Link from 'next/link';
import { SITE_NAME } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-deep">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-xl font-bold tracking-tight">
              <span className="text-white">RENTALS </span>
              <span className="text-gradient-emerald">KONDAPUR</span>
            </h3>
            <p className="mt-3 text-sm text-white/40 leading-relaxed">
              Premium rental properties in Kondapur, Hyderabad. No visiting fee,
              only brokerage. Your perfect home is just a call away.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">
              Quick Links
            </h4>
            <div className="flex flex-col gap-3">
              <Link href="/" className="text-sm text-white/60 hover:text-emerald-400 transition-colors">
                Home
              </Link>
              <Link href="/properties" className="text-sm text-white/60 hover:text-emerald-400 transition-colors">
                Properties
              </Link>
              <Link href="/about" className="text-sm text-white/60 hover:text-emerald-400 transition-colors">
                About Us
              </Link>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">
              Contact
            </h4>
            <div className="flex flex-col gap-3 text-sm text-white/60">
              <p>Kondapur, Hyderabad</p>
              <p>Telangana, India</p>
              <p className="mt-2 text-white">Call us: +917971442220</p>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">
              Social
            </h4>
            <div className="flex flex-col gap-3 text-sm text-white/60">
              <a href="https://www.instagram.com/flats_for_rent_sale_hyderabad?utm_source=qr&igsh=MWt2M3JuOTMxaHQyNA==" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                Instagram
              </a>
              <a href="https://youtube.com/@prproperties-je9bc?si=lxZKyF-duS0XlAa1" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 py-6">
        <p className="text-center text-xs text-white/30">
          &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}