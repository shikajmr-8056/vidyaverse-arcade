// =========================================================
// VIDYAVERSE NEWTON'S CARROM — HIGH-FIDELITY CANVAS BOARD
// Decoupled 60FPS Render Engine with Zero-Latency Pointer Tracking
// =========================================================

import React, { useRef, useEffect, useCallback } from 'react';
import Matter from 'matter-js';
import {
  CarromPhysicsEngine,
  BOARD_SIZE,
  POCKETS,
  COIN_RADIUS,
  STRIKER_RADIUS,
  BASELINE_CONFIGS,
} from '../carromPhysics';
import { PlayerSlot, CoinBodyData } from '../types';

export interface CarromBoardViewProps {
  physicsEngine: CarromPhysicsEngine | null;
  activePlayer: PlayerSlot;
  isShotInMotion: boolean;
  strikerBaselinePos: number;
  onBaselinePosChange: (newPos: number) => void;
  aimAngleRad: number;
  onAimAngleChange: (newAngle: number) => void;
  shotPower: number;
  onShotPowerChange: (newPower: number) => void;
  onExecuteShot: (angleRad: number, powerPercent: number) => void;
  aimGuideEnabled?: boolean;
}

type DragMode = 'none' | 'striker_positioning' | 'aiming' | 'slingshot';

