import InternalTabs from './tabs';
import TabsItem from './tabs-item';

export type { TabsProps, TabsItemProps } from './interface';

export type InternalTabsProps = typeof InternalTabs & {
  Item: typeof TabsItem;
};

const Tabs = InternalTabs as InternalTabsProps;

Tabs.Item = TabsItem;

export default Tabs;
