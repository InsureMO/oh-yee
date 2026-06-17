import { Components, UrlTransform } from 'react-markdown';

export interface MarkdownProps {
  /**
   * Custom class name prefix
   */
  prefixCls?: string;
  /**
   * Custom root class name
   */
  className?: string;
  /**
   * Markdown content
   */
  markdown: string;
  /**
   * Custom HTML tag transformation
   */
  components?: Components;
  /**
   * URL transformer
   */
  urlTransform?: UrlTransform;
  /**
   * Rehype plugin list for processing HTML
   */
  rehypePlugins?: Array<any>;
  /**
   * Remark plugin list for processing text
   */
  remarkPlugins?: Array<any>;
  /**
   * Whether to escape HTML instead of rendering it
   * @default false
   */
  escapeHtml?: boolean;
}
