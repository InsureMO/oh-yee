import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import React from 'react';
import Button from '../../Button';

export default function Header(props: any) {
  const {
    prefixCls,
    onPrevClick,
    onSuperPrevClick,
    onNextClick,
    onSuperNextClick,
    showPrevIcon = true,
    showSuperPrevIcon = true,
    showNextIcon = true,
    showSuperNextIcon = true,
    children,
  } = props;

  return (
    <div className={`${prefixCls}-header`}>
      {onSuperPrevClick && (
        <Button
          className={`${prefixCls}-super-prev-btn`}
          size="small"
          type="text"
          style={{ visibility: showSuperPrevIcon ? undefined : 'hidden' }}
          icon={<ChevronsLeft size={22} strokeWidth={1.5} />}
          onClick={onSuperPrevClick}
        />
      )}
      {onPrevClick && (
        <Button
          type="text"
          size="small"
          style={{ visibility: showPrevIcon ? undefined : 'hidden' }}
          onClick={onPrevClick}
          icon={<ChevronLeft size={22} strokeWidth={1.5} />}
        />
      )}
      <div className={`${prefixCls}-view`}>{children}</div>
      {onNextClick && (
        <Button
          type="text"
          size="small"
          style={{ visibility: showNextIcon ? undefined : 'hidden' }}
          onClick={onNextClick}
          icon={<ChevronRight size={22} strokeWidth={1.5} />}
        />
      )}
      {onSuperNextClick && (
        <Button
          type="text"
          size="small"
          className={`${prefixCls}-super-next-btn`}
          style={{ visibility: showSuperNextIcon ? undefined : 'hidden' }}
          onClick={onSuperNextClick}
          icon={<ChevronsRight size={22} strokeWidth={1.5} />}
        />
      )}
    </div>
  );
}
