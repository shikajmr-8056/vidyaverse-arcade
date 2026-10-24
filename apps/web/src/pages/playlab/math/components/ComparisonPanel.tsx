import React, { useMemo } from 'react';
import { ComparisonState } from '../types';
import katex from 'katex';
import { GitCompare } from 'lucide-react';

interface ComparisonPanelProps {
  comparisonState: ComparisonState;
  onChangeComparisonState: (updater: (prev: ComparisonState) => ComparisonState) => void;
  primaryExpression: string;
  maxResidual: number | null;
  rmsError: number | null;
}

export const ComparisonPanel: React.FC<ComparisonPanelProps> = ({
  comparisonState,
  onChangeComparisonState,
  maxResidual,
  rmsError,
}) => {
  const { expression, label } = comparisonState;

  const renderedLatex = useMemo(() => {
    try {
      return katex.renderToString(`g(x) = ${expression}`, {
        displayMode: false,
        throwOnError: false,
      });
    } catch {
      return `g(x) = ${expression}`;
    }
  }, [expression]);

  return (
    <section className="mb-4 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-3.5">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
          <GitCompare className="w-3.5 h-3.5 text-amber-500" />
          <span>Function Comparison</span>
        </h3>
        <span className="text-[11px] text-text-muted">{label || 'Secondary curve'}</span>
      </div>

      <div className="mb-3">
        <label htmlFor="comp-input" className="block text-xs font-semibold text-text-primary mb-1">
          Secondary Formula <span className="font-serif italic text-amber-500">g(x)</span>:
        </label>
        <input
          id="comp-input"
          type="text"
          value={expression}
          onChange={(e) =>
            onChangeComparisonState((prev) => ({
              ...prev,
              expression: e.target.value,
            }))
          }
          placeholder="e.g. x - x^3/6 + x^5/120"
          className="w-full rounded-xl border border-border bg-canvas px-2.5 py-1.5 font-mono text-xs text-text-primary focus:border-amber-500 focus:bg-card focus:outline-hidden"
        />
      </div>

      {/* Rendered formula */}
      <div className="rounded-xl border border-border bg-card p-2 mb-3 text-center overflow-x-auto shadow-2xs">
        <div
          className="text-xs font-serif text-text-primary"
          dangerouslySetInnerHTML={{ __html: renderedLatex }}
        />
      </div>

      {/* Legend & Error Metrics */}
      <div className="space-y-1.5 text-xs">
        <div className="flex items-center justify-between p-2 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-1 bg-emerald-500 rounded-full"></span>
            <span className="font-semibold text-text-primary">Primary f(x)</span>
          </div>
          <span className="text-[11px] text-text-muted">Base Function</span>
        </div>

        <div className="flex items-center justify-between p-2 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-1 bg-amber-500 rounded-full"></span>
            <span className="font-semibold text-text-primary">Secondary g(x)</span>
          </div>
          <span className="text-[11px] text-text-muted">Approximation</span>
        </div>

        {/* Residual / Convergence readouts */}
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="rounded-xl border border-border bg-card p-2 text-center shadow-2xs">
            <div className="text-[10px] text-text-muted">Max Residual |f - g|</div>
            <div className="font-mono text-xs font-bold text-text-primary">
              {maxResidual !== null ? maxResidual.toFixed(4) : 'N/A'}
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-2 text-center shadow-2xs">
            <div className="text-[10px] text-text-muted">RMS Error</div>
            <div className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
              {rmsError !== null ? rmsError.toFixed(4) : 'N/A'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
