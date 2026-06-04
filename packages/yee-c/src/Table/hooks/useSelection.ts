import { ChangeEvent } from 'react';
import useMergeState from '../../hooks/useMergedState';
import type { RowSelectionType, SelectionKeyType } from '../interface';

export default function useSelection({
  pageData,
  dataSource: data,
  getRowKey,
  rowSelection,
  allKeys,
}: {
  pageData: Array<Record<string, unknown>>;
  dataSource: Array<Record<string, unknown>>;
  getRowKey: (record: Record<string, unknown>) => string;
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
    const record = pageData.find((item) => getRowKey(item) === key);
    const rowKeys = checked
      ? [...mergedSelectedRowKeys, key]
      : [...mergedSelectedRowKeys.filter((k) => k !== key)];

    setMergedSelectedRowKeys(rowKeys as any);
    const rowRecords = data.filter((item: any) =>
      rowKeys.includes(getRowKey(item)),
    );
    onChange?.(rowKeys as any, rowRecords);
  };

  const getDisabledKeys = () => {
    if (Array.isArray(disabled)) {
      return disabled;
    }
    if (typeof disabled === 'function') {
      return (
        Array.isArray(pageData) &&
        pageData
          .filter((record, index) => disabled(record, index))
          .map((record) => getRowKey(record))
      );
    }
    return [];
  };

  const getPageDataRowKeys = () => {
    return (
      Array.isArray(pageData) && pageData.map((record) => getRowKey(record))
    );
  };

  const disabledKeys = getDisabledKeys() as Array<string>;
  const pageDataRowKeys = getPageDataRowKeys() as Array<string>;

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

    const changedRowRecords = pageData.filter((item: any) =>
      keys.includes(getRowKey(item)),
    );
    const rowKeys = checked
      ? // @ts-ignore
        [...new Set([...mergedSelectedRowKeys, ...keys])]
      : [...mergedSelectedRowKeys.filter((key) => !keys.includes(key as string))];

    const rowRecords = data.filter((item: any) =>
      rowKeys.includes(getRowKey(item)),
    );
    setMergedSelectedRowKeys(rowKeys);

    onChange?.(rowKeys, rowRecords);
    onSelectAll?.(rowKeys as any, rowRecords as any, checked);
  };

  const onRadioCheck = (checked: boolean, key: number | string) => {
    const record = pageData.find((item: any) => getRowKey(item) === key);
    setMergedSelectedRowKeys([key as any]);
    onChange?.([key as any], record as any);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const key = event.target.value;
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
