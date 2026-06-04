import clsx from 'clsx';
import { ChevronsLeft, ChevronsRight, Ellipsis } from 'lucide-react';
import React from 'react';

import type { PaginationItemsProps } from './interface';

const Items: React.FC<PaginationItemsProps> = (props) => {
  const {
    prefixCls,
    pageCount,
    current,
    classNames,
    styles,
    components,
    overPage = 9,
    onChange,
  } = props;

  const getPageNumberArray = () => {
    if (pageCount <= overPage) {
      return new Array(pageCount).fill(0).map((item, index) => index + 1);
    } else {
      let _array: Array<number | 'right' | 'left'> = [];
      if (current < 7) {
        _array = [1, 2, 3, 4, 5, 6, 7, 'right', pageCount];
      } else if (current >= pageCount - 5) {
        _array = [
          1,
          'left',
          pageCount - 6,
          pageCount - 5,
          pageCount - 4,
          pageCount - 3,
          pageCount - 2,
          pageCount - 1,
          pageCount,
        ];
      } else {
        _array = [
          1,
          'left',
          current - 2,
          current - 1,
          current,
          current + 1,
          current + 2,
          'right',
          pageCount,
        ];
      }
      return _array;
    }
  };

  // Page turn
  const turnPage = (type: string) => {
    let currentPage: number;
    if (type === 'before') {
      currentPage = current - 7 < 1 ? 1 : current - 7;
    } else {
      currentPage = current + 7 > pageCount ? pageCount : current + 7;
    }
    onChange(currentPage);
  };

  const pageNumberArray = getPageNumberArray();

  return (
    <>
      {pageNumberArray.map((number) => {
        if (number === 'left') {
          return (
            <li
              className={clsx(`${prefixCls}-jump-prev`, classNames?.jumpPrev)}
              style={styles?.jumpPrev}
              tabIndex={0}
              onClick={() => turnPage('before')}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  turnPage('before');
                }
              }}
              role="button"
              key="turnleft"
            >
              {components?.jumpPrev ?? (
                <>
                  <span className={`${prefixCls}-jump-prev-ellipsis`}>
                    <Ellipsis
                      className="ellipsis"
                      size={18}
                      strokeWidth={1.5}
                    />
                  </span>
                  <span className={`${prefixCls}-jump-prev-icon`}>
                    <ChevronsLeft
                      className="turn"
                      size={18}
                      strokeWidth={1.5}
                    />
                  </span>
                </>
              )}
            </li>
          );
        } else if (number === 'right') {
          return (
            <li
              className={clsx(`${prefixCls}-jump-next`, classNames?.jumpNext)}
              style={styles?.jumpNext}
              tabIndex={0}
              onClick={() => turnPage('after')}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  turnPage('after');
                }
              }}
              role="button"
              key="turn-right"
            >
              {components?.jumpNext ?? (
                <>
                  <span className={`${prefixCls}-jump-next-ellipsis`}>
                    <Ellipsis
                      className="ellipsis"
                      size={18}
                      strokeWidth={1.5}
                    />
                  </span>
                  <span className={`${prefixCls}-jump-next-icon`}>
                    <ChevronsRight
                      className="turn"
                      size={18}
                      strokeWidth={1.5}
                    />
                  </span>
                </>
              )}
            </li>
          );
        } else {
          return (
            <li
              className={clsx(
                `${prefixCls}-item`,
                {
                  [`${prefixCls}-item-active`]: current === number,
                },
                classNames?.item,
              )}
              style={styles?.item}
              key={number}
              tabIndex={0}
              onClick={() => {
                onChange(number as number);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onChange(number as number);
                }
              }}
            >
              {number}
            </li>
          );
        }
      })}
    </>
  );
};

Items.displayName = 'Items';

export default Items;
