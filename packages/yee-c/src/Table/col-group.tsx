import React from 'react';
import { ColumnProps } from './interface';

interface TableColGroupProps {
  columns: Array<ColumnProps>;
}

// Optimization: add memo comparison function to avoid unnecessary re-renders
const areEqual = (
  prevProps: TableColGroupProps,
  nextProps: TableColGroupProps,
) => {
  return prevProps.columns === nextProps.columns;
};

const ColGroup = React.memo(({ columns }: TableColGroupProps) => {
  return (
    <colgroup>
      {columns.map((column, index) => {
        const { width, style, key, dataIndex } = column;

        // Optimization: handle empty width to avoid invalid styles
        const normalizedWidth = width ?? undefined;

        // Optimization: avoid creating new style objects each time
        const colStyle = normalizedWidth
          ? {
              width: normalizedWidth,
              minWidth: normalizedWidth,
              ...style,
            }
          : { ...style };

        return <col style={colStyle} key={key || dataIndex || index} />;
      })}
    </colgroup>
  );
}, areEqual); // Optimization: use custom comparison function

ColGroup.displayName = 'ColGroup';

export default React.memo(ColGroup);
