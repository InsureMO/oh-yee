// @vitest-environment jsdom
import { act, cleanup, render } from '@testing-library/react';
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Table from './table';

import type { ColumnProps } from './interface';

const columns: ColumnProps[] = [
  { title: 'Name', dataIndex: 'name', key: 'name', width: 100, minWidth: 60 },
  { title: 'Age', dataIndex: 'age', key: 'age', width: 80, sorter: true },
  { title: 'Act', key: 'act', width: 120, resizable: false },
];

const dataSource = [{ key: '1', name: 'a', age: 1 }];

/** jsdom has no layout, so feed the hook the widths it would have measured. */
const stubSyncRaf = () =>
  vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
    cb(0);
    return 1;
  });

const stubColWidths = (widths: number[]) => {
  let index = 0;
  const spy = vi
    .spyOn(HTMLTableColElement.prototype, 'getBoundingClientRect')
    .mockImplementation(function () {
      const width = widths[index % widths.length];
      index += 1;
      return { width } as DOMRect;
    });
  return spy;
};

const pointer = (type: string, clientX: number) => {
  const event = new MouseEvent(type, { bubbles: true, clientX, button: 0 });
  Object.defineProperty(event, 'clientX', { value: clientX });
  return event;
};

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('Table column resize', () => {
  it('renders a handle only on columns that opted in', () => {
    const { container } = render(
      <Table resizable columns={columns} dataSource={dataSource} />,
    );
    const handles = container.querySelectorAll('.yee-table-resize-handle');
    expect(handles.length).toBe(2);
  });

  it('renders no handle when resizing is off', () => {
    const { container } = render(
      <Table columns={columns} dataSource={dataSource} />,
    );
    expect(container.querySelectorAll('.yee-table-resize-handle').length).toBe(
      0,
    );
  });

  it('never puts a handle on a group header cell', () => {
    const { container } = render(
      <Table
        resizable
        columns={[
          {
            title: 'Group',
            key: 'group',
            children: [
              { title: 'A', dataIndex: 'name', key: 'name', width: 100 },
              { title: 'B', dataIndex: 'age', key: 'age', width: 100 },
            ],
          },
        ]}
        dataSource={dataSource}
      />,
    );
    const rows = container.querySelectorAll('thead tr');
    expect(rows.length).toBe(2);
    expect(rows[0].querySelectorAll('.yee-table-resize-handle').length).toBe(0);
    expect(rows[1].querySelectorAll('.yee-table-resize-handle').length).toBe(2);
  });

  it('widens the dragged column and freezes the rest at their measured width', () => {
    stubSyncRaf();
    stubColWidths([100, 80, 120]);
    const onColumnResizeEnd = vi.fn();
    const { container } = render(
      <Table
        resizable
        columns={columns}
        dataSource={dataSource}
        onColumnResizeEnd={onColumnResizeEnd}
      />,
    );

    const handle = container.querySelector(
      '.yee-table-resize-handle',
    ) as HTMLElement;

    act(() => {
      handle.dispatchEvent(pointer('pointerdown', 200));
    });
    act(() => {
      window.dispatchEvent(pointer('pointermove', 260));
    });

    const cols = container.querySelectorAll('colgroup col');
    expect((cols[0] as HTMLElement).style.width).toBe('160px');
    expect((cols[1] as HTMLElement).style.width).toBe('80px');
    expect((cols[2] as HTMLElement).style.width).toBe('120px');

    const table = container.querySelector('table') as HTMLElement;
    expect(table.style.tableLayout).toBe('fixed');
    expect(table.style.width).toBe('360px');

    act(() => {
      window.dispatchEvent(pointer('pointerup', 260));
    });
    expect(onColumnResizeEnd).toHaveBeenCalledWith(
      160,
      expect.objectContaining({ key: 'name' }),
    );
    expect(document.body.style.cursor).toBe('');
  });

  it('shifts the sticky offset of following fixed columns', () => {
    stubSyncRaf();
    stubColWidths([100, 80, 120]);
    const { container } = render(
      <Table
        resizable
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 100,
            fixed: 'left',
          },
          {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            width: 80,
            fixed: 'left',
          },
          { title: 'Act', key: 'act', width: 120 },
        ]}
        dataSource={dataSource}
      />,
    );

    const secondFixedTh = container.querySelectorAll(
      'thead th',
    )[1] as HTMLElement;
    expect(secondFixedTh.style.left).toBe('100px');

    const handle = container.querySelector(
      '.yee-table-resize-handle',
    ) as HTMLElement;
    act(() => {
      handle.dispatchEvent(pointer('pointerdown', 200));
    });
    act(() => {
      window.dispatchEvent(pointer('pointermove', 250));
    });

    expect(
      (container.querySelectorAll('thead th')[1] as HTMLElement).style.left,
    ).toBe('150px');
  });

  it('drops the snapshot when the column set changes', () => {
    stubSyncRaf();
    stubColWidths([100, 80, 120]);
    const { container, rerender } = render(
      <Table resizable columns={columns} dataSource={dataSource} />,
    );
    const handle = container.querySelector(
      '.yee-table-resize-handle',
    ) as HTMLElement;
    act(() => {
      handle.dispatchEvent(pointer('pointerdown', 200));
    });
    act(() => {
      window.dispatchEvent(pointer('pointermove', 260));
    });
    act(() => {
      window.dispatchEvent(pointer('pointerup', 260));
    });
    expect((container.querySelector('table') as HTMLElement).style.width).toBe(
      '360px',
    );

    // A brand new column has no snapshotted width, so the px controlled layout
    // would have a hole in it; the table must fall back to natural sizing.
    rerender(
      <Table
        resizable
        columns={[...columns, { title: 'New', dataIndex: 'x', key: 'x' }]}
        dataSource={dataSource}
      />,
    );
    const table = container.querySelector('table') as HTMLElement;
    expect(table.style.width).toBe('');
    expect(table.style.tableLayout).toBe('');
  });

  it('clamps to minWidth', () => {
    stubSyncRaf();
    stubColWidths([100, 80, 120]);
    const { container } = render(
      <Table resizable columns={columns} dataSource={dataSource} />,
    );
    const handle = container.querySelector(
      '.yee-table-resize-handle',
    ) as HTMLElement;

    act(() => {
      handle.dispatchEvent(pointer('pointerdown', 200));
    });
    act(() => {
      window.dispatchEvent(pointer('pointermove', 0));
    });

    const cols = container.querySelectorAll('colgroup col');
    expect((cols[0] as HTMLElement).style.width).toBe('60px');
  });
});
