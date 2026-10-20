import { useEffect, useState } from 'react';
import useEvent from './useEvent';

export interface UseEscProps {
  /**
   * Callback when ESC key is pressed
   */
  onEsc?: (event: KeyboardEvent) => void;
  /**
   * Control whether ESC listener is enabled
   * @default true
   */
  enabled?: boolean;
}

// 层级栈：所有 useEsc 监听都挂在 document 上，同一 keydown 会触发全部 handler。
// 按启用顺序压栈，Esc 只响应最后启用（最上层）的那一个 —— 弹层内再开
// 筛选/下拉/抽屉时，第一次 Esc 只关最上层，再按才逐层关闭。
let escSeq = 0;
const escLayers: number[] = [];

/**
 * Hook for listening to ESC key press
 *
 * @example
 * ```tsx
 * useEsc({
 *   onEsc: () => {
 *     // Handle ESC key logic
 *     closeModal();
 *   }
 * });
 * ```
 */
export default function useEsc({ onEsc, enabled = true }: UseEscProps = {}) {
  const handleEsc = useEvent(onEsc || (() => {}));

  const [id] = useState(() => ++escSeq);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    escLayers.push(id);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && escLayers[escLayers.length - 1] === id) {
        event.preventDefault();
        handleEsc(event);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      const index = escLayers.lastIndexOf(id);
      if (index !== -1) {
        escLayers.splice(index, 1);
      }
    };
  }, [enabled, handleEsc, id]);
}
