/**
 * AIRendererMarkdownComponent - Markdown integration component
 * Used to embed AI-rendered UI within Markdown content
 *
 * Usage:
 * ```markdown
 * <ai-renderer>
 * {"op":"init","path":"root","value":"card"}
 * {"op":"add","path":"components.card","value":{...}}
 * </ai-renderer>
 * ```
 */

import React from 'react';
import { StreamingAIRenderer } from './StreamingAIRenderer';
import type { ComponentMapping } from './interface';

interface AIRendererMarkdownProps {
  children?: React.ReactNode;
  componentMap?: Record<string, ComponentMapping>;
  onUpdate?: (update: any) => void;
}

export const AIRendererMarkdown: React.FC<AIRendererMarkdownProps> = ({
  children,
  componentMap,
  onUpdate,
}) => {
  // Extract text content from children
  const content = React.useMemo(() => {
    if (typeof children === 'string') {
      return children;
    }
    if (
      React.isValidElement(children) &&
      typeof (children.props as any).children === 'string'
    ) {
      return (children.props as any).children;
    }

    // Try to extract text from multiple child elements
    if (Array.isArray(children)) {
      return children
        .map((child) => {
          if (typeof child === 'string') return child;
          if (React.isValidElement(child)) {
            const props = child.props as any;
            if (typeof props.children === 'string') {
              return props.children;
            }
          }
          return '';
        })
        .join('\n');
    }

    return '';
  }, [children]);

  return (
    <StreamingAIRenderer
      content={content}
      componentMap={componentMap}
      onUpdate={onUpdate}
    />
  );
};
