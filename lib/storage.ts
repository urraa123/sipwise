export type SipData = {
  goal: number; // ml per day
  size: number; // selected glass size in ml
  log: Record<string, number[]>; // day key -> list of logged amounts (ml)
};

const KEY = "sipwise:v1";

export const GLASS_SIZES = [150, 250, 500];

export function dayKey(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function lastNDays(n: number, from: Date = new Date()): Date[] {
  const days: Date[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(from.getFullYear(), from.getMonth(), from.getDate() - i);
    days.push(d);
  }
  return days;
}

export function sum(list: number[] | undefined): number {
  return (list ?? []).reduce((a, b) => a + b, 0);
}

function seed(): SipData {
  const samples = [
    [250, 250, 500, 250, 250, 500],
    [250, 500, 250, 250, 500],
    [500, 250, 250, 500, 250, 500],
    [250, 250, 500, 250, 250],
    [500, 250, 250, 500, 250, 250],
    [500, 500, 250, 250, 500, 250, 250]
  ];
  const log: Record<string, number[]> = {};
  const days = lastNDays(7);
  days.slice(0, 6).forEach((d, i) => {
    log[dayKey(d)] = samples[i];
  });
  log[dayKey(days[6])] = [];
  return { goal: 2000, size: 250, log };
}

export function loadData(): SipData {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<SipData>;
      if (parsed && typeof parsed.goal === "number" && parsed.log && typeof parsed.log === "object") {
        return {
          goal: parsed.goal,
          size: GLASS_SIZES.includes(parsed.size ?? 0) ? (parsed.size as number) : 250,
          log: parsed.log as Record<string, number[]>
        };
      }
    }
  } catch {
    // ignore broken storage and fall back to seed data
  }
  return seed();
}

export function saveData(data: SipData): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // storage may be full or blocked; the app keeps working in memory
  }
}

export function emptyData(goal: number, size: number): SipData {
  return { goal, size, log: {} };
}

export function formatMl(ml: number): string {
  return ml.toLocaleString("en-US");
}

export function formatLitres(ml: number): string {
  return `${(ml / 1000).toLocaleString("en-US", { maximumFractionDigits: 2 })} L`;
}
