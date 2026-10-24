// =========================================================
// BHARAT EXPLORER — ACCESSIBLE STATE & UT LIST DRAWER
// Keyboard Navigable Directory for Non-Pointer Selection
// =========================================================

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, CheckCircle2, ChevronRight, MapPin } from 'lucide-react';
import { StateRegion } from '../types';
import { INDIA_STATES } from '../data/india-map-data';

interface AccessibleStateListProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectState: (state: StateRegion) => void;
  selectedStateId: string | null;
  exploredStateIds: string[];
}

export const AccessibleStateList: React.FC<AccessibleStateListProps> = ({
  isOpen,
  onClose,
  onSelectState,
  selectedStateId,
  exploredStateIds
}) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filtered = INDIA_STATES.filter(
    s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.capital.toLowerCase().includes(search.toLowerCase()) ||
      s.zone.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-40 flex justify-start bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ x: -350 }}
          animate={{ x: 0 }}
          exit={{ x: -350 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="w-full max-w-sm bg-slate-900 border-r border-slate-800 h-full p-5 flex flex-col justify-between text-white shadow-2xl"
        >
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-400" />
                <h2 className="text-base font-bold text-white">
                  States & Union Territories
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400"
                aria-label="Close list"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search */}
            <div className="relative my-3">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search state, capital, or zone..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                autoFocus
              />
            </div>

            {/* List */}
            <div className="space-y-1.5 overflow-y-auto max-h-[72vh] pr-1">
              {filtered.map(state => {
                const isSelected = selectedStateId === state.id;
                const isExplored = exploredStateIds.includes(state.id);

                return (
                  <button
                    key={state.id}
                    onClick={() => {
                      onSelectState(state);
                      onClose();
                    }}
                    className={`w-full p-2.5 rounded-xl text-left border flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-500 text-amber-200'
                        : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: state.color }}
                      />
                      <div className="truncate">
                        <div className="text-xs font-bold truncate">{state.name}</div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {state.capital} • {state.type}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {isExplored && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-center text-[11px] text-slate-400">
            {filtered.length} of 36 Regions Shown
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
