// =========================================================
// BHARAT EXPLORER — MY DIGITAL ATLAS (SCREEN F)
// Verified Geographical, Wildlife, River & Heritage Card Collection
// =========================================================

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Search,
  Filter,
  Lock,
  Sparkles,
  MapPin,
  Waves,
  Mountain,
  Trees,
  Award,
  ChevronLeft,
  X,
  Volume2
} from 'lucide-react';
import { DiscoveryCard, DiscoveryCategory } from '../types';
import { DISCOVERY_CARDS } from '../data/discovery-cards-data';

interface AtlasViewProps {
  unlockedCardIds: string[];
  onBackToMap: () => void;
  onSpeak: (text: string) => void;
  isSpeaking: boolean;
}

const CATEGORIES: { id: DiscoveryCategory | 'all'; label: string; icon: string }[] = [
  { id: 'all', label: 'All Wonders', icon: '✨' },
  { id: 'rivers', label: 'Sacred Rivers', icon: '🌊' },
  { id: 'mountains', label: 'Mountains & Terrain', icon: '🏔️' },
  { id: 'wildlife', label: 'Wildlife & Sanctuaries', icon: '🐅' },
  { id: 'landmarks', label: 'Monuments & Heritage', icon: '🏛️' },
  { id: 'culture', label: 'Living Culture & Arts', icon: '🎨' }
];

export const AtlasView: React.FC<AtlasViewProps> = ({
  unlockedCardIds,
  onBackToMap,
  onSpeak,
  isSpeaking
}) => {
  const [selectedCategory, setSelectedCategory] = useState<DiscoveryCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCardModal, setActiveCardModal] = useState<DiscoveryCard | null>(null);

  const filteredCards = useMemo(() => {
    return DISCOVERY_CARDS.filter(card => {
      const matchesCategory = selectedCategory === 'all' || card.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.stateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const unlockedCount = DISCOVERY_CARDS.filter(c => unlockedCardIds.includes(c.id)).length;
  const totalCount = DISCOVERY_CARDS.length;
  const progressPercent = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white select-none overflow-y-auto p-4 sm:p-6 max-w-6xl mx-auto w-full">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToMap}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1.5 text-xs font-bold"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Map
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-black font-display text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-amber-400" />
              My Digital Atlas of Bharat
            </h1>
            <p className="text-xs text-slate-400">
              Interactive encyclopedia of India&apos;s geographical, ecological, and cultural wonders.
            </p>
          </div>
        </div>

        {/* Collection Completion Stats */}
        <div className="flex items-center gap-3 bg-slate-800/80 px-4 py-2 rounded-2xl border border-slate-700">
          <div className="text-right">
            <div className="text-xs font-bold text-amber-400">
              {unlockedCount} / {totalCount} Cards
            </div>
            <div className="text-[10px] text-slate-400">{progressPercent}% Mastered</div>
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-amber-500/30 flex items-center justify-center font-bold text-xs text-amber-300">
            {progressPercent}%
          </div>
        </div>
      </div>

      {/* Search & Category Filter Pills */}
      <div className="my-4 space-y-3">
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search rivers, mountains, wildlife, monuments..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCards.map(card => {
          const isUnlocked = unlockedCardIds.includes(card.id);

          return (
            <motion.div
              key={card.id}
              whileHover={{ y: isUnlocked ? -4 : 0 }}
              onClick={() => isUnlocked && setActiveCardModal(card)}
              className={`rounded-2xl border p-4 flex flex-col justify-between transition-all relative overflow-hidden ${
                isUnlocked
                  ? 'bg-slate-800/90 border-slate-700/80 hover:border-amber-500/50 cursor-pointer shadow-lg hover:shadow-amber-500/10'
                  : 'bg-slate-900/60 border-slate-800 opacity-60'
              }`}
            >
              {/* Card Header */}
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-3xl p-2 rounded-xl bg-slate-700/50 inline-block">
                    {isUnlocked ? card.icon : '🔒'}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 uppercase tracking-wider">
                    {card.category}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-white line-clamp-1">
                  {isUnlocked ? card.title : 'Undiscovered Wonder'}
                </h3>
                <p className="text-[11px] text-amber-400 font-medium line-clamp-1">
                  {isUnlocked ? card.subtitle : 'Explore more states to unlock'}
                </p>

                <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                  {isUnlocked ? card.description : 'Complete related expeditions and discover states on the map to reveal this card.'}
                </p>
              </div>

              {/* Card Footer */}
              <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 truncate max-w-[150px]">
                  📍 {card.stateName}
                </span>
                {isUnlocked ? (
                  <span className="text-amber-400 font-bold hover:underline">
                    View Fact →
                  </span>
                ) : (
                  <span className="text-slate-500 flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Locked
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Card Detail Modal */}
      <AnimatePresence>
        {activeCardModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-amber-500/30 rounded-3xl p-6 max-w-lg w-full relative shadow-2xl"
            >
              <div className="flex items-start justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="text-4xl p-2 rounded-2xl bg-slate-800">
                    {activeCardModal.icon}
                  </span>
                  <div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 uppercase tracking-wider">
                      {activeCardModal.category} • {activeCardModal.badge}
                    </span>
                    <h2 className="text-lg font-bold text-white mt-1">
                      {activeCardModal.title}
                    </h2>
                    <p className="text-xs text-slate-400">{activeCardModal.stateName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onSpeak(`${activeCardModal.title}. ${activeCardModal.description}. ${activeCardModal.curriculumFact}`)}
                    className={`p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 ${
                      isSpeaking ? 'animate-pulse text-amber-400' : ''
                    }`}
                    title="Read card aloud"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveCardModal(null)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="my-4 space-y-3">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Geographical Description
                  </h4>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {activeCardModal.description}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-800/40">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    NCERT Curriculum Fact
                  </h4>
                  <p className="text-xs text-amber-200/90 leading-relaxed">
                    {activeCardModal.curriculumFact}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveCardModal(null)}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition-colors"
              >
                Done Reading
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
