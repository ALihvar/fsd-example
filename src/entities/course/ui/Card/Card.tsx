interface CardProps {
    className?: string;
}

export const Card = ({ className = '' }: CardProps) => {
    return (
        <div className={`course-card ${className}`}>
        </div>
    );
}; 
