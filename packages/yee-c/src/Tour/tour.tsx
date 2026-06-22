import clsx from 'clsx';
import { X } from 'lucide-react';
import { motion } from 'motion/react';
import React, {
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import Button from '../Button';
import { GlobalContext } from '../Config-Provider';
import type { Placement } from '../Trigger/interface';
import useEsc from '../hooks/useEsc';
import useLatest from '../hooks/useLatest';
import useMergedState from '../hooks/useMergedState';
import { useLocale } from '../locale';
import mergeContextToProps from '../utils/mergeContextToProps';
import type { TourProps, TourTarget } from './interface';

import './style/index.less';

const GAP = 12;

const resolveTarget = (target: TourTarget | undefined): HTMLElement | null => {
  if (!target) return null;
  if (typeof target === 'function') {
    try {
      return target();
    } catch {
      return null;
    }
  }
  if (typeof target === 'string') {
    if (typeof document === 'undefined') return null;
    return document.querySelector<HTMLElement>(target);
  }
  return target;
};

type TourSide = 'top' | 'bottom' | 'left' | 'right';
type TourAlign = 'start' | 'center' | 'end';

const SIDE_PREFIXES: readonly TourSide[] = ['top', 'bottom', 'left', 'right'];

// Split a 12-way Placement into a base side + cross-axis alignment.
//   'bottom'      -> { side: 'bottom', align: 'center' }
//   'topLeft'     -> { side: 'top',    align: 'start'  }
//   'leftBottom'  -> { side: 'left',   align: 'end'    }
const parsePlacement = (
  p: Placement | undefined,
): { side: TourSide; align: TourAlign } => {
  if (!p) return { side: 'bottom', align: 'center' };
  const side = SIDE_PREFIXES.find((s) => p.startsWith(s)) ?? 'bottom';
  const rest = p.slice(side.length);
  let align: TourAlign = 'center';
  if (side === 'top' || side === 'bottom') {
    if (rest === 'Left') align = 'start';
    else if (rest === 'Right') align = 'end';
  } else if (rest === 'Top') {
    align = 'start';
  } else if (rest === 'Bottom') {
    align = 'end';
  }
  return { side, align };
};

const OPPOSITE_SIDE: Record<TourSide, TourSide> = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
};

// Compute the card's fixed position from the highlight rect + placement, with
// viewport flip + clamp. Returning rect's origin while size is unknown lets the
// caller keep the card hidden until measured.
const computeCardPos = (
  rect: DOMRect,
  placement: Placement | undefined,
  size: { width: number; height: number },
  gap: number,
): { top: number; left: number } => {
  const { width: cw, height: ch } = size;
  const { top, left, width, height } = rect;

  if (cw === 0 || ch === 0) {
    return { top, left };
  }

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const { side: preferredSide, align } = parsePlacement(placement);

  // Lay the card out for a given side; align shifts it along the cross axis.
  const layoutFor = (side: TourSide): { top: number; left: number } => {
    if (side === 'top' || side === 'bottom') {
      const main = side === 'top' ? top - ch - gap : top + height + gap;
      let cross: number;
      if (align === 'start') cross = left;
      else if (align === 'end') cross = left + width - cw;
      else cross = left + width / 2 - cw / 2;
      return { top: main, left: cross };
    }
    const main = side === 'left' ? left - cw - gap : left + width + gap;
    let cross: number;
    if (align === 'start') cross = top;
    else if (align === 'end') cross = top + height - ch;
    else cross = top + height / 2 - ch / 2;
    return { top: cross, left: main };
  };

  // True when the card fits on the main axis for this side.
  const fits = (
    side: TourSide,
    pos: { top: number; left: number },
  ): boolean => {
    if (side === 'top') return pos.top >= gap;
    if (side === 'bottom') return pos.top + ch <= vh - gap;
    if (side === 'left') return pos.left >= gap;
    return pos.left + cw <= vw - gap;
  };

  let side = preferredSide;
  let pos = layoutFor(side);

  // Flip to the opposite side when the preferred one overflows and the
  // opposite fits. Alignment is preserved across the flip.
  const flippedSide = OPPOSITE_SIDE[side];
  const flipped = layoutFor(flippedSide);
  if (!fits(side, pos) && fits(flippedSide, flipped)) {
    side = flippedSide;
    pos = flipped;
  }

  // Clamp into the viewport (mostly fixes cross-axis overflow).
  return {
    top: Math.max(gap, Math.min(pos.top, vh - ch - gap)),
    left: Math.max(gap, Math.min(pos.left, vw - cw - gap)),
  };
};

