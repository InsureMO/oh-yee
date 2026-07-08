# @rainbow-oh/yee-c

## 0.5.1

### Patch Changes

- d6bb05d: feat: update Descriptions and Select components with size support and improve styling

## 0.5.0

### Minor Changes

- 745d0ca: feat(Form): add async validation support and update API documentation

## 0.4.5

### Patch Changes

- 55564e4: refactor(yee-c): replace any types with proper interfaces

## 0.4.4

### Patch Changes

- b47f0b0: feat: enhance Cascader component with flattened options and improved type safety

## 0.4.3

### Patch Changes

- cfc183e: feat: enhance form store to notify watchers on value change and update useWatch subscription logic

## 0.4.2

### Patch Changes

- 8e767a1: feat: refactor form hooks and add localization support

## 0.4.1

### Patch Changes

- ab1821c: simplify Anchor component scroll handling

## 0.4.0

### Minor Changes

- 02374ef: add variant support for Tag and Segmented components, update styles and documentation

## 0.3.0

### Minor Changes

- b25925c: feat: add Segmented component and Tour feature with demos

## 0.2.0

### Minor Changes

- eb7e647: ### ✨ New features
  - **Form.Field**: add `tooltip` (a help icon next to the label; pass a node or a `FieldConfigurableTooltip` object to customize the icon) and `layout` (`'vertical' | 'horizontal'`) props.
  - **Space**: add `justify` prop.
  - **Checkbox.Group**: add `layout` (`'horizontal' | 'vertical'`) prop.
  - **Anchor**: expose `classNames` / `styles` on the anchor context.
  - **Tabs**: extend semantic DOM slots with `track`, `list`, and `activeBar`.

  ### ⚠️ Breaking changes
  - **Splitter**: removed the `itemPadding` prop. The `onResize` callback signature changed from `(sizes: number[]) => void` to `(sizes: PanelRect[]) => void`. Update any consumers of `Splitter` accordingly.
  - **Form**: `Rule.message` is now optional.
