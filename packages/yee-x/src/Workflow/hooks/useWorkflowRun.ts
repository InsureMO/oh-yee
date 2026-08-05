import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { consumeReadableStream } from '../../utils/stream';
import type {
  WorkflowGraph,
  WorkflowRunState,
  WorkflowSSEEvent,
} from '../interface';
import { createEmptyRunState, createSSEParser, reduceRunEvent } from '../utils/sse';

export interface UseWorkflowRunOptions {
  /**
   * Endpoint that starts the run and answers with an SSE stream.
   *
   * Point this at your own backend proxy rather than Dify directly: the Dify
   * API key must not be shipped to the browser.
   */
  url: string;
  /**
   * Extra request headers
   */
  headers?: Record<string, string>;
  /**
   * Request body merged into `{ inputs, response_mode: 'streaming', user }`
   */
  body?: Record<string, unknown>;
  /**
   * Identifies the end user, required by the Dify API
   */
  user?: string;
  /**
   * The graph being executed. Used to light up traversed edges.
   */
  graph?: WorkflowGraph;
  /**
   * Called for every parsed frame, including the ones the reducer ignores
   */
  onEvent?: (event: WorkflowSSEEvent) => void;
  /**
   * Called once the stream reaches a terminal state
   */
  onFinish?: (state: WorkflowRunState) => void;
  onError?: (error: unknown) => void;
  /**
   * Replaces the default `fetch` call, e.g. to add auth or use a mock in demos
   */
  fetcher?: (init: {
    url: string;
    body: Record<string, unknown>;
    headers: Record<string, string>;
    signal: AbortSignal;
  }) => Promise<Response>;
}

export interface UseWorkflowRunResult {
  runState: WorkflowRunState;
  running: boolean;
  /**
   * Start a run with the given `inputs` (the start node's variables)
   */
  run: (inputs?: Record<string, unknown>) => Promise<void>;
  /**
   * Abort the stream locally. Call your own stop endpoint with `runState.taskId`
   * if the backend should cancel the run too.
   */
  stop: () => void;
  reset: () => void;
}

/**
 * Reduce a Dify workflow SSE stream into a {@link WorkflowRunState} that can be
 * handed straight to `<Workflow runState>`.
 */
export const useWorkflowRun = (
  options: UseWorkflowRunOptions,
): UseWorkflowRunResult => {
  const { url, headers, body, user, graph, onEvent, onFinish, onError, fetcher } =
    options;

  const [runState, setRunState] = useState<WorkflowRunState>(createEmptyRunState);
  const [running, setRunning] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  // Latest values, so a long running stream never reads a stale closure.
  const latest = useRef({ graph, onEvent, onFinish, onError });

  useEffect(() => {
    latest.current = { graph, onEvent, onFinish, onError };
  }, [graph, onEvent, onFinish, onError]);

  useEffect(
    () => () => {
      abortRef.current?.abort();
    },
    [],
  );

  const stop = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setRunning(false);
    setRunState((prev) =>
      prev.status === 'running' ? { ...prev, status: 'stopped' } : prev,
    );
  }, []);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setRunning(false);
    setRunState(createEmptyRunState());
  }, []);

  const run = useCallback(
    async (inputs: Record<string, unknown> = {}) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setRunState({ ...createEmptyRunState(), status: 'running' });
      setRunning(true);

      const requestBody = {
        inputs,
        response_mode: 'streaming',
        ...(user ? { user } : null),
        ...body,
      };
      const requestHeaders = {
        'Content-Type': 'application/json',
        Accept: 'text/event-stream',
        ...headers,
      };

      // Accumulate locally as well: setState is async and every frame needs to
      // fold onto the previous result, not onto a stale render value.
      let current: WorkflowRunState = { ...createEmptyRunState(), status: 'running' };
      const parse = createSSEParser();

      try {
        const response = fetcher
          ? await fetcher({
              url,
              body: requestBody,
              headers: requestHeaders,
              signal: controller.signal,
            })
          : await fetch(url, {
              method: 'POST',
              headers: requestHeaders,
              body: JSON.stringify(requestBody),
              signal: controller.signal,
            });

        if (!response.ok) {
          throw new Error(`工作流执行请求失败：${response.status}`);
        }
        if (!response.body) {
          throw new Error('工作流执行请求没有返回流式响应');
        }

        await consumeReadableStream(
          response.body,
          (chunk) => {
            parse(chunk).forEach((event) => {
              latest.current.onEvent?.(event);
              current = reduceRunEvent(current, event, latest.current.graph);
            });
            setRunState(current);
          },
          controller.signal,
        );

        setRunning(false);
        latest.current.onFinish?.(current);
      } catch (error) {
        if (controller.signal.aborted) return;
        setRunning(false);
        current = {
          ...current,
          status: 'failed',
          error: error instanceof Error ? error.message : String(error),
        };
        setRunState(current);
        latest.current.onError?.(error);
      }
    },
    [url, headers, body, user, fetcher],
  );

  return useMemo(
    () => ({ runState, running, run, stop, reset }),
    [runState, running, run, stop, reset],
  );
};

export default useWorkflowRun;
