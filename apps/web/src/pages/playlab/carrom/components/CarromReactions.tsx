// =========================================================
// VIDYAVERSE NEWTON'S CARROM — QUICK EMOJI REACTIONS
// =========================================================

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PRESET_REACTIONS = [
  { emoji: '👍', label: 'Well Played!' },
  { emoji: '🎯', label: 'Perfect Strike!' },
  { emoji: '🎉', label: 'Queen Covered!' },
  { emoji: '👏', label: 'Nice Bank Shot!' },
  { emoji: '🤔', label: 'Calculating Angle...' },
  { emoji: '🔥', label: 'On Fire!' },
];

interface CarromReactionsProps {
  onSendReaction?: (reaction: { emoji: string; label: string }) => void;
}

export const CarromReactions: React.FC<CarromReactionsProps> = ({ onSendReaction }) => {
  const [activeBubble, setActiveBubble] = useState<{ emoji: string; label: string } | null>(null);

  const handleSelect = (r: { emoji: string; label: string }) => {
    setActiveBubble(r);
    onSendReaction?.(r);
    setTimeout(() => {
      setActiveBubble(null);
    }, 2500);
  };

  return (
    <>
      {/* Floating active reaction bubble */}
      <AnimatePresence>
        {activeBubble && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-40 px-4 py-2 rounded-2xl bg-card/95 border-2 border-amber-500/60 shadow-2xl backdrop-blur-md flex items-center gap-2"
          >
            <span className="text-2xl">{activeBubble.emoji}</span>
            <span className="text-xs font-black text-text-primary">{activeBubble.label}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reaction pill bar */}
      <div className="flex items-center gap-1 p-1 bg-card/90 backdrop-blur-sm border border-border rounded-2xl shadow-xs">
        {PRESET_REACTIONS.map((r, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSelect(r)}
            className="p-1 sm:p-1.5 rounded-xl hover:bg-canvas transition-transform hover:scale-125 text-base sm:text-lg leading-none cursor-pointer"
            title={r.label}
          >
            {r.emoji}
          </button>
        ))}
      </div>
    </>
  );
};
