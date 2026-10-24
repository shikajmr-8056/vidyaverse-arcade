import React, { useMemo, useState } from 'react';
import katex from 'katex';
import { AlertCircle, Edit3, Check, Sparkles } from 'lucide-react';

interface FormulaHeroProps {
  expression: string;
  latex: string;
  error: string | null;
  onChangeExpression: (newExpr: string) => void;
  presetName?: string;
  selectedTerm?: string | null;
  onSelectTerm?: (term: string | null) => void;
}

export const FormulaHero: React.FC<FormulaHeroProps> = ({
  expression,
  latex,
  error,
  onChangeExpression,
  presetName,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempExpr, setTempExpr] = useState(expression);

  // Sync tempExpr if external expression changes and not actively editing
  React.useEffect(() => {
    if (!isEditing) {
      setTempExpr(expression);
    }
  }, [expression, isEditing]);

  const renderedLatex = useMemo(() => {
    try {
      const latexToRender = latex || expression;
      return katex.renderToString(latexToRender, {
        displayMode: true,
        throwOnError: false,
      });
    } catch {
      return `<span class="text-sm text-[#575E66]">${expression}</span>`;
    }
  }, [latex, expression]);

  const handleApply = () => {
    onChangeExpression(tempExpr);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleApply();
    } else if (e.key === 'Escape') {
      setTempExpr(expression);
      setIsEditing(false);
    }
  };

  const insertSymbol = (sym: string) => {
    setTempExpr((prev) => prev + sym);
  };

  return (
    <section className="mb-4">
      {/* Small contextual header */}
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs font-semibold text-text-muted uppercase tracking-wider">
          {presetName ? presetName : 'Active Expression'}
        </div>
        <button
          type="button"
          onClick={() => {
            if (isEditing) {
              handleApply();
            } else {
              setTempExpr(expression);
              setIsEditing(true);
            }
          }}
          className="flex items-center gap-1 text-xs text-primary hover:text-text-primary font-semibold transition-colors cursor-pointer"
        >
          {isEditing ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Done</span>
            </>
          ) : (
            <>
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit formula</span>
            </>
          )}
        </button>
      </div>

      {/* Oversized Chalkboard Formula Display (Hero) */}
      <div className="rounded-2xl border border-border bg-card p-3.5 sm:p-4 shadow-xs transition-all relative overflow-hidden">
        <div
          className="font-display text-xl sm:text-2xl md:text-[2rem] text-text-primary leading-tight select-text py-1 overflow-x-auto scrollbar-thin"
          dangerouslySetInnerHTML={{ __html: renderedLatex }}
        />

        {/* Inline Formula Input Bar (expanded when editing or by default available) */}
        {isEditing && (
          <div className="mt-3 pt-3 border-t border-border">
            <label htmlFor="formula-raw-input" className="block text-xs font-medium text-text-muted mb-1.5">
              Type mathematical expression (variables parsed automatically):
            </label>
            <div className="flex items-center gap-2">
              <input
                id="formula-raw-input"
                type="text"
                value={tempExpr}
                onChange={(e) => {
                  setTempExpr(e.target.value);
                  onChangeExpression(e.target.value);
                }}
                onKeyDown={handleKeyDown}
                placeholder="e.g. a * sin(b * x + c) + d or x^3 - 2*x"
                className="w-full rounded-xl border border-border bg-canvas px-3 py-1.5 text-xs sm:text-sm font-mono text-text-primary focus:border-primary focus:bg-card focus:outline-hidden"
                autoFocus
              />
              <button
                type="button"
                onClick={handleApply}
                className="rounded-xl btn-primary px-3 py-1.5 text-xs font-semibold shrink-0 cursor-pointer"
              >
                Apply
              </button>
            </div>

            {/* Quick Math Symbols Palette */}
            <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
              <span className="text-[11px] text-text-muted mr-1">Insert:</span>
              {[
                { label: 'x²', val: '^2' },
                { label: '√x', val: 'sqrt(' },
                { label: 'sin', val: 'sin(' },
                { label: 'cos', val: 'cos(' },
                { label: 'tan', val: 'tan(' },
                { label: 'eˣ', val: 'exp(' },
                { label: 'ln', val: 'log(' },
                { label: 'π', val: 'pi' },
                { label: '·', val: '*' },
                { label: '/', val: '/' },
              ].map((sym) => (
                <button
                  key={sym.label}
                  type="button"
                  onClick={() => insertSymbol(sym.val)}
                  className="rounded-lg border border-border bg-canvas px-2 py-0.5 text-xs font-mono text-text-primary hover:bg-card transition-colors cursor-pointer"
                >
                  {sym.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Clear Inline Error State */}
        {error && (
          <div
            id="formula-parse-error"
            className="mt-3 flex items-start gap-2 rounded-xl border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs text-amber-600 dark:text-amber-400"
          >
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div className="leading-snug">
              <span className="font-semibold">Formula parsing note: </span>
              {error}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
