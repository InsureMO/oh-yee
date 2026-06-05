import { memo } from 'react';
import type { TFooterProps } from './interface';

const TFooter = (props: TFooterProps) => {
  const { summary, pageData } = props;
  if (!summary) return null;
  const render = typeof summary === 'function' ? summary(pageData) : summary;
  return render;
};

export default memo(TFooter);
