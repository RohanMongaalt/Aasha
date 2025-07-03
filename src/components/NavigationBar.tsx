import { Button } from "@/components/ui/button";
import { User, Calendar, MessageSquare } from "lucide-react";

const navItems = [
  { id: "assigned", label: "Assigned", icon: User },
  { id: "progress", label: "Progress", icon: Calendar, active: true },
  { id: "sessions", label: "Sessions", icon: Calendar },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "tasks", label: "Tasks", icon: Calendar }
];

export const NavigationBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border">
      <div className="flex justify-around items-center py-2 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={`flex flex-col items-center gap-1 p-2 h-auto ${
                item.active 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};