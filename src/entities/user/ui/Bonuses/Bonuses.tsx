import { type ReactNode } from 'react';

interface BonusesProps {
    children: ReactNode;
    className?: string;
}

export const Bonuses = ({ children, className = '' }: BonusesProps) => {
    return (
        <div className={`user-bonuses ${className}`}>
            {children}
        </div>
    );
}; 
