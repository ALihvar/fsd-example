import { useState } from 'react';

interface RatingProps {
    value?: number;
    maxRating?: number;
    onChange?: (rating: number) => void;
    readonly?: boolean;
    size?: 'small' | 'medium' | 'large';
    className?: string;
}

export const Rating = ({
    value = 0,
    maxRating = 5,
    onChange,
    readonly = false,
    size = 'medium',
    className = ''
}: RatingProps) => {
    const [hoverRating, setHoverRating] = useState<number>(0);

    const handleClick = (rating: number) => {
        if (!readonly && onChange) {
            onChange(rating);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent, rating: number) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleClick(rating);
        }
    };

    const handleMouseEnter = (rating: number) => {
        if (!readonly) {
            setHoverRating(rating);
        }
    };

    const handleMouseLeave = () => {
        if (!readonly) {
            setHoverRating(0);
        }
    };

    const getSizeClass = () => {
        switch (size) {
            case 'small': return 'rating--small';
            case 'large': return 'rating--large';
            default: return 'rating--medium';
        }
    };

    return (
        <div
            className={`rating ${getSizeClass()} ${className}`}
            role="radiogroup"
            aria-label="Rating"
        >
            {Array.from({ length: maxRating }, (_, index) => {
                const starValue = index + 1;
                const isActive = starValue <= (hoverRating || value);

                return (
                    <button
                        key={starValue}
                        type="button"
                        className={`rating__star ${isActive ? 'rating__star--active' : ''}`}
                        onClick={() => handleClick(starValue)}
                        onKeyDown={(e) => handleKeyDown(e, starValue)}
                        onMouseEnter={() => handleMouseEnter(starValue)}
                        onMouseLeave={handleMouseLeave}
                        disabled={readonly}
                        aria-label={`Rate ${starValue} out of ${maxRating}`}
                        tabIndex={readonly ? -1 : 0}
                    >
                        ★
                    </button>
                );
            })}
        </div>
    );
}; 
