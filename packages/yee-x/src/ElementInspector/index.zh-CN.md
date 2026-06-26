---
category: Components
title: ElementInspector
subtitle: 元素检查器
group:
  title: 开发辅助
  order: 99
toc: 'content'
---

# ElementInspector 元素检查器

一个 **dev-only** 的辅助组件：开启后鼠标在页面上移动会高亮元素边界（吸附到最近的 `data-testid`），点击后在该区域旁弹出一个紧凑的 popover，展示由「源码位置 + 选择器」拼成的提示词，点「复制」写入剪贴板，粘进有完整代码库上下文的 AI（Cursor / Claude Code / IDE Copilot）即可精准改代码。

> 生产构建（`process.env.NODE_ENV === 'production'`）下组件直接渲染 children，监听、覆盖层与 popover 都不会运行，可被消费者打包器 DCE。

## 工作方式

- **边界吸附**：hover / 采集都以最近的 `data-testid` 祖先为边界——点表格里的按钮时，识别到的是外层 `data-testid="user-table"` 容器及其所属组件，而不是 `Button`。
- **信息采集**：通过 React fiber 读取源码位置与组件名（`fiber.elementType.name`）。React ≤18 读 `_debugSource`；React 19+ 移除了该字段，改为解析 fiber 上的 `_debugStack`（创建元素时捕获的 Error 栈）。默认提示词只输出源码位置 + 选择器，两者都通过 `ElementInfo` 暴露给自定义 `promptTemplate`。源码位置仅在 dev 构建中可得，缺失时降级为只输出选择器，对有 repo 的 AI 依然可用。
- **Popover 输出**：点击后在元素旁弹出一个只读 popover 展示提示词（自动避让，不遮挡所选元素），带「复制」按钮，复制成功后自动收起；也可用 `onCopy` 接管复制行为，或用 `promptTemplate` 自定义提示词。
- **右键菜单**：开启 `contextMenu` 后，采集时右键元素弹出菜单——在编辑器打开源码（默认 `vscode://`，可传 `openInCursor` / `openInJetBrains` 或自定义 `editorOpener`）、复制 `file:line`、复制选择器、复制测试选择器（`getByTestId(...)`）。可用 `menuItems` 完全自定义。

## 代码演示

<code src="./demo/basic.tsx" title="基础使用" description="开启后点击任意区域，在元素旁弹出提示词 popover"></code>

## 使用建议

- 建议在应用根节点包一层 `<ElementInspector>`，开发期常驻。
- 想在 prod 构建中彻底移除，可在消费侧条件渲染：`{process.env.NODE_ENV !== 'production' && <ElementInspector>}`。
- 若源码位置（`Location`）缺失，通常是目标 app 的 dev 构建未开启 JSX source；标准 Vite / Next / CRA dev 默认都开。
- **React 19 + Jump to source**：React 19 的源码栈只带 dev-server URL（`/src/x.tsx`），需传 `projectRoot`（应用绝对根目录）才能拼出 `vscode://file/…` 能打开的绝对路径。未传时路径保持 server-relative（复制功能仍可用，编辑器跳转可能失效）。

## API

### ElementInspectorProps

| Property       | Type                                          | Description                                           | Default           |
| -------------- | --------------------------------------------- | ----------------------------------------------------- | ----------------- |
| children       | `React.ReactNode`                             | 被辅助的页面内容                                      | -                 |
| active         | `boolean`                                     | 受控的激活状态                                        | -                 |
| defaultActive  | `boolean`                                     | 初始激活状态（非受控）                                | `false`           |
| onActiveChange | `(active: boolean) => void`                   | 激活状态变化回调                                      | -                 |
| shortcut       | `string \| null`                              | 切换快捷键，如 `'Alt+E'`；传 `null`/`''` 关闭         | `'Alt+E'`         |
| promptTemplate | `(info: ElementInfo) => string`               | 自定义提示词模板                                      | 内置默认模板      |
| onCopy         | `(info: ElementInfo, prompt: string) => void` | 点击 popover 复制按钮时触发；提供后跳过默认剪贴板写入 | -                 |
| copiedText     | `string`                                      | 复制成功时复制按钮显示的文案                          | `'Copied'`        |
| theme          | `'light' \| 'dark'`                           | 浮动按钮、高亮与 popover 的主题                       | `'light'`         |
| className      | `string`                                      | 浮动按钮的额外类名                                    | -                 |
| prefixCls      | `string`                                      | 样式前缀                                              | `'yee-element-inspector'` |
| contextMenu   | `boolean`                                     | 开启采集时的右键上下文菜单                            | `false`           |
| menuItems     | `(info: ElementInfo) => InspectorMenuItem[]`  | 自定义菜单项；不传用内置默认项                        | 内置默认项        |
| editorOpener  | `((info: ElementInfo) => void) \| false`      | 默认项的「Jump to source」动作；传 `false` 移除该项   | `openInVSCode`    |
| projectRoot   | `string`                                      | 应用绝对根目录；React 19+ 下「Jump to source」需要它拼出绝对路径 | -                 |

### ElementInfo

| Property      | Type          | Description                                 |
| ------------- | ------------- | ------------------------------------------- |
| element       | `HTMLElement` | 被选中的 DOM 元素（已吸附到 testid 边界）   |
| componentName | `string`      | 所属 React 组件名（可解析时）               |
| fileName      | `string`      | 源码文件（dev + JSX source 时）             |
| lineNumber    | `number`      | 源码行号                                    |
| testId        | `string`      | 最近的 `data-testid` 值                     |
| selector      | `string`      | 区域选择器，如 `[data-testid="user-table"]` |

### InspectorMenuItem

| Property | 类型                          | 说明                              |
| -------- | ----------------------------- | --------------------------------- |
| key      | `string`                      | 稳定 key（React 协调）            |
| label    | `React.ReactNode`             | 菜单项文案                        |
| icon     | `React.ReactNode`             | 前置图标                          |
| disabled | `boolean`                     | 禁用该项                          |
| danger   | `boolean`                     | 渲染为危险（红色）项              |
| onSelect | `(info: ElementInfo) => void` | 点击时触发，带元素信息            |
| type     | `'item' \| 'divider'`         | 渲染为分隔线而非菜单项            |
