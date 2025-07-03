import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckSquare, Plus, Square } from "lucide-react";
import { useState } from "react";

export const TasksTab = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Morning meditation", completed: true },
    { id: 2, title: "Gratitude journal", completed: false },
    { id: 3, title: "Evening walk", completed: false },
    { id: 4, title: "Deep breathing exercise", completed: true },
    { id: 5, title: "Read wellness article", completed: false }
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const completedCount = tasks.filter(task => task.completed).length;

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">Daily Tasks</h1>
        <p className="text-muted-foreground">
          {completedCount} of {tasks.length} tasks completed
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="bg-gradient-to-br from-card to-purple-primary/10 border-purple-primary/20">
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-foreground">Today's Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round((completedCount / tasks.length) * 100)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedCount / tasks.length) * 100}%` }}
            />
          </div>
        </div>
      </Card>

      {/* Task List */}
      {tasks.map((task) => (
        <Card key={task.id} className="bg-gradient-to-br from-card to-purple-secondary/10 border-purple-secondary/20">
          <div className="p-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleTask(task.id)}
                className="p-0 h-auto"
              >
                {task.completed ? (
                  <CheckSquare className="h-5 w-5 text-success" />
                ) : (
                  <Square className="h-5 w-5 text-muted-foreground" />
                )}
              </Button>
              <span 
                className={`flex-1 ${
                  task.completed 
                    ? "text-muted-foreground line-through" 
                    : "text-foreground"
                }`}
              >
                {task.title}
              </span>
            </div>
          </div>
        </Card>
      ))}

      {/* Add New Task */}
      <Button className="w-full bg-primary hover:bg-primary/90 mt-6">
        <Plus className="h-4 w-4 mr-2" />
        Add New Task
      </Button>
    </div>
  );
};