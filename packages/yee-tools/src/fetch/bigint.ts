/**
 * Quotes pure integer literals in a JSON text that fall outside the JS safe-integer
 * range, so the subsequent JSON.parse won't lose precision (those values are then
 * parsed as strings).
 *
 * Use case: the backend serializes 64-bit longs (e.g. DataId / ProductId) as raw
 * JSON numbers, while a JS Number only has 53 bits of precision — a direct
 * JSON.parse truncates the trailing digits of large integers to 0.
 *
 * Implementation notes (char-by-char state machine):
 * - Correctly skips digits inside string literals (including escapes), so values
 *   like "ICSLI_000024..." are left untouched.
 * - Only handles "pure integer" tokens (optional minus + consecutive digits, not
 *   followed by `.` / `e` / `E`); floats and scientific notation are preserved.
 * - Threshold is by magnitude: an unsigned integer whose absolute value exceeds
 *   Number.MAX_SAFE_INTEGER (9007199254740991) is quoted. This turns every
 *   "unsafe" integer (including even numbers above 2^53 that happen to be exactly
 *   representable) into a string — unlike a round-trip check, which would miss
 *   those "coincidentally representable" large even numbers.
 */
const MAX_SAFE_INTEGER_STR = '9007199254740991';

/** Whether an unsigned digit string is strictly greater than Number.MAX_SAFE_INTEGER (same length ⇒ lexicographic compare == numeric compare). */
function exceedsMaxSafeInteger(unsignedDigits: string): boolean {
  if (unsignedDigits.length < MAX_SAFE_INTEGER_STR.length) return false;
  if (unsignedDigits.length > MAX_SAFE_INTEGER_STR.length) return true;
  return unsignedDigits > MAX_SAFE_INTEGER_STR;
}

export function quoteBigInts(text: string): string {
  let out = '';
  let i = 0;
  const n = text.length;
  let inString = false;

  const isDigit = (c: string | undefined): c is string => !!c && c >= '0' && c <= '9';

  while (i < n) {
    const ch = text[i];

    // Inside a string: emit as-is, honoring escapes.
    if (inString) {
      out += ch;
      if (ch === '\\') {
        out += text[i + 1] ?? '';
        i += 2;
        continue;
      }
      if (ch === '"') inString = false;
      i += 1;
      continue;
    }

    if (ch === '"') {
      inString = true;
      out += ch;
      i += 1;
      continue;
    }

    // Number start: a digit, or a minus followed by a digit.
    const nextCh = text[i + 1] ?? '';
    const isNumStart = isDigit(ch) || (ch === '-' && isDigit(nextCh));
    if (isNumStart) {
      let j = i + 1;
      while (j < n && isDigit(text[j])) j++;
      const after = text[j];

      // Followed by `.` / `e` / `E` ⇒ float / scientific notation: emit the digit
      // run as-is and let JSON.parse handle it.
      if (after === '.' || after === 'e' || after === 'E') {
        out += text.slice(i, j);
        i = j;
        continue;
      }

      const token = text.slice(i, j); // includes an optional leading minus
      const digits = ch === '-' ? token.slice(1) : token;
      // Exceeds the safe-integer range ⇒ quote it (parsed as a string).
      const needsQuote = exceedsMaxSafeInteger(digits);
      out += needsQuote ? `"${token}"` : token;
      i = j;
      continue;
    }

    out += ch;
    i += 1;
  }

  return out;
}
