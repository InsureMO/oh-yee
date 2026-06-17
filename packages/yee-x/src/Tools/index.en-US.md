---
category: Components
title: Tools
subtitle: Tools
group:
  title: Utilities
  order: 6
toc: 'content'
---

# Stream Processing Tools

Used for parsing stream data

```js | pure
import { processResponse, processStreamText } from '@rainbow-oh/yee-x';

// Request data
const response = fetch(url, params);

// Controller for aborting requests
const controller = new AbortController();

// Check response
if (response.ok) {
    const headers = response.headers as any;
    if (headers && headers.get('content-type')?.indexOf('stream') > -1) {

        const callback = async (text: string) => {
            /**
             * processStreamText utility converts data like `data:{xxxxx: yyyy}\n\ndata:{xxxx: yyyy}` 
             * into Array<Record<string, any>> format
             * Optional parameters:
             *  - chunkStart: Block prefix used for data splitting (default: 'data:')
             *  - separator: Delimiter (default: '\n\n')
             *  - end: End marker (default: '[DONE]')
            */

            const chunks = processStreamText({ text, chunkStart: 'data: ' });
            for await (const chunk of chunks) {
                const s = chunk.message.content;
                m += s;
                setChatMessages((state) => {
                    const newState = [...state];
                    newState[state.length - 1] = {
                        key: state.length,
                        role: 'assistant',
                        content: m
                    };
                    return newState;
                });
            }
        };

        await processResponse({ response, controller, callback });
    } else {
        // For non-stream data, update ChatMessages directly
        const res = await response.json();
        if (res.response) {
            setChatMessages((state) => {
                const newState = [...state];
                newState[state.length - 1] = {
                    key: state.length,
                    role: 'assistant',
                    content: res.response
                };
                return newState;
            });
        }
    }
}