import { GlassWater } from "lucide-react";
import { GLASS_SIZES } from "../lib/storage";

type Props = {
  size: number;
  onChange: (size: number) => void;
};

const LABELS: Record<number, string> = { 150: "Small", 250: "Glass", 500: "Bottle" };
const ICON: Record<number, number> = { 150: 16, 250: 18, 500: 20 };

export default function SizePicker({ size, onChange }: Props) {
  return (
    <section aria-labelledby="size-title" className="min-w-0 rounded-3xl border border-line bg-surface p-6 sm:p-8">
      <div className="flex items-baseline justify-between gap-4">
        <h2 id="size-title" className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Glass size</h2>
        <p className="text-sm text-muted">Each tap adds this</p>
      </div>
      <div role="radiogroup" aria-label="Glass size" className="mt-4 grid grid-cols-3 gap-1 rounded-full bg-background p-1">
        {GLASS_SIZES.map((s) => {
          const active = s === size;
          return (
            <button
              key={s}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(s)}
              className={`flex min-w-0 flex-col items-center gap-0.5 rounded-full px-2 py-2.5 transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                active ? "bg-surface text-ink shadow-[0_1px_2px_rgba(14,42,51,0.08),0_4px_12px_-6px_rgba(14,42,51,0.18)]" : "text-muted hover:text-ink"
              }`}
            >
              <span className="flex items-center gap-1.5">
                <GlassWater size={ICON[s]} className={active ? "text-brand" : ""} />
                <span className="text-base font-semibold">{s} ml</span>
              </span>
              <span className="text-xs">{LABELS[s]}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
