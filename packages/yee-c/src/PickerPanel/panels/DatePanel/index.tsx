import React from 'react';
import type { PanelSharedProps } from '../../interface';
import DateBody from './DateBody';
import DateHeader from './DateHeader';

export default function DatePanel(props: PanelSharedProps) {
  const { prefixCls, showHeader = true } = props;

  return (
    <div className={`${prefixCls}-date-panel`}>
      {showHeader ? <DateHeader {...props} /> : null}
      <DateBody {...props} />
    </div>
  );
}
