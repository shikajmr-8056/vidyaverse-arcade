// =========================================================
// VIDYAVERSE NEWTON'S CARROM — GAMEPLAY & PHYSICS LAB
// Neatly arranged layout matching Math Ludo 3-Column Zero-Scroll
// =========================================================

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  RotateCcw,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import {
  CarromPlayMode,
  CarromSubMode,
  BotDifficulty,
  PlayerSlot,
  CarromPhysicsConfig,
  CarromMatchState,
  ShotTelemetry,
  CoinType,
} from './carrom/types';
import { CarromPhysicsEngine } from './carrom/carromPhysics';
import { evaluateCarromShot, checkMatchWinner } from './carrom/carromRules';
import { computeAIShot } from './carrom/carromAI';
import {
  saveCarromMatch,
  loadCarromMatch,
  clearCarromMatch,
  saveSoundPreference,
  loadSoundPreference,
} from './carrom/carromStorage';
import { generateShotPhysicsExplanation } from './carrom/physicsLabData';
import { carromSocketClient } from './carrom/carromSocketClient';

// Modular UI Components strictly following Hand-Drawn Wireframe Specification
import { CarromSetupView } from './carrom/components/CarromSetupView';
import { CarromBoardView } from './carrom/components/CarromBoardView';
import { CarromLeftPanel } from './carrom/components/CarromLeftPanel';
import { CarromRightPanel } from './carrom/components/CarromRightPanel';
import { CarromPhysicsBottomBar } from './carrom/components/CarromPhysicsBottomBar';
import { CarromReactions } from './carrom/components/CarromReactions';
import { CarromVictoryModal } from './carrom/components/CarromVictoryModal';

