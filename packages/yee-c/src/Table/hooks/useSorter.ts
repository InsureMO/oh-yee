import { useCallback, useEffect, useMemo, useState } from 'react';
import { ColumnProps } from '../interface';

type SortOrder = 1 | -1;
type SortState = Record<string, SortOrder>;
type SorterConfig = Exclude<ColumnProps['sorter'], boolean | undefined>;
type SortQueueItem = {
  dataIndex: string;
  order: SortOrder;
};
type SortChangeResult = {
  data: Array<Record<string, unknown>>;
  sorters: SortState;
};

const getSorterConfig = (column?: ColumnProps): SorterConfig | undefined =>
  column && typeof column.sorter === 'object' ? column.sorter : undefined;

const toSortOrder = (
  order: 'ascend' | 'descend' | null | undefined,
): SortOrder | 0 => {
  if (order === 'ascend') return 1;
  if (order === 'descend') return -1;
  return 0;
};

const getNextSortOrder = (order: SortOrder | 0): SortOrder | 0 => {
  if (order === 0) return 1;
  if (order === 1) return -1;
  return 0;
};

const isMultipleSorter = (column?: ColumnProps) =>
  Boolean(getSorterConfig(column)?.multiple);

const applySortChange = (
  queue: SortQueueItem[],
  column: ColumnProps,
  order: SortOrder | 0,
  columnMap: Map<string, ColumnProps>,
): SortQueueItem[] => {
  const { dataIndex } = column;
  if (!dataIndex) return queue;
  if (order === 0) {
    return queue.filter((item) => item.dataIndex !== dataIndex);
  }

  const multiple = getSorterConfig(column)?.multiple;
  const nextItem = { dataIndex, order };
  if (!multiple) {
    return [nextItem];
  }

  const next = queue.filter(
    (item) =>
      item.dataIndex === dataIndex ||
      isMultipleSorter(columnMap.get(item.dataIndex)),
  );
  const currentIndex = next.findIndex((item) => item.dataIndex === dataIndex);
  if (currentIndex === -1) {
    next.push(nextItem);
  } else {
    next[currentIndex] = nextItem;
  }

  if (typeof multiple === 'number') {
    const limit = Math.max(1, Math.floor(multiple));
    while (next.length > limit) {
      const removeIndex = next.findIndex(
        (item) => item.dataIndex !== dataIndex,
      );
      if (removeIndex === -1) break;
      next.splice(removeIndex, 1);
    }
  }

  return next;
};

const normalizeQueue = (
  queue: SortQueueItem[],
  columnMap: Map<string, ColumnProps>,
) =>
  queue.reduce<SortQueueItem[]>((next, item) => {
    const column = columnMap.get(item.dataIndex);
    return column ? applySortChange(next, column, item.order, columnMap) : next;
  }, []);

const areQueuesEqual = (a: SortQueueItem[], b: SortQueueItem[]) =>
  a.length === b.length &&
  a.every(
    (item, index) =>
      item.dataIndex === b[index]?.dataIndex && item.order === b[index]?.order,
  );

const createColumnMap = (columns: ColumnProps[]) =>
  new Map(
    columns
      .filter((column) => Boolean(column.dataIndex && column.sorter))
      .map((column) => [column.dataIndex as string, column]),
  );

const createInitialQueue = (
  columns: ColumnProps[],
  columnMap: Map<string, ColumnProps>,
) =>
  columns.reduce<SortQueueItem[]>((queue, column) => {
    const config = getSorterConfig(column);
    const order = toSortOrder(
      config?.sortOrder !== undefined
        ? config.sortOrder
        : config?.defaultSortOrder,
    );
    return order ? applySortChange(queue, column, order, columnMap) : queue;
  }, []);

