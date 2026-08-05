import type { WorkflowGraph } from '@rainbow-oh/yee-x';

/**
 * A Dify-shaped graph: 开始 -> HTTP 请求 -> 代码处理 -> LLM -> 结束
 * Copied from the same structure a Dify DSL export produces, so it can be
 * pasted into `workflow.graph` of a real `.yml` file.
 */
export const weatherGraph: WorkflowGraph = {
  nodes: [
    {
      id: '1000001',
      type: 'custom',
      position: { x: 30, y: 120 },
      width: 244,
      sourcePosition: 'right',
      targetPosition: 'left',
      data: {
        title: '开始',
        type: 'start',
        variables: [
          {
            label: '城市',
            variable: 'city',
            type: 'text-input',
            required: true,
            max_length: 48,
          },
        ],
      },
    },
    {
      id: '1000002',
      type: 'custom',
      position: { x: 334, y: 120 },
      width: 244,
      data: {
        title: '获取天气',
        type: 'http-request',
        method: 'get',
        url: 'https://wttr.in/{{#1000001.city#}}?format=j1',
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
      },
    },
    {
      id: '1000003',
      type: 'custom',
      position: { x: 638, y: 120 },
      width: 244,
      data: {
        title: '提取温度',
        type: 'code',
        code_language: 'python3',
        code: `def main(body: str) -> dict:
    import json
    current = json.loads(body).get("current_condition", [{}])[0]
    return {"summary": f"{current.get('temp_C')}C / {current.get('humidity')}%"}
`,
        variables: [{ variable: 'body', value_selector: ['1000002', 'body'] }],
        outputs: { summary: { type: 'string', children: null } },
      },
    },
    {
      id: '1000004',
      type: 'custom',
      position: { x: 942, y: 120 },
      width: 244,
      data: {
        title: '生成播报',
        type: 'llm',
        model: {
          provider: 'openai',
          name: 'gpt-4o-mini',
          mode: 'chat',
          completion_params: { temperature: 0.3 },
        },
        prompt_template: [
          {
            id: 'p-system',
            role: 'system',
            text: '你是气象播报员，用一句话播报天气。',
          },
          {
            id: 'p-user',
            role: 'user',
            text: '城市：{{#1000001.city#}}\n数据：{{#1000003.summary#}}',
          },
        ],
        context: { enabled: false, variable_selector: [] },
        vision: { enabled: false },
        variables: [],
      },
    },
    {
      id: '1000005',
      type: 'custom',
      position: { x: 1246, y: 120 },
      width: 244,
      data: {
        title: '结束',
        type: 'end',
        outputs: [{ variable: 'report', value_selector: ['1000004', 'text'] }],
      },
    },
  ],
  edges: [
    {
      id: '1000001-source-1000002-target',
      source: '1000001',
      target: '1000002',
      sourceHandle: 'source',
      targetHandle: 'target',
      type: 'custom',
      data: { sourceType: 'start', targetType: 'http-request', isInIteration: false },
    },
    {
      id: '1000002-source-1000003-target',
      source: '1000002',
      target: '1000003',
      sourceHandle: 'source',
      targetHandle: 'target',
      type: 'custom',
      data: { sourceType: 'http-request', targetType: 'code', isInIteration: false },
    },
    {
      id: '1000003-source-1000004-target',
      source: '1000003',
      target: '1000004',
      sourceHandle: 'source',
      targetHandle: 'target',
      type: 'custom',
      data: { sourceType: 'code', targetType: 'llm', isInIteration: false },
    },
    {
      id: '1000004-source-1000005-target',
      source: '1000004',
      target: '1000005',
      sourceHandle: 'source',
      targetHandle: 'target',
      type: 'custom',
      data: { sourceType: 'llm', targetType: 'end', isInIteration: false },
    },
  ],
};

/**
 * Shows the multi-port `if-else` node.
 */
export const branchGraph: WorkflowGraph = {
  nodes: [
    {
      id: '2000001',
      type: 'custom',
      position: { x: 30, y: 160 },
      width: 244,
      data: {
        title: '开始',
        type: 'start',
        variables: [
          { label: '内容', variable: 'content', type: 'paragraph', required: true },
        ],
      },
    },
    {
      id: '2000002',
      type: 'custom',
      position: { x: 334, y: 160 },
      width: 244,
      data: {
        title: '是否含代码',
        type: 'if-else',
        cases: [
          {
            case_id: 'true',
            id: 'true',
            logical_operator: 'and',
            conditions: [
              {
                id: 'cond-001',
                comparison_operator: 'contains',
                value: '```',
                varType: 'string',
                variable_selector: ['2000001', 'content'],
              },
            ],
          },
        ],
      },
    },
    {
      id: '2000003',
      type: 'custom',
      position: { x: 638, y: 40 },
      width: 244,
      data: {
        title: '代码分析',
        type: 'llm',
        model: {
          provider: 'deepseek',
          name: 'deepseek-chat',
          mode: 'chat',
          completion_params: { temperature: 0.3 },
        },
        prompt_template: [
          { id: 'p1', role: 'user', text: '分析以下代码：{{#2000001.content#}}' },
        ],
      },
    },
    {
      id: '2000004',
      type: 'custom',
      position: { x: 638, y: 280 },
      width: 244,
      data: {
        title: '文本分析',
        type: 'llm',
        model: {
          provider: 'deepseek',
          name: 'deepseek-chat',
          mode: 'chat',
          completion_params: { temperature: 0.7 },
        },
        prompt_template: [
          { id: 'p2', role: 'user', text: '分析以下文本：{{#2000001.content#}}' },
        ],
      },
    },
    {
      id: '2000005',
      type: 'custom',
      position: { x: 942, y: 160 },
      width: 244,
      data: {
        title: '结束',
        type: 'end',
        outputs: [{ variable: 'result', value_selector: ['2000003', 'text'] }],
      },
    },
  ],
  edges: [
    {
      id: '2000001-source-2000002-target',
      source: '2000001',
      target: '2000002',
      sourceHandle: 'source',
      targetHandle: 'target',
      type: 'custom',
    },
    {
      id: '2000002-true-2000003-target',
      source: '2000002',
      target: '2000003',
      sourceHandle: 'true',
      targetHandle: 'target',
      type: 'custom',
    },
    {
      id: '2000002-false-2000004-target',
      source: '2000002',
      target: '2000004',
      sourceHandle: 'false',
      targetHandle: 'target',
      type: 'custom',
    },
    {
      id: '2000003-source-2000005-target',
      source: '2000003',
      target: '2000005',
      sourceHandle: 'source',
      targetHandle: 'target',
      type: 'custom',
    },
    {
      id: '2000004-source-2000005-target',
      source: '2000004',
      target: '2000005',
      sourceHandle: 'source',
      targetHandle: 'target',
      type: 'custom',
    },
  ],
};
