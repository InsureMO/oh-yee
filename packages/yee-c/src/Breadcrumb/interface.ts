import type { DataAttributeProps } from '../utils/types';

export type BreadcrumbSemanticDOM = 'item' | 'separator' | 'list';

export interface BreadcrumbItemProps extends DataAttributeProps {
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Custom style
   */
  style?: React.CSSProperties;
  /**
   * Breadcrumb item title
   */
  title?: React.ReactNode | (() => React.ReactNode);
  /**
   * Link URL
   */
  href?: string;
  /**
   * Click event callback
   */
  onClick?: (params: { index: number }) => void;
}

export interface BreadcrumbProps extends DataAttributeProps {
  /**
   * Class name prefix
   */
  prefixCls?: string;
  /**
   * Children
   */
  children?: React.ReactNode;
  /**
   * Custom separator
   * @default /
   */
  separator?: React.ReactNode;
  /**
   * Custom root element class name
   */
  className?: string;
  /**
   * Custom root element style
   */
  style?: React.CSSProperties;
  /**
   * Breadcrumb item configuration
   */
  items?: Array<BreadcrumbItemProps>;
  /**
   * Semantic class names
   */
  classNames?: Partial<Record<BreadcrumbSemanticDOM, string>>;
  /**
   * Semantic styles
   */
  styles?: Partial<Record<BreadcrumbSemanticDOM, React.CSSProperties>>;
}
