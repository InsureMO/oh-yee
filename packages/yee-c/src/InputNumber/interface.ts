export type CompositionDOM = 'prefix' | 'input' | 'suffix' | 'clear' | 'handler';

export interface InputNumberProps
    extends Omit<
        React.InputHTMLAttributes<HTMLInputElement>,
        'size' | 'prefix' | 'onChange' | 'value' | 'defaultValue'
    > {
    /**
     * Custom class name prefix
     */
    prefixCls?: string;
    /**
     * Custom class name
     */
    className?: string;
    /**
     * Custom inline style
     */
    style?: React.CSSProperties;
    /**
     * Semantic structure class names
     */
    classNames?: Partial<Record<CompositionDOM, string>>;
    /**
     * Semantic structure styles
     */
    styles?: Partial<Record<CompositionDOM, React.CSSProperties>>;
    /**
     * Size
     */
    size?: 'small' | 'default' | 'large';
    /**
     * Controlled value
     */
    value?: number | null;
    /**
     * Default value
     */
    defaultValue?: number | null;
    /**
     * Minimum value
     */
    min?: number;
    /**
     * Maximum value
     */
    max?: number;
    /**
     * Step size
     * @default 1
     */
    step?: number;
    /**
     * Precision (decimal places)
     */
    precision?: number;
    /**
     * Whether to show border
     * @default true
     * */
    bordered?: boolean;
    /**
     * Prefix
     * */
    prefix?: React.ReactNode;
    /**
     * Suffix
     */
    suffix?: React.ReactNode;
    /**
     * Whether disabled
     */
    disabled?: boolean;
    /**
     * Whether read-only
     */
    readOnly?: boolean;
    /**
     * Whether to allow clearing
     */
    allowClear?: boolean;
    /**
     * Whether to show the stepper
     * @default true
     */
    controls?: boolean;
    /**
     * Format display value
     */
    formatter?: (value: number) => string;
    /**
     * Parse input value
     */
    parser?: (displayValue: string) => string;
    /**
     * Input placeholder
     */
    placeholder?: string;
    /**
     * Callback when input value changes
     */
    onChange?: (value: number | null) => void;
    /**
     * Callback when Enter is pressed
     */
    onPressEnter?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    /**
     * Stepper click callback
     */
    onStep?: (value: number, info: { offset: number; type: 'up' | 'down' }) => void;
}
