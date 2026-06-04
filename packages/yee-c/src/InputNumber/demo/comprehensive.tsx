/**
 * title: Comprehensive Example
 * description: Demonstrates various feature combinations of InputNumber.
 */
import { InputNumber, Space } from '@oh/yee-c';
import { DollarSign, Percent } from 'lucide-react';
import React, { useState } from 'react';

export default () => {
    const [value1, setValue1] = useState<number | null>(100);
    const [value2, setValue2] = useState<number | null>(50);

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <div>
                <div style={{ marginBottom: 8 }}>价格输入（带图标前缀）：</div>
                <InputNumber
                    value={value1}
                    onChange={setValue1}
                    min={0}
                    max={10000}
                    step={10}
                    precision={2}
                    prefix={<DollarSign size={14} />}
                    suffix="USD"
                    allowClear
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value!.replace(/,/g, '')}
                    placeholder="请输入价格"
                />
                <div style={{ marginTop: 8, color: '#666' }}>
                    当前值: {value1 ?? 'null'}
                </div>
            </div>

            <div>
                <div style={{ marginBottom: 8 }}>百分比输入（带图标后缀）：</div>
                <InputNumber
                    value={value2}
                    onChange={setValue2}
                    min={0}
                    max={100}
                    step={5}
                    precision={1}
                    suffix={<Percent size={14} />}
                    allowClear
                    formatter={(value) => `${value}`}
                    placeholder="请输入百分比"
                />
                <div style={{ marginTop: 8, color: '#666' }}>
                    当前值: {value2 ?? 'null'}%
                </div>
            </div>

            <div>
                <div style={{ marginBottom: 8 }}>无步进器：</div>
                <InputNumber
                    defaultValue={999}
                    controls={false}
                    prefix="¥"
                    allowClear
                    placeholder="无步进器"
                />
            </div>
        </Space>
    );
};
