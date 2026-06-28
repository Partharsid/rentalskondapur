'use client';

import { useState } from 'react';
import { useUserPreferences } from '@/context/UserPreferencesContext';
import { X, Check, XCircle } from 'lucide-react';

export default function CompareDrawer() {
  const { compareList, removeFromCompare, clearCompare } = useUserPreferences();
  const [isOpen, setIsOpen] = useState(false);

  if (compareList.length === 0) return null;

  return (
    <>
      {/* Floating Action Button for Compare */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${isOpen ? 'translate-y-24 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-blue-500/20 transition-transform hover:scale-105"
        >
          Compare Properties ({compareList.length})
        </button>
      </div>

      {/* Compare Modal/Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-5xl rounded-2xl bg-obsidian p-6 border border-white/10 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Compare Properties</h2>
              <div className="flex items-center gap-4">
                <button onClick={clearCompare} className="text-sm text-white/40 hover:text-white transition-colors">Clear All</button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full bg-white/10 p-2 text-white/60 hover:bg-white/20 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 overflow-x-auto pb-4">
              {compareList.map((property) => (
                <div key={property.id} className="flex flex-col gap-4 rounded-xl bg-matte p-4 border border-white/5 relative min-w-[250px]">
                  <button 
                    onClick={() => removeFromCompare(property.slug)}
                    className="absolute -top-3 -right-3 text-red-400 hover:text-red-300 bg-obsidian rounded-full p-1 border border-white/10"
                    title="Remove"
                  >
                    <XCircle size={20} />
                  </button>
                  <div className="aspect-video w-full overflow-hidden rounded-lg bg-black/40">
                     {property.video_url ? (
                       <video src={property.video_url} className="w-full h-full object-cover" />
                     ) : (
                       <div className="w-full h-full flex items-center justify-center text-white/20 text-xs">No Media</div>
                     )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">{property.name}</h3>
                    <p className="text-emerald-400 font-bold text-xl mt-1">₹{property.rent?.toLocaleString()}/mo</p>
                  </div>
                  
                  <div className="flex flex-col gap-2 mt-4 border-t border-white/10 pt-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/40">Location</span>
                      <span className="text-white text-right">{property.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">BHK</span>
                      <span className="text-white">{property.bhk}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">Area</span>
                      <span className="text-white">{property.sqft ? `${property.sqft} sqft` : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">Deposit</span>
                      <span className="text-white">{property.deposit ? `₹${property.deposit.toLocaleString()}` : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">Status</span>
                      <span className={property.available_now ? 'text-emerald-400' : 'text-red-400'}>
                        {property.available_now ? 'Available' : 'Rented'}
                      </span>
                    </div>
                  </div>

                  {property.amenities && property.amenities.length > 0 && (
                    <div className="mt-4 border-t border-white/10 pt-4">
                      <span className="text-white/40 text-sm mb-2 block">Amenities</span>
                      <ul className="flex flex-col gap-1">
                        {property.amenities.slice(0, 5).map((amenity, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-white/80">
                            <Check size={12} className="text-emerald-500" /> {amenity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {compareList.length < 2 && (
              <p className="text-center text-white/40 mt-4 text-sm">Add more properties to compare.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
