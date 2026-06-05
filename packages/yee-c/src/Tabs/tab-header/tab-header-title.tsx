// tab-header/tab-header-title.tsx (optimized)
import clsx from 'clsx';
import { X } from 'lucide-react';
import React, { useCallback, useContext, useEffect, useRef } from 'react';
import Button from '../../Button';
import { TabsItemProps } from '../interface';
import { TabsCtx } from '../tabs';
import { isInContainer } from '../utils/tab-utils';
import { TabHeaderCtx } from './index';

const TabHeaderTitle: React.FC<TabsItemProps> = (props) => {
  const { prefixCls, activeKey, type, onEdit, onTabClick } =
    useContext(TabsCtx);
  const {
    activetab,
    direction,
    navList,
    navContainer,
    setRange,
    refreshDropdownTabs,
  } = useContext(TabHeaderCtx);

  const {
    $key,
    index,
    icon,
    label,
    disabled,
    badge,
    closable = true,
    renderKeys,
    dropdown,
    ...rest
  } = props;

  const tabRef = useRef<HTMLDivElement>(null);

  const cls = clsx(`${prefixCls}-tab`, {
    active: activeKey === $key,
    disabled: disabled,
  });

  const handleTabClick = useCallback(() => {
    if (disabled) return;
    onTabClick?.($key);
  }, [disabled, onTabClick, $key]);

  const handleEdit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onEdit?.('remove', $key);
    },
    [onEdit, $key],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;

      const getEnabledTabs = (): HTMLElement[] => {
        const parent = tabRef.current?.parentElement;
        if (!parent) return [];
        return Array.from(
          parent.querySelectorAll<HTMLElement>(
            '[role="tab"]:not([aria-disabled="true"])',
          ),
        );
      };

      const focusTab = (tab: HTMLElement) => {
        tab.focus();
        tab.click();
      };

      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          handleTabClick();
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          {
            const tabs = getEnabledTabs();
            const idx = tabs.indexOf(tabRef.current!);
            if (idx >= 0 && tabs.length > 0) {
              focusTab(tabs[(idx + 1) % tabs.length]);
            }
          }
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          {
            const tabs = getEnabledTabs();
            const idx = tabs.indexOf(tabRef.current!);
            if (idx >= 0 && tabs.length > 0) {
              focusTab(tabs[(idx - 1 + tabs.length) % tabs.length]);
            }
          }
          break;
        case 'Home':
          e.preventDefault();
          {
            const tabs = getEnabledTabs();
            if (tabs.length > 0) focusTab(tabs[0]);
          }
          break;
        case 'End':
          e.preventDefault();
          {
            const tabs = getEnabledTabs();
            if (tabs.length > 0) focusTab(tabs[tabs.length - 1]);
          }
          break;
        case 'Delete':
          if (closable && type === 'editable-card') {
            e.preventDefault();
            onEdit?.('remove', $key);
          }
          break;
      }
    },
    [disabled, handleTabClick, closable, type, onEdit, $key],
  );

  // Update activetab ref
  useEffect(() => {
    if (dropdown) return;

    const isActive = activeKey === $key || renderKeys?.includes(activeKey);
    if (isActive && tabRef.current) {
      activetab.current = tabRef.current;
    }
  }, [activeKey, $key, renderKeys, dropdown, activetab]);

  // Update dropdown range
  useEffect(() => {
    if (dropdown || typeof index !== 'number') return;

    const tab = tabRef.current;
    const list = navList.current;
    const container = navContainer.current;

    if (!tab || !list || !container) return;

    const [isVisible] = isInContainer(direction, tab, list, container);

    setRange((prevRange: Record<string, boolean>) => ({
      ...prevRange,
      [index]: !isVisible,
    }));
  }, [
    refreshDropdownTabs,
    dropdown,
    index,
    direction,
    navList,
    navContainer,
    setRange,
  ]);

  return (
    <div
      {...rest}
      ref={tabRef}
      role="tab"
      aria-selected={activeKey === $key}
      aria-disabled={disabled}
      className={cls}
      tabIndex={disabled ? -1 : 0}
      onClick={handleTabClick}
      onKeyDown={handleKeyDown}
    >
      {icon && <span className={`${prefixCls}-tab-icon`}>{icon}</span>}

      <div className={`${prefixCls}-tab-title`}>{label}</div>

      {closable && type === 'editable-card' && (
        <Button
          type="text"
          size="small"
          icon={<X size={14} />}
          onClick={handleEdit}
          aria-label={`Close ${label}`}
        />
      )}

      {typeof badge !== 'undefined' && (
        <span
          className={`${prefixCls}-tab-badge`}
          aria-label={`${badge} notifications`}
        >
          {badge}
        </span>
      )}
    </div>
  );
};

export default React.memo(TabHeaderTitle);
