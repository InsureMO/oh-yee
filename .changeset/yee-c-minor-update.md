---
"@rainbow-oh/yee-c": minor
---

### ✨ New features

- **Form.Field**: add `tooltip` (a help icon next to the label; pass a node or a `FieldConfigurableTooltip` object to customize the icon) and `layout` (`'vertical' | 'horizontal'`) props.
- **Space**: add `justify` prop.
- **Checkbox.Group**: add `layout` (`'horizontal' | 'vertical'`) prop.
- **Anchor**: expose `classNames` / `styles` on the anchor context.
- **Tabs**: extend semantic DOM slots with `track`, `list`, and `activeBar`.

### ⚠️ Breaking changes

- **Splitter**: removed the `itemPadding` prop. The `onResize` callback signature changed from `(sizes: number[]) => void` to `(sizes: PanelRect[]) => void`. Update any consumers of `Splitter` accordingly.
- **Form**: `Rule.message` is now optional.
