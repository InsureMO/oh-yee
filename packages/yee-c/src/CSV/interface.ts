import { ButtonType } from '../Button';
import type { DataAttributeProps } from '../utils/types';

export interface CSVDownloderProps extends DataAttributeProps {
  /**
   * Custom class name prefix
   */
  prefixCls?: string;
  /**
   * Button type
   * @default link
   */
  type?: ButtonType;
  /**
   * Download filename
   * @default timestamp
   */
  filename?: string;
  /**
   * CSV data
   */
  data: Array<Record<string, any>> | (() => Array<Record<string, any>>);
  /**
   * Headers
   */
  headers?: Array<{ key: string; label: string }>;
  /**
   * Separator
   * @default ,
   */
  separator?: string;
  /**
   * Enclosing character for strings
   * @default "
   */
  enclosingCharacter?: string;
  /**
   * Whether to add BOM to indicate file encoding
   */
  uFEFF?: boolean;
  /**
   * Child elements
   */
  children?: React.ReactNode;
  /**
   * Click event
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => boolean | void;
  /**
   * Async click event
   */
  asyncOnClick?: (
    event: React.MouseEvent<HTMLElement>,
    callback: (next: boolean) => void,
  ) => void;
}
