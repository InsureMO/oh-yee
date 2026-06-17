export interface IndepWinProps {
  /**
   * Whether to enable keyboard shortcut to open the window
   */
  keyboard?: boolean;
  /**
   * The keyboard key to listen for when `keyboard` is true
   * @default O
   */
  keyCode?: string;
  /**
   * The element to display in the window
   */
  element?: HTMLElement | (() => HTMLElement);
  /**
   * The ID of the element to display in the window
   */
  id?: string;
  /**
   * Window width
   * @default 300
   */
  width?: number;
  /**
   * Window height
   * @default 500
   */
  height?: number;
  /**
   * Class name prefix to extract styles for
   */
  extractPrefixCls?: string;
  /**
   * Custom style extraction method
   */
  extractStyles?: (document: Document, pipWindow: Window) => string;
  /**
   * Whether the independent window is open
   */
  open?: boolean;
  /**
   * Callback when the independent window is opened or closed
   */
  onOpenChange?: (open: boolean) => void;
}
