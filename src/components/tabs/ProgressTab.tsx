import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoodChart } from "../MoodChart";
import { GoalChart } from "../GoalChart";
import { MoodSelector } from "../MoodSelector";

export const ProgressTab = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">Progress Report</h1>
        <p className="text-muted-foreground">Track your mental health journey</p>
      </div>

      {/* Mood Tracking Section */}
      <Card className="bg-gradient-to-br from-card to-purple-primary/10 border-purple-primary/20 shadow-lg backdrop-blur-sm">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Mood</h2>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-accent rounded-full"></div>
              <span className="text-sm text-muted-foreground">Label 1</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-foreground rounded-full"></div>
              <span className="text-sm text-muted-foreground">Label 2</span>
            </div>
          </div>
          <MoodChart />
        </div>
      </Card>

      {/* Mood Input */}
      <Card className="bg-gradient-to-br from-card to-purple-secondary/10 border-purple-secondary/20 shadow-lg backdrop-blur-sm">
        <div className="p-6">
          <h3 className="text-lg font-medium text-foreground mb-4">How are you feeling today?</h3>
          <MoodSelector />
        </div>
      </Card>

      {/* Goal Completions Section */}
      <Card className="bg-gradient-to-br from-card to-purple-accent/10 border-purple-accent/20 shadow-lg backdrop-blur-sm">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Goal completions</h2>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-accent rounded-full"></div>
              <span className="text-sm text-muted-foreground">Label 1</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-foreground rounded-full"></div>
              <span className="text-sm text-muted-foreground">Label 2</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-primary rounded-full"></div>
              <span className="text-sm text-muted-foreground">Label 3</span>
            </div>
          </div>
          <GoalChart />
        </div>
      </Card>
    </div>
  );
};