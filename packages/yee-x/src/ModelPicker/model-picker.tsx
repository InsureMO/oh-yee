import { Popover } from '@rainbow-oh/yee-c';
import clsx from 'clsx';
import { Check, ChevronDown, Sparkles } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import {
  AIModel,
  ModelPickerLocale,
  ModelPickerProps,
  ModelPickerSemanticType,
  ThinkingEffort,
} from './interface';
import './style/index.less';

const defaultLocale: Required<ModelPickerLocale> = {
  thinking: 'Extended thinking',
  effort: 'Effort',
  effortLow: 'Low',
  effortMedium: 'Medium',
  effortHigh: 'High',
  metricQuality: 'Quality',
  metricSpeed: 'Speed',
  metricCost: 'Cost',
  trigger: 'Select model',
};

const effortLocaleKey: Record<ThinkingEffort, keyof ModelPickerLocale> = {
  low: 'effortLow',
  medium: 'effortMedium',
  high: 'effortHigh',
};

const clamp = (v: number | undefined) => Math.min(100, Math.max(0, v ?? 0));

const MetricBar: React.FC<{
  prefixCls: string;
  label: string;
  value?: number;
  classNames?: Partial<Record<ModelPickerSemanticType, string>>;
  styles?: Partial<Record<ModelPickerSemanticType, React.CSSProperties>>;
}> = ({ prefixCls, label, value, classNames, styles }) => (
  <span className={clsx(`${prefixCls}-metric`, classNames?.metric)} style={styles?.metric}>
    <span className={clsx(`${prefixCls}-metric-label`, classNames?.['metric-label'])} style={styles?.['metric-label']}>
      {label}
    </span>
    <span className={clsx(`${prefixCls}-metric-bar`, classNames?.['metric-bar'])} style={styles?.['metric-bar']}>
      <span
        className={clsx(`${prefixCls}-metric-fill`, classNames?.['metric-fill'])}
        style={{ ...styles?.['metric-fill'], ['--fill' as string]: `${clamp(value)}%` }}
      />
    </span>
  </span>
);

