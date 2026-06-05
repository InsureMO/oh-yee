import React, { startTransition, useContext, useMemo, useState } from 'react';
import { GlobalContext } from '../Config-Provider';
import useMergedState from '../hooks/useMergedState';
import Selector from '../Selector';
import type { TagType } from '../Selector/interface';
import { tagsAttributes } from '../Selector/selector';
import { SelectionKeyType } from '../Table/interface';
import Trigger from '../Trigger';
import mergeContextToProps from '../utils/mergeContextToProps';
import omit from '../utils/omit';
import pick from '../utils/pick';
import type { InternalTableProps, TableSelectProps } from './interface';
import InternalTable from './internal-table';
import './style/index.less';

const handleState = (
  value: SelectionKeyType | SelectionKeyType[] | undefined,
) => {
  if (typeof value === 'string' || typeof value === 'number') {
    return [value];
  } else if (Array.isArray(value)) {
    return value;
  } else {
    return [];
  }
};

const TableSelect = (baseprops: TableSelectProps) => {
  // eslint-disable-line @typescript-eslint/no-unused-vars

  const { tableselect } = useContext(GlobalContext);
  const props = mergeContextToProps(baseprops, tableselect);

  const {
    prefixCls = 'yee-table-select',
    value,
    defaultValue,
    placement = 'bottomLeft',
    disabled,
    rowSelection,
    dataSource,
    rowKey = 'id',
    optionLabelProp = 'name',
    allowClear = true,
    closable = true,
    searchable = true,
    searchOnInput = true,
    placeholder,
    onChange,
    onSearch,
    onOpenChange,
    ...rest
  } = props;

  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const [mergedValue, setMergedValue] = useMergedState<
    SelectionKeyType | SelectionKeyType[] | undefined,
    SelectionKeyType[]
  >([], {
    value,
    defaultValue,
    handleState,
  });

  const selectionType = rowSelection?.type ? rowSelection.type : 'radio';

  const onVisibleChange = (newVisible: boolean) => {
    setOpen(newVisible);
    onOpenChange?.(newVisible);
  };

  const selectorOptions = useMemo(() => {
    if (!mergedValue || mergedValue.length === 0) return [];
    const filtered = dataSource.filter((item) => {
      const key = typeof rowKey === 'function' ? rowKey(item) : item[rowKey];
      return mergedValue.includes(key);
    });

    const translated = filtered.map((item) => ({
      value: typeof rowKey === 'function' ? rowKey(item) : item[rowKey],
      label:
        typeof optionLabelProp === 'function'
          ? optionLabelProp(item)
          : item[optionLabelProp],
    }));

    if (searchValue) {
      return translated.filter((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase()),
      );
    }
    return translated;
  }, [mergedValue, searchValue, dataSource, optionLabelProp]);

  const handleSearch = (
    value: string,
    e?: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchValue(value);
    if (searchOnInput) {
      onSearch?.(value, e);
    }
  };

  const clearSearchValue = () => {
    setSearchValue('');
    if (searchValue) {
      onSearch?.('', undefined);
    }
  };

  const onSelectChange = (
    selectedRowKeys: SelectionKeyType | Array<SelectionKeyType>,
    selectedRows: object,
  ) => {
    setMergedValue(selectedRowKeys);

    const keys =
      selectionType === 'radio' && Array.isArray(selectedRowKeys)
        ? selectedRowKeys[0]
        : selectedRowKeys;
    const rows =
      selectionType === 'radio' && !Array.isArray(selectedRows)
        ? selectedRows
        : (selectedRows as unknown as Array<unknown>);

    onChange?.(keys, rows);

    startTransition(() => {
      clearSearchValue();
    });
  };

  const onTagRemove = (obj: TagType) => {
    const keys = [
      ...(mergedValue as SelectionKeyType[]).filter((k) => k !== obj?.value),
    ];
    setMergedValue([...keys]);
    const renderKeys =
      keys.length === 0 ? (selectionType === 'checkbox' ? [] : '') : keys;
    onChange?.(renderKeys, undefined);
  };

  const tableProps = omit(
    {
      ...rest,
      prefixCls,
      rowSelection: {
        ...props.rowSelection,
        onChange: onSelectChange,
        selectedRowKeys: mergedValue,
      },
      dataSource,
    },
    [
      'searchable',
      'allowClear',
      'placeholder',
      'value',
      'closable',
      'onSearch',
      'onBlur',
      'onRemove',
    ],
  ) as InternalTableProps;

  const selectorProps = {
    ...pick(rest, tagsAttributes),
    mode: (selectionType === 'radio' ? undefined : 'multiple') as
      | 'multiple'
      | 'tags'
      | undefined,
    options: selectorOptions,
    open: open,
    disabled: disabled,
    value: searchValue,
    selectedKeys: mergedValue,
    onSearch: handleSearch,
    onRemove: onTagRemove,
    onOpenChange: (open: boolean) => {
      if (!open) {
        clearSearchValue();
      }
    },
    searchable: searchable,
    allowClear: allowClear,
    closable: closable,
    placeholder: placeholder,
  };

  const renderPopup = () => (
    <InternalTable {...tableProps} value={value} rowKey={rowKey} />
  );

  return (
    <Trigger
      trigger="click"
      popupClassName={`${prefixCls}-popup`}
      popup={renderPopup()}
      placement={placement}
      hideOnClick={selectionType === 'radio' ? true : false}
      onOpenChange={onVisibleChange}
      stretch="minWidth"
    >
      <Selector {...selectorProps} />
    </Trigger>
  );
};

TableSelect.displayName = 'TableSelect';

export default TableSelect;
