import * as React from 'react';
import TimeBody from './TimeBody';
import TimeHeader from './TimeHeader';

function TimePanel(props: any) {
  const {
    format = 'HH:mm:ss',
    prefixCls,
    selectedDate,
    hourStep = 1,
    minuteStep = 1,
    secondStep = 1,
    showHeader,
    showTitle = true,
    ...reset
  } = props;

  const [h, m, s] = React.useMemo(() => {
    return format.split(':');
  }, [format]);

  const hourType = 24;

  const internalHourStep = hourType % hourStep === 0 ? hourStep : 1;
  const internalMinuteStep = 60 % minuteStep === 0 ? minuteStep : 1;
  const internalSecondStep = 60 % secondStep === 0 ? secondStep : 1;

  return (
    <div className={`${prefixCls}-time-panel`}>
      {showHeader && <TimeHeader />}
      <TimeBody
        {...reset}
        showTitle={showTitle}
        value={selectedDate}
        showHour={h ? true : false}
        showMinute={m ? true : false}
        showSecond={s ? true : false}
        hourStep={internalHourStep}
        minuteStep={internalMinuteStep}
        secondStep={internalSecondStep}
      />
    </div>
  );
}

export default TimePanel;
