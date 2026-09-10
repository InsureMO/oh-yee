import * as React from 'react';
import useLatest from '../../hooks/useLatest';
import type { WrapedColumnProps } from '../interface';

/** Floor for a dragged column when it declares no `minWidth` of its own. */
const DEFAULT_MIN_COLUMN_WIDTH = 40;

/** Width delta applied per arrow key press when a handle has focus. */
const KEYBOARD_STEP = 8;

interface UseColumnResizeOptions {
  tableRef: React.RefObject<HTMLTableElement | null>;
  /**
   * Latest leaf columns. Passed as a ref because the columns are themselves
   * derived from `resizedWidths`; depending on the array would make every
   * width change rebuild the drag handlers mid-drag.
   */
  columnsRef: React.RefObject<WrapedColumnProps[]>;
  onColumnResize?: (width: number, column: WrapedColumnProps) => void;
  onColumnResizeEnd?: (width: number, column: WrapedColumnProps) => void;
}

const clampWidth = (width: number, column: WrapedColumnProps) => {
  const min = Math.max(column.minWidth ?? DEFAULT_MIN_COLUMN_WIDTH, 0);
  const max = column.maxWidth;
  if (width < min) return min;
  if (max !== undefined && width > max) return max;
  return Math.round(width);
};

/**
 * Pointer (and keyboard) driven column resizing.
 *
 * The table normally lets the browser distribute widths (`width: 100%` with an
 * `auto` layout), which means writing a width onto one column would silently
 * steal space from its neighbours. So the first resize interaction snapshots the
 * rendered width of *every* column; from then on the table is fully px
 * controlled and a drag only moves the column it grabbed.
 */
