'use client';

import Link from 'next/link';

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-black text-gradient-gold">Oops!</h1>
      <p className="mt-4 text-xl text-white/60">Something went wrong</p>
      <p className="mt-2 text-white/40">Please try again or go back home.</p>
      <div className="mt-8 flex gap-4">
        <button
          onClick={reset}
          className="inline-flex items-center rounded-xl bg-emerald-600 px-8 py-3 font-semibold text-white transition-all hover:bg-emerald-500"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="inline-flex items-center rounded-xl glass-strong px-8 py-3 font-semibold text-white transition-all hover:bg-white/10"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}