import React, { useMemo, forwardRef, useContext } from 'react';
import clsx from 'clsx';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Button from '../Button';
import TransferList from './transfer-list';
import useMergedState from '../hooks/useMergedState';
import { GlobalContext } from '../Config-Provider';
import mergeContextToProps from '../utils/mergeContextToProps'
import type { Key, DataSource, TransferProps, TransferContextValue } from './interface';

import './style/index.less';

export const TransferContext = React.createContext<TransferContextValue & { prefixCls: string }>({
  rowKey: 'key',
  rowLabel: 'label',
  prefixCls: 'yee-transfer',
});

const Transfer = forwardRef<HTMLDivElement, TransferProps>((baseprops, ref) => {
  const { transfer } = useContext(GlobalContext);
  const props = mergeContextToProps(baseprops, transfer);
  const {
    prefixCls = 'yee-transfer',
    className,
    style,
    dataSource = [],
    titles = ['UnSelected', 'Selected'],
    searchable = true,
    targetKeys,
    defaultTargetKeys,
    selectedKeys,
    defaultSelectedKeys,
    oneWay,
    disabled,
    operations,
    pagination,
    rowKey = 'key',
    rowLabel = 'label',
    draggable,
    onChange,
    onSelectChange,
    onDrop,
    ...rest
  } = props;

  const [mergedTargetKeys, setMergedTargetKeys] = useMergedState<Key[]>([], {
    value: targetKeys,
    defaultValue: defaultTargetKeys,
  });

  const [mergedSelectedKeys, setMergedSelectedKeys] = useMergedState<Key[]>([], {
    value: selectedKeys,
    defaultValue: defaultSelectedKeys,
  });

  const [leftData, rightData, leftDataKeys, rightDataKeys] = useMemo(() => {
    if (!Array.isArray(dataSource) || dataSource.length === 0) {
      return [[], [], [], []];
    }

    const left: DataSource[] = [];
    const right: DataSource[] = [];
    const leftKeys: Key[] = [];
    const rightKeys: Key[] = [];

    dataSource.forEach((item) => {
      const key = typeof rowKey === 'function' ? rowKey(item) : item[rowKey];
      if (mergedTargetKeys?.includes(key)) {
        right.push(item);
        rightKeys.push(key);
      } else {
        left.push(item);
        leftKeys.push(key);
      }
    });

    if (right.length && draggable && mergedTargetKeys) {
      const sortedRight = mergedTargetKeys
        .map((key: Key) => right.find((item: DataSource) => item[typeof rowKey === 'function' ? rowKey(item) : rowKey] === key))
        .filter(Boolean) as DataSource[];
      return [left, sortedRight, leftKeys, mergedTargetKeys];
    }

    return [left, right, leftKeys, rightKeys];
  }, [dataSource, mergedTargetKeys, draggable]);

  const [leftSelectedKeys, rightSelectedKeys] = useMemo(() => {
    if (!mergedSelectedKeys || mergedSelectedKeys.length === 0) {
      return [[], []];
    }

    const left: Key[] = [];
    const right: Key[] = [];

    mergedSelectedKeys.forEach((key: Key) => {
      if (mergedTargetKeys?.includes(key)) {
        right.push(key);
      } else {
        left.push(key);
      }
    });

    return [left, right];
  }, [mergedTargetKeys, mergedSelectedKeys]);

  const triggerChange = (
    newTargetKeys: Key[],
    direction: 'left' | 'right',
    moveKeys: Key[]
  ) => {
    setMergedTargetKeys(newTargetKeys);
    onChange?.(newTargetKeys, direction, moveKeys);
  };

  const handleLeftItemSelect = (keys: Key[]) => {
    const newSelectKeys = [...keys, ...rightSelectedKeys];
    setMergedSelectedKeys(newSelectKeys);
    onSelectChange?.(keys, rightSelectedKeys);
  };

  const handleLeftItemSelectAll = (checked: boolean) => {
    const keys = checked ? leftDataKeys : [];
    const newSelectKeys = [...keys, ...rightSelectedKeys];
    setMergedSelectedKeys(newSelectKeys);
    onSelectChange?.(keys, rightSelectedKeys);
  };

  const handleRightItemSelect = (keys: Key[]) => {
    const newSelectKeys = [...leftSelectedKeys, ...keys];
    setMergedSelectedKeys(newSelectKeys);
    onSelectChange?.(leftSelectedKeys, keys);
  };

  const handleRightItemSelectAll = (checked: boolean) => {
    const keys = checked ? rightDataKeys : [];
    const newSelectKeys = [...leftSelectedKeys, ...keys];
    setMergedSelectedKeys(newSelectKeys);
    onSelectChange?.(leftSelectedKeys, keys);
  };

  const handleRightItemDelete = (key: Key) => {
    const newTargetKeys = rightDataKeys.filter((k: Key) => k !== key);
    triggerChange(newTargetKeys, 'left', [key]);
  };

  const moveToRight = () => {
    const newTargetKeys = [...rightDataKeys, ...leftSelectedKeys];
    setMergedSelectedKeys([...rightSelectedKeys]);
    onSelectChange?.([], rightSelectedKeys);
    triggerChange(newTargetKeys, 'right', leftSelectedKeys);
  };

  const moveToLeft = () => {
    const newTargetKeys = rightDataKeys.filter((k: Key) => !rightSelectedKeys.includes(k));
    setMergedSelectedKeys([...leftSelectedKeys]);
    onSelectChange?.(leftSelectedKeys, []);
    triggerChange(newTargetKeys, 'left', rightSelectedKeys);
  };

  const renderOperations = () => {
    const leftSelectedLen = leftSelectedKeys.length;
    const rightSelectedLen = rightSelectedKeys.length;

    return (
      <div className={`${prefixCls}-operation`}>
        <Button
          variant="outlined"
          size="small"
          disabled={leftSelectedLen === 0}
          onClick={moveToRight}
          icon={<ChevronRight size={16} />}
        >
          {operations?.[0]}
        </Button>
        {!oneWay && (
          <Button
            variant="outlined"
            size="small"
            disabled={rightSelectedLen === 0}
            onClick={moveToLeft}
            icon={<ChevronLeft size={16} />}
          >
            {operations?.[1]}
          </Button>
        )}
      </div>
    );
  };

  return (
    <div
      ref={ref}
      className={clsx(
        prefixCls,
        {
          [`${prefixCls}-disabled`]: disabled,
        },
        className
      )}
      style={style}
      {...rest}
    >
      <TransferContext.Provider
        value={{
          prefixCls,
          rowKey,
          rowLabel,
          disabled,
        }}
      >
        <TransferList
          type="source"
          title={titles[0]}
          dataSource={leftData}
          searchable={searchable}
          pagination={pagination}
          checkedKeys={leftSelectedKeys}
          onItemSelect={handleLeftItemSelect}
          onItemSelectAll={handleLeftItemSelectAll}
        />
        {renderOperations()}
        <TransferList
          type="target"
          title={titles[1]}
          dataSource={rightData}
          searchable={searchable}
          pagination={pagination}
          checkedKeys={rightSelectedKeys}
          oneWay={oneWay}
          draggable={draggable}
          onDrop={onDrop}
          onDelete={handleRightItemDelete}
          onItemSelect={handleRightItemSelect}
          onItemSelectAll={handleRightItemSelectAll}
        />
      </TransferContext.Provider>
    </div>
  );
});

Transfer.displayName = 'Transfer';

export default Transfer;
export type { Key, DataSource, TransferProps, TransferListProps, TransferContextValue } from './interface';
