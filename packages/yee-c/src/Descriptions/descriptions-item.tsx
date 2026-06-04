import React from 'react';
import type { DescriptionsItemProps } from './interface';

const DescriptionsItem: React.FC<DescriptionsItemProps> = ({ children }) => {
  return <>{children}</>;
};

DescriptionsItem.displayName = 'DescriptionsItem';

export default DescriptionsItem;
