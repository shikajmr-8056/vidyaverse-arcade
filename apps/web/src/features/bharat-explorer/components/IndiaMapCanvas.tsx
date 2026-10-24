// =========================================================
// BHARAT EXPLORER — INTERACTIVE INDIA MAP CANVAS
// Geographically Accurate Survey of India Boundaries
// With Children's Educational Map Aesthetic & Illustrations
// =========================================================

import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StateRegion } from '../types';
import {
  INDIA_STATES,
  LANDMARK_PINS,
  RIVER_FEATURES,
  NEIGHBOR_COUNTRIES,
  WATER_BODIES
} from '../data/india-map-data';

interface IndiaMapCanvasProps {
  selectedState: StateRegion | null;
  hoveredStateId: string | null;
  onSelectState: (state: StateRegion | null) => void;
  onHoverState: (id: string | null) => void;
  filterZone: string;
  zoom: number;
  showLandmarks: boolean;
  showRivers: boolean;
  showLabels: boolean;
}

export const IndiaMapCanvas: React.FC<IndiaMapCanvasProps> = ({
  selectedState,
  hoveredStateId,
  onSelectState,
  onHoverState,
  filterZone,
  zoom,
  showLandmarks,
  showRivers,
  showLabels
}) => {
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

  // Handle Pan Dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag when clicking background, not on interactive states
    if ((e.target as HTMLElement).tagName === 'svg' || (e.target as HTMLElement).id === 'map-ocean-bg') {
      setIsDragging(true);
      dragStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        panX: pan.x,
        panY: pan.y
      };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setPan({
      x: dragStartRef.current.panX + dx / zoom,
      y: dragStartRef.current.panY + dy / zoom
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="relative w-full h-full select-none overflow-hidden bg-gradient-to-b from-sky-100 via-sky-50 to-blue-100 dark:from-slate-900 dark:via-sky-950/40 dark:to-slate-950 cursor-grab active:cursor-grabbing transition-colors duration-300"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <svg
        viewBox="0 0 850 950"
        className="w-full h-full max-h-[92vh] object-contain transition-transform duration-300 ease-out filter drop-shadow-md"
        style={{
          transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
          transformOrigin: 'center center'
        }}
      >
        <defs>
          {/* Subtle ocean wave patterns */}
          <pattern id="ocean-waves" width="60" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M 0 10 Q 15 5 30 10 T 60 10"
              fill="none"
              stroke="rgba(56, 189, 248, 0.25)"
              strokeWidth="1.5"
            />
          </pattern>

          {/* Glow filter for selected state */}
          <filter id="state-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#F59E0B" floodOpacity="0.8" />
          </filter>
          <filter id="hover-glow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#38BDF8" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* Ocean Background with subtle ripples */}
        <rect
          id="map-ocean-bg"
          x="0"
          y="0"
          width="850"
          height="950"
          fill="url(#ocean-waves)"
          onClick={() => onSelectState(null)}
        />

        {/* =================================================== */}
        {/* CHILDREN'S MAP ILLUSTRATIONS & DECORATIONS          */}
        {/* =================================================== */}

        {/* Jumping Dolphin in Arabian Sea */}
        <g transform="translate(130, 680) scale(0.65)" className="pointer-events-none opacity-85">
          <path
            d="M 10 30 C 25 10 50 15 70 30 C 55 45 40 40 30 50 C 25 40 15 35 10 30 Z"
            fill="#38BDF8"
            stroke="#0284C7"
            strokeWidth="2"
          />
          <path d="M 45 18 C 55 5 60 10 55 22 Z" fill="#0284C7" />
          <circle cx="25" cy="28" r="2.5" fill="#0F172A" />
          {/* Water Splash */}
          <ellipse cx="40" cy="55" rx="20" ry="3" fill="#BAE6FD" />
          <text x="5" y="72" fontSize="11" fontWeight="700" fill="#0369A1" fontFamily="sans-serif">
            🐬 Playful Dolphin
          </text>
        </g>

        {/* Traditional Sailing Boat in Arabian Sea */}
        <g transform="translate(110, 520) scale(0.7)" className="pointer-events-none opacity-80">
          <polygon points="10,40 50,40 45,55 15,55" fill="#B45309" stroke="#78350F" strokeWidth="2" />
          <polygon points="30,8 30,38 48,38" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
          <polygon points="28,15 28,38 12,38" fill="#F97316" stroke="#C2410C" strokeWidth="1.5" />
          <path d="M 5 58 Q 30 54 55 58" fill="none" stroke="#38BDF8" strokeWidth="2" />
        </g>

        {/* Another Dolphin jumping in Bay of Bengal */}
        <g transform="translate(680, 590) scale(0.65)" className="pointer-events-none opacity-85">
          <path
            d="M 70 30 C 55 10 30 15 10 30 C 25 45 40 40 50 50 C 55 40 65 35 70 30 Z"
            fill="#38BDF8"
            stroke="#0284C7"
            strokeWidth="2"
          />
          <path d="M 35 18 C 25 5 20 10 25 22 Z" fill="#0284C7" />
          <circle cx="55" cy="28" r="2.5" fill="#0F172A" />
          <ellipse cx="40" cy="55" rx="20" ry="3" fill="#BAE6FD" />
        </g>

        {/* Lotus Flowers in Indian Ocean */}
        <g transform="translate(420, 890) scale(0.7)" className="pointer-events-none opacity-90">
          <path d="M 30 25 C 20 10 10 25 30 35 C 50 25 40 10 30 25 Z" fill="#F472B6" />
          <path d="M 30 22 C 25 5 15 18 30 32 C 45 18 35 5 30 22 Z" fill="#FB7185" />
          <circle cx="30" cy="27" r="4" fill="#FDE047" />
          <path d="M 10 35 Q 30 32 50 35" stroke="#10B981" strokeWidth="2" fill="none" />
        </g>

        {/* Vintage Compass Rose in Upper Bay of Bengal */}
        <g transform="translate(730, 210) scale(0.75)" className="pointer-events-none">
          <circle cx="40" cy="40" r="32" fill="rgba(255, 255, 255, 0.85)" stroke="#0284C7" strokeWidth="2" />
          <polygon points="40,12 45,35 40,32 35,35" fill="#DC2626" />
          <polygon points="40,68 45,45 40,48 35,45" fill="#0284C7" />
          <polygon points="12,40 35,35 32,40 35,45" fill="#0284C7" />
          <polygon points="68,40 45,35 48,40 45,45" fill="#0284C7" />
          <text x="40" y="8" textAnchor="middle" fontSize="12" fontWeight="800" fill="#DC2626">N</text>
          <text x="40" y="80" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369A1">S</text>
          <text x="78" y="44" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369A1">E</text>
          <text x="2" y="44" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369A1">W</text>
        </g>

        {/* =================================================== */}
        {/* SURROUNDING WATER BODIES TEXT                       */}
        {/* =================================================== */}
        {WATER_BODIES.map(wb => (
          <text
            key={wb.name}
            x={wb.x}
            y={wb.y}
            textAnchor="middle"
            fontSize="15"
            fontWeight="800"
            letterSpacing="2.5"
            fill="#0284C7"
            className="select-none opacity-70 dark:opacity-50"
            style={{
              textShadow: '0 1px 3px rgba(255,255,255,0.8)'
            }}
          >
            {wb.name}
          </text>
        ))}

        {/* Neighboring Sovereign Nations */}
        {NEIGHBOR_COUNTRIES.map(nc => (
          <g key={nc.name} className="pointer-events-none opacity-50 dark:opacity-40 select-none">
            <text
              x={nc.x}
              y={nc.y}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              letterSpacing="1.5"
              fill="#64748B"
            >
              {nc.name}
            </text>
          </g>
        ))}

        {/* =================================================== */}
        {/* ALL 36 INDIAN STATES & UNION TERRITORIES (SVGs)     */}
        {/* =================================================== */}
        <g id="states-layer">
          {INDIA_STATES.map(state => {
            const isSelected = selectedState?.id === state.id;
            const isHovered = hoveredStateId === state.id;
            const isZoneMatch = filterZone === 'All' || state.zone === filterZone;

            // Palette styling matching educational crayon/pastel reference
            let fillColor = state.color;
            let opacity = isZoneMatch ? 0.95 : 0.35;
            let strokeColor = '#334155';
            let strokeWidth = 1.2;

            if (isSelected) {
              fillColor = '#FBBF24'; // Golden amber highlight
              opacity = 1;
              strokeColor = '#B45309';
              strokeWidth = 2.8;
            } else if (isHovered) {
              opacity = 1;
              strokeColor = '#0284C7';
              strokeWidth = 2.2;
            }

            return (
              <path
                key={state.id}
                id={`state-${state.id}`}
                d={state.pathD}
                fill={fillColor}
                fillOpacity={opacity}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
                strokeLinecap="round"
                filter={isSelected ? 'url(#state-glow)' : isHovered ? 'url(#hover-glow)' : undefined}
                className="cursor-pointer transition-colors duration-150 focus:outline-none"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectState(state);
                }}
                onMouseEnter={() => onHoverState(state.id)}
                onMouseLeave={() => onHoverState(null)}
                tabIndex={0}
                role="button"
                aria-label={`${state.name}, Capital: ${state.capital}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onSelectState(state);
                  }
                }}
              />
            );
          })}
        </g>

        {/* =================================================== */}
        {/* RIVERS OVERLAY                                      */}
        {/* =================================================== */}
        {showRivers && (
          <g id="rivers-layer" className="pointer-events-none">
            {RIVER_FEATURES.map(river => (
              <g key={river.id}>
                <path
                  d={river.pathD}
                  fill="none"
                  stroke="#0284C7"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeOpacity="0.85"
                />
                <path
                  d={river.pathD}
                  fill="none"
                  stroke="#BAE6FD"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </g>
            ))}
          </g>
        )}

        {/* =================================================== */}
        {/* STATE LABELS & CAPITAL RED DOTS                    */}
        {/* =================================================== */}
        {showLabels && (
          <g id="labels-layer" className="pointer-events-none select-none">
            {INDIA_STATES.map(state => {
              // Hide labels for tiny island polygons in mainland view; they have dedicated insets
              if (state.id === 'lakshadweep' || state.id === 'andaman-nicobar') return null;

              const isSelected = selectedState?.id === state.id;
              const [cx, cy] = state.center;

              return (
                <g key={`lbl-${state.id}`}>
                  {/* Capital red dot */}
                  <circle
                    cx={cx}
                    cy={cy - 4}
                    r={isSelected ? 3.5 : 2.5}
                    fill="#DC2626"
                    stroke="#FFFFFF"
                    strokeWidth="1"
                  />
                  {/* State Name */}
                  <text
                    x={cx}
                    y={cy + 7}
                    textAnchor="middle"
                    fontSize={isSelected ? '10.5' : '9'}
                    fontWeight={isSelected ? '800' : '700'}
                    fill="#0F172A"
                    className="font-sans"
                    style={{
                      textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 -1px 2px rgba(255,255,255,0.9)'
                    }}
                  >
                    {state.name}
                  </text>
                  {/* Capital Name */}
                  <text
                    x={cx}
                    y={cy + 16}
                    textAnchor="middle"
                    fontSize="7.5"
                    fontWeight="600"
                    fill="#475569"
                    className="font-sans"
                    style={{
                      textShadow: '0 1px 2px rgba(255,255,255,0.9)'
                    }}
                  >
                    {state.capital}
                  </text>
                </g>
              );
            })}
          </g>
        )}

        {/* =================================================== */}
        {/* LANDMARK PINS & MINI ICONS                          */}
        {/* =================================================== */}
        {showLandmarks && (
          <g id="landmarks-layer">
            {LANDMARK_PINS.map(lm => {
              const [lx, ly] = lm.coord;
              const isStateSelected = selectedState?.id === lm.stateId;

              return (
                <g
                  key={lm.id}
                  transform={`translate(${lx}, ${ly})`}
                  className="cursor-pointer group"
                  onClick={(e) => {
                    e.stopPropagation();
                    const st = INDIA_STATES.find(s => s.id === lm.stateId);
                    if (st) onSelectState(st);
                  }}
                >
                  <circle
                    cx="0"
                    cy="0"
                    r={isStateSelected ? 12 : 9}
                    fill="#FFFFFF"
                    stroke="#F59E0B"
                    strokeWidth="2"
                    filter="url(#state-glow)"
                    className="transition-transform group-hover:scale-125"
                  />
                  <text
                    x="0"
                    y="3.5"
                    textAnchor="middle"
                    fontSize="9"
                    className="pointer-events-none"
                  >
                    {lm.iconType === 'temple' ? '🛕' :
                     lm.iconType === 'palace' ? '🏰' :
                     lm.iconType === 'memorial' ? '🏛️' :
                     lm.iconType === 'natural' ? '🌿' : '✨'}
                  </text>
                  {/* Tooltip on hover */}
                  <text
                    x="0"
                    y="-12"
                    textAnchor="middle"
                    fontSize="8.5"
                    fontWeight="700"
                    fill="#1E293B"
                    className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{ textShadow: '0 1px 2px white' }}
                  >
                    {lm.name}
                  </text>
                </g>
              );
            })}
          </g>
        )}

        {/* =================================================== */}
        {/* ENLARGED GEOGRAPHIC INSETS FOR ISLAND GROUPS        */}
        {/* (Survey of India standard educational presentation) */}
        {/* =================================================== */}

        {/* Andaman & Nicobar Inset (Bottom Right) */}
        <g
          transform="translate(680, 710)"
          className="cursor-pointer group"
          onClick={(e) => {
            e.stopPropagation();
            const an = INDIA_STATES.find(s => s.id === 'andaman-nicobar');
            if (an) onSelectState(an);
          }}
        >
          <rect
            x="0"
            y="0"
            width="155"
            height="170"
            rx="8"
            fill="rgba(255, 255, 255, 0.92)"
            stroke={selectedState?.id === 'andaman-nicobar' ? '#F59E0B' : '#38BDF8'}
            strokeWidth={selectedState?.id === 'andaman-nicobar' ? '2.5' : '1.5'}
            strokeDasharray="4 2"
            filter="drop-shadow(0 2px 5px rgba(0,0,0,0.1))"
          />
          <text x="77" y="18" textAnchor="middle" fontSize="9" fontWeight="800" fill="#0369A1">
            ANDAMAN & NICOBAR (UT)
          </text>
          <text x="77" y="30" textAnchor="middle" fontSize="7.5" fontWeight="600" fill="#DC2626">
            • Port Blair (Capital)
          </text>

          {/* Scaled Islands Path inside inset */}
          <g transform="translate(-620, -580) scale(0.95)">
            <path
              d={INDIA_STATES.find(s => s.id === 'andaman-nicobar')?.pathD || ''}
              fill="#A7F3D0"
              stroke="#059669"
              strokeWidth="1.5"
            />
          </g>

          {/* Tropical Palm Tree Deco */}
          <text x="130" y="150" fontSize="18">🌴</text>
          <text x="15" y="155" fontSize="7" fontWeight="600" fill="#64748B">
            *Enlarged Inset
          </text>
        </g>

        {/* Lakshadweep Inset (Bottom Left) */}
        <g
          transform="translate(25, 740)"
          className="cursor-pointer group"
          onClick={(e) => {
            e.stopPropagation();
            const lk = INDIA_STATES.find(s => s.id === 'lakshadweep');
            if (lk) onSelectState(lk);
          }}
        >
          <rect
            x="0"
            y="0"
            width="145"
            height="145"
            rx="8"
            fill="rgba(255, 255, 255, 0.92)"
            stroke={selectedState?.id === 'lakshadweep' ? '#F59E0B' : '#38BDF8'}
            strokeWidth={selectedState?.id === 'lakshadweep' ? '2.5' : '1.5'}
            strokeDasharray="4 2"
            filter="drop-shadow(0 2px 5px rgba(0,0,0,0.1))"
          />
          <text x="72" y="18" textAnchor="middle" fontSize="9" fontWeight="800" fill="#0369A1">
            LAKSHADWEEP (UT)
          </text>
          <text x="72" y="30" textAnchor="middle" fontSize="7.5" fontWeight="600" fill="#DC2626">
            • Kavaratti (Capital)
          </text>

          {/* Scaled Lakshadweep Island dots inside inset */}
          <g transform="translate(45, 45)">
            <circle cx="20" cy="15" r="4" fill="#6EE7B7" stroke="#047857" strokeWidth="1" />
            <circle cx="35" cy="25" r="3.5" fill="#6EE7B7" stroke="#047857" strokeWidth="1" />
            <circle cx="28" cy="45" r="5" fill="#6EE7B7" stroke="#047857" strokeWidth="1" />
            <circle cx="45" cy="55" r="4" fill="#6EE7B7" stroke="#047857" strokeWidth="1" />
            <circle cx="38" cy="70" r="3.5" fill="#6EE7B7" stroke="#047857" strokeWidth="1" />
          </g>

          <text x="115" y="130" fontSize="16">🪸</text>
          <text x="15" y="132" fontSize="7" fontWeight="600" fill="#64748B">
            *Enlarged Inset
          </text>
        </g>
      </svg>
    </div>
  );
};
