// @vitest-environment jsdom
import { cleanup, fireEvent, render } from '@testing-library/react';
import React, { useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Table from './table';

import type { FilterValue } from './interface';

const dataSource = [
  { key: '1', name: 'John Brown', age: 32, gender: 'male' },
  { key: '2', name: 'Jim Green', age: 42, gender: 'male' },
  { key: '3', name: 'Joe Black', age: 32, gender: 'female' },
];

afterEach(() => {
  cleanup();
});

// jsdom has no ResizeObserver; @rc-component/trigger uses it for popup align.
if (typeof globalThis.ResizeObserver === 'undefined') {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
}

const getTrigger = (container: HTMLElement, index = 0) =>
  container.querySelectorAll('.yee-table-filter-trigger')[index] as HTMLElement;

const openFilter = (container: HTMLElement, index = 0) => {
  fireEvent.click(getTrigger(container, index));
};

// Closed popovers stay mounted in the DOM, so the newest popup is last.
const getPopup = () =>
  document.querySelectorAll('.yee-table-filter-content')[
    document.querySelectorAll('.yee-table-filter-content').length - 1
  ] as HTMLElement;

const commitSearch = (value: string) => {
  const popup = getPopup();
  fireEvent.change(popup.querySelector('input') as HTMLInputElement, {
    target: { value },
  });
  const buttons = popup.querySelectorAll('button');
  fireEvent.click(buttons[buttons.length - 1]);
};

const rowCount = (container: HTMLElement) =>
  container.querySelectorAll('tbody tr').length;

describe('Table filter', () => {
  it('filters locally with default includes matching and emits onChange once', () => {
    const onChange = vi.fn();
    const { container } = render(
      <Table
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filter: { searchable: true },
          },
        ]}
        dataSource={dataSource}
        onChange={onChange}
      />,
    );

    openFilter(container);
    commitSearch('jim');

    expect(rowCount(container)).toBe(1);
    expect(container.textContent).toContain('Jim Green');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toMatchObject({
      action: 'filter',
      filters: { name: 'jim' },
    });
  });

  it('uses the custom onFilter when provided', () => {
    const { container } = render(
      <Table
        columns={[
          {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            filter: {
              searchable: true,
              onFilter: (value, record) => record.age === Number(value),
            },
          },
        ]}
        dataSource={dataSource}
      />,
    );

    openFilter(container);
    commitSearch('32');

    // Default includes matching would find nothing ("32" is not in the names);
    // the custom filter matches the two rows aged 32.
    expect(rowCount(container)).toBe(2);
  });

  it('passes data through when controlled without onFilter and reports the controlled value in filters', () => {
    const onChange = vi.fn();
    const { container } = render(
      <Table
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filter: { searchable: true, filteredValue: 'zzz' },
          },
          {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            filter: { searchable: true },
          },
        ]}
        dataSource={dataSource}
        onChange={onChange}
      />,
    );

    // "zzz" matches nothing locally, yet server mode must not drop any rows.
    expect(rowCount(container)).toBe(3);

    openFilter(container, 1);
    commitSearch('32');

    expect(rowCount(container)).toBe(2);
    expect(onChange.mock.calls[0][0]).toMatchObject({
      action: 'filter',
      filters: { name: 'zzz', age: '32' },
    });
  });

  it('filters locally with onFilter when controlled', () => {
    const { container } = render(
      <Table
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filter: {
              searchable: true,
              filteredValue: 'jim',
              onFilter: (value, record) =>
                String(record.name)
                  .toLowerCase()
                  .includes(String(value).toLowerCase()),
            },
          },
        ]}
        dataSource={dataSource}
      />,
    );

    expect(rowCount(container)).toBe(1);
    expect(container.textContent).toContain('Jim Green');
  });

  it('emits the committed value, highlights the trigger and echoes the value back', () => {
    const onChange = vi.fn();
    const Controlled = () => {
      const [filteredValue, setFilteredValue] = useState<
        FilterValue | FilterValue[]
      >('');
      const handleChange = (info: any) => {
        onChange(info);
        setFilteredValue(info.filters.name ?? '');
      };
      return (
        <Table
          columns={[
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
              filter: { searchable: true, filteredValue },
            },
          ]}
          dataSource={dataSource}
          onChange={handleChange}
        />
      );
    };
    const { container } = render(<Controlled />);

    // Server mode: data untouched, parent decides what to render.
    expect(rowCount(container)).toBe(3);
    expect(getTrigger(container).querySelector('.yee-btn-filled')).toBeNull();

    openFilter(container);
    commitSearch('jim');

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toMatchObject({
      action: 'filter',
      filters: { name: 'jim' },
    });

    // Highlight derives from the controlled prop once the parent applies it.
    expect(
      getTrigger(container).querySelector('.yee-btn-filled'),
    ).not.toBeNull();

    // Re-opening the dropdown echoes the controlled value into the input.
    openFilter(container);
    const input = getPopup().querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('jim');
  });

  it('resets programmatically via filteredValue without emitting onChange', () => {
    const onChange = vi.fn();
    const Controlled = () => {
      const [filteredValue, setFilteredValue] = useState<FilterValue[]>([
        'male',
      ]);
      return (
        <>
          <button type="button" onClick={() => setFilteredValue([])}>
            reset-filters
          </button>
          <Table
            columns={[
              {
                title: 'Gender',
                dataIndex: 'gender',
                key: 'gender',
                filter: {
                  items: [
                    { label: 'Male', key: 'male' },
                    { label: 'Female', key: 'female' },
                  ],
                  filteredValue,
                  onFilter: (value, record) => value === record.gender,
                },
              },
            ]}
            dataSource={dataSource}
            onChange={onChange}
          />
        </>
      );
    };
    const { container, getByText } = render(<Controlled />);

    expect(rowCount(container)).toBe(2);
    expect(
      getTrigger(container).querySelector('.yee-btn-filled'),
    ).not.toBeNull();

    fireEvent.click(getByText('reset-filters'));

    expect(rowCount(container)).toBe(3);
    expect(getTrigger(container).querySelector('.yee-btn-filled')).toBeNull();
    expect(onChange).not.toHaveBeenCalled();
  });

  // Regression: server mode's onChange → fetch → setState round-trip is async,
  // so commits must not leak into state while the prop has not been applied.
  it('does not leak a stale controlled value into later onChange payloads when the parent ignores commits', () => {
    const onChange = vi.fn();
    const { container } = render(
      <Table
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filter: { searchable: true, filteredValue: '' },
          },
          {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            filter: { searchable: true },
          },
        ]}
        dataSource={dataSource}
        onChange={onChange}
      />,
    );

    // User commits on the controlled column; the parent never applies it.
    openFilter(container, 0);
    commitSearch('jim');

    // The controlled column itself: payload reports the clicked value only.
    expect(onChange.mock.calls[0][0]).toMatchObject({
      action: 'filter',
      filters: { name: 'jim' },
    });
    // Server passthrough: rows must be untouched despite the commit.
    expect(rowCount(container)).toBe(3);

    // A commit on the other column must not carry the stale 'jim' along.
    openFilter(container, 1);
    commitSearch('32');

    expect(onChange.mock.calls[1][0]).toMatchObject({
      action: 'filter',
      filters: { age: '32' },
    });
    expect(onChange.mock.calls[1][0].filters).not.toHaveProperty('name');
  });

  it('does not filter locally from unapplied commits on a controlled column with onFilter', () => {
    const { container } = render(
      <Table
        columns={[
          {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            filter: {
              searchable: true,
              // Controlled as "no filter"; the parent ignores onChange.
              filteredValue: [],
              onFilter: (value, record) => record.age === Number(value),
            },
          },
        ]}
        dataSource={dataSource}
      />,
    );

    openFilter(container);
    commitSearch('32');

    // The prop says no filter, so no local matching may happen.
    expect(rowCount(container)).toBe(3);
  });
});
