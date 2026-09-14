import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ColumnProps, FilterValue } from '../interface';

type FilterInput = FilterValue | FilterValue[];

type FilterOptions = {
  dataIndex: string;
  value: FilterInput;
};

type FilterRecord = {
  value: FilterInput;
  dataIndex: string;
};

const isEmptyFilterValue = (value: FilterInput) =>
  value === '' || (Array.isArray(value) && value.length === 0);

export const isControlledFilter = (column?: ColumnProps) =>
  column?.filter?.filteredValue !== undefined;

const normalizeValue = (value: unknown) =>
  value === null || value === undefined ? '' : String(value).toLowerCase();

// Controlled columns (`filteredValue` defined) always take their value from
// the prop; internal records for them are ignored entirely — a commit on a
// controlled column must not leak into the merged state while the parent has
// not (yet) applied the new prop value.
const mergeRecords = (
  internalRecords: Array<FilterRecord>,
  columnMap: Map<string, ColumnProps>,
): Array<FilterRecord> => {
  const controlled: Array<FilterRecord> = [];
  columnMap.forEach((column, dataIndex) => {
    if (!isControlledFilter(column)) return;
    const value = column.filter?.filteredValue as FilterInput;
    if (!isEmptyFilterValue(value)) {
      controlled.push({ dataIndex, value });
    }
  });
  const merged = internalRecords.filter(
    (record) => !isControlledFilter(columnMap.get(record.dataIndex)),
  );
  if (!controlled.length && merged.length === internalRecords.length) {
    return internalRecords;
  }
  return [...merged, ...controlled];
};

const applyFilters = (
  data: Array<Record<string, unknown>>,
  records: Array<FilterRecord>,
  columnMap: Map<string, ColumnProps>,
) => {
  const handled = records.filter(
    ({ dataIndex, value }) =>
      Boolean(dataIndex) &&
      columnMap.has(dataIndex) &&
      !isEmptyFilterValue(value),
  );
  if (!handled.length) {
    return data;
  }
  return data.filter((item) => {
    return handled.every(({ dataIndex, value }) => {
      const column = columnMap.get(dataIndex);

      // Controlled column without `onFilter` is server-side: the data the
      // consumer renders is already filtered upstream, pass it through.
      if (isControlledFilter(column) && !column?.filter?.onFilter) {
        return true;
      }

      const customFilter = column?.filter?.onFilter;
      if (customFilter) {
        return Array.isArray(value)
          ? value.some((filterValue) => customFilter(filterValue, item))
          : customFilter(value, item);
      }

      const targetValue = normalizeValue(item[dataIndex]);

      if (Array.isArray(value)) {
        return value.some(
          (filterValue) => targetValue === normalizeValue(filterValue),
        );
      }

      return targetValue.includes(normalizeValue(value));
    });
  });
};

export default function useFilter({
  data,
  columns,
}: {
  data: Array<Record<string, unknown>>;
  columns: ColumnProps[];
}) {
  const [internalRecords, setInternalRecords] = useState<Array<FilterRecord>>(
    [],
  );
  const columnMap = useMemo(
    () =>
      new Map(
        columns.flatMap((column) =>
          column.dataIndex ? [[column.dataIndex, column] as const] : [],
        ),
      ),
    [columns],
  );

  useEffect(() => {
    setInternalRecords((current) => {
      const next = current.filter(({ dataIndex }) => columnMap.has(dataIndex));
      return next.length === current.length ? current : next;
    });
  }, [columnMap]);

  const activeRecords = useMemo(
    () => mergeRecords(internalRecords, columnMap),
    [internalRecords, columnMap],
  );

  const filtered = useMemo(
    () => applyFilters(data, activeRecords, columnMap),
    [columnMap, data, activeRecords],
  );

  // Mirrors useSorter.onSort: computes the next state synchronously and
  // returns it, so callers can emit onChange with the result in the same tick.
  const onFilter = useCallback(
    ({ value, dataIndex }: FilterOptions) => {
      const nextInternal = isEmptyFilterValue(value)
        ? internalRecords.filter((item) => item.dataIndex !== dataIndex)
        : internalRecords.some((item) => item.dataIndex === dataIndex)
          ? internalRecords.map((item) =>
              item.dataIndex === dataIndex ? { ...item, value } : item,
            )
          : [...internalRecords, { dataIndex, value }];

      setInternalRecords(nextInternal);

      const nextActive = mergeRecords(nextInternal, columnMap);
      return {
        data: applyFilters(data, nextActive, columnMap),
        filterRecords: nextActive,
      };
    },
    [internalRecords, columnMap, data],
  );

  return {
    data: filtered,
    filterRecords: activeRecords,
    onFilter,
  };
}
