// =========================================================
// VIDYAVERSE NEWTON'S CARROM — LEFT COLUMN
// Match Scoreboard (Top) + Controls & Pro Tips (Bottom)
// Exactly according to Hand-Drawn Wireframe Specification
// =========================================================

import React from 'react';
import { Trophy, HelpCircle, MoveHorizontal, Compass, Zap, Play, Lightbulb, User, Bot, Crown, Sparkles } from 'lucide-react';
import { clsx } from 'clsx';
import { CarromMatchState } from '../types';

export interface CarromLeftPanelProps {
  matchState: CarromMatchState;
  remainingCoins: {
    white: number;
    black: number;
    queen: boolean;
  };
  turnMessage: string;
}

export const CarromLeftPanel: React.FC<CarromLeftPanelProps> = ({
  matchState,
  remainingCoins,
  turnMessage,
}) => {
  const { players, activePlayerIndex, targetScore, queenState, queenCoverPlayerIndex } = matchState;
  const activePlayer = players[activePlayerIndex] || players[0];

  return (
    <aside className="w-full lg:w-[270px] xl:w-[290px] h-full flex flex-col gap-2 overflow-hidden shrink-0 select-none">
      {/* =====================================================
          PANEL 1: MATCH SCOREBOARD (TOP)
          ===================================================== */}
      <div className="bg-card rounded-2xl border border-border p-2.5 sm:p-3 shadow-xs flex flex-col gap-2 shrink-0">
        {/* Scoreboard Header & Winning Condition */}
        <div className="flex items-center justify-between border-b border-border/80 pb-1.5">
          <div className="flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-500" />
            <h2 className="text-xs font-bold text-text-primary uppercase tracking-wider">
              Match Scoreboard
            </h2>
          </div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
            Target: {targetScore} pts
          </span>
        </div>

        {/* Players & Scores List */}
        <div className="grid grid-cols-2 gap-2">
          {players.slice(0, 2).map((p, idx) => {
            const isTurn = idx === activePlayerIndex;
            const isCovering = queenState === 'pocketed_uncovered' && queenCoverPlayerIndex === idx;

            return (
              <div
                key={p.id}
                className={clsx(
                  'p-2 rounded-xl border transition-all relative flex flex-col justify-between',
                  isTurn
                    ? 'bg-purple-500/10 border-purple-500/60 ring-2 ring-purple-500/20 shadow-xs'
                    : 'bg-canvas/50 border-border/70'
                )}
              >
                {isTurn && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-1.5 py-0.2 rounded-full bg-purple-600 text-white text-[8px] font-black uppercase tracking-wider shadow-xs">
                    Active
                  </span>
                )}

                <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-text-primary truncate">
                  {p.isBot ? (
                    <Bot className="w-3 h-3 text-purple-500 shrink-0" />
                  ) : (
                    <User className="w-3 h-3 text-emerald-500 shrink-0" />
                  )}
                  <span className="truncate">{p.name}</span>
                </div>

                <div className="text-xl font-black font-display text-text-primary text-center my-0.5">
                  {p.score}
                </div>

                <div className="text-[9px] text-text-muted text-center font-medium">
                  {p.side.toUpperCase()} BASE
                </div>

                {isCovering && (
                  <div className="mt-1 px-1 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400 text-[9px] font-bold flex items-center justify-center gap-0.5">
                    <Crown className="w-2.5 h-2.5" />
                    <span>Cover Queen!</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* If 3 or 4 players active (e.g. Doubles / Free-for-all) */}
        {players.length > 2 && (
          <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-border/60">
            {players.slice(2, 4).map((p, idx) => {
              const actualIdx = idx + 2;
              const isTurn = actualIdx === activePlayerIndex;
              return (
                <div
                  key={p.id}
                  className={clsx(
                    'px-2 py-1 rounded-lg border text-center flex items-center justify-between text-[10px]',
                    isTurn ? 'bg-purple-500/10 border-purple-500' : 'bg-canvas/40 border-border/50'
                  )}
                >
                  <span className="truncate font-semibold text-text-secondary">{p.name}</span>
                  <span className="font-mono font-bold text-text-primary">{p.score}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Board Coins Status (White, Black, Queen) */}
        <div className="p-2 rounded-xl bg-canvas/60 border border-border flex items-center justify-between text-[11px] font-mono">
          <div className="flex items-center gap-1.5" title="White Coins (+10 pts)">
            <span className="w-2.5 h-2.5 rounded-full bg-white border border-slate-400 shadow-2xs" />
            <span className="text-text-primary font-bold">{remainingCoins.white}</span>
          </div>

          <div className="flex items-center gap-1.5" title="Black Coins (+5 pts)">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-600 shadow-2xs" />
            <span className="text-text-primary font-bold">{remainingCoins.black}</span>
          </div>

          <div className="flex items-center gap-1.5" title="Queen (+25 pts)">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 border border-yellow-300 shadow-2xs" />
            <span
              className={clsx(
                'font-bold text-[10px]',
                remainingCoins.queen ? 'text-red-600 dark:text-red-400' : 'text-text-muted line-through'
              )}
            >
              {remainingCoins.queen ? 'Queen In Play' : 'Pocketed'}
            </span>
          </div>
        </div>

        {/* Turn Status Message */}
        <div className="px-2.5 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center gap-1.5 text-[11px] text-text-primary">
          <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
          <span className="truncate font-medium">
            {turnMessage || (activePlayer.isBot ? `${activePlayer.name} is aiming...` : 'Your turn to strike!')}
          </span>
        </div>
      </div>

      {/* =====================================================
          PANEL 2: CONTROLS & PRO TIPS (BELOW SCOREBOARD)
          ===================================================== */}
      <div className="flex-1 min-h-0 bg-card rounded-2xl border border-border p-2.5 sm:p-3 shadow-xs flex flex-col gap-1.5 overflow-hidden">
        <div className="flex items-center gap-1.5 border-b border-border/80 pb-1 shrink-0">
          <HelpCircle className="w-3.5 h-3.5 text-purple-500" />
          <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider">
            Controls & Pro Tips
          </h3>
        </div>

        {/* Quick Instructions List */}
        <div className="flex flex-col gap-1.5 text-[11px] text-text-secondary leading-snug">
          <div className="p-1.5 rounded-lg bg-canvas/60 border border-border/70 flex items-start gap-2">
            <MoveHorizontal className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-text-primary">Position Striker:</span>
              <p className="text-[10px] text-text-muted">Slide along the baseline or drag directly on the board.</p>
            </div>
          </div>

          <div className="p-1.5 rounded-lg bg-canvas/60 border border-border/70 flex items-start gap-2">
            <Compass className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-text-primary">Aim:</span>
              <p className="text-[10px] text-text-muted">Rotate aim line on board or use the Angle slider (-5°/+5° nudge).</p>
            </div>
          </div>

          <div className="p-1.5 rounded-lg bg-canvas/60 border border-border/70 flex items-start gap-2">
            <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-text-primary">Adjust Shot Power:</span>
              <p className="text-[10px] text-text-muted">Pull back slingshot on board or adjust the Power slider (10–100%).</p>
            </div>
          </div>

          <div className="p-1.5 rounded-lg bg-canvas/60 border border-border/70 flex items-start gap-2">
            <Play className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-text-primary">Shoot:</span>
              <p className="text-[10px] text-text-muted">Press the prominent SHOOT button or release your drag pull.</p>
            </div>
          </div>
        </div>

        {/* Pro Tips Callout */}
        <div className="mt-auto p-2 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-2 shrink-0">
          <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-[10px] text-text-primary leading-tight">
            <span className="font-bold text-amber-600 dark:text-amber-400">Pro Tip:</span> Bank shots off wooden cushions to pocket trapped coins and execute double rebounds!
          </p>
        </div>
      </div>
    </aside>
  );
};
