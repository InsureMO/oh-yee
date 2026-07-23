type Focusable = HTMLElement | null;

export interface FocusStackEntry {
  container: HTMLElement;
  previous: Focusable;
}

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'details',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

const stack: FocusStackEntry[] = [];
let raf = 0;

const schedule = (callback: () => void) => {
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(callback);
};

const focusInitialElement = (entry: FocusStackEntry) => {
  if (stack[stack.length - 1] !== entry || !entry.container.isConnected) {
    return;
  }

  const activeElement = document.activeElement;
  if (activeElement && entry.container.contains(activeElement)) {
    return;
  }

  const firstFocusable =
    entry.container.querySelector<HTMLElement>(focusableSelector);
  (firstFocusable ?? entry.container).focus();
};

export const pushFocus = (
  container: HTMLElement,
  previous: Focusable = document.activeElement as HTMLElement | null,
): FocusStackEntry => {
  const entry = { container, previous };
  stack.push(entry);
  schedule(() => focusInitialElement(entry));
  return entry;
};

export const popFocus = (entry: FocusStackEntry) => {
  const index = stack.lastIndexOf(entry);
  if (index === -1) return;

  const isTopEntry = index === stack.length - 1;
  stack.splice(index, 1);

  if (!isTopEntry) return;

  schedule(() => {
    if (entry.previous?.isConnected) {
      entry.previous.focus();
    }
  });
};
