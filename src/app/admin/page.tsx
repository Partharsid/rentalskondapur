'use client';

import { useState, useEffect } from 'react';
import AdminClient from './AdminClient';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/auth')
      .then((res) => {
        if (res.ok) setIsAuthenticated(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setIsAuthenticated(true);
    } else {
      setError('Authentication failed');
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-deep">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-deep px-4">
        <form onSubmit={handleLogin} className="glass w-full max-w-sm rounded-2xl p-8">
          <h1 className="mb-2 text-2xl font-bold text-white">Admin</h1>
          <p className="mb-6 text-sm text-white/40">Enter password to access dashboard</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-emerald-500/50"
            placeholder="Password"
            autoFocus
            minLength={1}
            required
          />
          {error && <p className="mb-4 text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-600 py-3 font-semibold text-white transition-all hover:bg-emerald-500"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return <AdminClient />;
}