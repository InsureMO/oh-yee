import clsx from 'clsx';
import {
  Check,
  ChevronDown,
  ChevronUp,
  CircleDashed,
  Loader2,
  Minus,
  Plus,
  RotateCcw,
  Trash2,
  X,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { formatSeconds } from '../utils/duration';
import { PlanCardLocale, PlanCardProps, PlanStep, PlanStepStatus } from './interface';
import './style/index.less';

const defaultLocale: Required<PlanCardLocale> = {
  run: 'Run plan',
  cancel: 'Cancel',
  addStep: 'Add step',
  retry: 'Retry',
  titlePlaceholder: 'Step title',
  newStep: 'New step',
  collapse: 'Collapse',
  expand: 'Expand',
};

const StepStatusIcon: React.FC<{ status: PlanStepStatus; spinCls: string }> = ({
  status,
  spinCls,
}) => {
  switch (status) {
    case 'success':
      return <Check size={12} />;
    case 'error':
      return <X size={12} />;
    case 'skipped':
      return <Minus size={12} />;
    case 'running':
      return <Loader2 size={12} className={spinCls} />;
    default:
      return <CircleDashed size={12} />;
  }
};

const PlanCard = (props: PlanCardProps) => {
  const {
    prefixCls = 'yee-plan-card',
    className,
    style,
    classNames,
    styles,
    steps: stepsProp,
    mode = 'review',
    title,
    collapsible = false,
    collapsed: collapsedProp,
    defaultCollapsed = false,
    onCollapseChange,
    editable = true,
    onStepsChange,
    onConfirm,
    onCancel,
    current,
    startedAt,
    onStepRetry,
    onStepClick,
    locale: localeProp,
  } = props;

  const locale = { ...defaultLocale, ...localeProp };
  const run = mode === 'run';

  // ---- steps ----
  const [innerSteps, setInnerSteps] = useState(stepsProp);
  useEffect(() => {
    setInnerSteps(stepsProp);
  }, [stepsProp]);

  const commit = (next: Array<PlanStep>) => {
    setInnerSteps(next);
    onStepsChange?.(next);
  };

  // ---- rename ----
  // tracked by step object identity (not index), so removing or reordering
  // another step mid-rename can't retarget the edit
  const [renamingStep, setRenamingStep] = useState<PlanStep | null>(null);
  const [draft, setDraft] = useState('');

  const move = (from: number, to: number) => {
    if (from === to || to < 0 || to >= innerSteps.length) return;
    const next = [...innerSteps];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    commit(next);
  };

  const removeAt = (i: number) => {
    commit(innerSteps.filter((_, index) => index !== i));
  };

  const addStep = () => {
    const appended: PlanStep = { title: locale.newStep };
    commit([...innerSteps, appended]);
    setRenamingStep(appended);
    setDraft(locale.newStep);
  };

  const commitRename = () => {
    if (!renamingStep) return;
    const nextTitle = draft.trim();
    setRenamingStep(null);
    // the step may have been removed while editing — drop the edit then
    const idx = innerSteps.indexOf(renamingStep);
    if (idx < 0 || !nextTitle || nextTitle === renamingStep.title) return;
    commit(
      innerSteps.map((step, i) => (i === idx ? { ...step, title: nextTitle } : step)),
    );
  };

  // ---- drag & drop reorder ----
  const dragFrom = useRef<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const handleDrop = (i: number) => {
    const from = dragFrom.current;
    dragFrom.current = null;
    setOverIndex(null);
    if (from !== null && from !== i) move(from, i);
  };

  // ---- live timer for the running step ----
  const [elapsed, setElapsed] = useState(0);
  const liveTimer = run && startedAt !== undefined;

  useEffect(() => {
    if (!liveTimer) return;
    setElapsed((Date.now() - startedAt) / 1000);
    const timer = setInterval(() => {
      setElapsed((Date.now() - startedAt) / 1000);
    }, 1000);
    return () => clearInterval(timer);
  }, [liveTimer, startedAt]);

  // ---- collapse ----
  const [innerCollapsed, setInnerCollapsed] = useState(defaultCollapsed);
  const collapsed = collapsedProp ?? innerCollapsed;

  const toggleCollapsed = () => {
    const next = !collapsed;
    setInnerCollapsed(next);
    onCollapseChange?.(next);
  };

  const statusOf = (step: PlanStep, i: number): PlanStepStatus => {
    if (step.status) return step.status;
    if (!run || current === undefined) return 'pending';
    if (i < current) return 'success';
    if (i === current) return 'running';
    return 'pending';
  };

  const showHeader = Boolean(title) || collapsible;
  const showBody = !collapsed;
  const showFooter = !run && (Boolean(onConfirm) || Boolean(onCancel));
  const editableNow = !run && editable;

  return (
    <div
      className={clsx(prefixCls, className, classNames?.root)}
      style={{ ...style, ...styles?.root }}
    >
      {showHeader && (
        <div className={clsx(`${prefixCls}-header`, classNames?.header)} style={styles?.header}>
          {title && (
            <span className={clsx(`${prefixCls}-title`, classNames?.title)} style={styles?.title}>
              {title}
            </span>
          )}
          {collapsible && (
            <span
              className={clsx(`${prefixCls}-collapse`, collapsed && 'folded', classNames?.collapse)}
              style={styles?.collapse}
              role="button"
              aria-label={collapsed ? locale.expand : locale.collapse}
              onClick={toggleCollapsed}
            >
              <ChevronDown size={14} />
            </span>
          )}
        </div>
      )}

      {showBody && (
        <div className={clsx(`${prefixCls}-body`, classNames?.body)} style={styles?.body}>
          {innerSteps.map((step, i) => {
            const status = statusOf(step, i);
            const isRenaming = renamingStep === step;
            const isRunning = status === 'running';
            return (
              <div
                key={step.key ?? i}
                className={clsx(
                  `${prefixCls}-step`,
                  `${prefixCls}-step-${status}`,
                  overIndex === i && 'drag-over',
                  classNames?.step,
                )}
                style={styles?.step}
                onClick={() => onStepClick?.(i)}
                onDragOver={
                  editableNow
                    ? (e) => {
                        e.preventDefault();
                        setOverIndex(i);
                      }
                    : undefined
                }
                onDrop={
                  editableNow
                    ? (e) => {
                        e.preventDefault();
                        handleDrop(i);
                      }
                    : undefined
                }
              >
                <span
                  className={clsx(`${prefixCls}-step-index`, classNames?.['step-index'])}
                  style={styles?.['step-index']}
                >
                  {run ? (
                    <StepStatusIcon status={status} spinCls={`${prefixCls}-spin`} />
                  ) : (
                    i + 1
                  )}
                </span>

                <div className={`${prefixCls}-step-main`}>
                  {isRenaming ? (
                    <input
                      className={clsx(`${prefixCls}-step-input`, classNames?.['step-title'])}
                      style={styles?.['step-title']}
                      value={draft}
                      placeholder={locale.titlePlaceholder}
                      autoFocus
                      onChange={(e) => setDraft(e.target.value)}
                      onBlur={commitRename}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') commitRename();
                        if (e.key === 'Escape') setRenamingStep(null);
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <span
                      className={clsx(`${prefixCls}-step-title`, classNames?.['step-title'])}
                      style={styles?.['step-title']}
                      onClick={
                        editableNow
                          ? (e) => {
                              e.stopPropagation();
                              setRenamingStep(step);
                              setDraft(step.title);
                            }
                          : undefined
                      }
                    >
                      {step.title}
                    </span>
                  )}
                  {step.description && (
                    <span
                      className={clsx(`${prefixCls}-step-desc`, classNames?.['step-desc'])}
                      style={styles?.['step-desc']}
                    >
                      {step.description}
                    </span>
                  )}
                </div>

                {run && isRunning && startedAt !== undefined && (
                  <span
                    className={clsx(`${prefixCls}-step-duration`, classNames?.['step-duration'])}
                    style={styles?.['step-duration']}
                  >
                    {formatSeconds(Math.floor(elapsed))}
                  </span>
                )}
                {step.duration !== undefined && (status === 'success' || status === 'error') && (
                  <span
                    className={clsx(`${prefixCls}-step-duration`, classNames?.['step-duration'])}
                    style={styles?.['step-duration']}
                  >
                    {formatSeconds(step.duration)}
                  </span>
                )}

                {run && status === 'error' && onStepRetry && (
                  <button
                    type="button"
                    className={`${prefixCls}-step-retry`}
                    aria-label={locale.retry}
                    title={locale.retry}
                    onClick={(e) => {
                      e.stopPropagation();
                      onStepRetry(i);
                    }}
                  >
                    <RotateCcw size={12} />
                  </button>
                )}

                {editableNow && (
                  <span
                    className={clsx(`${prefixCls}-step-actions`, classNames?.['step-actions'])}
                    style={styles?.['step-actions']}
                  >
                    <button
                      type="button"
                      aria-label="Move up"
                      disabled={i === 0}
                      onClick={(e) => {
                        e.stopPropagation();
                        move(i, i - 1);
                      }}
                    >
                      <ChevronUp size={12} />
                    </button>
                    <button
                      type="button"
                      aria-label="Move down"
                      disabled={i === innerSteps.length - 1}
                      onClick={(e) => {
                        e.stopPropagation();
                        move(i, i + 1);
                      }}
                    >
                      <ChevronDown size={12} />
                    </button>
                    <button
                      type="button"
                      aria-label="Remove step"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeAt(i);
                      }}
                    >
                      <Trash2 size={12} />
                    </button>
                    <span
                      className={`${prefixCls}-drag`}
                      draggable
                      aria-label="Drag to reorder"
                      onDragStart={(e) => {
                        dragFrom.current = i;
                        e.dataTransfer.effectAllowed = 'move';
                        e.dataTransfer.setData('text/plain', String(i));
                      }}
                      onDragEnd={() => {
                        dragFrom.current = null;
                        setOverIndex(null);
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      ⠿
                    </span>
                  </span>
                )}
              </div>
            );
          })}

          {editableNow && (
            <button
              type="button"
              className={clsx(`${prefixCls}-add-step`, classNames?.['add-step'])}
              style={styles?.['add-step']}
              onClick={addStep}
            >
              <Plus size={12} />
              {locale.addStep}
            </button>
          )}
        </div>
      )}

      {showFooter && (
        <div className={clsx(`${prefixCls}-footer`, classNames?.footer)} style={styles?.footer}>
          {onCancel && (
            <button type="button" className={`${prefixCls}-btn`} onClick={onCancel}>
              {locale.cancel}
            </button>
          )}
          {onConfirm && (
            <button
              type="button"
              className={`${prefixCls}-btn ${prefixCls}-btn-primary`}
              onClick={() => onConfirm(innerSteps)}
            >
              {locale.run}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PlanCard;
