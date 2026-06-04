/**
 * Common utility functions used across the application
 * Provides general-purpose utilities like file download and logging
 * @module common-utils
 */

export * from './download';
export { setLogHandler } from './logger';
export type { LogLevel, LogHandler } from './logger';
