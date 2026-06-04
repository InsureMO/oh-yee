/**
 * Infer the picker type from a date format string
 * @param format e.g. "YYYY-MM-DD HH:mm:ss"  "dd.MM.yyyy"  "MM/DD/YYYY"
 */
type Picker = 'year' | 'month' | 'date' | 'datetime';

export function inferPicker(format: string): Picker {
  const f = format.toLowerCase();

  // As long as there is an hour part -> datetime
  if (f.includes('h')) return 'datetime';

  // Order-independent, just count occurrences of year, month, day
  const hasY = f.includes('y');
  const hasM = f.includes('m');
  const hasD = f.includes('d');

  if (!hasY) throw new Error('invalid format: missing year');

  if (!hasM && !hasD) return 'year';
  if (hasM && !hasD) return 'month';
  if (hasM && hasD) return 'date';

  return 'date';
}