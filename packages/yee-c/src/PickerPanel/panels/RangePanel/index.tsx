import React from 'react';

import { Dayjs } from 'dayjs';
import PickerPanel from '../../picker-panel';
import pickerUtils from '../../utils/pickerUtils';

function RangePanel(props: any) {
  const {
    prefixCls = 'yee-picker',
    panel = 'start',
    value,
    pickerView,
    picker,
    mode,
    onChange,
    onPanelChange,
    onCellMouse,
    hoverRange,
    selectedRange,
    disabledDate,
  } = props;

  if (mode === 'datetime') {
    return (
      <div className={`${prefixCls}-panels`}>
        <PickerPanel
          prefixCls={prefixCls}
          picker={picker}
          value={panel === 'start' ? value[0] : value[1]}
          pickerView={pickerUtils.init(pickerView[panel === 'start' ? 0 : 1])}
          onChange={onChange}
          onPanelChange={onPanelChange}
          onCellMouse={onCellMouse}
          hoverRange={hoverRange}
          selectedRange={selectedRange}
          disabledDate={disabledDate}
          footer={false}
        />
      </div>
    );
  }

  let startValue, endValue;
  // const startViewDate = panel === 'start' ? dayjs_view : pickerUtils.addMonth(dayjs_view, -1);
  // const endViewDate = panel === 'start' ? pickerUtils.addMonth(dayjs_view, 1) : dayjs_view;

  const [startViewDate, endViewDate] = pickerView as [Dayjs, Dayjs];

  if (panel === 'start') {
    startValue = value[0];
    endValue = value[1];
  } else {
    startValue = value[0];
    endValue = value[1];
  }

  return (
    <div className={`${prefixCls}-panels`}>
      <PickerPanel
        prefixCls={prefixCls}
        picker={picker}
        value={startValue}
        pickerView={startViewDate}
        onChange={onChange}
        onPanelChange={(viewDate) => onPanelChange(viewDate, 'start')}
        onCellMouse={onCellMouse}
        hoverRange={hoverRange}
        selectedRange={selectedRange}
        disabledDate={disabledDate}
        footer={false}
        showNextIcon={false}
        showSuperNextIcon={false}
      />
      <PickerPanel
        prefixCls={prefixCls}
        picker={picker}
        value={endValue}
        pickerView={endViewDate}
        onChange={onChange}
        onPanelChange={(viewDate) => onPanelChange(viewDate, 'end')}
        onCellMouse={onCellMouse}
        hoverRange={hoverRange}
        selectedRange={selectedRange}
        disabledDate={disabledDate}
        footer={false}
        showPrevIcon={false}
        showSuperPrevIcon={false}
      />
    </div>
  );
}

export default React.memo(RangePanel);
