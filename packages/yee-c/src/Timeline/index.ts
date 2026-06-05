import InternalTimeline from './timeline';
import Item from './timeline-item';

export type { TimelineProps } from './interface';

export type InternalTimelineType = typeof InternalTimeline & {
  Item: typeof Item;
};

const Timeline = InternalTimeline as InternalTimelineType;
Timeline.Item = Item;
export default Timeline;
