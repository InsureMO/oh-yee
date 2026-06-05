import InternalRadio from './radio';
import RadioGroup from './radio-group';

export type { RadioGroupProps, RadioProps } from './interface';

type RadioType = typeof InternalRadio & {
  Group: typeof RadioGroup;
};

const Radio = InternalRadio as RadioType;

Radio.Group = RadioGroup;

export default Radio;
