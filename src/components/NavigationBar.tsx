import { Button } from "@/components/ui/button";
import { BarChart3, BookOpen, Brain, Calendar, MessageSquare } from "lucide-react";

export type TabType = "progress" | "journal" | "meditation" | "calendar" | "messages";

const navItems = [
  { id: "progress" as TabType, label: "Progress", icon: BarChart3 },
  { id: "journal" as TabType, label: "Journal", icon: BookOpen },
  { id: "meditation" as TabType, label: "Meditation", icon: Brain },
  { id: "calendar" as TabType, label: "Calendar", icon: Calendar },
  { id: "messages" as TabType, label: "Messages", icon: MessageSquare }
];

interface NavigationBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const NavigationBar = ({ activeTab, onTabChange }: NavigationBarProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-xl border-t border-border/50 shadow-elegant">
      <div className="flex justify-around items-center py-3 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <Button
              key={item.id}
              variant={isActive ? "glass" : "ghost"}
              className={`flex flex-col items-center gap-1 p-3 h-auto transition-all duration-300 ${
                isActive 
                  ? "text-primary bg-primary/10 shadow-subtle scale-105" 
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
              }`}
              onClick={() => onTabChange(item.id)}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'animate-glow' : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};