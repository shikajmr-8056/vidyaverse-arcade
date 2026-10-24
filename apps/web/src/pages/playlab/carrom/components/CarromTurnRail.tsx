// =========================================================
// VIDYAVERSE NEWTON'S CARROM — TURN ACTION & PLAYERS RAIL
// Left Column Rail matching Math Ludo TurnRail architecture
// =========================================================

import React from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  Sparkles,
  Bot,
  User,
  Trophy,
  Play,
  Compass,
  ChevronLeft,
  ChevronRight,
  Sliders,
  Crown,
} from 'lucide-react';
import { clsx } from 'clsx';
import { PlayerSlot, CarromMatchState } from '../types';

interface CarromTurnRailProps {
  matchState: CarromMatchState;
  activePlayer: PlayerSlot;
  isShotInMotion: boolean;
  aimAngleRad: number;
  onAimAngleChange: (angleRad: number) => void;
  shotPower: number;
  onShotPowerChange: (power: number) => void;
  onShoot: () => void;
}

export const CarromTurnRail: React.FC<CarromTurnRailProps> = ({
  matchState,
  activePlayer,
  isShotInMotion,
  aimAngleRad,
  onAimAngleChange,
  shotPower,
  onShotPowerChange,
  onShoot,
}) => {
  const { players, activePlayerIndex, targetScore, queenState, queenCoverPlayerIndex } = matchState;
  const isCurrentHuman = !activePlayer.isBot;
  const isDisabled = isShotInMotion || !isCurrentHuman;
  const currentAngleDeg = Math.round(((aimAngleRad * 180) / Math.PI + 360) % 360);

  const adjustAngleBy = (deltaDeg: number) => {
    if (isDisabled) return;
    const newRad = aimAngleRad + (deltaDeg * Math.PI) / 180;
    onAimAngleChange(newRad);
  };

  // Theme base color styling per player side
  const getSideColor = (side: string) => {
    switch (side) {
      case 'south':
        return { text: 'text-amber-500', bg: 'bg-amber-500/15', border: 'border-amber-500/30', hex: '#f59e0b', label: 'South Base' };
      case 'north':
        return { text: 'text-purple-500', bg: 'bg-purple-500/15', border: 'border-purple-500/30', hex: '#a855f7', label: 'North Base' };
      case 'east':
        return { text: 'text-emerald-500', bg: 'bg-emerald-500/15', border: 'border-emerald-500/30', hex: '#10b981', label: 'East Base' };
      case 'west':
      default:
        return { text: 'text-blue-500', bg: 'bg-blue-500/15', border: 'border-blue-500/30', hex: '#3b82f6', label: 'West Base' };
    }
  };

  const activeColor = getSideColor(activePlayer.side);

  return (
    <div className="hidden lg:flex shrink-0 w-72 xl:w-80 2xl:w-88 h-full max-h-[780px] flex-col justify-between py-1 gap-2.5">
      {/* CARD 1: ACTIVE TURN & GIANT 3D SHOOT BUTTON (Matching Ludo's Giant Dice Box) */}
      <div className="card text-center p-3 sm:p-3.5 space-y-2 bg-card border-border shadow-md flex-1 min-h-0 flex flex-col justify-between items-center shrink-0">
        
        {/* Header with Turn Action & Active Player Pill */}
        <div className="flex items-center justify-between pb-1.5 border-b border-border w-full shrink-0">
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-bold text-text-primary uppercase tracking-wider">
              Turn Action
            </span>
          </div>

          <div
            className={clsx(
              'flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold shadow-xs border',
              activeColor.bg,
              activeColor.text,
              activeColor.border
            )}
          >
            {activePlayer.isBot ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
            <span className="truncate max-w-[100px]">{activePlayer.name}</span>
          </div>
        </div>

        {/* Giant Focal 3D Shoot Button (like Ludo's 3D Dice) */}
        <div className="flex flex-col items-center justify-center flex-1 my-auto w-full">
          <motion.button
            whileHover={!isDisabled ? { scale: 1.04, translateY: -2 } : {}}
            whileTap={!isDisabled ? { scale: 0.95 } : {}}
            onClick={() => {
              if (!isDisabled) {
                onShoot();
              }
            }}
            disabled={isDisabled}
            className={clsx(
              'w-32 h-32 sm:w-36 sm:h-36 xl:w-40 xl:h-40 rounded-3xl flex flex-col items-center justify-center shadow-2xl transition-all relative group overflow-hidden',
              !isDisabled
                ? 'bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 hover:shadow-amber-500/40 cursor-pointer ring-4 ring-amber-500/40 ring-offset-2 ring-offset-card'
                : isShotInMotion
                ? 'bg-gradient-to-br from-amber-600/40 to-slate-800 border-2 border-amber-500/40 shadow-inner cursor-not-allowed animate-pulse'
                : activePlayer.isBot
                ? 'bg-gradient-to-br from-purple-600/30 to-slate-800 border-2 border-purple-500/40 shadow-xl cursor-not-allowed'
                : 'bg-canvas border-2 border-border cursor-not-allowed opacity-80'
            )}
          >
            {/* Glossy Bevel Overlay */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/25 via-transparent to-white/30 pointer-events-none" />

            <Play className="w-10 h-10 sm:w-12 sm:h-12 fill-white text-white drop-shadow-md mb-1" />
            <span className="text-white font-black text-sm sm:text-base tracking-wide uppercase drop-shadow-sm">
              {isShotInMotion ? 'In Motion' : 'SHOOT'}
            </span>
            <span className="text-white/90 font-mono text-[11px] font-bold mt-0.5">
              {shotPower}% Power
            </span>
          </motion.button>

          {/* Action Prompt Pill */}
          <div className="text-center space-y-0.5 mt-2 w-full">
            {isShotInMotion ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold text-xs animate-pulse">
                <Sparkles className="w-3.5 h-3.5" />
                Simulating Physics Motion...
              </span>
            ) : isCurrentHuman ? (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold text-xs tracking-wide ring-1.5 ring-amber-500/40 animate-pulse shadow-xs">
                🎯 TAP BUTTON OR PULL TO SHOOT!
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-canvas text-text-muted font-bold text-xs border border-border">
                <Bot className="w-3.5 h-3.5" />
                {activePlayer.name} is aiming...
              </span>
            )}
          </div>
        </div>

        {/* Power & Angle Sliders */}
        <div className="w-full space-y-2 pt-2 border-t border-border shrink-0 text-left">
          {/* Shot Power Tuning */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-text-primary flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-emerald-500" />
                <span>Shot Power</span>
              </span>
              <span className="font-mono text-emerald-500 font-bold">{shotPower}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={shotPower}
              disabled={isDisabled}
              onChange={(e) => onShotPowerChange(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer disabled:opacity-50 h-2 bg-canvas rounded-lg"
            />
            {/* Quick Power Chips */}
            <div className="grid grid-cols-4 gap-1 pt-0.5">
              {[25, 50, 75, 100].map((p) => (
                <button
                  key={p}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => onShotPowerChange(p)}
                  className={clsx(
                    'py-0.5 rounded-md text-[10px] font-bold border transition-all cursor-pointer',
                    shotPower === p
                      ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/40'
                      : 'bg-canvas text-text-muted border-border hover:text-text-primary disabled:opacity-40'
                  )}
                >
                  {p}%
                </button>
              ))}
            </div>
          </div>

          {/* Aim Angle Micro-Adjust */}
          <div className="space-y-1 pt-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-text-primary flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-blue-500" />
                <span>Aim Angle</span>
              </span>
              <span className="font-mono text-blue-500 font-bold">{currentAngleDeg}°</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={isDisabled}
                onClick={() => adjustAngleBy(-5)}
                className="p-1 rounded-lg bg-canvas hover:bg-card border border-border text-text-muted hover:text-text-primary disabled:opacity-40"
                title="-5 degrees"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <input
                type="range"
                min="0"
                max="360"
                value={currentAngleDeg}
                disabled={isDisabled}
                onChange={(e) => onAimAngleChange((Number(e.target.value) * Math.PI) / 180)}
                className="flex-1 accent-blue-500 cursor-pointer disabled:opacity-50 h-1.5 bg-canvas rounded-lg"
              />
              <button
                type="button"
                disabled={isDisabled}
                onClick={() => adjustAngleBy(5)}
                className="p-1 rounded-lg bg-canvas hover:bg-card border border-border text-text-muted hover:text-text-primary disabled:opacity-40"
                title="+5 degrees"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CARD 2: PLAYERS & STANDINGS (Matching Ludo's Players & Standings) */}
      <div className="card p-2.5 sm:p-3 bg-card border-border shadow-md shrink-0 space-y-1.5">
        <div className="flex items-center justify-between pb-1 border-b border-border shrink-0">
          <div className="flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <h2 className="text-xs font-bold text-text-primary uppercase tracking-wider">
              Players & Standings
            </h2>
          </div>
          <span className="text-[9px] px-2 py-0.2 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold">
            Target: {targetScore} pts
          </span>
        </div>

        <div className="space-y-1.5">
          {players.map((p, idx) => {
            const isCurrent = activePlayerIndex === idx;
            const sideColor = getSideColor(p.side);
            const isCoveringQueen = queenState === 'pocketed_uncovered' && queenCoverPlayerIndex === idx;

            return (
              <div
                key={p.id}
                className={clsx(
                  'px-2 py-1.5 rounded-xl border transition-all duration-200 relative overflow-hidden flex items-center justify-between gap-1.5',
                  isCurrent
                    ? 'bg-card shadow-sm ring-1.5'
                    : 'bg-canvas/50 hover:bg-canvas border-border/80'
                )}
                style={{
                  borderColor: isCurrent ? sideColor.hex : undefined,
                }}
              >
                {/* Active Highlight Accent Bar */}
                {isCurrent && (
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1"
                    style={{ backgroundColor: sideColor.hex }}
                  />
                )}

                {/* Left: Avatar, Name & Base */}
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-7 h-7 rounded-lg bg-canvas border border-border flex items-center justify-center text-sm shrink-0">
                    {p.isBot ? '🤖' : '👨‍🎓'}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 leading-tight">
                      <span className="text-xs font-bold text-text-primary truncate max-w-[90px]">
                        {p.name}
                      </span>
                      {p.isBot ? (
                        <span className="text-[8px] px-1 py-0.2 rounded bg-card text-text-muted font-medium border border-border">
                          AI
                        </span>
                      ) : (
                        <span className="text-[8px] px-1 py-0.2 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/30">
                          You
                        </span>
                      )}
                    </div>
                    <span
                      className="text-[9px] font-semibold block mt-0.5"
                      style={{ color: sideColor.hex }}
                    >
                      {sideColor.label}
                    </span>
                  </div>
                </div>

                {/* Right: Coins Pocketed Pills & Score */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex items-center gap-1 text-[10px] font-mono">
                    <span className="px-1.5 py-0.2 rounded bg-canvas border border-slate-300 text-text-primary font-bold" title="White Coins">
                      ⚪ {p.coinsPocketed?.white || 0}
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-canvas border border-slate-700 text-text-primary font-bold" title="Black Coins">
                      ⚫ {p.coinsPocketed?.black || 0}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-black font-display text-text-primary">
                      {p.score}
                    </span>
                    <span className="text-[9px] text-text-muted block leading-none">pts</span>
                  </div>
                </div>

                {isCoveringQueen && (
                  <span className="absolute top-0.5 right-1 px-1 py-0.2 rounded bg-amber-500 text-white text-[8px] font-black uppercase flex items-center gap-0.5">
                    <Crown className="w-2.5 h-2.5" />
                    Cover Queen!
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
