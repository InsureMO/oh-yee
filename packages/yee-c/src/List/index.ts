import InternalList from './list';
import ListItem from './list-item';

export type { ListItemProps, ListProps } from './interface';

type ListType = typeof InternalList & {
  Item: typeof ListItem;
};

const List = InternalList as ListType;

List.Item = ListItem;

export default List;
