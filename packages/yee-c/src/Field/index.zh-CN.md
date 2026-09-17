---
category: Components
title: Field
subtitle: 字段
group:
  title: 表单
  order: 10
toc: 'content'
---

# Field 字段

脱离 `<Form>` 组件独立使用的表单字段组件。两种用法：

- **虚拟表单模式**：通过 `useVirtualForm` 创建虚拟表单，Field 负责值管理和校验（传 `formName` + `name`）
- **纯布局模式**：不传 `formName`（或该表单未注册），Field 只负责 label 布局与必填星号，`value`/`onChange` 由使用者自己控制并直接透传给子控件

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="使用 useVirtualForm 创建虚拟表单，配合 Field 绑定 Input"></code>
<code src="./demo/standalone.tsx" title="纯布局模式" description="不传 formName，受控状态自己管理，Field 只负责标签布局"></code>
<code src="./demo/validation.tsx" title="校验规则" description="required、minLength、regexp、validator 等校验规则，以及 validateTrigger 控制触发时机"></code>
<code src="./demo/layout.tsx" title="布局与样式" description="垂直/水平布局、语义化样式定制"></code>
<code src="./demo/disabled.tsx" title="禁用状态" description="通过 disabled 属性禁用整个字段"></code>

## API

### FieldProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| formName | `string` | 所属虚拟表单名称；不传时 Field 为纯布局模式 | - |
| name | `string` | 字段名称（虚拟表单模式下必填） | - |
| label | `React.ReactNode` | 字段标签 | - |
| children | `React.ReactElement` | 表单控件（必须是单个 React 元素） | - |
| rules | `Rule[]` | 校验规则 | - |
| required | `boolean` | 是否必填（显示星号标记） | `false` |
| layout | `'vertical' \| 'horizontal'` | 布局方式 | `'vertical'` |
| disabled | `boolean` | 是否禁用（会合并到子控件上，纯布局模式下同样生效） | `false` |
| prefixCls | `string` | 类名前缀 | `'yee-field'` |
| className | `string` | 根元素类名 | - |
| style | `React.CSSProperties` | 根元素样式 | - |
| classNames | `Partial<Record<SemanticDOM, string>>` | 语义结构类名 | - |
| styles | `Partial<Record<SemanticDOM, React.CSSProperties>>` | 语义结构样式 | - |

### Rule

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| required | `boolean` | 是否必填 | - |
| min | `number` | 最小值 | - |
| max | `number` | 最大值 | - |
| minLength | `number` | 最小长度 | - |
| maxLength | `number` | 最大长度 | - |
| regexp | `RegExp` | 正则校验 | - |
| validator | `(value: unknown) => boolean \| void \| Promise<boolean \| void>` | 自定义校验函数，支持同步与异步（详见 Form.Rule） | - |
| message | `string` | 错误提示信息（必填） | - |
| validateTrigger | `'onBlur' \| 'onChange' \| 'onSubmit' \| Array` | 校验触发时机 | - |
