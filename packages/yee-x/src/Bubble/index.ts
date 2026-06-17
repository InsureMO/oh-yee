import InBubble from './bubble';
import BubbleList from './bubble-list';
export type { BubbleListProps, BubbleProps, RoleType } from './interface';

type BubbleType = typeof InBubble & {
  List: typeof BubbleList;
};

const Bubble = InBubble as BubbleType;

Bubble.List = BubbleList;

export default Bubble;
