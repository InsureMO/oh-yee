import { useMemo } from 'react';
import useMergedState from '../../hooks/useMergedState';
import { PaginationType } from '../interface';

const DEFAULT_CURRENT = 1;
const DEFAULT_PAGESIZE = 10;

export default function usePagination({
  data,
  pagination,
  onTableChange,
}: {
  data: Array<Record<string, unknown>>;
  pagination: Partial<PaginationType> | boolean;
  onTableChange?: ({
    current,
    pageSize,
  }: {
    current: number;
    pageSize: number;
  }) => void;
}): {
  pageData: Array<Record<string, unknown>>;
  current: number;
  pageSize: number;
  pagination: Partial<PaginationType> | false;
} {
  const {
    current,
    defaultCurrent = DEFAULT_CURRENT,
    pageSize,
    defaultPageSize = DEFAULT_PAGESIZE,
    ...rest
  } = typeof pagination === 'object' ? pagination : ({} as PaginationType);

  const [meregdCurrent, setMergedCurrent] = useMergedState(DEFAULT_CURRENT, {
    value: current,
    defaultValue: defaultCurrent,
  });

  const [mergedPageSize, setMergedPageSize] = useMergedState(DEFAULT_PAGESIZE, {
    value: pageSize,
    defaultValue: defaultPageSize,
  });

  const handleChange = ({
    current,
    pageSize,
  }: {
    current: number;
    pageSize: number;
  }) => {
    setMergedCurrent(current);
    setMergedPageSize(pageSize);

    if (rest.onChange) {
      rest?.onChange?.({ current, pageSize });
    }
    onTableChange?.({
      current,
      pageSize,
    });
  };

  const handlePageSizeChange = ({
    current,
    pageSize,
  }: {
    current: number;
    pageSize: number;
  }) => {
    setMergedCurrent(current);
    setMergedPageSize(pageSize);

    if (rest.onPageSizeChange) {
      rest.onPageSizeChange({ current, pageSize });
    }
    onTableChange?.({
      current,
      pageSize,
    });
  };

  if (pagination === false) {
    return {
      pageData: data,
      current: 1,
      pageSize: data.length,
      pagination: false,
    };
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const pageData = useMemo(() => {
    const total = data.length;
    if (total <= mergedPageSize) return data;
    let current = meregdCurrent;
    const totalPages = Math.ceil(total / mergedPageSize);
    if (meregdCurrent > totalPages) {
      current = totalPages;
    }
    const start = (current - 1) * mergedPageSize;
    return data.slice(start, start + mergedPageSize);
  }, [data, meregdCurrent, mergedPageSize]);

  return {
    pageData,
    current: meregdCurrent,
    pageSize: mergedPageSize,
    pagination: {
      ...rest,
      total: rest.total ?? data.length,
      current: meregdCurrent,
      pageSize: mergedPageSize,
      onChange: handleChange,
      onPageSizeChange: handlePageSizeChange,
    },
  };
}
