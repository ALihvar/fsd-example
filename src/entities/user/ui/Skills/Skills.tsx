import { type ReactNode } from 'react';

interface SkillsProps {
    children: ReactNode;
    className?: string;
}

export const Skills = ({ children, className = '' }: SkillsProps) => {
    return (
        <div className={`user-skills ${className}`}>
            {children}
        </div>
    );
}; 
