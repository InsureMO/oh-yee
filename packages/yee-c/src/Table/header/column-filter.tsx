import * as React from 'react';
import { ColumnProps } from '../interface';

export interface ColumnFilterProps {
  columnFilter?: boolean | Record<string, any>;
  originalColumns: ColumnProps[];
}

const ColumnFilter: React.FC<ColumnFilterProps> = (props) => {
  const {
    // columnFilter,
    // originalColumns,
    // onColumnVisibleChange, // Handle visible columns in table
  } = props;

  //   const { render = undefined, visible = true } =
  //     typeof columnFilter === 'boolean' ? ({} as any) : columnFilter;

  const renderOverlay = () => {
    return (
      //   <FilterTransfer.Popup {...columnFilterProps}>
      //     {renderContent ? (
      //       renderContent
      //     ) : (
      //       <div className="yee-table-filter-icon">
      //         <Button icon="Setting" type="text" />
      //       </div>
      //     )}
      //   </FilterTransfer.Popup>
      <span></span>
    );
  };

  return <div className="yee-table-filter-container">{renderOverlay()}</div>;
};

export default React.memo(ColumnFilter);
