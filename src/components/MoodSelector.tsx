import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useFirestore } from "@/hooks/useFirestore";

const moodEmojis = [
  { emoji: "😞", value: 1, label: "Very Sad" },
  { emoji: "😕", value: 2, label: "Sad" },
  { emoji: "😐", value: 3, label: "Neutral" },
  { emoji: "🙂", value: 4, label: "Happy" },
  { emoji: "😊", value: 5, label: "Very Happy" }
];

export const MoodSelector = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { addMoodEntry } = useFirestore();
  
  // Mock user ID - replace with actual auth
  const userId = "current-user-id";

  const handleSubmit = async () => {
    if (selectedMood !== null) {
      try {
        await addMoodEntry({
          mood: selectedMood,
          userId
        });
        setIsSubmitted(true);
        console.log("Mood logged:", selectedMood);
      } catch (error) {
        console.error("Error saving mood:", error);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-2">
        {moodEmojis.map((mood) => (
          <Button
            key={mood.value}
            variant={selectedMood === mood.value ? "default" : "outline"}
            className={`p-4 text-2xl transition-all duration-300 ${
              selectedMood === mood.value 
                ? "bg-primary scale-110 shadow-lg" 
                : "hover:scale-105 bg-card/50 border-purple-primary/30"
            }`}
            onClick={() => setSelectedMood(mood.value)}
          >
            {mood.emoji}
          </Button>
        ))}
      </div>
      
      {selectedMood && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            You're feeling: <span className="text-foreground font-medium">
              {moodEmojis[selectedMood - 1].label}
            </span>
          </p>
          <Button 
            className="mt-3 bg-primary hover:bg-primary/90" 
            onClick={handleSubmit}
            disabled={isSubmitted}
          >
            {isSubmitted ? "Mood Saved!" : "Save Mood Entry"}
          </Button>
        </div>
      )}
    </div>
  );
};