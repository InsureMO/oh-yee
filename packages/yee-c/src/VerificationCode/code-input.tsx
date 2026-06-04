import React from 'react';
import { VerificationCodeContext } from './verification-code';
import { VerificationCodeInputProps } from './interface';

export default function CodeInput(props: VerificationCodeInputProps) {
    const { value, index } = props;

    const ref = React.useRef<HTMLInputElement>(null);
    const {
        prefixCls,
        readOnly,
        fullValue,
        masked,
        activeIndex,
        onChange,
        onKeyDown,
        onPaste,
    } = React.useContext(VerificationCodeContext);

    React.useLayoutEffect(() => {
        if (activeIndex === index) {
            ref.current?.focus();
        }
    }, [activeIndex]);

    return (
        <input
            type={masked ? 'password' : 'text'}
            value={value ?? ''}
            readOnly={readOnly || (index > 0 && !fullValue[index - 1])}
            maxLength={1}
            className={`${prefixCls}-item`}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, index)}
            onKeyDown={(
                e: React.KeyboardEvent<HTMLInputElement> & {
                    target: { value: string };
                },
            ) => onKeyDown(e, index)}
            onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => onPaste(e, index)}
            ref={ref}
        />
    );
}
