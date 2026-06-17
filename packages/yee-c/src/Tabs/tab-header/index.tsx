// tab-header/index.tsx (fully optimized)
import clsx from 'clsx';
import { Ellipsis, Plus } from 'lucide-react';
import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import Button from '../../Button';
import {
  useActiveBar,
  useContainerResize,
  useDropdownVisibility,
  useNavListMove,
  useTabScroll,
} from '../hooks';
import type { TabItemType } from '../interface';
import { TabsCtx } from '../tabs';
import DropDownTabs from './dropdown-tabs';
import TabHeaderTitle from './tab-header-title';

type TabHeaderCtxType = {
  activetab: React.RefObject<HTMLSpanElement | null>;
  navList: React.RefObject<HTMLDivElement | null>;
  navContainer: React.RefObject<HTMLDivElement | null>;
  direction: 'horizontal' | 'vertical';
  refreshDropdownTabs: number;
  setRange: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
};

export const TabHeaderCtx = createContext<TabHeaderCtxType>(
  {} as TabHeaderCtxType,
);

export interface TabHeaderProps {
  prefixCls: string;
  type?: 'card' | 'editable-card';
  position?: 'top' | 'bottom' | 'left' | 'right';
  headerExtra?: {
    prefix?: React.ReactNode | (() => React.ReactNode);
    suffix?: React.ReactNode | (() => React.ReactNode);
  };
  onEdit?: (type: 'add' | 'remove', key?: number | string) => void;
  classNames?: Record<string, string>;
  styles?: Record<string, React.CSSProperties>;
}

const TabHeader: React.FC<TabHeaderProps> = (props) => {
  const { items, activeKey } = useContext(TabsCtx);
  const {
    prefixCls,
    type,
    position = 'top',
    headerExtra,
    classNames,
    styles,
    onEdit,
  } = props;

  const direction =
    position === 'top' || position === 'bottom' ? 'horizontal' : 'vertical';

  // Refs
  const activebar = useRef<HTMLDivElement>(null);
  const activetab = useRef<HTMLSpanElement>(null);
  const navContainer = useRef<HTMLDivElement>(null);
  const navList = useRef<HTMLDivElement>(null);

  // State
  const [range, setRange] = useState<Record<string, boolean>>({});

  // Check whether dropdown is needed
  const { isVisible: moreOpen, checkVisibility } = useDropdownVisibility({
    direction,
    navContainer,
    navList,
    itemsLength: items?.length || 0,
  });

  // Scroll handling
  const { refreshKey } = useTabScroll({
    direction,
    navContainer,
    navList,
    enabled: moreOpen,
  });

  // ActiveBar movement
  useActiveBar({
    direction,
    activeKey,
    activetab,
    activebar,
    enabled: !type, // Only show active bar for non-card types
  });

  // Navigation list movement
  useNavListMove({
    direction,
    activeKey,
    enabled: moreOpen,
    activetab,
    navList,
    navContainer,
    onMoved: checkVisibility,
  });

  // Listen for container size changes
  useContainerResize(navContainer, checkVisibility);

  // Render prefix content
  const renderPrefixExtra = useCallback(() => {
    const { prefix } = headerExtra || {};
    return typeof prefix === 'function' ? prefix() : prefix;
  }, [headerExtra]);

  // Render suffix content
  const renderSuffixExtra = useCallback(() => {
    const { suffix } = headerExtra || {};
    return typeof suffix === 'function' ? suffix() : suffix;
  }, [headerExtra]);

  // Handle adding tab
  const handleAddTab = useCallback(
    (e: React.MouseEvent | React.KeyboardEvent) => {
      e.preventDefault();
      onEdit?.('add');
    },
    [onEdit],
  );

  const handleAddKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handleAddTab(e);
      }
    },
    [handleAddTab],
  );

  const cls = clsx(
    `${prefixCls}-nav-wrapper`,
    `${prefixCls}-nav-wrapper-${position}`,
    classNames?.header,
  );

  const contextValue = {
    activetab,
    navList,
    navContainer,
    direction,
    refreshDropdownTabs: refreshKey,
    setRange,
  } as TabHeaderCtxType;

  return (
    <div className={cls} style={styles?.header}>
      {renderPrefixExtra()}

      <TabHeaderCtx.Provider value={contextValue}>
        <div
          className={clsx(`${prefixCls}-nav-wrap`, classNames?.track)}
          style={styles?.track}
          ref={navContainer}
        >
          <div
            className={clsx(`${prefixCls}-nav-list`, classNames?.list)}
            style={styles?.list}
            ref={navList}
          >
            {items?.map((item: TabItemType, index: number) => (
              <TabHeaderTitle
                {...item}
                $key={item.key}
                key={item.key}
                index={index}
              />
            ))}

            {!type && (
              <div
                className={clsx(
                  `${prefixCls}-active-bar`,
                  classNames?.activeBar,
                )}
                style={styles?.activeBar}
                ref={activebar}
                aria-hidden="true"
              />
            )}

            {type === 'editable-card' && (
              <span
                className={`${prefixCls}-nav-add`}
                onClick={handleAddTab}
                role="button"
                tabIndex={0}
                aria-label="Add tab"
                onKeyDown={handleAddKeyDown}
              >
                <Plus size={14} strokeWidth={1.5} />
              </span>
            )}
          </div>
        </div>

        {moreOpen && (
          <DropDownTabs visible={moreOpen} items={items || []} range={range}>
            <Button
              className={`${prefixCls}-nav-more`}
              icon={<Ellipsis size={14} strokeWidth={1.5} />}
              type="text"
              aria-label="More tabs"
            />
          </DropDownTabs>
        )}
      </TabHeaderCtx.Provider>

      {renderSuffixExtra()}
    </div>
  );
};

export default TabHeader;
