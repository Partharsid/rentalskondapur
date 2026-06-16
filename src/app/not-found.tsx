import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-8xl font-black text-gradient-emerald">404</h1>
      <p className="mt-4 text-xl text-white/60">Page not found</p>
      <p className="mt-2 text-white/40">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-xl bg-emerald-600 px-8 py-3 font-semibold text-white transition-all hover:bg-emerald-500"
      >
        Go Home
      </Link>
    </div>
  );
}