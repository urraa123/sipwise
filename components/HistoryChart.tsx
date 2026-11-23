import { useState } from "react";
import { formatMl, formatLitres } from "../lib/storage";

export type DayStat = {
  key: string;
  label: string;
  longLabel: string;
  total: number;
  isToday: boolean;
};

type Props = {
  days: DayStat[];
  goal: number;
  streak: number;
};

function Droplet() {
  return (
    <svg width="12" height="14" viewBox="0 0 24 28" aria-hidden="true">
      <path d="M12 1.5c4.2 5.1 8 9.4 8 13.9a8 8 0 0 1-16 0c0-4.5 3.8-8.8 8-13.9Z" className="fill-accent" />
    </svg>
  );
}

export default function HistoryChart({ days, goal, streak }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const max = Math.max(goal * 1.25, ...days.map((d) => d.total));
  const goalPct = (goal / max) * 100;
  const average = Math.round(days.reduce((a, d) => a + d.total, 0) / days.length);
  const onGoal = days.filter((d) => d.total >= goal).length;

  return (
    <section aria-labelledby="history-title" className="min-w-0 rounded-3xl border border-line bg-surface p-6 sm:p-8">
      <div className="flex items-baseline justify-between gap-4">
        <h2 id="history-title" className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Last 7 days</h2>
        <p className="text-sm text-muted">Goal {formatLitres(goal)}</p>
      </div>

      <div className="relative mt-8 h-44" onMouseLeave={() => setSelected(null)}>
        <div className="pointer-events-none absolute inset-x-0 border-t border-dashed border-muted/50" style={{ bottom: `${goalPct}%` }}>
          <span className="absolute -top-5 right-0 text-[11px] text-muted">goal</span>
        </div>
        <div className="relative flex h-full items-end gap-2 sm:gap-3">
          {days.map((d, i) => {
            const h = Math.max((d.total / max) * 100, d.total > 0 ? 4 : 1.5);
            const met = d.total >= goal;
            const isSel = selected === i;
            return (
              <button
                key={d.key}
                type="button"
                onMouseEnter={() => setSelected(i)}
                onFocus={() => setSelected(i)}
                onBlur={() => setSelected(null)}
                onClick={() => setSelected(isSel ? null : i)}
                aria-label={`${d.longLabel}: ${formatMl(d.total)} ml${met ? ", goal reached" : ""}`}
                className="group relative flex h-full min-w-0 flex-1 items-end justify-center rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                {isSel && (
                  <span
                    className="pointer-events-none absolute z-10 mb-6 whitespace-nowrap rounded-xl bg-ink px-2.5 py-1.5 text-xs font-medium text-onbrand shadow-lg"
                    style={{ bottom: `${h}%` }}
                  >
                    {formatMl(d.total)} ml
                  </span>
                )}
                {met && (
                  <span className="pointer-events-none absolute left-1/2 -translate-x-1/2" style={{ bottom: `calc(${h}% + 6px)` }}>
                    <Droplet />
                  </span>
                )}
                <span
                  className={`block w-full max-w-[30px] rounded-full transition-all duration-700 ${
                    d.isToday ? "bg-brand" : isSel ? "bg-brand/50" : "bg-brand/25 group-hover:bg-brand/40"
                  }`}
                  style={{ height: `${h}%` }}
                />
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-3 flex gap-2 sm:gap-3">
        {days.map((d) => (
          <span key={d.key} className={`min-w-0 flex-1 text-center text-xs ${d.isToday ? "font-semibold text-ink" : "text-muted"}`}>
            {d.isToday ? "Today" : d.label}
          </span>
        ))}
      </div>

      <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
        <div className="min-w-0">
          <dt className="text-xs text-muted">Daily average</dt>
          <dd className="mt-1 font-display text-2xl font-medium tracking-tight text-ink">{formatLitres(average)}</dd>
        </div>
        <div className="min-w-0">
          <dt className="text-xs text-muted">Streak</dt>
          <dd className="mt-1 font-display text-2xl font-medium tracking-tight text-ink">
            {streak} <span className="font-sans text-sm font-normal text-muted">{streak === 1 ? "day" : "days"}</span>
          </dd>
        </div>
        <div className="min-w-0">
          <dt className="text-xs text-muted">On goal</dt>
          <dd className="mt-1 font-display text-2xl font-medium tracking-tight text-ink">
            {onGoal}<span className="font-sans text-sm font-normal text-muted"> / 7</span>
          </dd>
        </div>
      </dl>
    </section>
  );
}
