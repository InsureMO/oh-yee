/**
 * title: Borderless
 * description: Remove the border via bordered={false}.
 */
import React from 'react';
import { InputNumber } from '@rainbow-oh/yee-c';

export default () => {
    return (
        <InputNumber
            defaultValue={100}
            bordered={false}
            placeholder="Borderless"
        />
    );
};
