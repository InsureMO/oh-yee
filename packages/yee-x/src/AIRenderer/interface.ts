/**
 * AIRenderer type definitions
 * Dynamic UI rendering system for AI conversation scenarios
 */

// UI Schema - Complete UI definition
export interface UISchema {
  root?: string; // Root component ID
  components: Record<string, Component>; // Component definitions (object form)
  data?: Record<string, any>; // Data model
}

// Component - Component definition
export interface Component {
  type: string; // Component type (e.g. "form", "input")
  props: Record<string, any>; // Component properties
  children?: string[]; // Child component ID array
  events?: Record<string, EventConfig>; // Event configuration
}

// EventConfig - Event configuration
export interface EventConfig {
  type: 'api' | 'update' | 'custom'; // Event type
  url?: string; // API endpoint
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any; // Request body (supports $data. references)
  headers?: Record<string, string>; // Request headers
  updatePath?: string; // Data update path (for update type)
  action?: string; // Custom action name (for custom type)
  payload?: any; // Custom data (for custom type)
}

// StreamMessage - Streaming update message
export interface StreamMessage {
  op: 'init' | 'add' | 'update' | 'delete' | 'setData';
  path: string; // Operation path
  value?: any; // Value
}

// ComponentMapping - Component mapping configuration
export interface ComponentMapping {
  component: React.ComponentType<any>; // React component
  propsTransformer?: (
    props: Record<string, any>,
    context: RenderContext,
  ) => Record<string, any>;
}

// RenderContext - Rendering context
export interface RenderContext {
  data: Record<string, any>; // Current data model
  schema: UISchema; // Current UI Schema
  componentId?: string; // Current component ID
  onUpdate?: (update: Partial<UISchema>) => void; // Update callback
}

// AIRendererProps - AIRenderer component properties
export interface AIRendererProps {
  schema: UISchema; // UI Schema
  componentMap?: Record<string, ComponentMapping>; // Custom component mapping
  onUpdate?: (update: Partial<UISchema>) => void; // Update callback
  className?: string; // Custom class name
  style?: React.CSSProperties; // Custom styles
}

// StreamingAIRendererProps - Streaming renderer properties
export interface StreamingAIRendererProps {
  content: string; // Streaming content string
  isStreaming?: boolean; // Whether currently streaming
  componentMap?: Record<string, ComponentMapping>; // Custom component mapping
  onUpdate?: (update: Partial<UISchema>) => void; // Update callback
  loadingComponent?: React.ReactNode; // Custom loading component
  errorComponent?: React.ReactNode; // Custom error component
  className?: string; // Custom class name
  style?: React.CSSProperties; // Custom styles
}
