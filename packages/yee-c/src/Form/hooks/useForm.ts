import { useRef } from 'react';
import { useLocale } from '../../locale';
import { FormStore } from '../form-store';
import { FormInstance } from '../interface';

export default function useForm<Values = any>(
  form?: FormInstance<Values>,
): [FormInstance<Values>] {
  const { locale } = useLocale();
  const formRef = useRef<FormInstance | undefined>(undefined);
  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      const formStore = new FormStore();
      // 设置默认验证消息
      formStore.setDefaultValidateMessage(locale.form.defaultRequiredMessage);
      formRef.current = formStore.getForm();
    }
  }
  return [formRef.current];
}
