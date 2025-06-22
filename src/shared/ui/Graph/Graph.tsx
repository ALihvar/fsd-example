import { useMemo } from 'react';

interface DataPoint {
    label: string;
    value: number;
    color?: string;
}

interface GraphProps {
    data: DataPoint[];
    type?: 'bar' | 'line' | 'pie';
    width?: number;
    height?: number;
    showLabels?: boolean;
    showValues?: boolean;
    className?: string;
}

export const Graph = ({
    data,
    type = 'bar',
    width = 400,
    height = 300,
    showLabels = true,
    showValues = true,
    className = ''
}: GraphProps) => {
    const maxValue = useMemo(() => Math.max(...data.map(item => item.value)), [data]);

    const getBarHeight = (value: number) => {
        return (value / maxValue) * (height - 60); // 60px for labels and padding
    };

    const renderBarChart = () => {
        const barWidth = (width - 40) / data.length; // 40px for padding

        return (
            <svg
                width={width}
                height={height}
                className="graph__svg"
                role="img"
                aria-label="Bar chart"
            >
                {data.map((item, index) => {
                    const barHeight = getBarHeight(item.value);
                    const x = 20 + index * barWidth;
                    const y = height - barHeight - 30;

                    return (
                        <g key={item.label}>
                            <rect
                                x={x + barWidth * 0.1}
                                y={y}
                                width={barWidth * 0.8}
                                height={barHeight}
                                fill={item.color || '#3b82f6'}
                                aria-label={`${item.label}: ${item.value}`}
                            />
                            {showValues && (
                                <text
                                    x={x + barWidth * 0.5}
                                    y={y - 5}
                                    textAnchor="middle"
                                    className="graph__value"
                                    fontSize="12"
                                >
                                    {item.value}
                                </text>
                            )}
                            {showLabels && (
                                <text
                                    x={x + barWidth * 0.5}
                                    y={height - 10}
                                    textAnchor="middle"
                                    className="graph__label"
                                    fontSize="12"
                                >
                                    {item.label}
                                </text>
                            )}
                        </g>
                    );
                })}
            </svg>
        );
    };

    const renderLineChart = () => {
        const pointSpacing = (width - 40) / (data.length - 1);
        const points = data.map((item, index) => {
            const x = 20 + index * pointSpacing;
            const y = height - getBarHeight(item.value) - 30;
            return `${x},${y}`;
        }).join(' ');

        return (
            <svg
                width={width}
                height={height}
                className="graph__svg"
                role="img"
                aria-label="Line chart"
            >
                <polyline
                    points={points}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                />
                {data.map((item, index) => {
                    const x = 20 + index * pointSpacing;
                    const y = height - getBarHeight(item.value) - 30;

                    return (
                        <g key={item.label}>
                            <circle
                                cx={x}
                                cy={y}
                                r="4"
                                fill={item.color || '#3b82f6'}
                                aria-label={`${item.label}: ${item.value}`}
                            />
                            {showValues && (
                                <text
                                    x={x}
                                    y={y - 10}
                                    textAnchor="middle"
                                    className="graph__value"
                                    fontSize="12"
                                >
                                    {item.value}
                                </text>
                            )}
                            {showLabels && (
                                <text
                                    x={x}
                                    y={height - 10}
                                    textAnchor="middle"
                                    className="graph__label"
                                    fontSize="12"
                                >
                                    {item.label}
                                </text>
                            )}
                        </g>
                    );
                })}
            </svg>
        );
    };

    const renderChart = () => {
        switch (type) {
            case 'line':
                return renderLineChart();
            case 'bar':
            default:
                return renderBarChart();
        }
    };

    return (
        <div className={`graph graph--${type} ${className}`}>
            {renderChart()}
        </div>
    );
}; 
