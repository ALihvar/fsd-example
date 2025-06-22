import { type ReactNode } from 'react';

interface ActivityProps {
    children: ReactNode;
    className?: string;
}

export const Activity = ({ children, className = '' }: ActivityProps) => {
    return (
        <div className={`user-activity ${className}`}>
            {children}
        </div>
    );
}; 
