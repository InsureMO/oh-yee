export type SenderSemanticType = 'actions' | 'affix' | 'content' | 'prefix';

export interface SenderHeaderProps {
  /**
   * Panel title
   */
  title?: React.ReactNode;
  /**
   * Whether the panel is closable
   * @default true
   */
  closable?: boolean;
  /**
   * Controlled open state
   */
  open?: boolean;
  /**
   * Panel content
   */
  children: React.ReactNode;
  /**
   * Callback when the open state changes
   */
  onOpenChange?: (open: boolean) => void;
}

export interface SenderProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    'value' | 'onChange' | 'prefix' | 'onKeyDown'
  > {
  /**
   * Prefix content
   */
  prefix?: React.ReactNode;
  /**
   * Content attached to the top of the input
   */
  affix?: React.ReactNode;
  /**
   * Header panel above the input
   * */
  header?: React.ReactNode;
  /**
   * Footer panel below the input
   */
  footer?: React.ReactNode;
  /**
   * Custom prefix class name
   */
  prefixCls?: string;
  /**
   * Class names for structural sections
   */
  classNames?: Partial<Record<SenderSemanticType, string>>;
  /**
   * Inline styles for structural sections
   */
  styles?: Partial<Record<SenderSemanticType, React.CSSProperties>>;
  /**
   * Custom action buttons
   */
  actions?: React.ReactNode;
  /**
   * Whether the sender is loading
   */
  loading?: boolean;
  /**
   * Whether the sender is disabled
   */
  disabled?: boolean;
  /**
   * Default value
   */
  defaultValue?: string;
  /**
   * Theme
   * @default light
   */
  theme?: 'light' | 'dark';
  /**
   * Input value
   */
  value?: string;
  /**
   * Controls line break and send behavior
   */
  sendKey?: 'enter' | 'altEnter';
  /**
   * Auto-resize height of the input
   * @default '{ minRows: 2, maxRows: 4}'
   */
  autoSize?: { minRows?: number; maxRows?: number };
  /**
   * Callback when the send button is clicked
   */
  onSend?: (message: string) => void;
  /**
   * Callback when the input value changes
   */
  onChange?: (value: string) => void;
  /**
   * Callback when the stop button is clicked
   */
  onStop?: () => void;
  /**
   * Keyboard event handler
   */
  onKeyDown?: (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => void | boolean;
}
