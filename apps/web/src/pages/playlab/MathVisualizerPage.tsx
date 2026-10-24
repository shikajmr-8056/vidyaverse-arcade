// =========================================================
// VIDYAVERSE PLAYLAB — MATH VISUALIZER (FORMULALENS)
// Complete replacement with FormulaLens Mathematical Studio
// Integrated with VidyaVerse UI, Theme Tokens & Workstation Layout
// =========================================================

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Sparkles,
  RefreshCw,
  Share2,
  Check,
  Layers,
  Compass,
  GitCompare,
  Box,
  Grid,
  Search,
  Sliders,
  ChevronDown,
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { FORMULA_PRESETS } from './math/presets';
import {
  FormulaPreset,
  ViewMode,
  ParameterConfig,
  CalculusState,
  ComparisonState,
  MatrixState,
  PresetCategory,
} from './math/types';
import { parseExpression, generate2DData, computeDerivative } from './math/mathParser';
import { readStateFromUrl, writeStateToUrl } from './math/urlState';

// FormulaLens Components
import { FormulaHero } from './math/components/FormulaHero';
import { ParameterSliders } from './math/components/ParameterSliders';
import { TermBreakdown } from './math/components/TermBreakdown';
import { CalculusPanel } from './math/components/CalculusPanel';
import { ComparisonPanel } from './math/components/ComparisonPanel';
import { Plot2D } from './math/components/Plot2D';
import { Surface3D } from './math/components/Surface3D';
import { MatrixTransformVisualizer } from './math/components/MatrixTransformVisualizer';

const CATEGORIES: PresetCategory[] = [
  'Algebra',
  'Trigonometry',
  'Calculus',
  'Statistics',
  'Linear Algebra',
  '3D Surfaces',
];

