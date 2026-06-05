import React from 'react';
import { TriggerProps } from '../Trigger';

export type CompositionDOM = 'header' | 'title' | 'description' | 'footer';

export interface PopconfirmProps extends Omit<
  TriggerProps,
  'popup' | 'children' | 'ref'
> {
  /**
   * 子元素
   */
  children: React.ReactNode;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 图标
   */
  icon?: React.ReactNode;
  /**
   * title
   */
  title?: React.ReactNode | (() => React.ReactNode);
  /**
   * description
   */
  description?: React.ReactNode | (() => React.ReactNode);
  /**
   * confirm popup style
   */
  style?: React.CSSProperties;
  /**
   * confirm popup class name
   */
  className?: string;
  /**
   * Structured style
   */
  styles?: Partial<Record<CompositionDOM, React.CSSProperties>>;
  /**
   * Structured class name
   */
  classNames?: Partial<Record<CompositionDOM, string>>;
  /**
   * open, controllered
   * */
  open?: boolean;
  /**
   * placement
   */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * 设置确认按钮文本
   * */
  confirmText?: string;
  /**
   * 设置取消按钮文本
   * */
  cancelText?: string;
  /**
   * 确认回调
   */
  onConfirm?: () => void;
  /**
   * 取消回调
   */
  onCancel?: () => void;
}
