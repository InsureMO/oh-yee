import clsx from 'clsx';
import React, { useContext } from 'react';
import { pickDataAttrs } from '../utils/types';
import MenuItem from './menu-item';
import { MenuWrapperCtx } from './wrapper';

import type {
  MenuDividerType,
  MenuItemCommonType,
  MenuItemType,
  MenuProps,
} from './interface';

type InnerMenuProps = MenuProps & {
  root?: boolean;
  level: number;
};

type MenuContextType = {
  level: number;
  mode?: 'vertical' | 'inline' | 'horizontal';
  classNames?: MenuProps['classNames'];
  styles?: MenuProps['styles'];
};

export const MenuCtx = React.createContext<MenuContextType>({
  level: 0,
});

const MenuDivider = ({ prefixCls }: { prefixCls: string }) => (
  <li className={`${prefixCls}-item-divider`} role="separator" />
);

const MenuGroup = ({
  item,
  prefixCls,
  renderItems,
}: {
  item: { label: React.ReactNode; children: MenuItemType[] };
  prefixCls: string;
  renderItems: (items: MenuItemType[]) => React.ReactNode[];
}) => (
  <li className={`${prefixCls}-item-group`}>
    <div className={`${prefixCls}-item-group-title`}>{item.label}</div>
    <ul className={`${prefixCls}-item-group-list`}>
      {renderItems(item.children)}
    </ul>
  </li>
);

const Menu = (props: InnerMenuProps) => {
  const {
    items,
    root,
    mode = 'inline',
    level = 0,
    className,
    style,
    classNames,
    styles,
  } = props;

  const dataAttrs = root
    ? pickDataAttrs(props as unknown as Record<string, unknown>)
    : {};
  const { prefixCls, inlineCollapsed, footer } = useContext(MenuWrapperCtx);

  const renderItems = (items: MenuItemType[]) => {
    return items.map((item, index) => {
      return <MenuItem item={item} key={item.key ?? `__item_${index}`} />;
    });
  };

  const getChildFromItems = (items: Array<MenuItemCommonType>) => {
    return items.map((item, index) => {
      if ('type' in item && item.type === 'divider') {
        const dividerItem = item as MenuDividerType;
        return (
          <MenuDivider
            prefixCls={prefixCls}
            key={dividerItem.key ?? `__divider_${index}`}
          />
        );
      }
      if ('type' in item && item.type === 'group') {
        return (
          <MenuGroup
            key={`__group_${index}`}
            item={item as { label: React.ReactNode; children: MenuItemType[] }}
            prefixCls={prefixCls}
            renderItems={renderItems}
          />
        );
      }
      const menuItem = item as MenuItemType;
      return <MenuItem item={menuItem} key={menuItem.key} />;
    });
  };

  const cls = clsx(
    prefixCls,
    [`${prefixCls}-${root ? 'root' : 'sub'}`],
    [`${prefixCls}-${mode}`],
    {
      'yee-dropdown': !root && mode !== 'inline',
      [`${prefixCls}-inline-collapsed`]:
        root && mode === 'inline' && inlineCollapsed,
      [`${className}`]: root && className,
    },
  );

  const rootStyle = root ? { ...style } : {};

  return (
    <ul {...dataAttrs} className={cls} style={rootStyle} role="menu">
      <MenuCtx.Provider value={{ level, mode, classNames, styles }}>
        {getChildFromItems(items)}
        {level === 0 && footer && (
          <li className={`${prefixCls}-footer`}>{footer}</li>
        )}
      </MenuCtx.Provider>
    </ul>
  );
};

Menu.displayName = 'Menu';

export default Menu;
