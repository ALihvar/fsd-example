import { type ReactNode } from 'react';

interface AvatarProps {
    children: ReactNode;
    className?: string;
}

export const Avatar = ({ children, className = '' }: AvatarProps) => {
    return (
        <div className={`user-avatar ${className}`}>
            {children}
        </div>
    );
}; 
