import React, { useCallback, useEffect, useRef, useState } from 'react';
import Radio from '../Radio';
import type { TableProps } from '../Table';
import Table from '../Table';
import useLockFocus from '../hooks/useLockFocus';
import { InternalTableProps } from './interface';

type SelectedKeyType = string | number;

type TableSelectDataType = {
  [propName: string]: any;
};

const InternalTable: React.FC<InternalTableProps> = (props) => {
  const {
    prefixCls,
    type = 'radio',
    value,
    columns,
    dataSource,
    rowKey = 'key',
    isShowFilter = true,
    rowSelection = {},
    visible,
    popupRef: externalPopupRef,
    ...rest
  } = props;

  const [internalDataSource, setInternalDataSource] = useState<
    TableSelectDataType[]
  >([]);
  const renderRowSelection = { type, selectedRowKeys: value, ...rowSelection };

  useEffect(() => {
    setInternalDataSource(dataSource || []);
  }, [dataSource]);

  const popupRef = useRef<HTMLDivElement>(null);

  useLockFocus(popupRef.current, visible ?? false);

  const handleRadioChange = useCallback(
    (newValue: string | number) => {
      const { selectedRowKeys } = renderRowSelection;
      if (newValue === 'all') {
        setInternalDataSource(dataSource);
      } else {
        setInternalDataSource(
          dataSource.filter((data: TableSelectDataType) =>
            (selectedRowKeys as SelectedKeyType[])?.includes(
              typeof rowKey === 'function' ? rowKey(data) : data[rowKey],
            ),
          ),
        );
      }
    },
    [renderRowSelection.selectedRowKeys, dataSource],
  );

  const renderRadio = () => {
    const { selectedRowKeys } = renderRowSelection;
    if (type === 'checkbox' && isShowFilter) {
      return (
        <Radio.Group
          defaultValue="all"
          onChange={handleRadioChange}
          options={[
            { value: 'all', label: `All${dataSource?.length ?? 0}` },
            {
              value: 'selected',
              label: `Selected${(selectedRowKeys as SelectedKeyType[])?.length ?? 0}`,
            },
          ]}
        />
      );
    }
    return null;
  };
  return (
    <div
      className={`${prefixCls}-popup`}
      tabIndex={0}
      ref={(node) => {
        popupRef.current = node;
        if (externalPopupRef) externalPopupRef.current = node;
      }}
    >
      {renderRadio()}
      <Table
        {...rest}
        rowKey={rowKey}
        dataSource={internalDataSource}
        columns={columns}
        rowSelection={renderRowSelection as TableProps['rowSelection']}
      />
    </div>
  );
};

export default InternalTable;
