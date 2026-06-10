import { styled } from '@mui/material';
import React, { useLayoutEffect, useMemo, useRef } from 'react'

const RE_DIGIT = new RegExp(/^\d+$/);
const OtpInput = ({ value, valueLength, onChange }: { value: string, valueLength: number, onChange: (value: string) => void }) => {
    const ref = useRef<any>(null);
    useLayoutEffect(() => {
        ref.current.firstChild.focus();
    }, [])

    const valueItems = useMemo(() => {
        const valueArray = value.split('');
        const items: Array<string> = [];

        for (let i = 0; i < valueLength; i++) {
            const char = valueArray[i];

            if (RE_DIGIT.test(char)) {
                items.push(char);
            } else {
                items.push('');
            }
        }

        return items;
    }, [value, valueLength]);

    const focusToNextInput = (target: HTMLElement) => {
        const nextElementSibling =
            target.nextElementSibling as HTMLInputElement | null;

        if (nextElementSibling) {
            nextElementSibling.focus();
        }
    };
    const focusToPrevInput = (target: HTMLElement) => {
        const previousElementSibling =
            target.previousElementSibling as HTMLInputElement | null;

        if (previousElementSibling) {
            previousElementSibling.focus();
        }
    };

    const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        const target = e.target;
        let targetValue = target.value;
        const isTargetValueDigit = RE_DIGIT.test(targetValue);

        if (!isTargetValueDigit && targetValue !== '') {
            return;
        }

        targetValue = isTargetValueDigit ? targetValue : ' ';

        if (targetValue.length) {
            const newValue = value.substring(0, idx) + targetValue + value.substring(idx + 1);

            onChange(newValue);

            if (!isTargetValueDigit) {
                return;
            }

            focusToNextInput(e.currentTarget);
        }
        else {
            onChange(targetValue);
            target.blur();
        }


    };

    const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const targetValue = target.value;
        target.setSelectionRange(0, targetValue.length);
        const key = e.key;

        if (key === 'ArrowRight' || key === 'ArrowUp') {
            e.preventDefault();
            return focusToNextInput(target);
        }

        if (key === 'ArrowLeft' || key === 'ArrowDown') {
            e.preventDefault();
            return focusToPrevInput(target);
        }

        if (key !== 'Backspace' || target.value !== '') {
            return;
        }

        focusToPrevInput(e.currentTarget);
    };

    const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        const { target } = e;
        target.setSelectionRange(0, target.value.length);
    };

    return (
        <OtpGroup ref={ref} dir='ltr'>
            {valueItems.map((digit, idx) => (
                <OtpTextInput
                    key={idx}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    pattern="\d{1}"
                    maxLength={valueLength}
                    value={digit}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputOnChange(e, idx)}
                    onKeyDown={inputOnKeyDown}
                    onFocus={inputOnFocus}
                />
            ))}
        </OtpGroup>
    )
}

export default OtpInput

const OtpGroup = styled('div')(({ theme }) => ({
    display: 'flex',
    width: '100%',
    maxWidth: '360px',
    columnGap: '10px'
}));

const OtpTextInput = styled('input')(({ theme }) => ({
    width: '100%',
    height: '60px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    textAlign: 'center',
    fontSize: '32px',
    fontWeight: 'bold',
    lineHeight: '1',
    fontFamily: "Vazirmatn UI FD"
}));
