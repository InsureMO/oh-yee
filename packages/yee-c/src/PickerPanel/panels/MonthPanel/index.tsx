import * as React from 'react';

import MonthBody from './MonthBody';
import MonthHeader from './MonthHeader';

export default function DecadePanel(props: any) {
  const { prefixCls, offset, showHeader = true } = props;

  let offsetYear = 0;
  if (offset?.year) {
    offsetYear = parseInt(offset.year);
  }

  return (
    <div className={`${prefixCls}-month-panel`}>
      {showHeader ? <MonthHeader {...props} offsetYear={offsetYear} /> : null}
      <MonthBody {...props} />
    </div>
  );
}
