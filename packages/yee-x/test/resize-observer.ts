/**
 * jsdom lacks ResizeObserver, which @rc-component/trigger (Popover menus)
 * requires. Minimal no-op stub — layout observation isn't exercised in tests.
 */
class ResizeObserverMock {
  observe() {}

  unobserve() {}

  disconnect() {}
}

if (typeof globalThis.ResizeObserver === 'undefined') {
  (globalThis as Record<string, unknown>).ResizeObserver = ResizeObserverMock;
}
