import * as React from 'react';
import Button from '../../../Button';
import useEvent from '../../../hooks/useEvent';
import pickerUtils from '../../utils/pickerUtils';
import Header from '../Header';

export default function WeekHeader(props: any) {
  const { viewDate, onViewDateChange, onPanelChange } = props;

  const year = pickerUtils.getYear(viewDate);
  const month = pickerUtils.getMonth(viewDate);

  const onSuperPrevClick = useEvent(() => {
    const newViewDate = pickerUtils.addYear(viewDate, -1);
    onViewDateChange(newViewDate);
  });
  const onSuperNextClick = useEvent(() => {
    const newViewDate = pickerUtils.addYear(viewDate, 1);
    onViewDateChange(newViewDate);
  });

  const onPrevClick = useEvent(() => {
    const newViewDate = pickerUtils.addMonth(viewDate, -1);
    onViewDateChange(newViewDate);
  });

  const onNextClick = useEvent(() => {
    const newViewDate = pickerUtils.addMonth(viewDate, 1);
    onViewDateChange(newViewDate);
  });

  const handlePanelChange = (type: 'month' | 'year') => {
    onPanelChange(type);
  };

  return (
    <Header
      onSuperPrevClick={onSuperPrevClick}
      onSuperNextClick={onSuperNextClick}
      onPrevClick={onPrevClick}
      onNextClick={onNextClick}
    >
      <Button type="text" onClick={() => handlePanelChange('year')}>
        {year}
      </Button>
      -
      <Button type="text" onClick={() => handlePanelChange('month')}>
        {month + 1}
      </Button>
    </Header>
  );
}