const ModelPicker = (props: ModelPickerProps) => {
  const {
    prefixCls = 'yee-model-picker',
    className,
    style,
    classNames,
    styles,
    models,
    value: valueProp,
    defaultId,
    onChange,
    thinkingEnabled: thinkingProp,
    defaultThinkingEnabled = false,
    onThinkingChange,
    effort: effortProp,
    defaultEffort = 'medium',
    onEffortChange,
    showMetrics = true,
    disabled,
    renderTrigger,
    locale: localeProp,
  } = props;

  const locale = { ...defaultLocale, ...localeProp };

  const [innerId, setInnerId] = useState<string | undefined>(
    defaultId ?? models[0]?.id,
  );
  const currentId = valueProp ?? innerId;
  const current = useMemo(
    () => models.find((m) => m.id === currentId),
    [models, currentId],
  );

  // models often arrive async; adopt the first one once it lands (uncontrolled
  // mode only — controlled callers own the selection)
  useEffect(() => {
    if (valueProp === undefined && innerId === undefined && models.length > 0) {
      setInnerId(models[0].id);
    }
  }, [valueProp, innerId, models]);

  const [open, setOpen] = useState(false);

  const [innerThinking, setInnerThinking] = useState(defaultThinkingEnabled);
  const thinkingEnabled = thinkingProp ?? innerThinking;

  const [innerEffort, setInnerEffort] = useState<ThinkingEffort>(defaultEffort);
  const effort = effortProp ?? innerEffort;

  const select = (model: AIModel) => {
    setInnerId(model.id);
    onChange?.(model.id, model);
    setOpen(false);
  };

  const groups = useMemo(() => {
    const map = new Map<string, Array<AIModel>>();
    models.forEach((model) => {
      const key = model.group ?? '';
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(model);
    });
    return Array.from(map.entries()).map(([label, items]) => ({ label, items }));
  }, [models]);

  const menu = (
    <div className={clsx(`${prefixCls}-menu`, classNames?.menu)} style={styles?.menu}>
      {groups.map(({ label, items }) => (
        <React.Fragment key={label || 'ungrouped'}>
          {label && (
            <div
              className={clsx(`${prefixCls}-group-label`, classNames?.['group-label'])}
              style={styles?.['group-label']}
            >
              {label}
            </div>
          )}
          {items.map((model) => {
            const selected = model.id === currentId;
            return (
              <button
                key={model.id}
                type="button"
                className={clsx(
                  `${prefixCls}-item`,
                  selected && 'selected',
                  model.disabled && 'disabled',
                  classNames?.item,
                )}
                style={styles?.item}
                disabled={model.disabled}
                onClick={() => select(model)}
              >
                <span className={`${prefixCls}-item-main`}>
                  <span
                    className={clsx(`${prefixCls}-item-name`, classNames?.['item-name'])}
                    style={styles?.['item-name']}
                  >
                    {model.name}
                    {model.thinking && <Sparkles size={12} className={`${prefixCls}-thinking-badge`} />}
                  </span>
                  {model.meta && (
                    <span
                      className={clsx(`${prefixCls}-item-meta`, classNames?.['item-meta'])}
                      style={styles?.['item-meta']}
                    >
                      {model.meta}
                    </span>
                  )}
                </span>
                {showMetrics && (
                  <span
                    className={clsx(`${prefixCls}-metrics`, classNames?.metrics)}
                    style={styles?.metrics}
                  >
                    <MetricBar
                      prefixCls={prefixCls}
                      label={locale.metricQuality}
                      value={model.quality}
                      classNames={classNames}
                      styles={styles}
                    />
                    <MetricBar
                      prefixCls={prefixCls}
                      label={locale.metricSpeed}
                      value={model.speed}
                      classNames={classNames}
                      styles={styles}
                    />
                    <MetricBar
                      prefixCls={prefixCls}
                      label={locale.metricCost}
                      value={model.cost}
                      classNames={classNames}
                      styles={styles}
                    />
                  </span>
                )}
                {selected && <Check size={14} className={`${prefixCls}-item-check`} />}
              </button>
            );
          })}
        </React.Fragment>
      ))}

      {current?.thinking && (
        <div className={`${prefixCls}-menu-footer`}>
          <div
            className={clsx(`${prefixCls}-thinking-row`, classNames?.['thinking-row'])}
            style={styles?.['thinking-row']}
          >
            <button
              type="button"
              role="switch"
              aria-checked={thinkingEnabled}
              aria-label={locale.thinking}
              className={clsx(`${prefixCls}-switch`, thinkingEnabled && 'on')}
              onClick={() => {
                const next = !thinkingEnabled;
                setInnerThinking(next);
                onThinkingChange?.(next);
              }}
            >
              <span className={`${prefixCls}-switch-knob`} />
            </button>
            <span className={`${prefixCls}-thinking-label`}>{locale.thinking}</span>

            {thinkingEnabled && (
              <span className={clsx(`${prefixCls}-effort`, classNames?.effort)} style={styles?.effort}>
                <span className={`${prefixCls}-effort-label`}>{locale.effort}</span>
                {(['low', 'medium', 'high'] as Array<ThinkingEffort>).map((level) => (
                  <button
                    key={level}
                    type="button"
                    className={clsx(
                      `${prefixCls}-effort-option`,
                      effort === level && 'active',
                      classNames?.['effort-option'],
                    )}
                    style={styles?.['effort-option']}
                    aria-pressed={effort === level}
                    onClick={() => {
                      setInnerEffort(level);
                      onEffortChange?.(level);
                    }}
                  >
                    {locale[effortLocaleKey[level]]}
                  </button>
                ))}
              </span>
            )}
          </div>

          {(current.firstToken || current.price) && (
            <div className={clsx(`${prefixCls}-info-row`, classNames?.['info-row'])} style={styles?.['info-row']}>
              {current.firstToken && <span>{current.firstToken}</span>}
              {current.price && <span>{current.price}</span>}
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div
      className={clsx(prefixCls, className, classNames?.root)}
      style={{ ...style, ...styles?.root }}
    >
      <Popover
        trigger="click"
        open={open}
        onOpenChange={setOpen}
        content={menu}
        placement="bottomLeft"
        destroyPopupOnHide
        // clicks inside the menu (thinking toggle, effort) must not close it;
        // picking a model closes it explicitly via setOpen(false)
        hideOnClick={false}
      >
        <button
          type="button"
          className={clsx(`${prefixCls}-trigger`, classNames?.trigger)}
          style={styles?.trigger}
          disabled={disabled}
          aria-label={locale.trigger}
          aria-haspopup="listbox"
          aria-expanded={open}
          onKeyDown={(e) => {
            if (e.key === 'Escape' && open) setOpen(false);
          }}
        >
          {renderTrigger?.(current) ?? (
            <>
              <span
                className={clsx(`${prefixCls}-trigger-name`, classNames?.['trigger-name'])}
                style={styles?.['trigger-name']}
              >
                {current?.name ?? locale.trigger}
              </span>
              <ChevronDown size={14} />
            </>
          )}
        </button>
      </Popover>
    </div>
  );
};

export default ModelPicker;
