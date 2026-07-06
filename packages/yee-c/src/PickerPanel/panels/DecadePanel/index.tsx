import * as React from 'react';
import type { PanelSharedProps } from '../../interface';

import DecadeBody from './DecadeBody';
import DecadeHeader from './DecadeHeader';

export default function DecadePanel(props: PanelSharedProps) {
  const { prefixCls, offset } = props;

  let offsetYear = 0;
  if (offset?.year) {
    offsetYear = offset.year;
  }

  return (
    <div className={`${prefixCls}-decade-panel`}>
      <DecadeHeader {...props} offsetYear={offsetYear} />
      <DecadeBody {...props} offsetYear={offsetYear} />
    </div>
  );
}
