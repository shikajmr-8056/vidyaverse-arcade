// =========================================================
// BHARAT EXPLORER — EXPLORER PROGRESS & ACHIEVEMENTS (SCREEN G)
// Tracks Ranks, Milestones, Badges & State Checklist
// =========================================================

import React, { useState } from 'react';
import {
  Award,
  ChevronLeft,
  CheckCircle2,
  Lock,
  Trophy,
  MapPin,
  Sparkles,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { ExplorerProgress, ExplorerRankTier, Zone } from '../types';
import { EXPLORER_ACHIEVEMENTS } from '../data/achievements-data';
import { INDIA_STATES } from '../data/india-map-data';

interface ExplorerProgressViewProps {
  progress: ExplorerProgress;
  onBackToMap: () => void;
  onSelectState: (stateId: string) => void;
}

const ZONES: Zone[] = ['North', 'West', 'South', 'Central', 'East', 'Northeast', 'Islands'];

const RANK_TIERS: { tier: ExplorerRankTier; minStates: number; minMissions: number; desc: string; icon: string }[] = [
  { tier: 'Rookie Explorer', minStates: 0, minMissions: 0, desc: 'Began journey across Bharat', icon: '🚩' },
  { tier: 'Trailblazer', minStates: 6, minMissions: 1, desc: 'Completed 1 expedition & 6 states', icon: '🧭' },
  { tier: 'Pathfinder', minStates: 15, minMissions: 3, desc: 'Mastered 3 expeditions & 15 states', icon: '⭐' },
  { tier: 'Bharat Master', minStates: 28, minMissions: 6, desc: 'Unrivaled scholar of India’s geography', icon: '👑' }
];

export const ExplorerProgressView: React.FC<ExplorerProgressViewProps> = ({
  progress,
  onBackToMap,
  onSelectState
}) => {
  const [activeTab, setActiveTab] = useState<'ranks' | 'achievements' | 'states'>('ranks');
  const [selectedZone, setSelectedZone] = useState<Zone | 'All'>('All');

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white select-none overflow-y-auto p-4 sm:p-6 max-w-5xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToMap}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1.5 text-xs font-bold"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Map
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-black font-display text-white flex items-center gap-2">
              <Trophy className="w-6 h-6 text-amber-400" />
              Explorer Progress & Ranks
            </h1>
            <p className="text-xs text-slate-400">
              Track your exploration rank, curriculum achievements, and national survey progress.
            </p>
          </div>
        </div>

        <div className="text-right bg-slate-800/80 px-4 py-2 rounded-2xl border border-slate-700">
          <div className="text-xs font-bold text-amber-400">Rank: {progress.rankTier}</div>
          <div className="text-[11px] text-slate-400">+{progress.totalXP} VidyaVerse XP Earned</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 my-4 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('ranks')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'ranks'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Explorer Ranks & Milestones
        </button>
        <button
          onClick={() => setActiveTab('achievements')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'achievements'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Badges & Achievements
        </button>
        <button
          onClick={() => setActiveTab('states')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'states'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          State Exploration Checklist ({progress.exploredStateIds.length}/36)
        </button>
      </div>

      {/* TAB 1: RANKS */}
      {activeTab === 'ranks' && (
        <div className="space-y-4">
          {RANK_TIERS.map((tier, idx) => {
            const isCurrent = progress.rankTier === tier.tier;
            const isUnlocked =
              progress.exploredStateIds.length >= tier.minStates &&
              progress.completedMissionIds.length >= tier.minMissions;

            return (
              <div
                key={idx}
                className={`p-5 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                  isCurrent
                    ? 'bg-amber-950/30 border-amber-500/60 ring-1 ring-amber-500/40'
                    : isUnlocked
                    ? 'bg-slate-800/80 border-slate-700'
                    : 'bg-slate-900/60 border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl p-3 rounded-2xl bg-slate-800/80 border border-slate-700">
                    {tier.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white">{tier.tier}</h3>
                      {isCurrent && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 uppercase">
                          Current Tier
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{tier.desc}</p>
                    <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-300 font-medium">
                      <span>• Min States: {tier.minStates}</span>
                      <span>• Min Expeditions: {tier.minMissions}</span>
                    </div>
                  </div>
                </div>

                <div>
                  {isUnlocked ? (
                    <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Achieved
                    </span>
                  ) : (
                    <span className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-400 border border-slate-700 text-xs font-medium flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" /> Locked
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: ACHIEVEMENTS */}
      {activeTab === 'achievements' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {EXPLORER_ACHIEVEMENTS.map(ach => {
            let currentVal = 0;
            if (ach.id === 'ach-first-step') currentVal = progress.exploredStateIds.length >= 1 ? 1 : 0;
            if (ach.id === 'ach-map-navigator') currentVal = Math.min(progress.exploredStateIds.length, 10);
            if (ach.id === 'ach-atlas-collector') currentVal = Math.min(progress.unlockedCardIds.length, 8);
            if (ach.id === 'ach-first-expedition') currentVal = progress.completedMissionIds.length >= 1 ? 1 : 0;
            if (ach.id === 'ach-bharat-master') currentVal = Math.min(progress.completedMissionIds.length, 7);

            const isDone = currentVal >= ach.maxProgress;

            return (
              <div
                key={ach.id}
                className={`p-4 rounded-2xl border flex items-start gap-3.5 ${
                  isDone
                    ? 'bg-slate-800/90 border-emerald-500/40'
                    : 'bg-slate-800/50 border-slate-700/60 opacity-80'
                }`}
              >
                <div className="text-3xl p-2.5 rounded-xl bg-slate-700/50">
                  {ach.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-white">{ach.title}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
                      {ach.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">{ach.description}</p>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 font-semibold mb-1">
                    <span>Progress</span>
                    <span>{currentVal} / {ach.maxProgress}</span>
                  </div>
                  <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isDone ? 'bg-emerald-400' : 'bg-amber-400'}`}
                      style={{ width: `${(currentVal / ach.maxProgress) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 3: STATE CHECKLIST */}
      {activeTab === 'states' && (
        <div className="space-y-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {(['All', ...ZONES] as (Zone | 'All')[]).map(z => (
              <button
                key={z}
                onClick={() => setSelectedZone(z)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  selectedZone === z
                    ? 'bg-sky-500 text-white'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {z}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {INDIA_STATES.filter(s => selectedZone === 'All' || s.zone === selectedZone).map(state => {
              const isExplored = progress.exploredStateIds.includes(state.id);

              return (
                <div
                  key={state.id}
                  onClick={() => onSelectState(state.id)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    isExplored
                      ? 'bg-slate-800/80 border-emerald-500/40 hover:border-emerald-400'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: state.color }}
                    />
                    <div className="truncate">
                      <div className="text-xs font-bold text-white truncate">{state.name}</div>
                      <div className="text-[10px] text-slate-400 truncate">Cap: {state.capital}</div>
                    </div>
                  </div>

                  {isExplored ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <span className="text-[10px] text-slate-500 font-medium">Unexplored</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
