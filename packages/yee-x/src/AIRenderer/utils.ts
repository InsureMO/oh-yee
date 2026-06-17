/**
 * AIRenderer utility functions
 */

import type { Component, StreamMessage, UISchema } from './interface';

/**
 * Get a value from an object by path
 * Supports dot-separated nested paths (e.g. "user.profile.name")
 *
 * @param obj - Source object
 * @param path - Dot-separated path
 * @returns The value at the path, or undefined if the path doesn't exist
 *
 * @example
 * ```ts
 * const obj = { user: { profile: { name: 'John' } } };
 * getValueByPath(obj, 'user.profile.name'); // 'John'
 * getValueByPath(obj, 'user.age'); // undefined
 * ```
 */
export function getValueByPath(obj: any, path: string): any {
  if (!obj || !path) {
    return undefined;
  }

  return path.split('.').reduce((acc, part) => acc?.[part], obj);
}

/**
 * Set a value in an object by path
 * Supports dot-separated nested paths; creates intermediate objects if they don't exist
 *
 * @param obj - Source object
 * @param path - Dot-separated path
 * @param value - Value to set
 * @returns A new object (does not mutate the original)
 *
 * @example
 * ```ts
 * const obj = { user: { name: 'John' } };
 * setValueByPath(obj, 'user.age', 30);
 * // { user: { name: 'John', age: 30 } }
 *
 * setValueByPath(obj, 'user.profile.city', 'NYC');
 * // { user: { name: 'John', profile: { city: 'NYC' } } }
 * ```
 */
export function setValueByPath(obj: any, path: string, value: any): any {
  if (!path) {
    return obj;
  }

  const parts = path.split('.');
  const result = { ...obj };
  let current: any = result;

  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!current[part] || typeof current[part] !== 'object') {
      current[part] = {};
    } else {
      current[part] = { ...current[part] };
    }
    current = current[part];
  }

  current[parts[parts.length - 1]] = value;
  return result;
}

/**
 * Resolve all data bindings in props
 * Replaces all string values starting with $data. with actual values from the data model
 *
 * @param props - Component properties object
 * @param data - Data model
 * @returns Resolved properties object
 *
 * @example
 * ```ts
 * const props = {
 *   title: 'Hello',
 *   content: '$data.user.name',
 *   count: '$data.stats.total'
 * };
 * const data = {
 *   user: { name: 'John' },
 *   stats: { total: 42 }
 * };
 * resolveDataBindings(props, data);
 * // { title: 'Hello', content: 'John', count: 42 }
 * ```
 */
export function resolveDataBindings(
  props: Record<string, any>,
  data: Record<string, any>,
): Record<string, any> {
  const resolved: Record<string, any> = {};

  for (const [key, value] of Object.entries(props)) {
    if (typeof value === 'string') {
      const index = value.indexOf('$data.');
      if (index === 0) {
        const path = value.substring(6); // Strip "$data."
        resolved[key] = getValueByPath(data, path);
      } else if (index > 0) {
        const vars = value.match(/\$data\.\w+/g);
        let _value = value;
        if (Array.isArray(vars)) {
          vars.forEach((item) => {
            const path = item.substring(6);
            const dataValue = getValueByPath(data, path);
            _value = _value.replace(item, dataValue);
          });
        }
        resolved[key] = _value;
      } else {
        resolved[key] = value;
      }
    } else {
      resolved[key] = value;
    }
  }

  return resolved;
}

/**
 * Parse streaming message string
 * Splits by line and parses each line as a JSON object
 * Lines that fail to parse are skipped and logged as errors
 *
 * @param content - Streaming content string (one JSON object per line)
 * @returns Array of successfully parsed messages
 *
 * @example
 * ```ts
 * const content = `
 * {"op":"init","path":"root","value":"card"}
 * {"op":"add","path":"components.card","value":{...}}
 * invalid json
 * {"op":"setData","path":"user","value":{"name":"John"}}
 * `;
 * parseStreamMessages(content);
 * // [
 * //   { op: 'init', path: 'root', value: 'card' },
 * //   { op: 'add', path: 'components.card', value: {...} },
 * //   { op: 'setData', path: 'user', value: { name: 'John' } }
 * // ]
 * ```
 */
