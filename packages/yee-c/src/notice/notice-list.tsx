import React from 'react';
import type { NoticeProps, PlacementType } from './interface';
import Notice from './notice';

import './style/index.less';

const NoticeList = ({
  items,
  placement = 'topRight',
  onDestroy,
}: {
  items: NoticeProps[];
  placement?: PlacementType;
  onDestroy: (key: string | number, timerGeneration?: number) => void;
}) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className={`yee-notice-list yee-notice-list-${placement}`}>
      {items.map((item: NoticeProps) => (
        <Notice {...item} id={item.key} onDestroy={onDestroy} key={item.key} />
      ))}
    </div>
  );
};

export default NoticeList;
