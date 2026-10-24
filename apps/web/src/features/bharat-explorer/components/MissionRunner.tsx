// =========================================================
// BHARAT EXPLORER — MISSION RUNNER ARENA (SCREEN D)
// Interactive Gameplay Engine for 7 Reusable Mini-Game Mechanics
// =========================================================

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  Volume2,
  X,
  Award,
  Layers,
  MapPin,
  Waves,
  Trees,
  Search,
  Route
} from 'lucide-react';
import { ExpeditionMission, MissionQuestion, MiniGameType } from '../types';
import { INDIA_STATES } from '../data/india-map-data';

interface MissionRunnerProps {
  mission: ExpeditionMission;
  currentStage: MissionQuestion | null;
  currentStageIdx: number;
  hintsRevealed: number;
  submittedAnswer: string | null;
  isCorrect: boolean | null;
  earnedScore: number;
  onRequestHint: () => void;
  onSubmitAnswer: (answer: string) => void;
  onNextStage: () => void;
  onExit: () => void;
  onSpeak: (text: string) => void;
  isSpeaking: boolean;
}

const MINI_GAME_META: Record<
  MiniGameType,
  { label: string; icon: React.ReactNode; color: string }
> = {
  'state-explorer': { label: 'State Explorer', icon: <MapPin className="w-4 h-4" />, color: 'bg-emerald-500' },
  'river-tracker': { label: 'River Tracker', icon: <Waves className="w-4 h-4" />, color: 'bg-sky-500' },
  'landmark-detective': { label: 'Landmark Detective', icon: <Search className="w-4 h-4" />, color: 'bg-amber-500' },
  'wildlife-explorer': { label: 'Wildlife Explorer', icon: <Trees className="w-4 h-4" />, color: 'bg-teal-500' },
  'regional-discovery': { label: 'Regional Discovery', icon: <Compass className="w-4 h-4" />, color: 'bg-purple-500' },
  'route-planner': { label: 'Route Planner', icon: <Route className="w-4 h-4" />, color: 'bg-indigo-500' },
  'expedition-challenge': { label: 'Expedition Challenge', icon: <Award className="w-4 h-4" />, color: 'bg-rose-500' }
};

