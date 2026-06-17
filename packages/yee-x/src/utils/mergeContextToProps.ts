export default function mergeContextToBaseProps<T extends Record<string, any>>(
  baseProps: T,
  context?: Partial<T>,
) {
  const entries = Object.entries(baseProps).filter(
    ([, value]) => value !== undefined,
  );
  const noUndefined = Object.fromEntries(entries);

  return { ...context, ...noUndefined };
}
