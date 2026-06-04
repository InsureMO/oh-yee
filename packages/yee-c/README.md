# @oh/yee-c

企业级 React 组件库，为现代 Web 应用提供高质量、可定制的 UI 组件。

## 特性

- **丰富组件** — 60+ 精心打造的企业级组件，覆盖表单、表格、导航、反馈等各类场景
- **TypeScript** — 使用 TypeScript 开发，提供完整的类型定义，提升开发体验和代码质量
- **主题定制** — 灵活的主题配置系统，支持 CSS 变量和样式定制，轻松适配品牌风格

## 安装

```bash
npm install @oh/yee-c
```

## 使用

```tsx
import { Button, Input, Table } from '@oh/yee-c';
```

按需引入样式：

```ts
import '@oh/yee-c/variables.css';
```

## 组件列表

### 通用

Button、Divider、Space、Spin、Skeleton、Watermark、ErrorBoundary、FloatButton

### 布局

Box、Card、Carousel、Collapse、Descriptions、Grid、List、Splitter、Steps、Tabs、Timeline

### 导航

Anchor、Breadcrumb、Dropdown、Menu、Pagination

### 数据录入

AutoComplete、Cascader、Checkbox、DatePicker、Field、Form、Input、InputNumber、Radio、RangePicker、Rate、Search、Select、Selector、Slider、Switch、TextArea、Transfer、TreeSelect、Upload、VerificationCode

### 数据展示

Avatar、Badge、Ellipsis、Highlight、ImageViewer、JsonViewer、Label、Popover、Progress、QRCode、Tag、Tooltip、Tree、Table、TableSelect

### 反馈

Alert、Dialog、Drawer、Message、Notice、Popconfirm、Trigger

### 其他

Config-Provider、Portal、CSV

## Hooks

提供 20+ 常用 Hooks：

useCountdown、useDebounceFunction、useDebounceValue、useDeepCompareEffect、useDeepCompareMemo、useDeepCompareMemorize、useDelayState、useElementSize、useEsc、useEvent、useFocusManage、useKeyControl、useLatest、useLayoutEffect、useLockFocus、useMergedState、useMount、usePressDrag、usePrevious、useResizeObserver、useUpdateEffect、useVirtualForm

## 开发

```bash
# 启动文档开发服务器
npm run dev

# 构建组件库
npm run build

# 构建文档
npm run docs:build

# 代码检查
npm run lint
```

## 技术栈

- React >= 18.0
- TypeScript
- Less + CSS Variables
- Father (构建工具)
- Dumi (文档工具)
