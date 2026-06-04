import { useCallback } from 'react';
import Field from '../Field';
import { FormStore } from '../Form/form-store';

export function uuid(): string {
  const arr = new Uint8Array(8);
  crypto.getRandomValues(arr);
  return Array.from(arr, (b) => '0123456789ABCDEF'[b & 0x0f]).join('');
}

const forms = new Map();

export default function useVirtualForm() {
  const getForm = useCallback((formName: string) => {
    return forms.get(formName);
  }, []);

  const createForm = (name: string) => {
    const form = new FormStore();
    forms.set(name, form);

    const destroyForm = () => {
      forms.delete(name);
    };

    return { form, destroyForm };
  };

  return {
    createForm,
    getForm,
    Field,
  };
}
