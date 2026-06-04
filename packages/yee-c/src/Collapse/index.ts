import InternalCollapse from './collapse';
import Panel from './panel';

export type { CollapseProps } from './interface';

export type InternalCollapseType = typeof InternalCollapse & {
  Panel: typeof Panel;
};

const Collapse = InternalCollapse as InternalCollapseType;

Collapse.Panel = Panel;

export default Collapse;
