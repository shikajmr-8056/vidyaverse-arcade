import React from 'react';
import { ParameterConfig } from '../types';
import { Minus, Plus } from 'lucide-react';

interface ParameterSlidersProps {
  parameters: Record<string, ParameterConfig>;
  onChangeParameter: (name: string, value: number) => void;
  selectedTerm?: string | null;
}

export const ParameterSliders: React.FC<ParameterSlidersProps> = ({
  parameters,
  onChangeParameter,
  selectedTerm,
}) => {
  const paramKeys = Object.keys(parameters);

  // If there are no free variables, the sliders section doesn't render (per spec)
  if (paramKeys.length === 0) {
    return null;
  }

  return (
    <section className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
          Parameters ({paramKeys.length})
        </h3>
        <span className="text-[11px] text-text-muted">
          Drag or use arrow keys
        </span>
      </div>

      <div className="space-y-2.5">
        {paramKeys.map((key) => {
          const config = parameters[key];
          const isHighlighted = selectedTerm === key;

          const handleStep = (direction: 1 | -1) => {
            const step = config.step || 0.1;
            const newVal = Number((config.value + direction * step).toFixed(3));
            const clamped = Math.max(config.min, Math.min(config.max, newVal));
            onChangeParameter(key, clamped);
          };

          return (
            <div
              key={key}
              className={`rounded-xl border p-2.5 bg-card transition-all ${
                isHighlighted
                  ? 'border-primary ring-2 ring-primary/20 bg-primary/5'
                  : 'border-border hover:border-border/80'
              }`}
            >
              {/* Header: Variable name, live value, direct numeric input */}
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  {/* True mathematical symbol */}
                  <span className="font-display italic text-base font-bold text-text-primary w-5 text-center">
                    {key}
                  </span>
                  {config.description && (
                    <span className="text-[11px] text-text-muted truncate max-w-[160px] sm:max-w-[200px]">
                      {config.description}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleStep(-1)}
                    className="p-1 text-text-muted hover:text-text-primary hover:bg-canvas rounded-lg border border-border transition-colors cursor-pointer"
                    aria-label={`Decrease ${key}`}
                  >
                    <Minus className="w-3 h-3" />
                  </button>

                  <input
                    type="number"
                    value={Number(config.value.toFixed(3))}
                    step={config.step || 0.1}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      if (!Number.isNaN(val)) {
                        onChangeParameter(key, val);
                      }
                    }}
                    className="w-16 rounded-lg border border-border bg-canvas px-1.5 py-0.5 text-right font-mono text-xs font-semibold text-text-primary focus:border-primary focus:bg-card focus:outline-hidden"
                    aria-label={`Value for parameter ${key}`}
                  />

                  <button
                    type="button"
                    onClick={() => handleStep(1)}
                    className="p-1 text-text-muted hover:text-text-primary hover:bg-canvas rounded-lg border border-border transition-colors cursor-pointer"
                    aria-label={`Increase ${key}`}
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Slider track with instant responsiveness */}
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-[10px] font-mono text-text-muted w-7 text-right">
                  {config.min}
                </span>
                <input
                  type="range"
                  min={config.min}
                  max={config.max}
                  step={config.step || 0.05}
                  value={config.value}
                  onChange={(e) => onChangeParameter(key, parseFloat(e.target.value))}
                  className="flex-1 cursor-ew-resize accent-primary"
                  aria-label={`Slider for ${key}`}
                />
                <span className="text-[10px] font-mono text-text-muted w-7 text-left">
                  {config.max}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
