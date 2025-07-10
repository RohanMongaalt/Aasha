import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send } from "lucide-react";
import { useState } from "react";

interface MessagesTabProps {
  isPatient?: boolean;
  patientSession?: any;
}

export const MessagesTab = ({ isPatient = false, patientSession }: MessagesTabProps) => {
  const [newMessage, setNewMessage] = useState("");
  
  const conversations = [
    { 
      id: 1, 
      name: "Dr. Sarah Wilson", 
      lastMessage: "How are you feeling today?", 
      time: "2 min ago",
      unread: 2
    },
    { 
      id: 2, 
      name: "Dr. Michael Chen", 
      lastMessage: "Great progress on your goals!", 
      time: "1 hour ago",
      unread: 0
    },
    { 
      id: 3, 
      name: "Support Group", 
      lastMessage: "Welcome to our community", 
      time: "3 hours ago",
      unread: 1
    }
  ];

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">Messages</h1>
        <p className="text-muted-foreground">Connect with your care team</p>
      </div>

      {/* Quick Message Input */}
      <Card className="bg-gradient-to-br from-card to-purple-primary/10 border-purple-primary/20">
        <div className="p-4">
          <h3 className="font-medium text-foreground mb-3">Send a quick message</h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="How are you feeling today?"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground"
            />
            <Button size="sm" className="bg-primary">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Conversations */}
      {conversations.map((conversation) => (
        <Card key={conversation.id} className="bg-gradient-to-br from-card to-purple-secondary/10 border-purple-secondary/20">
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{conversation.name}</h3>
                  <p className="text-sm text-muted-foreground">{conversation.lastMessage}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">{conversation.time}</p>
                {conversation.unread > 0 && (
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mt-1 ml-auto">
                    <span className="text-xs text-primary-foreground">{conversation.unread}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};