// =========================================================
// VIDYAVERSE NEWTON'S CARROM — PHYSICS LAB & RULES RAIL
// Right Column Rail matching Math Ludo QuizRail architecture
// =========================================================

import React from 'react';
import {
  Sparkles,
  Shield,
  Sliders,
  Activity,
  Zap,
  Info,
  CheckCircle2,
  Crown,
} from 'lucide-react';
import { clsx } from 'clsx';
import { ShotTelemetry, CarromPhysicsConfig, CarromSubMode } from '../types';

interface CarromPhysicsRailProps {
  subMode: CarromSubMode;
  config: CarromPhysicsConfig;
  onConfigChange: (newConfig: Partial<CarromPhysicsConfig>) => void;
  lastTelemetry: ShotTelemetry | null;
  strikerSpeed: number;
  activityLog: string[];
}

export const CarromPhysicsRail: React.FC<CarromPhysicsRailProps> = ({
  subMode,
  config,
  onConfigChange,
  lastTelemetry,
  strikerSpeed,
  activityLog,
}) => {
  const getFrictionLabel = (val: number) => {
    if (val <= 0.008) return '⚡ Ultra Slick';
    if (val <= 0.018) return '🎯 Standard Boric';
    return '🪵 Rough Wood';
  };

  return (
    <div className="hidden lg:flex shrink-0 w-80 xl:w-96 2xl:w-[420px] h-full max-h-[780px] flex-col justify-between py-1 gap-2.5">
      {/* CARD 1: NEWTON'S PHYSICS HUB & TELEMETRY (Matching Ludo's Curriculum Station) */}
      <div className="card p-3 sm:p-4 bg-card border-border shadow-md flex-1 min-h-0 flex flex-col justify-between text-left space-y-2.5">
        
        {/* Header with Title and Mode Badge */}
        <div className="flex items-center justify-between pb-1.5 border-b border-border shrink-0">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <h3 className="text-xs sm:text-sm font-bold text-text-primary uppercase tracking-wider">
              Newton’s Physics Hub
            </h3>
          </div>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/30">
            {subMode === 'lab' ? 'Physics Lab Mode' : 'Newton’s Laws'}
          </span>
        </div>

        {/* 4 Telemetry Stat Tiles (Speed, Momentum, Energy, Impacts) */}
        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
          <div className="p-2.5 rounded-xl bg-canvas border border-border flex flex-col justify-between">
            <span className="text-[10px] text-text-muted uppercase">Striker Speed:</span>
            <span className="text-sm font-bold text-emerald-500">{strikerSpeed} px/s</span>
          </div>

          <div className="p-2.5 rounded-xl bg-canvas border border-border flex flex-col justify-between">
            <span className="text-[10px] text-text-muted uppercase">Momentum (p = mv):</span>
            <span className="text-sm font-bold text-text-primary">
              {(strikerSpeed * config.strikerMass).toFixed(1)} <span className="text-[10px] text-text-muted">kg·px/s</span>
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-canvas border border-border flex flex-col justify-between">
            <span className="text-[10px] text-text-muted uppercase">Kinetic Energy (Ek):</span>
            <span className="text-sm font-bold text-amber-500">
              {(0.5 * config.strikerMass * Math.pow(strikerSpeed / 100, 2)).toFixed(2)} J
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-canvas border border-border flex flex-col justify-between">
            <span className="text-[10px] text-text-muted uppercase">Shot Collisions:</span>
            <span className="text-sm font-bold text-purple-500">
              {lastTelemetry?.collisionCount ?? 0} impacts
            </span>
          </div>
        </div>

        {/* Board Surface Friction Slider with 3 Presets */}
        <div className="p-2.5 rounded-xl bg-canvas/70 border border-border space-y-1.5 shrink-0">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-text-primary flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-cyan-500" />
              <span>Board Surface Friction</span>
            </span>
            <span className="font-mono text-cyan-500 font-bold text-xs">
              {config.frictionAir.toFixed(3)}{' '}
              <span className="text-[10px] text-text-muted font-normal">
                ({getFrictionLabel(config.frictionAir)})
              </span>
            </span>
          </div>

          <input
            type="range"
            min="0.005"
            max="0.035"
            step="0.001"
            value={config.frictionAir}
            onChange={(e) => onConfigChange({ frictionAir: Number(e.target.value) })}
            className="w-full accent-cyan-500 cursor-pointer h-1.5 bg-card rounded-lg"
            title="Adjust board friction"
          />

          <div className="flex items-center justify-between gap-1 pt-0.5">
            <button
              type="button"
              onClick={() => onConfigChange({ frictionAir: 0.006 })}
              className={clsx(
                'flex-1 py-1 rounded-md text-[10px] font-bold border transition-all cursor-pointer text-center',
                config.frictionAir <= 0.008
                  ? 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border-cyan-500/40'
                  : 'bg-card text-text-muted border-border hover:text-text-primary'
              )}
            >
              ⚡ Slick (0.006)
            </button>
            <button
              type="button"
              onClick={() => onConfigChange({ frictionAir: 0.013 })}
              className={clsx(
                'flex-1 py-1 rounded-md text-[10px] font-bold border transition-all cursor-pointer text-center',
                config.frictionAir > 0.008 && config.frictionAir <= 0.018
                  ? 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border-cyan-500/40'
                  : 'bg-card text-text-muted border-border hover:text-text-primary'
              )}
            >
              🎯 Standard (0.013)
            </button>
            <button
              type="button"
              onClick={() => onConfigChange({ frictionAir: 0.026 })}
              className={clsx(
                'flex-1 py-1 rounded-md text-[10px] font-bold border transition-all cursor-pointer text-center',
                config.frictionAir > 0.018
                  ? 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border-cyan-500/40'
                  : 'bg-card text-text-muted border-border hover:text-text-primary'
              )}
            >
              🪵 Rough (0.026)
            </button>
          </div>
        </div>

        {/* Dynamic Newton's Law Explanation Box */}
        {lastTelemetry?.newtonExplanation ? (
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-1 shrink-0">
            <div className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Last Shot Analysis (Newton’s Law {lastTelemetry.lawReferenced})</span>
            </div>
            <p className="text-[11px] leading-relaxed text-text-primary line-clamp-3">
              {lastTelemetry.newtonExplanation}
            </p>
          </div>
        ) : (
          <div className="p-2.5 rounded-xl bg-canvas border border-border text-xs text-text-muted flex items-center gap-2 shrink-0">
            <Info className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="text-[11px]">
              Take a shot to generate real-time collision telemetry and Newton’s laws insights!
            </span>
          </div>
        )}
      </div>

      {/* CARD 2: RULES & TACTICAL BONUSES (Matching Ludo's Rules Card) */}
      <div className="card p-2.5 sm:p-3 bg-card border-border shadow-xs shrink-0 space-y-1.5">
        <div className="flex items-center justify-between pb-1 border-b border-border">
          <div className="flex items-center gap-1.5 text-xs font-bold text-text-primary">
            <Shield className="w-3.5 h-3.5 text-amber-500" />
            <span className="uppercase tracking-wider">Rules & Tactical Bonuses</span>
          </div>
          <span className="text-[10px] text-text-muted font-semibold">Fair Play</span>
        </div>

        <div className="grid grid-cols-2 gap-1.5 text-[11px]">
          <div className="p-1.5 rounded-lg bg-canvas border border-border flex items-center gap-1.5">
            <span className="text-sm">👑</span>
            <span className="font-semibold text-text-secondary">Queen: 25 pts (Cover)</span>
          </div>
          <div className="p-1.5 rounded-lg bg-canvas border border-border flex items-center gap-1.5">
            <span className="text-sm">⚪</span>
            <span className="font-semibold text-text-secondary">White: +10 pts</span>
          </div>
          <div className="p-1.5 rounded-lg bg-canvas border border-border flex items-center gap-1.5">
            <span className="text-sm">⚫</span>
            <span className="font-semibold text-text-secondary">Black: +5 pts</span>
          </div>
          <div className="p-1.5 rounded-lg bg-canvas border border-border flex items-center gap-1.5">
            <span className="text-sm">⚠️</span>
            <span className="font-semibold text-text-secondary">Striker Foul: -5 pts</span>
          </div>
        </div>
      </div>

      {/* CARD 3: MATCH ACTIVITY LOG (Matching Ludo's Match Activity Log) */}
      <div className="card p-2.5 sm:p-3 bg-card border-border shadow-xs shrink-0 space-y-1.5">
        <div className="flex items-center justify-between pb-1 border-b border-border">
          <span className="text-xs font-bold text-text-primary uppercase tracking-wider">
            Match Activity Log
          </span>
          <span className="text-[10px] font-mono text-text-muted">
            {activityLog.length} events
          </span>
        </div>

        <div className="p-2 rounded-xl bg-canvas border border-border max-h-20 overflow-y-auto font-mono text-[11px] space-y-1 text-text-muted">
          {activityLog.slice(-4).map((entry, idx) => (
            <div key={idx} className="leading-snug">
              • {entry}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
