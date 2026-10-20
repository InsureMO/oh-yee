// @vitest-environment jsdom
import { cleanup, fireEvent, render } from '@testing-library/react';
import React, { useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Dialog from '../Dialog';
import Popover from '../Popover';

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

// useEsc 层级栈：同一 document keydown 会到达所有已启用监听，
// Esc 必须只关最上层（后启用者），再按才逐层关闭。
describe('useEsc layering', () => {
  it('closes only the topmost layer (popover) on Escape, dialog on the next', () => {
    const onPopoverChange = vi.fn();
    const onDialogCancel = vi.fn();

    function LayeredApp() {
      const [popoverOpen, setPopoverOpen] = useState(true);
      return (
        <Dialog open onCancel={onDialogCancel} keyboard title="dialog">
          <Popover
            trigger="click"
            open={popoverOpen}
            onOpenChange={(open: boolean) => {
              setPopoverOpen(open);
              onPopoverChange(open);
            }}
            content={<div>filter panel</div>}
          >
            <button type="button">trigger</button>
          </Popover>
        </Dialog>
      );
    }

    render(<LayeredApp />);

    // Dialog 先开、Popover 后开 → Popover 是最上层
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onPopoverChange).toHaveBeenCalledWith(false);
    expect(onDialogCancel).not.toHaveBeenCalled();

    // Popover 已关，Esc 落到 Dialog 层
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onDialogCancel).toHaveBeenCalledTimes(1);
  });

  it('closes the dialog when it is the only enabled layer', () => {
    const onDialogCancel = vi.fn();
    render(
      <Dialog open onCancel={onDialogCancel} keyboard title="dialog">
        <div>body</div>
      </Dialog>,
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onDialogCancel).toHaveBeenCalledTimes(1);
  });

  it('ignores Esc for mounted-but-closed layers so they do not swallow the open one', () => {
    const onOpenCancel = vi.fn();
    const onClosedCancel = vi.fn();
    // 关闭态的 Dialog 后挂载：门控缺失时它会占据 esc 栈顶，吃掉打开层的 Esc
    render(
      <>
        <Dialog open onCancel={onOpenCancel} keyboard title="open">
          <div>body</div>
        </Dialog>
        <Dialog open={false} onCancel={onClosedCancel} keyboard title="closed">
          <div>body</div>
        </Dialog>
      </>,
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onOpenCancel).toHaveBeenCalledTimes(1);
    expect(onClosedCancel).not.toHaveBeenCalled();
  });
});
