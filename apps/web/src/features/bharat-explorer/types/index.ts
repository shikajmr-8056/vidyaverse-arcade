// =========================================================
// BHARAT EXPLORER — CORE TYPES & DATA MODELS
// Educational Geography Game for NCERT Classes 5–12
// =========================================================

export type Zone = 'North' | 'South' | 'East' | 'West' | 'Central' | 'Northeast' | 'Islands';

export type StateType = 'State' | 'Union Territory';

export interface StateRegion {
  id: string;
  name: string;
  capital: string;
  zone: Zone;
  type: StateType;
  color: string;
  terrain: string;
  pathD: string;
  center: [number, number];
  bounds: [[number, number], [number, number]];
  landmarks: string[];
  rivers: string[];
  wildlife: string[];
  culture: string[];
  facts: string[];
}

export interface LandmarkPin {
  id: string;
  name: string;
  stateId: string;
  stateName: string;
  coord: [number, number];
  iconType: 'temple' | 'palace' | 'fort' | 'memorial' | 'natural' | 'monastery';
  imageUrl?: string;
  description: string;
}

export interface RiverFeature {
  id: string;
  name: string;
  origin: string;
  flowsInto: string;
  pathD: string;
  statesCovered: string[];
  color: string;
  lengthKm: number;
}

export type MiniGameType =
  | 'state-explorer'      // Locate states, capitals & territories
  | 'river-tracker'       // Trace source, course & tributaries
  | 'landmark-detective'  // Deduce monuments from visual & historical clues
  | 'wildlife-explorer'   // Match species to ecosystems & national parks
  | 'regional-discovery'  // Traditions, festivals, food & crafts
  | 'route-planner'       // Connect destinations & plan geographic expeditions
  | 'expedition-challenge'; // Multi-concept comprehensive challenge

export interface MissionQuestion {
  id: string;
  miniGameType: MiniGameType;
  prompt: string;
  targetStateId?: string;
  options: string[];
  correctAnswer: string | number; // option text or index
  hints: string[];
  explanation: string;
  illustration?: string;
  clues?: string[];
}

export interface ExpeditionMission {
  id: string;
  title: string;
  subtitle: string;
  gradeBand: 'Classes 5–6' | 'Classes 7–8' | 'Classes 9–10' | 'Classes 11–12' | 'Classes 5–7' | 'Classes 8–10';
  zone: Zone | 'Pan-India';
  description: string;
  targetStateIds: string[];
  rewardXP: number;
  badgeId: string;
  badgeName: string;
  badgeIcon: string;
  unlockedByDefault?: boolean;
  stages: MissionQuestion[];
}

export type DiscoveryCategory =
  | 'states'
  | 'rivers'
  | 'mountains'
  | 'landmarks'
  | 'wildlife'
  | 'culture';

export interface DiscoveryCard {
  id: string;
  title: string;
  category: DiscoveryCategory;
  stateId: string;
  stateName: string;
  subtitle: string;
  description: string;
  badge: string;
  icon: string;
  curriculumFact: string;
}

export interface ExplorerAchievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  maxProgress: number;
  unlocked: boolean;
  progress: number;
}

export type ExplorerRankTier = 'Rookie Explorer' | 'Trailblazer' | 'Pathfinder' | 'Bharat Master';

export interface ExplorerProgress {
  exploredStateIds: string[];
  completedMissionIds: string[];
  unlockedCardIds: string[];
  achievements: Record<string, boolean>;
  totalScore: number;
  totalXP: number;
  rankTier: ExplorerRankTier;
  streakDays: number;
  lastPlayedDate: string;
}

export type ActiveScreen = 'home' | 'map' | 'atlas' | 'progress' | 'mission';