export const MathVisualizerPage: React.FC = () => {
  const navigate = useNavigate();
  const { addXP } = useAuthStore();

  // 1. Initial State from URL or fallback
  const initialUrlState = useMemo(() => readStateFromUrl(), []);
  const initialPreset = useMemo(() => {
    if (initialUrlState?.presetId) {
      const found = FORMULA_PRESETS.find((p) => p.id === initialUrlState.presetId);
      if (found) return found;
    }
    return FORMULA_PRESETS[0]; // General Sine Wave
  }, [initialUrlState]);

  const [currentPreset, setCurrentPreset] = useState<FormulaPreset | null>(initialPreset);
  const [expression, setExpression] = useState<string>(
    initialUrlState?.expression || initialPreset.expression
  );
  const [viewMode, setViewMode] = useState<ViewMode>(
    initialUrlState?.mode || initialPreset.mode || '2d'
  );

  // Parameters configuration
  const [parameters, setParameters] = useState<Record<string, ParameterConfig>>(() => {
    const baseParams: Record<string, ParameterConfig> = { ...initialPreset.parameters };
    if (initialUrlState?.parameters) {
      for (const [k, val] of Object.entries(initialUrlState.parameters as Record<string, number>)) {
        const numVal = typeof val === 'number' ? val : Number(val);
        if (baseParams[k]) {
          baseParams[k] = { ...baseParams[k], value: numVal };
        } else {
          baseParams[k] = { value: numVal, min: -5, max: 5, step: 0.1 };
        }
      }
    }
    return baseParams;
  });

  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [formulaAnimationKey, setFormulaAnimationKey] = useState<string>(initialPreset.id || 'initial');

  // Calculus overlay state
  const [calculusState, setCalculusState] = useState<CalculusState>({
    enabled: initialUrlState?.mode === 'calculus' || initialPreset.mode === 'calculus',
    x0: initialUrlState?.x0 !== undefined ? initialUrlState.x0 : 1.0,
    showTangent: true,
    showSecant: false,
    secantDx: 0.5,
  });

  // Comparison overlay state
  const [comparisonState, setComparisonState] = useState<ComparisonState>({
    enabled: initialUrlState?.mode === 'comparison' || initialPreset.mode === 'comparison',
    expression:
      initialUrlState?.comparisonExpression ||
      initialPreset.comparisonPreset?.expression ||
      'x - (x^3)/6 + (x^5)/120',
    latex: initialPreset.comparisonPreset?.latex || 'T(x)',
    label: initialPreset.comparisonPreset?.label || 'Taylor Approximation',
  });

  // 2x2 Matrix state
  const [matrixState, setMatrixState] = useState<MatrixState>(
    initialUrlState?.matrix || initialPreset.matrixDefaults || { a: 1.0, b: 0.5, c: 0.0, d: 1.0 }
  );

  const [shareCopied, setShareCopied] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Award exploration XP once on mount
  useEffect(() => {
    addXP(15);
  }, [addXP]);

  // Independent variables depending on view mode
  const independentVars = useMemo(() => {
    return viewMode === '3d' ? ['x', 'y'] : ['x'];
  }, [viewMode]);

  // Parse expression AST
  const parseResult = useMemo(() => {
    return parseExpression(expression, independentVars);
  }, [expression, independentVars]);

  // Sync free variables with parameter controls
  useEffect(() => {
    if (!parseResult.valid) return;
    const detectedVars = parseResult.freeVariables;

    setParameters((prev) => {
      const next: Record<string, ParameterConfig> = {};
      for (const v of detectedVars) {
        if (prev[v]) {
          next[v] = prev[v];
        } else if (currentPreset?.parameters[v]) {
          next[v] = { ...currentPreset.parameters[v] };
        } else {
          next[v] = {
            value: 1.0,
            min: -5,
            max: 5,
            step: 0.1,
            description: `Parameter ${v}`,
          };
        }
      }
      return next;
    });
  }, [parseResult, currentPreset]);

  // Numeric scope for evaluation
  const paramNumbers = useMemo(() => {
    const scope: Record<string, number> = {};
    for (const [k, cfg] of Object.entries(parameters)) {
      scope[k] = (cfg as ParameterConfig).value;
    }
    return scope;
  }, [parameters]);

  const xRangeDefault = currentPreset?.defaultXRange || [-6.5, 6.5];
  const yRangeDefault = currentPreset?.defaultYRange || [-5, 5];

  // Primary 2D dataset
  const primaryPlotData = useMemo(() => {
    if (!parseResult.compiled || !parseResult.valid) {
      return { x: [], y: [] };
    }
    return generate2DData(
      parseResult.compiled,
      paramNumbers,
      xRangeDefault[0] - 2,
      xRangeDefault[1] + 2,
      450
    );
  }, [parseResult, paramNumbers, xRangeDefault]);

  // Secondary comparison dataset
  const comparisonParseResult = useMemo(() => {
    if (viewMode !== 'comparison' || !comparisonState.expression) return null;
    return parseExpression(comparisonState.expression, ['x']);
  }, [viewMode, comparisonState.expression]);

  const secondaryPlotData = useMemo(() => {
    if (viewMode !== 'comparison' || !comparisonParseResult?.compiled || !comparisonParseResult.valid) {
      return null;
    }
    return generate2DData(
      comparisonParseResult.compiled,
      paramNumbers,
      xRangeDefault[0] - 2,
      xRangeDefault[1] + 2,
      450
    );
  }, [viewMode, comparisonParseResult, paramNumbers, xRangeDefault]);

  // Residual metrics for comparison mode
  const { maxResidual, rmsError } = useMemo(() => {
    if (!secondaryPlotData || primaryPlotData.y.length === 0) {
      return { maxResidual: null, rmsError: null };
    }
    let maxDiff = 0;
    let sumSq = 0;
    let count = 0;

    for (let i = 0; i < Math.min(primaryPlotData.y.length, secondaryPlotData.y.length); i++) {
      const y1 = primaryPlotData.y[i];
      const y2 = secondaryPlotData.y[i];
      if (y1 !== null && y2 !== null && Number.isFinite(y1) && Number.isFinite(y2)) {
        const diff = Math.abs(y1 - y2);
        if (diff > maxDiff) maxDiff = diff;
        sumSq += diff * diff;
        count++;
      }
    }

    if (count === 0) return { maxResidual: null, rmsError: null };
    return {
      maxResidual: maxDiff,
      rmsError: Math.sqrt(sumSq / count),
    };
  }, [primaryPlotData, secondaryPlotData]);

  // Calculus tangent evaluation
  const { slope: tangentSlope, y0: tangentY0 } = useMemo(() => {
    if (!parseResult.compiled || !parseResult.valid || viewMode !== 'calculus') {
      return { slope: null, y0: null };
    }
    return computeDerivative(parseResult.compiled, calculusState.x0, paramNumbers);
  }, [parseResult, calculusState.x0, paramNumbers, viewMode]);

  // Keep URL updated with state
  useEffect(() => {
    writeStateToUrl(
      expression,
      parameters,
      viewMode,
      currentPreset?.id,
      viewMode === 'calculus' ? calculusState.x0 : undefined,
      viewMode === 'comparison' ? comparisonState.expression : undefined,
      viewMode === 'matrix' ? matrixState : undefined
    );
  }, [
    expression,
    parameters,
    viewMode,
    currentPreset,
    calculusState.x0,
    comparisonState.expression,
    matrixState,
  ]);

  // Preset Selection Handler
  const handleSelectPreset = (preset: FormulaPreset) => {
    setCurrentPreset(preset);
    setExpression(preset.expression);
    setViewMode(preset.mode);
    setParameters({ ...preset.parameters });
    setSelectedTerm(null);
    setFormulaAnimationKey(`${preset.id}-${Date.now()}`);

    if (preset.mode === 'calculus') {
      setCalculusState((prev) => ({ ...prev, enabled: true, x0: 1.0 }));
    }
    if (preset.comparisonPreset) {
      setComparisonState({
        enabled: true,
        expression: preset.comparisonPreset.expression,
        latex: preset.comparisonPreset.latex,
        label: preset.comparisonPreset.label,
      });
    }
    if (preset.matrixDefaults) {
      setMatrixState(preset.matrixDefaults);
    }
  };

  const handleResetParameters = () => {
    if (currentPreset) {
      setParameters({ ...currentPreset.parameters });
      if (currentPreset.matrixDefaults) {
        setMatrixState(currentPreset.matrixDefaults);
      }
    }
  };

  const handleChangeParameter = useCallback((name: string, value: number) => {
    setParameters((prev) => {
      if (!prev[name]) return prev;
      return {
        ...prev,
        [name]: { ...prev[name], value },
      };
    });
  }, []);

  const handleShare = () => {
    const shareUrl = writeStateToUrl(
      expression,
      parameters,
      viewMode,
      currentPreset?.id,
      viewMode === 'calculus' ? calculusState.x0 : undefined,
      viewMode === 'comparison' ? comparisonState.expression : undefined,
      viewMode === 'matrix' ? matrixState : undefined
    );

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setShareCopied(true);
        setTimeout(() => setShareCopied(false), 2200);
      });
    }
  };

  const filteredPresets = FORMULA_PRESETS.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.expression.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="h-full max-h-full flex flex-col bg-canvas text-text-primary overflow-hidden font-sans select-none">
      {/* 1. TOP HEADER (VidyaVerse Standard Layout & Formula Lens Controls) */}
      <header className="h-14 shrink-0 px-3 sm:px-6 bg-card/90 backdrop-blur-md border-b border-border flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/playlab')}
            className="p-1.5 sm:p-2 rounded-xl bg-card hover:bg-canvas text-text-muted hover:text-text-primary transition-colors flex items-center gap-1.5 text-xs font-semibold border border-border cursor-pointer"
            title="Return to PlayLab"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">PlayLab</span>
          </button>

          <div className="flex items-center gap-2">
            <h1 className="text-sm sm:text-base font-bold font-display text-text-primary flex items-center gap-1.5">
              <span>Math Visualizer</span>
              <span className="text-xs text-text-muted font-normal font-sans hidden md:inline">
                (FormulaLens Studio)
              </span>
            </h1>
            <span className="badge-playlab text-[10px] hidden sm:inline">
              NCERT Classes 6–12
            </span>
          </div>

          {/* Preset Selector Dropdown */}
          <div className="relative ml-1 sm:ml-2">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 rounded-xl border border-border bg-card px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-text-primary hover:bg-canvas transition-colors cursor-pointer shadow-xs"
            >
              <span className="text-text-muted font-normal hidden sm:inline">Formula:</span>
              <span className="truncate max-w-[140px] sm:max-w-[180px]">
                {currentPreset ? currentPreset.name : 'Custom Formula'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-text-muted" />
            </button>

            {dropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setDropdownOpen(false)}
                />
                <div className="absolute left-0 mt-1.5 w-72 sm:w-80 rounded-2xl border border-border bg-card p-2.5 shadow-xl z-50 max-h-[460px] overflow-y-auto">
                  <div className="mb-2 px-1 relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-text-muted" />
                    <input
                      type="text"
                      placeholder="Search formulas or concepts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded-xl border border-border bg-canvas pl-8 pr-2.5 py-1.5 text-xs text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-hidden"
                      autoFocus
                    />
                  </div>

                  {CATEGORIES.map((cat) => {
                    const presetsInCat = filteredPresets.filter((p) => p.category === cat);
                    if (presetsInCat.length === 0) return null;
                    return (
                      <div key={cat} className="mb-2">
                        <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-text-muted border-b border-border/70">
                          {cat}
                        </div>
                        <div className="mt-1 space-y-0.5">
                          {presetsInCat.map((preset) => (
                            <button
                              key={preset.id}
                              type="button"
                              onClick={() => {
                                handleSelectPreset(preset);
                                setDropdownOpen(false);
                                setSearchQuery('');
                              }}
                              className={`w-full text-left px-2 py-1.5 text-xs rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                                currentPreset?.id === preset.id
                                  ? 'bg-primary/10 text-primary font-bold'
                                  : 'text-text-primary hover:bg-canvas'
                              }`}
                            >
                              <span className="truncate">{preset.name}</span>
                              <span className="text-[10px] text-text-muted font-mono ml-2 shrink-0">
                                {preset.expression.length > 15
                                  ? preset.expression.slice(0, 15) + '…'
                                  : preset.expression}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}

                  {filteredPresets.length === 0 && (
                    <div className="px-3 py-4 text-center text-xs text-text-muted">
                      No matching formulas found.
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right: View Mode Tabs & Share Button */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* View Mode Pills */}
          <div className="flex items-center rounded-xl border border-border bg-canvas p-0.5 text-xs font-semibold text-text-muted">
            <button
              type="button"
              onClick={() => setViewMode('2d')}
              className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                viewMode === '2d'
                  ? 'bg-card text-text-primary shadow-xs font-bold'
                  : 'hover:text-text-primary'
              }`}
              title="2D Coordinate Plotter"
            >
              <Layers className="w-3.5 h-3.5 text-emerald-500" />
              <span className="hidden md:inline">2D Plot</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setViewMode('calculus');
                setCalculusState((prev) => ({ ...prev, enabled: true }));
              }}
              className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                viewMode === 'calculus'
                  ? 'bg-card text-text-primary shadow-xs font-bold'
                  : 'hover:text-text-primary'
              }`}
              title="Calculus Tangent & Derivative Analysis"
            >
              <Compass className="w-3.5 h-3.5 text-cyan-500" />
              <span className="hidden md:inline">Calculus</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('comparison')}
              className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                viewMode === 'comparison'
                  ? 'bg-card text-text-primary shadow-xs font-bold'
                  : 'hover:text-text-primary'
              }`}
              title="Dual Function Comparison & Residual Error"
            >
              <GitCompare className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden md:inline">Compare</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('3d')}
              className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                viewMode === '3d'
                  ? 'bg-card text-text-primary shadow-xs font-bold'
                  : 'hover:text-text-primary'
              }`}
              title="Interactive 3D WebGL Parametric Surface"
            >
              <Box className="w-3.5 h-3.5 text-purple-500" />
              <span className="hidden md:inline">3D Surface</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('matrix')}
              className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                viewMode === 'matrix'
                  ? 'bg-card text-text-primary shadow-xs font-bold'
                  : 'hover:text-text-primary'
              }`}
              title="2x2 Matrix Linear Transformation & Warping"
            >
              <Grid className="w-3.5 h-3.5 text-rose-500" />
              <span className="hidden md:inline">Matrix</span>
            </button>
          </div>

          {/* Reset Parameters Button */}
          <button
            type="button"
            onClick={handleResetParameters}
            title="Reset parameters to defaults"
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border border-border bg-card hover:bg-canvas text-xs text-text-muted hover:text-text-primary transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden lg:inline text-[11px] font-semibold">Reset</span>
          </button>

          {/* Share Button */}
          <button
            type="button"
            onClick={handleShare}
            title="Share URL with current formula and parameters"
            className="px-2.5 sm:px-3 py-1.5 rounded-xl border border-border bg-card hover:bg-canvas text-xs font-bold text-text-primary transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            {shareCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-primary" />
                <span className="hidden sm:inline">Share</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* 2. MAIN WORKBENCH LAYOUT (Left Column ~35%, Right Plotting Canvas ~65%) */}
      <main className="flex-1 min-h-0 overflow-hidden flex flex-col p-2 sm:p-3 xl:p-4 max-w-[1800px] w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 xl:gap-4 items-start h-full min-h-0 overflow-hidden">
          
          {/* Left Column (~35%): Formula Hero, Sliders, Calculus/Comparison panels, Term Breakdown */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-2.5 h-full min-h-0 overflow-y-auto pr-1">
            {/* KaTeX Chalkboard Hero Formula with Inline Equation Editor */}
            <FormulaHero
              expression={expression}
              latex={
                currentPreset && currentPreset.expression === expression
                  ? currentPreset.latex
                  : parseResult.latex
              }
              error={parseResult.error}
              onChangeExpression={(newExpr) => {
                setExpression(newExpr);
                if (currentPreset && newExpr !== currentPreset.expression) {
                  setCurrentPreset(null);
                }
              }}
              presetName={currentPreset?.name}
              selectedTerm={selectedTerm}
              onSelectTerm={setSelectedTerm}
            />

            {/* Calculus Tangent & Derivative Controls */}
            {viewMode === 'calculus' && (
              <CalculusPanel
                calculusState={calculusState}
                onChangeCalculusState={setCalculusState}
                xRange={xRangeDefault}
                currentY0={tangentY0}
                currentSlope={tangentSlope}
              />
            )}

            {/* Comparison Overlay Controls & RMSE Residual Analysis */}
            {viewMode === 'comparison' && (
              <ComparisonPanel
                comparisonState={comparisonState}
                onChangeComparisonState={setComparisonState}
                primaryExpression={expression}
                maxResidual={maxResidual}
                rmsError={rmsError}
              />
            )}

            {/* Reactive Parameter Sliders (Auto-detected from AST) */}
            <ParameterSliders
              parameters={parameters}
              onChangeParameter={handleChangeParameter}
              selectedTerm={selectedTerm}
            />

            {/* Click-to-explain Term Breakdown */}
            {currentPreset?.termBreakdowns && (
              <TermBreakdown
                terms={currentPreset.termBreakdowns}
                selectedTerm={selectedTerm}
                onSelectTerm={setSelectedTerm}
              />
            )}
          </div>

          {/* Right Column (~65%): Dominant Interactive Plotting Canvas (SVG 2D, Three.js 3D, or Matrix Warper) */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col h-full min-h-[440px] rounded-2xl border border-border bg-card overflow-hidden shadow-xs relative">
            {viewMode === '3d' ? (
              <Surface3D
                compiledFormula={parseResult.compiled}
                parameters={parameters}
                expression={expression}
              />
            ) : viewMode === 'matrix' ? (
              <MatrixTransformVisualizer
                matrix={matrixState}
                onChangeMatrix={setMatrixState}
              />
            ) : (
              <Plot2D
                primaryData={primaryPlotData}
                secondaryData={viewMode === 'comparison' ? secondaryPlotData : null}
                calculusState={viewMode === 'calculus' ? calculusState : undefined}
                onUpdateX0={(newX0) => setCalculusState((prev) => ({ ...prev, x0: newX0 }))}
                tangentSlope={tangentSlope}
                tangentY0={tangentY0}
                xRangeDefault={xRangeDefault}
                yRangeDefault={yRangeDefault}
                formulaKey={formulaAnimationKey}
              />
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default MathVisualizerPage;
