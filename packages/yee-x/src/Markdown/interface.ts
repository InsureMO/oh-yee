import type { Components, Options, UrlTransform } from 'react-markdown';

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
  rehypePlugins?: NonNullable<Options['rehypePlugins']>;
  /**
   * Remark plugin list for processing text
   */
  remarkPlugins?: NonNullable<Options['remarkPlugins']>;
  /**
   * Whether to escape HTML instead of rendering it
   * @default false
   */
  escapeHtml?: boolean;
}
