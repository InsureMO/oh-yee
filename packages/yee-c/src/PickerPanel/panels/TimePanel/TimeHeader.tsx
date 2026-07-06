import React from 'react';

interface TimeHeaderProps {
  prefixCls?: string;
}

function TimeHeader(props: TimeHeaderProps) {
  const { prefixCls } = props;

  return (
    <div className={`${prefixCls}-header`}>
      <div className={`${prefixCls}-header-view`}></div>
    </div>
  );
}

export default TimeHeader;
