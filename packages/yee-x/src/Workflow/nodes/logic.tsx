import { Braces, Code2, GitBranch } from 'lucide-react';
import React from 'react';
import {
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

/* ------------------------------ if-else node ------------------------------ */

export interface ConditionItem {
  id: string;
  comparison_operator: string;
  value?: string;
  varType?: string;
  variable_selector: WorkflowVariableSelector;
}

export interface ConditionCase {
  case_id: string;
  id: string;
  logical_operator: 'and' | 'or';
  conditions: ConditionItem[];
}

export interface IfElseNodeData extends WorkflowNodeData {
  type: 'if-else';
  cases: ConditionCase[];
  /**
   * Legacy single-case fields, kept for compatibility with older DSL versions
   */
  conditions?: ConditionItem[];
  logical_operator?: 'and' | 'or';
}

const OPERATOR_OPTIONS = [
  { label: '等于', value: 'is' },
  { label: '不等于', value: 'is not' },
  { label: '包含', value: 'contains' },
  { label: '不包含', value: 'not contains' },
  { label: '开头是', value: 'start with' },
  { label: '结尾是', value: 'end with' },
  { label: '为空', value: 'empty' },
  { label: '不为空', value: 'not empty' },
  { label: '大于', value: '>' },
  { label: '小于', value: '<' },
];

const VALUE_LESS_OPERATORS = ['empty', 'not empty', 'null', 'not null'];

const randomId = () => Math.random().toString(36).slice(2, 10);

export const ifElseNode: WorkflowNodeTypeDef<IfElseNodeData> = {
  title: '条件分支',
  category: '逻辑',
  color: '#ffb900',
  icon: <GitBranch size={14} />,
  defaultData: () => ({
    cases: [
      {
        case_id: 'true',
        id: 'true',
        logical_operator: 'and',
        conditions: [],
      },
    ],
  }),
  outputs: [],
  // Dify emits one handle per case plus a trailing ELSE handle.
  sourceHandles: (data) => {
    const cases = data.cases?.length
      ? data.cases
      : [{ case_id: 'true', id: 'true' } as ConditionCase];
    return [
      ...cases.map((item, index) => ({
        id: item.case_id || item.id,
        label: index === 0 ? 'IF' : `ELIF ${index}`,
      })),
      { id: 'false', label: 'ELSE' },
    ];
  },
  renderSummary: ({ data }) => {
    const conditions = data.cases?.[0]?.conditions ?? data.conditions ?? [];
    if (!conditions.length)
      return <span className="yee-workflow-node-hint">未配置条件</span>;
    return (
      <ul className="yee-workflow-node-list">
        {conditions.slice(0, 3).map((condition) => (
          <li key={condition.id}>
            {condition.variable_selector?.join('.')} {condition.comparison_operator}{' '}
            {condition.value}
          </li>
        ))}
      </ul>
    );
  },
  validate: (data) => {
    const cases = data.cases ?? [];
    if (!cases.length) return ['缺少条件分支'];
    const problems: string[] = [];
    cases.forEach((item, caseIndex) => {
      if (!item.conditions?.length) {
        problems.push(`第 ${caseIndex + 1} 个分支没有条件`);
        return;
      }
      item.conditions.forEach((condition, index) => {
        if (!condition.variable_selector?.length)
          problems.push(`第 ${caseIndex + 1} 个分支的条件 ${index + 1} 未选择变量`);
        if (
          !VALUE_LESS_OPERATORS.includes(condition.comparison_operator) &&
          !condition.value
        )
          problems.push(`第 ${caseIndex + 1} 个分支的条件 ${index + 1} 缺少比较值`);
      });
    });
    return problems;
  },
  renderForm: ({ data, onChange, variables, disabled }) => {
    const cases = data.cases?.length
      ? data.cases
      : [{ case_id: 'true', id: 'true', logical_operator: 'and' as const, conditions: [] }];
    const first = cases[0];

    const updateFirstCase = (conditions: ConditionItem[]) => {
      onChange({
        cases: cases.map((item, index) =>
          index === 0 ? { ...item, conditions } : item,
        ),
        // Mirror onto the legacy fields so older Dify importers keep working.
        conditions,
        logical_operator: first.logical_operator ?? 'and',
      });
    };

    return (
      <>
        <SelectField
          label="条件之间的关系"
          value={first.logical_operator ?? 'and'}
          options={[
            { label: '并且 (AND)', value: 'and' },
            { label: '或者 (OR)', value: 'or' },
          ]}
          disabled={disabled}
          onChange={(operator) =>
            onChange({
              cases: cases.map((item, index) =>
                index === 0
                  ? { ...item, logical_operator: operator as 'and' | 'or' }
                  : item,
              ),
              logical_operator: operator as 'and' | 'or',
            })
          }
        />
        <ListEditor<ConditionItem>
          label="IF 条件"
          items={first.conditions ?? []}
          disabled={disabled}
          addText="添加条件"
          emptyText="没有条件"
          create={() => ({
            id: randomId(),
            comparison_operator: 'contains',
            value: '',
            varType: 'string',
            variable_selector: [],
          })}
          onChange={updateFirstCase}
          renderItem={(item, update) => (
            <>
              <SelectorField
                label="变量"
                value={item.variable_selector}
                variables={variables}
                disabled={disabled}
                onChange={(variable_selector) => update({ variable_selector })}
              />
              <SelectField
                label="比较"
                value={item.comparison_operator}
                options={OPERATOR_OPTIONS}
                disabled={disabled}
                onChange={(comparison_operator) => update({ comparison_operator })}
              />
              {!VALUE_LESS_OPERATORS.includes(item.comparison_operator) && (
                <TextField
                  label="值"
                  value={item.value}
                  disabled={disabled}
                  onChange={(value) => update({ value })}
                />
              )}
            </>
          )}
        />
      </>
    );
  },
};

/* --------------------------------- code ---------------------------------- */

export interface CodeNodeVariable {
  variable: string;
  value_selector: WorkflowVariableSelector;
}

export interface CodeNodeData extends WorkflowNodeData {
  type: 'code';
  code_language: 'python3' | 'javascript';
  code: string;
  variables: CodeNodeVariable[];
  outputs: Record<string, { type: string; children?: unknown }>;
}

const DEFAULT_PYTHON = `def main(arg1: str) -> dict:
    return {"output": arg1}
`;

export const codeNode: WorkflowNodeTypeDef<CodeNodeData> = {
  title: '代码执行',
  category: '逻辑',
  color: '#31708f',
  icon: <Code2 size={14} />,
  defaultData: () => ({
    code_language: 'python3',
    code: DEFAULT_PYTHON,
    variables: [],
    outputs: { output: { type: 'string', children: null } },
  }),
  outputs: (data) => Object.keys(data.outputs ?? {}),
  renderSummary: ({ data }) => (
    <div className="yee-workflow-node-code">
      {data.code_language ?? 'python3'}
      {data.variables?.length ? ` · ${data.variables.length} 个入参` : ''}
    </div>
  ),
  validate: (data) => (data.code?.trim() ? [] : ['代码为空']),
  renderForm: ({ data, onChange, variables, disabled }) => (
    <>
      <SelectField
        label="语言"
        value={data.code_language ?? 'python3'}
        options={[
          { label: 'Python 3', value: 'python3' },
          { label: 'JavaScript', value: 'javascript' },
        ]}
        disabled={disabled}
        onChange={(code_language) =>
          onChange({ code_language: code_language as CodeNodeData['code_language'] })
        }
      />
      <ListEditor<CodeNodeVariable>
        label="入参"
        items={data.variables ?? []}
        disabled={disabled}
        addText="添加入参"
        emptyText="没有入参"
        create={() => ({ variable: '', value_selector: [] })}
        onChange={(next) => onChange({ variables: next })}
        renderItem={(item, update) => (
          <>
            <TextField
              label="参数名"
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
      <TextAreaField
        label="代码"
        value={data.code}
        rows={10}
        disabled={disabled}
        onChange={(code) => onChange({ code })}
      />
      <TextField
        label="输出字段"
        value={Object.keys(data.outputs ?? {}).join(',')}
        hint="逗号分隔，供下游节点引用"
        disabled={disabled}
        onChange={(value) =>
          onChange({
            outputs: value
              .split(',')
              .map((key) => key.trim())
              .filter(Boolean)
              .reduce<CodeNodeData['outputs']>(
                (acc, key) => ({
                  ...acc,
                  [key]: data.outputs?.[key] ?? { type: 'string', children: null },
                }),
                {},
              ),
          })
        }
      />
    </>
  ),
};

/* --------------------------- template transform --------------------------- */

export interface TemplateNodeData extends WorkflowNodeData {
  type: 'template-transform';
  template: string;
  variables: CodeNodeVariable[];
}

export const templateNode: WorkflowNodeTypeDef<TemplateNodeData> = {
  title: '模板转换',
  category: '逻辑',
  color: '#00bda5',
  icon: <Braces size={14} />,
  defaultData: () => ({ template: '', variables: [] }),
  outputs: ['output'],
  renderSummary: ({ data }) =>
    data.template ? (
      <div className="yee-workflow-node-code">{data.template}</div>
    ) : (
      <span className="yee-workflow-node-hint">未配置模板</span>
    ),
  validate: (data) => (data.template ? [] : ['模板内容为空']),
  renderForm: ({ data, onChange, variables, disabled }) => (
    <>
      <ListEditor<CodeNodeVariable>
        label="模板变量"
        items={data.variables ?? []}
        disabled={disabled}
        addText="添加变量"
        emptyText="没有变量"
        create={() => ({ variable: '', value_selector: [] })}
        onChange={(next) => onChange({ variables: next })}
        renderItem={(item, update) => (
          <>
            <TextField
              label="变量名"
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
      <TextAreaField
        label="模板"
        value={data.template}
        rows={6}
        hint="Jinja2 语法，例如 {{ user_msg }}"
        disabled={disabled}
        onChange={(template) => onChange({ template })}
      />
    </>
  ),
};
