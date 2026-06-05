import clsx from 'clsx';
import dayjs, { Dayjs, QUnitType } from 'dayjs';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import localeData from 'dayjs/plugin/localeData';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekOfYear);
dayjs.extend(quarterOfYear);
dayjs.extend(isBetween);
dayjs.extend(customParseFormat);
dayjs.extend(localeData);
dayjs.extend(buddhistEra); // Buddhist calendar

type PickerType =
  | 'year'
  | 'quarter'
  | 'month'
  | 'week'
  | 'day'
  | 'second'
  | 'minute'
  | 'hour';

const d = {
  dayjs: dayjs,
  init: (date?: string, ...rest: any[]) => dayjs(date, ...rest),
  getNow: () => {
    return d.init(undefined);
  },
  getYear: (date: Dayjs) => date.year(),
  getQuarter: (date: Dayjs) => date.quarter(),
  getMonth: (date: Dayjs) => date.month(),
  getWeek: (date: Dayjs) => date.week(),
  getDate: (date: Dayjs) => date.date(),
  getHour: (date: Dayjs) => date.hour(),
  getMinute: (date: Dayjs) => date.minute(),
  getSecond: (date: Dayjs) => date.second(),

  format: (date: Dayjs, format: string) => dayjs(date).format(format),
  isSame: (date1: Dayjs, date2: Dayjs, type?: PickerType) => {
    if (!d.isValid(date1) && !d.isValid(date2)) return true;
    return date1 && date2 ? date1.isSame(date2, type as QUnitType) : false;
  },

  setYear: (date: Dayjs, year: number) => date.year(year),
  setMonth: (date: Dayjs, month: number) => date.month(month),
  setDate: (date: Dayjs, day: number) => date.date(day),
  setHour: (date: Dayjs, hour: number) => date?.hour(hour),
  setMinute: (date: Dayjs, minute: number) => date?.minute(minute),
  setSecond: (date: Dayjs, second: number) => date.second(second),
  addYear: (date: Dayjs, offset: number) => date?.add(offset, 'year'),
  addMonth: (date: Dayjs, offset: number) => date?.add(offset, 'month'),
  addDate: (date: Dayjs, offset: number) => date?.add(offset, 'day'),
  isAfter: (
    date1: Dayjs,
    date2: Dayjs,
    type?: 'day' | 'hour' | 'minute' | 'second' | 'year' | 'month',
  ) => (date2 ? date1.isAfter(date2, type) : false),
  isBefore: (
    date1: Dayjs,
    date2: Dayjs,
    type?: 'day' | 'hour' | 'minute' | 'second' | 'year' | 'month',
  ) => (date2 ? date1.isBefore(date2, type) : false),
  isValid: (date: Dayjs, format?: string, strict?: boolean) =>
    dayjs(date, format, strict).isValid(),
  isBetween: (date: Dayjs, start: Dayjs, end: Dayjs, ...args: any[]) =>
    date && start && end ? date.isBetween(start, end, ...args) : false,

  getCellClassName: ({
    date,
    startHoverDate,
    endHoverDate,
    startSelectedDate,
    endSelectedDate,
    unit,
    prefixCls = 'yee-picker',
  }: {
    date: Dayjs;
    startHoverDate: Dayjs | null | undefined;
    endHoverDate: Dayjs | null | undefined;
    startSelectedDate: Dayjs | null | undefined;
    endSelectedDate: Dayjs | null | undefined;
    unit: 'day' | 'month' | 'year';
    prefixCls?: string;
  }) => {
    const classNames: string[] = [];

    // === Handle selected range styles (background color) ===
    // Only show when BOTH dates are selected and different
    if (
      startSelectedDate &&
      endSelectedDate &&
      !d.isSame(startSelectedDate, endSelectedDate, unit)
    ) {
      const [selectedStart, selectedEnd] = startSelectedDate.isBefore(
        endSelectedDate,
      )
        ? [startSelectedDate, endSelectedDate]
        : [endSelectedDate, startSelectedDate];

      const isInSelectedRange = d.isBetween(
        date,
        selectedStart,
        selectedEnd,
        unit,
        '[]',
      );
      const isSelectedStart = d.isSame(date, selectedStart, unit);
      const isSelectedEnd = d.isSame(date, selectedEnd, unit);

      if (isInSelectedRange) {
        classNames.push(`${prefixCls}-cell-in-range`);
      }
      if (isSelectedStart) {
        classNames.push(`${prefixCls}-cell-range-start`);
      }
      if (isSelectedEnd) {
        classNames.push(`${prefixCls}-cell-range-end`);
      }
    }

    // === Handle hover range styles (dashed border) ===
    // Show when at least ONE date exists in the hover range
    // This allows showing hover preview from a selected date to hovered date
    if (
      startHoverDate &&
      endHoverDate &&
      !d.isSame(startHoverDate, endHoverDate, unit)
    ) {
      const [hoverStart, hoverEnd] = startHoverDate.isBefore(endHoverDate)
        ? [startHoverDate, endHoverDate]
        : [endHoverDate, startHoverDate];

      const isHover = d.isBetween(date, hoverStart, hoverEnd, unit, '[]');
      const isHoverStart = d.isSame(date, hoverStart, unit);
      const isHoverEnd = d.isSame(date, hoverEnd, unit);

      if (isHover) {
        classNames.push(`${prefixCls}-cell-range-hover`);
      }
      if (isHoverStart) {
        classNames.push(`${prefixCls}-cell-range-hover-start`);
      }
      if (isHoverEnd) {
        classNames.push(`${prefixCls}-cell-range-hover-end`);
      }
    }

    return clsx(classNames);
  },

  getBaseDate: (
    type: 'day' | 'week' | 'month' | 'year' | 'decade',
    viewDate: Dayjs,
    weekStart = 0,
  ): Dayjs | number => {
    switch (type) {
      case 'day': {
        let weekDay = viewDate.set('date', 1).day() as number;
        weekDay = weekDay === 0 ? (weekStart === 1 ? 7 : 0) : weekDay;
        return dayjs(viewDate).date(weekStart - weekDay + 1);
      }
      case 'week': {
        return viewDate.week();
      }
      case 'month':
        return dayjs(viewDate).month(0);
      case 'year': {
        const year = viewDate.year();
        return viewDate.add(-((year % 10) + 1), 'year');
      }
      case 'decade': {
        const year = viewDate.year();
        return viewDate.add(-((year % 100) + 1 * 10), 'year');
      }
    }
  },
};

export default d;
