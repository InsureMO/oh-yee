import Alert from './alert';
import Cycle from './cycle';

export type { AlertProps, AlertSemanticDOM, CycleProps } from './interface';

type AlertType = typeof Alert & {
  Cycle: typeof Cycle;
};

const AlertWithCycle = Alert as AlertType;
AlertWithCycle.Cycle = Cycle;

export default AlertWithCycle;
