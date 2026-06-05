import type { DataAttributeProps } from '../utils/types';

export type StoreValue = any;
export type Store = Record<string, StoreValue>;
export type Name = string;
export type NamePath = string | string[] | number | (string | number)[];

export type SemanticDOM = 'label' | 'control';

// Internal name path type, always a string array
export type InternalNamePath = (string | number)[];

export interface FormProps<Values = any> extends DataAttributeProps {
  /**
   * Custom class name prefix
   */
  prefixCls?: string;
  /**
   * Custom root class name
   */
  className?: string;
  /**
   * Custom root style
   */
  style?: React.CSSProperties;
  /**
   * Fields
   */
  children: React.ReactNode;
  /**
   * Form name
   */
  name?: string;
  /**
   * Form instance
   */
  form?: FormInstance<Values>;
  /**
   * Whether disabled
   */
  disabled?: boolean;
  /**
   * Initial values
   */
  initialValues?: Store;
  /**
   * Layout
   */
  layout?: 'vertical' | 'horizontal';
  /**
   * Triggered on form submit
   */
  onFinish?: Callbacks<Values>['onFinish'];
  /**
   * Triggered on form submit failure
   */
  onFinishFailed?: Callbacks<Values>['onFinishFailed'];
  /**
   * Triggered when form field values change
   */
  onValuesChange?: Callbacks<Values>['onValuesChange'];
  /**
   * Triggered before form field values change
   */
  onValuesBeforeChange?: Callbacks<Values>['onValuesBeforeChange'];
  /**
   * Triggered when form is reset
   */
  onReset?: Callbacks<Values>['onReset'];
}

export interface IFormContext {
  prefixCls?: string;
  disabled?: boolean;
  name?: string;
}

export interface Callbacks<Values = any> {
  onValuesChange?: (changedValues: Record<string, any>, values: Values) => void;
  onValuesBeforeChange?: (
    changedValues: Record<string, any>,
    values: Values,
  ) => void | any;
  onFieldsChange?: (changedFields: Name[], allFields: Name[]) => void;
  /**
   * Triggered on successful form submit
   * */
  onFinish?: (values: Values) => void;
  /**
   * Triggered on failed form submit
   * */
  onFinishFailed?: (err: Values) => void;
  /**
   * Triggered on form reset
   * */
  onReset?: () => void;
  /**
   * Triggered on form clear
   * */
  onClear?: () => void;
}

export interface FormInstance<Values = any> {
  /**
   * Get field validation info
   */
  getFieldValidate: (name: Name) => ValidateMessage | null;
  /**
   * Get field value
   */
  getFieldValue: (name: Name) => StoreValue;
  /**
   * Submit form
   */
  submit: () => ValidateMessage[];
  /**
   * Get all field values
   */
  getFieldsValue: () => Values;
  /**
   * Set field values
   */
  setFieldsValue: (newStore: Store, trigger?: TRIGGER) => void;
  /**
   * Set callback functions
   */
  setCallbacks: (callbacks: Callbacks) => void;
  /**
   * Reset fields to initial values
   */
  resetFields: (name?: Name[]) => void;
  /**
   * Clear fields
   */
  clearFields: (name?: Name[]) => void;
  /**
   * Validate field
   */
  validateField: (
    name: Name,
    trigger?: 'onChange' | 'onBlur',
  ) => ValidateMessage[];
  /**
   * Get callback functions
   */
  getCallbacks: () => Callbacks;
  /**
   * Register field entity
   */
  registerFieldEntities: (entity: FieldEntity) => void;
  /**
   * Validate fields and get error messages
   */
  validateFields: (names?: Name[], trigger?: TRIGGER) => ValidateMessage[];
  /**
   * Initialize form - mainly used to set initial values and callbacks
   */
  initialize: ({
    initialValues,
    callbacks,
  }: {
    /**
     * Initial values
     */
    initialValues?: Store;
    /**
     * Callback functions
     */
    callbacks?: Callbacks;
  }) => void;

