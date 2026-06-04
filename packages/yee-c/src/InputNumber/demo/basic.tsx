/**
 * title: Basic Usage
 * description: The simplest usage.
 */
import { InputNumber } from '@oh/yee-c';
import React from 'react';

export default () => {
    return (
        <InputNumber
            defaultValue={0}
            placeholder="请输入数字"
            onChange={(value) => console.log('value:', value)}
        />
    );
};
