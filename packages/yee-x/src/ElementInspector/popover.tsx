import { Button } from '@rainbow-oh/yee-c';
import clsx from 'clsx';
import { Check, Copy, X } from 'lucide-react';
import React from 'react';
import { createPortal } from 'react-dom';
import type { ElementInfo } from './interface';
import { copyToClipboard } from './prompt';

export interface PickerPopoverProps {
  info: ElementInfo;
  prompt: string;
  prefixCls: string;
  theme: 'light' | 'dark';
  copiedText: string;
  onCopy?: (info: ElementInfo, prompt: string) => void;
  onClose: () => void;
}

type CopyStatus = 'idle' | 'copied' | 'failed';

const GAP = 8;
const AUTO_CLOSE_MS = 900;

/**
 * Anchored read-only popover that shows the generated prompt for the most
 * recent pick, plus a Copy button. Positioned next to the picked element
 * (flipping/clamping to stay within the viewport) and repositioned on scroll /
 * resize. Never covers the element it describes.
 *
 * Mounted only while a pick result is open; rendered through a portal so it
 * overlays the whole document.
 */
const PickerPopover: React.FC<PickerPopoverProps> = ({
  info,
  prompt,
  prefixCls,
  theme,
  copiedText,
  onCopy,
  onClose,
}) => {
  const popoverRef = React.useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = React.useState<{
    top: number;
    left: number;
  } | null>(null);
  const [status, setStatus] = React.useState<CopyStatus>('idle');

  const measure = React.useCallback(() => {
    const node = popoverRef.current;
    if (!node) {
      return;
    }
    const rect = info.element.getBoundingClientRect();
    const popoverWidth = node.offsetWidth;
    const popoverHeight = node.offsetHeight;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Prefer below the element; flip above when it would overflow.
    let top = rect.bottom + GAP;
    if (top + popoverHeight > viewportHeight - GAP) {
      const above = rect.top - popoverHeight - GAP;
      top =
        above >= GAP
          ? above
          : Math.max(GAP, viewportHeight - popoverHeight - GAP);
    }
    // Center on the element, clamped to the viewport.
    let left = rect.left + rect.width / 2 - popoverWidth / 2;
    left = Math.max(GAP, Math.min(left, viewportWidth - popoverWidth - GAP));

    setPosition({ top, left });
  }, [info.element]);

  React.useLayoutEffect(() => {
    measure();
  }, [measure]);

  React.useEffect(() => {
    const handleReposition = () => measure();
    window.addEventListener('scroll', handleReposition, true);
    window.addEventListener('resize', handleReposition);
    return () => {
      window.removeEventListener('scroll', handleReposition, true);
      window.removeEventListener('resize', handleReposition);
    };
  }, [measure]);

  const handleCopy = () => {
    if (onCopy) {
      onCopy(info, prompt);
      onClose();
      return;
    }
    copyToClipboard(prompt).then((ok) => {
      if (ok) {
        setStatus('copied');
        window.setTimeout(onClose, AUTO_CLOSE_MS);
      } else {
        setStatus('failed');
      }
    });
  };

  if (typeof document === 'undefined') {
    return null;
  }

  const label =
    status === 'copied'
      ? copiedText
      : status === 'failed'
      ? 'Copy failed — select text manually'
      : 'Copy';

  return createPortal(
    <div
      ref={popoverRef}
      className={clsx(
        `${prefixCls}-popover`,
        theme === 'dark' && `${prefixCls}-theme-dark`,
      )}
      style={
        position
          ? { top: position.top, left: position.left }
          : { visibility: 'hidden' }
      }
      role="dialog"
      aria-label="Element Inspector prompt"
      data-testid="element-inspector-popover"
    >
      <div className={`${prefixCls}-popover-header`}>
        <span className={`${prefixCls}-popover-title`}>Element Inspector</span>
        <Button
          type="text"
          className={`${prefixCls}-popover-close`}
          aria-label="Close"
          onClick={onClose}
          size="small"
          icon={<X size={14} />}
        />
      </div>
      <pre className={`${prefixCls}-popover-prompt`}>{prompt}</pre>
      <div className={`${prefixCls}-popover-footer`}>
        <Button
          type="primary"
          size="small"
          onClick={handleCopy}
          icon={status === 'copied' ? <Check size={14} /> : <Copy size={14} />}
        >
          {label}
        </Button>
      </div>
    </div>,
    document.body,
  );
};

export default PickerPopover;
