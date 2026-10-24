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
  Activity,
  Layers,
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
    formula: '\\sum \\vec{F} = 0 \\implies \\vec{v} = \\text{constant}',
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
    formula: '\\vec{F} = m\\vec{a} = \\frac{\\Delta \\vec{p}}{\\Delta t}',
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
    formula: '\\vec{F}_{\\text{striker} \\to \\text{coin}} = -\\vec{F}_{\\text{coin} \\to \\text{striker}}',
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
    formula: '\\sum \\vec{p}_{\\text{before}} = \\sum \\vec{p}_{\\text{after}}',
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
    formula: 'f_k = \\mu_k N, \\quad \\vec{F}_{\\text{drag}} = -b\\vec{v}',
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
    formula: 'e = \\frac{v_2 - v_1}{u_1 - u_2} \\approx 0.88',
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
  const kineticEnergyValue = (
    0.5 *
    config.strikerMass *
    Math.pow(strikerSpeed / 100, 2)
  ).toFixed(2);

  return (
    <footer className="w-full shrink-0 bg-card border border-border rounded-2xl shadow-xs p-2.5 sm:p-3 select-none flex flex-col gap-2 transition-all">
      {/* 1. TOP CONTROL ROW: Header + Tabs + Telemetry Badges */}
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

        {/* Right: Live Telemetry Readouts & Details Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden md:flex items-center gap-2 font-mono text-[10px]">
            <span className="px-1.5 py-0.5 rounded bg-canvas border border-border text-text-secondary" title="Striker Speed">
              ⚡ <span className="font-bold text-emerald-600 dark:text-emerald-400">{strikerSpeed}</span> px/s
            </span>
            <span className="px-1.5 py-0.5 rounded bg-canvas border border-border text-text-secondary" title="Momentum p=mv">
              🎯 <span className="font-bold text-text-primary">{momentumValue}</span> kg·px/s
            </span>
            <span className="px-1.5 py-0.5 rounded bg-canvas border border-border text-text-secondary" title="Last Shot Collisions">
              💥 <span className="font-bold text-purple-600 dark:text-purple-400">{lastTelemetry?.collisionCount ?? 0}</span> impacts
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-canvas hover:bg-card border border-border text-text-muted hover:text-text-primary text-[10px] font-bold transition-colors cursor-pointer"
          >
            <span>{isExpanded ? 'Less' : 'Details'}</span>
            {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* 2. CONCEPT CONTENT ROW (Compact single line by default) */}
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

      {/* 3. EXPANDABLE DETAILS DRAWER */}
      {isExpanded && (
        <div className="pt-2 border-t border-border/70 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          <div className="p-2 rounded-xl bg-canvas/70 border border-border text-[11px] text-text-secondary">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-0.5">
              💡 Carrom Application:
            </span>
            <p className="leading-relaxed">{activeConcept.carromApplication}</p>
          </div>

          <div className="p-2 rounded-xl bg-canvas/70 border border-border text-[11px] text-text-secondary">
            <span className="font-bold text-purple-600 dark:text-purple-400 block mb-0.5">
              🔬 Theoretical Foundation:
            </span>
            <p className="leading-relaxed">{activeConcept.details}</p>
          </div>
        </div>
      )}
    </footer>
  );
};
