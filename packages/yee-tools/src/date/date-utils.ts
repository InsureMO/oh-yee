/**
 * Date utility functions for date formatting and manipulation
 * @ohdule date-utils
 */

import dayjs from "dayjs";

/**
 * Default datetime format for submission
 */
export const DEFAULT_DATETIME_SUBMIT_FORMAT = "YYYY-MM-DD HH:mm:ss";

/**
 * Default datetime format for display
 */
export const DEFAULT_DATETIME_VIEW_FORMAT = "YYYY-MM-DD HH:mm:ss";

/**
 * Gets the current date and time as a formatted string
 * @param format - Optional format string (defaults to DEFAULT_DATETIME_SUBMIT_FORMAT)
 * @returns The current date and time as a formatted string
 * @example
 * ```ts
 * getCurrentDateTime() // '2024-01-15 14:30:00'
 * getCurrentDateTime('YYYY-MM-DD') // '2024-01-15'
 * ```
 */
export function getCurrentDateTime(
  format: string = DEFAULT_DATETIME_SUBMIT_FORMAT,
): string {
  return dayjs().format(format);
}

/**
 * Formats a string date to a standardized format
 * @param date - The date string to format
 * @param inputFormat - The format of the input date string
 * @param outputFormat - Optional output format (defaults to DEFAULT_DATETIME_SUBMIT_FORMAT)
 * @returns The formatted date string
 * @example
 * ```ts
 * formatStringToDate('15/01/2024', 'DD/MM/YYYY') // '2024-01-15 00:00:00'
 * ```
 */
export function formatStringToDate(
  date: string,
  inputFormat: string,
  outputFormat: string = DEFAULT_DATETIME_SUBMIT_FORMAT,
): string {
  return dayjs(date, inputFormat).format(outputFormat);
}

/**
 * Formats a Date object to submission format
 * @param date - The Date object to format
 * @param format - Optional format string (defaults to DEFAULT_DATETIME_SUBMIT_FORMAT)
 * @returns The formatted date string, or null if date is null/undefined
 * @example
 * ```ts
 * formatToSubmitFormat(new Date()) // '2024-01-15 14:30:00'
 * formatToSubmitFormat(null) // null
 * ```
 */
export function formatToSubmitFormat(
  date: Date | null | undefined,
  format: string = DEFAULT_DATETIME_SUBMIT_FORMAT,
): string | null {
  if (date == null) { // eslint-disable-line eqeqeq
    return null;
  }
  return dayjs(date).format(format);
}

/**
 * Formats a Date object to view format
 * @param date - The Date object to format
 * @param format - Optional format string (defaults to DEFAULT_DATETIME_VIEW_FORMAT)
 * @returns The formatted date string, or null if date is null/undefined
 * @example
 * ```ts
 * formatToViewFormat(new Date()) // '2024-01-15 14:30:00'
 * ```
 */
export function formatToViewFormat(
  date: Date | null | undefined,
  format: string = DEFAULT_DATETIME_VIEW_FORMAT,
): string | null {
  if (date == null) { // eslint-disable-line eqeqeq
    return null;
  }
  return dayjs(date).format(format);
}

/**
 * Unit type for date manipulation (compatible with dayjs)
 */
export type DateUnit =
  | "year"
  | "years"
  | "month"
  | "months"
  | "week"
  | "weeks"
  | "day"
  | "days"
  | "hour"
  | "hours"
  | "minute"
  | "minutes"
  | "second"
  | "seconds"
  | "millisecond"
  | "milliseconds";

/**
 * Adds time to a date
 * @param date - The date string or Date object
 * @param amount - The amount to add
 * @param unit - The unit of time to add
 * @param format - Optional output format (defaults to DEFAULT_DATETIME_SUBMIT_FORMAT)
 * @returns The new date as a formatted string
 * @example
 * ```ts
 * add('2024-01-15', 1, 'day') // '2024-01-16 00:00:00'
 * add('2024-01-15', 2, 'months', 'YYYY-MM-DD') // '2024-03-15'
 * ```
 */
export function add(
  date: string | Date,
  amount: number,
  unit: DateUnit,
  format: string = DEFAULT_DATETIME_SUBMIT_FORMAT,
): string {
  return dayjs(date)
    .add(amount, unit as any)
    .format(format);
}

/**
 * Subtracts time from a date
 * @param date - The date string or Date object
 * @param amount - The amount to subtract
 * @param unit - The unit of time to subtract
 * @param format - Optional output format (defaults to DEFAULT_DATETIME_SUBMIT_FORMAT)
 * @returns The new date as a formatted string
 * @example
 * ```ts
 * subtract('2024-01-15', 1, 'day') // '2024-01-14 00:00:00'
 * subtract('2024-01-15', 2, 'months', 'YYYY-MM-DD') // '2023-11-15'
 * ```
 */
export function subtract(
  date: string | Date,
  amount: number,
  unit: DateUnit,
  format: string = DEFAULT_DATETIME_SUBMIT_FORMAT,
): string {
  return dayjs(date)
    .subtract(amount, unit as any)
    .format(format);
}
