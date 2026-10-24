// =========================================================
// BHARAT EXPLORER — STATE MANAGEMENT & GAME ENGINE HOOK
// Integrates VidyaVerse XP, Audio Synthesis & Persistence
// =========================================================

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuthStore } from '../../../stores/authStore';
import {
  ActiveScreen,
  StateRegion,
  ExpeditionMission,
  ExplorerProgress,
  ExplorerRankTier,
  Zone
} from '../types';
import { INDIA_STATES } from '../data/india-map-data';
import { EXPEDITION_MISSIONS } from '../data/expeditions-data';
import { DISCOVERY_CARDS } from '../data/discovery-cards-data';
import { EXPLORER_ACHIEVEMENTS } from '../data/achievements-data';

const STORAGE_KEY = 'vidyaverse_bharat_explorer_v2';

const INITIAL_PROGRESS: ExplorerProgress = {
  exploredStateIds: ['delhi'], // Start with capital
  completedMissionIds: [],
  unlockedCardIds: ['card-river-ganga', 'card-mount-himalayas', 'card-lm-taj-mahal'],
  achievements: {},
  totalScore: 0,
  totalXP: 0,
  rankTier: 'Rookie Explorer',
  streakDays: 1,
  lastPlayedDate: new Date().toISOString().split('T')[0]
};

function calculateRank(exploredCount: number, completedMissions: number): ExplorerRankTier {
  if (completedMissions >= 6 && exploredCount >= 28) return 'Bharat Master';
  if (completedMissions >= 3 && exploredCount >= 15) return 'Pathfinder';
  if (completedMissions >= 1 || exploredCount >= 6) return 'Trailblazer';
  return 'Rookie Explorer';
}

