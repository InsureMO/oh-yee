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
  // React 19 removed `_debugSource`; source is now carried as an Error stack
  // on the fiber (an Error object, or its `.stack` string).
  _debugStack?: unknown;
  _debugOwner?: DevOnlyFiber | null;
  return?: DevOnlyFiber | null;
}

interface SourceLocation {
  fileName?: string;
  lineNumber?: number;
  columnNumber?: number;
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
 * Normalize a parsed stack frame's URL path into a file path. React ≤18's
 * `_debugSource.fileName` is already an absolute on-disk path, but React 19's
 * `_debugStack` only yields the dev-server URL (`/src/x.tsx`). When a
 * `projectRoot` is supplied we re-join it into an absolute path so editor
 * openers (`vscode://file/…`) resolve; otherwise the server-relative path is
 * returned (still useful for copy actions).
 */
function resolveFramePath(pathname: string, projectRoot?: string): string {
  const clean = decodeURIComponent(pathname);
  if (!projectRoot) {
    return clean;
  }
  return `${projectRoot.replace(/\/$/, '')}${clean}`;
}

/**
 * React 19 dropped the per-fiber `_debugSource` object and instead stores
 * source info as an Error stack on `_debugStack`, captured at element creation.
 * Parse the first frame that resolves to an application source file. Returns
 * `undefined` when the stack is absent or only references React internals.
 *
 * Note: the line number reflects the transformed module served by the dev
 * server, so it may be off by a few lines from the original source; it gets
 * you to the right file and the right neighborhood.
 */
function parseStackSource(
  raw: unknown,
  projectRoot?: string,
): SourceLocation | undefined {
  const stack =
    typeof raw === 'string'
      ? raw
      : raw && typeof raw === 'object' && 'stack' in raw
        ? String((raw as { stack: unknown }).stack)
        : undefined;
  if (!stack) {
    return undefined;
  }
  for (const line of stack.split('\n')) {
    // A frame's dev-server URL is always absolute with a scheme, so anchor on
    // it — this is engine-agnostic and avoids leaking the function-name prefix
    // (V8's `at Foo (http://…:l:c)` vs SpiderMonkey's `Foo@http://…:l:c`):
    //   /(scheme://…):line:col/
    const m = line.match(/([a-z][a-z0-9+.-]*:\/\/[^\s()[\]]+):(\d+):(\d+)/i);
    if (!m) {
      continue;
    }
    let path: string;
    try {
      path = new URL(m[1], window.location.href).pathname;
    } catch {
      continue;
    }
    // Only application source — skip React internals and bundled deps.
    if (!/\.[tj]sx?$/.test(path) || path.includes('/node_modules/')) {
      continue;
    }
    return {
      fileName: resolveFramePath(path, projectRoot),
      lineNumber: Number(m[2]),
    };
  }
  return undefined;
}

/**
 * Read the source location, preferring the host fiber's own markup location
 * (the file/line the picked JSX was written in) and falling back up the owner
 * chain (usage site) when it is unavailable.
 *
 * Supports both React ≤18, which attaches a `_debugSource` object directly to
 * the fiber, and React 19+, which dropped that field and now stores source
 * info as an Error stack on `_debugStack` (parsed by {@link parseStackSource}).
 */
function readSource(
  fiber: DevOnlyFiber | null,
  projectRoot?: string,
): SourceLocation {
  let current: DevOnlyFiber | null = fiber;
  let depth = 0;
  while (current && depth < MAX_WALK) {
    const src = current._debugSource;
    if (src && (src.fileName || src.lineNumber)) {
      return { fileName: src.fileName, lineNumber: src.lineNumber };
    }
    const fromStack = parseStackSource(current._debugStack, projectRoot);
    if (fromStack) {
      return fromStack;
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

export interface HarvestOptions {
  /**
   * Absolute filesystem root of the consuming app. React 19's source stack
   * only yields server-relative URLs (`/src/x.tsx`); joining with `projectRoot`
   * restores the absolute path `vscode://file/…` openers need. Omit to leave
   * stack-derived paths server-relative.
   *
   * Not needed when the consuming app installs the ElementInspector source
   * plugin (which injects original source coordinates as `data-inspector-*`
   * attributes) — the dataset path is already accurate and preferred.
   */
  projectRoot?: string;
}

/**
 * Read source coordinates injected at compile time by the ElementInspector
 * Vite plugin (`data-inspector-path/line/column`). This is the most accurate
 * source — original lines, no transform offset, no sourcemap needed, and the
 * path is absolute so editor openers (`vscode://file/…`) work without a
 * `projectRoot` or `code`-in-PATH. Returns `undefined` when the plugin isn't
 * installed (the boundary element carries no `data-inspector-path`).
 */
function readDatasetSource(boundary: HTMLElement): SourceLocation | undefined {
  const { inspectorPath, inspectorLine, inspectorColumn } = boundary.dataset;
  if (!inspectorPath || !inspectorLine) {
    return undefined;
  }
  const lineNumber = Number(inspectorLine);
  if (!Number.isFinite(lineNumber)) {
    return undefined;
  }
  return {
    fileName: inspectorPath,
    lineNumber,
    columnNumber: inspectorColumn ? Number(inspectorColumn) : undefined,
  };
}

/**
 * Harvest identifying info for a picked boundary element. Never throws — any
 * field that cannot be resolved is left `undefined`.
 *
 * Source resolution is a three-tier fallback:
 *   1. `data-inspector-*` dataset (compile-time injected, most accurate)
 *   2. React 19 `fiber._debugStack` (Error-stack parse; server-relative path)
 *   3. React ≤18 `fiber._debugSource`
 */
export function harvest(
  boundary: HTMLElement,
  options: HarvestOptions = {},
): ElementInfo {
  const testId = boundary.getAttribute('data-testid') ?? undefined;
  const source =
    readDatasetSource(boundary) ??
    readSource(getFiber(boundary), options.projectRoot);
  const owner = findOwningComponent(getFiber(boundary));
  const componentName = owner
    ? nameOfType(owner.elementType ?? owner.type)
    : undefined;

  return {
    element: boundary,
    componentName,
    fileName: source.fileName,
    lineNumber: source.lineNumber,
    columnNumber: source.columnNumber,
    testId,
    selector: buildSelector(boundary, testId),
  };
}
