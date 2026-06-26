---
category: Components
title: ElementInspector
subtitle: Element Inspector
group:
  title: Dev Tooling
  order: 99
toc: 'content'
---

# ElementInspector

A **dev-only** helper: once enabled, moving the mouse highlights element
boundaries (snapped to the nearest `data-testid`), and clicking pops up a compact
popover next to the element showing a prompt built from the region's "source
location + selector". Hit **Copy** to write it to the clipboard, then paste into
a codebase-aware AI (Cursor / Claude Code / IDE Copilot) to point it precisely
at the code to change.

> In production builds (`process.env.NODE_ENV === 'production'`) the component
> just renders its children — listeners, overlay, and popover never run and can
> be dead-code-eliminated by the consumer's bundler.

## How it works

- **Boundary snapping**: hover and pick target the nearest `data-testid`
  ancestor — clicking a button inside a table identifies the outer
  `data-testid="user-table"` container and its component, not the `Button`.
- **Harvesting**: source location and component name (`fiber.elementType.name`)
  are read from the React fiber. React ≤18 exposes a `_debugSource` object;
  React 19+ removed it and stores source info as an Error stack on `_debugStack`
  (captured when the element is created), which we parse back into a file/line.
  The default prompt carries only the source location + selector; both fields
  are also exposed via `ElementInfo` for custom `promptTemplate`s. Source
  location is only available in dev builds; when absent the prompt falls back
  to just the selector, still useful for a repo-aware AI.
- **Popover output**: on click a read-only popover appears beside the element
  (auto-positioned so it never covers what you picked) with a Copy button that
  auto-dismisses on success. Use `onCopy` to take over the copy action, or
  `promptTemplate` to customize the prompt.
- **Context menu**: set `contextMenu` to enable a right-click menu while picking
  — jump to the source in your editor (`vscode://` by default; pass
  `openInCursor` / `openInJetBrains` or a custom `editorOpener`), copy
  `file:line`, the selector, or a test selector (`getByTestId(...)`). Provide
  `menuItems` to fully customize.

## Code Demo

<code src="./demo/basic.tsx" title="Basic Usage" description="Enable, then click any region to pop up the prompt popover"></code>

## Notes

- Wrap your app root once: `<ElementInspector>`. It is meant to stay mounted during
  development.
- To strip it completely from production, conditionally render on the consumer
  side: `{process.env.NODE_ENV !== 'production' && <ElementInspector>}`.
- If `Location` is missing from the prompt, the target app's dev build likely
  does not enable JSX source — standard Vite / Next / CRA dev do so by default.
- **React 19 + Jump to source**: React 19's source stack only carries the
  dev-server URL (`/src/x.tsx`), so pass `projectRoot` (your app's absolute root)
  to reconstruct the absolute path `vscode://file/…` openers need. Without it
  the path stays server-relative (copy actions still work; the editor opener may
  not resolve).

## API

### ElementInspectorProps

| Property       | Type                                          | Description                                                                                  | Default           |
| -------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------- | ----------------- |
| children       | `React.ReactNode`                             | Content the picker assists                                                                   | -                 |
| active         | `boolean`                                     | Controlled active state                                                                      | -                 |
| defaultActive  | `boolean`                                     | Initial active state (uncontrolled)                                                          | `false`           |
| onActiveChange | `(active: boolean) => void`                   | Called when active state changes                                                             | -                 |
| shortcut       | `string \| null`                              | Toggle shortcut, e.g. `'Alt+E'`; `null`/`''` disables                                        | `'Alt+E'`         |
| promptTemplate | `(info: ElementInfo) => string`               | Custom prompt builder                                                                        | built-in default  |
| onCopy         | `(info: ElementInfo, prompt: string) => void` | Fired when the popover's Copy button is clicked; skips default clipboard write when provided | -                 |
| copiedText     | `string`                                      | Text shown on the Copy button after a successful copy                                        | `'Copied'`        |
| theme          | `'light' \| 'dark'`                           | Toggle / highlight / popover theme                                                           | `'light'`         |
| className      | `string`                                      | Extra class for the floating toggle                                                          | -                 |
| prefixCls      | `string`                                      | Style prefix                                                                                 | `'yee-element-inspector'` |
| contextMenu   | `boolean`                                     | Enable the right-click context menu while picking                                            | `false`           |
| menuItems     | `(info: ElementInfo) => InspectorMenuItem[]`  | Custom context-menu items; omit for built-in defaults                                        | built-in defaults |
| editorOpener  | `((info: ElementInfo) => void) \| false`      | "Jump to source" action for default items; `false` removes it                                | `openInVSCode`    |
| projectRoot   | `string`                                      | App's absolute root dir; required on React 19+ for "Jump to source" to resolve an absolute path | -              |

### ElementInfo

| Property      | Type          | Description                                         |
| ------------- | ------------- | --------------------------------------------------- |
| element       | `HTMLElement` | The picked DOM element (snapped to testid boundary) |
| componentName | `string`      | Owning React component name, when resolvable        |
| fileName      | `string`      | Source file (dev + JSX source only)                 |
| lineNumber    | `number`      | Source line number                                  |
| testId        | `string`      | Nearest `data-testid` value                         |
| selector      | `string`      | Region selector, e.g. `[data-testid="user-table"]`  |

### InspectorMenuItem

| Property | Type                              | Description                              |
| -------- | --------------------------------- | ---------------------------------------- |
| key      | `string`                          | Stable key (React reconciliation)        |
| label    | `React.ReactNode`                 | Item label                               |
| icon     | `React.ReactNode`                 | Leading icon                             |
| disabled | `boolean`                         | Disable the item                         |
| danger   | `boolean`                         | Render as a destructive (red) item       |
| onSelect | `(info: ElementInfo) => void`     | Fired on click with the element's info   |
| type     | `'item' \| 'divider'`             | Render a divider instead of an item      |
