import Field from './Field';
import InternalForm from './Form';
import Group from './Group';
import List from './List';
import useForm from './useForm';
import useWatch from './useWatch';

type FieldInterface = typeof Field & {
  Group: typeof Group;
};

type FormInterface = typeof InternalForm & {
  useForm: typeof useForm;
  useWatch: typeof useWatch;
  Field: FieldInterface;
  List: typeof List;
};

const Form = InternalForm as FormInterface;
Form.useForm = useForm;
Form.useWatch = useWatch;
const FormField = Field as FieldInterface;
FormField.Group = Group;
Form.Field = FormField;
Form.List = List;

export type {
  FieldGroupProps,
  FormInstance,
  FormListProps,
  FormProps,
} from './interface';

export default Form;
