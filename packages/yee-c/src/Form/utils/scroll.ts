import type { NamePath, ScrollOptions } from '../interface';

export const normalizeFieldName = (name: NamePath): string =>
  Array.isArray(name) ? name.map(String).join('.') : String(name);

// Escape the two characters that would break a quoted attribute selector.
const escapeAttr = (value: string): string => value.replace(/["\\]/g, '\\$&');

// Scroll target is the item wrapper (data-form-item anchor): scrolling it
// brings the label and control into view together and lets the wrapper's
// scroll-margin-top apply. The control's id is the fallback for custom item
// markup without the wrapper anchor.
export const findFieldElement = (
  root: HTMLElement | null,
  name: NamePath,
): HTMLElement | null => {
  const attr = escapeAttr(normalizeFieldName(name));
  const scope: ParentNode = root ?? document;
  return (
    scope.querySelector<HTMLElement>(`[data-form-item="${attr}"]`) ??
    scope.querySelector<HTMLElement>(`[id="${attr}"]`)
  );
};

export const scrollToFieldByName = (
  root: HTMLElement | null,
  name: NamePath | NamePath[] | undefined,
  options?: ScrollOptions,
): void => {
  if (name === undefined || name === null) return;
  try {
    const parts = Array.isArray(name) ? name : [name];
    const candidates = parts.map(normalizeFieldName);
    // Group errors pass an array of child field names: try the joined path
    // first (covers genuinely nested paths), then each child field.
    const lookups = Array.isArray(name)
      ? [candidates.join('.'), ...candidates]
      : candidates;
    for (const lookup of lookups) {
      const element = findFieldElement(root, lookup);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest',
          ...options,
        });
        return;
      }
    }
  } catch (e) {
    console.warn(e);
  }
};
