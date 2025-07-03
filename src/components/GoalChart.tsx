export const GoalChart = () => {
  const chartData = [
    { x: 10, y: 60 },
    { x: 25, y: 50 },
    { x: 40, y: 70 },
    { x: 55, y: 65 },
    { x: 70, y: 80 },
    { x: 85, y: 90 }
  ];

  const pathData = chartData.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x * 3} ${120 - point.y}`
  ).join(' ');

  return (
    <div className="h-32 relative">
      <svg width="100%" height="128" className="overflow-visible">
        {/* Background gradient */}
        <defs>
          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--purple-accent))" stopOpacity="0.3" />
            <stop offset="50%" stopColor="hsl(var(--purple-primary))" stopOpacity="0.2" />
            <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        {/* Chart area */}
        <path
          d={`${pathData} L ${85 * 3} 120 L ${10 * 3} 120 Z`}
          fill="url(#chartGradient)"
          className="opacity-60"
        />
        
        {/* Main line */}
        <path
          d={pathData}
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeWidth="3"
          className="drop-shadow-sm"
        />
        
        {/* Data points */}
        {chartData.map((point, index) => (
          <circle
            key={index}
            cx={point.x * 3}
            cy={120 - point.y}
            r="4"
            fill="hsl(var(--foreground))"
            className="drop-shadow-sm"
          />
        ))}
      </svg>
    </div>
  );
};