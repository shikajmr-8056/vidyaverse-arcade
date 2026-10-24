// =========================================================
// BHARAT EXPLORER — MAP CONTROLS & FLOATING TOOLBAR
// Zoom, Layer Toggles, Zone Filters & Audio Speech Controls
// =========================================================

import React from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Volume2,
  VolumeX,
  List,
  Layers,
  MapPin,
  Waves,
  Tag
} from 'lucide-react';
import { Zone } from '../types';

interface MapControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
  filterZone: Zone | 'All';
  onFilterZone: (zone: Zone | 'All') => void;
  showLandmarks: boolean;
  onToggleLandmarks: () => void;
  showRivers: boolean;
  onToggleRivers: () => void;
  showLabels: boolean;
  onToggleLabels: () => void;
  isVoiceMuted: boolean;
  onToggleVoice: () => void;
  onOpenStateList: () => void;
}

const ZONES: (Zone | 'All')[] = ['All', 'North', 'West', 'South', 'Central', 'East', 'Northeast', 'Islands'];

export const MapControls: React.FC<MapControlsProps> = ({
  zoom,
  onZoomIn,
  onZoomOut,
  onResetView,
  filterZone,
  onFilterZone,
  showLandmarks,
  onToggleLandmarks,
  showRivers,
  onToggleRivers,
  showLabels,
  onToggleLabels,
  isVoiceMuted,
  onToggleVoice,
  onOpenStateList
}) => {
  return (
    <>
      {/* Top Floating Zone Filter Bar */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl shadow-xl border border-sky-200 dark:border-slate-800 max-w-[85vw] overflow-x-auto no-scrollbar">
        <button
          onClick={onOpenStateList}
          className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-sm shrink-0"
          title="Open Searchable States Directory"
        >
          <List className="w-3.5 h-3.5" />
          <span>All States (36)</span>
        </button>

        <div className="h-5 w-px bg-slate-300 dark:bg-slate-700 mx-1 shrink-0" />

        {ZONES.map(z => (
          <button
            key={z}
            onClick={() => onFilterZone(z)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors shrink-0 ${
              filterZone === z
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-sky-100 dark:hover:bg-slate-800'
            }`}
          >
            {z}
          </button>
        ))}
      </div>

      {/* Floating Bottom-Left Zoom & Reset Stack */}
      <div className="absolute bottom-6 left-4 z-20 flex flex-col gap-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl shadow-xl border border-sky-200 dark:border-slate-800">
        <button
          onClick={onZoomIn}
          disabled={zoom >= 2.5}
          className="p-2 rounded-xl hover:bg-sky-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors disabled:opacity-40"
          title="Zoom In"
          aria-label="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={onZoomOut}
          disabled={zoom <= 0.8}
          className="p-2 rounded-xl hover:bg-sky-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors disabled:opacity-40"
          title="Zoom Out"
          aria-label="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={onResetView}
          className="p-2 rounded-xl hover:bg-sky-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
          title="Reset Map View"
          aria-label="Reset Map View"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Floating Bottom-Right Layer Toggles & Voice Mute */}
      <div className="absolute bottom-6 right-4 z-20 flex items-center gap-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl shadow-xl border border-sky-200 dark:border-slate-800">
        <button
          onClick={onToggleLandmarks}
          className={`p-2 rounded-xl transition-colors flex items-center gap-1 text-xs font-semibold ${
            showLandmarks
              ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
              : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          title="Toggle Monuments & Landmarks"
        >
          <MapPin className="w-4 h-4" />
          <span className="hidden sm:inline">Monuments</span>
        </button>

        <button
          onClick={onToggleRivers}
          className={`p-2 rounded-xl transition-colors flex items-center gap-1 text-xs font-semibold ${
            showRivers
              ? 'bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
              : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          title="Toggle Rivers"
        >
          <Waves className="w-4 h-4" />
          <span className="hidden sm:inline">Rivers</span>
        </button>

        <button
          onClick={onToggleLabels}
          className={`p-2 rounded-xl transition-colors flex items-center gap-1 text-xs font-semibold ${
            showLabels
              ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
              : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          title="Toggle State & Capital Labels"
        >
          <Tag className="w-4 h-4" />
          <span className="hidden sm:inline">Labels</span>
        </button>

        <div className="h-5 w-px bg-slate-300 dark:bg-slate-700 mx-1" />

        <button
          onClick={onToggleVoice}
          className={`p-2 rounded-xl transition-colors ${
            isVoiceMuted
              ? 'bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400'
              : 'hover:bg-sky-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
          }`}
          title={isVoiceMuted ? 'Unmute Audio Speech' : 'Mute Audio Speech'}
          aria-label="Toggle Voice Audio"
        >
          {isVoiceMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </>
  );
};
