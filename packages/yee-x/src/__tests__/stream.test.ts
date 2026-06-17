import { describe, expect, it } from 'vitest';
import {
  consumeReadableStream,
  processResponse,
  processStreamText,
} from '../utils/stream';

describe('processStreamText', () => {
  it('should parse SSE data lines', async () => {
    const input = 'data:{"choices":[{"text":"hello"}]}';
    const results: any[] = [];
    for await (const chunk of processStreamText({ text: input })) {
      results.push(chunk);
    }
    expect(results).toHaveLength(1);
    expect(results[0]).toEqual({ choices: [{ text: 'hello' }] });
  });

  it('should handle multiple chunks separated by separator', async () => {
    const input = 'data:{"a":1}\n\ndata:{"b":2}';
    const results: any[] = [];
    for await (const chunk of processStreamText({ text: input })) {
      results.push(chunk);
    }
    expect(results).toHaveLength(2);
    expect(results[0]).toEqual({ a: 1 });
    expect(results[1]).toEqual({ b: 2 });
  });

  it('should stop at [DONE] end marker', async () => {
    const input = 'data:{"a":1}\n\ndata:[DONE]\n\ndata:{"b":2}';
    const results: any[] = [];
    for await (const chunk of processStreamText({ text: input })) {
      results.push(chunk);
    }
    expect(results).toHaveLength(1);
    expect(results[0]).toEqual({ a: 1 });
  });

  it('should skip empty data lines', async () => {
    const input = 'data:\n\ndata:{"a":1}';
    const results: any[] = [];
    for await (const chunk of processStreamText({ text: input })) {
      results.push(chunk);
    }
    expect(results).toHaveLength(1);
  });

  it('should yield raw text for non-JSON values', async () => {
    const input = 'data:not-json';
    const results: any[] = [];
    for await (const chunk of processStreamText({ text: input })) {
      results.push(chunk);
    }
    expect(results).toHaveLength(1);
    expect(results[0]).toBe('not-json');
  });

  it('should respect custom chunkStart prefix', async () => {
    const input = 'event:{"type":"message"}';
    const results: any[] = [];
    for await (const chunk of processStreamText({
      text: input,
      chunkStart: 'event:',
    })) {
      results.push(chunk);
    }
    expect(results).toHaveLength(1);
    expect(results[0]).toEqual({ type: 'message' });
  });

  it('should ignore lines not starting with chunkStart', async () => {
    const input = 'id:123\n\ndata:{"a":1}';
    const results: any[] = [];
    for await (const chunk of processStreamText({ text: input })) {
      results.push(chunk);
    }
    expect(results).toHaveLength(1);
    expect(results[0]).toEqual({ a: 1 });
  });
});

describe('consumeReadableStream', () => {
  it('should read chunks from a readable stream', async () => {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode('hello'));
        controller.enqueue(encoder.encode(' world'));
        controller.close();
      },
    });

    const chunks: string[] = [];
    await consumeReadableStream(
      stream,
      (chunk) => chunks.push(chunk),
      new AbortController().signal,
    );
    expect(chunks.join('')).toBe('hello world');
  });

  it('should handle abort signal', async () => {
    const controller = new AbortController();
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode('hello'));
        controller.close();
      },
    });

    controller.abort();
    await expect(
      consumeReadableStream(stream, () => {}, controller.signal),
    ).resolves.toBeUndefined();
  });
});

describe('processResponse', () => {
  it('should throw error for null body', async () => {
    const response = new Response(null);
    const ac = new AbortController();
    await expect(
      processResponse({ response, controller: ac, callback: () => {} }),
    ).rejects.toThrow('Invalid response!');
  });
});
