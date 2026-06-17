/**
 * AIRenderer - Dynamic UI rendering system for AI conversation scenarios
 *
 * @example
 * ```tsx
 * import { AIRenderer } from '@rainbow-oh/yee-x';
 *
 * const schema = {
 *   root: 'form-card',
 *   components: {
 *     'form-card': {
 *       type: 'card',
 *       props: { title: 'User Registration' },
 *       children: ['user-form']
 *     }
 *   }
 * };
 *
 * <AIRenderer schema={schema} />
 * ```
 */

import { AIRenderer } from './AIRenderer';

// Export type definitions
export type {
  AIRendererProps,
  Component,
  ComponentMapping,
  EventConfig,
  RenderContext,
  StreamingAIRendererProps,
  StreamMessage,
  UISchema,
} from './interface';

// Export components
export { AIRenderer } from './AIRenderer';
export { AIRendererErrorBoundary } from './AIRendererErrorBoundary';
export { AIRendererMarkdown } from './AIRendererMarkdown';
export { defaultComponentMap } from './defaultComponentMap';
export { StreamingAIRenderer } from './StreamingAIRenderer';

// Export utility functions
export {
  applyStreamMessage,
  applyStreamMessages,
  getValueByPath,
  handleEvent,
  parseStreamMessages,
  resolveDataBindings,
  setValueByPath,
} from './utils';

export default AIRenderer;
