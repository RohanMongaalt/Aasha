import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Clock, Heart, Wind } from "lucide-react";
import { useState } from "react";

export const MeditationTab = () => {
  const [currentSession, setCurrentSession] = useState<number | null>(null);

  const meditations = [
    { 
      id: 1, 
      title: "Morning Mindfulness", 
      duration: "10 min", 
      type: "Breathing",
      description: "Start your day with focused breathing",
      icon: Wind
    },
    { 
      id: 2, 
      title: "Stress Relief", 
      duration: "15 min", 
      type: "Relaxation",
      description: "Let go of tension and find calm",
      icon: Heart
    },
    { 
      id: 3, 
      title: "Sleep Preparation", 
      duration: "20 min", 
      type: "Sleep",
      description: "Gentle meditation for better rest",
      icon: Clock
    },
    { 
      id: 4, 
      title: "Anxiety Relief", 
      duration: "12 min", 
      type: "Healing",
      description: "Techniques to manage anxious thoughts",
      icon: Heart
    }
  ];

  const toggleSession = (id: number) => {
    setCurrentSession(currentSession === id ? null : id);
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">Guided Meditation</h1>
        <p className="text-muted-foreground">Find peace and clarity through mindfulness</p>
      </div>

      {/* Current Session */}
      {currentSession && (
        <Card className="bg-gradient-to-br from-purple-primary to-purple-header border-purple-primary/20">
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              {meditations.find(m => m.id === currentSession)?.title}
            </h3>
            <p className="text-white/80 text-sm mb-4">Session in progress</p>
            <div className="flex justify-center gap-3">
              <Button variant="secondary" size="sm">
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentSession(null)}>
                Stop
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Meditation Sessions */}
      {meditations.map((meditation) => {
        const Icon = meditation.icon;
        return (
          <Card key={meditation.id} className="bg-gradient-to-br from-card to-purple-secondary/10 border-purple-secondary/20">
            <div className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-primary/20 rounded-full flex items-center justify-center">
                  <Icon className="h-6 w-6 text-purple-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{meditation.title}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{meditation.description}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {meditation.duration}
                    </span>
                    <span>{meditation.type}</span>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => toggleSession(meditation.id)}
                  className={currentSession === meditation.id ? "bg-destructive" : "bg-primary"}
                >
                  {currentSession === meditation.id ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </Card>
        );
      })}

      {/* Quick Stats */}
      <Card className="bg-gradient-to-br from-card to-purple-accent/10 border-purple-accent/20">
        <div className="p-4">
          <h3 className="font-medium text-foreground mb-3">This Week</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-primary">5</div>
              <div className="text-xs text-muted-foreground">Sessions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-primary">67</div>
              <div className="text-xs text-muted-foreground">Minutes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-primary">7</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};