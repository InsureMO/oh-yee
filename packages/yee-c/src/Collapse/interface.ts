import React from 'react';
import type { DataAttributeProps } from '../utils/types';

export type SemanticDOM = 'title' | 'content' | 'extra' | 'header' | 'expandIcon';

export type PanelProps = {
    /**
     * Unique identifier
     * */
    key: string | number;
    /**
     * Title
     * */
    title: React.ReactNode;
    /**
     * Children
     * */
    children?: React.ReactNode;
    /**
     * Render content in the top-right corner
     */
    extra?: React.ReactNode | (() => React.ReactNode);
    /**
     * Custom class name
     */
    className?: string;
    /**
     * Custom style
     */
    style?: React.CSSProperties;
    /**
     * Semantic class names
     */
    classNames?: Partial<Record<SemanticDOM, string>>;
    /**
     * Semantic styles
     */
    styles?: Partial<Record<SemanticDOM, React.CSSProperties>>;
};

export interface CollapseProps extends DataAttributeProps {
    /**
     * Custom class name prefix
     */
    prefixCls?: string;
    /**
     * Custom root class name
     */
    className?: string;
    /**
     * Custom root style
     */
    style?: React.CSSProperties;
    /**
     * Semantic class names
     */
    classNames?: Partial<Record<string, string>>;
    /**
     * Semantic styles
     */
    styles?: Partial<Record<string, React.CSSProperties>>;
    /**
     * Accordion mode
     * */
    accordion?: boolean;
    /**
     * Expanded keys (controlled)
     * */
    activeKey?: string | number | string[] | number[];
    /**
     * Default expanded panels
     * */
    defaultActiveKey?: string | number | string[] | number[];
    /**
     * Panel items
     */
    items: Array<PanelProps>;
    /**
     * Whether to show border
     */
    bordered?: boolean;
    /**
     * Callback when panel is expanded
     * */
    onChange?: (key: string | number | string[] | number[]) => void;
}
