---
category: Components
title: Tools
subtitle: 工具
group:
  title: 工具
  order: 6
toc: 'content'
---

# 流处理工具

用于解析 stream 流数据

```js | pure

import { processResponse, processStreamText } from '@rainbow-oh/yee-x';

// 请求数据
const response = fetch(url, params);

// 控制器，可终止请求
const controller = new AbortController();

// 判断请求
if (response.ok) {
    const headers = response.headers as any;
    if (headers && headers.get('content-type')?.indexOf('stream') > -1) {

        const callback = async (text: string) => {
            /**
             * processStreamText 工具是将 类似 `data:{xxxxx: yyyy}\n\ndata:{xxxx: yyyy}` 的数据
             * 解析成Array<Record<string, any>> 的格式
             * 可选参数  
             *  - chunkStart: 区块开头用作数据分割，一般为 'data:' 或 'data: '。默认为 'data:'
             *  - separator：分割符，默认为 '\n\n'
             *  - end: 结束标记, 默认为 '[DONE]'
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
        // 如何不是流数据，直接更新到ChatMessages中
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

```
