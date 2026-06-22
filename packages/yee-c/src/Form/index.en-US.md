---
category: Components
title: Form
subtitle: Form
group:
  title: Data Entry
  order: 3
toc: 'content'
---

# Form

High performance form component with data scope management.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of Form"></code>
<code src="./demo/tooltip.tsx" title="Label Tooltip" description="Show a help icon next to the label, with a customizable trigger icon"></code>
<code src="./demo/group.tsx" title="Field Group" description="Field.Group with shared label and group-level validation"></code>
<code src="./demo/watch.tsx" title="Field Watch" description="useWatch monitors field value changes for conditional rendering"></code>
<code src="./demo/layout.tsx" title="Layout" description="Different form layouts"></code>
<code src="./demo/validate.tsx" title="Validation" description="Form validation"></code>
<code src="./demo/list.tsx" title="Form List" description="Form list field usage"></code>
<code src="./demo/form-table.tsx" title="Form Table" description="Form table field usage"></code>
<code src="./demo/dynamic.tsx" title="Dynamic Form" description="Dynamic form items"></code>

## API

### FormProps

| Property             | Type                                        | Description                              | Default |
| -------------------- | ------------------------------------------- | ---------------------------------------- | ------- |
| prefixCls            | `string`                                    | Custom class name prefix                 | -       |
| className            | `string`                                    | Custom root class name                   | -       |
| style                | `React.CSSProperties`                       | Custom root style                        | -       |
| children             | `React.ReactNode`                           | Fields                                   | -       |
| name                 | `string`                                    | Form name                                | -       |
| form                 | [FormInstance](#forminstance)               | Form instance                            | -       |
| disabled             | `boolean`                                   | Whether disabled                         | -       |
| initialValues        | `Store`                                     | Initial values                           | -       |
| layout               | `'vertical' \| 'horizontal'`                | Layout                                   | -       |
| onFinish             | `(values: Values) => void`                  | Submit event callback                    | -       |
| onFinishFailed       | `(err: Values) => void`                     | Submit error event callback              | -       |
| onValuesChange       | `(changedValues: Record<string, any>, values: Values) => void` | Field value change event callback        | -       |
| onValuesBeforeChange | `(changedValues: Record<string, any>, values: Values) => void \| any` | Field value change before event callback | -       |
| onReset              | `() => void`                                | Reset event callback                     | -       |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

### FormInstance

| Property              | Type                                                                                       | Description               |
| --------------------- | ------------------------------------------------------------------------------------------ | ------------------------- |
| getFieldValidate      | `(name: Name) => ValidateMessage \| null`                                     | Get field validation      |
| getFieldValue         | `(name: Name) => StoreValue`                                                           | Get field value           |
| submit                | `() => void`                                                                               | Submit form               |
| getFieldsValue        | `() => Values`                                                                             | Get all field values      |
| setFieldsValue        | `(newStore: Store, trigger?: TRIGGER) => void`                                            | Set field values          |
| setCallbacks          | `(callbacks: Callbacks) => void`                                                           | Set callbacks             |
| resetFields           | `(name?: Name[]) => void`                                                              | Reset fields              |
| clearFields           | `(name?: Name[]) => void`                                                              | Clear fields              |
| validateField         | `(name: Name, trigger?: 'onChange' \| 'onBlur') => ValidateMessage[]`                 | Validate single field     |
| validateFields        | `(names?: Name[], trigger?: TRIGGER) => ValidateMessage[]`                              | Validate multiple fields  |
| getCallbacks          | `() => Callbacks`                                                     | Get callbacks             |
| registerFieldEntities | `(entity: FieldEntity) => void`                                                            | Register field entities   |
| initialize            | `({ initialValues, callbacks }: { initialValues?: Store; callbacks?: Callbacks }) => void` | Initialize form           |
| getListFields         | `(name: NamePath) => FormListField[]`                                                      | Get list fields           |
| getListOperations     | `(name: NamePath) => FormListOperation`                                                    | Get list operations       |
| subscribe             | `(namePath?: NamePath, callback?: () => void) => () => void`                                 | Subscribe to field value changes, omit namePath to watch all fields |

### Form Static Methods

| Method          | Type                                                    | Description                              |
| --------------- | ------------------------------------------------------- | ---------------------------------------- |
| Form.useWatch   | `(namePath?: NamePath, form?: FormInstance) => T \| undefined` | Watch form field value changes, omit namePath to get all values |

### Field.GroupProps

| Property | Type                  | Description      | Default |
| -------- | --------------------- | ---------------- | ------- |
| children | `React.ReactNode`     | Child elements, typically multiple Form.Field   | -      |
| label    | `React.ReactNode`     | Group label   | -      |
| required | `boolean`             | Whether required (shows required indicator) | -      |
| rules    | [Rule\[\]](#rule)     | Group-level validation rules, validator receives an object of child field values | -      |
| cols     | `number`              | Number of columns for child fields | -      |
| style    | `React.CSSProperties` | Custom style | -      |
| className | `string`             | Custom class name | -      |

### FieldProps

| Property | Type                  | Description      | Default |
| -------- | --------------------- | ---------------- | ------- |
| className | `string`             | Custom field root class name | -       |
| style | `React.CSSProperties` | Custom field root style | -       |
| classNames | `Partial<Record<'label' \| 'control', string>>` | Semantic structure class names | -       |
| styles | `Partial<Record<'label' \| 'control', React.CSSProperties>>` | Semantic structure styles | -       |
| children | `React.ReactElement`  | Child element    | -       |
| name     | `NamePath` | Field name       | -       |
| rules    | [Rule\[\]](#rule)     | Validation rules | -       |
| label    | `React.ReactNode`     | Label            | -       |
| tooltip  | `ReactNode \| (Omit<TooltipProps, 'children'> & { icon?: ReactNode })` | Help tooltip next to the label. Pass a string/node to use the default icon; pass an object to customize `icon` — all other props (`title`, `color`, `placement`, ...) are forwarded to Tooltip | -       |
| required | `boolean`             | Whether required | -       |
| disabled | `boolean`             | Whether disabled | -       |
| initialValue | `unknown`          | Initial value    | -      |
| valuePropName | `string`          | Property name for child component value | `'value'` |

### Rule

| Property        | Type            | Description              |
| --------------- | --------------- | ------------------------ |
| required        | `boolean`       | Whether required         |
| type            | `string`        | Type                     |
| min             | `number`        | Minimum value            |
| max             | `number`        | Maximum value            |
| minLength       | `number`        | Minimum length           |
| maxLength       | `number`        | Maximum length           |
| regexp          | `RegExp`        | Regular expression       |
| message         | `string`        | Error message            |
| validator       | `(value: unknown) => boolean` | Custom validator function |
| validateTrigger | `'onBlur' \| 'onChange' \| 'onSubmit' \| Array<'onBlur' \| 'onChange' \| 'onSubmit'>` | Validation trigger |

### Types

| Type            | Description                                                   |
| --------------- | ------------------------------------------------------------- |
| StoreValue      | `any`                                                         |
| Store           | `Record<string, StoreValue>`                                  |
| Name            | `string`                                                      |
| NamePath        | `string \| string[] \| number \| (string \| number)[]`        |
| ValidateMessage | `{ name: NamePath \| NamePath[] \| undefined; message: string; value: unknown; status: 'error' \| 'success' \| 'warning' \| 'info' }` |
| FieldEntity     | `{ props: fieldProps & { name?: NamePath }; onStoreChange: () => void }` |
| TRIGGER         | `'onChange' \| 'onBlur' \| 'onSubmit' \| 'reset' \| 'clear' \| 'update'` |
| FormListField   | `{ key: React.Key; name: number; isListField?: boolean }`     |
| FormListOperation | `{ add: (defaultValue?: any, insertIndex?: number) => void; remove: (index: number \| number[]) => void; move: (from: number, to: number) => void }` |
| FormListProps   | `{ name: NamePath; children: (fields: FormListField[], operation: FormListOperation, meta: { errors: React.ReactNode[] }) => React.ReactNode; initialValue?: any[]; rules?: Rule[] }` |
