import InternalSpin from './spin';
import { useGlobalSpin } from './spin-context';
export type { SpinProps } from './interface';
export { SpinProvider } from './spin-context';
export { spinManager } from './spin-manager';

type SpinType = typeof InternalSpin & {
  useSpin: typeof useGlobalSpin;
};

const Spin = InternalSpin as SpinType;

Spin.useSpin = useGlobalSpin;

export default Spin;
