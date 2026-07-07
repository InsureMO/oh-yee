export default function mergeContextToBaseProps<T extends object>(
  baseProps: T,
  context?: Partial<T>,
) {
  const entries = Object.entries(baseProps).filter(
    ([, value]) => value !== undefined,
  );
  const noUndefined = Object.fromEntries(entries) as Partial<T>;

  return { ...context, ...noUndefined };
}
