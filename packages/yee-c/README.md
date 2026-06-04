# @rainbow-oh/yee-c

[![npm](https://img.shields.io/npm/v/@rainbow-oh/yee-c.svg)](https://www.npmjs.com/package/@rainbow-oh/yee-c) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

65+ foundational React UI components for building modern enterprise applications. Part of the [Yee](https://github.com/InsureMO/oh-yee) component library.

## Features

- **65+ Components** — Forms, tables, navigation, feedback, data display, and more
- **TypeScript First** — Complete type definitions for all components and props
- **Theming** — CSS variable-based theming with 10+ built-in color presets
- **20+ Hooks** — `useDebounceValue`, `useMergedState`, `useVirtualForm`, `useResizeObserver`, etc.
- **Tree-shakeable** — ESM / CJS / UMD builds with proper `sideEffects` configuration
- **Accessibility** — Keyboard navigation and ARIA attributes where applicable

## Installation

```bash
pnpm add @rainbow-oh/yee-c
```

Requires `react >= 18` and `react-dom >= 18` as peer dependencies.

## Usage

```tsx
import { Button, Form, Input, Table, Card, Select, Dialog, message } from '@rainbow-oh/yee-c';
```

Import styles:

```tsx
// Variables and theme
import '@rainbow-oh/yee-c/variables.css';

// Or a specific color theme
import '@rainbow-oh/yee-c/color.blue.css';
```

### Quick Example

```tsx
import { Form, Input, Button, message } from '@rainbow-oh/yee-c';

function UserForm() {
  const [form] = Form.useForm();
  const { messageApi, messageHolder } = message.useMessage();

  const handleSubmit = (values: { name: string }) => {
    messageApi.success(`Submitted: ${values.name}`);
  };

  return (
    <>
      {messageHolder}
      <Form form={form} onFinish={handleSubmit}>
        <Form.Field label="Name" name="name" rules={[{ required: true, message: 'Please enter name' }]}>
          <Input />
        </Form.Field>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form>
    </>
  );
}
```

## Components

### General

Button, Divider, Space, Spin, Skeleton, Watermark, ErrorBoundary, FloatButton

### Layout

Box, Card, Carousel, Collapse, Descriptions, Grid, List, Splitter, Steps, Tabs, Timeline

### Navigation

Anchor, Breadcrumb, Dropdown, Menu, Pagination

### Data Entry

Cascader, Checkbox, DatePicker, Form, Input, InputNumber, Radio, RangePicker, Rate, Search, Select, Slider, Switch, TextArea, Transfer, TreeSelect, Upload, VerificationCode

### Data Display

Avatar, Badge, Ellipsis, Highlight, ImageViewer, JsonViewer, Label, Popover, Progress, QRCode, Tag, Tooltip, Tree, Table, TableSelect

### Feedback

Alert, Dialog, Drawer, Message, Notice, Popconfirm, Trigger

### Other

ConfigProvider, Portal

## Hooks

20+ utility hooks for common React patterns:

| Hook | Description |
|---|---|
| `useDebounceFunction` | Debounced function execution |
| `useDebounceValue` | Debounced state value |
| `useDeepCompareEffect` | Effect with deep comparison |
| `useDeepCompareMemo` | Memo with deep comparison |
| `useMergedState` | Controlled/uncontrolled state |
| `useLatest` | Always-current ref value |
| `useMount` | Mount lifecycle hook |
| `useUpdateEffect` | Skip-first-run effect |
| `useResizeObserver` | Element resize observation |
| `useElementSize` | Element dimensions tracking |
| `useEvent` | Stable event handler |
| `useFocusManage` | Focus management |
| `useKeyControl` | Keyboard control |
| `useVirtualForm` | Virtual scrolling for forms |

## Theming

Use built-in color themes by importing the corresponding CSS file:

```tsx
import '@rainbow-oh/yee-c/variables.css';   // Base variables
import '@rainbow-oh/yee-c/color.blue.css';  // Blue theme
import '@rainbow-oh/yee-c/color.dark.css';  // Dark theme
```

Available themes: `blue`, `crimson`, `dark`, `green`, `jam`, `navy`, `peach`, `pine`, `pitaya`, `pumpkin`, `ruby`.

## Development

```bash
# Start documentation dev server
pnpm dev

# Build the library
pnpm build

# Build documentation site
pnpm docs:build

# Lint
pnpm lint
```

## Contributing

See the root [Contributing Guide](https://github.com/InsureMO/oh-yee/blob/main/CONTRIBUTING.md).

## License

[MIT](./LICENSE) © [InsureMO](https://github.com/InsureMO)
