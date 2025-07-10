import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, User, Calendar, MessageSquare } from "lucide-react";
import { NavigationBar, TabType } from "./NavigationBar";
import { ProgressTab } from "./tabs/ProgressTab";
import { JournalTab } from "./tabs/JournalTab";
import { MeditationTab } from "./tabs/MeditationTab";
import { CalendarTab } from "./tabs/CalendarTab";
import { MessagesTab } from "./tabs/MessagesTab";

interface DashboardProps {
  isPatient?: boolean;
  patientSession?: any;
}

const renderTabContent = (activeTab: TabType, isPatient?: boolean, patientSession?: any) => {
  switch (activeTab) {
    case "progress":
      return <ProgressTab isPatient={isPatient} patientSession={patientSession} />;
    case "journal":
      return <JournalTab isPatient={isPatient} patientSession={patientSession} />;
    case "meditation":
      return <MeditationTab isPatient={isPatient} patientSession={patientSession} />;
    case "calendar":
      return <CalendarTab isPatient={isPatient} patientSession={patientSession} />;
    case "messages":
      return <MessagesTab isPatient={isPatient} patientSession={patientSession} />;
    default:
      return <ProgressTab isPatient={isPatient} patientSession={patientSession} />;
  }
};

export const Dashboard = ({ isPatient = false, patientSession }: DashboardProps = {}) => {
  const [activeTab, setActiveTab] = useState<TabType>("progress");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-purple-header font-inter">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-header to-purple-primary text-white p-4 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="text-xl font-semibold">Aasha</div>
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
        {renderTabContent(activeTab, isPatient, patientSession)}

        {/* Quick Actions - Only show on progress tab */}
        {activeTab === "progress" && (
          <div className="grid grid-cols-2 gap-4 mt-6">
            <Card 
              className="bg-gradient-to-br from-primary to-purple-primary border-none shadow-lg cursor-pointer"
              onClick={() => setActiveTab("meditation")}
            >
              <div className="p-4 text-center">
                <Calendar className="h-8 w-8 text-primary-foreground mx-auto mb-2" />
                <h3 className="font-medium text-primary-foreground">Meditation</h3>
              </div>
            </Card>
            <Card 
              className="bg-gradient-to-br from-secondary to-purple-secondary border-none shadow-lg cursor-pointer"
              onClick={() => setActiveTab("journal")}
            >
              <div className="p-4 text-center">
                <MessageSquare className="h-8 w-8 text-secondary-foreground mx-auto mb-2" />
                <h3 className="font-medium text-secondary-foreground">Journal</h3>
              </div>
            </Card>
          </div>
        )}
      </div>

      <NavigationBar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
      />
    </div>
  );
};