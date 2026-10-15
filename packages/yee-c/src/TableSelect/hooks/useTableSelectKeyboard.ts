import { useEffect, useRef, useState } from 'react';
import type { TableSelectDataType } from '../interface';

type KeyType = string | number;

interface UseTableSelectKeyboardParams {
  open: boolean;
  disabled?: boolean;
  dataSource: Array<TableSelectDataType>;
  rowKey: string | ((record: any) => string);
  selectionType: 'radio' | 'checkbox';
  selectedRowKeys: Array<KeyType>;
  searchValue: string;
  onSelect: (keys: Array<KeyType>, rows: Array<TableSelectDataType>) => void;
  onClose: () => void;
}

/**
 * Keyboard navigation for the popup table. The highlight is positional (like a
 * hover cursor): `activeRow` is a rendered row index, and Space selects the
 * record displayed there. The rendered order is the filter→sort→paginate
 * result inside Table and is not derivable from `dataSource`, so the row count
 * and the highlighted row's key are both read from the popup DOM.
 */
export default function useTableSelectKeyboard({
  open,
  disabled,
  dataSource,
  rowKey,
  selectionType,
  selectedRowKeys,
  searchValue,
  onSelect,
  onClose,
}: UseTableSelectKeyboardParams) {
  const popupRef = useRef<HTMLDivElement | null>(null);
  // 1-based index of the highlighted row (`tr[data-row-index]`), 0 = none.
  const [activeRow, setActiveRow] = useState(0);

  useEffect(() => {
    setActiveRow(0);
  }, [open, searchValue]);

  const getRecordKey = (item: TableSelectDataType) =>
    typeof rowKey === 'function' ? rowKey(item) : item[rowKey];

  const getRowCount = () =>
    popupRef.current?.querySelectorAll('tr[data-row-index]').length ?? 0;

  useEffect(() => {
    if (!open || activeRow < 1) return;
    const rowEl = popupRef.current?.querySelector(
      `tr[data-row-index="${activeRow}"]`,
    ) as HTMLElement | null;
    if (!rowEl) return;
    // Manual scroll instead of scrollIntoView: the popup renders in a portal,
    // and scrollIntoView would scroll the page as well as the popup.
    let parent = rowEl.parentElement;
    while (parent && parent !== popupRef.current) {
      const { overflowY } = window.getComputedStyle(parent);
      if (
        /(auto|scroll)/.test(overflowY) &&
        parent.scrollHeight > parent.clientHeight
      ) {
        const parentRect = parent.getBoundingClientRect();
        const rowRect = rowEl.getBoundingClientRect();
        if (rowRect.bottom > parentRect.bottom) {
          parent.scrollTop += rowRect.bottom - parentRect.bottom;
        } else if (rowRect.top < parentRect.top) {
          parent.scrollTop -= parentRect.top - rowRect.top;
        }
        return;
      }
      parent = parent.parentElement;
    }
  }, [activeRow, open]);

  const selectActiveRow = () => {
    const rowEl = popupRef.current?.querySelector(
      `tr[data-row-index="${activeRow}"]`,
    );
    const inputEl = rowEl?.querySelector(
      'input[type="radio"],input[type="checkbox"]',
    ) as HTMLInputElement | null;
    if (!inputEl || inputEl.disabled) return;

    const record = dataSource.find(
      (item) => String(getRecordKey(item)) === inputEl.value,
    );
    if (!record) return;
    const key = getRecordKey(record);

    if (selectionType === 'radio') {
      // Same shape as the click path: arrays, normalized by the consumer.
      onSelect([key], [record]);
      onClose();
      return;
    }

    const checked = selectedRowKeys.some((k) => String(k) === String(key));
    const nextKeys = checked
      ? selectedRowKeys.filter((k) => String(k) !== String(key))
      : [...selectedRowKeys, key];
    const rows = dataSource.filter((item) =>
      nextKeys.some((k) => String(getRecordKey(item)) === String(k)),
    );
    onSelect(nextKeys, rows);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || disabled) return;
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveRow(Math.min(activeRow + 1, getRowCount()));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveRow(activeRow <= 1 ? getRowCount() : activeRow - 1);
        break;
      case ' ':
        // With nothing highlighted, space keeps its native input behavior.
        if (activeRow > 0) {
          event.preventDefault();
          selectActiveRow();
        }
        break;
      case 'Escape':
        event.preventDefault();
        // Stop the event from reaching outer layers (e.g. a Dialog's useEsc
        // listening on document) so only the dropdown closes.
        event.stopPropagation();
        onClose();
        break;
      default:
        break;
    }
  };

  return { popupRef, activeRow, handleKeyDown };
}
