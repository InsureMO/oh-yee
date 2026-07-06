import * as React from 'react';
import Button from '../../../Button';
import useEvent from '../../../hooks/useEvent';
import type { PanelSharedProps } from '../../interface';
import pickerUtils from '../../utils/pickerUtils';
import Header from '../Header';

export default function MonthHeader(props: PanelSharedProps) {
  const { prefixCls, viewDate, offsetYear = 0, onViewDateChange, onPanelChange } =
    props;

  const year = pickerUtils.getYear(viewDate) + offsetYear;

  const onSuperPrevClick = useEvent(() => {
    const newViewDate = pickerUtils.addYear(viewDate, -1);
    onViewDateChange(newViewDate);
  });

  const onSuperNextClick = useEvent(() => {
    const newViewDate = pickerUtils.addYear(viewDate, 1);
    onViewDateChange(newViewDate);
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
