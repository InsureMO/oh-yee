// Test-environment mock for motion/react.
//
// jsdom cannot run real animations, while component tests rely on fake timers
// and assert that elements are removed from the DOM immediately (message,
// notice, ...). The real library keeps nodes mounted during its exit
// animation, which would break those assertions and make tests timing-flaky.
//
// vi.mock factories are hoisted, so everything below must be self-contained.

import React from 'react';
import { vi } from 'vitest';

type MotionProps = Record<string, unknown>;

type MotionLifecycleProps = {
  onAnimationStart?: () => void;
  onAnimationComplete?: (definition?: unknown) => void;
  children?: React.ReactNode;
  // Literal keys win over the index signature, so the lifecycle callbacks
  // keep their function types while the rest spreads onto the DOM node.
  [key: string]: unknown;
};

// Strip motion-only props before spreading the rest onto the DOM node.
const MOTION_ONLY_PROPS = [
  'initial',
  'animate',
  'exit',
  'transition',
  'variants',
  'layout',
  'layoutId',
  'whileHover',
  'whileTap',
  'whileFocus',
  'whileInView',
  'whileDrag',
  'onLayoutAnimationStart',
  'onLayoutAnimationComplete',
  'custom',
];

const stripMotionProps = (props: MotionProps): Record<string, unknown> => {
  const domProps: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(props)) {
    if (!MOTION_ONLY_PROPS.includes(key)) {
      domProps[key] = value;
    }
  }
  return domProps;
};

const createMotionComponent = (tag: string) =>
  React.forwardRef<HTMLElement, MotionProps>((props, ref) => {
    const { onAnimationStart, onAnimationComplete, ...rest } =
      props as MotionLifecycleProps;
    React.useEffect(() => {
      // Animations complete instantly under the mock: fire the lifecycle
      // callbacks on the commit after the animated values change, the same
      // ordering real animations provide (start → complete).
      onAnimationStart?.();
      onAnimationComplete?.();
    });
    return React.createElement(tag, { ...stripMotionProps(rest), ref });
  });

// Cache one component per tag: a fresh component type on every proxy access
// would remount the subtree on each render and restart effects inside it.
const componentCache = new Map<string, React.ComponentType<MotionProps>>();

const getMotionComponent = (tag: string) => {
  if (!componentCache.has(tag)) {
    componentCache.set(tag, createMotionComponent(tag));
  }
  return componentCache.get(tag);
};

vi.mock('motion/react', () => ({
  // Renders children as-is: entries removed from the list disappear instantly.
  AnimatePresence: ({ children }: MotionProps) => children,
  // Proxy so every motion.* element (motion.div, motion.span, ...) resolves
  // to a passthrough component without enumerating tags up front.
  motion: new Proxy(
    {},
    {
      get: (_target: unknown, tag: string) =>
        typeof tag === 'string' ? getMotionComponent(tag) : undefined,
    },
  ),
  MotionConfig: ({ children }: MotionProps) => children,
  useAnimate: () => [vi.fn(), vi.fn()],
  useAnimationFrame: vi.fn(),
  useMotionValue: (initial: unknown) => React.useRef(initial),
  useReducedMotion: () => false,
  useTransform: (value: unknown) => value,
}));
