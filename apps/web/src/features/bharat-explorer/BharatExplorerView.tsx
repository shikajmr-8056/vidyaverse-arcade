// =========================================================
// BHARAT EXPLORER — MAIN FEATURE VIEW CONTAINER
// Integrates All 7 Screens, Map Canvas, Atlas & VidyaVerse Ecosystem
// =========================================================

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Compass,
  Map,
  BookOpen,
  Trophy,
  Sparkles,
  Volume2,
  VolumeX
} from 'lucide-react';
import { useBharatExplorer } from './hooks/useBharatExplorer';
import { IndiaMapCanvas } from './components/IndiaMapCanvas';
import { MapControls } from './components/MapControls';
import { DestinationDrawer } from './components/DestinationDrawer';
import { AccessibleStateList } from './components/AccessibleStateList';
import { ExpeditionHome } from './components/ExpeditionHome';
import { MissionRunner } from './components/MissionRunner';
import { MissionResultsModal } from './components/MissionResultsModal';
import { AtlasView } from './components/AtlasView';
import { ExplorerProgressView } from './components/ExplorerProgressView';
import { INDIA_STATES } from './data/india-map-data';

export const BharatExplorerView: React.FC = () => {
  const navigate = useNavigate();
  const {
    activeScreen,
    setActiveScreen,
    selectedState,
    hoveredStateId,
    setHoveredStateId,
    selectState,
    filterZone,
    setFilterZone,
    mapZoom,
    setMapZoom,
    resetMapView,
    showStateListDrawer,
    setShowStateListDrawer,
    showLandmarksLayer,
    setShowLandmarksLayer,
    showRiversLayer,
    setShowRiversLayer,
    showLabelsLayer,
    setShowLabelsLayer,
    isVoiceMuted,
    isSpeaking,
    speakText,
    toggleVoiceMute,
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
    progress,
    allMissions
  } = useBharatExplorer();

  return (
    <div className="flex flex-col w-full h-full min-h-[calc(100vh-4rem)] bg-slate-950 select-none overflow-hidden text-slate-100">
      {/* =================================================== */}
      {/* GLOBAL TOP NAVBAR                                   */}
      {/* =================================================== */}
      <header className="h-14 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between shrink-0 z-30">
        {/* Left: Back & Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/playlab')}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Return to PlayLab"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xl">🇮🇳</span>
            <span className="font-black font-display text-white text-base tracking-tight hidden sm:inline">
              Bharat Explorer
            </span>
          </div>
        </div>

        {/* Center: Main Screen Switcher Pills */}
        <nav className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/80">
          <button
            onClick={() => setActiveScreen('home')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeScreen === 'home'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Expedition Home</span>
          </button>

          <button
            onClick={() => setActiveScreen('map')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeScreen === 'map'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>Interactive Map</span>
          </button>

          <button
            onClick={() => setActiveScreen('atlas')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeScreen === 'atlas'
                ? 'bg-purple-500 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>My Atlas ({progress.unlockedCardIds.length})</span>
          </button>

          <button
            onClick={() => setActiveScreen('progress')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeScreen === 'progress'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Progress</span>
          </button>
        </nav>

        {/* Right: Explorer Rank & VidyaVerse XP */}
        <div className="flex items-center gap-2.5">
          <div className="px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold hidden sm:flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {progress.totalXP} XP
          </div>

          <button
            onClick={toggleVoiceMute}
            className={`p-1.5 rounded-xl border border-slate-700 transition-colors ${
              isVoiceMuted ? 'text-rose-400 bg-rose-950/40' : 'text-slate-300 hover:bg-slate-800'
            }`}
            title={isVoiceMuted ? 'Voice Muted' : 'Voice Narration Active'}
          >
            {isVoiceMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* =================================================== */}
      {/* SCREEN CONTAINER                                    */}
      {/* =================================================== */}
      <main className="flex-1 relative overflow-hidden flex flex-col">
        {/* Screen A: Expedition Home */}
        {activeScreen === 'home' && (
          <ExpeditionHome
            progress={progress}
            onExploreMap={() => setActiveScreen('map')}
            onOpenAtlas={() => setActiveScreen('atlas')}
            onOpenProgress={() => setActiveScreen('progress')}
            onStartExpedition={startExpedition}
          />
        )}

        {/* Screen B: Interactive Map Canvas */}
        {activeScreen === 'map' && (
          <div className="relative w-full h-full flex-1">
            <IndiaMapCanvas
              selectedState={selectedState}
              hoveredStateId={hoveredStateId}
              onSelectState={selectState}
              onHoverState={setHoveredStateId}
              filterZone={filterZone}
              zoom={mapZoom}
              showLandmarks={showLandmarksLayer}
              showRivers={showRiversLayer}
              showLabels={showLabelsLayer}
            />

            {/* Map Controls Floating Toolbar */}
            <MapControls
              zoom={mapZoom}
              onZoomIn={() => setMapZoom(prev => Math.min(prev + 0.25, 2.5))}
              onZoomOut={() => setMapZoom(prev => Math.max(prev - 0.25, 0.8))}
              onResetView={resetMapView}
              filterZone={filterZone}
              onFilterZone={setFilterZone}
              showLandmarks={showLandmarksLayer}
              onToggleLandmarks={() => setShowLandmarksLayer(p => !p)}
              showRivers={showRiversLayer}
              onToggleRivers={() => setShowRiversLayer(p => !p)}
              showLabels={showLabelsLayer}
              onToggleLabels={() => setShowLabelsLayer(p => !p)}
              isVoiceMuted={isVoiceMuted}
              onToggleVoice={toggleVoiceMute}
              onOpenStateList={() => setShowStateListDrawer(true)}
            />

            {/* Screen C: Destination Drawer (Selected State Details) */}
            <DestinationDrawer
              state={selectedState}
              onClose={() => selectState(null)}
              onSpeak={speakText}
              isSpeaking={isSpeaking}
              onStartExpedition={startExpedition}
              availableMissions={allMissions}
              onViewInAtlas={() => setActiveScreen('atlas')}
            />

            {/* Accessible Searchable States List Drawer */}
            <AccessibleStateList
              isOpen={showStateListDrawer}
              onClose={() => setShowStateListDrawer(false)}
              onSelectState={st => selectState(st)}
              selectedStateId={selectedState?.id || null}
              exploredStateIds={progress.exploredStateIds}
            />
          </div>
        )}

        {/* Screen D: Active Mission Gameplay Arena */}
        {activeScreen === 'mission' && activeMission && (
          <MissionRunner
            mission={activeMission}
            currentStage={currentStage}
            currentStageIdx={currentStageIdx}
            hintsRevealed={hintsRevealed}
            submittedAnswer={stageAnswerSubmitted}
            isCorrect={stageIsCorrect}
            earnedScore={missionEarnedScore}
            onRequestHint={requestHint}
            onSubmitAnswer={submitStageAnswer}
            onNextStage={nextStage}
            onExit={exitMission}
            onSpeak={speakText}
            isSpeaking={isSpeaking}
          />
        )}

        {/* Screen F: My Digital Atlas */}
        {activeScreen === 'atlas' && (
          <AtlasView
            unlockedCardIds={progress.unlockedCardIds}
            onBackToMap={() => setActiveScreen('map')}
            onSpeak={speakText}
            isSpeaking={isSpeaking}
          />
        )}

        {/* Screen G: Explorer Progress & Ranks */}
        {activeScreen === 'progress' && (
          <ExplorerProgressView
            progress={progress}
            onBackToMap={() => setActiveScreen('map')}
            onSelectState={id => {
              const st = INDIA_STATES.find(s => s.id === id);
              if (st) {
                selectState(st);
                setActiveScreen('map');
              }
            }}
          />
        )}

        {/* Screen E: Mission Results Modal */}
        <MissionResultsModal
          modalData={missionCompleteModal}
          onClose={closeMissionResults}
          onViewAtlas={() => {
            closeMissionResults();
            setActiveScreen('atlas');
          }}
        />
      </main>
    </div>
  );
};
