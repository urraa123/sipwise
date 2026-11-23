import { SlidersHorizontal } from "lucide-react";

type Props = {
  date: Date;
  onOpenSettings: () => void;
};

export default function Header({ date, onOpenSettings }: Props) {
  const label = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric"
  });

  return (
    <header className="flex items-center justify-between gap-4 py-6 sm:py-8">
      <a href="#" className="flex items-center gap-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 2.8c3.4 4.1 6.2 7.6 6.2 11a6.2 6.2 0 0 1-12.4 0c0-3.4 2.8-6.9 6.2-11Z" className="fill-brand" />
          <path d="M9 14.5a3 3 0 0 0 3 3" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <span className="font-display font-wonky text-3xl font-semibold tracking-tight text-ink">Sipwise</span>
      </a>
      <div className="flex items-center gap-3">
        <p className="hidden text-sm text-muted sm:block">{label}</p>
        <button
          type="button"
          onClick={onOpenSettings}
          aria-label="Daily goal settings"
          className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-ink transition duration-200 hover:border-brand/40 hover:text-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <SlidersHorizontal size={18} />
        </button>
      </div>
    </header>
  );
}
