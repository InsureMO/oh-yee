export async function consumeReadableStream(
  stream: ReadableStream<Uint8Array>,
  callback: (chunk: string) => void,
  signal: AbortSignal,
) {
  const reader = stream.getReader();
  const decoder = new TextDecoder();

  signal.addEventListener('abort', () => reader.cancel(), { once: true });

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      if (value) {
        callback(decoder.decode(value, { stream: true }));
      }
    }
  } catch (error) {
    if (!signal.aborted) {
      throw error;
    }
  } finally {
    reader.releaseLock();
  }
}

export async function processResponse({
  response,
  controller,
  callback,
}: {
  response: Response;
  controller: AbortController;
  callback: (text: string) => void;
}) {
  if (response.body) {
    await consumeReadableStream(response.body, callback, controller.signal);
  } else {
    throw new Error('Invalid response!');
  }
}

export async function* processStreamText({
  text,
  separator = '\n\n',
  end = '[DONE]',
  chunkStart = 'data:',
}: {
  text: string;
  separator?: string;
  end?: string;
  chunkStart?: string;
}) {
  const chunks = text.split(separator).filter(Boolean);
  for (const chunk of chunks) {
    if (chunk.startsWith(chunkStart)) {
      const temp = chunk.slice(chunkStart.length);

      if (!temp) {
        continue;
      }
      if (temp === end) {
        break;
      }
      try {
        const data = JSON.parse(temp || '{}');
        yield data;
      } catch {
        yield temp;
      }
    }
  }
}
