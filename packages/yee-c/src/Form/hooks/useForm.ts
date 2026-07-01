// import { useRef } from 'react';
// import type {
//   Callbacks,
//   FieldEntity,
//   FormInstance,
//   NamePath,
//   Store,
//   validateMessage,
// } from './interface';
// import validate from './utils/validate';

// class FormStore {
//   private store: Store = {};
//   private callbacks: Callbacks = {};
//   private fieldEntities: FieldEntity[] = [];
//   private validateMessages: validateMessage[] = [];
//   private initialized = false;
//   // 初始化form实例
//   initialize = ({
//     initialValues,
//     callbacks,
//   }: {
//     initialValues?: Store;
//     callbacks?: Callbacks;
//   }) => {
//     if (!this.initialized) {
//       this.initialized = true;

//       if (initialValues) {
//         this.store = initialValues;
//       } else {
//         this.store = {};
//       }

//       if (callbacks) {
//         this.setCallbacks(callbacks);
//       }
//     }
//   };

//   getFieldsValue = () => {
//     return { ...this.store };
//   };

//   getFieldValue = (name: NamePath) => {
//     return this.store[name];
//   };

//   getFieldValidate = (name: NamePath) => {
//     return this.validateMessages?.find((item) => item.name === name);
//   };

//   resetFields = (name?: NamePath[]) => {
//     if (name) {
//       name.forEach((n) => {
//         this.setFieldsValue({ [n]: undefined });
//       });
//     } else {
//       Object.keys(this.store).forEach((key) => {
//         this.setFieldsValue({ [key]: undefined });
//       });
//     }
//   };

//   validateFields = () => {
//     const err: validateMessage[] = [];
//     this.fieldEntities.forEach((entity) => {
//       const { name, rules, required } = entity.props;
//       const value: NamePath = name && this.getFieldValue(name);

//       const mergedRules = rules || [];

//       if (required) {
//         mergedRules.push({
//           required: true,
//           message: 'This is required field.',
//         });
//       }

//       mergedRules.forEach((rule) => {
//         const mark = validate(rule, value);
//         if (name && !mark) {
//           err.push({
//             name: name,
//             status: 'error',
//             value,
//             ...rule
//           });
//         }
//       });
//     });
//     return err;
//   };

//   setFieldsValue = (newStore: Store, isChange?: boolean) => {
//     // const { onValuesChange } = this.callbacks;
//     this.store = {
//       ...this.store,
//       ...newStore,
//     };
//     // onValuesChange?.(newStore, this.store);
//     this.refreshField(newStore, isChange);
//   };

//   refreshField = (newStore?: Store, isChange?: boolean) => {
//     if (newStore) {
//       this.fieldEntities.forEach((entity) => {
//         Object.keys(newStore).forEach((k) => {
//           if (k === entity.props.name) {
//             if (isChange) {
//               this.validateMessages = this.validateFields();
//             }
//             entity.onStoreChange();
//           }
//         });
//       });
//     } else {
//       this.fieldEntities.forEach((entity) => {
//         if (entity.props.rules || entity.props.required) {
//           entity?.onStoreChange();
//         }
//       });
//     }
//   };

//   setCallbacks = (callbacks: Callbacks) => {
//     this.callbacks = { ...this.callbacks, ...callbacks };
//   };

//   getCallbacks = () => {
//     return this.callbacks;
//   };

//   // 订阅与取消订阅
//   registerFieldEntities = (entity: FieldEntity) => {
//     this.fieldEntities.push(entity);
//     if (entity.props.name) {
//       this.store = { ...this.store, [entity.props.name]: undefined };
//     }
//     return () => {
//       this.fieldEntities = this.fieldEntities.filter((item) => item !== entity);
//       const { name } = entity.props;
//       if (name) {
//         delete this.store[name];
//       }
//     };
//   };

//   submit = () => {
//     const { onFinish, onFinishFailed } = this.callbacks;
//     this.validateMessages = this.validateFields();
//     if (this.validateMessages.length === 0) {
//       onFinish?.(this.getFieldsValue());
//     } else {
//       onFinishFailed?.(this.validateMessages);
//     }
//     this.refreshField();
//   };

//   getForm(): FormInstance {
//     return {
//       getFieldValidate: this.getFieldValidate,
//       getFieldsValue: this.getFieldsValue,
//       getFieldValue: this.getFieldValue,
//       setFieldsValue: this.setFieldsValue,
//       resetFields: this.resetFields,
//       submit: this.submit,
//       setCallbacks: this.setCallbacks,
//       getCallbacks: this.getCallbacks,
//       registerFieldEntities: this.registerFieldEntities,
//       initialize: this.initialize,
//     };
//   }
// }

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
