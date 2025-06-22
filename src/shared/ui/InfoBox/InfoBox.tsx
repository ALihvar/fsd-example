import { type ReactNode } from 'react';

interface InfoBoxProps {
    children: ReactNode;
    type?: 'info' | 'success' | 'warning' | 'error';
    title?: string;
    closable?: boolean;
    className?: string;
    onClose?: () => void;
}

export const InfoBox = ({
    children,
    type = 'info',
    title,
    closable = false,
    className = '',
    onClose
}: InfoBoxProps) => {
    const handleClose = () => {
        if (closable && onClose) {
            onClose();
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleClose();
        }
    };

    const getIcon = () => {
        switch (type) {
            case 'success': return '✓';
            case 'warning': return '⚠';
            case 'error': return '✕';
            default: return 'ℹ';
        }
    };

    const infoBoxClasses = [
        'info-box',
        `info-box--${type}`,
        className
    ].filter(Boolean).join(' ');

    return (
        <div
            className={infoBoxClasses}
            role="alert"
            aria-live="polite"
        >
            <div className="info-box__content">
                <div className="info-box__icon" aria-hidden="true">
                    {getIcon()}
                </div>
                <div className="info-box__body">
                    {title && (
                        <div className="info-box__title">
                            {title}
                        </div>
                    )}
                    <div className="info-box__message">
                        {children}
                    </div>
                </div>
                {closable && (
                    <button
                        type="button"
                        className="info-box__close"
                        onClick={handleClose}
                        onKeyDown={handleKeyDown}
                        aria-label="Close notification"
                        tabIndex={0}
                    >
                        ✕
                    </button>
                )}
            </div>
        </div>
    );
}; 
