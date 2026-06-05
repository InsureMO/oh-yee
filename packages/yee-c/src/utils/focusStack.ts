// focusStack.ts
type Focusable = HTMLElement | null;

const stack: Focusable[] = [];
let raf = 0;

const schedule = (el: Focusable) => {
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(() => el?.focus());
};

export const pushFocus = (el: Focusable) => {
  const prev = document.activeElement as HTMLElement;
  if (prev && prev !== el) stack.push(prev);
  schedule(el);
};

export const popFocus = () => {
  const el = stack.pop();
  if (!el) return;
  schedule(el);
};
