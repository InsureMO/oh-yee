/**
 * title: Basic Usage
 * description: The simplest usage.
 */
import React from 'react';
import { InputNumber } from '@rainbow-oh/yee-c';

export default () => {
    return (
        <InputNumber
            defaultValue={0}
            placeholder="Enter a number"
            onChange={(value) => console.log('value:', value)}
        />
    );
};
