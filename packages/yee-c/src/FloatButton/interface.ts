import type { DataAttributeProps } from '../utils/types';

export type FloatButtonSemanticDOM = 'icon' | 'description';

export interface FloatButtonProps extends DataAttributeProps {
    /**
     * Custom icon
     */
    icon?: React.ReactNode | ((props: FloatButtonProps) => React.ReactNode);
    /**
     * Set button shape
     * @default circle
     */
    shape?: 'circle' | 'square';
    /**
     * Custom class name prefix
     */
    prefixCls?: string;
    /**
     * Custom root element class name
     */
    className?: string;
    /**
     * Custom root element style
     */
    style?: React.CSSProperties;
    /**
     * Semantic structure class names
     */
    classNames?: Partial<Record<FloatButtonSemanticDOM, string>>;
    /**
     * Semantic structure styles
     */
    styles?: Partial<Record<FloatButtonSemanticDOM, React.CSSProperties>>;
    /**
     * Set button description
     */
    description?: React.ReactNode | (() => React.ReactNode);
    /**
     * Set whether the button is draggable
     */
    draggable?: boolean;
    /**
     * Set popup content
     */
    popup?: React.ReactNode | (() => React.ReactNode);
    /**
     * Button type
     * @default default
     */
    type?: 'default' | 'primary';
    /**
     * Whether to limit dragging within the window
     */
    dragLimitInWindow?: boolean;
    /**
     * Click event callback
     */
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    /**
     * Drag state change callback
     */
    onDragChange?: (
        draging: boolean,
        ref: React.RefObject<HTMLButtonElement>,
    ) => void;
}

export interface BackTopProps extends FloatButtonProps {
    /**
     * When the scrollbar is at a certain height from the top, display the back to top button
     */
    scrollTop?: number;
    /**
     * get scroll element
     * @default document.body
     */
    getContainer?: () => HTMLElement;
    /**
     * click event
     * */
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface FloatButtonGroupProps extends FloatButtonProps {
    /**
     * custom class name prefix
     */
    prefixCls?: string;
    /**
     * custom root element class name
     */
    className?: string;
    /**
     * custom root element style
     */
    style?: React.CSSProperties;
    /**
     * Trigger the event to display the pop-up layer
     */
    trigger?: 'hover' | 'click';
    /**
     * button shape
     */
    shape?: 'circle' | 'square';
    /**
     * children
     */
    children: React.ReactNode | React.ReactNode[];
    /**
     * popup layer position
     */
    placement?: 'top' | 'bottom' | 'left' | 'right';

    popupClassName?: string;
    onVisibleChange?: (visible: boolean) => void;
}
