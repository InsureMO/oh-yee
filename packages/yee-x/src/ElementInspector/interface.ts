/**
 * Identifying information harvested from a picked DOM element.
 *
 * Used as the input to {@link ElementInspectorProps.promptTemplate} and
 * {@link ElementInspectorProps.onCopy}. Every field except `element` is optional:
 * source coordinates are only available in dev builds with JSX source info,
 * and component names are only resolvable for React-rendered trees.
 */
export interface ElementInfo {
  /**
   * The DOM element that was picked (snapped to the nearest `data-testid`
   * boundary).
   */
  element: HTMLElement;
  /**
   * Name of the React component that owns the picked region, when resolvable.
   */
  componentName?: string;
  /**
   * Source file of the region's markup. Only present in dev builds where the
   * JSX source transform is active (Vite/Next/CRA dev by default).
   */
  fileName?: string;
  /**
   * Source line number (1-based) corresponding to {@link fileName}.
   */
  lineNumber?: number;
  /**
   * Value of the nearest `data-testid` ancestor, when present.
   */
  testId?: string;
  /**
   * CSS selector snippet for the region (e.g. `[data-testid="user-table"]`).
   */
  selector?: string;
}

/**
 * A single entry in the inspector's right-click context menu.
 */
export interface InspectorMenuItem {
  /**
   * Stable key (React reconciliation).
   */
  key: string;
  /**
   * Item label.
   */
  label?: React.ReactNode;
  /**
   * Leading icon.
   */
  icon?: React.ReactNode;
  /**
   * Disable the item.
   */
  disabled?: boolean;
  /**
   * Render as a destructive (red) item.
   */
  danger?: boolean;
  /**
   * Fired on click with the picked element's info.
   */
  onSelect?: (info: ElementInfo) => void;
  /**
   * Render a non-interactive divider instead of an item.
   */
  type?: 'item' | 'divider';
}

export interface ElementInspectorProps {
  /**
   * Content rendered underneath the picker. The picker only attaches a
   * floating toggle and an overlay; it never wraps or clones children.
   */
  children?: React.ReactNode;
  /**
   * Controlled active state. When omitted the component is uncontrolled via
   * {@link defaultActive}.
   */
  active?: boolean;
  /**
   * Initial active state (uncontrolled).
   * @default false
   */
  defaultActive?: boolean;
  /**
   * Called whenever the active state changes.
   */
  onActiveChange?: (active: boolean) => void;
  /**
   * Keyboard shortcut to toggle picking, e.g. `'Alt+E'` or `'Ctrl+Shift+P'`.
   * Set to `null` or `''` to disable the shortcut. Modifier-less shortcuts are
   * ignored while typing in inputs.
   * @default 'Alt+E'
   */
  shortcut?: string | null;
  /**
   * Custom prompt builder. Receives the harvested {@link ElementInfo} and
   * returns the text to copy. Defaults to a concise "modify this region"
   * template optimized for codebase-aware AI assistants.
   */
  promptTemplate?: (info: ElementInfo) => string;
  /**
   * Fired when the popover's Copy button is clicked. When provided, the default
   * clipboard write is skipped — the consumer fully owns the output.
   */
  onCopy?: (info: ElementInfo, prompt: string) => void;
  /**
   * Text shown on the Copy button after a successful copy.
   * @default 'Copied'
   */
  copiedText?: string;
  /**
   * Enable the right-click context menu during picking. When enabled,
   * right-clicking a region while picking shows a menu of dev actions (jump to
   * source, copy selectors, …). Has no effect while picking is inactive.
   * @default false
   */
  contextMenu?: boolean;
  /**
   * Custom context-menu items. Receives the picked element's info and returns
   * the items to render. Omit to use the built-in defaults (`defaultMenuItems`).
   */
  menuItems?: (info: ElementInfo) => InspectorMenuItem[];
  /**
   * Override the "Jump to source" action used by the default menu items.
   * Defaults to opening `vscode://file/<path>:<line>`; pass the ready-made
   * helpers (`openInCursor`, `openInJetBrains`) for other editors, or `false`
   * to drop the item entirely.
   */
  editorOpener?: ((info: ElementInfo) => void) | false;
  /**
   * Color theme for the floating toggle and highlight.
   * @default 'light'
   */
  theme?: 'light' | 'dark';
  /**
   * Class name applied to the floating toggle button.
   */
  className?: string;
  /**
   * Custom prefix class name.
   * @default 'yee-element-inspector'
   */
  prefixCls?: string;
}
