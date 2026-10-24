// =========================================================
// VIDYAVERSE NEWTON'S CARROM — PHYSICS LAB & TELEMETRY PANEL
// =========================================================

import React, { useState } from 'react';
import { Activity, Sliders, BookOpen, ChevronDown, ChevronUp, Sparkles, Zap, Flame } from 'lucide-react';
import { clsx } from 'clsx';
import { ShotTelemetry, CarromPhysicsConfig, CarromSubMode } from '../types';
import { NEWTON_LAWS_CONCEPTS, COEFFICIENT_OF_RESTITUTION_INFO } from '../physicsLabData';

export interface CarromPhysicsLabPanelProps {
  subMode: CarromSubMode;
  config: CarromPhysicsConfig;
  onConfigChange: (newConfig: Partial<CarromPhysicsConfig>) => void;
  lastTelemetry: ShotTelemetry | null;
  strikerSpeed: number;
}

export const CarromPhysicsLabPanel: React.FC<CarromPhysicsLabPanelProps> = ({
  subMode,
  config,
  onConfigChange,
  lastTelemetry,
  strikerSpeed,
}) => {
  const [activeLawTab, setActiveLawTab] = useState<1 | 2 | 3>(lastTelemetry?.lawReferenced || 1);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const selectedConcept = NEWTON_LAWS_CONCEPTS.find((c) => c.law === activeLawTab) || NEWTON_LAWS_CONCEPTS[0];

  return (
    <div className="card p-3 sm:p-4 bg-card border border-border shadow-xs space-y-3.5">
      {/* 1. Panel Header with Expand/Collapse */}
      <div className="flex items-center justify-between border-b border-border/80 pb-2">
        <div className="flex items-center gap-1.5">
          <Activity className="w-4 h-4 text-emerald-500" />
          <h2 className="text-xs sm:text-sm font-bold text-text-primary uppercase tracking-wide">
            {subMode === 'lab' ? 'Physics Lab & Telemetry' : 'Newton’s Physics Insights'}
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 rounded-lg text-text-muted hover:text-text-primary hover:bg-canvas"
        >
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-3">
          {/* 2. REALTIME COLLISION & MOTION TELEMETRY */}
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

          {/* 3. DYNAMIC SHOT ANALYSIS (Updates after every real shot) */}
          {lastTelemetry?.newtonExplanation && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Last Shot Physics Analysis (Law {lastTelemetry.lawReferenced})</span>
              </div>
              <p className="text-[11px] leading-relaxed text-text-primary">
                {lastTelemetry.newtonExplanation}
              </p>
            </div>
          )}

          {/* 4. BOARD SURFACE FRICTION CONTROLLER (Always accessible) */}
          <div className="p-3 rounded-xl bg-canvas/70 border border-border space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-text-primary">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-500" />
                <span>Board Surface Friction</span>
              </span>
              <span className="font-mono text-cyan-500 font-bold">
                {config.frictionAir.toFixed(3)}{' '}
                <span className="text-[10px] text-text-muted font-normal">
                  ({config.frictionAir <= 0.008 ? '⚡ Ultra Slick' : config.frictionAir <= 0.018 ? '🎯 Standard Boric' : '🪵 Rough Wood'})
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
              className="w-full accent-cyan-500 cursor-pointer h-2 bg-card rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-text-muted">
              <span>⚡ 0.005 (Slick Powder)</span>
              <span>0.013 (Standard)</span>
              <span>0.035 (Rough) 🪵</span>
            </div>
          </div>

          {/* 5. ADVANCED PHYSICS LAB CONSTANTS (Lab Mode) */}
          {subMode === 'lab' && (
            <div className="p-3 rounded-xl bg-canvas/70 border border-border space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-text-primary">
                <Sliders className="w-3.5 h-3.5 text-amber-500" />
                <span>Advanced Physics Constants</span>
              </div>

              {/* Restitution Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-text-muted">Restitution e (Cushion Elasticity):</span>
                  <span className="font-mono font-bold text-amber-500">{config.restitution.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.50"
                  max="0.95"
                  step="0.05"
                  value={config.restitution}
                  onChange={(e) => onConfigChange({ restitution: Number(e.target.value) })}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-card rounded-lg"
                />
                <span className="text-[10px] text-text-muted block">
                  Higher = bouncy energetic rebounds; lower = dampens speed.
                </span>
              </div>

              {/* Striker Mass Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-text-muted">Striker Mass:</span>
                  <span className="font-mono font-bold text-purple-500">{config.strikerMass.toFixed(1)} kg</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="14"
                  step="0.5"
                  value={config.strikerMass}
                  onChange={(e) => onConfigChange({ strikerMass: Number(e.target.value) })}
                  className="w-full accent-purple-500 cursor-pointer h-2 bg-card rounded-lg"
                />
                <span className="text-[10px] text-text-muted block">
                  Higher mass transfers higher momentum into lightweight coins ($F = ma$).
                </span>
              </div>
            </div>
          )}

          {/* 5. NEWTON'S 3 LAWS CONCEPT EXPLORER */}
          <div className="space-y-2 pt-2 border-t border-border/80">
            <div className="flex items-center gap-1.5 text-xs font-bold text-text-muted uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-blue-500" />
              <span>Newton’s Laws of Motion</span>
            </div>

            {/* 3 Law Tabs */}
            <div className="grid grid-cols-3 gap-1 p-0.5 bg-canvas rounded-xl border border-border">
              {[1, 2, 3].map((law) => (
                <button
                  key={law}
                  type="button"
                  onClick={() => setActiveLawTab(law as 1 | 2 | 3)}
                  className={clsx(
                    'py-1 rounded-lg text-xs font-bold transition-all text-center',
                    activeLawTab === law
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'text-text-muted hover:text-text-primary'
                  )}
                >
                  {law === 1 ? '1st Law' : law === 2 ? '2nd Law' : '3rd Law'}
                </button>
              ))}
            </div>

            {/* Selected Law Card */}
            <div className="p-3 rounded-xl bg-canvas border border-border text-xs space-y-1.5">
              <div className="font-bold text-text-primary flex items-center justify-between">
                <span>{selectedConcept.title}</span>
                <span className="font-mono text-[10px] text-amber-500 font-bold bg-amber-500/15 px-2 py-0.5 rounded-md">
                  {selectedConcept.formula}
                </span>
              </div>
              <p className="text-[11px] text-text-muted leading-relaxed">
                {selectedConcept.description}
              </p>
              <div className="pt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                💡 <span className="font-bold">Carrom Application:</span> {selectedConcept.carromApplication}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
