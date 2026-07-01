import clsx from 'clsx';
import { Search, X } from 'lucide-react';
import React, { useContext, useMemo, useState } from 'react';
import Button from '../Button';
import Checkbox from '../Checkbox';
import Input from '../Input';
import { useLocale } from '../locale';
import Pagination from '../Pagination';
import type { DataSource, TransferListProps } from './interface';
import { TransferContext } from './transfer';

const TransferList: React.FC<TransferListProps> = (props) => {
  const {
    title,
    dataSource = [],
    searchable,
    checkedKeys,
    oneWay,
    pagination,
    onDelete,
    onItemSelect,
    onItemSelectAll,
  } = props;

  const { rowKey, rowLabel, disabled, prefixCls } = useContext(TransferContext);
  const { locale } = useLocale();
  const { transfer: transferLocale } = locale;
  const [searchValue, setSearchValue] = useState('');
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(pagination?.pageSize ?? 5);

  const currentDataSource = useMemo(() => {
    if (!pagination || !Array.isArray(dataSource)) {
      return dataSource;
    }

    const len = dataSource.length;
    let _current = current;

    if (Math.ceil(len / pageSize) < current) {
      _current = Math.ceil(len / pageSize) || 1;
      setCurrent(_current);
    }

    return dataSource.slice((_current - 1) * pageSize, _current * pageSize);
  }, [current, pageSize, dataSource, pagination]);

  const filteredDataSource = useMemo(() => {
    if (!searchValue) {
      return currentDataSource;
    }

    return currentDataSource.filter((item) => {
      const text =
        typeof rowLabel === 'function' ? rowLabel(item) : item[rowLabel];
      const lowerText = (text || '').toLowerCase();
      return lowerText.includes(searchValue.toLowerCase());
    });
  }, [currentDataSource, searchValue]);

  const { totalNumber, selectNumber, checkedAllMark } = useMemo(() => {
    const total = dataSource.length;
    const selected = checkedKeys.length;
    const allChecked = total > 0 && total === selected;

    return {
      totalNumber: total,
      selectNumber: selected,
      checkedAllMark: allChecked,
    };
  }, [dataSource, checkedKeys]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handlePageChange = ({ current, pageSize }: any) => {
    if (!pagination?.current) {
      setCurrent(current);
    }

    if (!pagination?.pageSize) {
      setPageSize(pageSize);
    }

    pagination?.onChange?.({ current, pageSize });
  };

  const handleDelete = (e: React.MouseEvent, key: string | number) => {
    e.stopPropagation();
    onDelete?.(key);
  };

  const renderHeaderCounter = () => {
    if (oneWay) {
      return (
        <span>
          {totalNumber} {totalNumber > 1 ? 'items' : 'item'}
        </span>
      );
    }

    return (
      <Checkbox
        checked={checkedAllMark}
        indeterminate={checkedKeys.length > 0 && !checkedAllMark}
        disabled={disabled}
        onChange={(e) => onItemSelectAll(e.target.checked)}
      >
        <span>
          {selectNumber}/{totalNumber} {totalNumber > 1 ? 'items' : 'item'}
        </span>
      </Checkbox>
    );
  };

  const renderTransferHeader = () => {
    return (
      <div className={`${prefixCls}-list-header`}>
        {totalNumber > 0 && renderHeaderCounter()}
        <span className={`${prefixCls}-list-header-title`}>{title}</span>
      </div>
    );
  };

  const renderSearch = () => {
    if (!searchable) {
      return null;
    }

    return (
      <div className={`${prefixCls}-search`}>
        <Input
          prefix={<Search size={16} />}
          placeholder={transferLocale.searchPlaceholder}
          onChange={handleSearch}
        />
      </div>
    );
  };

  const getOneWayList = (dataList: DataSource[]) => {
    const removable = true;

    return (
      <ul className={`${prefixCls}-list-body`}>
        {dataList.map((data, index) => {
          const key =
            typeof rowKey === 'function' ? rowKey(data) : data[rowKey];
          const label =
            typeof rowLabel === 'function' ? rowLabel(data) : data[rowLabel];
          const htmlTitle = title ?? label;

          return (
            <li
              key={key || index}
              className={clsx(`${prefixCls}-list-item`, {
                [`${prefixCls}-list-item-disabled`]: data.disabled,
              })}
            >
              <span className={`${prefixCls}-list-item-text`} title={htmlTitle}>
                {label}
              </span>
              {!data.disabled && removable && (
                <Button
                  variant="text"
                  size="small"
                  className={`${prefixCls}-list-delete`}
                  onClick={(e) => handleDelete(e, key)}
                  icon={<X size={16} />}
                />
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  const renderTransferList = () => {
    if (oneWay) {
      return getOneWayList(filteredDataSource);
    }

    const checkboxOptions = filteredDataSource.map((item) => {
      const key = typeof rowKey === 'function' ? rowKey(item) : item[rowKey];
      const label =
        typeof rowLabel === 'function' ? rowLabel(item) : item[rowLabel];

      return {
        label,
        value: key,
        disabled: item.disabled,
      };
    });

    return (
      <ul className={`${prefixCls}-list-body`}>
        {checkboxOptions.map((option, index) => (
          <li className={`${prefixCls}-list-item`} key={option.value || index}>
            <Checkbox
              value={option.value}
              disabled={option.disabled || disabled}
              checked={checkedKeys.includes(option.value)}
              onChange={(e) => {
                const newValue = e.target.checked
                  ? [...checkedKeys, option.value]
                  : checkedKeys.filter((k) => k !== option.value);
                onItemSelect(newValue);
              }}
            >
              {option.label}
            </Checkbox>
          </li>
        ))}
      </ul>
    );
  };

  const renderPagination = () => {
    if (!pagination) {
      return null;
    }

    const total = Array.isArray(dataSource) ? dataSource.length : 0;

    return (
      <Pagination
        simple
        showTotal={false}
        total={total}
        current={current}
        pageSize={pageSize}
        {...pagination}
        onChange={handlePageChange}
      />
    );
  };

  return (
    <div className={`${prefixCls}-list`}>
      {renderTransferHeader()}
      {renderSearch()}
      {React.isValidElement(dataSource) ? dataSource : renderTransferList()}
      {renderPagination()}
    </div>
  );
};

export default TransferList;
