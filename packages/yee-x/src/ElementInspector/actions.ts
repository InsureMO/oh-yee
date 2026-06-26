import type { ElementInfo, InspectorMenuItem } from './interface';
import { copyToClipboard } from './prompt';

/**
 * Hand a custom-scheme URL (`vscode://`, `cursor://`, …) to the OS-registered
 * editor by assigning `window.location.href`. Browsers treat a registered
 * external scheme as "delegate to the OS, don't navigate", so the current page
 * is not unloaded. (A hidden-anchor `.click()` is less reliable — some browsers
 * suppress external-protocol launches triggered that way.)
 */
function openUrl(url: string): void {
  if (typeof window === 'undefined') {
    return;
  }
  window.location.href = url;
}

/** `file` or `file:line`, when a source location was harvested. */
function locationOf(info: ElementInfo): string | undefined {
  if (!info.fileName) {
    return undefined;
  }
  return info.lineNumber ? `${info.fileName}:${info.lineNumber}` : info.fileName;
}

/**
 * Build a `<scheme>://file<path>` URL in the canonical single-slash form
 * (`vscode://file/Users/...`, not `vscode://file//Users/...`). The harvested
 * location is absolute, so it already carries the leading slash.
 */
function fileSchemeUrl(scheme: string, location: string): string {
  const path = location.startsWith('/') ? location : `/${location}`;
  return `${scheme}://file${path}`;
}

/** Open the element's source in Visual Studio Code (`vscode://`). */
export function openInVSCode(info: ElementInfo): void {
  const location = locationOf(info);
  if (location) {
    openUrl(fileSchemeUrl('vscode', location));
  }
}

/**
 * Open the element's source via the running Vite dev server's
 * `/__open-in-editor` middleware. This is the preferred opener during dev:
 *   - it accepts the relative path injected by the ElementInspector source
 *     plugin (`src/App.tsx:10`) directly — no `projectRoot` needed;
 *   - it launches whatever editor is configured for the dev server (matching
 *     the user's terminal/IDE), more reliably than a `vscode://` URL.
 *
 * Only meaningful in dev (the middleware only exists while `vite` is running).
 * In prod builds ElementInspector's `isDev` guard already collapses the menu.
 */
export function openInViteDevServer(info: ElementInfo): void {
  const location = locationOf(info);
  if (!location || typeof window === 'undefined') {
    return;
  }
  // The middleware resolves the path the same way Vite serves modules: a
  // leading slash is treated as server-root-relative, no slash as project-root-
  // relative. The source plugin injectutes project-root-relative paths, so we
  // pass them through unchanged.
  const file = location.startsWith('/') ? location.slice(1) : location;
  const url = `/__open-in-editor?file=${encodeURIComponent(file)}`;
  // Fire via fetch, not navigation — keeps the page URL / router state clean
  // (same trick Vite's own error overlay uses). Fall back to vscode:// if the
  // middleware is unreachable (non-Vite setup, or dev server down).
  void fetch(url).catch(() => openInVSCode(info));
}

/** Open the element's source in Cursor (`cursor://`). */
export function openInCursor(info: ElementInfo): void {
  const location = locationOf(info);
  if (location) {
    openUrl(fileSchemeUrl('cursor', location));
  }
}

/** Open the element's source in a JetBrains IDE (`jetbrains://`). */
export function openInJetBrains(info: ElementInfo): void {
  const location = locationOf(info);
  if (location) {
    openUrl(
      `jetbrains://idea/navigate/reference?path=${encodeURIComponent(location)}`,
    );
  }
}

function resolveEditorOpener(
  editorOpener: ((info: ElementInfo) => void) | false | undefined,
): ((info: ElementInfo) => void) | undefined {
  if (editorOpener === false) {
    return undefined;
  }
  // Default to `vscode://file/<abs>:<line>`. The source plugin injects an
  // absolute path, so this works without `projectRoot` and without `code`
  // being in the dev server's PATH (unlike Vite's `/__open-in-editor`).
  // For non-VS-Code setups pass `openInCursor`, `openInJetBrains`, or
  // `openInViteDevServer` explicitly.
  return editorOpener ?? openInVSCode;
}

/**
 * Testing Library / Playwright-style selector for the element's testid:
 * `getByTestId('user-table')`. Returns `undefined` when the element has no
 * testid.
 */
export function buildTestSelector(info: ElementInfo): string | undefined {
  return info.testId ? `getByTestId('${info.testId}')` : undefined;
}

function copyItem(
  key: string,
  label: string,
  value: string | undefined,
): InspectorMenuItem | undefined {
  if (!value) {
    return undefined;
  }
  return {
    key,
    label,
    onSelect: () => {
      void copyToClipboard(value);
    },
  };
}

export interface DefaultMenuItemsOptions {
  editorOpener?: ((info: ElementInfo) => void) | false;
}

/**
 * Built-in context-menu items, derived from whatever {@link ElementInfo}
 * provides. Every action is conditional — items whose data is missing are
 * omitted, and the copy group is only added when at least one copy action is
 * available, so no orphan dividers are produced.
 *
 * Exported so consumers can extend rather than replace:
 * `menuItems={(info) => [...defaultMenuItems(info, { editorOpener }), mine]}`.
 */
export function defaultMenuItems(
  info: ElementInfo,
  options: DefaultMenuItemsOptions = {},
): InspectorMenuItem[] {
  const opener = resolveEditorOpener(options.editorOpener);
  const location = locationOf(info);

  const items: InspectorMenuItem[] = [];

  if (opener && location) {
    items.push({
      key: 'jump-to-source',
      label: 'Jump to source',
      onSelect: opener,
    });
  }

  const copies = [
    copyItem('copy-location', 'Copy file:line', location),
    copyItem('copy-selector', 'Copy selector', info.selector),
    copyItem('copy-test-selector', 'Copy as test selector', buildTestSelector(info)),
  ].filter((item): item is InspectorMenuItem => Boolean(item));

  if (copies.length > 0) {
    items.push({ key: 'divider-copy', type: 'divider' });
    items.push(...copies);
  }

  return items;
}
