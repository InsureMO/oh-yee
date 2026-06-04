/**
 * title: Allow Clear
 * description: Display a clear button via the allowClear property.
 */
import { InputNumber } from '@oh/yee-c';
import React from 'react';

export default () => {
    return (
        <InputNumber
            defaultValue={100}
            allowClear
            placeholder="可清空"
            onChange={(value) => console.log('value:', value)}
        />
    );
};
