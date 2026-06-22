# @rainbow-oh/yee-c

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
