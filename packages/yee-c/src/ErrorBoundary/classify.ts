import type { ErrorCategory } from './interface';

export function classifyError(error: Error | null): ErrorCategory {
  if (!error) return 'unknown';

  if (
    error.name === 'ChunkLoadError' ||
    /Loading (CSS |JS )?chunk/i.test(error.message) ||
    /Loading chunk \d+ failed/i.test(error.message)
  ) {
    return 'chunk';
  }

  if (
    /Failed to fetch/i.test(error.message) ||
    /NetworkError/i.test(error.message) ||
    /Network request failed/i.test(error.message) ||
    /request has been timed out/i.test(error.message) ||
    error.name === 'TimeoutError'
  ) {
    return 'network';
  }

  if (error instanceof TypeError) return 'type';
  if (error instanceof ReferenceError) return 'reference';
  if (error instanceof RangeError) return 'range';
  if (error instanceof SyntaxError) return 'syntax';
  if (error instanceof URIError) return 'uri';

  return 'unknown';
}

export const CATEGORY_LABEL: Record<ErrorCategory, string> = {
  type: 'TypeError',
  reference: 'ReferenceError',
  range: 'RangeError',
  syntax: 'SyntaxError',
  uri: 'URIError',
  chunk: 'ChunkLoadError',
  network: 'NetworkError',
  resource: 'ResourceError',
  unknown: 'Error',
};
