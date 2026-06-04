import { useCallback, useEffect, useMemo, useState } from 'react';
import { ColumnProps } from '../interface';

type SortState = {
  [dataIndex: string]: 0 | 1 | -1;
};

export default function useSorter({
  data,
  columns
}: {
  data: Array<Record<string, unknown>>,
  columns: Array<ColumnProps>
}) {

  const getDefaultSorters = useCallback(() => {
    const sorters: SortState = {};
    columns.forEach((column) => {
      const { dataIndex, sorter } = column;
      if (!sorter) return;
      const { defaultSortOrder } = typeof sorter === 'boolean' ? {} as any : sorter;
      if (dataIndex && sorter) {
        if (defaultSortOrder === 'ascend') {
          sorters[dataIndex] = 1;
        } else if (defaultSortOrder === 'descend') {
          sorters[dataIndex] = -1;
        } else {
          sorters[dataIndex] = 0;
        }
      }
    });
    return sorters;
  }, [columns]);

  const [sorters, setSorters] = useState<SortState>(getDefaultSorters());

  // when columns changed, reset sorters
  useEffect(() => {
    setSorters(getDefaultSorters());
  }, [getDefaultSorters]);

  // handle sort on column title click
  const onSort = (dataIndex: string) => {
    setSorters((prev) => {
      const newSorters = { ...prev };
      const currentOrder = newSorters[dataIndex] ?? 0;

      if (currentOrder === 0) {
        newSorters[dataIndex] = 1;
      } else if (currentOrder === 1) {
        newSorters[dataIndex] = -1;
      } else {
        newSorters[dataIndex] = 0;
      }

      // is multiple sort
      const isMultipleSort = undefined;

      if (isMultipleSort) {
      } else {
        Object.keys(newSorters).forEach((key) => {
          if (key !== dataIndex) {
            delete newSorters[key];
          }
        });
      }

      return newSorters;
    });
  };

  const sorted = useMemo(() => {
    const activeSorters = Object.entries(sorters).filter(([_, order]) => order !== 0);

    if (activeSorters.length === 0) {
      return data;
    }

    const sortedData = [...data].sort((a, b) => {
      for (const [dataIndex, order] of activeSorters) {
        const aValue = a[dataIndex];
        const bValue = b[dataIndex];

        // Handle undefined/null values
        if (aValue == null && bValue == null) continue;
        if (aValue == null) return 1;
        if (bValue == null) return -1;

        // Compare values
        if (aValue < bValue) {
          return order === -1 ? 1 : -1;
        }
        if (aValue > bValue) {
          return order === -1 ? -1 : 1;
        }
      }
      return 0;
    });

    return sortedData;
  }, [data, sorters]);

  return {
    data: sorted,
    sorters,
    onSort,
  };
}
