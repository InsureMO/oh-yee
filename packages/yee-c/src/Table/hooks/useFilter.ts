import { useMemo, useState } from 'react';

type FilterOptions = {
  dataIndex: string;
  value: string;
};

type FilterRecord = {
  value: string;
  dataIndex: string;
};

export default function useFilter({
  data,
}: {
  data: Array<Record<string, unknown>>;
}) {
  const [filterRecords, setFilterRecords] = useState<Array<FilterRecord>>([]);
  const onFilter = ({ value, dataIndex }: FilterOptions) => {
    let newFilterMap = [...filterRecords];
    if (!value) {
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
      (item) => item.dataIndex && item.value,
    );
    if (!handled.length) {
      return data;
    }
    return data.filter((item) => {
      return handled.find((o) => {
        if (Array.isArray(o.value)) {
          return o.value.some((v) => {
            const t = item[o.dataIndex];
            return (t as string).toLowerCase() === v.toLowerCase();
          });
        } else {
          const v = o.value.toLowerCase();
          const t = item[o.dataIndex];
          return (t as string).toLowerCase().includes(v);
        }
      });
    });
  }, [data, filterRecords]);

  return {
    data: filtered,
    onFilter,
  };
}
