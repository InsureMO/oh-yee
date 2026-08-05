import clsx from 'clsx';
import React from 'react';
import { useWorkflowContext } from './context';
import type { WorkflowNodeTypeDef } from './interface';
import { isTypeExhausted } from './utils/dify';

export const NODE_DRAG_TYPE = 'application/yee-workflow-node';

/**
 * Left hand node library. Nodes can be dragged onto the canvas or clicked to be
 * appended at the viewport center.
 */
const Palette = () => {
  const { prefixCls, nodeTypes, graph, locale, classNames, styles, addNode, mode } =
    useWorkflowContext();
  const cls = `${prefixCls}-palette`;

  const groups = React.useMemo(() => {
    const map = new Map<string, Array<[string, WorkflowNodeTypeDef]>>();
    Object.entries(nodeTypes).forEach(([type, def]) => {
      if (def.creatable === false) return;
      const category = def.category ?? locale.defaultCategory;
      const list = map.get(category) ?? [];
      list.push([type, def]);
      map.set(category, list);
    });
    return Array.from(map.entries());
  }, [nodeTypes]);

  const disabled = mode !== 'edit';

  return (
    <div className={clsx(cls, classNames?.palette)} style={styles?.palette}>
      <div className={`${cls}-header`}>
        <span className={`${cls}-title`}>{locale.paletteTitle}</span>
        <span className={`${cls}-hint`}>{locale.paletteHint}</span>
      </div>
      <div className={`${cls}-body`}>
        {groups.map(([category, items]) => (
          <div className={`${cls}-group`} key={category}>
            <div className={`${cls}-group-title`}>{category}</div>
            {items.map(([type, def]) => {
              const exhausted = isTypeExhausted(type, nodeTypes, graph.nodes);
              const itemDisabled = disabled || exhausted;
              return (
                <div
                  key={type}
                  role="button"
                  tabIndex={itemDisabled ? -1 : 0}
                  aria-disabled={itemDisabled}
                  className={clsx(
                    `${cls}-item`,
                    itemDisabled && `${cls}-item-disabled`,
                  )}
                  draggable={!itemDisabled}
                  onDragStart={(event) => {
                    if (itemDisabled) return;
                    event.dataTransfer.setData(NODE_DRAG_TYPE, type);
                    event.dataTransfer.effectAllowed = 'move';
                  }}
                  onClick={() => {
                    if (!itemDisabled) addNode(type);
                  }}
                  onKeyDown={(event) => {
                    if (itemDisabled) return;
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      addNode(type);
                    }
                  }}
                >
                  <span
                    className={`${cls}-item-icon`}
                    style={
                      def.color
                        ? ({
                            ['--yee-workflow-node-accent' as any]: def.color,
                          } as React.CSSProperties)
                        : undefined
                    }
                  >
                    {def.icon}
                  </span>
                  <span className={`${cls}-item-title`}>{def.title}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Palette;
