import { MessageSquare, Play, Square } from 'lucide-react';
import React from 'react';
import {
  Field,
  SelectField,
  SelectorField,
  TextAreaField,
  TextField,
} from '../fields';
import type {
  WorkflowNodeData,
  WorkflowNodeTypeDef,
  WorkflowVariableSelector,
} from '../interface';
import { ListEditor } from './list-editor';

/* ------------------------------- start node ------------------------------- */

export type StartVariableType =
  | 'text-input'
  | 'paragraph'
  | 'number'
  | 'select'
  | 'file'
  | 'file-list';

export interface StartNodeVariable {
  variable: string;
  label: string;
  type: StartVariableType;
  required?: boolean;
  max_length?: number;
  options?: string[];
}

export interface StartNodeData extends WorkflowNodeData {
  type: 'start';
  variables: StartNodeVariable[];
}

const VARIABLE_TYPE_OPTIONS = [
  { label: '短文本', value: 'text-input' },
  { label: '段落', value: 'paragraph' },
  { label: '数字', value: 'number' },
  { label: '下拉选项', value: 'select' },
  { label: '单文件', value: 'file' },
  { label: '多文件', value: 'file-list' },
];

export const startNode: WorkflowNodeTypeDef<StartNodeData> = {
  title: '开始',
  category: '基础',
  color: '#2eb872',
  icon: <Play size={14} />,
  unique: true,
  target: false,
  defaultData: () => ({ variables: [] }),
  // Start node fields are declared by the user, so `variables.ts` reads them
  // straight off `data.variables` instead of this static list.
  outputs: [],
  renderSummary: ({ data }) => {
    const variables = data.variables ?? [];
    if (!variables.length) return <span className="yee-workflow-node-hint">无输入变量</span>;
    return (
      <ul className="yee-workflow-node-list">
        {variables.slice(0, 4).map((variable) => (
          <li key={variable.variable}>
            {variable.label || variable.variable}
            {variable.required ? <em> *</em> : null}
          </li>
        ))}
        {variables.length > 4 ? <li>…</li> : null}
      </ul>
    );
  },
  validate: (data) => {
    const problems: string[] = [];
    (data.variables ?? []).forEach((variable, index) => {
      if (!variable.variable) problems.push(`第 ${index + 1} 个输入变量缺少变量名`);
    });
    return problems;
  },
  renderForm: ({ data, onChange, disabled }) => (
    <ListEditor<StartNodeVariable>
      label="输入变量"
      items={data.variables ?? []}
      disabled={disabled}
      addText="添加变量"
      emptyText="没有输入变量"
      create={() => ({ variable: '', label: '', type: 'text-input', required: false })}
      onChange={(variables) => onChange({ variables })}
      renderItem={(item, update) => (
        <>
          <TextField
            label="变量名"
            value={item.variable}
            placeholder="英文标识，如 city"
            disabled={disabled}
            onChange={(variable) => update({ variable })}
          />
          <TextField
            label="显示名"
            value={item.label}
            disabled={disabled}
            onChange={(label) => update({ label })}
          />
          <SelectField
            label="类型"
            value={item.type}
            options={VARIABLE_TYPE_OPTIONS}
            disabled={disabled}
            onChange={(type) => update({ type: type as StartVariableType })}
          />
        </>
      )}
    />
  ),
};

/* -------------------------------- end node -------------------------------- */

export interface EndNodeOutput {
  variable: string;
  value_selector: WorkflowVariableSelector;
}

export interface EndNodeData extends WorkflowNodeData {
  type: 'end';
  outputs: EndNodeOutput[];
}

export const endNode: WorkflowNodeTypeDef<EndNodeData> = {
  title: '结束',
  category: '基础',
  color: '#f2545b',
  icon: <Square size={14} />,
  defaultData: () => ({ outputs: [] }),
  sourceHandles: () => [],
  outputs: [],
  renderSummary: ({ data }) => {
    const outputs = data.outputs ?? [];
    if (!outputs.length) return <span className="yee-workflow-node-hint">无输出</span>;
    return (
      <ul className="yee-workflow-node-list">
        {outputs.slice(0, 4).map((output) => (
          <li key={output.variable}>
            {output.variable}
            <em> = {output.value_selector?.join('.')}</em>
          </li>
        ))}
      </ul>
    );
  },
  validate: (data) => {
    const problems: string[] = [];
    (data.outputs ?? []).forEach((output, index) => {
      if (!output.variable) problems.push(`第 ${index + 1} 个输出缺少变量名`);
      if (!output.value_selector?.length)
        problems.push(`输出 ${output.variable || index + 1} 未选择来源变量`);
    });
    return problems;
  },
  renderForm: ({ data, onChange, variables, disabled }) => (
    <ListEditor<EndNodeOutput>
      label="输出变量"
      items={data.outputs ?? []}
      disabled={disabled}
      addText="添加输出"
      emptyText="没有输出"
      create={() => ({ variable: '', value_selector: [] })}
      onChange={(outputs) => onChange({ outputs })}
      renderItem={(item, update) => (
        <>
          <TextField
            label="输出名"
            value={item.variable}
            disabled={disabled}
            onChange={(variable) => update({ variable })}
          />
          <SelectorField
            label="来源"
            value={item.value_selector}
            variables={variables}
            disabled={disabled}
            onChange={(value_selector) => update({ value_selector })}
          />
        </>
      )}
    />
  ),
};

/* ------------------------------- answer node ------------------------------ */

export interface AnswerNodeData extends WorkflowNodeData {
  type: 'answer';
  answer: string;
  variables?: unknown[];
}

export const answerNode: WorkflowNodeTypeDef<AnswerNodeData> = {
  title: '直接回复',
  category: '基础',
  color: '#777af2',
  icon: <MessageSquare size={14} />,
  defaultData: () => ({ answer: '', variables: [] }),
  outputs: [],
  renderSummary: ({ data }) =>
    data.answer ? (
      <div className="yee-workflow-node-code">{data.answer}</div>
    ) : (
      <span className="yee-workflow-node-hint">未配置回复内容</span>
    ),
  validate: (data) => (data.answer ? [] : ['回复内容为空']),
  renderForm: ({ data, onChange, variables, disabled }) => (
    <TextAreaField
      label="回复内容"
      value={data.answer}
      variables={variables}
      disabled={disabled}
      placeholder="支持 {{#节点ID.字段#}} 变量占位"
      onChange={(answer) => onChange({ answer })}
    />
  ),
};

/* -------------------------- read-only fallback form ----------------------- */

/**
 * Shown for node types whose configuration is too provider-specific to edit
 * here (tool / agent). The DSL is preserved untouched.
 */
export const renderRawForm = (data: WorkflowNodeData) => (
  <Field label="原始配置" hint="该节点类型暂不支持在此编辑，保存时原样保留">
    <pre className="yee-workflow-raw">{JSON.stringify(data, null, 2)}</pre>
  </Field>
);
