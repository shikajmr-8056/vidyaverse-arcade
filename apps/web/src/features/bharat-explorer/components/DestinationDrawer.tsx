// =========================================================
// BHARAT EXPLORER — DESTINATION OVERVIEW DRAWER (SCREEN C)
// Shows State/UT verified geography, audio pronunciation & missions
// =========================================================

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Volume2,
  Compass,
  MapPin,
  Waves,
  Trees,
  Award,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Mountain
} from 'lucide-react';
import { StateRegion, ExpeditionMission } from '../types';

interface DestinationDrawerProps {
  state: StateRegion | null;
  onClose: () => void;
  onSpeak: (text: string) => void;
  isSpeaking: boolean;
  onStartExpedition: (missionId: string) => void;
  availableMissions: ExpeditionMission[];
  onViewInAtlas: (stateId: string) => void;
}

export const DestinationDrawer: React.FC<DestinationDrawerProps> = ({
  state,
  onClose,
  onSpeak,
  isSpeaking,
  onStartExpedition,
  availableMissions,
  onViewInAtlas
}) => {
  if (!state) return null;

  // Find missions that involve this state
  const matchingMissions = availableMissions.filter(m =>
    m.targetStateIds.includes(state.id)
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="absolute top-4 right-4 z-30 w-full max-w-sm sm:max-w-md bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-sky-200 dark:border-sky-800/50 p-5 overflow-y-auto max-h-[88vh]"
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                {state.zone} Zone • {state.type}
              </span>
              <span
                className="w-3.5 h-3.5 rounded-full border border-black/20"
                style={{ backgroundColor: state.color }}
                title="Atlas Palette Color"
              />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white mt-1 flex items-center gap-2">
              {state.name}
              <button
                onClick={() => onSpeak(`${state.name}. Capital: ${state.capital}`)}
                className={`p-1.5 rounded-full hover:bg-sky-100 dark:hover:bg-slate-800 text-sky-600 transition-colors ${
                  isSpeaking ? 'animate-pulse text-amber-500' : ''
                }`}
                title="Pronounce State & Capital"
                aria-label="Listen to pronunciation"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </h2>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
              Capital: <span className="text-slate-800 dark:text-slate-200 font-semibold">{state.capital}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Terrain & Bio-geography */}
        <div className="mt-4 p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
            <Mountain className="w-3.5 h-3.5" />
            Terrain & Physiography
          </div>
          <p className="text-xs text-amber-900 dark:text-amber-200 mt-1 leading-relaxed">
            {state.terrain}
          </p>
        </div>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          {/* Landmarks */}
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50">
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              Landmarks
            </div>
            <ul className="mt-1 space-y-0.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
              {state.landmarks.slice(0, 2).map((lm, i) => (
                <li key={i} className="truncate">• {lm}</li>
              ))}
            </ul>
          </div>

          {/* Rivers */}
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50">
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">
              <Waves className="w-3.5 h-3.5 text-sky-500" />
              Major Rivers
            </div>
            <ul className="mt-1 space-y-0.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
              {state.rivers.slice(0, 2).map((rv, i) => (
                <li key={i} className="truncate">• {rv}</li>
              ))}
            </ul>
          </div>

          {/* Wildlife */}
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50">
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">
              <Trees className="w-3.5 h-3.5 text-emerald-500" />
              Flora & Fauna
            </div>
            <ul className="mt-1 space-y-0.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
              {state.wildlife.slice(0, 2).map((wl, i) => (
                <li key={i} className="truncate">• {wl}</li>
              ))}
            </ul>
          </div>

          {/* Culture */}
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50">
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">
              <Award className="w-3.5 h-3.5 text-violet-500" />
              Culture & Arts
            </div>
            <ul className="mt-1 space-y-0.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
              {state.culture.slice(0, 2).map((cl, i) => (
                <li key={i} className="truncate">• {cl}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Curriculum Educational Facts */}
        <div className="mt-3">
          <div className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
            NCERT Curriculum Facts
          </div>
          <div className="space-y-1.5">
            {state.facts.map((fact, idx) => (
              <div
                key={idx}
                className="text-xs p-2 rounded-lg bg-sky-50/60 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/30 text-slate-700 dark:text-slate-300 leading-relaxed"
              >
                💡 {fact}
              </div>
            ))}
          </div>
        </div>

        {/* Missions Involving This State */}
        {matchingMissions.length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800">
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-amber-500" />
                Available Expeditions ({matchingMissions.length})
              </span>
            </div>
            <div className="space-y-2">
              {matchingMissions.map(m => (
                <div
                  key={m.id}
                  className="p-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-800/60 border border-amber-200 dark:border-amber-900/50 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {m.badgeIcon} {m.title}
                    </div>
                    <div className="text-[11px] text-amber-700 dark:text-amber-400 font-medium">
                      +{m.rewardXP} XP • {m.stages.length} Stages
                    </div>
                  </div>
                  <button
                    onClick={() => onStartExpedition(m.id)}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md shadow-amber-500/20 flex items-center gap-1 transition-transform active:scale-95 shrink-0"
                  >
                    Start <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View in Atlas Footer Button */}
        <div className="mt-4 pt-2">
          <button
            onClick={() => onViewInAtlas(state.id)}
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <BookOpen className="w-4 h-4 text-sky-500" />
            Explore Discovery Cards in Atlas
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
