---
category: Components
title: Resize
subtitle: 弹性容器
group:
  title: 布局
  order: 5
toc: 'content'
---

# Resize 弹性容器

用于布局中，可使用拖拽改变容器宽度

## 代码演示
<code src="./demo/basic.tsx" title="基础使用" description="拖拽改变容器宽度"></code>

## API接口

### ResizeProps

| 属性名      | 类型                        | 描述                 | 默认值    |
|------------|-----------------------------|----------------------|----------|
| prefixCls  | `string`                    | 自定义类名前缀        |  -       |
| className  | `string`                    | 自定义根类名          |  -       | 
| style      | `React.CSSProperties`       | 自定义根样式          | -        | 
| width      | `string \| number`          | 容器宽度              | -        | 
| children   | `React.ReactNode`           | 子元素                | -        |   
| placement  | `'left' \| 'right'`         | 控制缩放的把手的位置   |`'right'` |
| onResize   | `(width: number) => void`   | 宽度变化的回调         | -        | 