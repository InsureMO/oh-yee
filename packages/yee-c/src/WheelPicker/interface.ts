export interface WheelColumnOption {
  label: string;
  value: string | number;
}

export interface WheelColumn {
  options: WheelColumnOption[];
}

import type { DataAttributeProps } from '../utils/types';

export interface WheelPickerProps extends DataAttributeProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  columns: WheelColumn[];
  value: number[];
  onChange?: (value: number[]) => void;
  itemHeight?: number;
  visibleItemCount?: number;
}
