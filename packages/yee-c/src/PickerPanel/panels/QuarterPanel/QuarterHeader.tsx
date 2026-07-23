import * as React from 'react';
import Button from '../../../Button';
import useEvent from '../../../hooks/useEvent';
import type { PanelSharedProps } from '../../interface';
import Header from '../Header';

import pickerUtils from '../../utils/pickerUtils';

export default function QuarterHeader(props: PanelSharedProps) {
  const { prefixCls, viewDate, onViewDateChange, onPanelChange } = props;

  const year = pickerUtils.getYear(viewDate);

  const onSuperPrevClick = useEvent(() => {
    onViewDateChange(pickerUtils.addYear(viewDate, -1));
  });
  const onSuperNextClick = useEvent(() => {
    onViewDateChange(pickerUtils.addYear(viewDate, 1));
  });

  const handlePanelChange = () => {
    onPanelChange('year');
  };

  return (
    <Header
      {...props}
      onSuperPrevClick={onSuperPrevClick}
      onSuperNextClick={onSuperNextClick}
    >
      <Button
        type="text"
        className={`${prefixCls}-year-btn`}
        onClick={handlePanelChange}
      >
        {year}
      </Button>
    </Header>
  );
}
