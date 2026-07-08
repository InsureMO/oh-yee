import clsx from 'clsx';
import React, { useContext } from 'react';
import { GlobalContext } from '../Config-Provider';
import mergeContextToProps from '../utils/mergeContextToProps';
import DescriptionsItem from './descriptions-item';
import type {
  DescriptionsItemProps,
  DescriptionsProps,
  DescriptionsType,
} from './interface';
import './style/index.less';

interface InternalItem {
  label?: React.ReactNode;
  children?: React.ReactNode;
  span: number;
}

function getItemsFromChildren(children: React.ReactNode): InternalItem[] {
  const items: InternalItem[] = [];
  React.Children.forEach(children, (child) => {
    if (
      React.isValidElement<DescriptionsItemProps>(child) &&
      child.type === DescriptionsItem
    ) {
      const { label, children: childContent, span = 1 } = child.props;
      items.push({
        label,
        children: childContent,
        span: span === 'filled' ? -1 : span,
      });
    }
  });
  return items;
}

function getRows(items: InternalItem[], column: number): InternalItem[][] {
  const rows: InternalItem[][] = [];
  let currentRow: InternalItem[] = [];
  let currentSpan = 0;

  for (const item of items) {
    const itemSpan =
      item.span === -1
        ? Math.max(column - currentSpan, 1)
        : Math.min(item.span, column);

    if (currentSpan + itemSpan > column && currentRow.length > 0) {
      rows.push(currentRow);
      currentRow = [];
      currentSpan = 0;
    }

    currentRow.push({ ...item, span: itemSpan });
    currentSpan += itemSpan;

    if (currentSpan >= column) {
      rows.push(currentRow);
      currentRow = [];
      currentSpan = 0;
    }
  }

  if (currentRow.length > 0) {
    rows.push(currentRow);
  }

  return rows;
}

const Descriptions = React.forwardRef<HTMLDivElement, DescriptionsProps>(
  (baseprops, ref) => {
    const { descriptions } = useContext(GlobalContext);
    const props = mergeContextToProps(baseprops, descriptions);

    const {
      prefixCls = 'yee-descriptions',
      className,
      style,
      classNames,
      styles,
      bordered = false,
      column = 3,
      layout = 'horizontal',
      size = 'default',
      title,
      extra,
      items,
      children,
      ...rest
    } = props;

    // Collect items from either `items` prop or children
    const internalItems: InternalItem[] = items
      ? items.map((item) => ({
          label: item.label,
          children: item.children,
          span: item.span === 'filled' ? -1 : (item.span ?? 1),
        }))
      : getItemsFromChildren(children);

    const rows = getRows(internalItems, column);

    const cls = clsx(
      prefixCls,
      `${prefixCls}-${size}`,
      {
        [`${prefixCls}-bordered`]: bordered,
        [`${prefixCls}-horizontal`]: layout === 'horizontal',
        [`${prefixCls}-vertical`]: layout === 'vertical',
      },
      className,
    );

    const renderHeader = () => {
      if (!title && !extra) return null;
      return (
        <div
          className={clsx(`${prefixCls}-header`, classNames?.header)}
          style={styles?.header}
        >
          {title && (
            <div
              className={clsx(`${prefixCls}-title`, classNames?.title)}
              style={styles?.title}
            >
              {title}
            </div>
          )}
          {extra && (
            <div
              className={clsx(`${prefixCls}-extra`, classNames?.extra)}
              style={styles?.extra}
            >
              {extra}
            </div>
          )}
        </div>
      );
    };

    const renderRows = () => {
      if (layout === 'vertical') {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return renderVerticalLayout();
      }
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      return renderHorizontalLayout();
    };

    const renderHorizontalLayout = () => {
      return rows.map((row, rowIdx) => (
        <tr key={rowIdx}>
          {row.map((item, colIdx) => {
            const labelColSpan = bordered ? item.span : 1;
            const contentColSpan = bordered ? item.span : item.span;
            return (
              <React.Fragment key={colIdx}>
                <th
                  className={clsx(`${prefixCls}-item-label`, classNames?.label)}
                  style={styles?.label}
                  colSpan={labelColSpan}
                >
                  {item.label}
                </th>
                <td
                  className={clsx(
                    `${prefixCls}-item-content`,
                    classNames?.content,
                  )}
                  style={styles?.content}
                  colSpan={contentColSpan}
                >
                  {item.children}
                </td>
              </React.Fragment>
            );
          })}
        </tr>
      ));
    };

    const renderVerticalLayout = () => {
      // Vertical: label row first, then content row
      const elements: React.ReactNode[] = [];
      rows.forEach((row, rowIdx) => {
        // Label row
        elements.push(
          <tr key={`label-${rowIdx}`}>
            {row.map((item, colIdx) => (
              <th
                key={colIdx}
                className={clsx(`${prefixCls}-item-label`, classNames?.label)}
                style={styles?.label}
                colSpan={item.span}
              >
                {item.label}
              </th>
            ))}
          </tr>,
        );
        // Content row
        elements.push(
          <tr key={`content-${rowIdx}`}>
            {row.map((item, colIdx) => (
              <td
                key={colIdx}
                className={clsx(
                  `${prefixCls}-item-content`,
                  classNames?.content,
                )}
                style={styles?.content}
                colSpan={item.span}
              >
                {item.children}
              </td>
            ))}
          </tr>,
        );
      });
      return elements;
    };

    return (
      <div {...rest} className={cls} style={style} ref={ref}>
        {renderHeader()}
        <table
          className={clsx(`${prefixCls}-table`, classNames?.table)}
          style={styles?.table}
        >
          <tbody>{renderRows()}</tbody>
        </table>
      </div>
    );
  },
) as DescriptionsType;

Descriptions.displayName = 'Descriptions';
Descriptions.Item = DescriptionsItem;

export default Descriptions;
