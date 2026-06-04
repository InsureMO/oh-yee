import { Dayjs } from 'dayjs';
import pickerUtils from '../../PickerPanel/utils/pickerUtils';
import { useRef } from 'react';

interface UseInputParams {
    setPickerValue: (value?: Dayjs) => void;
    setInputValue: (value: string) => void;
    format: string;
    onEscape?: () => void;
}

export default function useInput({
    setInputValue,
    setPickerValue,
    format,
    onEscape,
}: UseInputParams) {

    const changed = useRef(false);

    const sync = (value: string) => {
        const date = pickerUtils.init(value, format);
        if (pickerUtils.isValid(date)) {
            setPickerValue(date);
        } else {
            setPickerValue(undefined);
        }
        changed.current = false;
    }

    const handleInputChange = (value: string) => {
        setInputValue(value);
        changed.current = true;
    };

    const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (!changed.current) return;
        const value = event.target.value;
        sync(value);
    }

    const handleInputKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Escape') {
            onEscape?.();
            return;
        }

        if (!changed.current) return;
        if (event.key === 'Enter') {
            const value = event.currentTarget.value;
            sync(value);
        }
    }

    return {
        onBlur: handleInputBlur,
        onChange: handleInputChange,
        onKeydown: handleInputKeydown
    }
}

