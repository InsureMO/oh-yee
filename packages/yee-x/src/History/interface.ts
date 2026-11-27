import type { MenuItemType, TriggerProps } from '@rainbow-oh/yee-c';
import React, { CSSProperties } from 'react';

type SemanticDOM = 'menu';

export interface HistoryItem {
  /** Unique key of the session item */
  key: string | number;
  /** Primary label (first line) */
  label: React.ReactNode;
  /**
   * Group label. Consecutive items sharing the same group render under one
   * group header (e.g. `Today`, `Previous 7 days`). Items without a group
   * render without a header, preserving list order.
   */
  group?: React.ReactNode;
  /** Muted second line (e.g. last-active time) */
  description?: React.ReactNode;
  /** Right-aligned node on the first line (e.g. a status tag) */
  extra?: React.ReactNode;
  [prop: string]: unknown;
}

export type HistoryMenu = MenuItemType;

export interface HistoryProps {
  /** Session items, rendered top-down; grouping follows encounter order */
  items: HistoryItem[];
  /** Per-row dropdown menu (triggered by the ellipsis icon) */
  menu?: HistoryMenu[];
  /** Extra props for the per-row ellipsis Trigger (e.g. popupClassName,
   *  popupStyle, mouseEnterDelay). `popup` is rendered by History and
   *  cannot be overridden; use `classNames.menu` / `styles.menu` to style
   *  the dropdown menu itself. */
  triggerProps?: TriggerProps;
  /** Panel width @default 240 */
  width?: number | string;
  /** Key of the currently active item; rendered with the active highlight */
  activeKey?: string | number;
  onItemClick?: (item: HistoryItem) => void;
  onMenuClick?: (menu: HistoryMenu, item: HistoryItem) => void;

  classNames?: Partial<Record<SemanticDOM, string>>;
  styles?: Partial<Record<SemanticDOM, CSSProperties>>;
}
