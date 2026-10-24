// =========================================================
// BHARAT EXPLORER — MISSION RESULTS MODAL (SCREEN E)
// Rewards, XP Grant Toast, Badge Unlock & New Cards Unlocked
// =========================================================

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  Sparkles,
  Award,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { ExpeditionMission } from '../types';
import { DISCOVERY_CARDS } from '../data/discovery-cards-data';

interface MissionResultsModalProps {
  modalData: {
    mission: ExpeditionMission;
    earnedScore: number;
    earnedXP: number;
    newCards: string[];
    isFirstTime: boolean;
  } | null;
  onClose: () => void;
  onViewAtlas: () => void;
}

export const MissionResultsModal: React.FC<MissionResultsModalProps> = ({
  modalData,
  onClose,
  onViewAtlas
}) => {
  if (!modalData) return null;

  const { mission, earnedScore, earnedXP, newCards, isFirstTime } = modalData;
  const unlockedCards = DISCOVERY_CARDS.filter(c => newCards.includes(c.id));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center relative overflow-hidden shadow-2xl text-white"
        >
          {/* Ambient Glows */}
          <div className="absolute -top-16 -left-16 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Trophy Header */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 mx-auto flex items-center justify-center text-3xl sm:text-4xl shadow-lg shadow-amber-500/30 mb-4 animate-bounce">
            {mission.badgeIcon || '🏆'}
          </div>

          <h2 className="text-xl sm:text-2xl font-black font-display text-white">
            Expedition Completed!
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-md mx-auto">
            You successfully completed <strong className="text-amber-400">{mission.title}</strong>
          </p>

          {/* Rewards Badge Grid */}
          <div className="grid grid-cols-2 gap-3 my-5">
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col items-center justify-center">
              <span className="text-xs uppercase tracking-wider font-bold text-amber-400">
                VidyaVerse XP
              </span>
              <span className="text-2xl font-extrabold text-amber-300 flex items-center gap-1 mt-0.5">
                <Sparkles className="w-5 h-5 text-amber-400" />
                +{earnedXP} XP
              </span>
              {isFirstTime && (
                <span className="text-[10px] text-amber-400/80 font-medium">First Completion Bonus</span>
              )}
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col items-center justify-center">
              <span className="text-xs uppercase tracking-wider font-bold text-emerald-400">
                Badge Awarded
              </span>
              <span className="text-sm font-extrabold text-emerald-200 mt-1 flex items-center gap-1 truncate max-w-[150px]">
                <Award className="w-4 h-4 text-emerald-400" />
                {mission.badgeName}
              </span>
              <span className="text-[10px] text-emerald-400/80 font-medium">Added to Profile</span>
            </div>
          </div>

          {/* New Discovery Cards Unlocked */}
          {unlockedCards.length > 0 && (
            <div className="mb-5 text-left">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                New Atlas Cards Discovered ({unlockedCards.length})
              </div>
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {unlockedCards.map(card => (
                  <div
                    key={card.id}
                    className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{card.icon}</span>
                      <div>
                        <div className="font-bold text-slate-200">{card.title}</div>
                        <div className="text-[10px] text-slate-400">{card.subtitle}</div>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-950 text-sky-300 border border-sky-800/60 font-semibold">
                      {card.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              Continue Exploring
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                onClose();
                onViewAtlas();
              }}
              className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm transition-colors flex items-center justify-center gap-1.5"
            >
              <BookOpen className="w-4 h-4 text-sky-400" />
              View My Atlas
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
