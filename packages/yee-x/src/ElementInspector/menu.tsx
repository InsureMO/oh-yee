import clsx from 'clsx';
import React from 'react';
import { createPortal } from 'react-dom';
import type { ElementInfo, InspectorMenuItem } from './interface';

export interface InspectorMenuProps {
  info: ElementInfo;
  items: InspectorMenuItem[];
  point: { x: number; y: number };
  prefixCls: string;
  theme: 'light' | 'dark';
  onClose: () => void;
}

const GAP = 4;

/**
 * Right-click context menu shown while picking. Rendered through a portal at
 * the cursor position (clamped to stay inside the viewport) and closed on item
 * select, an outside pointer-down, or Escape. Mirrors the popover's positioning
 * strategy.
 *
 * Mounted only while a menu is open.
 */
const InspectorMenu: React.FC<InspectorMenuProps> = ({
  info,
  items,
  point,
  prefixCls,
  theme,
  onClose,
}) => {
  const menuRef = React.useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = React.useState<{
    top: number;
    left: number;
  } | null>(null);

  // Keep the latest onClose without re-binding the document listeners.
  const onCloseRef = React.useRef(onClose);
  onCloseRef.current = onClose;

  // Clamp the menu inside the viewport once it's been measured.
  const measure = React.useCallback(() => {
    const node = menuRef.current;
    if (!node) {
      return;
    }
    const width = node.offsetWidth;
    const height = node.offsetHeight;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    setPosition({
      top: Math.min(Math.max(GAP, point.y), viewportHeight - height - GAP),
      left: Math.min(Math.max(GAP, point.x), viewportWidth - width - GAP),
    });
  }, [point.x, point.y]);

  React.useLayoutEffect(() => {
    measure();
  }, [measure]);

  // Close on outside pointer-down and on Escape.
  React.useEffect(() => {
    const handlePointerDown = (event: PointerEvent | MouseEvent) => {
      if (
        event.target instanceof Node &&
        menuRef.current?.contains(event.target)
      ) {
        return;
      }
      onCloseRef.current();
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
      }
    };
    document.addEventListener('pointerdown', handlePointerDown, true);
    document.addEventListener('keydown', handleKey, true);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown, true);
      document.removeEventListener('keydown', handleKey, true);
    };
  }, []);

  const handleSelect = (item: InspectorMenuItem) => {
    if (item.disabled) {
      return;
    }
    item.onSelect?.(info);
    onClose();
  };

  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div
      ref={menuRef}
      className={clsx(
        `${prefixCls}-menu`,
        theme === 'dark' && `${prefixCls}-theme-dark`,
      )}
      style={
        position ? { top: position.top, left: position.left } : { visibility: 'hidden' }
      }
      role="menu"
      data-testid="element-inspector-menu"
      // Keep our own right-click from spawning a second menu / the native one.
      onContextMenu={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
    >
      {items.map((item) =>
        item.type === 'divider' ? (
          <div
            key={item.key}
            className={`${prefixCls}-menu-divider`}
            role="separator"
          />
        ) : (
          <div
            key={item.key}
            className={clsx(
              `${prefixCls}-menu-item`,
              item.disabled && 'is-disabled',
              item.danger && 'is-danger',
            )}
            role="menuitem"
            aria-disabled={item.disabled}
            onClick={() => handleSelect(item)}
          >
            {item.icon ? (
              <span className={`${prefixCls}-menu-icon`}>{item.icon}</span>
            ) : null}
            <span className={`${prefixCls}-menu-label`}>{item.label}</span>
          </div>
        ),
      )}
    </div>,
    document.body,
  );
};

export default InspectorMenu;
