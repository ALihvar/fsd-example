import { type ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => {
    return (
        <div className={`course-card ${className}`}>
            {children}
        </div>
    );
}; 
