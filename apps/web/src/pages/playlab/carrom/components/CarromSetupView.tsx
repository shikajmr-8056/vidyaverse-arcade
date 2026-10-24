// =========================================================
// VIDYAVERSE NEWTON'S CARROM — LOBBY & SETUP VIEW
// Neatly arranged layout matching Math Ludo (LudoSetupView)
// =========================================================

import React, { useState } from 'react';
import {
  ArrowLeft,
  Users,
  Globe,
  Sparkles,
  Volume2,
  VolumeX,
  User,
  Bot,
  Play,
  Copy,
  Check,
  RotateCcw,
  Swords,
  Timer,
  Trophy,
  Sliders,
  Flame,
  Award,
} from 'lucide-react';
import { clsx } from 'clsx';
import { CarromPlayMode, CarromSubMode, BotDifficulty, PlayerSlot } from '../types';

export interface CarromSetupViewProps {
  playMode: CarromPlayMode;
  setPlayMode: (mode: CarromPlayMode) => void;
  subMode: CarromSubMode;
  setSubMode: (subMode: CarromSubMode) => void;
  players: PlayerSlot[];
  setPlayers: React.Dispatch<React.SetStateAction<PlayerSlot[]>>;
  botDifficulty: BotDifficulty;
  setBotDifficulty: (diff: BotDifficulty) => void;
  targetScore: number;
  setTargetScore: (score: number) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  hasSavedGame: boolean;
  onResumeSavedGame: () => void;
  onStartMatch: () => void;
  onNavigateBack: () => void;
  roomCode: string;
  setRoomCode: (code: string) => void;
  onJoinRoom: () => void;
  onCreateRoom: () => void;
}

