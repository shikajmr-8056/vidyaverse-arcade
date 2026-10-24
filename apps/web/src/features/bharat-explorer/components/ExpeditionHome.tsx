// =========================================================
// BHARAT EXPLORER — EXPEDITION HOME (SCREEN A)
// Hero Dashboard, Quick Launch, Daily Challenge & Expedition Roster
// =========================================================

import React from 'react';
import { motion } from 'framer-motion';
import {
  Compass,
  Map,
  BookOpen,
  Award,
  Sparkles,
  ArrowRight,
  Flame,
  CheckCircle2,
  Lock,
  Play,
  Layers,
  ChevronRight
} from 'lucide-react';
import { ExpeditionMission, ExplorerProgress, ExplorerRankTier } from '../types';
import { EXPEDITION_MISSIONS } from '../data/expeditions-data';

interface ExpeditionHomeProps {
  progress: ExplorerProgress;
  onExploreMap: () => void;
  onOpenAtlas: () => void;
  onOpenProgress: () => void;
  onStartExpedition: (missionId: string) => void;
}

const RANK_BADGES: Record<ExplorerRankTier, { label: string; icon: string; color: string }> = {
  'Rookie Explorer': { label: 'Rookie Explorer', icon: '🚩', color: 'from-blue-500 to-sky-400' },
  'Trailblazer': { label: 'Trailblazer', icon: '🧭', color: 'from-emerald-500 to-teal-400' },
  'Pathfinder': { label: 'Pathfinder', icon: '⭐', color: 'from-amber-500 to-orange-400' },
  'Bharat Master': { label: 'Bharat Master', icon: '👑', color: 'from-purple-500 to-pink-500' }
};

