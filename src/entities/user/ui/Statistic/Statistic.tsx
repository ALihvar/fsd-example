interface StatisticProps {
    className?: string;
}

export const Statistic = ({ className = '' }: StatisticProps) => {
    return (
        <div className={`user-skills ${className}`}>
        </div>
    );
}; 