const Tour: React.FC<TourProps> = (baseprops) => {
  const { tour: tourCtx } = useContext(GlobalContext);
  const props = mergeContextToProps<TourProps>(baseprops, tourCtx);
  const { locale } = useLocale();
  const tourLocale = locale?.tour ?? {
    previous: 'Previous',
    next: 'Next',
    finish: 'Finish',
    skip: 'Skip',
  };

  const {
    prefixCls = 'yee-tour',
    className,
    style,
    classNames,
    styles,
    open,
    steps = [],
    current,
    defaultCurrent = 0,
    onClose,
    onFinish,
    onChange,
    placement = 'bottom',
    mask = true,
    closable = true,
    closeIcon,
    maskClosable = false,
    indicatorsRender,
    scrollIntoViewOptions = true,
    ...rest
  } = props;

  const [mergedCurrent, setMergedCurrent] = useMergedState<number>(
    defaultCurrent,
    {
      value: current,
      defaultValue: defaultCurrent,
    },
  );

  const step = steps[mergedCurrent];
  const total = steps.length;
  const isLast = mergedCurrent >= total - 1;
  const stepPlacement = step?.placement ?? placement;

  const targetEl = useMemo<HTMLElement | null>(
    () => resolveTarget(step?.target),
    [step, open],
  );

  const [rect, setRect] = useState<DOMRect | null>(null);
  const rafRef = useRef<number | null>(null);

  // Keep the latest scrollIntoViewOptions in a ref so the tracking effect below
  // doesn't re-run (and re-scroll) when the caller passes an inline object on
  // every render — that would loop with rAF → setRect → re-render forever.
  const scrollIntoViewOptionsRef = useLatest(scrollIntoViewOptions);

  // Track target rect: recompute on open / step / scroll / resize (rAF throttled).
  useLayoutEffect(() => {
    if (!open || !targetEl) {
      setRect(null);
      return;
    }
    const update = () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setRect(targetEl.getBoundingClientRect() as DOMRect);
      });
    };
    update();
    // Bring the target into view, but only when it isn't already — the default
    // (`true` ≈ `{ block: 'start' }`) would otherwise yank an already-visible
    // element to the top of the viewport on every step change. A custom options
    // object is honored as-is (its own `nearest` alignment handles the visible
    // case), and `false` disables auto-scroll entirely.
    const scrollTargetIfNeeded = () => {
      const opts = scrollIntoViewOptionsRef.current;
      if (opts === false) return;
      if (opts === true) {
        const vr = targetEl.getBoundingClientRect();
        const inViewport =
          vr.top >= 0 &&
          vr.left >= 0 &&
          vr.bottom <= window.innerHeight &&
          vr.right <= window.innerWidth;
        if (inViewport) return;
      }
      try {
        targetEl.scrollIntoView?.(opts as ScrollIntoViewOptions);
      } catch {
        // noop
      }
    };
    scrollTargetIfNeeded();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [open, targetEl, mergedCurrent]);

  useEsc({ enabled: open, onEsc: () => onClose?.() });

  const handleNext = useCallback(() => {
    if (isLast) {
      onFinish?.();
      return;
    }
    const nextCur = mergedCurrent + 1;
    setMergedCurrent(nextCur);
    onChange?.(nextCur);
  }, [isLast, mergedCurrent, onChange, onFinish, setMergedCurrent]);

  const handlePrev = useCallback(() => {
    if (mergedCurrent <= 0) return;
    const prevCur = mergedCurrent - 1;
    setMergedCurrent(prevCur);
    onChange?.(prevCur);
  }, [mergedCurrent, onChange, setMergedCurrent]);

  // Measure the card so we can position it against the highlight rect.
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardSize, setCardSize] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    if (!open) return;
    const node = cardRef.current;
    if (!node) return;
    const r = node.getBoundingClientRect();
    setCardSize({ width: r.width, height: r.height });
  }, [open, step]);

  const cardPos = useMemo(() => {
    if (!cardSize.width || !cardSize.height) return null;
    if (rect) return computeCardPos(rect, stepPlacement, cardSize, GAP);
    // No target: center the card in the viewport.
    return {
      top: window.innerHeight / 2 - cardSize.height / 2,
      left: window.innerWidth / 2 - cardSize.width / 2,
    };
  }, [rect, stepPlacement, cardSize]);

  if (!open || typeof document === 'undefined' || !step) {
    return null;
  }

  return createPortal(
    <div className={clsx(prefixCls, className)} style={style} {...rest}>
      {/* 1 click-intercept mask (box-shadow itself receives no pointer events).
          When there's no target to cut out, the mask dims the full screen. */}
      {mask ? (
        <div
          className={clsx(
            `${prefixCls}-mask`,
            !rect && `${prefixCls}-mask-full`,
          )}
          onClick={maskClosable ? onClose : undefined}
        />
      ) : null}

      {/* 2 highlight cutout via box-shadow, animated between steps */}
      {mask && rect ? (
        <motion.div
          className={clsx(`${prefixCls}-highlight`, classNames?.highlight)}
          initial={false}
          animate={{
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
          }}
          transition={{ type: 'spring', visualDuration: 0.3, bounce: 0.2 }}
          style={styles?.highlight}
        />
      ) : null}

      {/* 3 card: position computed from the highlight rect + placement */}
      <motion.div
        ref={cardRef}
        className={clsx(
          `${prefixCls}-content`,
          classNames?.content,
          step?.className,
        )}
        initial={false}
        animate={
          cardPos
            ? { top: cardPos.top, left: cardPos.left }
            : { top: 0, left: 0 }
        }
        transition={{ type: 'spring', visualDuration: 0.3, bounce: 0.2 }}
        style={{
          position: 'fixed',
          visibility: cardPos ? 'visible' : 'hidden',
          ...(styles?.content as React.CSSProperties),
        }}
      >
        {closable ? (
          <Button
            type="text"
            className={`${prefixCls}-close`}
            onClick={onClose}
            size="small"
            icon={closeIcon ?? <X size={16} />}
            aria-label={tourLocale.skip}
          />
        ) : null}
        {step?.title ? (
          <div
            className={clsx(`${prefixCls}-header`, classNames?.header)}
            style={styles?.header}
          >
            {step.title}
          </div>
        ) : null}
        <div
          className={clsx(`${prefixCls}-body`, classNames?.body)}
          style={styles?.body}
        >
          {step?.description}
        </div>
        <div
          className={clsx(`${prefixCls}-footer`, classNames?.footer)}
          style={styles?.footer}
        >
          <span className={`${prefixCls}-indicators`}>
            {indicatorsRender
              ? indicatorsRender(mergedCurrent, total)
              : `${mergedCurrent + 1} / ${total}`}
          </span>
          <span className={`${prefixCls}-buttons`}>
            {mergedCurrent > 0 ? (
              <Button size="small" onClick={handlePrev}>
                {tourLocale.previous}
              </Button>
            ) : null}
            <Button type="primary" size="small" onClick={handleNext}>
              {isLast ? tourLocale.finish : tourLocale.next}
            </Button>
          </span>
        </div>
      </motion.div>
    </div>,
    document.body,
  );
};

Tour.displayName = 'Tour';

export default Tour;
