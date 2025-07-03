import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User } from "lucide-react";

export const AssignedTab = () => {
  const assignments = [
    { id: 1, title: "Daily Meditation", time: "10:00 AM", assigned: "Dr. Smith" },
    { id: 2, title: "Breathing Exercise", time: "2:00 PM", assigned: "Dr. Smith" },
    { id: 3, title: "Journal Writing", time: "Evening", assigned: "Self" }
  ];

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">Assigned Tasks</h1>
        <p className="text-muted-foreground">Your daily wellness activities</p>
      </div>

      {assignments.map((task) => (
        <Card key={task.id} className="bg-gradient-to-br from-card to-purple-primary/10 border-purple-primary/20">
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-foreground">{task.title}</h3>
              <Button size="sm" className="bg-primary">Mark Done</Button>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{task.time}</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{task.assigned}</span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};