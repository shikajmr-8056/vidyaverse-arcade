// =========================================================
// VIDYAVERSE NEWTON'S CARROM — BOTTOM REGION
// Newton's Physics Insights (Full-Width Dedicated Horizontal Panel)
// Strictly following Hand-Drawn Wireframe Specification
// =========================================================

import React, { useState } from 'react';
import {
  Atom,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Zap,
  Target,
  Activity,
  Layers,
  Info,
} from 'lucide-react';
import { clsx } from 'clsx';
import { ShotTelemetry, CarromPhysicsConfig } from '../types';

export interface CarromPhysicsBottomBarProps {
  lastTelemetry: ShotTelemetry | null;
  strikerSpeed: number;
  config: CarromPhysicsConfig;
}

type ConceptKey =
  | 'first_law'
  | 'second_law'
  | 'third_law'
  | 'momentum'
  | 'friction'
  | 'collisions';

interface PhysicsConceptItem {
  key: ConceptKey;
  tabLabel: string;
  title: string;
  formula: string;
  summary: string;
  carromApplication: string;
  details: string;
}

const PHYSICS_CONCEPTS: PhysicsConceptItem[] = [
  {
    key: 'first_law',
    tabLabel: "Newton's 1st Law",
    title: "Newton's First Law (Law of Inertia)",
    formula: 'ΣF = 0 ⟹ v = constant',
    summary:
      'Coins remain at rest until struck. Once sliding, they continue at constant velocity unless opposing friction slows them.',
    carromApplication:
      'Boric carrom powder drastically lowers contact resistance, letting striker and coins glide with near-pure inertia across the smooth wooden surface.',
    details:
      'Inertia measures resistance to change in motion. Coins have lower mass (~5g) than the striker (~15g), meaning their inertia is easier to overcome.',
  },
  {
    key: 'second_law',
    tabLabel: "Newton's 2nd Law",
    title: "Newton's Second Law (Force & Impulse)",
    formula: 'F = m · a = Δp / Δt',
    summary:
      'Acceleration is directly proportional to applied force and inversely proportional to mass. Impulse equals momentum change.',
    carromApplication:
      'Higher shot power delivers greater impulse (J = F·Δt), causing coins to rapidly accelerate and travel faster across the board.',
    details:
      'When the striker collides with a coin over a brief impact duration (~3ms), the contact force generates instantaneous acceleration a = F/m.',
  },
  {
    key: 'third_law',
    tabLabel: "Newton's 3rd Law",
    title: "Newton's Third Law (Action-Reaction)",
    formula: 'F(action) = -F(reaction)',
    summary:
      'Every action force exerts an equal and opposite reaction force between colliding bodies.',
    carromApplication:
      'When the striker strikes a coin, the coin pushes back with identical force, causing the striker to decelerate or deflect while propelling the coin.',
    details:
      'In a head-on collision between a striker and a coin, both experience equal contact impulses in opposite directions.',
  },
  {
    key: 'momentum',
    tabLabel: 'Momentum',
    title: 'Conservation of Linear Momentum',
    formula: 'p = m · v  (Σp_initial = Σp_final)',
    summary:
      'Total momentum (p = mv) of the striker-coin system remains conserved across all internal collisions on the board.',
    carromApplication:
      'In multi-coin cluster breaks, the striker’s initial momentum is partitioned among all contacted coins according to impact vectors.',
    details:
      'Vector momentum px and py are conserved independently, enabling precise bank and angle shot calculations.',
  },
  {
    key: 'friction',
    tabLabel: 'Friction',
    title: 'Kinetic Friction & Drag Force',
    formula: 'f_k = μ_k · N',
    summary:
      'Friction opposes sliding motion, gradually converting the kinetic energy of pieces into microscopic thermal energy.',
    carromApplication:
      'Adjusting board friction models the difference between coarse untreated wood and ultra-smooth boric-powdered tournament surfaces.',
    details:
      'Lower friction allows soft bank shots to reach pockets, while higher friction demands greater initial striking power.',
  },
  {
    key: 'collisions',
    tabLabel: 'Collisions',
    title: 'Elastic Collisions & Coefficient of Restitution',
    formula: 'e = (v₂ - v₁) / (u₁ - u₂) ≈ 0.88',
    summary:
      'The coefficient of restitution (e) determines elasticity. e=1 is perfectly elastic; carrom cushions typically have e ≈ 0.85.',
    carromApplication:
      'Elastic wood cushion rebounds reflect the striker according to the law of reflection (angle of incidence = angle of reflection).',
    details:
      'Energy loss during rebounds depends on board frame elasticity and cushion bumper stiffness.',
  },
];

