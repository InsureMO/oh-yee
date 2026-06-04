/**
 * Lightweight logger utility for the library.
 * All internal logging goes through this module so consumers can
 * override the behaviour if needed.
 *
 * @module logger
 */

export type LogLevel = 'warn' | 'error';

export type LogHandler = (level: LogLevel, ...args: unknown[]) => void;

let handler: LogHandler = (level, ...args) => {
  if (typeof console !== 'undefined') {
    console[level]('[yee-tools]', ...args);
  }
};

/**
 * Override the default log handler.
 *
 * @example
 * ```ts
 * import { setLogHandler } from '@oh/yee-tools';
 *
 * // Silence all library logs
 * setLogHandler(() => {});
 *
 * // Send logs to a custom sink
 * setLogHandler((level, ...args) => myLogger[level](...args));
 * ```
 */
export function setLogHandler(fn: LogHandler): void {
  handler = fn;
}

/** @internal */
export function warn(...args: unknown[]): void {
  handler('warn', ...args);
}

/** @internal */
export function error(...args: unknown[]): void {
  handler('error', ...args);
}
