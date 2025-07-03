import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, User, Calendar, MessageSquare } from "lucide-react";
import { MoodChart } from "./MoodChart";
import { GoalChart } from "./GoalChart";
import { MoodSelector } from "./MoodSelector";
import { NavigationBar } from "./NavigationBar";

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-purple-header font-inter">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-header to-purple-primary text-white p-4 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="text-xl font-semibold">Progress Report</div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <User className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-24">
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

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-primary to-purple-primary border-none shadow-lg">
            <div className="p-4 text-center">
              <Calendar className="h-8 w-8 text-primary-foreground mx-auto mb-2" />
              <h3 className="font-medium text-primary-foreground">Sessions</h3>
            </div>
          </Card>
          <Card className="bg-gradient-to-br from-secondary to-purple-secondary border-none shadow-lg">
            <div className="p-4 text-center">
              <MessageSquare className="h-8 w-8 text-secondary-foreground mx-auto mb-2" />
              <h3 className="font-medium text-secondary-foreground">Messages</h3>
            </div>
          </Card>
        </div>
      </div>

      <NavigationBar />
    </div>
  );
};