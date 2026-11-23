import { useEffect, useState } from "react";
import { Minus, Plus, X, RotateCcw } from "lucide-react";
import { formatLitres } from "../lib/storage";

type Props = {
  open: boolean;
  goal: number;
  onClose: () => void;
  onSaveGoal: (goal: number) => void;
  onReset: () => void;
};

const PRESETS = [1500, 2000, 2500, 3000];
const MIN = 1000;
const MAX = 4500;
const STEP = 250;

export default function SettingsSheet({ open, goal, onClose, onSaveGoal, onReset }: Props) {
  const [draft, setDraft] = useState(goal);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (open) {
      setDraft(goal);
      setConfirming(false);
    }
  }, [open, goal]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const clamp = (v: number) => Math.min(MAX, Math.max(MIN, v));

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      <button type="button" aria-label="Close settings" onClick={onClose} className="absolute inset-0 bg-ink/40" />
      <div role="dialog" aria-modal="true" aria-labelledby="settings-title" className="relative w-full max-w-md rounded-t-3xl bg-surface p-6 shadow-2xl sm:rounded-3xl sm:p-8">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-line sm:hidden" />
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="settings-title" className="font-display text-3xl font-medium tracking-tight text-ink">Daily goal</h2>
            <p className="mt-1 text-sm leading-relaxed text-muted">Most adults do well with 2 to 2.5 litres a day.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-muted transition duration-200 hover:bg-background hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand">
            <X size={18} />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-between rounded-2xl bg-background p-2">
          <button type="button" aria-label="Decrease goal" onClick={() => setDraft((d) => clamp(d - STEP))} disabled={draft <= MIN} className="grid h-12 w-12 place-items-center rounded-full bg-surface text-ink shadow-sm transition duration-200 hover:text-brand disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand">
            <Minus size={18} />
          </button>
          <output aria-live="polite" className="font-display font-wonky text-4xl font-medium tracking-tight text-ink">{formatLitres(draft)}</output>
          <button type="button" aria-label="Increase goal" onClick={() => setDraft((d) => clamp(d + STEP))} disabled={draft >= MAX} className="grid h-12 w-12 place-items-center rounded-full bg-surface text-ink shadow-sm transition duration-200 hover:text-brand disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand">
            <Plus size={18} />
          </button>
        </div>

        <div className="mt-3 grid grid-cols-4 gap-2">
          {PRESETS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setDraft(p)}
              className={`rounded-full border px-2 py-2 text-sm font-medium transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                draft === p ? "border-brand bg-brand/10 text-brand" : "border-line text-muted hover:text-ink"
              }`}
            >
              {formatLitres(p)}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            onSaveGoal(draft);
            onClose();
          }}
          className="mt-6 w-full rounded-full bg-brand px-6 py-3.5 text-base font-semibold text-onbrand transition duration-200 hover:bg-brand/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          Save goal
        </button>

        <div className="mt-6 border-t border-line pt-5">
          {confirming ? (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-ink">Clear every logged glass? This can't be undone.</p>
              <div className="flex gap-2">
                <button type="button" onClick={() => setConfirming(false)} className="rounded-full px-4 py-2 text-sm font-medium text-muted transition duration-200 hover:bg-background hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand">
                  Keep
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onReset();
                    onClose();
                  }}
                  className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-onbrand transition duration-200 hover:bg-ink/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  Clear data
                </button>
              </div>
            </div>
          ) : (
            <button type="button" onClick={() => setConfirming(true)} className="inline-flex items-center gap-2 rounded-full px-1 py-1 text-sm font-medium text-muted transition duration-200 hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand">
              <RotateCcw size={16} />
              Reset all data
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
