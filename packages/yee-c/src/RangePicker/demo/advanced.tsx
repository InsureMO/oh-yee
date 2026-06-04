import dayjs from 'dayjs';
import { RangePicker } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState<string[]>([]);
  const [config, setConfig] = useState({
    size: 'middle' as 'small' | 'middle' | 'large',
    status: undefined as 'error' | 'warning' | undefined,
    disabled: false,
    allowClear: true,
    endLimitStart: true,
  });

  const ranges: Record<string, [dayjs.Dayjs, dayjs.Dayjs]> = {
    今天: [dayjs(), dayjs()],
    昨天: [dayjs().subtract(1, 'day'), dayjs().subtract(1, 'day')],
    最近7天: [dayjs().subtract(6, 'day'), dayjs()],
    最近30天: [dayjs().subtract(29, 'day'), dayjs()],
    本周: [dayjs().startOf('week'), dayjs().endOf('week')],
    本月: [dayjs().startOf('month'), dayjs().endOf('month')],
    上月: [
      dayjs().subtract(1, 'month').startOf('month'),
      dayjs().subtract(1, 'month').endOf('month'),
    ],
    本季度: [dayjs().startOf('quarter'), dayjs().endOf('quarter')],
    本年: [dayjs().startOf('year'), dayjs().endOf('year')],
  };

  return (
    <div style={{ padding: '20px' }}>
      <div
        style={{
          marginBottom: '20px',
          padding: '16px',
          background: '#f5f5f5',
          borderRadius: '4px',
        }}
      >
        <h3 style={{ marginTop: 0 }}>配置选项</h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
          }}
        >
          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '4px',
                fontSize: '14px',
              }}
            >
              尺寸：
            </label>
            <select
              value={config.size}
              onChange={(e) =>
                setConfig({ ...config, size: e.target.value as any })
              }
              style={{ width: '100%', padding: '4px 8px' }}
            >
              <option value="small">Small</option>
              <option value="middle">Middle</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '4px',
                fontSize: '14px',
              }}
            >
              状态：
            </label>
            <select
              value={config.status || ''}
              onChange={(e) =>
                setConfig({
                  ...config,
                  status: (e.target.value as any) || undefined,
                })
              }
              style={{ width: '100%', padding: '4px 8px' }}
            >
              <option value="">默认</option>
              <option value="error">Error</option>
              <option value="warning">Warning</option>
            </select>
          </div>

          <div>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '14px',
              }}
            >
              <input
                type="checkbox"
                checked={config.disabled}
                onChange={(e) =>
                  setConfig({ ...config, disabled: e.target.checked })
                }
                style={{ marginRight: '8px' }}
              />
              禁用
            </label>
          </div>

          <div>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '14px',
              }}
            >
              <input
                type="checkbox"
                checked={config.allowClear}
                onChange={(e) =>
                  setConfig({ ...config, allowClear: e.target.checked })
                }
                style={{ marginRight: '8px' }}
              />
              允许清除
            </label>
          </div>

          <div>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '14px',
              }}
            >
              <input
                type="checkbox"
                checked={config.endLimitStart}
                onChange={(e) =>
                  setConfig({ ...config, endLimitStart: e.target.checked })
                }
                style={{ marginRight: '8px' }}
              />
              结束日期限制
            </label>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>日期范围选择器</h3>
        <RangePicker
          value={value}
          size={config.size}
          status={config.status}
          disabled={config.disabled}
          allowClear={config.allowClear}
          endLimitStart={config.endLimitStart}
          ranges={ranges}
          onChange={(dates, dateStrings) => {
            console.log('选中的日期:', dates);
            setValue(dates);
          }}
          onOpenChange={(open) =>
            console.log('面板状态:', open ? '打开' : '关闭')
          }
          onClear={() => console.log('已清除')}
          placeholder={['开始日期', '结束日期']}
        />
      </div>

      <div
        style={{ padding: '16px', background: '#f5f5f5', borderRadius: '4px' }}
      >
        <h3 style={{ marginTop: 0 }}>当前值</h3>
        <pre style={{ margin: 0, fontSize: '12px', overflow: 'auto' }}>
          {value.length > 0 ? JSON.stringify(value, null, 2) : '未选择日期'}
        </pre>
      </div>
    </div>
  );
};
