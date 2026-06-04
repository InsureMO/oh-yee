import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import type { WheelColumn } from '../../WheelPicker/interface';
import type { PickerType } from '../interface';

interface UseWheelDateColumnsOptions {
  picker: PickerType;
  pickerValue?: Dayjs;
  minDate?: Dayjs;
  maxDate?: Dayjs;
}

interface UseWheelDateColumnsResult {
  columns: WheelColumn[];
  wheelValue: number[];
  handleWheelChange: (value: number[]) => void;
  getSelectedDate: () => Dayjs;
  hasColumns: boolean;
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function findIndex(options: { value: string | number }[], value: string | number): number {
  const idx = options.findIndex((o) => o.value === value);
  return idx >= 0 ? idx : 0;
}

function useWheelDateColumns({
  picker,
  pickerValue,
  minDate,
  maxDate,
}: UseWheelDateColumnsOptions): UseWheelDateColumnsResult {
  const showYear = ['date', 'month', 'year', 'datetime'].includes(picker);
  const showMonth = ['date', 'datetime'].includes(picker);
  const showDay = ['date', 'datetime'].includes(picker);
  const showTime = picker === 'datetime' || picker === 'time';
  const hasColumns = showYear || showMonth || showDay || showTime;

  const reference = pickerValue ?? dayjs();
  const refYear = reference.year();
  const refMonth = reference.month();
  const refDay = reference.date();
  const refHour = reference.hour();
  const refMinute = reference.minute();
  const refSecond = reference.second();

  const minYear = minDate ? minDate.year() : dayjs().year() - 10;
  const maxYear = maxDate ? maxDate.year() : dayjs().year() + 10;
  const minMonth = minDate ? minDate.month() : 0;
  const maxMonth = maxDate ? maxDate.month() : 11;
  const minDay = minDate ? minDate.date() : 1;
  const maxDay = maxDate ? maxDate.date() : 31;

  // --- Build column options ---

  const yearOptions = useMemo(() => {
    if (!showYear) return [];
    const opts: { label: string; value: number }[] = [];
    for (let y = minYear; y <= maxYear; y++) {
      opts.push({ label: `${y}`, value: y });
    }
    return opts;
  }, [showYear, minYear, maxYear]);

  const [selectedYear, setSelectedYear] = useState(refYear);
  const [selectedMonth, setSelectedMonth] = useState(refMonth);
  const [selectedDay, setSelectedDay] = useState(refDay);
  const [selectedHour, setSelectedHour] = useState(refHour);
  const [selectedMinute, setSelectedMinute] = useState(refMinute);
  const [selectedSecond, setSelectedSecond] = useState(refSecond);

  // Sync internal selection when pickerValue changes externally
  useEffect(() => {
    const ref = pickerValue ?? dayjs();
    setSelectedYear(ref.year());
    setSelectedMonth(ref.month());
    setSelectedDay(ref.date());
    setSelectedHour(ref.hour());
    setSelectedMinute(ref.minute());
    setSelectedSecond(ref.second());
  }, [pickerValue]);

  const monthOptions = useMemo(() => {
    if (!showMonth) return [];
    const start = selectedYear === minYear ? minMonth : 0;
    const end = selectedYear === maxYear ? maxMonth : 11;
    const opts: { label: string; value: number }[] = [];
    for (let m = start; m <= end; m++) {
      opts.push({ label: pad(m + 1), value: m });
    }
    return opts;
  }, [showMonth, selectedYear, minYear, maxYear, minMonth, maxMonth]);

  const dayOptions = useMemo(() => {
    if (!showDay) return [];
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    const start =
      selectedYear === minYear && selectedMonth === minMonth ? minDay : 1;
    const end =
      selectedYear === maxYear && selectedMonth === maxMonth
        ? Math.min(maxDay, daysInMonth)
        : daysInMonth;
    const opts: { label: string; value: number }[] = [];
    for (let d = start; d <= end; d++) {
      opts.push({ label: pad(d), value: d });
    }
    return opts;
  }, [showDay, selectedYear, selectedMonth, minYear, maxYear, minMonth, maxMonth, minDay, maxDay]);

  const hourOptions = useMemo(() => {
    if (!showTime) return [];
    const opts: { label: string; value: number }[] = [];
    for (let h = 0; h <= 23; h++) {
      opts.push({ label: pad(h), value: h });
    }
    return opts;
  }, [showTime]);

  const minuteOptions = useMemo(() => {
    if (!showTime) return [];
    const opts: { label: string; value: number }[] = [];
    for (let m = 0; m <= 59; m++) {
      opts.push({ label: pad(m), value: m });
    }
    return opts;
  }, [showTime]);

  const secondOptions = useMemo(() => {
    if (!showTime) return [];
    const opts: { label: string; value: number }[] = [];
    for (let s = 0; s <= 59; s++) {
      opts.push({ label: pad(s), value: s });
    }
    return opts;
  }, [showTime]);

  // --- Assemble columns and indices ---

  const { columns, indices } = useMemo(() => {
    const cols: WheelColumn[] = [];
    const idx: number[] = [];

    if (showYear) {
      cols.push({ options: yearOptions });
      idx.push(findIndex(yearOptions, selectedYear));
    }
    if (showMonth) {
      cols.push({ options: monthOptions });
      idx.push(findIndex(monthOptions, selectedMonth));
    }
    if (showDay) {
      cols.push({ options: dayOptions });
      idx.push(findIndex(dayOptions, selectedDay));
    }
    if (showTime) {
      cols.push({ options: hourOptions });
      idx.push(findIndex(hourOptions, selectedHour));
      cols.push({ options: minuteOptions });
      idx.push(findIndex(minuteOptions, selectedMinute));
      cols.push({ options: secondOptions });
      idx.push(findIndex(secondOptions, selectedSecond));
    }

    return { columns: cols, indices: idx };
  }, [
    showYear, showMonth, showDay, showTime,
    yearOptions, monthOptions, dayOptions,
    hourOptions, minuteOptions, secondOptions,
    selectedYear, selectedMonth, selectedDay,
    selectedHour, selectedMinute, selectedSecond,
  ]);

  // Track latest indices in a ref so getSelectedDate always reads current values
  const indicesRef = useRef(indices);
  const columnsRef = useRef(columns);
  indicesRef.current = indices;
  columnsRef.current = columns;

  const handleWheelChange = useCallback(
    (value: number[]) => {
      let colOffset = 0;
      if (showYear) {
        const yearOpt = yearOptions[value[colOffset]];
        if (yearOpt) setSelectedYear(yearOpt.value as number);
        colOffset++;
      }
      if (showMonth) {
        const monthOpt = monthOptions[value[colOffset]];
        if (monthOpt) setSelectedMonth(monthOpt.value as number);
        colOffset++;
      }
      if (showDay) {
        const dayOpt = dayOptions[value[colOffset]];
        if (dayOpt) setSelectedDay(dayOpt.value as number);
        colOffset++;
      }
      if (showTime) {
        const hourOpt = hourOptions[value[colOffset]];
        if (hourOpt) setSelectedHour(hourOpt.value as number);
        const minuteOpt = minuteOptions[value[colOffset + 1]];
        if (minuteOpt) setSelectedMinute(minuteOpt.value as number);
        const secondOpt = secondOptions[value[colOffset + 2]];
        if (secondOpt) setSelectedSecond(secondOpt.value as number);
      }
    },
    [showYear, showMonth, showDay, showTime, yearOptions, monthOptions, dayOptions, hourOptions, minuteOptions, secondOptions],
  );

  const getSelectedDate = useCallback(() => {
    const idx = indicesRef.current;
    const cols = columnsRef.current;
    let colOffset = 0;

    let date = dayjs();

    if (showYear && cols[colOffset]) {
      const opt = cols[colOffset].options[idx[colOffset]];
      if (opt) date = date.year(opt.value as number);
      colOffset++;
    }
    if (showMonth && cols[colOffset]) {
      const opt = cols[colOffset].options[idx[colOffset]];
      if (opt) date = date.month(opt.value as number);
      colOffset++;
    }
    if (showDay && cols[colOffset]) {
      const opt = cols[colOffset].options[idx[colOffset]];
      if (opt) date = date.date(opt.value as number);
      colOffset++;
    }
    if (showTime) {
      if (cols[colOffset]) {
        const opt = cols[colOffset].options[idx[colOffset]];
        if (opt) date = date.hour(opt.value as number);
      }
      if (cols[colOffset + 1]) {
        const opt = cols[colOffset + 1].options[idx[colOffset + 1]];
        if (opt) date = date.minute(opt.value as number);
      }
      if (cols[colOffset + 2]) {
        const opt = cols[colOffset + 2].options[idx[colOffset + 2]];
        if (opt) date = date.second(opt.value as number);
      }
    }

    return date;
  }, [showYear, showMonth, showDay, showTime]);

  return {
    columns,
    wheelValue: indices,
    handleWheelChange,
    getSelectedDate,
    hasColumns,
  };
}

export default useWheelDateColumns;
