/**
 * AIRenderer - Core renderer component
 * Dynamically renders React components based on UI Schema
 */

import React, { useMemo } from 'react';
import { defaultComponentMap } from './defaultComponentMap';
import type { AIRendererProps, RenderContext } from './interface';
import { handleEvent, resolveDataBindings } from './utils';

export const AIRenderer: React.FC<AIRendererProps> = ({
  schema,
  componentMap: customComponentMap,
  onUpdate,
  className,
  style,
}) => {
  // Merge default and custom component mappings
  const componentMap = useMemo(
    () => ({ ...defaultComponentMap, ...customComponentMap }),
    [customComponentMap],
  );

  // Create rendering context
  const context: RenderContext = useMemo(
    () => ({
      data: schema.data || {},
      schema,
      onUpdate,
    }),
    [schema, onUpdate],
  );

  // Render a single component
  const renderComponent = (componentId: string): React.ReactNode => {
    const component = schema.components[componentId];

    // Skip when component doesn't exist (supports progressive rendering)
    if (!component) {
      return null;
    }

    // Look up component mapping
    const mapping = componentMap[component.type];

    // Render fallback when component type is not found
    if (!mapping) {
      console.warn(`Unknown component type: ${component.type}`);
      return (
        <div
          key={componentId}
          style={{
            padding: '8px',
            border: '1px dashed #ccc',
            borderRadius: '4px',
            color: '#999',
          }}
        >
          Unknown component: {component.type}
        </div>
      );
    }

    const Component = mapping.component;

    // Apply propsTransformer
    let props = { ...component.props };
    if (mapping.propsTransformer) {
      props = resolveDataBindings(props, context.data);
      const filtered = Object.fromEntries(
        Object.entries(props).filter(
          ([, value]) => !(typeof value === 'string' && value.startsWith('$')),
        ),
      );
      props = mapping.propsTransformer(filtered, { ...context, componentId });
    } else {
      // Resolve data bindings by default
      props = resolveDataBindings(props, context.data);
    }

    // Handle events
    if (component.events) {
      for (const [eventName, eventConfig] of Object.entries(component.events)) {
        props[eventName] = async (eventData: any) => {
          try {
            await handleEvent(eventConfig, eventData, context);
          } catch (error) {
            console.error(`Event handler error (${eventName}):`, error);
            throw error;
          }
        };
      }
    }

    // Recursively render child components
    const children = component.children?.map((childId) =>
      renderComponent(childId),
    );

    if (!children) {
      return <Component key={componentId} {...props} />;
    }
    const count = React.Children.count(children);
    return (
      <Component key={componentId} {...props}>
        {count === 1 ? React.Children.toArray(children)[0] : children}
      </Component>
    );
  };

  // If root is not set, display a loading indicator
  if (!schema.root) {
    return null;
  }

  // Render root component
  return (
    <div className={className} style={style}>
      {renderComponent(schema.root)}
    </div>
  );
};
