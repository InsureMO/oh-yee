import { Button, Segmented } from '@rainbow-oh/yee-c';
import { Workflow, useWorkflowRun } from '@rainbow-oh/yee-x';
import React from 'react';
import { weatherGraph } from './data';

const NODE_SEQUENCE = [
  { id: '1000001', type: 'start', title: '开始', elapsed: 0.01 },
  { id: '1000002', type: 'http-request', title: '获取天气', elapsed: 0.62 },
  { id: '1000003', type: 'code', title: '提取温度', elapsed: 0.04 },
  { id: '1000004', type: 'llm', title: '生成播报', elapsed: 1.35, tokens: 218 },
  { id: '1000005', type: 'end', title: '结束', elapsed: 0.01 },
];

const frame = (payload: Record<string, unknown>) =>
  `data: ${JSON.stringify(payload)}\n\n`;

const sleep = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

/**
 * Stands in for the backend: emits the same SSE frames a Dify
 * `/workflows/run` streaming response would, so the reducer and the canvas
 * overlay can be exercised without a server.
 */
const createMockResponse = (failAt?: string) => {
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (payload: Record<string, unknown>) =>
        controller.enqueue(encoder.encode(frame(payload)));

      const taskId = 'demo-task';
      const runId = 'demo-run';
      send({
        event: 'workflow_started',
        task_id: taskId,
        workflow_run_id: runId,
        data: { id: runId, created_at: Date.now() / 1000 },
      });

      for (let index = 0; index < NODE_SEQUENCE.length; index += 1) {
        const node = NODE_SEQUENCE[index];
        await sleep(400);
        send({
          event: 'node_started',
          task_id: taskId,
          workflow_run_id: runId,
          data: {
            id: `exec-${index}`,
            node_id: node.id,
            node_type: node.type,
            title: node.title,
            index: index + 1,
            created_at: Date.now() / 1000,
          },
        });

        await sleep(Math.min(node.elapsed * 600, 900));
        const failed = failAt === node.id;
        send({
          event: 'node_finished',
          task_id: taskId,
          workflow_run_id: runId,
          data: {
            id: `exec-${index}`,
            node_id: node.id,
            node_type: node.type,
            title: node.title,
            index: index + 1,
            status: failed ? 'failed' : 'succeeded',
            elapsed_time: node.elapsed,
            error: failed ? '上游接口 502 Bad Gateway' : null,
            inputs: { city: '上海' },
            outputs: failed ? null : { text: `${node.title} 完成` },
            execution_metadata: node.tokens ? { total_tokens: node.tokens } : {},
          },
        });

        if (failed) {
          send({
            event: 'workflow_finished',
            task_id: taskId,
            workflow_run_id: runId,
            data: {
              id: runId,
              status: 'failed',
              error: '节点执行失败',
              elapsed_time: 1.1,
              total_tokens: 0,
            },
          });
          controller.close();
          return;
        }
      }

      send({
        event: 'workflow_finished',
        task_id: taskId,
        workflow_run_id: runId,
        data: {
          id: runId,
          status: 'succeeded',
          outputs: { report: '上海 26C，湿度 70%，今天体感闷热。' },
          elapsed_time: 2.03,
          total_tokens: 218,
        },
      });
      controller.close();
    },
  });

  return new Response(stream, {
    status: 200,
    headers: { 'Content-Type': 'text/event-stream' },
  });
};

export default function Run() {
  const [scenario, setScenario] = React.useState('ok');

  const { runState, running, run, stop, reset } = useWorkflowRun({
    // Point at your own backend in real usage; the Dify API key must stay
    // server-side.
    url: '/api/workflows/run',
    graph: weatherGraph,
    fetcher: async () =>
      createMockResponse(scenario === 'fail' ? '1000002' : undefined),
  });

  return (
    <>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
        <Segmented
          value={scenario}
          options={[
            { label: '全部成功', value: 'ok' },
            { label: 'HTTP 节点失败', value: 'fail' },
          ]}
          onChange={(value) => {
            setScenario(String(value));
            reset();
          }}
        />
        <Button size="small" type="primary" disabled={running} onClick={() => run({ city: '上海' })}>
          执行
        </Button>
        <Button size="small" disabled={!running} onClick={stop}>
          停止
        </Button>
        <span style={{ color: 'var(--yee-text-color-secondary, #696969)', fontSize: 12 }}>
          状态：{runState.status}
          {runState.elapsedTime !== undefined ? ` · ${runState.elapsedTime}s` : ''}
        </span>
      </div>

      <Workflow
        mode="view"
        height={420}
        inspector
        value={weatherGraph}
        runState={runState}
      />

      {runState.outputs ? (
        <pre
          style={{
            marginTop: 12,
            padding: 8,
            background: 'var(--yee-color-bg-rail, #f5f5f5)',
            fontSize: 12,
          }}
        >
          {JSON.stringify(runState.outputs, null, 2)}
        </pre>
      ) : null}
    </>
  );
}
