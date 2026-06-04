import { useEffect, useState } from 'react';
import useVirtualForm from '../../hooks/useVirtualForm';

export default function useVirtualField(
  formName: string,
  name: string,
  entity: any,
) {
  const { getForm } = useVirtualForm();
  const [form, setForm] = useState();

  useEffect(() => {
    const form = getForm(formName);
    if (!form) return;
    setForm(form);
    const unregistry = form.registerFieldEntities(entity);
    return unregistry;
  }, [formName, name]);

  return {
    form,
  };
}
