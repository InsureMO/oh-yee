import InternalSteps from './steps';
import Step from './step';

type StepsType = typeof InternalSteps & {
  Step: typeof Step;
};

const Steps = InternalSteps as StepsType;

Steps.Step = Step;

export type { StepsProps, StepProps, StepItem } from './interface';
export { Step };
export default Steps;