export const MissionRunner: React.FC<MissionRunnerProps> = ({
  mission,
  currentStage,
  currentStageIdx,
  hintsRevealed,
  submittedAnswer,
  isCorrect,
  earnedScore,
  onRequestHint,
  onSubmitAnswer,
  onNextStage,
  onExit,
  onSpeak,
  isSpeaking
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  if (!currentStage) return null;

  const totalStages = mission.stages.length;
  const progressPercent = ((currentStageIdx + 1) / totalStages) * 100;
  const meta = MINI_GAME_META[currentStage.miniGameType] || MINI_GAME_META['state-explorer'];
  const targetState = currentStage.targetStateId
    ? INDIA_STATES.find(s => s.id === currentStage.targetStateId)
    : null;

  return (
    <div className="flex flex-col h-full bg-slate-900/90 text-white select-none overflow-y-auto">
      {/* Top Mission Header Bar */}
      <div className="bg-slate-950/80 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Exit Expedition"
          >
            <X className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base">{mission.badgeIcon}</span>
              <h2 className="text-sm font-bold text-slate-100 truncate max-w-[220px] sm:max-w-md">
                {mission.title}
              </h2>
            </div>
            <div className="text-[11px] text-slate-400">
              Stage {currentStageIdx + 1} of {totalStages} • {mission.zone} Zone
            </div>
          </div>
        </div>

        {/* Score & XP Tracker */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {earnedScore} PTS
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 h-1.5">
        <motion.div
          className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Main Interactive Arena */}
      <div className="flex-1 max-w-3xl w-full mx-auto p-4 sm:p-6 flex flex-col justify-between">
        <div className="space-y-4">
          {/* Mini-game type pill & target state */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className={`px-2.5 py-1 rounded-md ${meta.color} text-white text-xs font-bold flex items-center gap-1.5 shadow-sm`}>
              {meta.icon}
              {meta.label}
            </div>

            {targetState && (
              <div className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300 flex items-center gap-1">
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block"
                  style={{ backgroundColor: targetState.color }}
                />
                Focus: <strong className="text-white">{targetState.name}</strong>
              </div>
            )}
          </div>

          {/* Question / Mission Prompt Card */}
          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                {currentStage.prompt}
              </h3>
              <button
                onClick={() => onSpeak(currentStage.prompt)}
                className={`p-2 rounded-xl bg-slate-700/80 hover:bg-slate-700 text-sky-400 transition-colors shrink-0 ${
                  isSpeaking ? 'animate-pulse text-amber-400' : ''
                }`}
                title="Read question aloud"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Target State Centered Mini Preview if available */}
            {targetState && (
              <div className="mt-3 pt-3 border-t border-slate-700/60 flex items-center gap-2 text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                Capital: <span className="text-slate-200 font-medium">{targetState.capital}</span>
                <span className="mx-1">•</span>
                <span>{targetState.terrain}</span>
              </div>
            )}
          </div>

          {/* Multiple Choice Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {currentStage.options.map((option, idx) => {
              const isSelected = selectedOption === option;
              const isThisAnswer = submittedAnswer === option;
              const isTargetCorrect = option === currentStage.correctAnswer;

              let btnStyle = 'bg-slate-800/70 hover:bg-slate-800 border-slate-700 text-slate-200';

              if (submittedAnswer !== null) {
                if (isTargetCorrect) {
                  btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                } else if (isThisAnswer && !isCorrect) {
                  btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                } else {
                  btnStyle = 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60';
                }
              } else if (isSelected) {
                btnStyle = 'bg-sky-900/50 border-sky-400 text-sky-100 ring-2 ring-sky-400/50';
              }

              return (
                <button
                  key={idx}
                  disabled={submittedAnswer !== null}
                  onClick={() => setSelectedOption(option)}
                  className={`p-4 rounded-xl border text-left text-sm font-medium transition-all duration-150 flex items-center justify-between gap-2 shadow-sm ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-md bg-slate-700/60 flex items-center justify-center text-xs font-bold text-slate-300">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  {submittedAnswer !== null && isTargetCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {submittedAnswer !== null && isThisAnswer && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Progressive Hint Reveal Drawer */}
          {hintsRevealed > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-800/50 text-amber-200 text-xs space-y-1.5"
            >
              <div className="font-bold text-amber-400 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" />
                Explorer Clues ({hintsRevealed}/{currentStage.hints.length}):
              </div>
              {currentStage.hints.slice(0, hintsRevealed).map((hint, hIdx) => (
                <div key={hIdx} className="pl-5 text-amber-200/90 leading-relaxed">
                  💡 {hint}
                </div>
              ))}
            </motion.div>
          )}

          {/* Feedback & Explanation Banner */}
          {submittedAnswer !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-4 rounded-xl border ${
                isCorrect
                  ? 'bg-emerald-950/70 border-emerald-500/60 text-emerald-100'
                  : 'bg-rose-950/70 border-rose-500/60 text-rose-100'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm mb-1">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Brilliant! Correct Discovery (+{Math.max(100 - hintsRevealed * 25, 25)} PTS)</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-400" />
                    <span>Knowledge Check: Correct Answer is &ldquo;{currentStage.correctAnswer}&rdquo;</span>
                  </>
                )}
              </div>
              <p className="text-xs text-slate-200/90 leading-relaxed mt-1">
                {currentStage.explanation}
              </p>
            </motion.div>
          )}
        </div>

        {/* Action Controls Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
          {/* Hint button */}
          <button
            onClick={onRequestHint}
            disabled={submittedAnswer !== null || hintsRevealed >= currentStage.hints.length}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-amber-400 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            {hintsRevealed >= currentStage.hints.length
              ? 'All Hints Used'
              : `Request Hint (${hintsRevealed}/${currentStage.hints.length})`}
          </button>

          {/* Submit or Next Button */}
          {submittedAnswer === null ? (
            <button
              onClick={() => selectedOption && onSubmitAnswer(selectedOption)}
              disabled={!selectedOption}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:opacity-40 text-white text-sm font-bold shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 active:scale-95"
            >
              Confirm Answer
            </button>
          ) : (
            <button
              onClick={() => {
                setSelectedOption(null);
                onNextStage();
              }}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-sm font-bold shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 active:scale-95"
            >
              {currentStageIdx + 1 < totalStages ? 'Continue to Next Stage' : 'Complete Expedition'}
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
