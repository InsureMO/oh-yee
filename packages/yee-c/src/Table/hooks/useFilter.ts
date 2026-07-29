import { useMemo, useState } from 'react';

type FilterValue = string | number;
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
}: {
  data: Array<Record<string, unknown>>;
}) {
  const [filterRecords, setFilterRecords] = useState<Array<FilterRecord>>([]);
  const onFilter = ({ value, dataIndex }: FilterOptions) => {
    let newFilterMap = [...filterRecords];
    if (isEmptyFilterValue(value)) {
      newFilterMap = newFilterMap.filter(
        (item) => item.dataIndex !== dataIndex,
      );
    } else {
      let exited = false;
      newFilterMap = newFilterMap.map((item) => {
        if (item.dataIndex === dataIndex) {
          exited = true;
          return { ...item, value };
        }
        return item;
      });
      if (!exited) {
        newFilterMap.push({ dataIndex, value });
      }
    }
    setFilterRecords(newFilterMap);
  };

  const filtered = useMemo(() => {
    const handled = filterRecords.filter(
      ({ dataIndex, value }) =>
        Boolean(dataIndex) && !isEmptyFilterValue(value),
    );
    if (!handled.length) {
      return data;
    }
    return data.filter((item) => {
      return handled.some(({ dataIndex, value }) => {
        const targetValue = normalizeValue(item[dataIndex]);

        if (Array.isArray(value)) {
          return value.some(
            (filterValue) => targetValue === normalizeValue(filterValue),
          );
        }

        return targetValue.includes(normalizeValue(value));
      });
    });
  }, [data, filterRecords]);

  return {
    data: filtered,
    onFilter,
  };
}