export default function useColumnResize({
  tableRef,
  columnsRef,
  onColumnResize,
  onColumnResizeEnd,
}: UseColumnResizeOptions) {
  const [resizedWidths, setResizedWidths] = React.useState<
    Record<string, number>
  >({});
  const [resizingKey, setResizingKey] = React.useState<string | null>(null);

  // Callbacks are consumer supplied and usually re-created every render; reading
  // them from a ref keeps `onResizeStart` stable.
  const onColumnResizeRef = useLatest(onColumnResize);
  const onColumnResizeEndRef = useLatest(onColumnResizeEnd);
  const resizedWidthsRef = useLatest(resizedWidths);
  const frameRef = React.useRef(0);
  const teardownRef = React.useRef<(() => void) | null>(null);

  /**
   * Read the rendered width of every column off the `<col>` elements. Returns
   * null when the measurement cannot be trusted, in which case the interaction
   * is abandoned rather than applying a partial snapshot (a partial snapshot
   * would leave holes once the layout switches to `fixed`).
   */
  const snapshotWidths = React.useCallback(() => {
    const columns = columnsRef.current || [];
    const colElements = tableRef.current?.querySelectorAll(
      ':scope > colgroup > col',
    );
    if (!colElements || colElements.length !== columns.length) return null;
    if (!columns.length) return null;

    const snapshot: Record<string, number> = {};
    for (let index = 0; index < columns.length; index += 1) {
      const key = columns[index]?.resizeKey;
      const width = Math.round(
        colElements[index].getBoundingClientRect().width,
      );
      if (!key || !Number.isFinite(width) || width <= 0) return null;
      snapshot[key] = width;
    }
    return snapshot;
  }, [columnsRef, tableRef]);

  const findColumn = React.useCallback(
    (resizeKey: string) =>
      (columnsRef.current || []).find(
        (column) => column.resizeKey === resizeKey,
      ),
    [columnsRef],
  );

  const onResizeStart = React.useCallback(
    (event: React.PointerEvent<HTMLElement>, resizeKey: string) => {
      // Ignore secondary buttons, and never let the drag reach the sorter click
      // handler or start a native text selection.
      if (event.button !== 0) return;
      event.preventDefault();
      event.stopPropagation();

      const column = findColumn(resizeKey);
      if (!column) return;

      const snapshot = snapshotWidths();
      if (!snapshot) return;

      const startX = event.clientX;
      const startWidth = snapshot[resizeKey];
      let latestWidth = startWidth;

      setResizingKey(resizeKey);
      setResizedWidths(snapshot);
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'col-resize';

      const applyWidth = (clientX: number) => {
        const next = clampWidth(startWidth + (clientX - startX), column);
        if (next === latestWidth) return;
        latestWidth = next;
        setResizedWidths((current) => ({ ...current, [resizeKey]: next }));
        onColumnResizeRef.current?.(next, column);
      };

      // pointermove fires far more often than the browser can paint, and every
      // width change relayouts the whole table, so coalesce to one per frame.
      const onPointerMove = (moveEvent: PointerEvent) => {
        const { clientX } = moveEvent;
        if (frameRef.current) cancelAnimationFrame(frameRef.current);
        frameRef.current = requestAnimationFrame(() => {
          frameRef.current = 0;
          applyWidth(clientX);
        });
      };

      // Detaching listeners and restoring the document is split out from `stop`
      // so that unmounting mid-drag can clean up without emitting a resize-end
      // event or touching state on a gone component.
      // Collected as closures so that `teardown` does not have to name the
      // handlers it removes (`stop` is defined after it, and they are mutual).
      const detachers: Array<() => void> = [];
      const bind = (type: string, handler: (event: PointerEvent) => void) => {
        window.addEventListener(type, handler as EventListener);
        detachers.push(() =>
          window.removeEventListener(type, handler as EventListener),
        );
      };

      const teardown = () => {
        if (frameRef.current) {
          cancelAnimationFrame(frameRef.current);
          frameRef.current = 0;
        }
        detachers.forEach((detach) => detach());
        detachers.length = 0;
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
        teardownRef.current = null;
      };

      const stop = () => {
        teardown();
        setResizingKey(null);
        onColumnResizeEndRef.current?.(latestWidth, column);
      };

      teardownRef.current = teardown;
      bind('pointermove', onPointerMove);
      bind('pointerup', stop);
      bind('pointercancel', stop);
    },
    [findColumn, snapshotWidths, onColumnResizeRef, onColumnResizeEndRef],
  );

  /** Keyboard equivalent of a drag, so the handle is operable without a mouse. */
  const onResizeStep = React.useCallback(
    (resizeKey: string, direction: number) => {
      const column = findColumn(resizeKey);
      if (!column) return;

      const base = resizedWidthsRef.current;
      const snapshot = base[resizeKey] === undefined ? snapshotWidths() : base;
      if (!snapshot) return;

      const next = clampWidth(
        snapshot[resizeKey] + direction * KEYBOARD_STEP,
        column,
      );
      if (next === snapshot[resizeKey]) return;

      setResizedWidths({ ...snapshot, [resizeKey]: next });
      onColumnResizeRef.current?.(next, column);
      onColumnResizeEndRef.current?.(next, column);
    },
    [
      findColumn,
      snapshotWidths,
      resizedWidthsRef,
      onColumnResizeRef,
      onColumnResizeEndRef,
    ],
  );

  /**
   * Forget the snapshot. Called when the column set changes: widths keyed to
   * columns that no longer exist would under-report the total table width.
   */
  const resetResizedWidths = React.useCallback(() => {
    setResizedWidths((current) => (Object.keys(current).length ? {} : current));
  }, []);

  // Unmounting mid-drag must not leave listeners or body styles behind.
  React.useEffect(() => () => teardownRef.current?.(), []);

  // Not gated on any `enabled` flag: the state stays empty until something drags,
  // and handles are only rendered for columns that opted in, so an unused Table
  // pays nothing and a column-level `resizable` works with no table-level flag.
  return {
    resizedWidths,
    resizingKey,
    onResizeStart,
    onResizeStep,
    resetResizedWidths,
  };
}
