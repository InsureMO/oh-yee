export default function mergeContextToProps<T extends object>(
  baseProps: T,
  context?: T,
): T {
  const entries = Object.entries(baseProps).filter(
    ([, value]) => value !== undefined,
  );
  const noUndefined = Object.fromEntries(entries);
  const ctx = typeof context === 'object' ? context : {};
  // @ts-ignore
  return { ...ctx, ...noUndefined };
}
