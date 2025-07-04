import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Calendar, Plus, BookOpen } from "lucide-react";
import { JournalEntryDialog } from "@/components/JournalEntryDialog";
import { useFirestore, JournalEntry } from "@/hooks/useFirestore";

export const JournalTab = () => {
  const { addJournalEntry, useJournalEntries } = useFirestore();
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Mock user ID - replace with actual auth
  const userId = "current-user-id";
  const { entries, loading } = useJournalEntries(userId);

  const addEntry = async () => {
    if (newTitle.trim() && newContent.trim()) {
      await addJournalEntry({
        title: newTitle.trim(),
        content: newContent.trim(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        userId
      });
      setNewTitle("");
      setNewContent("");
      setIsAdding(false);
    }
  };

  const handleEntryClick = (entry: JournalEntry) => {
    setSelectedEntry(entry);
    setDialogOpen(true);
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
      {loading ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Loading entries...</p>
        </div>
      ) : entries.length > 0 ? (
        entries.map((entry) => (
          <Card 
            key={entry.id} 
            className="bg-gradient-to-br from-card to-purple-secondary/10 border-purple-secondary/20 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleEntryClick(entry)}
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">{entry.title}</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{entry.date}</span>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                {entry.content}
              </p>
              <div className="flex items-center gap-2 mt-3">
                <BookOpen className="h-4 w-4 text-purple-primary" />
                <span className="text-xs text-muted-foreground">Click to read full entry</span>
              </div>
            </div>
          </Card>
        ))
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No journal entries yet. Start writing your first entry!</p>
        </div>
      )}

      <JournalEntryDialog 
        entry={selectedEntry}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
};