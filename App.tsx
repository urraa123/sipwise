import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import GoalRing from "./components/GoalRing";
import SizePicker from "./components/SizePicker";
import HistoryChart, { DayStat } from "./components/HistoryChart";
import SettingsSheet from "./components/SettingsSheet";
import { SipData, dayKey, emptyData, lastNDays, loadData, saveData, sum } from "./lib/storage";

export default function App() {
  const [data, setData] = useState<SipData>(loadData);
  const [now, setNow] = useState(() => new Date());
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => saveData(data), [data]);

  // keep "today" correct if the app stays open past midnight
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const today = dayKey(now);
  const entries = data.log[today] ?? [];
  const total = sum(entries);

  const days: DayStat[] = useMemo(
    () =>
      lastNDays(7, now).map((d) => {
        const key = dayKey(d);
        return {
          key,
          label: d.toLocaleDateString("en-US", { weekday: "short" }),
          longLabel: d.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }),
          total: sum(data.log[key]),
          isToday: key === today
        };
      }),
    [data.log, now, today]
  );

  const streak = useMemo(() => {
    let count = 0;
    const start = sum(data.log[today]) >= data.goal ? 0 : 1;
    for (let i = start; i < 366; i++) {
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
      if (sum(data.log[dayKey(d)]) >= data.goal) count++;
      else break;
    }
    return count;
  }, [data.log, data.goal, now, today]);

  const addGlass = () => {
    const key = dayKey(new Date());
    setNow(new Date());
    setData((d) => ({ ...d, log: { ...d.log, [key]: [...(d.log[key] ?? []), d.size] } }));
  };

  const undoGlass = () => {
    setData((d) => ({ ...d, log: { ...d.log, [today]: (d.log[today] ?? []).slice(0, -1) } }));
  };

  const dateLabel = now.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });

  return (
    <div className="min-h-screen bg-background font-sans text-ink antialiased">
      <div className="mx-auto max-w-5xl px-5 pb-16 sm:px-6">
        <Header date={now} onOpenSettings={() => setSettingsOpen(true)} />
        <main className="grid grid-cols-1 gap-5 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
          <GoalRing
            total={total}
            goal={data.goal}
            glasses={entries.length}
            size={data.size}
            dateLabel={dateLabel}
            onAdd={addGlass}
            onUndo={undoGlass}
          />
          <SizePicker size={data.size} onChange={(size) => setData((d) => ({ ...d, size }))} />
          <HistoryChart days={days} goal={data.goal} streak={streak} />
        </main>
        <p className="mt-10 text-center text-xs text-muted">Saved on this device only. Nothing leaves your browser.</p>
      </div>

      <SettingsSheet
        open={settingsOpen}
        goal={data.goal}
        onClose={() => setSettingsOpen(false)}
        onSaveGoal={(goal) => setData((d) => ({ ...d, goal }))}
        onReset={() => setData((d) => emptyData(d.goal, d.size))}
      />
    </div>
  );
}
