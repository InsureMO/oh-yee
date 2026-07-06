import * as React from 'react';
import type { PanelSharedProps } from '../../interface';

import QuarterBody from './QuarterBody';
import QuarterHeader from './QuarterHeader';

export default function DecadePanel(props: PanelSharedProps) {
  const { prefixCls } = props;
  return (
    <div className={`${prefixCls}-quarter-panel`}>
      <QuarterHeader {...props} />
      <QuarterBody {...props} />
    </div>
  );
}
