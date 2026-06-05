import Step from './step';
import InternalSteps from './steps';

type StepsType = typeof InternalSteps & {
  Step: typeof Step;
};

const Steps = InternalSteps as StepsType;

Steps.Step = Step;

export type { StepItem, StepProps, StepsProps } from './interface';
export { Step };
export default Steps;
