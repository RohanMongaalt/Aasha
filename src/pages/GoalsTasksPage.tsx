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
import { useSupabase } from "@/hooks/useSupabase";
import { useToast } from "@/hooks/use-toast";

interface Goal {
  id: string;
  title: string;
  description: string;
  targetValue?: number;
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
  const { saveGoal, getGoals } = useSupabase();
  const { toast } = useToast();
  
  const [goals, setGoals] = useState<Goal[]>([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  // Load goals when component mounts or patientId changes
  useEffect(() => {
    const loadGoals = async () => {
      if (!patientId) return;
      
      setLoading(true);
      try {
        const data = await getGoals(patientId);
        // Transform data to match our interface
        const transformedGoals = data.map((goal: any) => ({
          id: goal.id,
          title: goal.title,
          description: goal.description || '',
          targetValue: goal.target_value,
          progress: goal.current_progress || 0
        }));
        setGoals(transformedGoals);
      } catch (error) {
        console.error('Error loading goals:', error);
      } finally {
        setLoading(false);
      }
    };

    loadGoals();
  }, [patientId, getGoals]);

  const updateGoalProgress = (goalId: string, newProgress: number) => {
    setGoals(goals.map(goal => 
      goal.id === goalId ? { ...goal, progress: newProgress } : goal
    ));
    setHasUnsavedChanges(true);
  };

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const addNewGoal = () => {
    if (newGoalTitle.trim() && newGoalDescription.trim()) {
      const newGoal: Goal = {
        id: `temp-${Date.now()}`, // Temporary ID for new goals
        title: newGoalTitle,
        description: newGoalDescription,
        targetValue: 100, // Default target value
        progress: 0
      };
      setGoals([...goals, newGoal]);
      setHasUnsavedChanges(true);
      setNewGoalTitle("");
      setNewGoalDescription("");
      setNewGoalDate(undefined);
      setNewGoalOpen(false);
    }
  };

  const handleSaveGoals = async () => {
    if (!patientId) return;
    
    setSaving(true);
    try {
      // Save all goals to Supabase
      const savedGoals = [];
      for (const goal of goals) {
        const goalToSave = {
          ...goal,
          // Don't include temporary IDs
          id: goal.id.startsWith('temp-') ? undefined : goal.id
        };
        const savedGoal = await saveGoal(goalToSave, patientId);
        savedGoals.push({
          id: savedGoal.id,
          title: savedGoal.title,
          description: savedGoal.description || '',
          targetValue: savedGoal.target_value,
          progress: savedGoal.current_progress || 0
        });
      }
      
      // Update local state with saved goals (including new IDs)
      setGoals(savedGoals);
      setHasUnsavedChanges(false);
      
      toast({
        title: "Goals saved successfully",
        description: "All goal changes have been saved.",
      });
    } catch (error) {
      console.error('Error saving goals:', error);
      toast({
        title: "Error saving goals",
        description: "Failed to save goal changes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
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
            <div className="flex gap-2">
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
                    <div className="flex gap-2 pt-4">
                      <Button onClick={addNewGoal} className="flex-1">Create Goal</Button>
                      <Button variant="outline" onClick={() => setNewGoalOpen(false)} className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              {hasUnsavedChanges && (
                <Button 
                  onClick={handleSaveGoals} 
                  disabled={saving}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    'Save Goals'
                  )}
                </Button>
              )}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground mt-2">Loading goals...</p>
            </div>
          ) : goals.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No goals created yet. Add your first goal above!</p>
            </div>
          ) : (
            goals.map((goal) => (
              <Card key={goal.id} className="bg-gradient-to-br from-card to-purple-primary/10 border-purple-primary/20">
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    <Target className="h-6 w-6 text-primary mt-1" />
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="font-semibold text-foreground">{goal.title}</h3>
                        <p className="text-sm text-muted-foreground">{goal.description}</p>
                        {goal.targetValue && (
                          <p className="text-xs text-muted-foreground">Target: {goal.targetValue}%</p>
                        )}
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
            ))
          )}

          {hasUnsavedChanges && (
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-orange-800">You have unsaved changes</span>
                  </div>
                  <Button 
                    onClick={handleSaveGoals} 
                    disabled={saving}
                    size="sm"
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                        Saving...
                      </>
                    ) : (
                      'Save Now'
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          )}
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