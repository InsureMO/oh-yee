import clsx from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useContext, useRef } from 'react';
import { GlobalContext } from '../Config-Provider';
import Input from '../Input';
import Select from '../Select';
import useMergedState from '../hooks/useMergedState';
import { useLocale } from '../locale';
import mergeContextToProps from '../utils/mergeContextToProps';
import type { PaginationProps } from './interface';
import Items from './items';

import './style/index.less';

const Pagination = React.forwardRef(
  (baseprops: PaginationProps, ref: React.Ref<HTMLUListElement>) => {
    const { pagination } = useContext(GlobalContext);
    const props = mergeContextToProps(baseprops, pagination);
    const { locale } = useLocale();
    const { pagination: paginationLocale } = locale;
    const {
      prefixCls = 'yee-pagination',
      disabled,
      current,
      defaultCurrent = 1,
      classNames,
      styles,
      components,
      size,
      simple,
      total = 0,
      pageSize,
      defaultPageSize,
      showSizeChanger,
      showQuickJumper,
      style,
      className,
      hideOnSinglePage,
      pageSizeOptions = [5, 10, 20, 30, 50],
      showTotal,
      onChange,
      onPageSizeChange,
      ...rest
    } = props;

    const numberRef = useRef<HTMLInputElement>(null);

    const [mergedCurrent, setMergedCurrent] = useMergedState(1, {
      value: current,
      defaultValue: defaultCurrent,
    });

    const [mergedPageSize, setMergedPageSize] = useMergedState(10, {
      value: pageSize,
      defaultValue: defaultPageSize,
    });

    const pageCount = Math.ceil(total / mergedPageSize);

    const options = pageSizeOptions.map((opt) => ({
      label: String(opt),
      value: opt,
    }));

    const updateCurrentPage = (current: number, pageSize: number) => {
      setMergedCurrent(current);
      onChange?.({ current: current, pageSize: pageSize });
    };

    // Previous page
    const prevClick = () => {
      if (mergedCurrent - 1 <= 0) {
        return;
      }
      updateCurrentPage(
        mergedCurrent - 1 > 0 ? mergedCurrent - 1 : mergedCurrent,
        mergedPageSize,
      );
    };

    // Next page
    const nextClick = () => {
      if (mergedCurrent + 1 > pageCount) {
        return;
      }
      updateCurrentPage(
        mergedCurrent + 1 <= pageCount ? mergedCurrent + 1 : mergedCurrent,
        mergedPageSize,
      );
    };

    // Click number to jump
    const handleCurrentChange = (value: number) => {
      updateCurrentPage(value, mergedPageSize);
    };

    // Select items per page
    const selectCallback = (value: unknown) => {
      if (typeof value === 'number') {
        setMergedPageSize(value);
        const current = mergedCurrent > pageCount ? pageCount : mergedCurrent;
        updateCurrentPage(current, value);
        onPageSizeChange?.({ current: current, pageSize: value });
      }
    };

    // Quick jump
    const jumperBlur = (
      event: React.FocusEvent<HTMLInputElement>,
      clear: boolean,
    ) => {
      const v = event.target.value;
      let num = parseInt(v);
      if (num <= 0) {
        num = 1;
      } else if (num > pageCount) {
        num = pageCount;
      }
      updateCurrentPage(num, mergedPageSize);

      if (clear && numberRef.current) {
        numberRef.current.value = '';
      }
    };

    const cls = clsx(
      prefixCls,
      {
        [`${prefixCls}-mini`]: size === 'small',
        [`${prefixCls}-simple`]: simple,
        [`${prefixCls}-disabled`]: disabled,
      },
      className,
    );

    const renderNumber = (clear: boolean) => {
      return (
        <Input
          ref={numberRef}
          type="integer"
          className={`${prefixCls}-input ${prefixCls}-simple-input`}
          disabled={disabled}
          allowClear={false}
          min={1}
          max={pageCount}
          onBlur={(event) => jumperBlur(event, clear)}
        />
      );
    };

    const renderTotal = () => {
      if (showTotal) {
        return (
          <li className={`${prefixCls}-total`}>
            {typeof showTotal === 'function'
              ? showTotal(total, mergedCurrent)
              : `Total ${total} items`}
          </li>
        );
      }
      return null;
    };

    const renderPrevious = () => {
      return (
        <li
          className={clsx(
            `${prefixCls}-prev`,
            {
              [`${prefixCls}-prev-disabled`]: mergedCurrent === 1,
            },
            classNames?.prev,
          )}
          style={styles?.prev}
          tabIndex={mergedCurrent === 1 ? undefined : 0}
          onClick={prevClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              prevClick();
            }
          }}
          role="button"
          aria-label="Previous page"
          aria-disabled={mergedCurrent === 1 || undefined}
          key="prev"
        >
          {components?.prev ?? (
            <ChevronLeft size={20} strokeWidth={1.5} aria-hidden="true" />
          )}
        </li>
      );
    };

    const renderNext = () => {
      return (
        <li
          className={clsx(
            `${prefixCls}-next`,
            {
              [`${prefixCls}-next-disabled`]: mergedCurrent === pageCount,
            },
            classNames?.next,
          )}
          style={styles?.next}
          tabIndex={mergedCurrent === pageCount ? undefined : 0}
          onClick={nextClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              nextClick();
            }
          }}
          role="button"
          aria-label="Next page"
          aria-disabled={mergedCurrent === pageCount || undefined}
          key="next"
        >
          {components?.next ?? (
            <ChevronRight size={20} strokeWidth={1.5} aria-hidden="true" />
          )}
        </li>
      );
    };

    const renderSizeChanger = () => {
      if (!showSizeChanger) {
        return null;
      }

      return (
        <li className={`${prefixCls}-size-changer`} key="size-change">
          <Select
            placement="bottomLeft"
            value={mergedPageSize}
            disabled={disabled}
            searchable={false}
            allowClear={false}
            options={options}
            onChange={selectCallback}
          />
        </li>
      );
    };

    const renderQuickJumper = (clear: boolean) => {
      if (!showQuickJumper || simple) {
        return null;
      }

      return (
        <li className={`${prefixCls}-quick-jumper`} key="quick-jumper">
          <span>{paginationLocale.jumpTo}</span>
          {renderNumber(clear)}
        </li>
      );
    };

    if ((hideOnSinglePage && pageCount <= 1) || pageCount === 0) {
      return null;
    }

    return (
      <ul
        {...rest}
        className={cls}
        style={style}
        ref={ref}
        role="navigation"
        aria-label="Pagination"
        aria-disabled={disabled || undefined}
      >
        {renderTotal()}
        {renderPrevious()}
        {simple ? (
          <li className={`${prefixCls}-simple`}>
            {renderNumber(false)}
            <span className="split" aria-hidden="true">
              /
            </span>
            <span className="total-page">{pageCount}</span>
          </li>
        ) : (
          <Items
            prefixCls={prefixCls}
            pageCount={pageCount}
            current={mergedCurrent}
            onChange={handleCurrentChange}
          />
        )}

        {renderNext()}
        {renderSizeChanger()}
        {renderQuickJumper(true)}
      </ul>
    );
  },
);

Pagination.displayName = 'Pagination';

export default Pagination;
