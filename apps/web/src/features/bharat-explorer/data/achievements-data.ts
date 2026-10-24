// =========================================================
// BHARAT EXPLORER — ACHIEVEMENTS DATASET
// Gamification Ranks & Badges for Classes 5–12
// =========================================================

import { ExplorerAchievement } from '../types';

export const EXPLORER_ACHIEVEMENTS: ExplorerAchievement[] = [
  {
    id: 'ach-first-step',
    title: 'First Step on the Map',
    description: 'Select and explore your first State or Union Territory in Bharat Explorer.',
    icon: '🚩',
    category: 'Exploration',
    maxProgress: 1,
    unlocked: false,
    progress: 0
  },
  {
    id: 'ach-map-navigator',
    title: 'Desh Navigator',
    description: 'Explore at least 10 different States or Union Territories on the interactive map.',
    icon: '🧭',
    category: 'Exploration',
    maxProgress: 10,
    unlocked: false,
    progress: 0
  },
  {
    id: 'ach-atlas-collector',
    title: 'Atlas Scholar',
    description: 'Unlock 8 or more collectible discovery cards in your personal Digital Atlas.',
    icon: '📖',
    category: 'Collection',
    maxProgress: 8,
    unlocked: false,
    progress: 0
  },
  {
    id: 'ach-first-expedition',
    title: 'Expedition Graduate',
    description: 'Successfully complete all stages of any expedition with high accuracy.',
    icon: '🏆',
    category: 'Expeditions',
    maxProgress: 1,
    unlocked: false,
    progress: 0
  },
  {
    id: 'ach-river-scholar',
    title: 'Master of Waters',
    description: 'Complete River Tracker challenges across Himalayan and Peninsular rivers.',
    icon: '🌊',
    category: 'Geography',
    maxProgress: 3,
    unlocked: false,
    progress: 0
  },
  {
    id: 'ach-wildlife-scout',
    title: 'Wildlife Protector',
    description: 'Identify species and ecosystems across Gir, Kaziranga, Hemis, and the Western Ghats.',
    icon: '🐅',
    category: 'Biodiversity',
    maxProgress: 4,
    unlocked: false,
    progress: 0
  },
  {
    id: 'ach-bharat-master',
    title: 'Bharat Explorer Supreme',
    description: 'Complete all 7 expeditions across all Indian zones and achieve Bharat Master rank.',
    icon: '👑',
    category: 'Mastery',
    maxProgress: 7,
    unlocked: false,
    progress: 0
  }
];
