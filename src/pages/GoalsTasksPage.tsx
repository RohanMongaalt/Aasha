import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowLeft, Plus, Target, Calendar as CalendarIcon, CheckSquare, Square } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Goal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  progress: number;
}

interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
}

export const GoalsTasksPage = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  
  // Mock data - replace with Firebase data
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Improve Daily Meditation',
      description: 'Practice meditation for 10 minutes daily',
      targetDate: '2024-12-31',
      progress: 60
    },
    {
      id: '2',
      title: 'Reduce Anxiety Levels',
      description: 'Implement breathing exercises and mindfulness techniques',
      targetDate: '2024-12-25',
      progress: 40
    }
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Morning meditation', completed: true, dueDate: '2024-12-15' },
    { id: '2', title: 'Journal writing', completed: false, dueDate: '2024-12-15' },
    { id: '3', title: 'Evening walk', completed: false, dueDate: '2024-12-16' }
  ]);

  // New Goal Form
  const [newGoalOpen, setNewGoalOpen] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [newGoalDescription, setNewGoalDescription] = useState("");
  const [newGoalDate, setNewGoalDate] = useState<Date>();

  // New Task Form
  const [newTaskOpen, setNewTaskOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDate, setNewTaskDate] = useState<Date>();

  const updateGoalProgress = (goalId: string, newProgress: number) => {
    setGoals(goals.map(goal => 
      goal.id === goalId ? { ...goal, progress: newProgress } : goal
    ));
  };

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const addNewGoal = () => {
    if (newGoalTitle.trim() && newGoalDescription.trim() && newGoalDate) {
      const newGoal: Goal = {
        id: Date.now().toString(),
        title: newGoalTitle,
        description: newGoalDescription,
        targetDate: newGoalDate.toISOString().split('T')[0],
        progress: 0
      };
      setGoals([...goals, newGoal]);
      setNewGoalTitle("");
      setNewGoalDescription("");
      setNewGoalDate(undefined);
      setNewGoalOpen(false);
    }
  };

  const addNewTask = () => {
    if (newTaskTitle.trim() && newTaskDate) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle,
        completed: false,
        dueDate: newTaskDate.toISOString().split('T')[0]
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
      setNewTaskDate(undefined);
      setNewTaskOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-purple-header p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={() => navigate('/psychologist')} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Goals & Tasks</h1>
            <p className="text-muted-foreground">Patient ID: {patientId}</p>
          </div>
        </div>

        {/* Goals Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Goals</h2>
            <Dialog open={newGoalOpen} onOpenChange={setNewGoalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Goal
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Goal</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="goal-title">Goal Title</Label>
                    <Input
                      id="goal-title"
                      value={newGoalTitle}
                      onChange={(e) => setNewGoalTitle(e.target.value)}
                      placeholder="Enter goal title..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="goal-description">Description</Label>
                    <Textarea
                      id="goal-description"
                      value={newGoalDescription}
                      onChange={(e) => setNewGoalDescription(e.target.value)}
                      placeholder="Describe the goal..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Target Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !newGoalDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newGoalDate ? format(newGoalDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={newGoalDate}
                          onSelect={setNewGoalDate}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button onClick={addNewGoal} className="flex-1">Create Goal</Button>
                    <Button variant="outline" onClick={() => setNewGoalOpen(false)} className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {goals.map((goal) => (
            <Card key={goal.id} className="bg-gradient-to-br from-card to-purple-primary/10 border-purple-primary/20">
              <div className="p-4">
                <div className="flex items-start gap-4">
                  <Target className="h-6 w-6 text-primary mt-1" />
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="font-semibold text-foreground">{goal.title}</h3>
                      <p className="text-sm text-muted-foreground">{goal.description}</p>
                      <p className="text-xs text-muted-foreground">Target: {goal.targetDate}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">Progress</span>
                        <span className="text-sm text-muted-foreground">{goal.progress}%</span>
                      </div>
                      <Slider
                        value={[goal.progress]}
                        onValueChange={(value) => updateGoalProgress(goal.id, value[0])}
                        max={100}
                        step={5}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Tasks Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Tasks</h2>
            <Dialog open={newTaskOpen} onOpenChange={setNewTaskOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Task</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="task-title">Task Title</Label>
                    <Input
                      id="task-title"
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      placeholder="Enter task title..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Due Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !newTaskDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newTaskDate ? format(newTaskDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={newTaskDate}
                          onSelect={setNewTaskDate}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button onClick={addNewTask} className="flex-1">Create Task</Button>
                    <Button variant="outline" onClick={() => setNewTaskOpen(false)} className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

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
                      <CheckSquare className="h-5 w-5 text-green-500" />
                    ) : (
                      <Square className="h-5 w-5 text-muted-foreground" />
                    )}
                  </Button>
                  <div className="flex-1">
                    <span className={`block ${
                      task.completed 
                        ? "text-muted-foreground line-through" 
                        : "text-foreground"
                    }`}>
                      {task.title}
                    </span>
                    <span className="text-xs text-muted-foreground">Due: {task.dueDate}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};