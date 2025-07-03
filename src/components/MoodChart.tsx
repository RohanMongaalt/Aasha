export const MoodChart = () => {
  const moodData = [
    { id: 1, value: 85, color: 'bg-foreground' },
    { id: 2, value: 60, color: 'bg-purple-accent' },
    { id: 3, value: 75, color: 'bg-foreground' },
    { id: 4, value: 95, color: 'bg-purple-accent' }
  ];

  return (
    <div className="flex items-end justify-center gap-4 h-32">
      {moodData.map((bar) => (
        <div key={bar.id} className="flex flex-col items-center gap-2">
          <div 
            className={`w-8 ${bar.color} rounded-full transition-all duration-500`}
            style={{ height: `${bar.value}%` }}
          />
        </div>
      ))}
    </div>
  );
};