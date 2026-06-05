import * as React from 'react';
import useEvent from '../../../hooks/useEvent';
import pickerUtils from '../../utils/pickerUtils';
import Header from '../Header';

export default function DecadeHeader(props: any) {
  const { viewDate, offsetYear, onViewDateChange } = props;
  const onSuperPrevClick = useEvent(() => {
    onViewDateChange(pickerUtils.addYear(viewDate, -100));
  });

  const onSuperNextClick = useEvent(() => {
    onViewDateChange(pickerUtils.addYear(viewDate, 100));
  });

  const yearNumber = pickerUtils.getYear(viewDate);

  const startDate = ~~(yearNumber / 100) * 100 + offsetYear;
  const endDate = startDate + 99;

  return (
    <Header
      {...props}
      onSuperPrevClick={onSuperPrevClick}
      onSuperNextClick={onSuperNextClick}
    >
      {`${startDate}-${endDate}`}
    </Header>
  );
}
