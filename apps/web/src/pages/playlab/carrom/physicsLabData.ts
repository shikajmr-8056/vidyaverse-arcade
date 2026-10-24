// =========================================================
// VIDYAVERSE NEWTON'S CARROM — EDUCATIONAL PHYSICS DATA
// =========================================================

import { ShotTelemetry } from './types';

export interface PhysicsConcept {
  id: string;
  title: string;
  law: 1 | 2 | 3;
  formula: string;
  description: string;
  carromApplication: string;
  units: string;
}

export const NEWTON_LAWS_CONCEPTS: PhysicsConcept[] = [
  {
    id: 'first_law',
    title: "Newton's First Law (Law of Inertia)",
    law: 1,
    formula: 'ΣF = 0 ⟹ v = constant',
    description:
      'An object at rest stays at rest, and an object in motion continues in a straight line at constant velocity unless acted upon by a net external force.',
    carromApplication:
      'Carrom coins remain stationary until struck. Once in motion, they would glide forever on an ideal frictionless surface; boric powder minimizes friction, bringing real-world physics close to pure inertia.',
    units: 'N (Newtons) or m/s for velocity',
  },
  {
    id: 'second_law',
    title: "Newton's Second Law (Force & Momentum)",
    law: 2,
    formula: 'F = m · a = Δp / Δt,   J = Δp',
    description:
      'The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. Impulse (force over time) equals the change in momentum.',
    carromApplication:
      'The heavy striker (mass ~15g) requires more initial impulse than lightweight carrom coins (~5g). When the striker strikes a coin with high impulse, the coin accelerates rapidly.',
    units: 'kg·m/s (or N·s) for impulse & momentum',
  },
  {
    id: 'third_law',
    title: "Newton's Third Law (Action-Reaction)",
    law: 3,
    formula: 'F(action) = -F(reaction)',
    description:
      'For every action force, there is an equal in magnitude and opposite in direction reaction force acting on the interacting bodies.',
    carromApplication:
      'When the striker hits a coin, the coin pushes back on the striker with identical instantaneous force. The striker decelerates or deflects while the coin shoots forward.',
    units: 'N (Equal & opposite vectors)',
  },
];

export const COEFFICIENT_OF_RESTITUTION_INFO = {
  title: 'Coefficient of Restitution (e)',
  formula: 'e = (v₂ - v₁) / (u₁ - u₂)',
  description:
    'Measures the elasticity of collisions. e = 1 is perfectly elastic (no kinetic energy lost), while e = 0 is perfectly inelastic (bodies stick together). Carrom wood cushions typically have e ≈ 0.80 to 0.88.',
};

/**
 * Generate a dynamic educational physics explanation based on the telemetry of a real shot
 */
export function generateShotPhysicsExplanation(telemetry: ShotTelemetry): {
  explanation: string;
  law: 1 | 2 | 3;
} {
  const { collisionCount, powerPercent, coinsPocketedInShot, initialSpeed, momentum, restitution } = telemetry;

  if (collisionCount === 0) {
    return {
      explanation: `Newton's 1st Law (Inertia): The striker launched with initial momentum p = ${momentum.toFixed(1)} kg·px/s and travelled in a straight line until board friction (drag force) gradually dissipated its kinetic energy to rest without coin contact.`,
      law: 1,
    };
  }

  if (collisionCount >= 2) {
    return {
      explanation: `Conservation of Momentum & Newton's 3rd Law: The striker transferred impulse through a chained sequence of ${collisionCount} collisions. In each impact, equal and opposite forces redistributed kinetic energy, causing multiple coins to disperse across the board.`,
      law: 3,
    };
  }

  if (coinsPocketedInShot.length > 0) {
    const pocketedNames = coinsPocketedInShot.map((c) => c.toUpperCase()).join(', ');
    return {
      explanation: `Newton's 2nd Law (Impulse Transfer): A clean collision transferred sufficient directional impulse to overcome static friction, propelling ${pocketedNames} directly into the pocket trajectory!`,
      law: 2,
    };
  }

  if (powerPercent > 75) {
    return {
      explanation: `Newton's 2nd & 3rd Laws: High-impulse strike (${powerPercent}% power). Striker delivered large momentum transfer. With restitution e = ${restitution.toFixed(2)}, the elastic rebound maintained high exit velocities.`,
      law: 2,
    };
  }

  return {
    explanation: `Newton's 3rd Law: Striker and target coin exerted equal and opposite contact forces during impact. Because the striker has higher mass than the coin, the coin experienced greater acceleration (a = F/m).`,
    law: 3,
  };
}
