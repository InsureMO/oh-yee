import { RangePicker } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState<[string, string]>();
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs((prev) => [
      ...prev,
      `${new Date().toLocaleTimeString()}: ${message}`,
    ]);
  };

  return (
    <div style={{ padding: '20px' }}>
      <RangePicker
        value={value}
        onChange={(dates, dateStrings) => {
          addLog(`onChange - dates: ${JSON.stringify(dates)}`);
          setValue(dates as [string, string]);
        }}
        onStartChange={(value, date) => {
          addLog(`onStartChange - start date: ${value}`);
        }}
        onEndChange={(value, date) => {
          addLog(`onEndChange - end date: ${value}`);
        }}
        onOpenChange={(open) => {
          addLog(`onOpenChange - panel ${open ? 'opened' : 'closed'}`);
        }}
        onClear={() => {
          addLog('onClear - cleared');
        }}
        placeholder={['Start date', 'End date']}
      />

      <div
        style={{
          marginTop: '20px',
          padding: '12px',
          background: '#f5f5f5',
          borderRadius: '4px',
        }}
      >
        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
          Event Log:
        </div>
        <div style={{ maxHeight: '200px', overflow: 'auto' }}>
          {logs.length === 0 ? (
            <div style={{ color: '#999' }}>No events yet</div>
          ) : (
            logs.map((log, index) => (
              <div
                key={index}
                style={{ fontSize: '12px', marginBottom: '4px' }}
              >
                {log}
              </div>
            ))
          )}
        </div>
        {logs.length > 0 && (
          <button
            onClick={() => setLogs([])}
            style={{
              marginTop: '8px',
              padding: '4px 12px',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            Clear Log
          </button>
        )}
      </div>
    </div>
  );
};
