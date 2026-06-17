# AI 提示词指南

本指南帮助 AI 模型生成符合 AIRenderer 规范的 JSON UI 定义。

## 基本原则

1. **使用流式消息格式** - 每行一个 JSON 对象
2. **先设置 root** - 使用 `init` 操作
3. **逐步添加组件** - 使用 `add` 操作
4. **最后设置数据** - 使用 `setData` 操作
5. **使用描述性 ID** - 如 `user-form`, `name-field`

## 流式消息格式

### 操作类型

```typescript
// 1. init - 设置根组件
{"op":"init","path":"root","value":"component-id"}

// 2. add - 添加组件
{"op":"add","path":"components.component-id","value":{...}}

// 3. update - 更新组件
{"op":"update","path":"components.component-id","value":{...}}

// 4. delete - 删除组件
{"op":"delete","path":"components.component-id"}

// 5. setData - 设置数据
{"op":"setData","path":"data.path","value":"value"}
```

## 常见组件模式

### 1. 简单表单

```json
{"op":"init","path":"root","value":"form-card"}
{"op":"add","path":"components.form-card","value":{"type":"card","props":{"title":"用户注册"},"children":["user-form"]}}
{"op":"add","path":"components.user-form","value":{"type":"form","props":{"layout":"vertical"},"children":["name-field","submit-btn"]}}
{"op":"add","path":"components.name-field","value":{"type":"form-field","props":{"name":"name","label":"姓名","rules":[{"required":true,"message":"请输入姓名"}]},"children":["name-input"]}}
{"op":"add","path":"components.name-input","value":{"type":"input","props":{"placeholder":"请输入姓名"}}}
{"op":"add","path":"components.submit-btn","value":{"type":"button","props":{"children":"提交","type":"primary","htmlType":"submit"}}}
```

### 2. 带数据绑定的表单

```json
{"op":"init","path":"root","value":"form-card"}
{"op":"add","path":"components.form-card","value":{"type":"card","props":{"title":"编辑用户"},"children":["user-form"]}}
{"op":"add","path":"components.user-form","value":{"type":"form","props":{"layout":"vertical","initialValues":"$data.form"},"children":["name-field","email-field","submit-btn"]}}
{"op":"add","path":"components.name-field","value":{"type":"form-field","props":{"name":"name","label":"姓名"},"children":["name-input"]}}
{"op":"add","path":"components.name-input","value":{"type":"input","props":{"placeholder":"请输入姓名"}}}
{"op":"add","path":"components.email-field","value":{"type":"form-field","props":{"name":"email","label":"邮箱"},"children":["email-input"]}}
{"op":"add","path":"components.email-input","value":{"type":"input","props":{"placeholder":"请输入邮箱"}}}
{"op":"add","path":"components.submit-btn","value":{"type":"button","props":{"children":"提交","type":"primary","htmlType":"submit"}}}
{"op":"setData","path":"form","value":{"name":"John","email":"john@example.com"}}
```

### 3. 带 API 调用的表单

```json
{"op":"init","path":"root","value":"form-card"}
{"op":"add","path":"components.form-card","value":{"type":"card","props":{"title":"用户注册"},"children":["user-form"]}}
{"op":"add","path":"components.user-form","value":{"type":"form","props":{"layout":"vertical"},"children":["name-field","email-field","submit-btn"],"events":{"onFinish":{"type":"api","url":"/api/register","method":"POST","body":"$data.form"}}}}
{"op":"add","path":"components.name-field","value":{"type":"form-field","props":{"name":"name","label":"姓名","rules":[{"required":true,"message":"请输入姓名"}]},"children":["name-input"]}}
{"op":"add","path":"components.name-input","value":{"type":"input","props":{"placeholder":"请输入姓名"}}}
{"op":"add","path":"components.email-field","value":{"type":"form-field","props":{"name":"email","label":"邮箱"},"children":["email-input"]}}
{"op":"add","path":"components.email-input","value":{"type":"input","props":{"placeholder":"请输入邮箱"}}}
{"op":"add","path":"components.submit-btn","value":{"type":"button","props":{"children":"提交","type":"primary","htmlType":"submit"}}}
```

### 4. 数据展示表格

```json
{"op":"init","path":"root","value":"table-card"}
{"op":"add","path":"components.table-card","value":{"type":"card","props":{"title":"用户列表"},"children":["user-table"]}}
{"op":"add","path":"components.user-table","value":{"type":"table","props":{"dataSource":"$data.users","columns":[{"title":"姓名","dataIndex":"name","key":"name"},{"title":"邮箱","dataIndex":"email","key":"email"},{"title":"年龄","dataIndex":"age","key":"age"}]}}}
{"op":"setData","path":"users","value":[{"name":"John","email":"john@example.com","age":30},{"name":"Jane","email":"jane@example.com","age":25}]}
```

### 5. 提示信息

```json
{"op":"init","path":"root","value":"alert-card"}
{"op":"add","path":"components.alert-card","value":{"type":"card","props":{"title":"通知"},"children":["success-alert"]}}
{"op":"add","path":"components.success-alert","value":{"type":"alert","props":{"type":"success","message":"操作成功","description":"$data.message"}}}
{"op":"setData","path":"message","value":"您的注册已成功完成！"}
```

