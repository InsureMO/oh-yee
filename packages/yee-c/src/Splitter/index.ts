import InternalSplitter from './splitter';
import Item from './splitter-item';

export type { SplitterItemProps, SplitterProps } from './interface';

type SplitterType = typeof InternalSplitter & {
  Item: typeof Item;
};

const Splitter = InternalSplitter as SplitterType;

Splitter.Item = Item;

export default Splitter;