  // FormList related methods
  /**
   * Get list fields - mainly used for Form.List component, returns field info for current list items
   * @param name Name path of the list field
   * @returns Array of field info for current list items
   */
  getListFields: (name: NamePath) => FormListField[];
  /**
   * Get list operations - mainly used for Form.List component, returns operation methods for current list items
   * @param name Name path of the list field
   * @returns Operation method object including add, remove, and move methods for list items
   */
  getListOperations: (name: NamePath) => FormListOperation;
  /**
   * Subscribe to field value changes
   * @param namePath Field name path
   * @param callback Callback when value changes
   * @returns Unsubscribe function
   */
  subscribe: (namePath?: NamePath, callback?: () => void) => () => void;
  /**
   * Register group-level validator
   * @param id Group unique identifier
   * @param entity Group validation entity
   * @returns Unregister function
   */
  registerGroupEntity: (id: string, entity: GroupEntity) => () => void;
}

export type Rule = {
  /**
   * Whether required
   */
  required?: boolean;
  /**
   * Field type
   */
  type?: string;
  /**
   * Minimum value
   */
  min?: number;
  /**
   * Maximum value
   */
  max?: number;
  /**
   * Minimum length
   */
  minLength?: number;
  /**
   * Maximum length
   */
  maxLength?: number;
  /**
   * Regular expression
   */
  regexp?: RegExp;
  /**
   * Error message
   */
  message: string;
  /**
   * Custom validation function, returns true for pass, false or throw for fail
   */
  validator?: (value: unknown) => boolean;
  /**
   * Validation trigger timing
   */
  validateTrigger?:
    | 'onBlur'
    | 'onChange'
    | 'onSubmit'
    | 'reset'
    | Array<'onBlur' | 'onChange' | 'onSubmit'>;
};

export type ValidateMessage = {
  name: NamePath | NamePath[] | undefined;
  message: string;
  value: unknown;
  status: 'error' | 'success' | 'warning' | 'info';
};

export type FieldProps = {
  children: React.ReactElement;
  name: NamePath;
  rules?: Rule[];
  label?: React.ReactNode;
  required?: boolean;
  /**
   * Format value before passing to children
   * */
  formatter?: (value: unknown) => unknown;
  /**
   * Whether disabled
   * */
  disabled?: boolean;
  /**
   * Initial value
   */
  initialValue?: unknown;
  /**
   * Value property name for child node
   * @default value
   * */
  valuePropName?: string;
} & DataAttributeProps;

export interface FieldEntity {
  props: FieldProps & {
    name?: NamePath;
  };
  onStoreChange: () => void;
}

export type TRIGGER =
  | 'onChange'
  | 'onBlur'
  | 'onSubmit'
  | 'reset'
  | 'clear'
  | 'update'
  | 'fill';

// FormList related types
export type FormListField<T = any> = {
  key: React.Key;
  name: number;
  isListField?: boolean;
  value: T;
};

export type FormListOperation = {
  add: (defaultValue?: any, insertIndex?: number) => void;
  remove: (index: number | number[]) => void;
  move: (from: number, to: number) => void;
};

export type FormListProps = {
  name: NamePath;
  children: (
    fields: FormListField[],
    operation: FormListOperation,
    meta: { errors: React.ReactNode[] },
  ) => React.ReactNode;
  initialValue?: any[];
  rules?: Rule[];
};

// Field.Group related types
export type FieldGroupProps = {
  /**
   * Child elements, typically multiple Form.Field
   */
  children: React.ReactNode;
  /**
   * Group label
   */
  label?: React.ReactNode;
  /**
   * Whether required (shows required mark)
   */
  required?: boolean;
  /**
   * Group-level validation rules
   */
  rules?: Rule[];
  /**
   * Number of columns for child fields
   */
  cols?: number;
  /**
   * Custom style
   */
  style?: React.CSSProperties;
  /**
   * Custom class name
   */
  className?: string;
};

export interface GroupEntity {
  validate: (force: boolean) => ValidateMessage[];
  reset: () => void;
}