## 组件类型参考

### 容器组件

#### Card

```json
{
  "type": "card",
  "props": {
    "title": "标题",
    "extra": "额外内容"
  },
  "children": ["child-id"]
}
```

### 表单组件

#### Form

```json
{
  "type": "form",
  "props": {
    "layout": "vertical",
    "initialValues": "$data.form"
  },
  "children": ["field-1", "field-2", "submit-btn"],
  "events": {
    "onFinish": {
      "type": "api",
      "url": "/api/submit",
      "method": "POST",
      "body": "$data.form"
    }
  }
}
```

#### Form.Field

```json
{
  "type": "form-field",
  "props": {
    "name": "fieldName",
    "label": "字段标签",
    "rules": [
      { "required": true, "message": "必填" },
      { "type": "email", "message": "邮箱格式不正确" }
    ]
  },
  "children": ["input-id"]
}
```

### 输入组件

#### Input

```json
{
  "type": "input",
  "props": {
    "placeholder": "请输入",
    "disabled": false
  }
}
```

#### InputNumber

```json
{
  "type": "input-number",
  "props": {
    "placeholder": "请输入数字",
    "min": 0,
    "max": 100
  }
}
```

#### Textarea

```json
{
  "type": "textarea",
  "props": {
    "placeholder": "请输入",
    "rows": 4
  }
}
```

#### Select

```json
{
  "type": "select",
  "props": {
    "placeholder": "请选择",
    "options": "$data.options"
  }
}
```

### 按钮组件

#### Button

```json
{
  "type": "button",
  "props": {
    "children": "按钮文本",
    "type": "primary",
    "htmlType": "submit"
  }
}
```

### 展示组件

#### Table

```json
{
  "type": "table",
  "props": {
    "dataSource": "$data.tableData",
    "columns": [
      { "title": "列名", "dataIndex": "key", "key": "key" }
    ]
  }
}
```

#### Alert

```json
{
  "type": "alert",
  "props": {
    "type": "success",
    "message": "标题",
    "description": "$data.message"
  }
}
```

#### Text

```json
{
  "type": "text",
  "props": {
    "content": "$data.text"
  }
}
```

## 数据绑定

使用 `$data.` 前缀引用数据模型中的值：

```json
// 简单路径
"$data.userName"

// 嵌套路径
"$data.user.profile.name"

// 在表单中使用
"initialValues": "$data.form"

// 在表格中使用
"dataSource": "$data.users"

// 在文本中使用
"content": "$data.message"
```

## 事件配置

### API 事件

```json
{
  "events": {
    "onFinish": {
      "type": "api",
      "url": "/api/endpoint",
      "method": "POST",
      "body": "$data.form",
      "headers": {
        "Authorization": "Bearer token"
      }
    }
  }
}
```

## 提示词模板

### 生成表单

```
请生成一个用户注册表单，包含以下字段：
- 姓名（必填）
- 邮箱（必填，邮箱格式）
- 年龄（数字，0-150）
- 提交按钮

要求：
1. 使用流式消息格式
2. 每行一个 JSON 对象
3. 表单提交时调用 POST /api/register
4. 使用 Card 作为容器
```

### 生成数据展示

```
请生成一个用户列表表格，显示以下列：
- 姓名
- 邮箱
- 年龄

数据来源：$data.users

要求：
1. 使用流式消息格式
2. 使用 Card 作为容器
3. 使用 Table 组件
```

### 生成带初始值的表单

```
请生成一个用户编辑表单，包含以下字段：
- 姓名
- 邮箱

要求：
1. 使用流式消息格式
2. 表单初始值绑定到 $data.form
3. 提交时调用 PUT /api/users/:id
4. 初始数据：{ name: "John", email: "john@example.com" }
```

## 最佳实践

1. **组件 ID 命名规范**
   - 使用 kebab-case
   - 使用描述性名称
   - 例如：`user-form`, `name-field`, `submit-btn`

2. **数据绑定**
   - 优先使用数据绑定而不是硬编码
   - 使用清晰的数据路径
   - 例如：`$data.form.name` 而不是 `$data.n`

3. **表单验证**
   - 在 Form.Field 的 rules 中定义
   - 使用标准验证规则
   - 提供友好的错误提示

4. **事件处理**
   - Form 使用 onFinish 事件
   - Button 使用 htmlType="submit"
   - API 调用自动设置 Content-Type

5. **错误处理**
   - 表单验证错误由 Form 组件自动处理
   - API 错误会抛出异常
   - 使用 Error Boundary 捕获渲染错误

## 调试技巧

1. **验证 JSON 格式**
   - 每行必须是有效的 JSON
   - 使用 JSON.parse() 验证

2. **检查组件引用**
   - 确保所有 children 引用的组件都存在
   - 使用描述性 ID 便于调试

3. **测试数据绑定**
   - 先设置数据，再使用绑定
   - 检查数据路径是否正确

4. **查看控制台**
   - 解析错误会在控制台显示
   - 未知组件类型会有警告
