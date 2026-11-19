import clsx from 'clsx';
import React, { useMemo, useState } from 'react';
import { InlineDiffLocale, InlineDiffProps } from './interface';
import './style/index.less';

const defaultLocale: Required<InlineDiffLocale> = {
  acceptAll: 'Accept all',
  rejectAll: 'Reject all',
  reset: 'Reset',
  pendingHint: 'Click to accept, again to reject',
  acceptedHint: 'Accepted — click to reset',
  rejectedHint: 'Rejected — click to reset',
};

type RawOp = { type: 'equal' | 'del' | 'ins'; text: string };

export type DiffSegment =
  | { kind: 'equal'; text: string }
  | { kind: 'change'; id: string; before: string; after: string };

/** Token budget for the O(n·m) LCS table; beyond it the whole texts become one change */
const MAX_TOKENS = 1000;

function tokenize(text: string): Array<string> {
  return text.split(/(\s+)/).filter((t) => t.length > 0);
}

function diffWords(original: string, modified: string): Array<DiffSegment> {
  const aAll = tokenize(original);
  const bAll = tokenize(modified);

  let ops: Array<RawOp>;

  // beyond the LCS budget, degrade to one whole-text change instead of
  // silently dropping the tail of the text
  if (aAll.length > MAX_TOKENS || bAll.length > MAX_TOKENS) {
    ops = [
      { type: 'del', text: original },
      { type: 'ins', text: modified },
    ];
  } else {
    const a = aAll;
    const b = bAll;
    const n = a.length;
    const m = b.length;
    // LCS table, row by row
    const dp: Array<Uint32Array> = Array.from(
      { length: n + 1 },
      () => new Uint32Array(m + 1),
    );
    for (let i = n - 1; i >= 0; i--) {
      for (let j = m - 1; j >= 0; j--) {
        dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }

    ops = [];
    let i = 0;
    let j = 0;
    const push = (type: RawOp['type'], text: string) => {
      const last = ops[ops.length - 1];
      if (last && last.type === type) last.text += text;
      else ops.push({ type, text });
    };
    while (i < n && j < m) {
      if (a[i] === b[j]) {
        push('equal', a[i]);
        i++;
        j++;
      } else if (dp[i + 1][j] >= dp[i][j + 1]) {
        push('del', a[i]);
        i++;
      } else {
        push('ins', b[j]);
        j++;
      }
    }
    while (i < n) {
      push('del', a[i]);
      i++;
    }
    while (j < m) {
      push('ins', b[j]);
      j++;
    }
  }

  // merge del/ins runs into change segments
  const raw: Array<DiffSegment> = [];
  let changeId = 0;
  let k = 0;
  while (k < ops.length) {
    const op = ops[k];
    if (op.type === 'equal') {
      raw.push({ kind: 'equal', text: op.text });
      k++;
      continue;
    }
    let before = '';
    let after = '';
    while (k < ops.length && ops[k].type === 'del') {
      before += ops[k].text;
      k++;
    }
    while (k < ops.length && ops[k].type === 'ins') {
      after += ops[k].text;
      k++;
    }
    raw.push({ kind: 'change', id: String(changeId++), before, after });
  }

  // changes separated only by whitespace belong together (word-boundary noise)
  const segments: Array<DiffSegment> = [];
  let pendingEquals: Array<string> = [];
  const flushEquals = () => {
    if (pendingEquals.length) {
      segments.push({ kind: 'equal', text: pendingEquals.join('') });
      pendingEquals = [];
    }
  };
  for (const seg of raw) {
    if (seg.kind === 'equal') {
      pendingEquals.push(seg.text);
      continue;
    }
    const gapIsWhitespace =
      segments.length > 0 &&
      pendingEquals.length > 0 &&
      pendingEquals.every((t) => t.trim() === '');
    if (gapIsWhitespace) {
      const prev = segments[segments.length - 1] as Extract<DiffSegment, { kind: 'change' }>;
      const gap = pendingEquals.join('');
      prev.before += gap + seg.before;
      prev.after += gap + seg.after;
    } else {
      flushEquals();
      segments.push(seg);
    }
    pendingEquals = [];
  }
  flushEquals();
  return segments;
}

function resolvedText(segments: Array<DiffSegment>, decisions: Record<string, 'accepted' | 'rejected'>): string {
  return segments
    .map((seg) => {
      if (seg.kind === 'equal') return seg.text;
      if (decisions[seg.id] === 'accepted') return seg.after;
      return seg.before;
    })
    .join('');
}

const InlineDiff = (props: InlineDiffProps) => {
  const {
    prefixCls = 'yee-inline-diff',
    className,
    style,
    classNames,
    styles,
    original,
    modified,
    decisions: decisionsProp,
    defaultDecisions = {},
    onDecide,
    onResolve,
    showToolbar = true,
    locale: localeProp,
  } = props;

  const locale = { ...defaultLocale, ...localeProp };

  const segments = useMemo(() => diffWords(original, modified), [original, modified]);
  const changes = useMemo(
    () => segments.filter((seg): seg is Extract<DiffSegment, { kind: 'change' }> => seg.kind === 'change'),
    [segments],
  );

  const [innerDecisions, setInnerDecisions] = useState<Record<string, 'accepted' | 'rejected'>>(
    defaultDecisions,
  );
  const decisions = decisionsProp ?? innerDecisions;

  // report the resolved text whenever it actually changes (not on mount).
  // Comparing text — not the decisions object — keeps inline `decisions={{}}`
  // literals from firing onResolve on every parent render.
  const mounted = React.useRef(false);
  const lastResolved = React.useRef<string | null>(null);
  const onResolveRef = React.useRef(onResolve);
  React.useEffect(() => {
    onResolveRef.current = onResolve;
  });
  React.useEffect(() => {
    const text = resolvedText(segments, decisions);
    if (!mounted.current) {
      mounted.current = true;
      lastResolved.current = text;
      return;
    }
    if (text !== lastResolved.current) {
      lastResolved.current = text;
      onResolveRef.current?.(text);
    }
  }, [decisions, segments]);

  const setAll = (decision: 'accepted' | 'rejected' | undefined) => {
    const next: Record<string, 'accepted' | 'rejected'> = {};
    changes.forEach((seg) => {
      if (decision) next[seg.id] = decision;
    });
    setInnerDecisions(next);
    if (decision) {
      changes.forEach((seg) => onDecide?.(seg.id, decision));
    } else {
      changes.forEach((seg) => onDecide?.(seg.id, undefined));
    }
  };

  const cycle = (id: string) => {
    const current = decisions[id];
    const next = current === undefined ? 'accepted' : current === 'accepted' ? 'rejected' : undefined;
    if (next) {
      setInnerDecisions((prev) => ({ ...prev, [id]: next }));
      onDecide?.(id, next);
    } else {
      // derive from the effective decisions, not the (possibly stale)
      // uncontrolled shadow state
      const rest = { ...decisions };
      delete rest[id];
      setInnerDecisions(rest);
      onDecide?.(id, undefined);
    }
  };

  const hasChanges = changes.length > 0;

  const changeKeyDown = (id: string) => (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      cycle(id);
    }
  };

  const renderSegment = (seg: DiffSegment, i: number) => {
    if (seg.kind === 'equal') {
      return <React.Fragment key={`eq-${i}`}>{seg.text}</React.Fragment>;
    }
    const decision = decisions[seg.id];
    if (decision === 'accepted') {
      return (
        <span
          key={seg.id}
          className={clsx(`${prefixCls}-resolved`, `${prefixCls}-accepted`, classNames?.ins)}
          style={styles?.ins}
          title={locale.acceptedHint}
          onClick={() => cycle(seg.id)}
          onKeyDown={changeKeyDown(seg.id)}
          tabIndex={0}
          role="button"
        >
          {seg.after}
        </span>
      );
    }
    if (decision === 'rejected') {
      return (
        <span
          key={seg.id}
          className={clsx(`${prefixCls}-resolved`, `${prefixCls}-rejected`, classNames?.del)}
          style={styles?.del}
          title={locale.rejectedHint}
          onClick={() => cycle(seg.id)}
          onKeyDown={changeKeyDown(seg.id)}
          tabIndex={0}
          role="button"
        >
          {seg.before}
        </span>
      );
    }
    return (
      <span
        key={seg.id}
        className={clsx(`${prefixCls}-pending`, classNames?.text)}
        style={styles?.text}
        title={locale.pendingHint}
        onClick={() => cycle(seg.id)}
        onKeyDown={changeKeyDown(seg.id)}
        tabIndex={0}
        role="button"
      >
        {seg.before && (
          <del className={clsx(`${prefixCls}-del`, classNames?.del)} style={styles?.del}>
            {seg.before}
          </del>
        )}
        {seg.after && (
          <ins className={clsx(`${prefixCls}-ins`, classNames?.ins)} style={styles?.ins}>
            {seg.after}
          </ins>
        )}
      </span>
    );
  };

  return (
    <div className={clsx(prefixCls, className, classNames?.root)} style={{ ...style, ...styles?.root }}>
      {showToolbar && hasChanges && (
        <div className={clsx(`${prefixCls}-toolbar`, classNames?.toolbar)} style={styles?.toolbar}>
          <button type="button" onClick={() => setAll('accepted')}>
            {locale.acceptAll}
          </button>
          <button type="button" onClick={() => setAll('rejected')}>
            {locale.rejectAll}
          </button>
          <button type="button" onClick={() => setAll(undefined)}>
            {locale.reset}
          </button>
        </div>
      )}
      <div className={clsx(`${prefixCls}-text`, classNames?.text)} style={styles?.text}>
        {segments.map(renderSegment)}
      </div>
    </div>
  );
};

export default InlineDiff;
