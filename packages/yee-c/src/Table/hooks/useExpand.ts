import useMergedState from '../../hooks/useMergedState';
import { ExpandableType } from '../interface';

export default function useExpand(
  expandable: ExpandableType | undefined,
  allKeys: string[],
  getRowKey: (record: Record<string, any>) => string,
) {
  const {
    expandedRowKeys, // keys
    defaultExpandedRowKeys, // keys
    defaultExpandAllRows,
    onExpand,
    onExpandedRowsChange,
  } = expandable || {};

  const getInitializeExpandedKeys = () => {
    return defaultExpandAllRows ? allKeys : [];
  };

  const [mergedExpandedKeys, setMergedExpandedKeys] = useMergedState(
    getInitializeExpandedKeys,
    {
      value: expandedRowKeys,
      defaultValue: defaultExpandedRowKeys,
    },
  );

  const handleExpand = ({
    expanded,
    record,
  }: {
    expanded: boolean;
    record: Record<string, any>;
  }) => {
    const key = getRowKey(record);
    const newKeys = expanded
      ? [...mergedExpandedKeys, key]
      : [...mergedExpandedKeys.filter((k) => k !== key)];

    setMergedExpandedKeys(newKeys);
    if (onExpand) {
      onExpand(expanded, record);
    }
    if (onExpandedRowsChange) {
      onExpandedRowsChange(newKeys);
    }
  };

  return {
    expandedRowKeys: mergedExpandedKeys,
    onExpand: handleExpand,
  };
}
