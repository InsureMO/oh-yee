import { Bot, Globe, Sparkles, Wrench } from 'lucide-react';
import React from 'react';
import {
  NumberField,
  SelectField,
  TextAreaField,
  TextField,
} from '../fields';
import type { WorkflowNodeData, WorkflowNodeTypeDef } from '../interface';
import { renderRawForm } from './io';
import { ListEditor } from './list-editor';

/* ---------------------------------- llm ---------------------------------- */

export interface LLMPromptMessage {
  id: string;
  role: 'system' | 'user' | 'assistant';
  text: string;
}

export interface LLMNodeData extends WorkflowNodeData {
  type: 'llm';
  model: {
    provider: string;
    name: string;
    mode: string;
    completion_params?: { temperature?: number; [key: string]: unknown };
  };
  prompt_template: LLMPromptMessage[];
  context?: { enabled: boolean; variable_selector: string[] };
  vision?: { enabled: boolean };
  variables?: unknown[];
}

const randomId = () => Math.random().toString(36).slice(2, 10);

export const llmNode: WorkflowNodeTypeDef<LLMNodeData> = {
  title: 'LLM',
  category: 'AI',
  color: '#777af2',
  icon: <Sparkles size={14} />,
  defaultData: () => ({
    model: {
      provider: '',
      name: '',
      mode: 'chat',
      completion_params: { temperature: 0.7 },
    },
    prompt_template: [{ id: randomId(), role: 'user', text: '' }],
    context: { enabled: false, variable_selector: [] },
    vision: { enabled: false },
    variables: [],
  }),
  outputs: ['text', 'usage'],
  renderSummary: ({ data }) => (
    <>
      <div className="yee-workflow-node-tag">
        {data.model?.name || <span className="yee-workflow-node-hint">未选择模型</span>}
      </div>
      {data.prompt_template?.[0]?.text ? (
        <div className="yee-workflow-node-code">{data.prompt_template[0].text}</div>
      ) : null}
    </>
  ),
  validate: (data) => {
    const problems: string[] = [];
    if (!data.model?.name) problems.push('未选择模型');
    if (!data.prompt_template?.some((message) => message.text?.trim()))
      problems.push('提示词为空');
    return problems;
  },
  renderForm: ({ data, onChange, variables, disabled }) => (
    <>
      <TextField
        label="模型供应商"
        value={data.model?.provider}
        placeholder="如 openai / deepseek"
        disabled={disabled}
        onChange={(provider) => onChange({ model: { ...data.model, provider } })}
      />
      <TextField
        label="模型名称"
        value={data.model?.name}
        placeholder="如 gpt-4o-mini"
        disabled={disabled}
        onChange={(name) => onChange({ model: { ...data.model, name } })}
      />
      <NumberField
        label="Temperature"
        value={data.model?.completion_params?.temperature}
        min={0}
        max={2}
        step={0.1}
        disabled={disabled}
        onChange={(temperature) =>
          onChange({
            model: {
              ...data.model,
              completion_params: {
                ...data.model?.completion_params,
                temperature: temperature ?? undefined,
              },
            },
          })
        }
      />
      <ListEditor<LLMPromptMessage>
        label="提示词"
        items={data.prompt_template ?? []}
        disabled={disabled}
        addText="添加消息"
        emptyText="没有提示词"
        create={() => ({ id: randomId(), role: 'user', text: '' })}
        onChange={(prompt_template) => onChange({ prompt_template })}
        renderItem={(item, update) => (
          <>
            <SelectField
              label="角色"
              value={item.role}
              options={[
                { label: 'system', value: 'system' },
                { label: 'user', value: 'user' },
                { label: 'assistant', value: 'assistant' },
              ]}
              disabled={disabled}
              onChange={(role) => update({ role: role as LLMPromptMessage['role'] })}
            />
            <TextAreaField
              label="内容"
              value={item.text}
              rows={5}
              variables={variables}
              disabled={disabled}
              onChange={(text) => update({ text })}
            />
          </>
        )}
      />
    </>
  ),
};

/* ------------------------------ http request ------------------------------ */

export interface HttpNodeData extends WorkflowNodeData {
  type: 'http-request';
  method: string;
  url: string;
  headers?: string;
  params?: string;
  body?: { type: string; data?: unknown };
  authorization?: { type: string; config?: unknown };
  timeout?: {
    max_connect_timeout?: number;
    max_read_timeout?: number;
    max_write_timeout?: number;
  };
  variables?: unknown[];
}

