import Compact from './compact';
import InternalSpace from './space';
import Item from './item';
export type { SpaceProps, SpaceItemProps, SpaceCompactProps } from './interface';

type SpaceType = typeof InternalSpace & {
  Compact: typeof Compact;
  Item: typeof Item;
};

const Space = InternalSpace as SpaceType;

Space.Compact = Compact;
Space.Item = Item;

export default Space;
