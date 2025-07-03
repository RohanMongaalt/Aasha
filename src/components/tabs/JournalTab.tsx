import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Calendar, Plus, BookOpen } from "lucide-react";

export const JournalTab = () => {
  const [entries, setEntries] = useState([
    { id: 1, title: "Gratitude Practice", content: "Today I'm grateful for...", date: "Dec 15, 2024" },
    { id: 2, title: "Daily Reflection", content: "My mood has been improving...", date: "Dec 14, 2024" }
  ]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const addEntry = () => {
    if (newTitle.trim() && newContent.trim()) {
      const newEntry = {
        id: entries.length + 1,
        title: newTitle,
        content: newContent,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      setEntries([newEntry, ...entries]);
      setNewTitle("");
      setNewContent("");
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">Journal</h1>
        <p className="text-muted-foreground">Express your thoughts and feelings</p>
      </div>

      {/* Add New Entry */}
      {isAdding ? (
        <Card className="bg-gradient-to-br from-card to-purple-primary/10 border-purple-primary/20">
          <div className="p-4 space-y-3">
            <Input
              placeholder="Entry title..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="border-purple-primary/20"
            />
            <Textarea
              placeholder="Write your thoughts..."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="min-h-[120px] border-purple-primary/20"
            />
            <div className="flex gap-2">
              <Button onClick={addEntry} className="bg-primary">Save Entry</Button>
              <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
            </div>
          </div>
        </Card>
      ) : (
        <Button onClick={() => setIsAdding(true)} className="w-full bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          New Journal Entry
        </Button>
      )}

      {/* Journal Entries */}
      {entries.map((entry) => (
        <Card key={entry.id} className="bg-gradient-to-br from-card to-purple-secondary/10 border-purple-secondary/20">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">{entry.title}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{entry.date}</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">{entry.content}</p>
            <div className="flex items-center gap-2 mt-3">
              <BookOpen className="h-4 w-4 text-purple-primary" />
              <span className="text-xs text-muted-foreground">Personal Entry</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};