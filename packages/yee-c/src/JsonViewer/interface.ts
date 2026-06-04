import type { DataAttributeProps } from '../utils/types';

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

export interface JsonViewerProps extends DataAttributeProps {
  /**
   * Custom prefix class name
   * */
  prefixCls?: string;
  /**
   * Display data
   * */
  data: JsonValue;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Custom style
   */
  style?: React.CSSProperties;
  /**
   * Custom colors
   */
  colors?: {
    key?: string;
    array?: Array<string>;
    object?: Array<string>;
    string?: string;
    number?: string;
    boolean?: string;
    null?: string;
    undefined?: string;
  };
}

export interface InternalJsonViewer extends JsonViewerProps {
  /**
   * Current depth level
   */
  depth?: number;
  /**
   * Key of the current level
   */
  name?: string;
  /**
   * Whether it is the last item
   */
  latest?: boolean;
}
