import clsx from 'clsx';
import React, { useMemo, useState } from 'react';
import {
  PromptLibraryLocale,
  PromptLibraryProps,
  PromptTemplate,
} from './interface';
import './style/index.less';

const defaultLocale: Required<PromptLibraryLocale> = {
  use: 'Use prompt',
  preview: 'Assembled prompt',
  variablePlaceholder: '{name}',
  templates: 'Templates',
};

// created per call: a module-level /g regex carries lastIndex across parses
const VAR_RE_SOURCE = '\\{\\{\\s*([\\w-]+)\\s*\\}\\}';

type Part = { type: 'text'; text: string } | { type: 'var'; name: string };

function parseTemplate(tpl: string): Array<Part> {
  const parts: Array<Part> = [];
  let last = 0;
  const re = new RegExp(VAR_RE_SOURCE, 'g');
  let m: RegExpExecArray | null;
  while ((m = re.exec(tpl))) {
    if (m.index > last) parts.push({ type: 'text', text: tpl.slice(last, m.index) });
    parts.push({ type: 'var', name: m[1] });
    last = m.index + m[0].length;
  }
  if (last < tpl.length) parts.push({ type: 'text', text: tpl.slice(last) });
  return parts;
}

const PromptLibrary = (props: PromptLibraryProps) => {
  const {
    prefixCls = 'yee-prompt-library',
    className,
    style,
    classNames,
    styles,
    templates,
    value: valueProp,
    defaultId,
    onSelect,
    values: valuesProp,
    defaultValues,
    onValuesChange,
    onUse,
    showPreview = true,
    showList = true,
    locale: localeProp,
  } = props;

  const locale = { ...defaultLocale, ...localeProp };

  const [innerId, setInnerId] = useState<string | undefined>(
    defaultId ?? templates[0]?.id,
  );
  const currentId = valueProp ?? innerId;
  const current = useMemo(
    () => templates.find((t) => t.id === currentId),
    [templates, currentId],
  );

  // templates often arrive async; adopt the first one once it lands
  // (uncontrolled mode only — controlled callers own the selection)
  React.useEffect(() => {
    if (valueProp === undefined && innerId === undefined && templates.length > 0) {
      setInnerId(templates[0].id);
    }
  }, [valueProp, innerId, templates]);

  const [innerValues, setInnerValues] = useState<Record<string, string>>(
    defaultValues ?? {},
  );
  const values = valuesProp ?? innerValues;

  // a template swap (parent-driven or via select) must not leak values from
  // the previous template when variable names collide; the ref starts at the
  // initial template so defaultValues survive first mount
  const lastTemplateIdRef = React.useRef<string | undefined>(currentId);
  React.useEffect(() => {
    if (current?.id !== lastTemplateIdRef.current) {
      lastTemplateIdRef.current = current?.id;
      setInnerValues({});
    }
  }, [current?.id]);

  const parts = useMemo(
    () => (current ? parseTemplate(current.template) : []),
    [current],
  );
  const variables = useMemo(
    () => parts.filter((p): p is Extract<Part, { type: 'var' }> => p.type === 'var')
      .map((p) => p.name)
      .filter((name, i, arr) => arr.indexOf(name) === i),
    [parts],
  );

  const setValue = (name: string, v: string) => {
    const next = { ...values, [name]: v };
    setInnerValues(next);
    if (current) onValuesChange?.(next, current);
  };

  const select = (template: PromptTemplate) => {
    if (template.id === currentId) return;
    setInnerId(template.id);
    setInnerValues({});
    onSelect?.(template);
    onValuesChange?.({}, template);
  };

  const assembled = useMemo(
    () =>
      parts
        .map((p) =>
          p.type === 'text'
            ? p.text
            : values[p.name]?.trim()
              ? values[p.name]
              : `{{${p.name}}}`,
        )
        .join(''),
    [parts, values],
  );

  const allFilled = variables.every((name) => values[name]?.trim());

  const handleUse = () => {
    if (!current || !allFilled) return;
    onUse?.(assembled, current);
  };

  return (
    <div
      className={clsx(prefixCls, className, classNames?.root)}
      style={{ ...style, ...styles?.root }}
    >
      {showList && (
        <div
          className={clsx(`${prefixCls}-list`, classNames?.list)}
          style={styles?.list}
          role="listbox"
          aria-label={locale.templates}
        >
          {templates.map((template) => (
            <button
              key={template.id}
              type="button"
              role="option"
              aria-selected={template.id === currentId}
              className={clsx(
                `${prefixCls}-item`,
                template.id === currentId && 'active',
                classNames?.item,
              )}
              style={styles?.item}
              onClick={() => select(template)}
            >
              {template.icon && (
                <span
                  className={clsx(`${prefixCls}-item-icon`, classNames?.['item-icon'])}
                  style={styles?.['item-icon']}
                >
                  {template.icon}
                </span>
              )}
              <span className={`${prefixCls}-item-main`}>
                <span
                  className={clsx(`${prefixCls}-item-title`, classNames?.['item-title'])}
                  style={styles?.['item-title']}
                >
                  {template.title}
                </span>
                {template.description && (
                  <span
                    className={clsx(`${prefixCls}-item-desc`, classNames?.['item-desc'])}
                    style={styles?.['item-desc']}
                  >
                    {template.description}
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>
      )}

      {current && (
        <div className={clsx(`${prefixCls}-editor`, classNames?.editor)} style={styles?.editor}>
          {parts.map((part, i) =>
            part.type === 'text' ? (
              <React.Fragment key={`t-${i}`}>{part.text}</React.Fragment>
            ) : (
              <input
                key={`v-${i}-${part.name}`}
                className={clsx(`${prefixCls}-var-input`, classNames?.['var-input'])}
                value={values[part.name] ?? ''}
                placeholder={locale.variablePlaceholder.replace('{name}', part.name)}
                aria-label={part.name}
                spellCheck={false}
                onChange={(e) => setValue(part.name, e.target.value)}
                data-var={part.name}
                style={{
                  width: `calc(${Math.max(part.name.length, (values[part.name] ?? '').length) + 2}ch)`,
                  ...styles?.['var-input'],
                }}
              />
            ),
          )}
        </div>
      )}

      {current && showPreview && (
        <div className={clsx(`${prefixCls}-preview`, classNames?.preview)} style={styles?.preview}>
          <span className={clsx(`${prefixCls}-preview-label`, classNames?.['preview-label'])} style={styles?.['preview-label']}>
            {locale.preview}
          </span>
          <div className={clsx(`${prefixCls}-preview-text`, classNames?.['preview-text'])} style={styles?.['preview-text']}>
            {assembled}
          </div>
        </div>
      )}

      {current && (
        <div className={clsx(`${prefixCls}-footer`, classNames?.footer)} style={styles?.footer}>
          <button
            type="button"
            className={clsx(`${prefixCls}-use-btn`, classNames?.['use-btn'])}
            style={styles?.['use-btn']}
            disabled={!allFilled}
            onClick={handleUse}
          >
            {locale.use}
          </button>
        </div>
      )}
    </div>
  );
};

export default PromptLibrary;
