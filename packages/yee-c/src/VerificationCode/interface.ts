import type { DataAttributeProps } from '../utils/types';

export type VerificationCodeContextType = {
  prefixCls?: string;
  readOnly?: boolean;
  masked?: boolean;
  fullValue: string[];
  activeIndex: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  onPaste: (e: React.ClipboardEvent<HTMLInputElement>, index: number) => void;
  onKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement> & {
      target: { value: string };
    },
    index: number,
  ) => void;
};

export interface VerificationCodeProps extends DataAttributeProps {
  /**
   * custom class name prefix
   */
  prefixCls?: string;
  /**
   * is disabled
   */
  disabled?: boolean;
  /**
   * is readOnly
   */
  readOnly?: boolean;
  /**
   * is masked
   */
  masked?: boolean;
  /**
   * code length
   */
  length?: number;
  /**
   * code value, controllered
   */
  value?: string;
  /**
   * default code value, uncontrollered
   */
  defaultValue?: string;
  /**
   * custom root element class name
   */
  className?: string;
  /**
   * custom root element style
   */
  style?: React.CSSProperties;
  /**
   * separator
   */
  separator?: ((data: { index: number }) => React.ReactNode) | React.ReactNode;
  /**
   * change callback
   */
  onChange?: (value: string, index: number) => void;
  /**
   * finish callback
   */
  onFinish?: (value: string) => void;
}

export interface VerificationCodeInputProps {
  /**
   * value
   */
  value: string;
  /**
   * serial number
   */
  index: number;
}
