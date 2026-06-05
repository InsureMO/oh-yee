import MenuItem from './menu-item';
import InternalMenu from './wrapper';

type InternalMenuType = typeof InternalMenu & {
  Item: typeof MenuItem;
};

export type { MenuItemType, MenuProps } from './interface';

const Menu = InternalMenu as InternalMenuType;

Menu.Item = MenuItem;

export default Menu;
