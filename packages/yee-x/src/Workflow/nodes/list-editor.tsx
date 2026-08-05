import { Button } from '@rainbow-oh/yee-c';
import { Plus, Trash2 } from 'lucide-react';
import React from 'react';
import { DEFAULT_LOCALE, WorkflowContext } from '../context';

const PREFIX = 'yee-workflow-list';

export interface ListEditorProps<T> {
  label: React.ReactNode;
  items: T[];
  disabled?: boolean;
  addText?: string;
  emptyText?: string;
  /**
   * Factory for a newly appended row
   */
  create: () => T;
  onChange: (items: T[]) => void;
  renderItem: (
    item: T,
    update: (patch: Partial<T>) => void,
    index: number,
  ) => React.ReactNode;
}

/**
 * Generic repeatable row editor used by the built-in node forms
 * (start variables, end outputs, condition list, ...).
 */
export function ListEditor<T>({
  label,
  items,
  disabled,
  addText,
  emptyText,
  create,
  onChange,
  renderItem,
}: ListEditorProps<T>) {
  const locale = React.useContext(WorkflowContext)?.locale ?? DEFAULT_LOCALE;
  const resolvedAddText = addText ?? locale.listAdd;
  const resolvedEmptyText = emptyText ?? locale.listEmpty;

  const update = (index: number, patch: Partial<T>) => {
    onChange(
      items.map((item, i) => (i === index ? { ...item, ...patch } : item)),
    );
  };

  return (
    <div className={PREFIX}>
      <div className={`${PREFIX}-header`}>
        <span>{label}</span>
        {!disabled && (
          <Button
            size="small"
            type="text"
            onClick={() => onChange([...items, create()])}
          >
            <Plus size={12} /> {resolvedAddText}
          </Button>
        )}
      </div>
      {items.length ? (
        items.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div className={`${PREFIX}-item`} key={index}>
            <div className={`${PREFIX}-item-body`}>
              {renderItem(item, (patch) => update(index, patch), index)}
            </div>
            {!disabled && (
              <Button
                size="small"
                type="text"
                className={`${PREFIX}-item-remove`}
                onClick={() => onChange(items.filter((_, i) => i !== index))}
              >
                <Trash2 size={12} />
              </Button>
            )}
          </div>
        ))
      ) : (
        <div className={`${PREFIX}-empty`}>{resolvedEmptyText}</div>
      )}
    </div>
  );
}

export default ListEditor;
