import React from 'react';
import Button from '../../../Button';
import useEvent from '../../../hooks/useEvent';
import { useLocale } from '../../../locale';
import pickerUtils from '../../utils/pickerUtils';
import Header from '../Header';

export default function DateHeader(props: any) {
  const { locale, lang } = useLocale();
  const { datepicker } = locale;

  const { viewDate, onViewDateChange, onPanelChange, offset, ...reset } = props;

  let year = pickerUtils.getYear(viewDate);
  const month = pickerUtils.getMonth(viewDate);

  if (offset?.year) {
    year = year + parseInt(offset.year);
  }

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

  function renderHeaderBtns() {
    // Use locale suffixes for year/month (empty for English, year/month suffix for Chinese/Japanese)
    if (lang === 'zh_CN' || lang === 'zh_TW' || lang === 'ja_JP') {
      return (
        <>
          <Button
            size="small"
            type="text"
            onClick={() => handlePanelChange('year')}
          >{`${year}${datepicker.yearSuffix}`}</Button>
          -
          <Button
            size="small"
            type="text"
            onClick={() => handlePanelChange('month')}
          >
            {datepicker.shortMonthList
              ? datepicker.shortMonthList[month]
              : `${month + 1}${datepicker.monthSuffix}`}
          </Button>
        </>
      );
    }

    return (
      <>
        <Button
          size="small"
          type="text"
          onClick={() => handlePanelChange('month')}
        >
          {datepicker.shortMonthList
            ? datepicker.shortMonthList[month]
            : `${month + 1}${datepicker.monthSuffix}`}
        </Button>
        <Button
          size="small"
          type="text"
          onClick={() => handlePanelChange('year')}
        >{`${year}${datepicker.yearSuffix}`}</Button>
      </>
    );
  }

  return (
    <Header
      {...reset}
      onSuperPrevClick={onSuperPrevClick}
      onSuperNextClick={onSuperNextClick}
      onPrevClick={onPrevClick}
      onNextClick={onNextClick}
    >
      {renderHeaderBtns()}
    </Header>
  );
}
