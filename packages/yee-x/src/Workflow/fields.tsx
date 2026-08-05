import {
  Button,
  Dropdown,
  Input,
  InputNumber,
  Select,
  TextArea,
} from '@rainbow-oh/yee-c';
import { Braces } from 'lucide-react';
import React from 'react';
import { DEFAULT_LOCALE, WorkflowContext } from './context';
import type { WorkflowUpstreamVariable } from './interface';

const PREFIX = 'yee-workflow-field';

export interface FieldProps {
  label: React.ReactNode;
  extra?: React.ReactNode;
  hint?: React.ReactNode;
  children: React.ReactNode;
}

export const Field = ({ label, extra, hint, children }: FieldProps) => (
  <div className={PREFIX}>
    <div className={`${PREFIX}-label`}>
      <span>{label}</span>
      {extra ? <span className={`${PREFIX}-extra`}>{extra}</span> : null}
    </div>
    <div className={`${PREFIX}-control`}>{children}</div>
    {hint ? <div className={`${PREFIX}-hint`}>{hint}</div> : null}
  </div>
);

export interface VariablePickerProps {
  variables: WorkflowUpstreamVariable[];
  /**
   * Receives the Dify placeholder, e.g. `{{#1000002.text#}}`
   */
  onPick: (template: string, variable: WorkflowUpstreamVariable) => void;
  disabled?: boolean;
  label?: string;
  emptyText?: string;
}

/**
 * Lists the variables exposed by upstream nodes, grouped by node.
 * Only direct fields are offered -- no nested path drilling.
 */
export const VariablePicker = ({
  variables,
  onPick,
  disabled,
  label,
  emptyText,
}: VariablePickerProps) => {
  const locale = React.useContext(WorkflowContext)?.locale ?? DEFAULT_LOCALE;
  const resolvedLabel = label ?? locale.insertVariable;
  const resolvedEmpty = emptyText ?? locale.noVariable;

  const groups = React.useMemo(() => {
    const map = new Map<string, WorkflowUpstreamVariable[]>();
    variables.forEach((variable) => {
      const key = `${variable.nodeId}|${variable.nodeTitle}`;
      const list = map.get(key) ?? [];
      list.push(variable);
      map.set(key, list);
    });
    return Array.from(map.entries());
  }, [variables]);

  const items = groups.length
    ? groups.map(([key, list]) => ({
        type: 'group' as const,
        label: key.split('|')[1] || key.split('|')[0],
        children: list.map((variable) => ({
          key: variable.template,
          label: variable.label || variable.field,
          title: variable.template,
        })),
      }))
    : [{ key: '__empty__', label: resolvedEmpty, disabled: true }];

  return (
    <Dropdown
      placement="bottomRight"
      menu={{
        items,
        onClick: ({ key }) => {
          const variable = variables.find((item) => item.template === key);
          if (variable) onPick(variable.template, variable);
        },
      }}
    >
      <Button size="small" type="text" disabled={disabled}>
        <Braces size={12} /> {resolvedLabel}
      </Button>
    </Dropdown>
  );
};

export interface TextFieldProps {
  label: React.ReactNode;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  hint?: React.ReactNode;
  onChange: (value: string) => void;
}

export const TextField = ({
  label,
  value,
  placeholder,
  disabled,
  hint,
  onChange,
}: TextFieldProps) => (
  <Field label={label} hint={hint}>
    <Input
      size="small"
      value={value ?? ''}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
    />
  </Field>
);

export interface TextAreaFieldProps extends TextFieldProps {
  /**
   * Enables the variable picker in the field header
   */
  variables?: WorkflowUpstreamVariable[];
  rows?: number;
}

export const TextAreaField = ({
  label,
  value,
  placeholder,
  disabled,
  hint,
  variables,
  rows = 4,
  onChange,
}: TextAreaFieldProps) => (
  <Field
    label={label}
    hint={hint}
    extra={
      variables ? (
        <VariablePicker
          variables={variables}
          disabled={disabled}
          onPick={(template) => onChange(`${value ?? ''}${template}`)}
        />
      ) : null
    }
  >
    <TextArea
      value={value ?? ''}
      rows={rows}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
    />
  </Field>
);

export interface SelectFieldProps {
  label: React.ReactNode;
  value?: string;
  options: Array<{ label: string; value: string }>;
  disabled?: boolean;
  hint?: React.ReactNode;
  onChange: (value: string) => void;
}

export const SelectField = ({
  label,
  value,
  options,
  disabled,
  hint,
  onChange,
}: SelectFieldProps) => (
  <Field label={label} hint={hint}>
    <Select
      size="small"
      value={value}
      options={options}
      disabled={disabled}
      allowClear={false}
      searchable={false}
      onChange={(next) => onChange(String(next))}
    />
  </Field>
);

export interface NumberFieldProps {
  label: React.ReactNode;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  hint?: React.ReactNode;
  onChange: (value: number | null) => void;
}

export const NumberField = ({
  label,
  value,
  min,
  max,
  step,
  disabled,
  hint,
  onChange,
}: NumberFieldProps) => (
  <Field label={label} hint={hint}>
    <InputNumber
      size="small"
      value={value ?? null}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      onChange={onChange}
    />
  </Field>
);

export interface SelectorFieldProps {
  label: React.ReactNode;
  value?: string[];
  variables: WorkflowUpstreamVariable[];
  disabled?: boolean;
  hint?: React.ReactNode;
  onChange: (selector: string[]) => void;
}

/**
 * Picks an upstream variable and stores it as a Dify `value_selector`
 * (`['nodeId', 'field']`).
 */
export const SelectorField = ({
  label,
  value,
  variables,
  disabled,
  hint,
  onChange,
}: SelectorFieldProps) => {
  const locale = React.useContext(WorkflowContext)?.locale ?? DEFAULT_LOCALE;
  return (
    <Field label={label} hint={hint}>
      <Select
        size="small"
        value={value?.length ? value.join('.') : undefined}
        placeholder={locale.selectUpstreamVariable}
        disabled={disabled}
        allowClear={false}
        options={variables.map((variable) => ({
          label: `${variable.nodeTitle} / ${variable.label || variable.field}`,
          value: variable.selector.join('.'),
        }))}
        onChange={(next) => onChange(String(next).split('.'))}
      />
    </Field>
  );
};
