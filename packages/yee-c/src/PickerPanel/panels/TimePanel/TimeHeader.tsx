import React from 'react';

function TimeHeader(props: any) {
  const { prefixCls } = props;

  return (
    <div className={`${prefixCls}-header`}>
      <div className={`${prefixCls}-header-view`}></div>
    </div>
  );
}

export default TimeHeader;
