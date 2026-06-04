import React from 'react';
import DateHeader from './DateHeader';
import DateBody from './DateBody';

export default function DatePanel(props: any) {
  const { prefixCls, showHeader = true } = props;

  return (
    <div className={`${prefixCls}-date-panel`}>
      {showHeader ? <DateHeader {...props} /> : null}
      <DateBody {...props} />
    </div>
  );
}