export function parseStreamMessages(content: string): StreamMessage[] {
  const lines = content.split('\n').filter((line) => line.trim());
  const messages: StreamMessage[] = [];

  for (const line of lines) {
    try {
      const message = JSON.parse(line) as StreamMessage;
      messages.push(message);
    } catch (error) {
      console.warn('Failed to parse stream message:', line, error);
      // Skip lines that fail to parse and continue
    }
  }

  return messages;
}

/**
 * Apply a single streaming message to the UI Schema
 *
 * @param schema - Current UI Schema
 * @param message - Streaming message
 * @returns Updated UI Schema
 *
 * @example
 * ```ts
 * let schema = { components: {}, data: {} };
 *
 * schema = applyStreamMessage(schema, {
 *   op: 'init',
 *   path: 'root',
 *   value: 'card-1'
 * });
 * // { root: 'card-1', components: {}, data: {} }
 *
 * schema = applyStreamMessage(schema, {
 *   op: 'add',
 *   path: 'components.card-1',
 *   value: { type: 'card', props: { title: 'Hello' } }
 * });
 * // { root: 'card-1', components: { 'card-1': {...} }, data: {} }
 * ```
 */
export function applyStreamMessage(
  schema: UISchema,
  message: StreamMessage,
): UISchema {
  const newSchema = { ...schema };

  switch (message.op) {
    case 'init':
      if (message.path === 'root') {
        newSchema.root = message.value;
      }
      break;

    case 'add':
    case 'update':
      if (message.path.startsWith('components.')) {
        const componentId = message.path.substring(11); // Strip "components."
        newSchema.components = {
          ...newSchema.components,
          [componentId]: message.value as Component,
        };
      }
      break;

    case 'delete':
      if (message.path.startsWith('components.')) {
        const componentId = message.path.substring(11);
        const rest = { ...newSchema.components };
        delete rest[componentId];
        newSchema.components = rest;
      }
      break;

    case 'setData':
      newSchema.data = setValueByPath(
        newSchema.data || {},
        message.path,
        message.value,
      );
      break;
  }

  return newSchema;
}

/**
 * Batch-apply streaming messages to the UI Schema
 *
 * @param schema - Initial UI Schema
 * @param messages - Array of streaming messages
 * @returns Final UI Schema
 *
 * @example
 * ```ts
 * const schema = { components: {}, data: {} };
 * const messages = [
 *   { op: 'init', path: 'root', value: 'card' },
 *   { op: 'add', path: 'components.card', value: {...} },
 *   { op: 'setData', path: 'user', value: { name: 'John' } }
 * ];
 * const result = applyStreamMessages(schema, messages);
 * ```
 */
export function applyStreamMessages(
  schema: UISchema,
  messages: StreamMessage[],
): UISchema {
  return messages.reduce(
    (currentSchema, message) => applyStreamMessage(currentSchema, message),
    schema,
  );
}

/**
 * Handle event configuration
 * Supports API calls, data updates, and other event types
 *
 * @param eventConfig - Event configuration
 * @param eventData - Event data (e.g. form values)
 * @param context - Rendering context
 *
 * @example
 * ```ts
 * const eventConfig = {
 *   type: 'api',
 *   url: '/api/register',
 *   method: 'POST',
 *   body: '$data.form'
 * };
 * const formValues = { name: 'John', email: 'john@example.com' };
 * await handleEvent(eventConfig, formValues, context);
 * ```
 */
export async function handleEvent(
  eventConfig: any,
  eventData: any,
  context: { data: Record<string, any>; onUpdate?: (update: any) => void },
): Promise<void> {
  if (eventConfig.type === 'api') {
    // Resolve data references in the request body
    let body: any;

    if (
      typeof eventConfig.body === 'string' &&
      eventConfig.body.startsWith('$data.')
    ) {
      const path = eventConfig.body.substring(6);
      body = path === 'form' ? eventData : getValueByPath(context.data, path);
    } else if (typeof eventConfig.body === 'object') {
      body = resolveDataBindings(eventConfig.body, context.data);
    } else {
      body = eventData;
    }

    // Send API request
    const response = await fetch(eventConfig.url, {
      method: eventConfig.method || 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...eventConfig.headers,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }

    const result = await response.json();

    // Trigger update callback
    context.onUpdate?.({
      data: { ...context.data, result },
    });
  }
}
