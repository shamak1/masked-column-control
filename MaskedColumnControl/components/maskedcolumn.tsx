import React, { useState, useEffect, useMemo } from 'react';
import {
    FluentProvider,
    Theme,
    Input,
    Button
} from '@fluentui/react-components';
import { Eye20Regular, EyeOff20Regular } from '@fluentui/react-icons';
import { MaskedColumnStyles } from '../styles/maskedcolumn.styles';

interface MaskedColumnProps {
    value?: string;
    onChange?: (value: string) => void;
    onBlur?: (value: string) => void;
    disabled: boolean;
    theme?: Theme;
    maskRegex?: RegExp;
    maskChar?: string;
}

const MaskedColumn: React.FC<MaskedColumnProps> = ({
    value = '',
    onChange,
    onBlur,
    disabled,
    theme,
    maskRegex = /./g,
    maskChar = '•'
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [internalValue, setInternalValue] = useState(value);
    const [hasUserInteracted, setHasUserInteracted] = useState(false);
    const styles = MaskedColumnStyles();

    const customTheme = disabled
        ? {
            ...theme,
            colorCompoundBrandStroke: theme?.colorNeutralStroke1,
            colorCompoundBrandStrokePressed: theme?.colorNeutralStroke1
        }
        : theme;

    useEffect(() => {
        setInternalValue(value);
    }, [value]);

    useEffect(() => {
        if (!hasUserInteracted) {
            setIsVisible(!value || value.length === 0);
        }
    }, [value, hasUserInteracted]);

    const displayValue = useMemo(() => {
        if (isVisible || !internalValue) {
            return internalValue;
        }
        
        try {
            return internalValue.replace(maskRegex, maskChar);
        } catch (error) {
            return internalValue.replace(/./g, maskChar);
        }
    }, [internalValue, isVisible, maskRegex, maskChar]);

    const handleToggleVisibility = () => {
        setIsVisible(!isVisible);
        setHasUserInteracted(true);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDisplayValue = event.target.value;
        
        if (isVisible) {
            setInternalValue(newDisplayValue);
            onChange?.(newDisplayValue);
        } else {
            const currentValue = internalValue;
            const currentDisplayValue = currentValue.replace(maskRegex, maskChar);
            
            if (newDisplayValue.length > currentDisplayValue.length) {
                const addedChars = newDisplayValue.slice(currentDisplayValue.length);
                const newActualValue = currentValue + addedChars;

                setInternalValue(newActualValue);
                onChange?.(newActualValue);
            } else if (newDisplayValue.length < currentDisplayValue.length) {
                const newLength = newDisplayValue.length;
                const newActualValue = currentValue.slice(0, newLength);

                setInternalValue(newActualValue);
                onChange?.(newActualValue);
            } else {
                const diff = [];

                for (let i = 0; i < newDisplayValue.length; i++) {
                    if (newDisplayValue[i] !== currentDisplayValue[i]) {
                        diff.push({ index: i, char: newDisplayValue[i] });
                    }
                }
                
                if (diff.length > 0) {
                    let newValue = currentValue;
                    
                    diff.forEach(({ index, char }) => {
                        newValue = newValue.substring(0, index) + char + newValue.substring(index + 1);
                    });

                    setInternalValue(newValue);
                    onChange?.(newValue);
                }
            }
        }
        
        setHasUserInteracted(true);
    };

    const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        onBlur?.(internalValue);
    };

    return (
        <FluentProvider theme={customTheme} className={styles.root}>
            <Input
                type='text'
                value={displayValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                placeholder={disabled ? '' : '---'}
                className={styles.input}
                appearance='filled-darker'
                readOnly={disabled}
            />
            <Button
                appearance='transparent'
                icon={isVisible ? <EyeOff20Regular /> : <Eye20Regular />}
                onClick={handleToggleVisibility}
                className={styles.toggleButton}
                aria-label={isVisible ? 'Hide content' : 'Show content'}
            />
        </FluentProvider>
    );
};

export default MaskedColumn;