const mergeControlledSorters = (
  queue: SortQueueItem[],
  columns: ColumnProps[],
  columnMap: Map<string, ColumnProps>,
) => {
  const controlledOrders = new Map<string, SortOrder | 0>();
  columns.forEach((column) => {
    const config = getSorterConfig(column);
    if (column.dataIndex && config?.sortOrder !== undefined) {
      controlledOrders.set(column.dataIndex, toSortOrder(config.sortOrder));
    }
  });

  const uncontrolledQueue = queue.filter(
    (item) => !controlledOrders.has(item.dataIndex),
  );
  const controlledQueue: SortQueueItem[] = [];
  queue.forEach((item) => {
    const controlledOrder = controlledOrders.get(item.dataIndex);
    if (controlledOrder === undefined) return;
    controlledOrders.delete(item.dataIndex);
    if (controlledOrder) {
      controlledQueue.push({
        dataIndex: item.dataIndex,
        order: controlledOrder,
      });
    }
  });

  columns.forEach((column) => {
    const { dataIndex } = column;
    if (!dataIndex) return;
    const controlledOrder = controlledOrders.get(dataIndex);
    if (controlledOrder) {
      controlledQueue.push({ dataIndex, order: controlledOrder });
    }
  });

  return normalizeQueue([...uncontrolledQueue, ...controlledQueue], columnMap);
};

const queueToSortState = (queue: SortQueueItem[]): SortState =>
  Object.fromEntries(
    queue.map(({ dataIndex, order }) => [dataIndex, order]),
  ) as SortState;

const compareValues = (a: unknown, b: unknown) => {
  if (Object.is(a, b)) return 0;
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  if (typeof a === 'bigint' && typeof b === 'bigint') return a < b ? -1 : 1;
  if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime();
  if (typeof a === 'boolean' && typeof b === 'boolean') {
    return Number(a) - Number(b);
  }
  return String(a).localeCompare(String(b));
};

const sortData = (
  data: Array<Record<string, unknown>>,
  queue: SortQueueItem[],
  columnMap: Map<string, ColumnProps>,
) => {
  if (!queue.length) return data;

  return [...data].sort((a, b) => {
    for (const { dataIndex, order } of queue) {
      const aValue = a[dataIndex];
      const bValue = b[dataIndex];

      const compare = getSorterConfig(columnMap.get(dataIndex))?.sort;
      if (compare) {
        const result = compare(a, b);
        if (result !== 0) {
          return order === -1 ? -result : result;
        }
        continue;
      }

      if (aValue === null && bValue === null) continue;
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      const result = compareValues(aValue, bValue);
      if (result !== 0) {
        return order === -1 ? -result : result;
      }
    }
    return 0;
  });
};

export default function useSorter({
  data,
  columns,
}: {
  data: Array<Record<string, unknown>>;
  columns: Array<ColumnProps>;
}) {
  const columnMap = useMemo(() => createColumnMap(columns), [columns]);
  const [internalQueue, setInternalQueue] = useState<SortQueueItem[]>(() =>
    createInitialQueue(columns, columnMap),
  );

  useEffect(() => {
    setInternalQueue((current) => {
      const next = normalizeQueue(current, columnMap);
      return areQueuesEqual(current, next) ? current : next;
    });
  }, [columnMap]);

  const activeQueue = useMemo(
    () => mergeControlledSorters(internalQueue, columns, columnMap),
    [internalQueue, columns, columnMap],
  );
  const sorters = useMemo(() => queueToSortState(activeQueue), [activeQueue]);
  const sorted = useMemo(
    () => sortData(data, activeQueue, columnMap),
    [data, activeQueue, columnMap],
  );

  const onSort = useCallback(
    (dataIndex: string): SortChangeResult => {
      const column = columnMap.get(dataIndex);
      if (!column) return { data: sorted, sorters };

      const currentOrder =
        activeQueue.find((item) => item.dataIndex === dataIndex)?.order ?? 0;
      const nextQueue = applySortChange(
        activeQueue,
        column,
        getNextSortOrder(currentOrder),
        columnMap,
      );
      const nextSorters = queueToSortState(nextQueue);
      const nextData = sortData(data, nextQueue, columnMap);

      setInternalQueue(nextQueue);
      return { data: nextData, sorters: nextSorters };
    },
    [activeQueue, columnMap, data, sorted, sorters],
  );

  return {
    data: sorted,
    sorters,
    onSort,
  };
}
