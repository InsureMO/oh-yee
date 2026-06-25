import type { ElementInfo } from './interface';

/**
 * A deliberately narrow view of a React fiber. React's public types do not
 * expose internals, so we declare only the fields we read here and access the
 * fiber off the DOM element via an untyped key lookup (the established pattern
 * in this repo — see `yee-c/src/Trigger/trigger.tsx`). Fields that React does
 * not populate simply stay `undefined`, so source lookups degrade gracefully.
 */
interface DevOnlyFiber {
  elementType?: unknown;
  type?: unknown;
  _debugSource?: { fileName?: string; lineNumber?: number } | null;
  _debugOwner?: DevOnlyFiber | null;
  return?: DevOnlyFiber | null;
}

interface SourceLocation {
  fileName?: string;
  lineNumber?: number;
}

// React attaches fibers to host nodes under version-specific random-suffixed
// keys. The `__reactFiber$` / `__reactContainer$` scheme is shared by React 18
// and 19, so one lookup works across both.
const FIBER_KEY_PREFIXES = [
  '__reactFiber$',
  '__reactInternalInstance$',
  '__reactContainer$',
];

const MAX_WALK = 100;

function getFiber(element: HTMLElement): DevOnlyFiber | null {
  const records = element as unknown as Record<string, unknown>;
  const keys = Object.keys(records);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    if (
      key.startsWith(FIBER_KEY_PREFIXES[0]) ||
      key.startsWith(FIBER_KEY_PREFIXES[1]) ||
      key.startsWith(FIBER_KEY_PREFIXES[2])
    ) {
      const fiber = records[key];
      if (fiber && typeof fiber === 'object') {
        return fiber as DevOnlyFiber;
      }
    }
  }
  return null;
}

/**
 * Resolve a human-readable name from a React element type. Unwraps
 * `memo` / `forwardRef` / `lazy` wrappers. Host intrinsics (`'div'`, `'span'`)
 * are returned as-is so callers can distinguish them from real components.
 */
function nameOfType(type: unknown, depth = 0): string | undefined {
  if (!type || depth > 5) {
    return undefined;
  }
  if (typeof type === 'string') {
    return type; // host intrinsic tag
  }
  if (typeof type === 'function') {
    const fn = type as { name?: string; displayName?: string };
    return fn.displayName || fn.name || undefined;
  }
  if (typeof type === 'object') {
    const obj = type as {
      displayName?: string;
      name?: unknown;
      type?: unknown;
      render?: unknown;
    };
    const ownName =
      obj.displayName || (typeof obj.name === 'string' ? obj.name : undefined);
    return (
      ownName ||
      nameOfType(obj.type, depth + 1) ||
      nameOfType(obj.render, depth + 1)
    );
  }
  return undefined;
}

const HOST_TAG_RE = /^[a-z]/;

function isHostTag(name: string): boolean {
  return HOST_TAG_RE.test(name);
}

/** Walk up from a host fiber to the nearest fiber that is a real component. */
function findOwningComponent(fiber: DevOnlyFiber | null): DevOnlyFiber | null {
  let current = fiber;
  let depth = 0;
  while (current && depth < MAX_WALK) {
    const name = nameOfType(current.elementType ?? current.type);
    if (name && !isHostTag(name)) {
      return current;
    }
    current = current._debugOwner ?? current.return ?? null;
    depth += 1;
  }
  return null;
}

/**
 * Read the source location, preferring the host fiber's own markup location
 * (the file/line the picked JSX was written in) and falling back up the owner
 * chain (usage site) when it is unavailable.
 */
function readSource(fiber: DevOnlyFiber | null): SourceLocation {
  let current: DevOnlyFiber | null = fiber;
  let depth = 0;
  while (current && depth < MAX_WALK) {
    const src = current._debugSource;
    if (src && (src.fileName || src.lineNumber)) {
      return { fileName: src.fileName, lineNumber: src.lineNumber };
    }
    current = current._debugOwner ?? current.return ?? null;
    depth += 1;
  }
  return {};
}

function buildSelector(
  element: HTMLElement,
  testId?: string,
): string | undefined {
  if (testId) {
    return `[data-testid="${testId}"]`;
  }
  if (element.id) {
    return `#${element.id}`;
  }
  return element.tagName.toLowerCase();
}

/**
 * Find the nearest ancestor (including the element itself) carrying a
 * `data-testid`. Falls back to the original element when none is found.
 */
export function findTestidBoundary(element: HTMLElement): HTMLElement {
  let node: HTMLElement | null = element;
  let depth = 0;
  while (node && depth < MAX_WALK) {
    if (node.getAttribute && node.getAttribute('data-testid')) {
      return node;
    }
    node = node.parentElement;
    depth += 1;
  }
  return element;
}

/**
 * Harvest identifying info for a picked boundary element. Never throws — any
 * field that cannot be resolved is left `undefined`.
 */
export function harvest(boundary: HTMLElement): ElementInfo {
  const testId = boundary.getAttribute('data-testid') ?? undefined;
  const fiber = getFiber(boundary);
  const owner = findOwningComponent(fiber);
  const componentName = owner
    ? nameOfType(owner.elementType ?? owner.type)
    : undefined;
  const source = readSource(fiber);

  return {
    element: boundary,
    componentName,
    fileName: source.fileName,
    lineNumber: source.lineNumber,
    testId,
    selector: buildSelector(boundary, testId),
  };
}
