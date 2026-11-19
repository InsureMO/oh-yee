/** `75` → `"1:15"` — clock style, whole seconds */
export function formatClock(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds));
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, '0')}`;
}

/** `0.8` → `"0.8s"`, `12` → `"12s"`, `130` → `"2:10"` — never `"1:60"` at the boundary */
export function formatSeconds(seconds: number): string {
  if (seconds < 59.5) {
    return `${Number.isInteger(seconds) ? seconds : seconds.toFixed(1)}s`;
  }
  const total = Math.round(seconds);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

/** `42` → `"42s"`, `204` → `"3m24s"`, `3720` → `"1h2m"` — compact live-clock style */
export function formatCompactDuration(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds));
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m${s % 60}s`;
  return `${Math.floor(m / 60)}h${m % 60}m`;
}
