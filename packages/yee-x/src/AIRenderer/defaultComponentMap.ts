/**
 * AIRenderer default component mapping
 * Maps abstract component types to yee-c components
 */
import {
  Alert,
  Avatar,
  Badge,
  Box,
  Breadcrumb,
  Button,
  Card,
  Cascader,
  Checkbox,
  Collapse,
  DatePicker,
  Divider,
  Drawer,
  Dropdown,
  Form,
  Grid,
  Input,
  Label,
  List,
  Pagination,
  Progress,
  Radio,
  RangePicker,
  Rate,
  Select,
  Slider,
  Space,
  Spin,
  Switch,
  Table,
  Tabs,
  Tag,
  TextArea,
  Timeline,
  Tooltip,
  Tree,
  Upload,
} from '@rainbow-oh/yee-c';
import type { ComponentMapping } from './interface';

/**
 * Default component mapping
 * Maps abstract component types to yee-c component implementations
 */
export const defaultComponentMap: Record<string, ComponentMapping> = {
  // Basic components
  button: {
    component: Button,
    propsTransformer: (props) => ({
      ...props,
      // children: props.label || props.text || props.children,
    }),
  },

  input: {
    component: Input,
    propsTransformer: (props) => ({
      ...props,
    }),
  },

  'input-number': {
    component: Input,
    propsTransformer: (props) => ({
      ...props,
      type: 'number',
    }),
  },

  email: {
    component: Input.Email,
    propsTransformer: (props) => ({
      ...props,
    }),
  },

  password: {
    component: Input.Password,
    propsTransformer: (props) => ({
      ...props,
    }),
  },

  textarea: {
    component: TextArea,
    propsTransformer: (props) => ({
      placeholder: props.placeholder,
      value: props.value,
      rows: props.rows || 4,
      disabled: props.disabled,
      onChange: props.onChange,
    }),
  },

  // Layout components
  card: {
    component: Card,
    propsTransformer: (props) => ({
      title: props.title,
      extra: props.extra,
      bordered: props.bordered !== false,
      hoverable: props.hoverable,
      children: props.children,
    }),
  },

  box: {
    component: Box,
    propsTransformer: (props) => ({
      padding: props.padding,
      margin: props.margin,
      children: props.children,
    }),
  },

  space: {
    component: Space,
    propsTransformer: (props) => ({
      direction: props.direction || 'horizontal',
      size: props.size || 'small',
      align: props.align,
      wrap: props.wrap,
      children: props.children,
    }),
  },

  grid: {
    component: Grid,
    propsTransformer: (props) => ({
      ...props,
    }),
  },

  divider: {
    component: Divider,
    propsTransformer: (props) => ({
      orientation: props.orientation,
      type: props.type || 'horizontal',
      children: props.children,
    }),
  },

  // Form components
  form: {
    component: Form,
    propsTransformer: (props, context) => ({
      layout: props.layout || 'vertical',
      // onFinish: props.onSubmit || props.onFinish,
      initialValues: props.initialValues,
      children: props.children,
      onFinish: (values: Record<string, unknown>) => {
        context?.onUpdate?.({
          data: values,
        });
      },
    }),
  },

  'form-field': {
    component: Form.Field,
    propsTransformer: (props) => ({
      ...props,
    }),
  },

  checkbox: {
    component: Checkbox,
    propsTransformer: (props) => ({
      checked: props.checked,
      defaultChecked: props.defaultChecked,
      disabled: props.disabled,
      onChange: props.onChange,
      children: props.label || props.children,
    }),
  },

  radio: {
    component: Radio,
    propsTransformer: (props) => ({
      checked: props.checked,
      value: props.value,
      disabled: props.disabled,
      onChange: props.onChange,
      children: props.label || props.children,
    }),
  },

  'radio-group': {
    component: Radio.Group,
    propsTransformer: (props) => ({
      value: props.value,
      defaultValue: props.defaultValue,
      options: props.options,
      onChange: props.onChange,
      children: props.children,
    }),
  },

  select: {
    component: Select,
    propsTransformer: (props) => ({
      value: props.value,
      defaultValue: props.defaultValue,
      options: props.options,
      placeholder: props.placeholder,
      disabled: props.disabled,
      onChange: props.onChange,
      children: props.children,
    }),
  },

  switch: {
    component: Switch,
    propsTransformer: (props) => ({
      checked: props.checked,
      defaultChecked: props.defaultChecked,
      disabled: props.disabled,
      onChange: props.onChange,
    }),
  },

  slider: {
    component: Slider,
    propsTransformer: (props) => ({
      value: props.value,
      defaultValue: props.defaultValue,
      min: props.min || 0,
      max: props.max || 100,
      step: props.step || 1,
      disabled: props.disabled,
      onChange: props.onChange,
    }),
  },

  'date-picker': {
    component: DatePicker,
    propsTransformer: (props) => ({
      value: props.value,
      defaultValue: props.defaultValue,
      format: props.format,
      disabled: props.disabled,
      onChange: props.onChange,
    }),
  },

  'range-picker': {
    component: RangePicker,
    propsTransformer: (props) => ({
      value: props.value,
      defaultValue: props.defaultValue,
      format: props.format,
      disabled: props.disabled,
      onChange: props.onChange,
    }),
  },

  upload: {
    component: Upload,
    propsTransformer: (props) => ({
      action: props.action,
      accept: props.accept,
      multiple: props.multiple,
      disabled: props.disabled,
      onChange: props.onChange,
      children: props.children,
    }),
  },

  // Data display components
  table: {
    component: Table,
    propsTransformer: (props) => ({
      columns: props.columns,
      dataSource: props.dataSource || props.data,
      loading: props.loading,
      pagination: props.pagination,
      onChange: props.onChange,
    }),
  },

  list: {
    component: List,
    propsTransformer: (props) => ({
      dataSource: props.dataSource || props.data || props.items,
      renderItem: props.renderItem,
      loading: props.loading,
      children: props.children,
    }),
  },

  tabs: {
    component: Tabs,
    propsTransformer: (props) => ({
      activeKey: props.activeKey || props.activeTab,
      defaultActiveKey: props.defaultActiveKey,
      items: props.items || props.tabs,
      onChange: props.onChange,
      children: props.children,
    }),
  },

  collapse: {
    component: Collapse,
    propsTransformer: (props) => ({
      activeKey: props.activeKey,
      defaultActiveKey: props.defaultActiveKey,
      items: props.items,
      onChange: props.onChange,
      children: props.children,
    }),
  },

  // Feedback components
  alert: {
    component: Alert,
    propsTransformer: (props) => ({
      ...props,
    }),
  },

  progress: {
    component: Progress,
    propsTransformer: (props) => ({
      percent: props.percent || props.value || 0,
      type: props.type || 'line',
      status: props.status,
      showInfo: props.showInfo !== false,
    }),
  },

  spin: {
    component: Spin,
    propsTransformer: (props) => ({
      spinning: props.spinning !== false,
      size: props.size || 'default',
      tip: props.tip || props.message,
      children: props.children,
    }),
  },

  // Other components
  tag: {
    component: Tag,
    propsTransformer: (props) => ({
      color: props.color,
      closable: props.closable,
      onClose: props.onClose,
      children: props.label || props.text || props.children,
    }),
  },

  badge: {
    component: Badge,
    propsTransformer: (props) => ({
      count: props.count,
      dot: props.dot,
      color: props.color,
      children: props.children,
    }),
  },

  avatar: {
    component: Avatar,
    propsTransformer: (props) => ({
      src: props.src || props.image,
      alt: props.alt,
      size: props.size || 'default',
      children: props.children || props.text,
    }),
  },

  tooltip: {
    component: Tooltip,
    propsTransformer: (props) => ({
      title: props.title || props.content,
      placement: props.placement,
      children: props.children,
    }),
  },

  dropdown: {
    component: Dropdown,
    propsTransformer: (props) => ({
      menu: props.menu || props.items,
      placement: props.placement,
      trigger: props.trigger,
      children: props.children,
    }),
  },

  breadcrumb: {
    component: Breadcrumb,
    propsTransformer: (props) => ({
      items: props.items,
      separator: props.separator,
      children: props.children,
    }),
  },

  pagination: {
    component: Pagination,
    propsTransformer: (props) => ({
      current: props.current || props.page,
      total: props.total,
      pageSize: props.pageSize || props.perPage,
      onChange: props.onChange,
    }),
  },

  rate: {
    component: Rate,
    propsTransformer: (props) => ({
      value: props.value,
      defaultValue: props.defaultValue,
      count: props.count || 5,
      disabled: props.disabled,
      onChange: props.onChange,
    }),
  },

  timeline: {
    component: Timeline,
    propsTransformer: (props) => ({
      items: props.items,
      mode: props.mode,
      children: props.children,
    }),
  },

  tree: {
    component: Tree,
    propsTransformer: (props) => ({
      treeData: props.treeData || props.data,
      defaultExpandAll: props.defaultExpandAll,
      onSelect: props.onSelect,
      children: props.children,
    }),
  },

  cascader: {
    component: Cascader,
    propsTransformer: (props) => ({
      options: props.options,
      value: props.value,
      onChange: props.onChange,
      placeholder: props.placeholder,
    }),
  },

  drawer: {
    component: Drawer,
    propsTransformer: (props) => ({
      open: props.open || props.visible,
      title: props.title,
      placement: props.placement || 'right',
      onClose: props.onClose,
      children: props.children,
    }),
  },

  // Text components
  label: {
    component: Label,
    propsTransformer: (props) => ({
      children: props.text || props.label || props.children,
    }),
  },

  // Generic container
  container: {
    component: Box,
    propsTransformer: (props) => props,
  },
};
