import { type ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    variant?: 'default' | 'outlined' | 'elevated';
    padding?: 'none' | 'small' | 'medium' | 'large';
    clickable?: boolean;
    className?: string;
    onClick?: () => void;
}

export const Card = ({
    children,
    variant = 'default',
    padding = 'medium',
    clickable = false,
    className = '',
    onClick
}: CardProps) => {
    const handleClick = () => {
        if (clickable && onClick) {
            onClick();
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (clickable && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault();
            handleClick();
        }
    };

    const cardClasses = [
        'card',
        `card--${variant}`,
        `card--padding-${padding}`,
        clickable ? 'card--clickable' : '',
        className
    ].filter(Boolean).join(' ');

    const cardProps = {
        className: cardClasses,
        ...(clickable && {
            onClick: handleClick,
            onKeyDown: handleKeyDown,
            tabIndex: 0,
            role: 'button',
            'aria-label': 'Clickable card'
        })
    };

    return (
        <div {...cardProps}>
            {children}
        </div>
    );
}; 
