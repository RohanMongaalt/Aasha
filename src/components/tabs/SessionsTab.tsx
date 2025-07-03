import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video } from "lucide-react";

export const SessionsTab = () => {
  const sessions = [
    { 
      id: 1, 
      title: "Weekly Check-in", 
      therapist: "Dr. Sarah Wilson", 
      date: "Today, 3:00 PM",
      type: "Video Call",
      status: "upcoming"
    },
    { 
      id: 2, 
      title: "Cognitive Behavioral Therapy", 
      therapist: "Dr. Michael Chen", 
      date: "Tomorrow, 11:00 AM",
      type: "In Person",
      status: "scheduled"
    },
    { 
      id: 3, 
      title: "Group Session", 
      therapist: "Dr. Emily Brown", 
      date: "Friday, 2:00 PM",
      type: "Video Call",
      status: "scheduled"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">Therapy Sessions</h1>
        <p className="text-muted-foreground">Your upcoming appointments</p>
      </div>

      {sessions.map((session) => (
        <Card key={session.id} className="bg-gradient-to-br from-card to-purple-primary/10 border-purple-primary/20">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">{session.title}</h3>
              <Button 
                size="sm" 
                variant={session.status === "upcoming" ? "default" : "outline"}
                className={session.status === "upcoming" ? "bg-primary" : ""}
              >
                {session.status === "upcoming" ? "Join Now" : "Reschedule"}
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mb-2">with {session.therapist}</p>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{session.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Video className="h-4 w-4" />
                <span>{session.type}</span>
              </div>
            </div>
          </div>
        </Card>
      ))}

      <Button className="w-full bg-primary hover:bg-primary/90 mt-6">
        Schedule New Session
      </Button>
    </div>
  );
};