import Column from './column';
import Summary from './summary';
import InternalTable from './table';
import Head from './theader';

export type {
  ColumnProps,
  PaginationType,
  RowSelectionType,
  TableProps,
  onChangeParams,
} from './interface';

type TableType = typeof InternalTable & {
  Column: typeof Column;
  Summary: typeof Summary;
  Head: typeof Head;
};

const Table = InternalTable as TableType;

Table.Column = Column;
Table.Summary = Summary;
Table.Head = Head;

export default Table;
