/**
 * title: Allow Clear
 * description: Display a clear button via the allowClear property.
 */
import React from 'react';
import { InputNumber } from '@oh/yee-c';

export default () => {
    return (
        <InputNumber
            defaultValue={100}
            allowClear
            placeholder="Clearable"
            onChange={(value) => console.log('value:', value)}
        />
    );
};
