---
category: Components
title: message
subtitle: 全局提示
group:
  title: 通知
  order: 0
toc: 'content'
---

# message 全局提示

全局展示操作反馈信息。

## 何时使用

- 可提供成功、警告和错误等反馈信息。
- 顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式。

## 代码演示

<code src="./demo/base.tsx">基本用法</code>
<code src="./demo/duration.tsx">自定义持续时间</code>

## API

### message

| 属性名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 提示内容 | ReactNode | - |
| duration | 自动关闭时间(秒)，设为 0 时不自动关闭 | number | `3` |
| icon | 自定义图标 | ReactNode | - |
| key | 当前提示的唯一标识 | string \| number | - |
| onClose | 关闭时的回调函数 | function | - |
| onClick | 点击时的回调函数 | function | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

### message 方法

| 方法 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| message.open(config) | 打开普通提示 | string \| [MessageConfigs](#messageconfigs) | - |
| message.info(config) | 打开信息提示 | string \| [MessageConfigs](#messageconfigs) | - |
| message.success(config) | 打开成功提示 | string \| [MessageConfigs](#messageconfigs) | - |
| message.warning(config) | 打开警告提示 | string \| [MessageConfigs](#messageconfigs) | - |
| message.error(config) | 打开错误提示 | string \| [MessageConfigs](#messageconfigs) | - |
| message.loading(config) | 打开加载提示 | string \| [MessageConfigs](#messageconfigs) | - |
| message.destroy(key) | 手动销毁指定 key 的提示 | string \| number | - |

### MessageConfigs

| 属性名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | 自定义类名前缀 | string | - |
| className | 自定义根类名 | string | - |
| style | 自定义根样式 | CSSProperties | - |
| content | 提示内容 | ReactNode | - |
| duration | 自动关闭时间(秒)，设为 0 时不自动关闭 | number | `3` |
| icon | 自定义图标 | ReactNode | - |
| key | 当前提示的唯一标识 | string \| number | - |
| onClose | 关闭时的回调函数 | function | - |
| onClick | 点击时的回调函数 | function | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |
