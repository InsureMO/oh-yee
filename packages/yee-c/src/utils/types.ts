export type DataAttributeProps = {
  [key: `data-${string}`]: string | number | boolean | undefined;
};

export function pickDataAttrs(
  props: Record<string, unknown>,
): DataAttributeProps {
  const result: DataAttributeProps = {};
  for (const key of Object.keys(props)) {
    if (key.startsWith('data-')) {
      (result as Record<string, unknown>)[key] = props[key];
    }
  }
  return result;
}
