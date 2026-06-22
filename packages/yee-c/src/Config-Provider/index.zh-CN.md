---
category: Components
title: ConfigProvider
subtitle: 全局配置
group:
  title: 其他
  order: 12
toc: 'content'
---

# ConfigProvider 全局配置

`ConfigProvider` 为组件提供统一的全局化配置。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="ConfigProvider的基础用法"></code>
<code src="./demo/multiple.tsx" title="多组件配置" description="一次配置多个组件"></code>
<code src="./demo/nested.tsx" title="嵌套配置" description="嵌套的配置提供者"></code>

## API

### ConfigProviderProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| value | `GlobalCtxType` | 组件的全局配置 | - |

### GlobalCtxType

GlobalCtxType 包含所有组件的配置。以下是一些示例：

| 属性名 | 类型 | 描述 |
| --- | --- | --- |
| alert | [AlertProps](/components/alert) | Alert 组件配置 |
| anchor | [AnchorProps](/components/anchor) | Anchor 组件配置 |
| avatar | [AvatarProps](/components/avatar) | Avatar 组件配置 |
| badge | [BadgeProps](/components/badge) | Badge 组件配置 |
| box | [BoxProps](/components/box) | Box 组件配置 |
| breadcrumb | [BreadcrumbProps](/components/breadcrumb) | Breadcrumb 组件配置 |
| button | [ButtonProps](/components/button) | Button 组件配置 |
| card | [CardProps](/components/card) | Card 组件配置 |
| carousel | [CarouselProps](/components/carousel) | Carousel 组件配置 |
| checkbox | [CheckboxProps](/components/checkbox) | Checkbox 组件配置 |
| checkboxgroup | [CheckboxGroupProps](/components/checkbox) | CheckboxGroup 组件配置 |
| collapse | [CollapseProps](/components/collapse) | Collapse 组件配置 |
| datepicker | [DatePickerProps](/components/datepicker) | DatePicker 组件配置 |
| rangepicker | [RangePickerProps](/components/range-picker) | RangePicker 组件配置 |
| dialog | [DialogProps](/components/dialog) | Dialog 组件配置 |
| divider | [DividerProps](/components/divider) | Divider 组件配置 |
| descriptions | [DescriptionsProps](/components/descriptions) | Descriptions 组件配置 |
| drawer | [DrawerProps](/components/drawer) | Drawer 组件配置 |
| dropdown | [DropdownProps](/components/dropdown) | Dropdown 组件配置 |
| email | [EmailProps](/components/input) | Email 组件配置 |
| errorboundary | [ErrorBoundaryProps](/components/error-boundary) | ErrorBoundary 组件配置 |
| form | [FormProps](/components/form) | Form 组件配置 |
| floatbutton | [FloatButtonProps](/components/float-button) | FloatButton 组件配置 |
| grid | [GridProps](/components/grid) | Grid 组件配置 |
| inputnumber | [InputNumberProps](/components/input-number) | InputNumber 组件配置 |
| imageviewer | [ImageViewerProps](/components/image-viewer) | ImageViewer 组件配置 |
| imageviewerpopup | [ImageViewerPopupProps](/components/image-viewer) | ImageViewerPopup 组件配置 |
| label | [LabelProps](/components/label) | Label 组件配置 |
| list | [ListProps](/components/list) | List 组件配置 |
| menu | [MenuProps](/components/menu) | Menu 组件配置 |
| password | [PasswordProps](/components/input) | Password 组件配置 |
| pagination | [PaginationProps](/components/pagination) | Pagination 组件配置 |
| popconfirm | [PopconfirmProps](/components/popconfirm) | Popconfirm 组件配置 |
| popover | [PopoverProps](/components/popover) | Popover 组件配置 |
| progress | [ProgressProps](/components/progress) | Progress 组件配置 |
| radio | [RadioProps](/components/radio) | Radio 组件配置 |
| radiogroup | [RadioGroupProps](/components/radio) | RadioGroup 组件配置 |
| rate | [RateProps](/components/rate) | Rate 组件配置 |
| search | [SearchProps](/components/search) | Search 组件配置 |
| select | [SelectProps](/components/select) | Select 组件配置 |
| segmented | [SegmentedProps](/components/segmented) | Segmented 组件配置 |
| skeleton | [SkeletonProps](/components/skeleton) | Skeleton 组件配置 |
| slider | [SliderProps](/components/slider) | Slider 组件配置 |
| space | [SpaceProps](/components/space) | Space 组件配置 |
| spin | [SpinProps](/components/spin) | Spin 组件配置 |
| splitter | [SplitterProps](/components/splitter) | Splitter 组件配置 |
| steps | [StepsProps](/components/steps) | Steps 组件配置 |
| switch | [SwitchProps](/components/switch) | Switch 组件配置 |
| table | [TableProps](/components/table) | Table 组件配置 |
| tableselect | [TableSelectProps](/components/table-select) | TableSelect 组件配置 |
| tabs | [TabsProps](/components/tabs) | Tabs 组件配置 |
| tag | [TagProps](/components/tag) | Tag 组件配置 |
| input | [InputProps](/components/input) | Input 组件配置 |
| textarea | [TextAreaProps](/components/text-area) | TextArea 组件配置 |
| timeline | [TimelineProps](/components/timeline) | Timeline 组件配置 |
| highlight | [HighlightProps](/components/highlight) | Highlight 组件配置 |
| tooltip | [TooltipProps](/components/tooltip) | Tooltip 组件配置 |
| tour | [TourProps](/components/tour) | Tour 组件配置 |
| tree | [TreeProps](/components/tree) | Tree 组件配置 |
| treeselect | [TreeSelectProps](/components/tree-select) | TreeSelect 组件配置 |
| trigger | [TriggerProps](/components/trigger) | Trigger 组件配置 |
| upload | [UploadProps](/components/upload) | Upload 组件配置 |
| verificationcode | [VerificationCodeProps](/components/verification-code) | VerificationCode 组件配置 |
| watermark | [WatermarkProps](/components/watermark) | Watermark 组件配置 |