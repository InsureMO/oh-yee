import { ChangeEvent } from 'react';
import useMergeState from '../../hooks/useMergedState';
import type { RowSelectionType, SelectionKeyType } from '../interface';

export default function useSelection({
  pageData,
  dataSource: data,
  getRowKey,
  rowSelection,
  allKeys, // eslint-disable-line @typescript-eslint/no-unused-vars
}: {
  pageData: Array<Record<string, unknown>>;
  dataSource: Array<Record<string, unknown>>;
  getRowKey: (record: Record<string, unknown>) => SelectionKeyType;
  allKeys: Array<SelectionKeyType>;
  rowSelection?: RowSelectionType;
}) {
  const {
    type,
    disabled,
    selectedRowKeys,
    defaultSelectedRowKeys,
    onChange,
    onSelectAll,
  } = rowSelection || ({} as RowSelectionType);

  const [mergedSelectedRowKeys, setMergedSelectedRowKeys] = useMergeState<
    string[] | number[]
  >([], {
    value: selectedRowKeys,
    defaultValue: defaultSelectedRowKeys,
  });

  const onCheck = (checked: boolean, key: number | string) => {
    const rowKeys = checked
      ? [...mergedSelectedRowKeys, key]
      : [...mergedSelectedRowKeys.filter((k) => k !== key)];

    setMergedSelectedRowKeys(rowKeys as any);
    const rowRecords = data.filter((item: any) =>
      rowKeys.includes(getRowKey(item)),
    );
    onChange?.(rowKeys as any, rowRecords);
  };

  const getDisabledKeys = (): SelectionKeyType[] => {
    if (disabled === true) {
      return pageData.map((record) => getRowKey(record));
    }
    if (Array.isArray(disabled)) {
      return pageData
        .filter((_, index) => disabled[index])
        .map((record) => getRowKey(record));
    }
    if (typeof disabled === 'function') {
      return pageData
        .filter((record, index) => disabled(record, index))
        .map((record) => getRowKey(record));
    }
    return [];
  };

  const disabledKeys = getDisabledKeys();
  const pageDataRowKeys = pageData.map((record) => getRowKey(record));

  const isCheckedAll = () => {
    const filtered = pageDataRowKeys.filter(
      (key: any) => !disabledKeys.includes(key),
    );

    const filteredLength = filtered.length;

    if (mergedSelectedRowKeys.length < filteredLength || filteredLength === 0) {
      return false;
    }
    for (let i = 0; i < filteredLength; i++) {
      const item = filtered[i];
      if (!(mergedSelectedRowKeys as any).includes(item)) {
        return false;
      }
    }
    return true;
  };

  const checkedAll = isCheckedAll();

  const onCheckAll = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    const keys = pageData
      .filter((record: any) => !disabledKeys.includes(getRowKey(record))) // Filter out disabled items
      .map((record: any) => getRowKey(record));

    const rowKeys = checked
      ? // @ts-ignore
        [...new Set([...mergedSelectedRowKeys, ...keys])]
      : [
          ...mergedSelectedRowKeys.filter(
            (key) => !keys.includes(key as string),
          ),
        ];

    const rowRecords = data.filter((item: any) =>
      rowKeys.includes(getRowKey(item)),
    );
    setMergedSelectedRowKeys(rowKeys);

    onChange?.(rowKeys, rowRecords);
    onSelectAll?.(checked, rowKeys, rowRecords);
  };

  const onRadioCheck = (checked: boolean, key: number | string) => {
    const record = pageData.find((item: any) => getRowKey(item) === key);
    setMergedSelectedRowKeys([key as any]);
    onChange?.([key as any], record as any);
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    key: SelectionKeyType,
  ) => {
    const checked = event.target.checked;
    if (type === 'checkbox') {
      onCheck(checked, key);
    } else {
      onRadioCheck(checked, key);
    }
  };
  return {
    selectedRowKeys:
      type === 'checkbox' ? mergedSelectedRowKeys : [mergedSelectedRowKeys[0]],
    checkedAll,
    pageDataRowKeys,
    onCheck,
    onCheckAll,
    onRadioCheck,
    onChange: handleChange,
  };
}
