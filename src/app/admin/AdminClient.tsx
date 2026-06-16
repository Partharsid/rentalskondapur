'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Building2, Inbox, BarChart3, LogOut, Plus, Pencil, Trash2, X, Upload, Search,
} from 'lucide-react';
import type { Property, Inquiry } from '@/lib/types';

type Tab = 'properties' | 'inquiries' | 'stats';

export default function AdminClient() {
  const [activeTab, setActiveTab] = useState<Tab>('stats');

  return (
    <div className="min-h-screen bg-deep">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">
            Dashboard <span className="text-gradient-emerald">RENTALS KONDAPUR</span>
          </h1>
          <button
            onClick={() => fetch('/api/admin/auth', { method: 'DELETE' }).then(() => window.location.reload())}
            className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-white/60 hover:text-white transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        <div className="mb-8 flex gap-2 border-b border-white/5 pb-4">
          {[
            { id: 'stats' as Tab, label: 'Stats', icon: BarChart3 },
            { id: 'properties' as Tab, label: 'Properties', icon: Building2 },
            { id: 'inquiries' as Tab, label: 'Inquiries', icon: Inbox },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-emerald-600/20 text-emerald-400'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'stats' && <StatsTab />}
        {activeTab === 'properties' && <PropertiesTab />}
        {activeTab === 'inquiries' && <InquiriesTab />}
      </div>
    </div>
  );
}

function StatsTab() {
  const [stats, setStats] = useState({ properties: 0, available: 0, inquiries: 0 });
  const [error, setError] = useState(false);

  const fetchStats = useCallback(async () => {
    try {
      const [pRes, iRes] = await Promise.all([
        fetch('/api/admin/properties'),
        fetch('/api/admin/inquiries'),
      ]);
      if (!pRes.ok || !iRes.ok) {
        setError(true);
        return;
      }
      const [pData, iData] = await Promise.all([pRes.json(), iRes.json()]);
      const props: Property[] = pData.properties || [];
      const inqs: Inquiry[] = iData.inquiries || [];
      setStats({
        properties: props.length,
        available: props.filter((p) => p.available_now).length,
        inquiries: inqs.length,
      });
    } catch {
      setError(true);
    }
  }, []);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  if (error) {
    return <p className="text-center text-red-400 py-12">Failed to load stats. Refresh to retry.</p>;
  }

  const cards = [
    { label: 'Total Properties', value: stats.properties, color: 'text-emerald-400' },
    { label: 'Available Now', value: stats.available, color: 'text-green-400' },
    { label: 'Inquiries', value: stats.inquiries, color: 'text-gold-400' },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {cards.map((card) => (
        <div key={card.label} className="glass rounded-2xl p-6 text-center">
          <p className={`text-4xl font-bold ${card.color}`}>{card.value}</p>
          <p className="mt-2 text-sm text-white/40">{card.label}</p>
        </div>
      ))}
    </div>
  );
}

function safeParseInt(value: string): number {
  const num = parseInt(value, 10);
  return isNaN(num) ? 0 : Math.max(0, num);
}

function PropertiesTab() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    name: '', location: 'Kondapur', area: '', bhk: '', sqft: 0,
    rent: 0, deposit: 0, video_url: '', floor: '', description: '',
  });

  const fetchProperties = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/properties');
      if (!res.ok) { setError(true); setLoading(false); return; }
      const data = await res.json();
      setProperties(data.properties || []);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProperties(); }, [fetchProperties]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.url) setForm({ ...form, video_url: data.url });
    } catch {
      /* silent */
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `/api/admin/properties?id=${editId}` : '/api/admin/properties';
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setShowForm(false);
        setEditId(null);
        setForm({ name: '', location: 'Kondapur', area: '', bhk: '', sqft: 0, rent: 0, deposit: 0, video_url: '', floor: '', description: '' });
        fetchProperties();
      }
    } catch {
      /* silent */
    }
  };

  const handleEdit = (p: Property) => {
    setForm({
      name: p.name, location: p.location, area: p.area || '', bhk: p.bhk,
      sqft: p.sqft || 0, rent: p.rent, deposit: p.deposit || 0,
      video_url: p.video_url || '', floor: p.floor || '', description: p.description || '',
    });
    setEditId(p.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this property?')) return;
    try {
      const res = await fetch(`/api/admin/properties?id=${id}`, { method: 'DELETE' });
      if (res.ok) fetchProperties();
    } catch {
      /* silent */
    }
  };

  const toggleAvailability = async (p: Property) => {
    try {
      await fetch(`/api/admin/properties?id=${p.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ available_now: !p.available_now }),
      });
      fetchProperties();
    } catch {
      /* silent */
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-400 py-12">Failed to load properties. Refresh to retry.</p>;
  }

  return (
    <div>
      <button
        onClick={() => { setShowForm(true); setEditId(null); setForm({ name: '', location: 'Kondapur', area: '', bhk: '', sqft: 0, rent: 0, deposit: 0, video_url: '', floor: '', description: '' }); }}
        className="mb-6 flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500"
      >
        <Plus size={16} />
        Add Property
      </button>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="glass-strong w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">{editId ? 'Edit' : 'Add'} Property</h2>
              <button onClick={() => setShowForm(false)} className="text-white/40 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Property name" required
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500/50"
              />
              <div className="flex gap-2">
                <input
                  value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="Location" required
                  className="flex-1 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500/50"
                />
                <input
                  value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })}
                  placeholder="Area"
                  className="flex-1 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500/50"
                />
              </div>
              <div className="flex gap-2">
                <input
                  value={form.bhk} onChange={(e) => setForm({ ...form, bhk: e.target.value })}
                  placeholder="BHK (e.g. 2 BHK)" required
                  className="flex-1 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500/50"
                />
                <input
                  type="number" value={form.sqft || ''} onChange={(e) => setForm({ ...form, sqft: safeParseInt(e.target.value) })}
                  placeholder="Sqft"
                  className="w-24 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500/50"
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="number" value={form.rent || ''} onChange={(e) => setForm({ ...form, rent: safeParseInt(e.target.value) })}
                  placeholder="Rent (₹)" required
                  className="flex-1 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500/50"
                />
                <input
                  type="number" value={form.deposit || ''} onChange={(e) => setForm({ ...form, deposit: safeParseInt(e.target.value) })}
                  placeholder="Deposit"
                  className="flex-1 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500/50"
                />
              </div>
              <input
                value={form.floor} onChange={(e) => setForm({ ...form, floor: e.target.value })}
                placeholder="Floor (e.g. 3rd Floor)"
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500/50"
              />
              <textarea
                value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Description"
                rows={3}
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500/50 resize-none"
              />
              <div>
                <label className="mb-2 block text-xs text-white/40">Video Walkthrough</label>
                <div className="flex gap-2">
                  <input
                    value={form.video_url} onChange={(e) => setForm({ ...form, video_url: e.target.value })}
                    placeholder="Or paste video URL"
                    className="flex-1 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500/50"
                  />
                  <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-white/60 hover:text-white transition-colors">
                    <Upload size={16} />
                    {uploading ? '...' : 'Upload'}
                    <input type="file" accept="video/mp4,video/webm" onChange={handleUpload} className="hidden" />
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-500"
              >
                {editId ? 'Update' : 'Create'} Property
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((p) => (
          <div key={p.id} className="glass rounded-2xl overflow-hidden">
            <div className="aspect-video bg-matte flex items-center justify-center">
              {p.video_url ? (
                <video src={p.video_url} muted className="h-full w-full object-cover" />
              ) : (
                <Building2 size={32} className="text-white/20" />
              )}
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-white">{p.name}</h3>
                  <p className="text-sm text-white/40">{p.bhk} · ₹{p.rent?.toLocaleString()}/mo</p>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    p.available_now
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {p.available_now ? 'Available' : 'Rented'}
                </span>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => toggleAvailability(p)}
                  className="flex-1 rounded-lg border border-white/10 py-1.5 text-xs text-white/60 hover:text-white transition-colors"
                >
                  Toggle
                </button>
                <button
                  onClick={() => handleEdit(p)}
                  className="flex items-center justify-center gap-1 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/60 hover:text-emerald-400 transition-colors"
                >
                  <Pencil size={12} />
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="flex items-center justify-center gap-1 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/60 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InquiriesTab() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const fetchInquiries = useCallback(async () => {
    setError(false);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (filterStatus) params.set('status', filterStatus);
      const res = await fetch(`/api/admin/inquiries?${params}`);
      if (!res.ok) { setError(true); setLoading(false); return; }
      const data = await res.json();
      setInquiries(data.inquiries || []);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [search, filterStatus]);

  useEffect(() => { fetchInquiries(); }, [fetchInquiries]);

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch('/api/admin/inquiries', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      fetchInquiries();
    } catch {
      /* silent */
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm('Delete this inquiry?')) return;
    try {
      const res = await fetch(`/api/admin/inquiries?id=${id}`, { method: 'DELETE' });
      if (res.ok) fetchInquiries();
    } catch {
      /* silent */
    }
  };

  const exportCSV = () => {
    const header = 'Name,Email,Phone,Property,Message,Status,Date\n';
    const rows = inquiries.map((i) => {
      const safeName = i.name.replace(/^[=+\-@]/g, "'$&");
      const safeEmail = (i.email || '').replace(/^[=+\-@]/g, "'$&");
      const safePhone = i.phone.replace(/^[=+\-@]/g, "'$&");
      const safeMsg = (i.message || '').replace(/"/g, '""').replace(/^[=+\-@]/g, "'$&");
      return `"${safeName}","${safeEmail}","${safePhone}","${i.property_slug || ''}","${safeMsg}","${i.status}","${i.created_at}"`;
    }).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;header=present' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inquiries.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-400 py-12">Failed to load inquiries. Refresh to retry.</p>;
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search inquiries..."
            className="w-full rounded-xl bg-white/5 border border-white/10 pl-10 pr-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500/50"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500/50"
        >
          <option value="">All Status</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="closed">Closed</option>
        </select>
        <button
          onClick={exportCSV}
          className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-white/60 hover:text-white transition-colors"
        >
          Export CSV
        </button>
      </div>

      {inquiries.length === 0 ? (
        <p className="text-center text-white/40 py-12">No inquiries yet.</p>
      ) : (
        <div className="space-y-3">
          {inquiries.map((inq) => (
            <div key={inq.id} className="glass rounded-xl p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white">{inq.name}</p>
                  <p className="text-sm text-white/40">{inq.phone}{inq.email ? ` · ${inq.email}` : ''}</p>
                  {inq.property_slug && (
                    <p className="text-sm text-white/30">Property: {inq.property_slug}</p>
                  )}
                  {inq.message && (
                    <p className="mt-2 text-sm text-white/50 line-clamp-2">{inq.message}</p>
                  )}
                  <p className="mt-1 text-xs text-white/30">{new Date(inq.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={inq.status}
                    onChange={(e) => updateStatus(inq.id, e.target.value)}
                    className="rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-xs text-white outline-none"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                  <button
                    onClick={() => deleteInquiry(inq.id)}
                    className="text-white/30 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}