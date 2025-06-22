import { useState, forwardRef } from 'react';

interface InputProps {
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
    value?: string;
    placeholder?: string;
    label?: string;
    error?: string;
    disabled?: boolean;
    required?: boolean;
    size?: 'small' | 'medium' | 'large';
    variant?: 'default' | 'outlined' | 'filled';
    className?: string;
    onChange?: (value: string) => void;
    onBlur?: () => void;
    onFocus?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
    type = 'text',
    value = '',
    placeholder,
    label,
    error,
    disabled = false,
    required = false,
    size = 'medium',
    variant = 'default',
    className = '',
    onChange,
    onBlur,
    onFocus
}, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(event.target.value);
        }
    };

    const handleFocus = () => {
        setIsFocused(true);
        if (onFocus) {
            onFocus();
        }
    };

    const handleBlur = () => {
        setIsFocused(false);
        if (onBlur) {
            onBlur();
        }
    };

    const inputClasses = [
        'input__field',
        `input__field--${size}`,
        `input__field--${variant}`,
        isFocused ? 'input__field--focused' : '',
        error ? 'input__field--error' : '',
        disabled ? 'input__field--disabled' : '',
        className
    ].filter(Boolean).join(' ');

    const inputId = `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div className="input">
            {label && (
                <label
                    htmlFor={inputId}
                    className={`input__label ${required ? 'input__label--required' : ''}`}
                >
                    {label}
                    {required && <span className="input__required" aria-hidden="true">*</span>}
                </label>
            )}
            <input
                ref={ref}
                id={inputId}
                type={type}
                value={value}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                className={inputClasses}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? `${inputId}-error` : undefined}
            />
            {error && (
                <div
                    id={`${inputId}-error`}
                    className="input__error"
                    role="alert"
                    aria-live="polite"
                >
                    {error}
                </div>
            )}
        </div>
    );
}); 
