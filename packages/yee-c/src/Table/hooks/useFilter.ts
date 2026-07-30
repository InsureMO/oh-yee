import { useEffect, useMemo, useState } from 'react';
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

const normalizeValue = (value: unknown) =>
  value === null || value === undefined ? '' : String(value).toLowerCase();

export default function useFilter({
  data,
  columns,
}: {
  data: Array<Record<string, unknown>>;
  columns: ColumnProps[];
}) {
  const [filterRecords, setFilterRecords] = useState<Array<FilterRecord>>([]);
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
    setFilterRecords((current) => {
      const next = current.filter(({ dataIndex }) => columnMap.has(dataIndex));
      return next.length === current.length ? current : next;
    });
  }, [columnMap]);

  const onFilter = ({ value, dataIndex }: FilterOptions) => {
    setFilterRecords((current) => {
      if (isEmptyFilterValue(value)) {
        return current.filter((item) => item.dataIndex !== dataIndex);
      }

      const index = current.findIndex((item) => item.dataIndex === dataIndex);
      if (index === -1) {
        return [...current, { dataIndex, value }];
      }

      return current.map((item, itemIndex) =>
        itemIndex === index ? { ...item, value } : item,
      );
    });
  };

  const filtered = useMemo(() => {
    const handled = filterRecords.filter(
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
        const customFilter = columnMap.get(dataIndex)?.filter?.onFilter;
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
  }, [columnMap, data, filterRecords]);

  return {
    data: filtered,
    filterRecords,
    onFilter,
  };
}
