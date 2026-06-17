import type { MenuItemType } from '@rainbow-oh/yee-c';

export type CommandItem = MenuItemType & {
  [prop: string]: any;
};

export interface CommandsProps {
  /**
   * Custom class name prefix
   */
  prefixCls?: string;
  /**
   * Command shortcut list
   */
  items: Record<string, Array<CommandItem>>;
  /**
   * Custom input element
   */
  children: ({
    onTrigger,
    onKeyDown,
  }: {
    onTrigger: (key?: string) => void;
    onKeyDown?: (e: KeyboardEvent) => void;
  }) => React.ReactElement;
  /**
   * Controlled open state for the command panel
   */
  open?: boolean;
  /**
   * Callback when a command item is selected
   */
  onSelect?: (params: {
    item?: CommandItem;
    key?: string;
    keyPath?: Array<string>;
    selectedKeys?: Array<string>;
  }) => void;
  /**
   * Callback when the command panel open state changes
   */
  onOpenChange?: (open: boolean) => void;
}
