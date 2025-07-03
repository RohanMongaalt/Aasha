import { Button } from "@/components/ui/button";
import { User, Calendar, MessageSquare } from "lucide-react";

export type TabType = "assigned" | "progress" | "sessions" | "messages" | "tasks";

const navItems = [
  { id: "assigned" as TabType, label: "Assigned", icon: User },
  { id: "progress" as TabType, label: "Progress", icon: Calendar },
  { id: "sessions" as TabType, label: "Sessions", icon: Calendar },
  { id: "messages" as TabType, label: "Messages", icon: MessageSquare },
  { id: "tasks" as TabType, label: "Tasks", icon: Calendar }
];

interface NavigationBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const NavigationBar = ({ activeTab, onTabChange }: NavigationBarProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border">
      <div className="flex justify-around items-center py-2 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={`flex flex-col items-center gap-1 p-2 h-auto transition-colors ${
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => onTabChange(item.id)}
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