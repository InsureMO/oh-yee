import { useContext } from 'react';
import FieldContext from '../FieldContext';

export default function useFormInstance() {
  const form = useContext(FieldContext);

  if (typeof form.getFieldsValue !== 'function') {
    throw new Error('useFormInstance must be used inside a <Form>');
  }

  return form;
}
