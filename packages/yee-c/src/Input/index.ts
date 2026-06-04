import Email from './email';
import Input from './input';
import Password from './password';
import TextArea from '../TextArea';

export type { EmailProps, InputProps, PasswordProps } from './interface';

export { Email, Password };

type InputType = typeof Input & {
  Email: typeof Email;
  Password: typeof Password;
  TextArea: typeof TextArea
};

const InputWithType = Input as InputType;

InputWithType.Email = Email;
InputWithType.Password = Password;
InputWithType.TextArea = TextArea;

export default InputWithType;
