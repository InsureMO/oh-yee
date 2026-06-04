import React from 'react';
import { SpaceItemProps } from './interface';

const Item: React.FC<SpaceItemProps> & { isSpaceItem: true } = (props) => {
  return props.children as React.ReactElement;
};

Item.isSpaceItem = true as const;
Item.displayName = 'SpaceItem';

export default Item;
