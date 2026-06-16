import Link from 'next/link';
import { SITE_NAME } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-deep">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-10 md:grid-cols-3">
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