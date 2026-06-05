import Compact from './compact';
import Item from './item';
import InternalSpace from './space';
export type {
  SpaceCompactProps,
  SpaceItemProps,
  SpaceProps,
} from './interface';

type SpaceType = typeof InternalSpace & {
  Compact: typeof Compact;
  Item: typeof Item;
};

const Space = InternalSpace as SpaceType;

Space.Compact = Compact;
Space.Item = Item;

export default Space;