export const CarromPhysicsBottomBar: React.FC<CarromPhysicsBottomBarProps> = ({
  lastTelemetry,
  strikerSpeed,
  config,
}) => {
  const [selectedKey, setSelectedKey] = useState<ConceptKey>('first_law');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const activeConcept =
    PHYSICS_CONCEPTS.find((c) => c.key === selectedKey) || PHYSICS_CONCEPTS[0];

  const momentumValue = (strikerSpeed * config.strikerMass).toFixed(1);

  return (
    <footer className="w-full shrink-0 bg-card border border-border rounded-2xl shadow-xs p-2.5 sm:p-3 select-none flex flex-col gap-2 transition-all">
      {/* 1. TOP CONTROL ROW: Header + Tabs + Telemetry Badges (With Larger Values) */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/70 pb-2">
        {/* Left: Section Title */}
        <div className="flex items-center gap-1.5 shrink-0">
          <Atom className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider">
            Newton's Physics Insights
          </h3>
        </div>

        {/* Center: Concept Selector Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto py-0.5 no-scrollbar max-w-full">
          {PHYSICS_CONCEPTS.map((concept) => (
            <button
              key={concept.key}
              type="button"
              onClick={() => setSelectedKey(concept.key)}
              className={clsx(
                'px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all whitespace-nowrap cursor-pointer border',
                selectedKey === concept.key
                  ? 'bg-purple-600 text-white border-purple-700 shadow-2xs'
                  : 'bg-canvas hover:bg-card border-border text-text-muted hover:text-text-primary'
              )}
            >
              {concept.tabLabel}
            </button>
          ))}
        </div>

        {/* Right: Live Telemetry Readouts (Made larger as requested in Pic 2) & Details Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-2 font-mono">
            {/* 1. Striker Speed Pill */}
            <div
              className="px-2.5 py-1 rounded-xl bg-canvas border border-border/80 shadow-2xs flex items-center gap-1.5"
              title="Speed (v): Instantaneous velocity of the striker gliding on the board surface"
            >
              <Zap className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="text-sm sm:text-base font-black text-emerald-600 dark:text-emerald-400">
                {strikerSpeed}
              </span>
              <span className="text-[11px] font-semibold text-text-muted">px/s</span>
            </div>

            {/* 2. Momentum Pill */}
            <div
              className="px-2.5 py-1 rounded-xl bg-canvas border border-border/80 shadow-2xs flex items-center gap-1.5"
              title="Momentum (p = mv): Striker mass x velocity; governs collision impact power"
            >
              <Target className="w-4 h-4 text-blue-500 shrink-0" />
              <span className="text-sm sm:text-base font-black text-text-primary">
                {momentumValue}
              </span>
              <span className="text-[11px] font-semibold text-text-muted">kg·px/s</span>
            </div>

            {/* 3. Impacts Pill */}
            <div
              className="px-2.5 py-1 rounded-xl bg-canvas border border-border/80 shadow-2xs flex items-center gap-1.5"
              title="Impacts: Total coin collisions and cushion rebounds during the shot"
            >
              <Activity className="w-4 h-4 text-purple-500 shrink-0" />
              <span className="text-sm sm:text-base font-black text-purple-600 dark:text-purple-400">
                {lastTelemetry?.collisionCount ?? 0}
              </span>
              <span className="text-[11px] font-semibold text-text-muted">impacts</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-canvas hover:bg-card border border-border text-text-secondary hover:text-text-primary text-xs font-bold transition-all cursor-pointer shadow-2xs"
            title="Toggle telemetry and concept explanations"
          >
            <span>{isExpanded ? 'Less' : 'Details'}</span>
            {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {isExpanded && (
      <>
      {/* 2. CONCEPT CONTENT ROW + TELEMETRY METRIC EXPLAINER STRIP */}
      <div className="flex flex-col gap-1.5">
        {/* Active Law Concept Line */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-2 min-w-0">
            <span className="font-bold text-text-primary text-xs shrink-0">
              {activeConcept.title}:
            </span>
            <span className="font-mono text-[10px] font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 px-1.5 py-0.5 rounded shrink-0">
              {activeConcept.formula}
            </span>
            <span className="text-[11px] text-text-secondary truncate">
              {activeConcept.summary}
            </span>
          </div>

          {/* Dynamic Last Shot Callout if Available */}
          {lastTelemetry?.newtonExplanation && (
            <div className="hidden lg:flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-[10px] shrink-0 font-medium max-w-[420px] truncate">
              <Sparkles className="w-3 h-3 shrink-0" />
              <span className="truncate">Last Shot: {lastTelemetry.newtonExplanation}</span>
            </div>
          )}
        </div>

        {/* Dedicated Telemetry Explanations Bar (Explains Speed, Momentum & Impacts) */}
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-text-muted bg-canvas/60 px-2.5 py-1 rounded-xl border border-border/60">
          <span className="font-bold text-text-primary flex items-center gap-1">
            <Info className="w-3 h-3 text-purple-500" />
            <span>Telemetry Guide:</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="font-bold text-emerald-600 dark:text-emerald-400">⚡ Speed (v)</span> = instantaneous velocity on board
          </span>
          <span className="text-border">•</span>
          <span className="flex items-center gap-1">
            <span className="font-bold text-text-primary">🎯 Momentum (p = mv)</span> = mass × velocity (striking punch)
          </span>
          <span className="text-border">•</span>
          <span className="flex items-center gap-1">
            <span className="font-bold text-purple-600 dark:text-purple-400">💥 Impacts</span> = coin collisions & cushion rebounds
          </span>
        </div>
      </div>

      {/* 3. EXPANDABLE DETAILS DRAWER (In-depth Concept & Telemetry Breakdown) */}
      {isExpanded && (
        <div className="pt-2 border-t border-border/70 grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
          {/* Tile 1: Speed Explanation */}
          <div className="p-2 rounded-xl bg-canvas/70 border border-border text-[11px] text-text-secondary space-y-1">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Speed & Surface Motion (v)</span>
            </span>
            <p className="leading-relaxed">
              Measures how fast the striker slides. Boric powder minimizes friction, allowing the striker to glide with near-constant velocity under Newton's 1st Law.
            </p>
          </div>

          {/* Tile 2: Momentum Explanation */}
          <div className="p-2 rounded-xl bg-canvas/70 border border-border text-[11px] text-text-secondary space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-blue-500" />
              <span>Momentum & Impulse Transfer (p = mv)</span>
            </span>
            <p className="leading-relaxed">
              Striker mass (8.0 kg) multiplied by velocity. On collision, impulse <code className="font-mono text-[10px]">J = Δp</code> is transferred into target coins, accelerating them toward pockets.
            </p>
          </div>

          {/* Tile 3: Impacts & Collisions Explanation */}
          <div className="p-2 rounded-xl bg-canvas/70 border border-border text-[11px] text-text-secondary space-y-1">
            <span className="font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-purple-500" />
              <span>Collisions & Rebounds (Impacts)</span>
            </span>
            <p className="leading-relaxed">
              Counts all coin impacts and wooden cushion bounces during the shot. Demonstrates Newton's 3rd Law (equal action-reaction) and energy distribution.
            </p>
          </div>
        </div>
      )}
      </>
      )}
    </footer>
  );
};
