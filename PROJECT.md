# Sipwise

A calm, single-screen water tracker. One tap logs a glass, a goal ring fills through the day, and a 7-day bar chart shows the trend and streak. Everything is saved in the browser (localStorage key `sipwise:v1`).

## Screen (single page)
1. Header: wordmark, today's date (desktop), settings button.
2. Today ring: goal ring with wave fill, glass count, ml progress, encouraging hint, big "Add a glass" button, undo.
3. Glass size: segmented control 150 / 250 / 500 ml; each tap adds that amount.
4. Last 7 days: bar chart with dashed goal line, today highlighted, amber droplet on goal days, tooltip on hover/tap, daily average, streak and days on goal.
5. Settings sheet: daily goal stepper and presets, reset all data (two-step confirm).

## Data
- `SipData { goal, size, log: { 'YYYY-MM-DD': number[] } }` — each entry is one logged amount in ml, so undo removes the last one.
- First run seeds the previous 6 days with realistic sample data so the chart is not empty.
- Streak counts consecutive days on goal ending today (or yesterday if today isn't reached yet).

## Files
- `App.tsx` state, persistence, derived stats
- `lib/storage.ts` types, date keys, load/save, seed
- `components/` Header, GoalRing, SizePicker, HistoryChart, SettingsSheet

## Design
- Palette: background #F3F7F6, surface #FFFFFF, ink #0E2A33, muted #4F6870, line #D5E3E1, brand #0F6B7A, onbrand #FFFFFF, accent #F2A65A (amber, only for goal droplets).
- Fonts: Fraunces (display, with SOFT/WONK axes via `.font-wonky` for the big count), Figtree (body). Tokens in Tailwind config in `public/index.html`.
- Radius: round — cards rounded-3xl, pill buttons and segmented control.
- Signature: the goal ring is a vessel; a light teal wave fills the inner circle and rises as you log, settling (slower, flatter) once the goal is hit; goal days get an amber droplet in the chart.
- Imagery: no photos; SVG ring, wave and bars; simple line icons.
- Tone: warm and short ("Two more to go.", "Goal reached. Nicely done.").
- Layout: mobile-first single column; on desktop the ring card spans two rows on the left, size picker and chart on the right.
