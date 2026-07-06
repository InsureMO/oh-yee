import React from 'react';
import type { PanelSharedProps } from '../../interface';
import YearBody from './YearBody';
import YearHeader from './YearHeader';

export default function DecadePanel(props: PanelSharedProps) {
  const { prefixCls, offset } = props;

  let offsetYear = 0;
  if (offset?.year) {
    offsetYear = offset.year;
  }

  return (
    <div className={`${prefixCls}-year-panel`}>
      <YearHeader {...props} offsetYear={offsetYear} />
      <YearBody {...props} offsetYear={offsetYear} />
    </div>
  );
}