export const httpNode: WorkflowNodeTypeDef<HttpNodeData> = {
  title: 'HTTP 请求',
  category: '工具',
  color: '#f58220',
  icon: <Globe size={14} />,
  defaultData: () => ({
    method: 'get',
    url: '',
    headers: '',
    params: '',
    body: { type: 'none', data: [] },
    authorization: { type: 'no-auth', config: null },
    timeout: {
      max_connect_timeout: 10,
      max_read_timeout: 30,
      max_write_timeout: 30,
    },
    variables: [],
  }),
  outputs: ['body', 'status_code', 'headers', 'files'],
  renderSummary: ({ data }) => (
    <div className="yee-workflow-node-code">
      <b>{String(data.method ?? 'get').toUpperCase()}</b>{' '}
      {data.url || <span className="yee-workflow-node-hint">未配置 URL</span>}
    </div>
  ),
  validate: (data) => (data.url ? [] : ['未配置请求地址']),
  renderForm: ({ data, onChange, variables, disabled }) => (
    <>
      <SelectField
        label="方法"
        value={data.method ?? 'get'}
        options={['get', 'post', 'put', 'patch', 'delete', 'head'].map((method) => ({
          label: method.toUpperCase(),
          value: method,
        }))}
        disabled={disabled}
        onChange={(method) => onChange({ method })}
      />
      <TextAreaField
        label="URL"
        value={data.url}
        rows={2}
        variables={variables}
        disabled={disabled}
        placeholder="https://example.com/api?q={{#nodeId.field#}}"
        onChange={(url) => onChange({ url })}
      />
      <TextAreaField
        label="请求头"
        value={data.headers}
        rows={3}
        hint="每行一个 key: value"
        disabled={disabled}
        onChange={(headers) => onChange({ headers })}
      />
      <TextAreaField
        label="Query 参数"
        value={data.params}
        rows={3}
        hint="每行一个 key: value"
        disabled={disabled}
        onChange={(params) => onChange({ params })}
      />
    </>
  ),
};

/* ------------------------------- tool / agent ------------------------------ */

export interface ToolNodeData extends WorkflowNodeData {
  type: 'tool';
  provider_id?: string;
  provider_type?: string;
  provider_name?: string;
  tool_name?: string;
  tool_label?: string;
  tool_parameters?: Record<string, unknown>;
  tool_configurations?: Record<string, unknown>;
}

export const toolNode: WorkflowNodeTypeDef<ToolNodeData> = {
  title: '工具',
  category: '工具',
  color: '#31708f',
  icon: <Wrench size={14} />,
  // Provider specific parameter schemas live in Dify; creating one here would
  // produce an unusable node, so it is render-only.
  creatable: false,
  outputs: ['text', 'files', 'json'],
  renderSummary: ({ data }) => (
    <div className="yee-workflow-node-code">
      {data.tool_label || data.tool_name || (
        <span className="yee-workflow-node-hint">未指定工具</span>
      )}
    </div>
  ),
  renderForm: ({ data }) => renderRawForm(data),
};

export interface AgentNodeData extends WorkflowNodeData {
  type: 'agent';
  agent_strategy_name?: string;
  agent_strategy_label?: string;
  agent_parameters?: Record<string, unknown>;
}

export const agentNode: WorkflowNodeTypeDef<AgentNodeData> = {
  title: 'Agent',
  category: 'AI',
  color: '#8b5cf6',
  icon: <Bot size={14} />,
  creatable: false,
  outputs: ['text', 'files', 'json'],
  renderSummary: ({ data }) => (
    <div className="yee-workflow-node-code">
      {data.agent_strategy_label || data.agent_strategy_name || (
        <span className="yee-workflow-node-hint">未配置策略</span>
      )}
    </div>
  ),
  renderForm: ({ data }) => renderRawForm(data),
};

/* --------------------------- variable aggregator -------------------------- */

export interface VariableAggregatorData extends WorkflowNodeData {
  type: 'variable-aggregator';
  output_type?: string;
  variables?: string[][];
}

export const variableAggregatorNode: WorkflowNodeTypeDef<VariableAggregatorData> = {
  title: '变量聚合',
  category: '逻辑',
  color: '#696969',
  creatable: false,
  outputs: ['output'],
  renderSummary: ({ data }) => (
    <div className="yee-workflow-node-code">
      {(data.variables ?? []).map((selector) => selector.join('.')).join(' | ') || (
        <span className="yee-workflow-node-hint">未配置来源</span>
      )}
    </div>
  ),
  renderForm: ({ data }) => renderRawForm(data),
};
