import React from 'react';
import DateBody from './DateBody';
import DateHeader from './DateHeader';

export default function DatePanel(props: any) {
  const { prefixCls, showHeader = true } = props;

  return (
    <div className={`${prefixCls}-date-panel`}>
      {showHeader ? <DateHeader {...props} /> : null}
      <DateBody {...props} />
    </div>
  );
}
