import Field from './Field';
import InternalForm from './Form';
import Group from './Group';
import List from './List';
import useForm from './hooks/useForm';
import useFormInstance from './hooks/useFormInstance';
import useWatch from './hooks/useWatch';

type FieldInterface = typeof Field & {
  Group: typeof Group;
};

type FormInterface = typeof InternalForm & {
  useForm: typeof useForm;
  useWatch: typeof useWatch;
  useFormInstance: typeof useFormInstance;
  Field: FieldInterface;
  List: typeof List;
};

const Form = InternalForm as FormInterface;
Form.useForm = useForm;
Form.useWatch = useWatch;
Form.useFormInstance = useFormInstance;
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
