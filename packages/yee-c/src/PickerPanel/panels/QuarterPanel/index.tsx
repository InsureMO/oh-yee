import * as React from 'react';

import QuarterBody from './QuarterBody';
import QuarterHeader from './QuarterHeader';

export default function DecadePanel(props: any) {
  const { prefixCls } = props;
  return (
    <div className={`${prefixCls}-quarter-panel`}>
      <QuarterHeader {...props} />
      <QuarterBody {...props} />
    </div>
  );
}
