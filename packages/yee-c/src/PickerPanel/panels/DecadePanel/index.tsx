import * as React from 'react';

import DecadeBody from './DecadeBody';
import DecadeHeader from './DecadeHeader';

export default function DecadePanel(props: any) {
  const { viewDate, prefixCls, offset } = props;

  let offsetYear = 0;
  if (offset?.year) {
    offsetYear = parseInt(offset.year);
  }

  return (
    <div className={`${prefixCls}-decade-panel`}>
      <DecadeHeader {...props} offsetYear={offsetYear} />
      <DecadeBody {...props} offsetYear={offsetYear} />
    </div>
  );
}