export const ExpeditionHome: React.FC<ExpeditionHomeProps> = ({
  progress,
  onExploreMap,
  onOpenAtlas,
  onOpenProgress,
  onStartExpedition
}) => {
  const currentRank = RANK_BADGES[progress.rankTier] || RANK_BADGES['Rookie Explorer'];

  // Identify next uncompleted mission
  const nextMission = EXPEDITION_MISSIONS.find(
    m => !progress.completedMissionIds.includes(m.id)
  ) || EXPEDITION_MISSIONS[0];

  return (
    <div className="flex-1 overflow-y-auto bg-slate-900 text-white p-4 sm:p-6 lg:p-8 select-none">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* =================================================== */}
        {/* HERO BANNER — STEP BY STEP BHARAT EXPLORER          */}
        {/* =================================================== */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-700 p-6 sm:p-8 shadow-2xl border border-sky-400/30">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-sky-100 text-xs font-bold mb-3 border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Interactive Geography Adventure • Classes 5–12
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white leading-tight">
              Bharat Explorer
            </h1>
            <p className="text-base sm:text-lg text-sky-100 font-medium mt-1">
              Explore India. Discover Wonders. Become an Explorer.
            </p>

            <p className="text-xs sm:text-sm text-sky-100/90 mt-3 leading-relaxed max-w-xl">
              Embark on educational expeditions across 28 states and 8 union territories.
              Track river origins, solve monument mysteries, unlock wildlife cards, and restore your digital Atlas of India!
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mt-6">
              <button
                onClick={onExploreMap}
                className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/30 transition-transform active:scale-95 flex items-center gap-2"
              >
                <Map className="w-4 h-4 text-slate-950" />
                Explore India Map
              </button>

              {nextMission && (
                <button
                  onClick={() => onStartExpedition(nextMission.id)}
                  className="px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-bold text-sm border border-white/30 transition-transform active:scale-95 flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-white" />
                  Continue: {nextMission.title}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* =================================================== */}
        {/* STATS & EXPLORER RANK OVERVIEW                      */}
        {/* =================================================== */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {/* Rank Badge */}
          <div
            onClick={onOpenProgress}
            className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-amber-500/50 cursor-pointer transition-all"
          >
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase">
              <span>Explorer Rank</span>
              <span className="text-lg">{currentRank.icon}</span>
            </div>
            <div className="text-base sm:text-lg font-black text-white mt-1">
              {currentRank.label}
            </div>
            <div className="text-[11px] text-amber-400 mt-1">
              View Tier Milestones →
            </div>
          </div>

          {/* Explored States */}
          <div
            onClick={onExploreMap}
            className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-sky-500/50 cursor-pointer transition-all"
          >
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase">
              <span>States Explored</span>
              <span className="text-sky-400">🗺️</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-white mt-1">
              {progress.exploredStateIds.length} <span className="text-xs text-slate-400 font-normal">/ 36</span>
            </div>
            <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-sky-400 h-full rounded-full"
                style={{ width: `${(progress.exploredStateIds.length / 36) * 100}%` }}
              />
            </div>
          </div>

          {/* Expeditions Completed */}
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase">
              <span>Expeditions</span>
              <span className="text-emerald-400">🏆</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-white mt-1">
              {progress.completedMissionIds.length} <span className="text-xs text-slate-400 font-normal">/ 7</span>
            </div>
            <div className="text-[11px] text-emerald-400 mt-1 font-semibold">
              {7 - progress.completedMissionIds.length} Expeditions Remaining
            </div>
          </div>

          {/* Atlas Collection */}
          <div
            onClick={onOpenAtlas}
            className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-purple-500/50 cursor-pointer transition-all"
          >
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase">
              <span>My Atlas Cards</span>
              <span className="text-purple-400">📖</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-white mt-1">
              {progress.unlockedCardIds.length} <span className="text-xs text-slate-400 font-normal">Cards</span>
            </div>
            <div className="text-[11px] text-purple-400 mt-1">
              Open Digital Atlas →
            </div>
          </div>
        </div>

        {/* =================================================== */}
        {/* EXPEDITIONS CATALOG                                 */}
        {/* =================================================== */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-black font-display text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-400" />
                Featured Geographic Expeditions
              </h2>
              <p className="text-xs text-slate-400">
                Playable multi-stage learning missions with verified NCERT curriculum concepts.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {EXPEDITION_MISSIONS.map(expedition => {
              const isCompleted = progress.completedMissionIds.includes(expedition.id);
              const isUnlocked = expedition.unlockedByDefault || progress.completedMissionIds.length > 0;

              return (
                <div
                  key={expedition.id}
                  className={`rounded-2xl border p-5 flex flex-col justify-between transition-all relative overflow-hidden ${
                    isCompleted
                      ? 'bg-slate-800/90 border-emerald-500/40'
                      : isUnlocked
                      ? 'bg-slate-800/90 border-slate-700/80 hover:border-amber-500/60 shadow-lg'
                      : 'bg-slate-900/60 border-slate-800 opacity-60'
                  }`}
                >
                  <div>
                    {/* Badge & Grade Header */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-2xl p-2 rounded-xl bg-slate-700/50 inline-block">
                        {expedition.badgeIcon}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
                          {expedition.gradeBand}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-950 text-sky-300 border border-sky-800">
                          {expedition.zone}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-bold text-base text-white mt-1">
                      {expedition.title}
                    </h3>
                    <p className="text-xs text-amber-400 font-medium mt-0.5">
                      {expedition.subtitle}
                    </p>

                    <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                      {expedition.description}
                    </p>
                  </div>

                  {/* Footer & CTA */}
                  <div className="mt-5 pt-3 border-t border-slate-700/60 flex items-center justify-between">
                    <div className="text-xs font-semibold text-amber-300 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      +{expedition.rewardXP} XP
                    </div>

                    {isCompleted ? (
                      <button
                        onClick={() => onStartExpedition(expedition.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 text-xs font-bold flex items-center gap-1 transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Completed • Replay
                      </button>
                    ) : (
                      <button
                        onClick={() => onStartExpedition(expedition.id)}
                        className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black shadow-md shadow-amber-500/20 transition-all flex items-center gap-1 active:scale-95"
                      >
                        Launch Mission <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
