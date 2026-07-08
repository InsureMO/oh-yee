import type React from 'react';
import type { DataAttributeProps } from '../utils/types';

export type SemanticDOM =
  | 'header'
  | 'title'
  | 'extra'
  | 'label'
  | 'content'
  | 'table';

export interface DescriptionsItem {
  key?: React.Key;
  label?: React.ReactNode;
  children?: React.ReactNode;
  span?: number | 'filled';
}

export interface DescriptionsProps extends DataAttributeProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  classNames?: Partial<Record<SemanticDOM, string>>;
  styles?: Partial<Record<SemanticDOM, React.CSSProperties>>;
  bordered?: boolean;
  column?: number;
  layout?: 'horizontal' | 'vertical';
  size?: 'small' | 'default' | 'large';
  title?: React.ReactNode;
  extra?: React.ReactNode;
  items?: DescriptionsItem[];
  children?: React.ReactNode;
}

export interface DescriptionsItemProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  label?: React.ReactNode;
  span?: number | 'filled';
  children?: React.ReactNode;
}

export type DescriptionsType = React.ForwardRefExoticComponent<
  DescriptionsProps & React.RefAttributes<HTMLDivElement>
> & {
  Item: React.FC<DescriptionsItemProps>;
};
