import { FloatButton } from '@rainbow-oh/yee-c';
import clsx from 'clsx';
import { MousePointer2 } from 'lucide-react';
import React from 'react';
import { defaultMenuItems } from './actions';
import type {
  ElementInfo,
  ElementInspectorProps,
  InspectorMenuItem,
} from './interface';
import InspectorMenu from './menu';
import PickerOverlay from './overlay';
import PickerPopover from './popover';
import { buildDefaultPrompt } from './prompt';
import './style/index.less';

// Dev-only tooling. Hoisted to module scope so consumer bundlers treat it as a
// constant and dead-code-eliminate every `isDev` branch in production builds.
const isDev = process.env.NODE_ENV !== 'production';
const canUseDom = typeof document !== 'undefined';

function matchShortcut(event: KeyboardEvent, combo: string): boolean {
  const parts = combo
    .toLowerCase()
    .split('+')
    .map((part) => part.trim())
    .filter(Boolean);
  if (parts.length === 0) {
    return false;
  }
  const key = parts[parts.length - 1];
  const modifiers = parts.slice(0, -1);
  const want = {
    ctrl: modifiers.includes('ctrl') || modifiers.includes('control'),
    alt:
      modifiers.includes('alt') ||
      modifiers.includes('option') ||
      modifiers.includes('opt'),
    shift: modifiers.includes('shift'),
    meta:
      modifiers.includes('meta') ||
      modifiers.includes('cmd') ||
      modifiers.includes('command'),
  };
  if (event.ctrlKey !== want.ctrl) return false;
  if (event.altKey !== want.alt) return false;
  if (event.shiftKey !== want.shift) return false;
  if (event.metaKey !== want.meta) return false;
  return event.key.toLowerCase() === key;
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false;
  }
  const tag = target.tagName;
  return (
    tag === 'INPUT' ||
    tag === 'TEXTAREA' ||
    tag === 'SELECT' ||
    target.isContentEditable
  );
}

const ElementInspector: React.FC<ElementInspectorProps> = (props) => {
  const {
    prefixCls = 'yee-element-inspector',
    children,
    active: controlledActive,
    defaultActive = false,
    onActiveChange,
    shortcut = 'Alt+E',
    promptTemplate,
    onCopy,
    copiedText = 'Copied',
    theme = 'light',
    className,
    contextMenu = false,
    menuItems,
    editorOpener,
    projectRoot,
  } = props;

  const isControlled = controlledActive !== undefined;
  const [internalActive, setInternalActive] = React.useState(defaultActive);
  const active = isControlled ? controlledActive : internalActive;
  const activeRef = React.useRef(active);
  activeRef.current = active;

  // Most recent pick result, shown in the anchored popover.
  const [picked, setPicked] = React.useState<{
    info: ElementInfo;
    prompt: string;
  } | null>(null);
  const pickedRef = React.useRef(picked);
  pickedRef.current = picked;

  // Most recent right-click menu, shown at the cursor.
  const [menu, setMenu] = React.useState<{
    info: ElementInfo;
    items: InspectorMenuItem[];
    x: number;
    y: number;
  } | null>(null);
  const menuRef = React.useRef(menu);
  menuRef.current = menu;

  const setActive = React.useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setInternalActive(next);
      }
      onActiveChange?.(next);
    },
    [isControlled, onActiveChange],
  );

  const handlePick = React.useCallback(
    (info: ElementInfo) => {
      const prompt = (promptTemplate ?? buildDefaultPrompt)(info);
      setPicked({ info, prompt });
    },
    [promptTemplate],
  );

  const handleContextMenu = React.useCallback(
    (info: ElementInfo, point: { x: number; y: number }) => {
      const items = menuItems
        ? menuItems(info)
        : defaultMenuItems(info, { editorOpener });
      if (items.length === 0) {
        return;
      }
      setMenu({ info, items, x: point.x, y: point.y });
    },
    [menuItems, editorOpener],
  );

  // Global shortcut (toggle) + Escape (step back: close popover, else stop).
  React.useEffect(() => {
    if (!isDev || !canUseDom || !shortcut) {
      return;
    }
    const handleKey = (event: KeyboardEvent) => {
      if (activeRef.current && event.key === 'Escape') {
        if (menuRef.current) {
          setMenu(null);
        } else if (pickedRef.current) {
          setPicked(null);
        } else {
          setActive(false);
        }
        return;
      }
      // Don't hijack plain typing for modifier-less shortcuts.
      if (!shortcut.includes('+') && isTypingTarget(event.target)) {
        return;
      }
      if (matchShortcut(event, shortcut)) {
        event.preventDefault();
        setActive(!activeRef.current);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [shortcut, setActive]);

  // Collapses to children in production (the `isDev` branches above are DCE'd,
  // so none of the listeners, overlay, or popover run).
  if (!isDev || !canUseDom) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      <FloatButton
        aria-label="Toggle Element Inspector"
        data-testid="element-inspector-toggle"
        aria-pressed={active}
        type={active ? 'default' : 'primary'}
        className={clsx(`${prefixCls}-toggle`, className)}
        style={{ right: 80 }}
        onClick={() => setActive(!active)}
        icon={<MousePointer2 size={18} />}
      />

      <PickerOverlay
        active={active}
        prefixCls={prefixCls}
        theme={theme}
        onPick={handlePick}
        contextMenu={contextMenu}
        onContextMenu={handleContextMenu}
        projectRoot={projectRoot}
      />

      {picked ? (
        <PickerPopover
          info={picked.info}
          prompt={picked.prompt}
          prefixCls={prefixCls}
          theme={theme}
          copiedText={copiedText}
          onCopy={onCopy}
          onClose={() => setPicked(null)}
        />
      ) : null}

      {menu ? (
        <InspectorMenu
          info={menu.info}
          items={menu.items}
          point={{ x: menu.x, y: menu.y }}
          prefixCls={prefixCls}
          theme={theme}
          onClose={() => setMenu(null)}
        />
      ) : null}
    </>
  );
};

export default ElementInspector;
