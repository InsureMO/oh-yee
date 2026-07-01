---
category: Components
title: Form
subtitle: 表单
group:
  title: 数据录入
  order: 3
toc: 'content'
---

# Form 表单

具有数据收集、校验和提交功能的表单。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="Form的基础用法"></code>
<code src="./demo/tooltip.tsx" title="标签帮助提示" description="在标签旁展示帮助图标，支持自定义触发图标"></code>
<code src="./demo/group.tsx" title="字段分组" description="Field.Group 共享标签和组级别校验"></code>
<code src="./demo/watch.tsx" title="字段监听" description="useWatch 监听字段值变化实现联动"></code>
<code src="./demo/list.tsx" title="表单列表" description="Form的列表字段用法"></code>
<code src="./demo/form-table.tsx" title="表单列表" description="Form的列表字段用法"></code>
<code src="./demo/layout.tsx" title="表单布局" description="不同的表单布局"></code>
<code src="./demo/validate.tsx" title="表单校验" description="表单校验功能"></code>

## API

### FormProps

| 属性名               | 类型                                                                  | 描述                     | 默认值                                       |
| -------------------- | --------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| prefixCls            | `string`                                                              | 自定义类名前缀           | -                                            |
| className            | `string`                                                              | 自定义根类名             | -                                            |
| style                | `React.CSSProperties`                                                 | 自定义根样式             | -                                            |
| children             | `React.ReactNode`                                                     | 字段                     | -                                            |
| name                 | `string`                                                              | 表单名                   | -                                            |
| form                 | [FormInstance](#forminstance)                                         | 表单实例                 | -                                            |
| disabled             | `boolean`                                                             | 是否禁用                 | -                                            |
| initialValues        | `Store`                                                               | 初始值                   | -                                            |
| layout               | `'vertical' \| 'horizontal'`                                          | 布局                     | -                                            |
| onFinish             | `(values: Values) => void`                                            | submit提交时触发事件     | -                                            |
| onFinishFailed       | `(err: Values) => void`                                               | submit提交报错时触发事件 | -                                            |
| onValuesChange       | `(changedValues: Record<string, any>, values: Values) => void`        | 表单字段值改变时触发事件 | -                                            |
| onValuesBeforeChange | `(changedValues: Record<string, any>, values: Values) => void \| any` | 表单字段值改变前触发事件 | -                                            |
| onReset              | `() => void`                                                          | 表单重置时触发的事件     | -                                            |
| data-\*              | `string`                                                              | -                        | 支持所有 data-\* 属性，透传到组件根 DOM 元素 |

### FormInstance

| 属性名                | 类型                                                                                       | 描述                                       |
| --------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------ |
| getFieldValidate      | `(name: Name) => ValidateMessage \| null`                                                  | 获取字段验证                               |
| getFieldValue         | `(name: Name) => StoreValue`                                                               | 获取字段值                                 |
| submit                | `() => void`                                                                               | 提交表单                                   |
| getFieldsValue        | `() => Values`                                                                             | 获取所有字段值                             |
| setFieldsValue        | `(newStore: Store, trigger?: TRIGGER) => void`                                             | 设置字段值                                 |
| setCallbacks          | `(callbacks: Callbacks) => void`                                                           | 设置回调                                   |
| resetFields           | `(name?: Name[]) => void`                                                                  | 重置字段                                   |
| clearFields           | `(name?: Name[]) => void`                                                                  | 清空字段                                   |
| validateField         | `(name: Name, trigger?: 'onChange' \| 'onBlur') => ValidateMessage[]`                      | 校验单个字段                               |
| validateFields        | `(names?: Name[], trigger?: TRIGGER) => ValidateMessage[]`                                 | 校验多个字段                               |
| getCallbacks          | `() => Callbacks`                                                                          | 获取回调                                   |
| registerFieldEntities | `(entity: FieldEntity) => void`                                                            | 注册字段实体                               |
| initialize            | `({ initialValues, callbacks }: { initialValues?: Store; callbacks?: Callbacks }) => void` | 初始化表单                                 |
| getListFields         | `(name: NamePath) => FormListField[]`                                                      | 获取列表字段                               |
| getListOperations     | `(name: NamePath) => FormListOperation`                                                    | 获取列表操作                               |
| subscribe             | `(namePath?: NamePath, callback?: () => void) => () => void`                               | 订阅字段值变化，不传 namePath 监听所有字段 |

### Form 静态方法

| 方法名        | 类型                                                           | 描述                                         |
| ------------- | -------------------------------------------------------------- | -------------------------------------------- |
| Form.useForm | `(form?: FormInstance) => [FormInstance]` | 创建 Form 实例，传入外部 form 可受控使用 |
| Form.useWatch | `(namePath?: NamePath, form?: FormInstance) => T \| undefined` | 监听表单字段值变化，不传 namePath 返回所有值 |
| Form.useFormInstance | `() => FormInstance` | 获取当前上下文中最近的 Form 实例，须在 `<Form>` 内调用 |

### Field.GroupProps

| 属性名    | 类型                  | 描述                                         | 默认值 |
| --------- | --------------------- | -------------------------------------------- | ------ |
| children  | `React.ReactNode`     | 子元素，通常为多个 Form.Field                | -      |
| label     | `React.ReactNode`     | 组标签                                       | -      |
| required  | `boolean`             | 是否必填（显示必填标记）                     | -      |
| rules     | [Rule\[\]](#rule)     | 组级别校验规则，validator 接收子字段值的对象 | -      |
| cols      | `number`              | 子字段列数                                   | -      |
| style     | `React.CSSProperties` | 自定义样式                                   | -      |
| className | `string`              | 自定义类名                                   | -      |

### FieldProps

| 属性名        | 类型                 | 描述                 | 默认值    |
| ------------- | -------------------- | -------------------- | --------- |
| className     | `string`             | 自定义字段根类名     | -         |
| style         | `React.CSSProperties` | 自定义字段根样式    | -         |
| classNames    | `Partial<Record<'label' \| 'control', string>>` | 语义化结构类名 | -  |
| styles        | `Partial<Record<'label' \| 'control', React.CSSProperties>>` | 语义化结构样式 | - |
| children      | `React.ReactElement` | 子元素               | -         |
| name          | `NamePath`           | 字段名               | -         |
| rules         | [Rule\[\]](#rule)    | 校验规则             | -         |
| label         | `React.ReactNode`    | 标签                 | -         |
| tooltip       | `ReactNode \| (Omit<TooltipProps, 'children'> & { icon?: ReactNode })` | 标签旁的帮助提示。传字符串/节点使用默认图标；传对象时可自定义 `icon`，其余属性透传给 Tooltip（`title`、`color`、`placement` 等） | -         |
| required      | `boolean`            | 是否必填             | -         |
| disabled      | `boolean`            | 是否禁用             | -         |
| initialValue  | `unknown`            | 初始值               | -         |
| valuePropName | `string`             | 设置子组件值的属性名 | `'value'` |

### Rule

| 属性名          | 类型                                                                                  | 描述           |
| --------------- | ------------------------------------------------------------------------------------- | -------------- |
| required        | `boolean`                                                                             | 是否必填       |
| type            | `string`                                                                              | 类型           |
| min             | `number`                                                                              | 最小值         |
| max             | `number`                                                                              | 最大值         |
| minLength       | `number`                                                                              | 最小长度       |
| maxLength       | `number`                                                                              | 最大长度       |
| regexp          | `RegExp`                                                                              | 正则表达式     |
| message         | `string`                                                                              | 错误信息       |
| validator       | `(value: unknown) => boolean`                                                         | 自定义校验函数 |
| validateTrigger | `'onBlur' \| 'onChange' \| 'onSubmit' \| Array<'onBlur' \| 'onChange' \| 'onSubmit'>` | 校验触发时机   |

### Types

| 类型              | 描述                                                                                                                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| StoreValue        | `any`                                                                                                                                                                                 |
| Store             | `Record<string, StoreValue>`                                                                                                                                                          |
| Name              | `string`                                                                                                                                                                              |
| NamePath          | `string \| string[] \| number \| (string \| number)[]`                                                                                                                                |
| ValidateMessage   | `{ name: NamePath \| NamePath[] \| undefined; message: string; value: unknown; status: 'error' \| 'success' \| 'warning' \| 'info' }`                                                 |
| FieldEntity       | `{ props: fieldProps & { name?: NamePath }; onStoreChange: () => void }`                                                                                                              |
| TRIGGER           | `'onChange' \| 'onBlur' \| 'onSubmit' \| 'reset' \| 'clear' \| 'update'`                                                                                                              |
| FormListField     | `{ key: React.Key; name: number; isListField?: boolean }`                                                                                                                             |
| FormListOperation | `{ add: (defaultValue?: any, insertIndex?: number) => void; remove: (index: number \| number[]) => void; move: (from: number, to: number) => void }`                                  |
| FormListProps     | `{ name: NamePath; children: (fields: FormListField[], operation: FormListOperation, meta: { errors: React.ReactNode[] }) => React.ReactNode; initialValue?: any[]; rules?: Rule[] }` |
