import * as React from 'react';
import Button from '../../../Button';
import useEvent from '../../../hooks/useEvent';
import Header from '../Header';
import type { PanelSharedProps } from '../../interface';

import pickerUtils from '../../utils/pickerUtils';

export default function YearHeader(props: PanelSharedProps) {
  const {
    prefixCls,
    viewDate,
    onViewDateChange,
    onPanelChange,
    offsetYear = 0,
  } = props;

  const viewYear = pickerUtils.getYear(viewDate);
  const startYear = viewYear - (viewYear % 10) + offsetYear;
  const endYear = startYear + 9;

  const onSuperPrevClick = useEvent(() => {
    onViewDateChange(pickerUtils.addYear(viewDate, -10));
  });
  const onSuperNextClick = useEvent(() => {
    onViewDateChange(pickerUtils.addYear(viewDate, 10));
  });

  const handlePanelChange = () => {
    onPanelChange('decade');
  };

  return (
    <Header
      prefixCls={prefixCls}
      onSuperPrevClick={onSuperPrevClick}
      onSuperNextClick={onSuperNextClick}
    >
      <Button
        type="text"
        className={`${prefixCls}-decade-btn`}
        onClick={handlePanelChange}
      >
        {`${startYear}-${endYear}`}
      </Button>
    </Header>
  );
}