export function useBharatExplorer() {
  const { addXP, addCoins, unlockBadge } = useAuthStore();

  // Screen & Navigation
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('home');
  const [selectedStateId, setSelectedStateId] = useState<string | null>(null);
  const [hoveredStateId, setHoveredStateId] = useState<string | null>(null);

  // Map Filter & Viewport
  const [filterZone, setFilterZone] = useState<Zone | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [mapZoom, setMapZoom] = useState(1);
  const [mapPan, setMapPan] = useState({ x: 0, y: 0 });
  const [showStateListDrawer, setShowStateListDrawer] = useState(false);
  const [showLandmarksLayer, setShowLandmarksLayer] = useState(true);
  const [showRiversLayer, setShowRiversLayer] = useState(true);
  const [showLabelsLayer, setShowLabelsLayer] = useState(true);

  // Audio / Speech Synthesis
  const [isVoiceMuted, setIsVoiceMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Active Mission Run State
  const [activeMissionId, setActiveMissionId] = useState<string | null>(null);
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [hintsRevealed, setHintsRevealed] = useState(0);
  const [stageAnswerSubmitted, setStageAnswerSubmitted] = useState<string | null>(null);
  const [stageIsCorrect, setStageIsCorrect] = useState<boolean | null>(null);
  const [missionEarnedScore, setMissionEarnedScore] = useState(0);
  const [missionCompleteModal, setMissionCompleteModal] = useState<{
    mission: ExpeditionMission;
    earnedScore: number;
    earnedXP: number;
    newCards: string[];
    isFirstTime: boolean;
  } | null>(null);

  // Persistence
  const [progress, setProgress] = useState<ExplorerProgress>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to parse Bharat Explorer stored progress:', e);
    }
    return INITIAL_PROGRESS;
  });

  // Save progress changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save Bharat Explorer progress:', e);
    }
  }, [progress]);

  // Selected State Object lookup
  const selectedState = useMemo(() => {
    if (!selectedStateId) return null;
    return INDIA_STATES.find(s => s.id === selectedStateId) || null;
  }, [selectedStateId]);

  // Active Mission Object lookup
  const activeMission = useMemo(() => {
    if (!activeMissionId) return null;
    return EXPEDITION_MISSIONS.find(m => m.id === activeMissionId) || null;
  }, [activeMissionId]);

  // Current Stage Object
  const currentStage = useMemo(() => {
    if (!activeMission || !activeMission.stages[currentStageIdx]) return null;
    return activeMission.stages[currentStageIdx];
  }, [activeMission, currentStageIdx]);

  // Filtered States list for Map & Search
  const filteredStates = useMemo(() => {
    return INDIA_STATES.filter(state => {
      const matchesZone = filterZone === 'All' || state.zone === filterZone;
      const matchesSearch =
        !searchQuery ||
        state.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        state.capital.toLowerCase().includes(searchQuery.toLowerCase()) ||
        state.landmarks.some(l => l.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesZone && matchesSearch;
    });
  }, [filterZone, searchQuery]);

  // Text to speech helper
  const speakText = useCallback((text: string) => {
    if (isVoiceMuted || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.lang = 'en-IN';
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Speech synthesis error:', err);
    }
  }, [isVoiceMuted]);

  const toggleVoiceMute = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setIsVoiceMuted(prev => !prev);
  }, []);

  // Exploration actions
  const selectState = useCallback((state: StateRegion | null) => {
    if (!state) {
      setSelectedStateId(null);
      return;
    }
    setSelectedStateId(state.id);

    // Track exploration progress
    setProgress(prev => {
      if (prev.exploredStateIds.includes(state.id)) return prev;
      const nextExplored = [...prev.exploredStateIds, state.id];
      const nextRank = calculateRank(nextExplored.length, prev.completedMissionIds.length);
      return {
        ...prev,
        exploredStateIds: nextExplored,
        rankTier: nextRank,
        totalXP: prev.totalXP + 10
      };
    });

    // Award 10 VidyaVerse XP for exploring a new state
    if (!progress.exploredStateIds.includes(state.id)) {
      addXP(10);
      addCoins(5);
    }

    // Audio announce
    speakText(`${state.name}. Capital: ${state.capital}`);
  }, [progress.exploredStateIds, addXP, addCoins, speakText]);

  // Start an expedition
  const startExpedition = useCallback((missionId: string) => {
    const mission = EXPEDITION_MISSIONS.find(m => m.id === missionId);
    if (!mission) return;
    setActiveMissionId(missionId);
    setCurrentStageIdx(0);
    setHintsRevealed(0);
    setStageAnswerSubmitted(null);
    setStageIsCorrect(null);
    setMissionEarnedScore(0);
    setActiveScreen('mission');

    // Pan map to first stage target state if present
    if (mission.stages[0]?.targetStateId) {
      setSelectedStateId(mission.stages[0].targetStateId);
    }

    speakText(`Starting expedition: ${mission.title}. Stage 1 of ${mission.stages.length}.`);
  }, [speakText]);

  // Request progressive hint
  const requestHint = useCallback(() => {
    if (!currentStage) return;
    setHintsRevealed(prev => Math.min(prev + 1, currentStage.hints.length));
    const nextHint = currentStage.hints[hintsRevealed];
    if (nextHint) {
      speakText(`Hint: ${nextHint}`);
    }
  }, [currentStage, hintsRevealed, speakText]);

  // Submit stage answer
  const submitStageAnswer = useCallback((answer: string) => {
    if (!currentStage || stageAnswerSubmitted !== null) return;
    setStageAnswerSubmitted(answer);

    const isCorrect = answer === currentStage.correctAnswer;
    setStageIsCorrect(isCorrect);

    if (isCorrect) {
      const stageScore = Math.max(100 - hintsRevealed * 25, 25);
      setMissionEarnedScore(prev => prev + stageScore);
      speakText(`Excellent! That is correct. ${currentStage.explanation}`);
    } else {
      speakText(`Not quite. The correct answer is ${currentStage.correctAnswer}. ${currentStage.explanation}`);
    }
  }, [currentStage, stageAnswerSubmitted, hintsRevealed, speakText]);

  // Next stage or finish mission
  const nextStage = useCallback(() => {
    if (!activeMission) return;

    if (currentStageIdx + 1 < activeMission.stages.length) {
      const nextIdx = currentStageIdx + 1;
      setCurrentStageIdx(nextIdx);
      setHintsRevealed(0);
      setStageAnswerSubmitted(null);
      setStageIsCorrect(null);

      // Pan map if next stage has target state
      const nextStageObj = activeMission.stages[nextIdx];
      if (nextStageObj?.targetStateId) {
        setSelectedStateId(nextStageObj.targetStateId);
      }
    } else {
      // Mission Complete!
      const isFirstTime = !progress.completedMissionIds.includes(activeMission.id);
      const earnedXP = isFirstTime ? activeMission.rewardXP : Math.round(activeMission.rewardXP * 0.3);

      // Collect discovery cards associated with this mission's states
      const relatedCards = DISCOVERY_CARDS.filter(c =>
        activeMission.targetStateIds.includes(c.stateId) && !progress.unlockedCardIds.includes(c.id)
      ).map(c => c.id);

      // Award VidyaVerse system XP and badge
      addXP(earnedXP);
      addCoins(Math.round(earnedXP / 2));
      if (activeMission.badgeId) {
        unlockBadge(activeMission.badgeId);
      }

      // Update progress
      setProgress(prev => {
        const nextCompleted = isFirstTime
          ? [...prev.completedMissionIds, activeMission.id]
          : prev.completedMissionIds;
        const nextCards = Array.from(new Set([...prev.unlockedCardIds, ...relatedCards]));
        const nextRank = calculateRank(prev.exploredStateIds.length, nextCompleted.length);

        return {
          ...prev,
          completedMissionIds: nextCompleted,
          unlockedCardIds: nextCards,
          totalScore: prev.totalScore + missionEarnedScore,
          totalXP: prev.totalXP + earnedXP,
          rankTier: nextRank
        };
      });

      setMissionCompleteModal({
        mission: activeMission,
        earnedScore: missionEarnedScore,
        earnedXP,
        newCards: relatedCards,
        isFirstTime
      });

      speakText(`Congratulations Explorer! You completed ${activeMission.title} and earned ${earnedXP} XP!`);
    }
  }, [
    activeMission,
    currentStageIdx,
    progress.completedMissionIds,
    progress.unlockedCardIds,
    progress.exploredStateIds,
    missionEarnedScore,
    addXP,
    addCoins,
    unlockBadge,
    speakText
  ]);

  const exitMission = useCallback(() => {
    setActiveMissionId(null);
    setCurrentStageIdx(0);
    setHintsRevealed(0);
    setStageAnswerSubmitted(null);
    setStageIsCorrect(null);
    setActiveScreen('map');
  }, []);

  const closeMissionResults = useCallback(() => {
    setMissionCompleteModal(null);
    setActiveMissionId(null);
    setActiveScreen('map');
  }, []);

  // Reset map view
  const resetMapView = useCallback(() => {
    setMapZoom(1);
    setMapPan({ x: 0, y: 0 });
    setSelectedStateId(null);
  }, []);

  return {
    // Navigation & Screen
    activeScreen,
    setActiveScreen,
    // Map State
    selectedState,
    selectedStateId,
    hoveredStateId,
    setHoveredStateId,
    selectState,
    filterZone,
    setFilterZone,
    searchQuery,
    setSearchQuery,
    mapZoom,
    setMapZoom,
    mapPan,
    setMapPan,
    resetMapView,
    filteredStates,
    showStateListDrawer,
    setShowStateListDrawer,
    showLandmarksLayer,
    setShowLandmarksLayer,
    showRiversLayer,
    setShowRiversLayer,
    showLabelsLayer,
    setShowLabelsLayer,
    // Voice / Audio
    isVoiceMuted,
    isSpeaking,
    speakText,
    toggleVoiceMute,
    // Mission State
    activeMission,
    currentStage,
    currentStageIdx,
    hintsRevealed,
    stageAnswerSubmitted,
    stageIsCorrect,
    missionEarnedScore,
    missionCompleteModal,
    startExpedition,
    requestHint,
    submitStageAnswer,
    nextStage,
    exitMission,
    closeMissionResults,
    // Player Progress
    progress,
    achievements: EXPLORER_ACHIEVEMENTS,
    allMissions: EXPEDITION_MISSIONS,
    allCards: DISCOVERY_CARDS
  };
}