export const CarromBoardView: React.FC<CarromBoardViewProps> = ({
  physicsEngine,
  activePlayer,
  isShotInMotion,
  strikerBaselinePos,
  onBaselinePosChange,
  aimAngleRad,
  onAimAngleChange,
  shotPower,
  onShotPowerChange,
  onExecuteShot,
  aimGuideEnabled = true,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ---------------------------------------------------------
  // DECOUPLED REFS FOR ZERO-LATENCY 60FPS INTERACTION
  // ---------------------------------------------------------
  const physicsEngineRef = useRef<CarromPhysicsEngine | null>(physicsEngine);
  const activePlayerRef = useRef<PlayerSlot>(activePlayer);
  const isShotInMotionRef = useRef<boolean>(isShotInMotion);
  const strikerBaselinePosRef = useRef<number>(strikerBaselinePos);
  const aimAngleRadRef = useRef<number>(aimAngleRad);
  const shotPowerRef = useRef<number>(shotPower);
  const aimGuideEnabledRef = useRef<boolean>(aimGuideEnabled);

  // Interaction State Refs
  const dragModeRef = useRef<DragMode>('none');
  const pointerDownPosRef = useRef<{ x: number; y: number } | null>(null);
  const currentPointerPosRef = useRef<{ x: number; y: number } | null>(null);
  const pointerIdRef = useRef<number | null>(null);
  const syncRafRef = useRef<number | null>(null);

  // Synchronize incoming props to refs immediately
  useEffect(() => {
    physicsEngineRef.current = physicsEngine;
  }, [physicsEngine]);

  useEffect(() => {
    activePlayerRef.current = activePlayer;
  }, [activePlayer]);

  useEffect(() => {
    isShotInMotionRef.current = isShotInMotion;
  }, [isShotInMotion]);

  useEffect(() => {
    strikerBaselinePosRef.current = strikerBaselinePos;
  }, [strikerBaselinePos]);

  useEffect(() => {
    aimAngleRadRef.current = aimAngleRad;
  }, [aimAngleRad]);

  useEffect(() => {
    shotPowerRef.current = shotPower;
  }, [shotPower]);

  useEffect(() => {
    aimGuideEnabledRef.current = aimGuideEnabled;
  }, [aimGuideEnabled]);

  // ---------------------------------------------------------
  // THROTTLED REACT STATE DISPATCH
  // Batches state updates into 1 per animation frame to prevent
  // heavy parent re-renders from bottlenecking input tracking
  // ---------------------------------------------------------
  const scheduleReactSync = useCallback(() => {
    if (syncRafRef.current !== null) return;
    syncRafRef.current = requestAnimationFrame(() => {
      syncRafRef.current = null;
      onBaselinePosChange(strikerBaselinePosRef.current);
      onAimAngleChange(aimAngleRadRef.current);
      onShotPowerChange(shotPowerRef.current);
    });
  }, [onBaselinePosChange, onAimAngleChange, onShotPowerChange]);

  const flushReactSync = useCallback(() => {
    if (syncRafRef.current !== null) {
      cancelAnimationFrame(syncRafRef.current);
      syncRafRef.current = null;
    }
    onBaselinePosChange(strikerBaselinePosRef.current);
    onAimAngleChange(aimAngleRadRef.current);
    onShotPowerChange(shotPowerRef.current);
  }, [onBaselinePosChange, onAimAngleChange, onShotPowerChange]);

  // ---------------------------------------------------------
  // CONVERT SCREEN COORDINATES TO LOGICAL 800x800 COORDINATES
  // ---------------------------------------------------------
  const getLogicalCoords = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 400, y: 400 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = BOARD_SIZE / rect.width;
    const scaleY = BOARD_SIZE / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  }, []);

  // ---------------------------------------------------------
  // POINTER EVENT HANDLERS (WITH POINTER CAPTURE)
  // ---------------------------------------------------------
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const engine = physicsEngineRef.current;
    const player = activePlayerRef.current;
    if (isShotInMotionRef.current || player.isBot || !engine?.striker) return;

    // Capture pointer so dragging continues seamlessly even outside the canvas
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
      pointerIdRef.current = e.pointerId;
    } catch {
      // Fallback
    }

    const coords = getLogicalCoords(e.clientX, e.clientY);
    pointerDownPosRef.current = coords;
    currentPointerPosRef.current = coords;

    const striker = engine.striker;
    const strikerPos = striker.position;
    const distToStriker = Math.hypot(coords.x - strikerPos.x, coords.y - strikerPos.y);

    const baseline = BASELINE_CONFIGS[player.side];
    const isHorizontal = player.side === 'south' || player.side === 'north';

    // Baseline Corridor Check
    let inBaselineBand = false;
    if (player.side === 'south') {
      inBaselineBand =
        coords.y >= 590 &&
        coords.y <= 695 &&
        coords.x >= baseline.minTravel - 35 &&
        coords.x <= baseline.maxTravel + 35;
    } else if (player.side === 'north') {
      inBaselineBand =
        coords.y >= 105 &&
        coords.y <= 210 &&
        coords.x >= baseline.minTravel - 35 &&
        coords.x <= baseline.maxTravel + 35;
    } else if (player.side === 'west') {
      inBaselineBand =
        coords.x >= 105 &&
        coords.x <= 210 &&
        coords.y >= baseline.minTravel - 35 &&
        coords.y <= baseline.maxTravel + 35;
    } else if (player.side === 'east') {
      inBaselineBand =
        coords.x >= 590 &&
        coords.x <= 695 &&
        coords.y >= baseline.minTravel - 35 &&
        coords.y <= baseline.maxTravel + 35;
    }

    // 1. STRIKER BASELINE POSITIONING
    // If touching the striker directly OR touching anywhere in the baseline slider track:
    if (distToStriker <= STRIKER_RADIUS + 22 || inBaselineBand) {
      dragModeRef.current = 'striker_positioning';
      const travelCoord = isHorizontal ? coords.x : coords.y;
      const clamped = Math.max(baseline.minTravel, Math.min(baseline.maxTravel, travelCoord));
      strikerBaselinePosRef.current = clamped;
      engine.setStrikerBaselinePosition(player.side, clamped);
      scheduleReactSync();
      return;
    }

    // 2. DIRECT AIMING
    // Touching anywhere else on the board aims immediately towards that point
    dragModeRef.current = 'aiming';
    const angle = Math.atan2(coords.y - strikerPos.y, coords.x - strikerPos.x);
    aimAngleRadRef.current = angle;
    scheduleReactSync();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const engine = physicsEngineRef.current;
    const player = activePlayerRef.current;
    if (isShotInMotionRef.current || player.isBot || !engine?.striker) return;
    if (dragModeRef.current === 'none' || !pointerDownPosRef.current) return;

    const coords = getLogicalCoords(e.clientX, e.clientY);
    currentPointerPosRef.current = coords;
    const striker = engine.striker;
    const strikerPos = striker.position;
    const baseline = BASELINE_CONFIGS[player.side];
    const isHorizontal = player.side === 'south' || player.side === 'north';

    if (dragModeRef.current === 'striker_positioning') {
      // Check if player pulls backwards away from baseline to engage slingshot
      const pullAway =
        player.side === 'south'
          ? coords.y - baseline.fixedCoordinate
          : player.side === 'north'
          ? baseline.fixedCoordinate - coords.y
          : player.side === 'west'
          ? baseline.fixedCoordinate - coords.x
          : coords.x - baseline.fixedCoordinate;

      if (pullAway > 42) {
        // Transition seamlessly to Slingshot Power Cue
        dragModeRef.current = 'slingshot';
      } else {
        // Instantaneous, frictionless horizontal baseline tracking
        const travelCoord = isHorizontal ? coords.x : coords.y;
        const clamped = Math.max(baseline.minTravel, Math.min(baseline.maxTravel, travelCoord));
        strikerBaselinePosRef.current = clamped;
        engine.setStrikerBaselinePosition(player.side, clamped);
        scheduleReactSync();
        return;
      }
    }

    if (dragModeRef.current === 'slingshot') {
      // Slingshot: pull vector away from striker
      const dx = strikerPos.x - coords.x;
      const dy = strikerPos.y - coords.y;
      const pullDist = Math.hypot(dx, dy);

      if (pullDist > 8) {
        const angle = Math.atan2(dy, dx);
        aimAngleRadRef.current = angle;

        // Calibrate pull distance to power (15% to 100%)
        const power = Math.min(100, Math.max(15, Math.round((pullDist / 135) * 100)));
        shotPowerRef.current = power;
        scheduleReactSync();
      }
      return;
    }

    if (dragModeRef.current === 'aiming') {
      // Direct aiming: orient towards pointer position with zero delay
      const angle = Math.atan2(coords.y - strikerPos.y, coords.x - strikerPos.x);
      aimAngleRadRef.current = angle;
      scheduleReactSync();
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (pointerIdRef.current !== null) {
      try {
        e.currentTarget.releasePointerCapture(pointerIdRef.current);
      } catch {
        // Fallback
      }
      pointerIdRef.current = null;
    }

    const currentMode = dragModeRef.current;
    dragModeRef.current = 'none';

    // Flush latest exact coordinates and angles to React controls
    flushReactSync();

    // If releasing a slingshot pull with sufficient distance (> 28px), execute shot
    if (currentMode === 'slingshot' && pointerDownPosRef.current && currentPointerPosRef.current) {
      const engine = physicsEngineRef.current;
      if (engine?.striker) {
        const dx = engine.striker.position.x - currentPointerPosRef.current.x;
        const dy = engine.striker.position.y - currentPointerPosRef.current.y;
        const pullDist = Math.hypot(dx, dy);

        if (pullDist >= 28) {
          onExecuteShot(aimAngleRadRef.current, shotPowerRef.current);
        }
      }
    }

    pointerDownPosRef.current = null;
    currentPointerPosRef.current = null;
  };

  // ---------------------------------------------------------
  // HIGH-RESOLUTION CANVAS RENDER LOOP (UNINTERRUPTED 60FPS)
  // ---------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const engine = physicsEngineRef.current;
      const player = activePlayerRef.current;
      const isShotInMotion = isShotInMotionRef.current;
      const aimAngle = aimAngleRadRef.current;
      const power = shotPowerRef.current;
      const aimGuideEnabled = aimGuideEnabledRef.current;
      const currentMode = dragModeRef.current;

      ctx.clearRect(0, 0, BOARD_SIZE, BOARD_SIZE);

      // 1. MAHOGANY WOODEN OUTER FRAME WITH BEVEL
      ctx.fillStyle = '#451a03'; // Deep rich mahogany
      ctx.fillRect(0, 0, BOARD_SIZE, BOARD_SIZE);

      // Inner cushion bevel gradient
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 8;
      ctx.strokeRect(4, 4, BOARD_SIZE - 8, BOARD_SIZE - 8);

      // Wooden corner accents
      ctx.strokeStyle = '#92400e';
      ctx.lineWidth = 2;
      ctx.strokeRect(38, 38, BOARD_SIZE - 76, BOARD_SIZE - 76);

      // 2. LACQUER PLAYING SURFACE (Warm polished ivory plywood)
      ctx.fillStyle = '#fef3c7'; // Polished ivory
      ctx.fillRect(40, 40, BOARD_SIZE - 80, BOARD_SIZE - 80);

      // Surface border line
      ctx.strokeStyle = '#b45309';
      ctx.lineWidth = 2;
      ctx.strokeRect(40, 40, BOARD_SIZE - 80, BOARD_SIZE - 80);

      // 3. FOUR CORNER POCKETS (Deep holes with mesh nets)
      POCKETS.forEach((pocket) => {
        // Deep shadow
        ctx.beginPath();
        ctx.arc(pocket.x, pocket.y, pocket.radius + 3, 0, Math.PI * 2);
        ctx.fillStyle = '#1c1917';
        ctx.fill();

        // Pocket hole
        ctx.beginPath();
        ctx.arc(pocket.x, pocket.y, pocket.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#09090b';
        ctx.fill();
        ctx.strokeStyle = '#78350f';
        ctx.lineWidth = 3.5;
        ctx.stroke();

        // Mesh Web Pattern
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(pocket.x, pocket.y, pocket.radius - 8, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(pocket.x - 12, pocket.y - 12);
        ctx.lineTo(pocket.x + 12, pocket.y + 12);
        ctx.moveTo(pocket.x + 12, pocket.y - 12);
        ctx.lineTo(pocket.x - 12, pocket.y + 12);
        ctx.stroke();
      });

      // 4. CORNER REBOUND ARROWS (Radiating towards center)
      const diagonals = [
        { x1: 95, y1: 95, x2: 240, y2: 240 },
        { x1: 705, y1: 95, x2: 560, y2: 240 },
        { x1: 95, y1: 705, x2: 240, y2: 560 },
        { x1: 705, y1: 705, x2: 560, y2: 560 },
      ];
      diagonals.forEach((d) => {
        ctx.beginPath();
        ctx.moveTo(d.x1, d.y1);
        ctx.lineTo(d.x2, d.y2);
        ctx.strokeStyle = '#d97706';
        ctx.lineWidth = 1.6;
        ctx.stroke();

        // Decorative arrow circle
        ctx.beginPath();
        ctx.arc(d.x2, d.y2, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#dc2626';
        ctx.fill();
      });

      // 5. FOUR BASELINES & CIRCLES (South, North, West, East)
      const drawHorizontalBaseline = (yFixed: number, isActive: boolean) => {
        ctx.strokeStyle = isActive ? '#dc2626' : '#991b1b';
        ctx.lineWidth = isActive ? 2.2 : 1.8;

        // Double lines
        ctx.beginPath();
        ctx.moveTo(200, yFixed - 15);
        ctx.lineTo(600, yFixed - 15);
        ctx.moveTo(200, yFixed + 15);
        ctx.lineTo(600, yFixed + 15);
        ctx.stroke();

        // Baseline endpoint circles
        [200, 600].forEach((cx) => {
          ctx.beginPath();
          ctx.arc(cx, yFixed, 15, 0, Math.PI * 2);
          ctx.fillStyle = '#fef3c7';
          ctx.fill();
          ctx.strokeStyle = '#dc2626';
          ctx.lineWidth = 1.8;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(cx, yFixed, 7, 0, Math.PI * 2);
          ctx.fillStyle = '#ef4444';
          ctx.fill();
        });
      };

      const drawVerticalBaseline = (xFixed: number, isActive: boolean) => {
        ctx.strokeStyle = isActive ? '#dc2626' : '#991b1b';
        ctx.lineWidth = isActive ? 2.2 : 1.8;

        // Double lines
        ctx.beginPath();
        ctx.moveTo(xFixed - 15, 200);
        ctx.lineTo(xFixed - 15, 600);
        ctx.moveTo(xFixed + 15, 200);
        ctx.lineTo(xFixed + 15, 600);
        ctx.stroke();

        // Baseline endpoint circles
        [200, 600].forEach((cy) => {
          ctx.beginPath();
          ctx.arc(xFixed, cy, 15, 0, Math.PI * 2);
          ctx.fillStyle = '#fef3c7';
          ctx.fill();
          ctx.strokeStyle = '#dc2626';
          ctx.lineWidth = 1.8;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(xFixed, cy, 7, 0, Math.PI * 2);
          ctx.fillStyle = '#ef4444';
          ctx.fill();
        });
      };

      // Draw all 4 standard baselines
      drawHorizontalBaseline(630, player.side === 'south');
      drawHorizontalBaseline(170, player.side === 'north');
      drawVerticalBaseline(170, player.side === 'west');
      drawVerticalBaseline(630, player.side === 'east');

      // 6. CENTRAL MANDALA & CONCENTRIC CIRCLES
      ctx.strokeStyle = '#b45309';
      ctx.lineWidth = 1.5;

      // Outer circle (outer coin boundary)
      ctx.beginPath();
      ctx.arc(400, 400, 85, 0, Math.PI * 2);
      ctx.stroke();

      // Middle circle (inner coin boundary)
      ctx.beginPath();
      ctx.arc(400, 400, 32, 0, Math.PI * 2);
      ctx.stroke();

      // 8-Petal Mandala motif
      for (let p = 0; p < 8; p++) {
        const pAngle = (p * Math.PI) / 4;
        const px = 400 + Math.cos(pAngle) * 55;
        const py = 400 + Math.sin(pAngle) * 55;
        ctx.beginPath();
        ctx.arc(px, py, 14, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(180, 83, 9, 0.4)';
        ctx.stroke();
      }

      // Center queen spot
      ctx.beginPath();
      ctx.arc(400, 400, 9, 0, Math.PI * 2);
      ctx.fillStyle = '#dc2626';
      ctx.fill();

      // 7. DEDICATED ON-BOARD BASELINE SLIDER TRACK (CARROM KING STYLE)
      // Visual feedback guide for silky smooth striker positioning
      if (!isShotInMotion && !player.isBot && engine?.striker) {
        const strikerPos = engine.striker.position;
        const isHorizontal = player.side === 'south' || player.side === 'north';

        if (isHorizontal) {
          const trackY = player.side === 'south' ? 665 : 135;

          // Track Background Line
          ctx.save();
          ctx.beginPath();
          ctx.roundRect(196, trackY - 3, 408, 6, 3);
          ctx.fillStyle = 'rgba(180, 83, 9, 0.2)';
          ctx.fill();
          ctx.strokeStyle = 'rgba(180, 83, 9, 0.5)';
          ctx.lineWidth = 1;
          ctx.stroke();

          // Tick marks at endpoints & center
          [200, 400, 600].forEach((tx) => {
            ctx.beginPath();
            ctx.moveTo(tx, trackY - 6);
            ctx.lineTo(tx, trackY + 6);
            ctx.strokeStyle = '#b45309';
            ctx.lineWidth = 1.5;
            ctx.stroke();
          });

          // Connecting indicator line from slider track to striker
          ctx.beginPath();
          ctx.setLineDash([3, 3]);
          ctx.moveTo(strikerPos.x, trackY);
          ctx.lineTo(strikerPos.x, strikerPos.y + (player.side === 'south' ? 18 : -18));
          ctx.strokeStyle = currentMode === 'striker_positioning' ? '#0284c7' : 'rgba(180, 83, 9, 0.6)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.setLineDash([]);

          // Glowing Slider Grip Thumb
          ctx.beginPath();
          ctx.arc(strikerPos.x, trackY, 7.5, 0, Math.PI * 2);
          ctx.fillStyle = currentMode === 'striker_positioning' ? '#38bdf8' : '#fef3c7';
          ctx.fill();
          ctx.strokeStyle = '#0284c7';
          ctx.lineWidth = 2.2;
          ctx.stroke();

          // Subtle helper arrows
          ctx.fillStyle = 'rgba(180, 83, 9, 0.65)';
          ctx.font = 'bold 9px system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(
            '◀ SLIDE STRIKER ▶',
            400,
            player.side === 'south' ? trackY + 14 : trackY - 14
          );
          ctx.restore();
        }
      }

      // 8. MATTER.JS BODIES (Coins & Striker)
      if (engine?.engine) {
        const bodies = Matter.Composite.allBodies(engine.engine.world);

        bodies.forEach((body) => {
          if (body.isStatic) return;

          ctx.save();
          ctx.translate(body.position.x, body.position.y);
          ctx.rotate(body.angle);

          // 3D Drop Shadow
          ctx.beginPath();
          ctx.arc(2.5, 3.5, body.circleRadius || COIN_RADIUS, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
          ctx.fill();

          if (body.label === 'striker') {
            // STRIKER: Translucent acrylic disc with laser rings
            if (currentMode === 'striker_positioning') {
              // Active positioning halo glow
              ctx.shadowColor = '#38bdf8';
              ctx.shadowBlur = 14;
            }

            ctx.beginPath();
            ctx.arc(0, 0, STRIKER_RADIUS, 0, Math.PI * 2);
            ctx.fillStyle = '#0284c7'; // Electric Cyan
            ctx.fill();
            ctx.shadowBlur = 0; // Reset shadow

            ctx.strokeStyle = '#e0f2fe';
            ctx.lineWidth = 2.5;
            ctx.stroke();

            // Inner engraving rings
            ctx.beginPath();
            ctx.arc(0, 0, 16, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(0, 0, 6, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
          } else {
            // COINS (Queen, White, Black)
            const data = (body as unknown as { coinData?: CoinBodyData }).coinData;
            const r = body.circleRadius || COIN_RADIUS;

            ctx.beginPath();
            ctx.arc(0, 0, r, 0, Math.PI * 2);

            if (data?.type === 'queen') {
              // Red Queen
              ctx.fillStyle = '#dc2626';
              ctx.fill();
              ctx.strokeStyle = '#fef08a';
              ctx.lineWidth = 2;
              ctx.stroke();

              // Queen center jewel
              ctx.beginPath();
              ctx.arc(0, 0, 5, 0, Math.PI * 2);
              ctx.fillStyle = '#fde047';
              ctx.fill();
            } else if (data?.type === 'white') {
              // Ivory White Coin
              ctx.fillStyle = '#f8fafc';
              ctx.fill();
              ctx.strokeStyle = '#cbd5e1';
              ctx.lineWidth = 1.5;
              ctx.stroke();

              // Concentric ring
              ctx.beginPath();
              ctx.arc(0, 0, 6, 0, Math.PI * 2);
              ctx.fillStyle = '#e2e8f0';
              ctx.fill();
            } else {
              // Ebony Black Coin
              ctx.fillStyle = '#1e293b';
              ctx.fill();
              ctx.strokeStyle = '#475569';
              ctx.lineWidth = 1.5;
              ctx.stroke();

              // Concentric ring
              ctx.beginPath();
              ctx.arc(0, 0, 6, 0, Math.PI * 2);
              ctx.fillStyle = '#334155';
              ctx.fill();
            }
          }

          ctx.restore();
        });
      }

      // 9. AIMING GUIDE, TRAJECTORY & SLINGSHOT POWER VISUALS
      if (
        aimGuideEnabled &&
        !isShotInMotion &&
        !player.isBot &&
        engine?.striker
      ) {
        const sx = engine.striker.position.x;
        const sy = engine.striker.position.y;

        const trajectory = engine.calculateAimTrajectory(
          sx,
          sy,
          aimAngle,
          power
        );

        ctx.save();

        // A. Primary Aim Trajectory Line
        ctx.setLineDash([7, 5]);
        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 2.5;

        ctx.beginPath();
        ctx.moveTo(sx, sy);
        trajectory.path.forEach((pt) => {
          ctx.lineTo(pt.x, pt.y);
        });
        ctx.stroke();
        ctx.setLineDash([]);

        // B. Endpoint Ghost Striker / Hit Marker
        const lastPt = trajectory.path[trajectory.path.length - 1];
        if (lastPt) {
          if (trajectory.hitCoin) {
            // Ghost striker at impact position
            ctx.beginPath();
            ctx.arc(lastPt.x, lastPt.y, STRIKER_RADIUS, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(2, 132, 199, 0.18)';
            ctx.fill();
            ctx.strokeStyle = '#0284c7';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Coin Deflection Indicator Arrow
            const coinX = trajectory.hitCoin.x;
            const coinY = trajectory.hitCoin.y;
            const defAngle = Math.atan2(coinY - lastPt.y, coinX - lastPt.x);
            const defLen = 35;
            const defTargetX = coinX + Math.cos(defAngle) * defLen;
            const defTargetY = coinY + Math.sin(defAngle) * defLen;

            ctx.beginPath();
            ctx.moveTo(coinX, coinY);
            ctx.lineTo(defTargetX, defTargetY);
            ctx.strokeStyle = '#f59e0b'; // Amber warning arrow
            ctx.lineWidth = 2.5;
            ctx.stroke();

            // Arrow Head
            ctx.beginPath();
            ctx.arc(defTargetX, defTargetY, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#f59e0b';
            ctx.fill();
          } else {
            // Wall rebound or maximum reach dot
            ctx.beginPath();
            ctx.arc(lastPt.x, lastPt.y, 6, 0, Math.PI * 2);
            ctx.fillStyle = '#38bdf8';
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }

        // C. Slingshot Elastic Pull String & Power Arc
        if (currentMode === 'slingshot' && currentPointerPosRef.current) {
          const dragPos = currentPointerPosRef.current;

          // Elastic rubber band connecting striker to finger
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(dragPos.x, dragPos.y);
          ctx.strokeStyle = 'rgba(239, 68, 68, 0.7)';
          ctx.lineWidth = 3;
          ctx.stroke();

          // Pull release handle
          ctx.beginPath();
          ctx.arc(dragPos.x, dragPos.y, 8, 0, Math.PI * 2);
          ctx.fillStyle = '#ef4444';
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Dynamic Power Ring around striker
          ctx.beginPath();
          ctx.arc(
            sx,
            sy,
            STRIKER_RADIUS + 8,
            aimAngle - Math.PI / 3,
            aimAngle - Math.PI / 3 + (Math.PI * 2 * (power / 100)) * (2 / 3)
          );
          ctx.strokeStyle = power > 75 ? '#ef4444' : power > 45 ? '#f59e0b' : '#10b981';
          ctx.lineWidth = 3.5;
          ctx.stroke();
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, []); // Run continuously at 60 FPS without tearing down on pointer movements!

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[620px] aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-[#331105] bg-[#331105] select-none mx-auto flex items-center justify-center"
      style={{ touchAction: 'none' }}
    >
      <canvas
        ref={canvasRef}
        width={BOARD_SIZE}
        height={BOARD_SIZE}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="w-full h-full cursor-crosshair touch-none"
      />
    </div>
  );
};
