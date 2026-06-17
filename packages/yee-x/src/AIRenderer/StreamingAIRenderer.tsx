/**
 * StreamingAIRenderer - Streaming renderer component
 * Receives streaming content string, parses and renders UI
 */

import { Spin } from '@rainbow-oh/yee-c';
import React, { useMemo } from 'react';
import { AIRenderer } from './AIRenderer';
import { AIRendererErrorBoundary } from './AIRendererErrorBoundary';
import type { StreamingAIRendererProps, UISchema } from './interface';
import { applyStreamMessages, parseStreamMessages } from './utils';

export const StreamingAIRenderer: React.FC<StreamingAIRendererProps> = ({
  content,
  isStreaming = false,
  componentMap,
  onUpdate,
  loadingComponent,
  errorComponent,
  className,
  style,
}) => {
  // Parse streaming content into UI Schema
  const schema: UISchema = useMemo(() => {
    if (!content || !content.trim()) {
      return { components: {}, data: {} };
    }

    try {
      // Try to parse as complete JSON
      const parsed = JSON.parse(content);
      if (parsed.components) {
        return parsed as UISchema;
      }
    } catch {
      // Not complete JSON, process as streaming messages
    }

    // Parse streaming messages
    const messages = parseStreamMessages(content);

    // Apply messages to build UI Schema
    const initialSchema: UISchema = { components: {}, data: {} };
    return applyStreamMessages(initialSchema, messages);
  }, [content]);

  // If there is no content and streaming is in progress, show loading component
  if (!content && isStreaming) {
    if (loadingComponent) {
      return <>{loadingComponent}</>;
    }
    return (
      <div className={className} style={style}>
        <Spin />
      </div>
    );
  }

  // Render UI
  return (
    <AIRendererErrorBoundary fallback={errorComponent}>
      <AIRenderer
        schema={schema}
        componentMap={componentMap}
        onUpdate={onUpdate}
        className={className}
        style={style}
      />
    </AIRendererErrorBoundary>
  );
};
