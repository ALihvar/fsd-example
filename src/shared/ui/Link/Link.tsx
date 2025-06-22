import { type ReactNode } from 'react';

interface LinkProps {
    href: string;
    children: ReactNode;
    external?: boolean;
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'small' | 'medium' | 'large';
    underline?: boolean;
    className?: string;
    onClick?: () => void;
}

export const Link = ({
    href,
    children,
    external = false,
    variant = 'primary',
    size = 'medium',
    underline = true,
    className = '',
    onClick
}: LinkProps) => {
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleClick();
        }
    };

    const linkClasses = [
        'link',
        `link--${variant}`,
        `link--${size}`,
        underline ? 'link--underline' : 'link--no-underline',
        className
    ].filter(Boolean).join(' ');

    const linkProps = {
        className: linkClasses,
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        tabIndex: 0,
        'aria-label': typeof children === 'string' ? children : undefined,
        ...(external && {
            target: '_blank',
            rel: 'noopener noreferrer'
        })
    };

    return (
        <a href={href} {...linkProps}>
            {children}
            {external && (
                <span className="link__external-icon" aria-hidden="true">
                    ↗
                </span>
            )}
        </a>
    );
}; 
