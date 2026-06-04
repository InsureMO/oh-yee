---
category: Components
title: notice
subtitle: 通知
group:
  title: 通知
  order: 1
toc: 'content'
---

# notice 通知

全局展示通知提醒信息，支持多个位置同时显示。

## 何时使用

- 在系统四个角落或顶部/底部显示通知提醒信息
- 经常用于以下情况：
  - 较为复杂的通知内容
  - 带有交互的通知，给出用户下一步的行动点
  - 系统主动推送

## 代码演示

<code src="./demo/basic.tsx" title="基本用法" desc="最基础的用法，支持多个位置显示"></code>

## API

### notice

| 属性名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 通知标题 | ReactNode | - |
| content | 通知内容 | ReactNode | - |
| duration | 自动关闭时间(秒)，设为 0 时不自动关闭 | number | `4.5` |
| icon | 自定义图标 | ReactNode | - |
| key | 当前通知的唯一标识 | string \| number | - |
| placement | 显示位置 | `'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight' \| 'top' \| 'bottom'` | `'topRight'` |
| showProgress | 是否显示进度条 | boolean | - |
| pauseOnHover | 鼠标悬停时是否暂停自动关闭 | boolean | - |
| closable | 是否显示关闭按钮 | boolean | `true` |
| onClose | 关闭时的回调函数 | function | - |
| onClick | 点击时的回调函数 | function | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

### notice 方法

| 方法 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| notice.open(config) | 打开普通通知 | string \| [NoticeConfigs](#noticeconfigs) | - |
| notice.info(config) | 打开信息通知 | string \| [NoticeConfigs](#noticeconfigs) | - |
| notice.success(config) | 打开成功通知 | string \| [NoticeConfigs](#noticeconfigs) | - |
| notice.warning(config) | 打开警告通知 | string \| [NoticeConfigs](#noticeconfigs) | - |
| notice.error(config) | 打开错误通知 | string \| [NoticeConfigs](#noticeconfigs) | - |
| notice.destroy(key) | 手动销毁指定 key 的通知 | string \| number | - |

### NoticeConfigs

| 属性名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | 自定义类名前缀 | string | - |
| className | 自定义根类名 | string | - |
| style | 自定义根样式 | CSSProperties | - |
| title | 通知标题 | ReactNode | - |
| content | 通知内容 | ReactNode | - |
| duration | 自动关闭时间(秒)，设为 0 时不自动关闭 | number | `4.5` |
| icon | 自定义图标 | ReactNode | - |
| key | 当前通知的唯一标识 | string \| number | - |
| placement | 显示位置 | `'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight' \| 'top' \| 'bottom'` | `'topRight'` |
| showProgress | 是否显示进度条 | boolean | - |
| pauseOnHover | 鼠标悬停时是否暂停自动关闭 | boolean | - |
| closable | 是否显示关闭按钮 | boolean | `true` |
| onClose | 关闭时的回调函数 | function | - |
| onClick | 点击时的回调函数 | function | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |
