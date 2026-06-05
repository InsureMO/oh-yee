import BackTop from './back-top';
import InternalFloatButton from './float-button';
import FloatButtonGroup from './float-button-group';

export type { FloatButtonProps } from './interface';

export type InternalFloatButtonProps = typeof InternalFloatButton & {
  Group: typeof FloatButtonGroup;
  BackTop: typeof BackTop;
};

const FloatButton = InternalFloatButton as InternalFloatButtonProps;

FloatButton.Group = FloatButtonGroup;
FloatButton.BackTop = BackTop;

export default FloatButton;