export const CarromPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, addXP, addCoins } = useAuthStore();

  // Navigation View State: 'setup' (lobby) vs 'match' (board)
  const [viewState, setViewState] = useState<'setup' | 'match'>('setup');

  // Match Config & Modes
  const [playMode, setPlayMode] = useState<CarromPlayMode>('solo');
  const [subMode, setSubMode] = useState<CarromSubMode>('classic');
  const [botDifficulty, setBotDifficulty] = useState<BotDifficulty>('intermediate');
  const [targetScore, setTargetScore] = useState<number>(25);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => loadSoundPreference());
  const [hasSavedGame, setHasSavedGame] = useState<boolean>(false);
  const [roomCode, setRoomCode] = useState<string>('ROOM88');

  // Activity Log Ticker (matching Ludo Match Activity Log)
  const [activityLog, setActivityLog] = useState<string[]>([
    'Match initialized! South Base takes the opening strike.',
  ]);

  // Initial Player Slots
  const [players, setPlayers] = useState<PlayerSlot[]>([
    {
      id: 'p1',
      name: user?.name || 'Explorer',
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
      botDifficulty: 'intermediate',
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

  // Active Match State
  const [matchState, setMatchState] = useState<CarromMatchState>({
    matchId: 'match_init',
    mode: 'solo',
    subMode: 'classic',
    players: [],
    activePlayerIndex: 0,
    turnNumber: 1,
    queenState: 'on_board',
    isShotInMotion: false,
    targetScore: 25,
    winner: null,
    lastShotTelemetry: null,
    config: {
      frictionAir: 0.013,
      restitution: 0.88,
      strikerMass: 8.0,
      coinMass: 2.0,
      powerMultiplier: 1.0,
    },
    status: 'lobby',
  });

  // Aiming & Controls State
  const [strikerBaselinePos, setStrikerBaselinePos] = useState<number>(400);
  const [aimAngleRad, setAimAngleRad] = useState<number>(-Math.PI / 2); // Pointing upwards by default
  const [shotPower, setShotPower] = useState<number>(65);
  const [isShotInMotion, setIsShotInMotion] = useState<boolean>(false);
  const [strikerSpeed, setStrikerSpeed] = useState<number>(0);
  const [turnMessage, setTurnMessage] = useState<string>('Your turn! Position striker and aim.');

  // Physics Engine Ref
  const physicsEngineRef = useRef<CarromPhysicsEngine | null>(null);

  // Calculate live coins remaining on board for scoreboard (Unconditional hook)
  const remainingCoins = React.useMemo(() => {
    const engine = physicsEngineRef.current;
    if (!engine) return { white: 9, black: 9, queen: true };
    let white = 0;
    let black = 0;
    let queen = false;
    for (const c of engine.coins) {
      if (!engine.isPocketed(c)) {
        const type = (c as unknown as { coinData: { type: CoinType } }).coinData?.type;
        if (type === 'white') white++;
        else if (type === 'black') black++;
        else if (type === 'queen') queen = true;
      }
    }
    return { white, black, queen };
  }, [matchState.turnNumber, matchState.isShotInMotion, matchState.queenState]);

  // ---------------------------------------------------------
  // SOUND EFFECTS (Web Audio API Synthesizer)
  // ---------------------------------------------------------
  const playSfx = useCallback(
    (type: 'hit' | 'pocket' | 'strike' | 'win') => {
      if (!soundEnabled || typeof window === 'undefined') return;
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        if (type === 'hit') {
          // Sharp wooden click
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(520, now);
          osc.frequency.exponentialRampToValueAtTime(140, now + 0.06);
          gain.gain.setValueAtTime(0.35, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.06);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.06);
        } else if (type === 'strike') {
          // Thump release impulse
          osc.type = 'sine';
          osc.frequency.setValueAtTime(280, now);
          osc.frequency.exponentialRampToValueAtTime(80, now + 0.12);
          gain.gain.setValueAtTime(0.5, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.12);
        } else if (type === 'pocket') {
          // Pleasant drop chime
          osc.type = 'sine';
          osc.frequency.setValueAtTime(580, now);
          osc.frequency.exponentialRampToValueAtTime(880, now + 0.2);
          gain.gain.setValueAtTime(0.4, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.2);
        } else if (type === 'win') {
          // Fanfare
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(440, now);
          osc.frequency.setValueAtTime(554.37, now + 0.1);
          osc.frequency.setValueAtTime(659.25, now + 0.2);
          gain.gain.setValueAtTime(0.4, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.4);
        }
      } catch {
        // Fallback
      }
    },
    [soundEnabled]
  );

  const handleToggleSound = (enabled: boolean) => {
    setSoundEnabled(enabled);
    saveSoundPreference(enabled);
  };

  // ---------------------------------------------------------
  // INITIALIZE / START MATCH
  // ---------------------------------------------------------
  const startNewMatch = useCallback(
    (customPlayers?: PlayerSlot[], customSubMode?: CarromSubMode) => {
      const activePlayers = customPlayers || players;
      const activeSubMode = customSubMode || subMode;

      // Clean up previous engine if any
      if (physicsEngineRef.current) {
        physicsEngineRef.current.destroy();
        physicsEngineRef.current = null;
      }

      const initialConfig: CarromPhysicsConfig = {
        frictionAir: 0.013,
        restitution: 0.88,
        strikerMass: 8.0,
        coinMass: 2.0,
        powerMultiplier: 1.0,
      };

      const engine = new CarromPhysicsEngine(initialConfig);
      physicsEngineRef.current = engine;

      engine.onCollision(() => playSfx('hit'));
      engine.onPocket(() => playSfx('pocket'));

      const initialMatchState: CarromMatchState = {
        matchId: `match_${Date.now()}`,
        mode: playMode,
        subMode: activeSubMode,
        players: activePlayers.map((p) => ({
          ...p,
          score: 0,
          coinsPocketed: { white: 0, black: 0, queen: 0 },
        })),
        activePlayerIndex: 0,
        turnNumber: 1,
        queenState: 'on_board',
        isShotInMotion: false,
        targetScore,
        winner: null,
        lastShotTelemetry: null,
        config: initialConfig,
        status: 'active',
      };

      setMatchState(initialMatchState);
      setStrikerBaselinePos(400);
      setAimAngleRad(-Math.PI / 2);
      setShotPower(65);
      setIsShotInMotion(false);
      setTurnMessage(`${activePlayers[0]?.name || 'Player 1'}’s turn! Aim and shoot.`);
      setActivityLog([`Match started! ${activePlayers[0]?.name || 'Player 1'} takes the opening strike.`]);
      setViewState('match');
    },
    [players, subMode, playMode, targetScore, playSfx]
  );

  // Resume Saved Game
  const resumeSavedMatch = () => {
    const saved = loadCarromMatch();
    if (!saved) return;

    if (physicsEngineRef.current) {
      physicsEngineRef.current.destroy();
      physicsEngineRef.current = null;
    }

    const engine = new CarromPhysicsEngine(saved.matchState.config);
    physicsEngineRef.current = engine;

    engine.initCoins(saved.coinPositions);
    const activePlayer = saved.matchState.players[saved.matchState.activePlayerIndex];
    engine.initStriker(activePlayer?.side || 'south', saved.strikerPosition.x);

    engine.onCollision(() => playSfx('hit'));
    engine.onPocket(() => playSfx('pocket'));

    setMatchState(saved.matchState);
    setStrikerBaselinePos(saved.strikerPosition.x);
    setIsShotInMotion(false);
    setActivityLog((prev) => [...prev, 'Resumed active saved match.']);
    setViewState('match');
  };

  // ---------------------------------------------------------
  // EXECUTE VALIDATED SHOT
  // ---------------------------------------------------------
  const executeShot = useCallback(
    (angleRad: number, powerPercent: number) => {
      const engine = physicsEngineRef.current;
      if (!engine || isShotInMotion || matchState.winner) return;

      playSfx('strike');

      // Execute on Matter.js physics engine
      const telemetry = engine.executeShot(angleRad, powerPercent);

      setIsShotInMotion(true);
      setTurnMessage('Striker launched! Simulating collisions & momentum transfer...');

      const activePlayer = matchState.players[matchState.activePlayerIndex];
      setActivityLog((prev) => [
        ...prev.slice(-15),
        `${activePlayer?.name || 'Player'} launched striker (${powerPercent}% power).`,
      ]);

      // Broadcast shot to socket if in online multiplayer
      if (playMode === 'friends') {
        carromSocketClient.broadcastShot(
          matchState.activePlayerIndex,
          angleRad,
          powerPercent,
          strikerBaselinePos
        );
      }

      setMatchState((prev) => ({
        ...prev,
        isShotInMotion: true,
        lastShotTelemetry: telemetry,
      }));
    },
    [isShotInMotion, matchState.winner, matchState.activePlayerIndex, matchState.players, playMode, strikerBaselinePos, playSfx]
  );

  // Baseline position change handler
  const handleBaselinePosChange = useCallback(
    (newPos: number) => {
      if (isShotInMotion || !physicsEngineRef.current) return;
      const activePlayer = matchState.players[matchState.activePlayerIndex];
      if (!activePlayer || activePlayer.isBot) return;

      setStrikerBaselinePos(newPos);
      physicsEngineRef.current.setStrikerBaselinePosition(activePlayer.side, newPos);
    },
    [isShotInMotion, matchState.players, matchState.activePlayerIndex]
  );

  // ---------------------------------------------------------
  // GAME LOOP TICK: POCKETS, SETTLING & TURN RESOLUTION
  // (Runs ONLY during physics simulation to keep UI 100% idle & responsive)
  // ---------------------------------------------------------
  useEffect(() => {
    if (viewState !== 'match' || !isShotInMotion) return;

    let animId: number;

    const gameLoop = () => {
      const engine = physicsEngineRef.current;
      if (!engine) {
        animId = requestAnimationFrame(gameLoop);
        return;
      }

      // Update pockets suction and settling
      const { isStillMoving, pocketedThisTick, strikerSpeed: currentSpeed, collisionCount } =
        engine.updatePocketsAndSettling();

      // Only update state if speed changes noticeably to avoid React re-render thrashing
      setStrikerSpeed((prev) => (Math.abs(prev - currentSpeed) > 0.08 ? currentSpeed : prev));

      // Settle shot when all pieces stop moving
      if (!isStillMoving) {
        setIsShotInMotion(false);
        setStrikerSpeed(0);

        // Gather all pocketed coins in this shot
        const pocketedCoins = engine.getPocketedInLastShot();

        // Evaluate shot rules
        const result = evaluateCarromShot(matchState, pocketedCoins);

        if (result.message) {
          setActivityLog((prev) => [...prev.slice(-15), result.message]);
        }

        // Re-spot queen if required
        if (result.queenReturnedToCenter) {
          engine.respotCoin('queen');
        }

        // Apply score and turn changes
        const updatedPlayers = matchState.players.map((p, idx) => {
          if (idx === matchState.activePlayerIndex) {
            return {
              ...p,
              score: Math.max(0, p.score + result.pointsAwarded),
            };
          }
          return p;
        });

        const nextPlayer = updatedPlayers[result.nextPlayerIndex];

        // Reset striker to next player's baseline
        if (nextPlayer) {
          engine.initStriker(nextPlayer.side, 400);
          setStrikerBaselinePos(400);
          const defaultAngle =
            nextPlayer.side === 'south'
              ? -Math.PI / 2
              : nextPlayer.side === 'north'
              ? Math.PI / 2
              : nextPlayer.side === 'west'
              ? 0
              : Math.PI;
          setAimAngleRad(defaultAngle);
        }

        // Check winner
        const remainingCount = engine.coins.filter((c) => !engine.isPocketed(c)).length;
        const winner = checkMatchWinner(updatedPlayers, remainingCount, matchState.targetScore);

        if (winner) {
          playSfx('win');
          addXP(50);
          addCoins(25);
          clearCarromMatch();
          setHasSavedGame(false);
          setActivityLog((prev) => [...prev.slice(-15), `🏆 ${winner.name} wins the match!`]);
        }

        // Update physics explanation
        let dynamicTelemetry = matchState.lastShotTelemetry;
        if (dynamicTelemetry) {
          dynamicTelemetry = {
            ...dynamicTelemetry,
            collisionCount,
            coinsPocketedInShot: pocketedCoins,
          };
          const explanationObj = generateShotPhysicsExplanation(dynamicTelemetry);
          dynamicTelemetry.newtonExplanation = explanationObj.explanation;
          dynamicTelemetry.lawReferenced = explanationObj.law;
        }

        const newMatchState: CarromMatchState = {
          ...matchState,
          players: updatedPlayers,
          activePlayerIndex: result.nextPlayerIndex,
          turnNumber: matchState.turnNumber + 1,
          queenState: result.queenClaimed
            ? 'covered'
            : pocketedCoins.includes('queen')
            ? 'pocketed_uncovered'
            : result.queenReturnedToCenter
            ? 'on_board'
            : matchState.queenState,
          queenCoverPlayerIndex: pocketedCoins.includes('queen')
            ? matchState.activePlayerIndex
            : result.queenReturnedToCenter
            ? undefined
            : matchState.queenCoverPlayerIndex,
          isShotInMotion: false,
          winner,
          lastShotTelemetry: dynamicTelemetry,
        };

        setMatchState(newMatchState);
        setTurnMessage(result.message || `${nextPlayer?.name}’s turn!`);

        // Auto-save active match state
        if (!winner) {
          saveCarromMatch({
            matchState: newMatchState,
            coinPositions: engine.coins.map((c) => ({
              id: (c as unknown as { coinData: { id: string } }).coinData.id,
              type: (c as unknown as { coinData: { type: CoinType } }).coinData.type,
              x: c.position.x,
              y: c.position.y,
              vx: c.velocity.x,
              vy: c.velocity.y,
              pocketed: engine.isPocketed(c),
            })),
            strikerPosition: { x: 400, y: 630 },
            timestamp: Date.now(),
          });
          setHasSavedGame(true);
        }
      }

      animId = requestAnimationFrame(gameLoop);
    };

    animId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animId);
  }, [viewState, isShotInMotion, matchState, playSfx, addXP, addCoins]);

  // ---------------------------------------------------------
  // BOT AI TURN AUTOMATION
  // ---------------------------------------------------------
  useEffect(() => {
    if (viewState !== 'match' || isShotInMotion || matchState.winner) return;

    const activePlayer = matchState.players[matchState.activePlayerIndex];
    if (!activePlayer?.isBot) return;

    const botTimer = setTimeout(() => {
      const engine = physicsEngineRef.current;
      if (!engine || !engine.striker) return;

      const aiPlan = computeAIShot(
        engine.engine,
        engine.striker,
        activePlayer.side,
        activePlayer.botDifficulty || botDifficulty,
        matchState.queenState === 'on_board'
      );

      if (aiPlan) {
        // Move striker to AI planned baseline position
        engine.setStrikerBaselinePosition(activePlayer.side, aiPlan.baselinePosition);
        setStrikerBaselinePos(aiPlan.baselinePosition);
        setAimAngleRad(aiPlan.angleRad);
        setShotPower(aiPlan.powerPercent);

        setTimeout(() => {
          executeShot(aiPlan.angleRad, aiPlan.powerPercent);
        }, 500);
      }
    }, 1100);

    return () => clearTimeout(botTimer);
  }, [
    viewState,
    isShotInMotion,
    matchState.activePlayerIndex,
    matchState.players,
    matchState.queenState,
    matchState.winner,
    botDifficulty,
    executeShot,
  ]);

  // Physics Lab Config Change Handler
  const handleConfigChange = (newConfig: Partial<CarromPhysicsConfig>) => {
    if (physicsEngineRef.current) {
      physicsEngineRef.current.updateConfig(newConfig);
    }
    setMatchState((prev) => ({
      ...prev,
      config: { ...prev.config, ...newConfig },
    }));
  };

  // ---------------------------------------------------------
  // RENDER: LOBBY / SETUP VIEW (Matching Screenshot 1)
  // ---------------------------------------------------------
  if (viewState === 'setup') {
    return (
      <CarromSetupView
        playMode={playMode}
        setPlayMode={setPlayMode}
        subMode={subMode}
        setSubMode={setSubMode}
        players={players}
        setPlayers={setPlayers}
        botDifficulty={botDifficulty}
        setBotDifficulty={setBotDifficulty}
        targetScore={targetScore}
        setTargetScore={setTargetScore}
        soundEnabled={soundEnabled}
        setSoundEnabled={handleToggleSound}
        hasSavedGame={hasSavedGame}
        onResumeSavedGame={resumeSavedMatch}
        onStartMatch={() => startNewMatch()}
        onNavigateBack={() => navigate('/playlab')}
        roomCode={roomCode}
        setRoomCode={setRoomCode}
        onCreateRoom={() => {
          const code = carromSocketClient.createRoom(players[0]);
          setRoomCode(code);
        }}
        onJoinRoom={() => {
          carromSocketClient.joinRoom(roomCode, players[0]);
          startNewMatch();
        }}
      />
    );
  }

  const activePlayer = matchState.players[matchState.activePlayerIndex] || players[0];

  // ---------------------------------------------------------
  // RENDER: IN-GAME MATCH VIEW
  // Hand-Drawn Wireframe Specification:
  // - Left: Match Scoreboard (top) + Controls & Pro Tips (bottom)
  // - Center: Large Centered Carrom Board
  // - Right: Striker Position, Aim Angle, Shot Power, Board Friction, SHOOT Button
  // - Bottom: Full-Width Newton's Physics Insights Panel
  // ---------------------------------------------------------
  return (
    <div className="h-full max-h-full flex flex-col bg-canvas text-text-primary selection:bg-purple-500/30 selection:text-purple-200 overflow-hidden font-sans select-none">
      {/* 1. TOP HEADER (Navigation & Quick Controls) */}
      <header className="h-11 sm:h-12 shrink-0 px-3 sm:px-5 bg-card/90 backdrop-blur-md border-b border-border flex items-center justify-between z-30">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setViewState('setup')}
            className="p-1.5 rounded-xl bg-card hover:bg-canvas text-text-muted hover:text-text-primary transition-colors flex items-center gap-1.5 text-xs font-semibold border border-border cursor-pointer"
            title="Return to Match Setup"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Lobby</span>
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold font-display text-text-primary">Newton’s Carrom</h1>
            <span className="badge-playlab text-[10px] hidden sm:inline">
              {playMode === 'friends'
                ? `Online Room: ${roomCode}`
                : playMode === 'duel'
                ? '1v1 Duel'
                : playMode === 'team'
                ? '2v2 Doubles'
                : 'Solo vs AI'}
            </span>
          </div>
        </div>

        {/* Top Right: Reaction Bar, Sound, Reset */}
        <div className="flex items-center gap-2">
          <CarromReactions />

          <button
            onClick={() => handleToggleSound(!soundEnabled)}
            className="p-1.5 sm:p-2 rounded-xl bg-card hover:bg-canvas text-text-muted hover:text-text-primary transition-colors border border-border cursor-pointer"
            title={soundEnabled ? 'Mute' : 'Enable sound'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={() => startNewMatch()}
            className="p-1.5 sm:p-2 rounded-xl bg-card hover:bg-canvas text-text-muted hover:text-text-primary transition-colors border border-border cursor-pointer"
            title="Reset Board"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 2. MAIN VIEWPORT-FITTED CONTAINER (Zero-Scroll) */}
      <div className="flex-1 min-h-0 flex flex-col p-2 sm:p-2.5 lg:p-3 gap-2 overflow-hidden w-full max-w-[1700px] mx-auto">
        {/* A. MAIN GAMEPLAY REGION (3 Vertical Columns) */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[270px_1fr_270px] xl:grid-cols-[290px_1fr_290px] gap-2.5 lg:gap-3 items-center overflow-hidden">
          
          {/* LEFT COLUMN: Match Scoreboard (Top) + Controls & Pro Tips (Bottom) */}
          <CarromLeftPanel
            matchState={matchState}
            remainingCoins={remainingCoins}
            turnMessage={turnMessage}
          />

          {/* CENTER COLUMN: Large Centered Carrom Board */}
          <div className="flex-1 flex flex-col items-center justify-center min-h-0 h-full w-full overflow-hidden">
            <CarromBoardView
              physicsEngine={physicsEngineRef.current}
              activePlayer={activePlayer}
              isShotInMotion={isShotInMotion}
              strikerBaselinePos={strikerBaselinePos}
              onBaselinePosChange={handleBaselinePosChange}
              aimAngleRad={aimAngleRad}
              onAimAngleChange={setAimAngleRad}
              shotPower={shotPower}
              onShotPowerChange={setShotPower}
              onExecuteShot={executeShot}
              aimGuideEnabled={true}
              className="max-h-[min(100%,560px)] max-w-full aspect-square"
            />
          </div>

          {/* RIGHT COLUMN: Striker Position, Aim Angle, Shot Power, Board Friction & SHOOT Button */}
          <CarromRightPanel
            activePlayer={activePlayer}
            isShotInMotion={isShotInMotion}
            strikerBaselinePos={strikerBaselinePos}
            onBaselinePosChange={handleBaselinePosChange}
            aimAngleRad={aimAngleRad}
            onAimAngleChange={setAimAngleRad}
            shotPower={shotPower}
            onShotPowerChange={setShotPower}
            boardFriction={matchState.config.frictionAir}
            onBoardFrictionChange={(f) => handleConfigChange({ frictionAir: f })}
            onShoot={() => executeShot(aimAngleRad, shotPower)}
          />
        </div>

        {/* B. BOTTOM REGION: Newton's Physics Insights (Dedicated Full-Width Horizontal Panel) */}
        <CarromPhysicsBottomBar
          lastTelemetry={matchState.lastShotTelemetry}
          strikerSpeed={strikerSpeed}
          config={matchState.config}
        />
      </div>

      {/* 3. VICTORY CELEBRATION MODAL */}
      {matchState.winner && (
        <CarromVictoryModal
          winner={matchState.winner}
          players={matchState.players}
          onRematch={() => startNewMatch()}
          onBackToLobby={() => setViewState('setup')}
        />
      )}
    </div>
  );
};

export default CarromPage;
