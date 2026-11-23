import { Plus, Undo2 } from "lucide-react";
import { formatMl } from "../lib/storage";

type Props = {
  total: number;
  goal: number;
  glasses: number;
  size: number;
  dateLabel: string;
  onAdd: () => void;
  onUndo: () => void;
};

const R = 118;
const C = 2 * Math.PI * R;
const WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];

function wave(amp: number): string {
  const P = 130;
  let d = "M0 0";
  for (let x = 0; x < 650; x += P) {
    d += ` Q${x + P / 4} ${-amp} ${x + P / 2} 0 Q${x + (3 * P) / 4} ${amp} ${x + P} 0`;
  }
  return `${d} L650 300 L0 300 Z`;
}

function hint(total: number, goal: number, size: number): string {
  const remaining = goal - total;
  if (remaining <= 0) return "Goal reached. Nicely done.";
  const n = Math.ceil(remaining / size);
  if (total === 0) return `${n} ${n === 1 ? "glass" : "glasses"} of ${size} ml gets you there. Start whenever.`;
  const word = n <= 10 ? WORDS[n] : String(n);
  return `${word} more to go.`;
}

export default function GoalRing({ total, goal, glasses, size, dateLabel, onAdd, onUndo }: Props) {
  const pct = Math.min(total / goal, 1);
  const reached = total >= goal;
  const level = reached ? 22 : 230 - pct * 200;

  return (
    <section aria-labelledby="today-title" className="flex flex-col items-center rounded-3xl border border-line bg-surface p-6 shadow-[0_1px_2px_rgba(14,42,51,0.04),0_12px_32px_-16px_rgba(14,42,51,0.12)] sm:p-8 lg:row-span-2">
      <div className="flex w-full items-baseline justify-between">
        <h1 id="today-title" className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Today's water</h1>
        <p className="text-sm text-muted sm:hidden">{dateLabel}</p>
      </div>

      <div className="relative mt-4 aspect-square w-full max-w-[300px]">
        <svg viewBox="0 0 260 260" className="h-full w-full" aria-hidden="true">
          <defs>
            <clipPath id="sip-vessel">
              <circle cx="130" cy="130" r="100" />
            </clipPath>
          </defs>
          <circle cx="130" cy="130" r="100" className="fill-background" />
          <g clipPath="url(#sip-vessel)">
            <g style={{ transform: `translateY(${level}px)`, transition: "transform 1.2s cubic-bezier(.22,1,.36,1)" }}>
              <g className={`sip-wave sip-wave-back ${reached ? "is-settled" : ""}`}>
                <path d={wave(reached ? 2 : 7)} transform="translate(-65 -3)" className="fill-brand" opacity="0.12" style={{ transition: "d 1s ease" }} />
              </g>
              <g className={`sip-wave ${reached ? "is-settled" : ""}`}>
                <path d={wave(reached ? 1.5 : 5)} className="fill-brand" opacity="0.2" style={{ transition: "d 1s ease" }} />
              </g>
            </g>
          </g>
          <circle cx="130" cy="130" r={R} fill="none" strokeWidth="10" className="stroke-line" />
          <circle
            cx="130"
            cy="130"
            r={R}
            fill="none"
            strokeWidth="10"
            strokeLinecap="round"
            className="stroke-brand"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - pct)}
            transform="rotate(-90 130 130)"
            style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.22,1,.36,1)", opacity: total === 0 ? 0 : 1 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center" aria-live="polite">
          <span className="font-display font-wonky text-7xl font-medium leading-none tracking-tight text-ink sm:text-8xl">{glasses}</span>
          <span className="mt-2 text-sm font-medium text-ink">{glasses === 1 ? "glass" : "glasses"}</span>
          <span className="mt-1 text-xs text-muted">
            {formatMl(total)} of {formatMl(goal)} ml
          </span>
        </div>
      </div>

      <p className="mt-5 min-h-[1.5rem] text-center text-base text-muted">{hint(total, goal, size)}</p>

      <button
        type="button"
        onClick={onAdd}
        className="mt-5 flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-lg font-semibold text-onbrand shadow-[0_10px_24px_-12px_rgba(15,107,122,0.7)] transition duration-200 hover:bg-brand/90 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
      >
        <Plus size={20} strokeWidth={2.5} />
        Add a glass
        <span className="font-normal text-onbrand/80">· {size} ml</span>
      </button>

      <button
        type="button"
        onClick={onUndo}
        disabled={glasses === 0}
        className="mt-3 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-muted transition duration-200 hover:bg-background hover:text-ink disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        <Undo2 size={16} />
        Undo last glass
      </button>
    </section>
  );
}
