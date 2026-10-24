// =========================================================
// VIDYAVERSE NEWTON'S CARROM — RIGHT COLUMN
// Striker Position, Aim Angle, Shot Power, Board Friction & SHOOT Button
// Exactly arranged vertically according to Hand-Drawn Wireframe Specification
// =========================================================

import React from 'react';
import {
  Sliders,
  MoveHorizontal,
  Compass,
  Zap,
  Play,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { clsx } from 'clsx';
import { PlayerSlot } from '../types';

export interface CarromRightPanelProps {
  activePlayer: PlayerSlot;
  isShotInMotion: boolean;
  strikerBaselinePos: number;
  onBaselinePosChange: (newPos: number) => void;
  aimAngleRad: number;
  onAimAngleChange: (newAngle: number) => void;
  shotPower: number;
  onShotPowerChange: (newPower: number) => void;
  boardFriction: number;
  onBoardFrictionChange: (newFriction: number) => void;
  onShoot: () => void;
}

export const CarromRightPanel: React.FC<CarromRightPanelProps> = ({
  activePlayer,
  isShotInMotion,
  strikerBaselinePos,
  onBaselinePosChange,
  aimAngleRad,
  onAimAngleChange,
  shotPower,
  onShotPowerChange,
  boardFriction,
  onBoardFrictionChange,
  onShoot,
}) => {
  const isTurnDisabled = activePlayer.isBot || isShotInMotion;

  // Convert aim angle from radians to integer degrees (-180 to 0)
  const aimAngleDeg = Math.round((aimAngleRad * 180) / Math.PI);

  const handleAngleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const deg = Number(e.target.value);
    onAimAngleChange((deg * Math.PI) / 180);
  };

  const handleAngleNudge = (deltaDeg: number) => {
    let nextDeg = aimAngleDeg + deltaDeg;
    if (nextDeg < -175) nextDeg = -175;
    if (nextDeg > -5) nextDeg = -5;
    onAimAngleChange((nextDeg * Math.PI) / 180);
  };

  return (
    <aside className="w-full lg:w-[270px] xl:w-[290px] h-full flex flex-col justify-between gap-2 overflow-hidden shrink-0 select-none">
      <div className="bg-card rounded-2xl border border-border p-2 sm:p-2.5 shadow-xs flex flex-col justify-between h-full gap-1 sm:gap-1.5 overflow-hidden">
        
        {/* Panel Header */}
        <div className="flex items-center justify-between border-b border-border/80 pb-1.5 shrink-0">
          <div className="flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <h2 className="text-xs font-bold text-text-primary uppercase tracking-wider">
              Striker & Shot Controls
            </h2>
          </div>
          <span
            className={clsx(
              'text-[10px] font-bold px-2 py-0.5 rounded-full border',
              isShotInMotion
                ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                : activePlayer.isBot
                ? 'bg-slate-500/10 text-text-muted border-border'
                : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
            )}
          >
            {isShotInMotion ? 'In Motion' : activePlayer.isBot ? 'Bot Turn' : 'Ready'}
          </span>
        </div>

        {/* =====================================================
            1. STRIKER POSITION SLIDER
            ===================================================== */}
        <div className="p-1 sm:p-1.5 rounded-xl bg-canvas/60 border border-border/80 space-y-0.5 shrink-0">
          <div className="flex items-center justify-between text-xs font-bold text-text-primary">
            <span className="flex items-center gap-1.5 text-text-secondary">
              <MoveHorizontal className="w-3.5 h-3.5 text-blue-500" />
              <span>1. Striker Position</span>
            </span>
            <span className="font-mono text-blue-600 dark:text-blue-400 font-bold bg-blue-500/10 px-1.5 py-0.2 rounded text-[10px]">
              {strikerBaselinePos} px
            </span>
          </div>

          <input
            type="range"
            min="200"
            max="600"
            step="2"
            value={strikerBaselinePos}
            disabled={isTurnDisabled}
            onChange={(e) => onBaselinePosChange(Number(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer h-1.5 bg-card rounded-lg disabled:opacity-50"
          />

          <div className="flex items-center justify-between text-[9px] text-text-muted">
            <button
              type="button"
              disabled={isTurnDisabled}
              onClick={() => onBaselinePosChange(240)}
              className="px-1.5 py-0.2 rounded bg-canvas hover:bg-card border border-border text-text-muted hover:text-text-primary transition-colors cursor-pointer disabled:opacity-50"
            >
              Left (240)
            </button>
            <button
              type="button"
              disabled={isTurnDisabled}
              onClick={() => onBaselinePosChange(400)}
              className="px-1.5 py-0.2 rounded bg-canvas hover:bg-card border border-border text-text-muted hover:text-text-primary transition-colors cursor-pointer disabled:opacity-50"
            >
              Center (400)
            </button>
            <button
              type="button"
              disabled={isTurnDisabled}
              onClick={() => onBaselinePosChange(560)}
              className="px-1.5 py-0.2 rounded bg-canvas hover:bg-card border border-border text-text-muted hover:text-text-primary transition-colors cursor-pointer disabled:opacity-50"
            >
              Right (560)
            </button>
          </div>
        </div>

        {/* =====================================================
            2. AIM ANGLE SLIDER & CONTROL
            ===================================================== */}
        <div className="p-1 sm:p-1.5 rounded-xl bg-canvas/60 border border-border/80 space-y-0.5 shrink-0">
          <div className="flex items-center justify-between text-xs font-bold text-text-primary">
            <span className="flex items-center gap-1.5 text-text-secondary">
              <Compass className="w-3.5 h-3.5 text-cyan-500" />
              <span>2. Aim Angle</span>
            </span>
            <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold bg-cyan-500/10 px-1.5 py-0.2 rounded text-[10px]">
              {aimAngleDeg}°
            </span>
          </div>

          <input
            type="range"
            min="-175"
            max="-5"
            step="1"
            value={aimAngleDeg}
            disabled={isTurnDisabled}
            onChange={handleAngleSliderChange}
            className="w-full accent-cyan-500 cursor-pointer h-1.5 bg-card rounded-lg disabled:opacity-50"
          />

          <div className="flex items-center justify-between gap-1 text-[9px]">
            <button
              type="button"
              disabled={isTurnDisabled}
              onClick={() => handleAngleNudge(-5)}
              className="flex-1 py-0.5 rounded-md bg-canvas hover:bg-card border border-border text-text-secondary hover:text-text-primary font-bold transition-all cursor-pointer disabled:opacity-50"
              title="Nudge 5 degrees counter-clockwise"
            >
              -5°
            </button>
            <button
              type="button"
              disabled={isTurnDisabled}
              onClick={() => onAimAngleChange(-Math.PI / 2)}
              className="flex-1 py-0.5 rounded-md bg-canvas hover:bg-card border border-border text-text-secondary hover:text-text-primary font-bold transition-all cursor-pointer disabled:opacity-50"
              title="Reset aim straight forward"
            >
              🎯 Straight
            </button>
            <button
              type="button"
              disabled={isTurnDisabled}
              onClick={() => handleAngleNudge(5)}
              className="flex-1 py-0.5 rounded-md bg-canvas hover:bg-card border border-border text-text-secondary hover:text-text-primary font-bold transition-all cursor-pointer disabled:opacity-50"
              title="Nudge 5 degrees clockwise"
            >
              +5°
            </button>
          </div>
        </div>

        {/* =====================================================
            3. SHOT POWER SLIDER
            ===================================================== */}
        <div className="p-1 sm:p-1.5 rounded-xl bg-canvas/60 border border-border/80 space-y-0.5 shrink-0">
          <div className="flex items-center justify-between text-xs font-bold text-text-primary">
            <span className="flex items-center gap-1.5 text-text-secondary">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>3. Shot Power</span>
            </span>
            <span className="font-mono text-amber-600 dark:text-amber-400 font-bold bg-amber-500/10 px-1.5 py-0.2 rounded text-[10px]">
              {shotPower}%
            </span>
          </div>

          <input
            type="range"
            min="10"
            max="100"
            step="1"
            value={shotPower}
            disabled={isTurnDisabled}
            onChange={(e) => onShotPowerChange(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer h-1.5 bg-card rounded-lg disabled:opacity-50"
          />

          {/* Quick preset chips */}
          <div className="grid grid-cols-4 gap-1">
            {[25, 50, 75, 100].map((p) => (
              <button
                key={p}
                type="button"
                disabled={isTurnDisabled}
                onClick={() => onShotPowerChange(p)}
                className={clsx(
                  'py-0.2 rounded text-[9px] font-bold transition-all cursor-pointer disabled:opacity-50 border',
                  shotPower === p
                    ? 'bg-amber-500 text-white border-amber-600 shadow-2xs'
                    : 'bg-canvas hover:bg-card border-border text-text-muted hover:text-text-primary'
                )}
              >
                {p}%
              </button>
            ))}
          </div>
        </div>

        {/* =====================================================
            4. BOARD FRICTION SLIDER
            ===================================================== */}
        <div className="p-1 sm:p-1.5 rounded-xl bg-canvas/60 border border-border/80 space-y-0.5 shrink-0">
          <div className="flex items-center justify-between text-xs font-bold text-text-primary">
            <span className="flex items-center gap-1.5 text-text-secondary">
              <Sliders className="w-3.5 h-3.5 text-emerald-500" />
              <span>4. Board Friction</span>
            </span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.2 rounded text-[10px]">
              {boardFriction.toFixed(3)}
            </span>
          </div>

          <input
            type="range"
            min="0.005"
            max="0.035"
            step="0.001"
            value={boardFriction}
            onChange={(e) => onBoardFrictionChange(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-card rounded-lg"
          />

          {/* Friction Presets */}
          <div className="flex items-center justify-between gap-1 text-[9px]">
            <button
              type="button"
              onClick={() => onBoardFrictionChange(0.006)}
              className={clsx(
                'flex-1 py-0.2 rounded border transition-colors cursor-pointer text-center font-semibold truncate',
                boardFriction <= 0.008
                  ? 'bg-emerald-500 text-white border-emerald-600 shadow-2xs'
                  : 'bg-canvas hover:bg-card border-border text-text-muted'
              )}
              title="⚡ Slick Powder (Low Friction: coins glide far)"
            >
              ⚡ Slick
            </button>
            <button
              type="button"
              onClick={() => onBoardFrictionChange(0.013)}
              className={clsx(
                'flex-1 py-0.2 rounded border transition-colors cursor-pointer text-center font-semibold truncate',
                boardFriction > 0.008 && boardFriction < 0.022
                  ? 'bg-emerald-500 text-white border-emerald-600 shadow-2xs'
                  : 'bg-canvas hover:bg-card border-border text-text-muted'
              )}
              title="🎯 Standard Boric Powder (Balanced carrom play)"
            >
              🎯 Normal
            </button>
            <button
              type="button"
              onClick={() => onBoardFrictionChange(0.028)}
              className={clsx(
                'flex-1 py-0.2 rounded border transition-colors cursor-pointer text-center font-semibold truncate',
                boardFriction >= 0.022
                  ? 'bg-emerald-500 text-white border-emerald-600 shadow-2xs'
                  : 'bg-canvas hover:bg-card border-border text-text-muted'
              )}
              title="🪵 Rough Wood (High Friction: coins stop quickly)"
            >
              🪵 Rough
            </button>
          </div>
        </div>

        {/* =====================================================
            5. PROMINENT SHOOT BUTTON
            ===================================================== */}
        <div className="pt-0.5 mt-auto shrink-0">
          <button
            type="button"
            onClick={onShoot}
            disabled={isTurnDisabled}
            className={clsx(
              'w-full py-2 sm:py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 font-black text-xs sm:text-sm tracking-wide transition-all shadow-md active:scale-[0.98] cursor-pointer',
              isTurnDisabled
                ? 'bg-slate-300 dark:bg-slate-800 text-text-muted cursor-not-allowed opacity-60'
                : 'bg-gradient-to-r from-[#6541F5] via-[#5b36ed] to-[#5230E8] text-white hover:shadow-purple-500/30 hover:brightness-105'
            )}
          >
            <Play className="w-4 h-4 fill-current" />
            <span>
              {isShotInMotion
                ? 'SIMULATING...'
                : activePlayer.isBot
                ? 'BOT IS AIMING...'
                : `SHOOT NOW (${shotPower}%)`}
            </span>
          </button>
        </div>

      </div>
    </aside>
  );
};
