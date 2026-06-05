import { RangePicker } from '@rainbow-oh/yee-c';
import dayjs from 'dayjs';
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
    Today: [dayjs(), dayjs()],
    Yesterday: [dayjs().subtract(1, 'day'), dayjs().subtract(1, 'day')],
    'Last 7 Days': [dayjs().subtract(6, 'day'), dayjs()],
    'Last 30 Days': [dayjs().subtract(29, 'day'), dayjs()],
    'This Week': [dayjs().startOf('week'), dayjs().endOf('week')],
    'This Month': [dayjs().startOf('month'), dayjs().endOf('month')],
    'Last Month': [
      dayjs().subtract(1, 'month').startOf('month'),
      dayjs().subtract(1, 'month').endOf('month'),
    ],
    'This Quarter': [dayjs().startOf('quarter'), dayjs().endOf('quarter')],
    'This Year': [dayjs().startOf('year'), dayjs().endOf('year')],
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
        <h3 style={{ marginTop: 0 }}>Configuration</h3>

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
              Size:
            </label>
            <select
              value={config.size}
              onChange={(e) =>
                setConfig({
                  ...config,
                  size: e.target.value as 'small' | 'middle' | 'large',
                })
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
              Status:
            </label>
            <select
              value={config.status || ''}
              onChange={(e) =>
                setConfig({
                  ...config,
                  status:
                    (e.target.value as 'error' | 'warning' | '') || undefined,
                })
              }
              style={{ width: '100%', padding: '4px 8px' }}
            >
              <option value="">Default</option>
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
                  setConfig({
                    ...config,
                    disabled: e.target.checked,
                  })
                }
                style={{ marginRight: '8px' }}
              />
              Disabled
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
                  setConfig({
                    ...config,
                    allowClear: e.target.checked,
                  })
                }
                style={{ marginRight: '8px' }}
              />
              Allow Clear
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
                  setConfig({
                    ...config,
                    endLimitStart: e.target.checked,
                  })
                }
                style={{ marginRight: '8px' }}
              />
              End Date Limit
            </label>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Range Picker</h3>
        <RangePicker
          value={value}
          size={config.size}
          status={config.status}
          disabled={config.disabled}
          allowClear={config.allowClear}
          endLimitStart={config.endLimitStart}
          ranges={ranges}
          onChange={(dates) => {
            setValue(dates);
          }}
          onOpenChange={(open) =>
            console.log('Panel state:', open ? 'Open' : 'Closed')
          }
          onClear={() => console.log('Cleared')}
          placeholder={['Start date', 'End date']}
        />
      </div>

      <div
        style={{
          padding: '16px',
          background: '#f5f5f5',
          borderRadius: '4px',
        }}
      >
        <h3 style={{ marginTop: 0 }}>Current Value</h3>
        <pre style={{ margin: 0, fontSize: '12px', overflow: 'auto' }}>
          {value.length > 0
            ? JSON.stringify(value, null, 2)
            : 'No date selected'}
        </pre>
      </div>
    </div>
  );
};
