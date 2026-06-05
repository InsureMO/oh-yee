import React from 'react';

export interface PortalProps {
  /**
   * Children elements
   */
  children: React.ReactElement;
  /**
   * Whether open
   */
  open: boolean;
  /**
   * Whether to destroy on close
   */
  destroyOnClose?: boolean;
  /**
   * Prefix class name
   */
  prefixCls?: string;
  /**
   * Trigger node
   */
  triggerNode?: HTMLElement;
  /**
   * Get container
   */
  getContainer?: string | HTMLElement | (() => HTMLElement);
}