export const CarromSetupView: React.FC<CarromSetupViewProps> = ({
  playMode,
  setPlayMode,
  subMode,
  setSubMode,
  players,
  setPlayers,
  botDifficulty,
  setBotDifficulty,
  targetScore,
  setTargetScore,
  soundEnabled,
  setSoundEnabled,
  hasSavedGame,
  onResumeSavedGame,
  onStartMatch,
  onNavigateBack,
  roomCode,
  setRoomCode,
  onJoinRoom,
  onCreateRoom,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [inputJoinCode, setInputJoinCode] = useState('');

  // ------------------------------------------
  // PRESET HANDLERS
  // ------------------------------------------
  const selectSoloMode = () => {
    setPlayMode('solo');
    setPlayers([
      {
        id: 'p1',
        name: players[0]?.name || 'Explorer',
        isBot: false,
        score: 0,
        coinsPocketed: { white: 0, black: 0, queen: 0 },
        side: 'south',
        isActive: true,
      },
      {
        id: 'p2_bot',
        name: 'Newton AI',
        isBot: true,
        botDifficulty,
        score: 0,
        coinsPocketed: { white: 0, black: 0, queen: 0 },
        side: 'north',
        isActive: true,
      },
      {
        id: 'p3_bot',
        name: 'East Base (Locked)',
        isBot: true,
        score: 0,
        coinsPocketed: { white: 0, black: 0, queen: 0 },
        side: 'east',
        isActive: false,
      },
      {
        id: 'p4_bot',
        name: 'West Base (Locked)',
        isBot: true,
        score: 0,
        coinsPocketed: { white: 0, black: 0, queen: 0 },
        side: 'west',
        isActive: false,
      },
    ]);
  };

  const selectDuelMode = () => {
    setPlayMode('duel');
    setPlayers([
      {
        id: 'p1',
        name: players[0]?.name || 'Explorer',
        isBot: false,
        score: 0,
        coinsPocketed: { white: 0, black: 0, queen: 0 },
        side: 'south',
        isActive: true,
      },
      {
        id: 'p2',
        name: players[1]?.name || 'Player 2',
        isBot: false,
        score: 0,
        coinsPocketed: { white: 0, black: 0, queen: 0 },
        side: 'north',
        isActive: true,
      },
      {
        id: 'p3',
        name: 'East Base (Locked)',
        isBot: true,
        score: 0,
        coinsPocketed: { white: 0, black: 0, queen: 0 },
        side: 'east',
        isActive: false,
      },
      {
        id: 'p4',
        name: 'West Base (Locked)',
        isBot: true,
        score: 0,
        coinsPocketed: { white: 0, black: 0, queen: 0 },
        side: 'west',
        isActive: false,
      },
    ]);
  };

  const selectTeamMode = () => {
    setPlayMode('team');
    setPlayers([
      {
        id: 'p1',
        name: players[0]?.name || 'Player 1 (Team A)',
        isBot: false,
        score: 0,
        coinsPocketed: { white: 0, black: 0, queen: 0 },
        side: 'south',
        teamId: 1,
        isActive: true,
      },
      {
        id: 'p2',
        name: 'Player 2 (Team B)',
        isBot: false,
        score: 0,
        coinsPocketed: { white: 0, black: 0, queen: 0 },
        side: 'east',
        teamId: 2,
        isActive: true,
      },
      {
        id: 'p3',
        name: 'Player 3 (Team A)',
        isBot: true,
        botDifficulty,
        score: 0,
        coinsPocketed: { white: 0, black: 0, queen: 0 },
        side: 'north',
        teamId: 1,
        isActive: true,
      },
      {
        id: 'p4',
        name: 'Player 4 (Team B)',
        isBot: true,
        botDifficulty,
        score: 0,
        coinsPocketed: { white: 0, black: 0, queen: 0 },
        side: 'west',
        teamId: 2,
        isActive: true,
      },
    ]);
  };

  const updatePlayerName = (index: number, newName: string) => {
    setPlayers((prev) => {
      const updated = [...prev];
      if (updated[index]) {
        updated[index] = { ...updated[index], name: newName };
      }
      return updated;
    });
  };

  const togglePlayerBot = (index: number) => {
    setPlayers((prev) => {
      const updated = [...prev];
      if (updated[index]) {
        const nextIsBot = !updated[index].isBot;
        updated[index] = {
          ...updated[index],
          isBot: nextIsBot,
          name: nextIsBot ? `Newton Bot ${index + 1}` : `Player ${index + 1}`,
          botDifficulty: nextIsBot ? botDifficulty : undefined,
        };
      }
      return updated;
    });
  };

  const updatePlayerDifficulty = (index: number, diff: BotDifficulty) => {
    setPlayers((prev) => {
      const updated = [...prev];
      if (updated[index]) {
        updated[index] = { ...updated[index], botDifficulty: diff };
      }
      return updated;
    });
  };

  const copyCode = () => {
    if (!roomCode) return;
    navigator.clipboard.writeText(roomCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="h-full min-h-screen bg-canvas text-text-primary flex flex-col font-sans select-none overflow-x-hidden">
      {/* 1. TOP HEADER (Matching Ludo Header in Screenshot 1) */}
      <header className="h-14 border-b border-border bg-card/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateBack}
            className="p-2 rounded-xl bg-card hover:bg-canvas text-text-muted hover:text-text-primary transition-colors border border-border cursor-pointer"
            title="Back to PlayLab"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center border border-amber-500/25">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold font-display text-text-primary tracking-tight">
                  Newton’s Carrom
                </h1>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                  NCERT 4-Player Battle
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Header Controls */}
        <div className="flex items-center gap-2">
          {hasSavedGame && (
            <button
              onClick={onResumeSavedGame}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-bold text-xs hover:bg-amber-500/25 transition-all shadow-xs cursor-pointer"
              title="Resume active match"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Resume Match</span>
            </button>
          )}

          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Offline Bot & Online Multiplayer</span>
          </div>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-xl bg-card hover:bg-canvas text-text-muted hover:text-text-primary transition-colors border border-border cursor-pointer"
            title={soundEnabled ? 'Mute sound' : 'Enable sound'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-amber-500" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>
        </div>
      </header>

      {/* 2. MAIN SETUP DASHBOARD (Matching 2-Column Ludo Setup View) */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto p-4 sm:p-6 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* ========================================================= */}
          {/* LEFT COLUMN: Match Mode & Presets + Match Rules           */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-3.5">
            
            {/* CARD 1: MATCH MODE & PRESETS */}
            <div className="card p-3 sm:p-4 bg-card border border-border shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-border/80 pb-2">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <h2 className="text-xs sm:text-sm font-bold text-text-primary uppercase tracking-wide">
                    Match Mode & Presets
                  </h2>
                </div>

                {/* Mode Tabs (Offline / Bot vs Online Room) */}
                <div className="flex items-center p-0.5 bg-canvas rounded-xl border border-border">
                  <button
                    type="button"
                    onClick={() => {
                      if (playMode === 'friends') selectSoloMode();
                    }}
                    className={clsx(
                      'px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer',
                      playMode !== 'friends'
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'text-text-muted hover:text-text-primary'
                    )}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Offline / Bot</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setPlayMode('friends');
                      onCreateRoom();
                    }}
                    className={clsx(
                      'px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer',
                      playMode === 'friends'
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'text-text-muted hover:text-text-primary'
                    )}
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Online Room</span>
                  </button>
                </div>
              </div>

              {/* Quick Presets Selection */}
              {playMode !== 'friends' ? (
                <div className="space-y-2 py-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted block">
                    Select Quick Preset
                  </span>

                  {/* Preset 1: Solo vs AI */}
                  <button
                    type="button"
                    onClick={selectSoloMode}
                    className={clsx(
                      'w-full p-2.5 rounded-xl border text-left transition-all relative flex items-center gap-3 group cursor-pointer',
                      playMode === 'solo'
                        ? 'border-amber-500/70 bg-amber-500/10 shadow-xs ring-1 ring-amber-500/30'
                        : 'border-border/80 bg-canvas/40 hover:bg-canvas hover:border-border'
                    )}
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/25 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-text-primary">Solo vs AI</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold">
                          Recommended
                        </span>
                      </div>
                      <p className="text-[11px] text-text-muted mt-0.5 leading-tight truncate">
                        Play alone against Newton AI with dynamic trajectory guidance.
                      </p>
                    </div>
                    {playMode === 'solo' && (
                      <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                    )}
                  </button>

                  {/* Preset 2: 1 vs 1 Duel */}
                  <button
                    type="button"
                    onClick={selectDuelMode}
                    className={clsx(
                      'w-full p-2.5 rounded-xl border text-left transition-all relative flex items-center gap-3 group cursor-pointer',
                      playMode === 'duel'
                        ? 'border-amber-500/70 bg-amber-500/10 shadow-xs ring-1 ring-amber-500/30'
                        : 'border-border/80 bg-canvas/40 hover:bg-canvas hover:border-border'
                    )}
                  >
                    <div className="w-9 h-9 rounded-xl bg-orange-500/15 border border-orange-500/25 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
                      <Swords className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-text-primary">1 vs 1 Duel</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-orange-500/20 text-orange-600 dark:text-orange-400 font-bold">
                          Head-to-Head
                        </span>
                      </div>
                      <p className="text-[11px] text-text-muted mt-0.5 leading-tight truncate">
                        Pass & Play match (South vs North). Turn-based local board.
                      </p>
                    </div>
                    {playMode === 'duel' && (
                      <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                    )}
                  </button>

                  {/* Preset 3: 2 vs 2 Doubles */}
                  <button
                    type="button"
                    onClick={selectTeamMode}
                    className={clsx(
                      'w-full p-2.5 rounded-xl border text-left transition-all relative flex items-center gap-3 group cursor-pointer',
                      playMode === 'team'
                        ? 'border-amber-500/70 bg-amber-500/10 shadow-xs ring-1 ring-amber-500/30'
                        : 'border-border/80 bg-canvas/40 hover:bg-canvas hover:border-border'
                    )}
                  >
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <Users className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-text-primary">2 vs 2 Doubles</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold">
                          Team Battle
                        </span>
                      </div>
                      <p className="text-[11px] text-text-muted mt-0.5 leading-tight truncate">
                        4-Player team carrom across all 4 baselines (South, East, North, West).
                      </p>
                    </div>
                    {playMode === 'team' && (
                      <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                    )}
                  </button>
                </div>
              ) : (
                /* Online Room Controls */
                <div className="space-y-2.5 py-1">
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-text-primary">
                        Room Code: <span className="font-mono text-sm tracking-wider font-black text-amber-500">{roomCode}</span>
                      </span>
                      <button
                        type="button"
                        onClick={copyCode}
                        className="flex items-center gap-1 text-[11px] font-bold text-amber-500 hover:text-amber-400 cursor-pointer"
                      >
                        {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedCode ? 'Copied' : 'Share Code'}</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-text-muted">
                      Invite friends to join this match in real-time across the network.
                    </p>
                  </div>

                  {/* Join Existing Room Input */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted block">
                      Join Friend’s Room
                    </span>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="ENTER 6-DIGIT CODE"
                        value={inputJoinCode}
                        onChange={(e) => setInputJoinCode(e.target.value.toUpperCase())}
                        maxLength={8}
                        className="flex-1 px-3 py-1.5 rounded-xl bg-canvas border border-border text-xs font-mono uppercase font-bold text-text-primary focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (inputJoinCode.trim()) {
                            setRoomCode(inputJoinCode.trim());
                            onJoinRoom();
                          }
                        }}
                        disabled={!inputJoinCode.trim()}
                        className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold disabled:opacity-50 transition-all shadow-xs cursor-pointer"
                      >
                        Join Room
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* CARD 2: MATCH RULES & DISCIPLINE */}
            <div className="card p-3 sm:p-3.5 bg-card border border-border shadow-xs space-y-2.5">
              <div className="flex items-center gap-1.5 border-b border-border/80 pb-1.5">
                <Sliders className="w-4 h-4 text-amber-500" />
                <h3 className="text-xs sm:text-sm font-bold text-text-primary uppercase tracking-wide">
                  Match Rules & Discipline
                </h3>
              </div>

              {/* Game Discipline */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted block">
                  Game Discipline
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSubMode('classic')}
                    className={clsx(
                      'px-2 py-1.5 rounded-lg text-xs font-bold text-center border transition-all cursor-pointer flex items-center justify-center gap-1.5',
                      subMode === 'classic'
                        ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                        : 'bg-canvas text-text-muted border-border hover:text-text-primary'
                    )}
                  >
                    <Trophy className="w-3.5 h-3.5" />
                    <span>Classic Carrom</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSubMode('lab')}
                    className={clsx(
                      'px-2 py-1.5 rounded-lg text-xs font-bold text-center border transition-all cursor-pointer flex items-center justify-center gap-1.5',
                      subMode === 'lab'
                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                        : 'bg-canvas text-text-muted border-border hover:text-text-primary'
                    )}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Physics Lab Mode</span>
                  </button>
                </div>
              </div>

              {/* Target Score Selection */}
              <div className="space-y-1 pt-1">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted flex items-center gap-1">
                    <Award className="w-3 h-3 text-amber-500" />
                    <span>Race to Target Score</span>
                  </label>
                  <span className="font-mono text-xs font-bold text-amber-500">{targetScore} pts</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {[
                    { pts: 15, label: '15 pts (Quick)' },
                    { pts: 25, label: '25 pts (Std)' },
                    { pts: 35, label: '35 pts (Deep)' },
                  ].map((t) => (
                    <button
                      key={t.pts}
                      type="button"
                      onClick={() => setTargetScore(t.pts)}
                      className={clsx(
                        'px-1 py-1 rounded-lg text-[11px] font-bold text-center border transition-all truncate cursor-pointer',
                        targetScore === t.pts
                          ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                          : 'bg-canvas text-text-muted border-border hover:text-text-primary'
                      )}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: 4 Configured Player Slots + Purple CTA      */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-3 min-h-0 justify-between">
            
            {/* CARD 3: 4 CONFIGURED PLAYER SLOTS (Matching Ludo Screenshot 1) */}
            <div className="card p-3 sm:p-4 bg-card border border-border shadow-xs flex-1 min-h-0 flex flex-col justify-between">
              
              {/* Header with Title and 4-Base Indicator Dots */}
              <div className="flex items-center justify-between border-b border-border/80 pb-2 shrink-0">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-text-primary flex items-center gap-2 uppercase tracking-wide">
                    <Users className="w-4 h-4 text-amber-500" />
                    <span>Configure 4 Player Slots</span>
                  </h3>
                  <p className="text-[11px] text-text-muted mt-0.5">
                    {playMode === 'solo'
                      ? 'Solo vs AI: South Base is you; North Base is Newton AI. East & West are locked.'
                      : playMode === 'duel'
                      ? '1v1 Duel: South and North are active competitors. East & West are locked.'
                      : 'Doubles Mode: 4 players taking turns around all 4 baselines.'}
                  </p>
                </div>

                {/* 4 Colored Base Dots */}
                <div className="flex items-center gap-1.5 shrink-0 bg-canvas px-2.5 py-1 rounded-lg border border-border">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-xs" title="South Base" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs" title="East Base" />
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-xs" title="North Base" />
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-xs" title="West Base" />
                </div>
              </div>

              {/* 2x2 Grid of 4 Compact Player Cards (Pixel-Identical to Ludo Screenshot 1) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-2 flex-1 min-h-0 items-stretch">
                {players.slice(0, 4).map((p, idx) => {
                  const sideLabels = {
                    south: 'RED / SOUTH BASE',
                    east: 'GREEN / EAST BASE',
                    north: 'YELLOW / NORTH BASE',
                    west: 'BLUE / WEST BASE',
                  };

                  const sideEntries = {
                    south: 'Baseline Y=630',
                    east: 'Baseline X=630',
                    north: 'Baseline Y=170',
                    west: 'Baseline X=170',
                  };

                  const isSlotActive = p.isActive !== false;

                  return (
                    <div
                      key={p.id}
                      className={clsx(
                        'p-3 rounded-2xl border transition-all flex flex-col justify-between relative overflow-hidden',
                        !isSlotActive
                          ? 'border-dashed border-border/60 bg-canvas/40 opacity-50'
                          : idx === 0
                          ? 'border-red-500/40 bg-red-500/[0.03]'
                          : idx === 1
                          ? 'border-emerald-500/40 bg-emerald-500/[0.03]'
                          : idx === 2
                          ? 'border-amber-500/40 bg-amber-500/[0.03]'
                          : 'border-blue-500/40 bg-blue-500/[0.03]'
                      )}
                    >
                      {/* Top Row: Base label & Track Entry */}
                      <div className="flex items-center justify-between text-[11px] font-bold">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={clsx(
                              'w-2 h-2 rounded-full',
                              idx === 0
                                ? 'bg-red-500'
                                : idx === 1
                                ? 'bg-emerald-500'
                                : idx === 2
                                ? 'bg-amber-500'
                                : 'bg-blue-500'
                            )}
                          />
                          <span className="uppercase text-text-primary tracking-wide">
                            {sideLabels[p.side] || `${p.side.toUpperCase()} BASE`}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-text-muted">
                          {sideEntries[p.side] || 'Baseline'}
                        </span>
                      </div>

                      {/* Middle Row: Avatar & Name Input */}
                      <div className="flex items-center gap-2.5 my-2.5">
                        <span className="w-10 h-10 rounded-xl bg-canvas border border-border flex items-center justify-center text-xl shrink-0 shadow-xs">
                          {p.isBot ? '🤖' : '👨‍🎓'}
                        </span>
                        <div className="flex-1 min-w-0">
                          <label className="text-[9px] font-bold uppercase tracking-wider text-text-muted block mb-0.5">
                            PLAYER NAME
                          </label>
                          <input
                            type="text"
                            value={p.name}
                            disabled={!isSlotActive}
                            onChange={(e) => updatePlayerName(idx, e.target.value)}
                            className="w-full px-2.5 py-1 rounded-lg bg-card border border-border text-xs font-bold text-text-primary focus:outline-hidden focus:ring-1 focus:ring-amber-500 disabled:opacity-50"
                          />
                        </div>
                      </div>

                      {/* Bottom Row: Human/Bot Toggle & Difficulty */}
                      <div className="flex items-center justify-between gap-2 pt-1 border-t border-border/60">
                        <button
                          type="button"
                          disabled={!isSlotActive}
                          onClick={() => togglePlayerBot(idx)}
                          className={clsx(
                            'px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-40',
                            !p.isBot
                              ? 'bg-amber-500 text-white shadow-xs'
                              : 'bg-card text-text-muted border border-border hover:text-text-primary'
                          )}
                        >
                          {!p.isBot ? (
                            <>
                              <User className="w-3.5 h-3.5" />
                              <span>Human Player (Local)</span>
                            </>
                          ) : (
                            <>
                              <Bot className="w-3.5 h-3.5 text-purple-500" />
                              <span>Bot (Automated AI)</span>
                            </>
                          )}
                        </button>

                        {p.isBot && isSlotActive && (
                          <select
                            value={p.botDifficulty || botDifficulty}
                            onChange={(e) => updatePlayerDifficulty(idx, e.target.value as BotDifficulty)}
                            className="px-2 py-1 rounded-lg bg-card border border-border text-[11px] font-bold text-text-primary focus:outline-hidden cursor-pointer"
                          >
                            <option value="beginner">Easy</option>
                            <option value="intermediate">Med</option>
                            <option value="advanced">Hard</option>
                          </select>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ACTION CTA: Prominent Purple Primary Button (Identical to Ludo Screenshot 1) */}
            <div className="shrink-0 pt-0.5">
              <button
                type="button"
                onClick={onStartMatch}
                className="w-full h-12 sm:h-13.5 rounded-2xl bg-gradient-to-r from-[#6541F5] via-[#5b36ed] to-[#5230E8] hover:from-[#5833eb] hover:to-[#4623dc] active:from-[#4623dc] active:to-[#3816c8] text-white flex items-center justify-center gap-3 text-sm sm:text-base font-black tracking-wide shadow-lg shadow-purple-500/20 hover:shadow-purple-glow group transition-all cursor-pointer"
              >
                <span>Enter Board & Start Match</span>
                <Play className="w-4 h-4 fill-current transition-transform group-hover:scale-125" />
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};
