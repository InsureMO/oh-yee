import InternalCheckbox from './checkbox';
import CheckboxGroup from './checkbox-group';

export type { CheckboxGroupProps, CheckboxProps } from './interface';

type CheckboxType = typeof InternalCheckbox & {
  Group: typeof CheckboxGroup;
};

const Checkbox = InternalCheckbox as CheckboxType;

Checkbox.Group = CheckboxGroup;

export default Checkbox;
