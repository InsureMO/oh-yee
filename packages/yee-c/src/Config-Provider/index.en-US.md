---
category: Components
title: ConfigProvider
subtitle: Config Provider
group:
  title: Other
  order: 12
toc: 'content'
---

# ConfigProvider

`ConfigProvider` provides a uniform configuration support for components.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of ConfigProvider"></code>
<code src="./demo/multiple.tsx" title="Multiple Components" description="Configure multiple components at once"></code>
<code src="./demo/nested.tsx" title="Nested Config" description="Nested configuration providers"></code>

## API

### ConfigProviderProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| value | `GlobalCtxType` | Global configuration for components | - |

### GlobalCtxType

GlobalCtxType contains configuration for all components. Here are some examples:

| Property | Type | Description |
| --- | --- | --- |
| alert | [AlertProps](/components/alert) | Alert component configuration |
| anchor | [AnchorProps](/components/anchor) | Anchor component configuration |
| avatar | [AvatarProps](/components/avatar) | Avatar component configuration |
| badge | [BadgeProps](/components/badge) | Badge component configuration |
| box | [BoxProps](/components/box) | Box component configuration |
| breadcrumb | [BreadcrumbProps](/components/breadcrumb) | Breadcrumb component configuration |
| button | [ButtonProps](/components/button) | Button component configuration |
| card | [CardProps](/components/card) | Card component configuration |
| carousel | [CarouselProps](/components/carousel) | Carousel component configuration |
| checkbox | [CheckboxProps](/components/checkbox) | Checkbox component configuration |
| checkboxgroup | [CheckboxGroupProps](/components/checkbox) | CheckboxGroup component configuration |
| collapse | [CollapseProps](/components/collapse) | Collapse component configuration |
| datepicker | [DatePickerProps](/components/datepicker) | DatePicker component configuration |
| rangepicker | [RangePickerProps](/components/range-picker) | RangePicker component configuration |
| dialog | [DialogProps](/components/dialog) | Dialog component configuration |
| divider | [DividerProps](/components/divider) | Divider component configuration |
| descriptions | [DescriptionsProps](/components/descriptions) | Descriptions component configuration |
| drawer | [DrawerProps](/components/drawer) | Drawer component configuration |
| dropdown | [DropdownProps](/components/dropdown) | Dropdown component configuration |
| email | [EmailProps](/components/input) | Email component configuration |
| errorboundary | [ErrorBoundaryProps](/components/error-boundary) | ErrorBoundary component configuration |
| form | [FormProps](/components/form) | Form component configuration |
| floatbutton | [FloatButtonProps](/components/float-button) | FloatButton component configuration |
| grid | [GridProps](/components/grid) | Grid component configuration |
| inputnumber | [InputNumberProps](/components/input-number) | InputNumber component configuration |
| imageviewer | [ImageViewerProps](/components/image-viewer) | ImageViewer component configuration |
| imageviewerpopup | [ImageViewerPopupProps](/components/image-viewer) | ImageViewerPopup component configuration |
| label | [LabelProps](/components/label) | Label component configuration |
| list | [ListProps](/components/list) | List component configuration |
| menu | [MenuProps](/components/menu) | Menu component configuration |
| password | [PasswordProps](/components/input) | Password component configuration |
| pagination | [PaginationProps](/components/pagination) | Pagination component configuration |
| popconfirm | [PopconfirmProps](/components/popconfirm) | Popconfirm component configuration |
| popover | [PopoverProps](/components/popover) | Popover component configuration |
| progress | [ProgressProps](/components/progress) | Progress component configuration |
| radio | [RadioProps](/components/radio) | Radio component configuration |
| radiogroup | [RadioGroupProps](/components/radio) | RadioGroup component configuration |
| rate | [RateProps](/components/rate) | Rate component configuration |
| search | [SearchProps](/components/search) | Search component configuration |
| select | [SelectProps](/components/select) | Select component configuration |
| segmented | [SegmentedProps](/components/segmented) | Segmented component configuration |
| skeleton | [SkeletonProps](/components/skeleton) | Skeleton component configuration |
| slider | [SliderProps](/components/slider) | Slider component configuration |
| space | [SpaceProps](/components/space) | Space component configuration |
| spin | [SpinProps](/components/spin) | Spin component configuration |
| splitter | [SplitterProps](/components/splitter) | Splitter component configuration |
| steps | [StepsProps](/components/steps) | Steps component configuration |
| switch | [SwitchProps](/components/switch) | Switch component configuration |
| table | [TableProps](/components/table) | Table component configuration |
| tableselect | [TableSelectProps](/components/table-select) | TableSelect component configuration |
| tabs | [TabsProps](/components/tabs) | Tabs component configuration |
| tag | [TagProps](/components/tag) | Tag component configuration |
| input | [InputProps](/components/input) | Input component configuration |
| textarea | [TextAreaProps](/components/text-area) | TextArea component configuration |
| timeline | [TimelineProps](/components/timeline) | Timeline component configuration |
| highlight | [HighlightProps](/components/highlight) | Highlight component configuration |
| tooltip | [TooltipProps](/components/tooltip) | Tooltip component configuration |
| tour | [TourProps](/components/tour) | Tour component configuration |
| tree | [TreeProps](/components/tree) | Tree component configuration |
| treeselect | [TreeSelectProps](/components/tree-select) | TreeSelect component configuration |
| trigger | [TriggerProps](/components/trigger) | Trigger component configuration |
| upload | [UploadProps](/components/upload) | Upload component configuration |
| verificationcode | [VerificationCodeProps](/components/verification-code) | VerificationCode component configuration |
| watermark | [WatermarkProps](/components/watermark) | Watermark component configuration |