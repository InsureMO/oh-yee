import clsx from 'clsx';
import { Dayjs } from 'dayjs';
import * as React from 'react';
import useEvent from '../../../hooks/useEvent';
import pickerUtils from '../../utils/pickerUtils';
import PanelBody from '../PanelBody';

function DecadeBody(props: any) {
  const { prefixCls, viewDate, offsetYear } = props;

  const baseDate = pickerUtils.getBaseDate('decade', viewDate);

  const getCellDate = useEvent((baseDate: Dayjs, offset: number) => {
    return pickerUtils.addYear(baseDate, offset * 10);
  });

  const getCellText = useEvent((currentDate: Dayjs) => {
    const startYear = pickerUtils.getYear(currentDate) + offsetYear;
    return `${startYear}-${startYear + 9}`;
  });

  const getCellClassName = useEvent((currentDate: Dayjs) => {
    const baseYear = pickerUtils.getYear(baseDate as Dayjs);
    const currentYear = pickerUtils.getYear(currentDate);
    return clsx({
      [`${prefixCls}-cell-not-in-view`]:
        currentYear === baseYear || currentYear === baseYear + 110,
    });
  });

  return (
    <PanelBody
      {...props}
      rowCount={4}
      colCount={3}
      baseDate={baseDate}
      getCellDate={getCellDate}
      getCellText={getCellText}
      getCellClassName={getCellClassName}
    />
  );
}

export default DecadeBody;
