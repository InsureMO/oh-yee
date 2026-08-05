import type { WorkflowNodeTypes } from '../interface';
import { answerNode, endNode, startNode } from './io';
import { codeNode, ifElseNode, templateNode } from './logic';
import {
  agentNode,
  httpNode,
  llmNode,
  toolNode,
  variableAggregatorNode,
} from './remote';

/**
 * Node types recognised out of the box, keyed by the Dify `data.type` value.
 *
 * `tool` / `agent` / `variable-aggregator` are render-only (`creatable: false`):
 * they cannot be meaningfully configured outside Dify, but an imported DSL
 * containing them still renders and round-trips intact.
 */
export const builtinNodeTypes: WorkflowNodeTypes = {
  start: startNode,
  end: endNode,
  answer: answerNode,
  llm: llmNode,
  'if-else': ifElseNode,
  'http-request': httpNode,
  code: codeNode,
  'template-transform': templateNode,
  tool: toolNode,
  agent: agentNode,
  'variable-aggregator': variableAggregatorNode,
};

export { ListEditor } from './list-editor';
export type { ListEditorProps } from './list-editor';
export {
  answerNode,
  endNode,
  startNode,
  codeNode,
  ifElseNode,
  templateNode,
  agentNode,
  httpNode,
  llmNode,
  toolNode,
  variableAggregatorNode,
};
export type {
  AnswerNodeData,
  EndNodeData,
  EndNodeOutput,
  StartNodeData,
  StartNodeVariable,
  StartVariableType,
} from './io';
export type {
  CodeNodeData,
  CodeNodeVariable,
  ConditionCase,
  ConditionItem,
  IfElseNodeData,
  TemplateNodeData,
} from './logic';
export type {
  AgentNodeData,
  HttpNodeData,
  LLMNodeData,
  LLMPromptMessage,
  ToolNodeData,
  VariableAggregatorData,
} from './remote';
