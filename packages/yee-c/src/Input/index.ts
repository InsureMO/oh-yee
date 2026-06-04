import Search from '../Search';
import TextArea from '../TextArea';
import Email from './email';
import Input from './input';
import Password from './password';

export type { EmailProps, InputProps, PasswordProps } from './interface';

export { Email, Password };

type InputType = typeof Input & {
  Email: typeof Email;
  Password: typeof Password;
  TextArea: typeof TextArea;
  Search: typeof Search;
};

const InputWithType = Input as InputType;

InputWithType.Email = Email;
InputWithType.Password = Password;
InputWithType.TextArea = TextArea;
InputWithType.Search = Search;

export default InputWithType;
