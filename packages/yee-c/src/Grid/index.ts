import InternalGrid from './grid';
import Item from './item';
export type { GridProps, ResponsiveCols } from './interface';

type GridType = typeof InternalGrid & {
  Item: typeof Item;
};

const Grid = InternalGrid as GridType;
Grid.Item = Item;

export default Grid;
