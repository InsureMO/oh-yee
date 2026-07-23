# @rainbow-oh/yee-x

[![npm](https://img.shields.io/npm/v/@rainbow-oh/yee-x.svg)](https://www.npmjs.com/package/@rainbow-oh/yee-x) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

React components for building AI-powered conversational interfaces. Part of the [Yee](https://github.com/insureMO/oh-yee) component library.

## Features

- **Schema-driven AI Rendering** — Turn AI-generated JSON into interactive React UI automatically
- **Streaming Support** — Real-time rendering of streaming AI responses with incremental updates
- **Conversation Primitives** — Bubbles, senders, prompts, and history out of the box
- **Markdown & Code** — Full GFM markdown rendering with syntax highlighting
- **Layout Utilities** — Flow marquee and resizable panels

## Installation

```bash
pnpm add @rainbow-oh/yee-x
```

Requires `@rainbow-oh/yee-c`, `react >= 18`, and `react-dom >= 18` as peer dependencies.

## Components

### Text & Content

| Component    | Description                                          |
| ------------ | ---------------------------------------------------- |
| `Markdown`   | GFM markdown rendering with syntax highlighting      |
| `CodeBlock`  | Code display with language detection and copy button |
| `AIRenderer` | Schema-driven dynamic UI renderer                    |

### Conversation

| Component     | Description                                                    |
| ------------- | -------------------------------------------------------------- |
| `Bubble`      | Chat bubble with avatar, header, content, and footer           |
| `Sender`      | Chat input with auto-sizing, send/stop, and keyboard shortcuts |
| `Prompts`     | Prompt suggestion list for welcome screens                     |
| `Attachments` | File upload and attachment cards                               |

### Layout

| Component | Description                      |
| --------- | -------------------------------- |
| `Flow`    | Auto-scrolling marquee container |
| `Resize`  | Draggable resizable panel        |

### Utilities

| Component  | Description                                        |
| ---------- | -------------------------------------------------- |
| `Welcome`  | Welcome landing section for AI chat                |
| `Process`  | Animated status indicator with message transitions |
| `Commands` | Slash-command popup menu                           |
| `IndepWin` | Picture-in-Picture independent window              |
| `History`  | Conversation history list                          |

## Usage

```tsx
import {
  Bubble,
  BubbleList,
  Sender,
  Markdown,
  CodeBlock,
  Prompts,
  Welcome,
  AIRenderer,
  StreamingAIRenderer,
  Attachments,
  FileCard,
  Commands,
  Flow,
  Resize,
  Process,
  IndepWin,
  History,
} from '@rainbow-oh/yee-x';
```

### AIRenderer

Renders interactive React UI from a JSON schema — the core AI-to-UI engine.

```tsx
const schema = {
  root: 'form',
  components: {
    form: {
      type: 'form',
      props: { layout: 'vertical' },
      children: ['nameField', 'submitBtn'],
      events: {
        onFinish: { type: 'api', url: '/api/submit', method: 'post' },
      },
    },
    nameField: {
      type: 'form-field',
      props: { label: 'Name', name: 'name', rules: [{ required: true }] },
      children: ['nameInput'],
    },
    nameInput: { type: 'input', props: { placeholder: 'Enter your name' } },
    submitBtn: {
      type: 'button',
      props: { type: 'primary', htmlType: 'submit' },
      children: ['Submit'],
    },
  },
};

<AIRenderer schema={schema} />;
```

For streaming AI responses, use `StreamingAIRenderer`:

```tsx
<StreamingAIRenderer content={streamingJsonString} isStreaming={isStreaming} />
```

Supports 40+ component type mappings: `form`, `input`, `select`, `table`, `button`, `card`, `tabs`, `drawer`, `alert`, `progress`, and more.

### Bubble

Chat bubble with role-based layout and content parsing.

```tsx
<Bubble
  avatar={{ src: '/avatar.png', alt: 'AI' }}
  placement="start"
  content="Hello! How can I help you?"
  footer={({ loading }) => (loading ? <Spin /> : null)}
/>
```

`BubbleList` renders a scrollable conversation with auto-scroll:

```tsx
<BubbleList
  items={messages.map((msg) => ({
    key: msg.id,
    role: msg.role,
    content: msg.content,
  }))}
  autoScroll
  parser="markdown"
  roles={{
    user: { placement: 'end', avatar: { src: '/user.png' } },
    assistant: { placement: 'start', avatar: { src: '/ai.png' } },
  }}
/>
```

### Sender

Chat input with auto-sizing textarea, send/stop controls, and keyboard shortcuts.

```tsx
<Sender
  value={text}
  onChange={setText}
  onSend={() => handleSend(text)}
  onStop={() => abortController.abort()}
  loading={isStreaming}
  sendKey="enter"
  header={
    <Sender.Header title="Context" closable>
      ...
    </Sender.Header>
  }
  prefix={<Paperclip size={18} />}
/>
```

### Markdown

Full GFM markdown rendering with syntax highlighting.

```tsx
<Markdown markdown={content} />
```

### CodeBlock

Code display with language detection and copy-to-clipboard.

```tsx
<CodeBlock code="console.log('hello')" language="typescript" />
```

### Prompts

Prompt suggestions for AI chat welcome screens.

```tsx
<Prompts
  title="What can I help with?"
  items={[
    { key: '1', label: 'Write code', description: 'Generate code snippets' },
    { key: '2', label: 'Analyze data', description: 'Interpret your data' },
  ]}
  onItemClick={(item) => setQuery(item.label)}
/>
```

### Welcome

Landing section for AI chat interfaces.

```tsx
<Welcome title="AI Assistant" description="Ask me anything">
  <Prompts items={promptItems} />
</Welcome>
```

### Process

Animated status indicator with smooth message transitions.

```tsx
<Process title="Thinking" message={currentStep} />
```

### Attachments

File upload with rich file cards.

```tsx
<Attachments multiple>
  <Button>Upload files</Button>
</Attachments>

<FileCard uid="1" name="report.pdf" size={1024000} status="success" />
```

### Commands

Slash-command popup triggered by typing.

```tsx
<Commands
  items={{
    '/': [
      { label: 'search', description: 'Search the web' },
      { label: 'code', description: 'Generate code' },
    ],
  }}
  onSelect={(cmd) => executeCommand(cmd)}
>
  {({ onTrigger, onKeyDown }) => (
    <Input onInput={onTrigger} onKeyDown={onKeyDown} />
  )}
</Commands>
```

### Flow

Auto-scrolling marquee container for horizontal or vertical content.

```tsx
<Flow stopOnHover distance={1} interval={30}>
  <div style={{ display: 'flex', gap: 16 }}>
    {items.map((item) => (
      <Card key={item.id}>{item.title}</Card>
    ))}
  </div>
</Flow>
```

### Resize

Draggable resizable panel.

```tsx
<Resize width={360} placement="right" onResize={(w) => setWidth(w)}>
  <SidePanel />
</Resize>
```

### IndepWin

Picture-in-Picture independent window.

```tsx
<IndepWin
  element={() => document.getElementById('chart-container')!}
  width={480}
  height={320}
  keyboard="ctrl+shift+p"
/>
```

## Streaming Utilities

```tsx
import { consumeReadableStream, processStreamText } from '@rainbow-oh/yee-x';

// Consume a ReadableStream with abort support
const result = await consumeReadableStream(response.body!, { signal });

// Parse SSE-style stream text
processStreamText(reader, {
  onChunk: (text) => updateUI(text),
  separator: '\n\n',
});
```

## Global Context

Provide default props for Bubble components via context:

```tsx
import { GlobalContext } from '@rainbow-oh/yee-x';

<GlobalContext.Provider value={{ bubble: { avatar: { src: '/default.png' } } }}>
  <ChatApp />
</GlobalContext.Provider>;
```

## Development

```bash
# Install dependencies
pnpm install

# Develop with live docs
pnpm dev

# Build library
pnpm build

# Build in watch mode
pnpm build:watch

# Build documentation site
pnpm docs:build

# Preview documentation
pnpm docs:preview

# Run tests
pnpm test

# Lint and check
pnpm doctor
```

## Contributing

See the root [Contributing Guide](https://github.com/insureMO/oh-yee/blob/main/CONTRIBUTING.md).

## License

[MIT](./LICENSE) © [insureMO](https://github.com/insureMO)
