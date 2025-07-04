import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Target, Search, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Patient {
  id: string;
  name: string;
  lastSession: string;
  status: 'active' | 'inactive';
  moodTrend: 'improving' | 'declining' | 'stable';
}

export const PsychologistDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data - replace with Firebase data
  const [patients] = useState<Patient[]>([
    { id: '1', name: 'Sarah Johnson', lastSession: '2024-12-14', status: 'active', moodTrend: 'improving' },
    { id: '2', name: 'Michael Chen', lastSession: '2024-12-13', status: 'active', moodTrend: 'stable' },
    { id: '3', name: 'Emily Davis', lastSession: '2024-12-12', status: 'inactive', moodTrend: 'declining' },
    { id: '4', name: 'David Wilson', lastSession: '2024-12-11', status: 'active', moodTrend: 'improving' },
  ]);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getMoodTrendColor = (trend: string) => {
    switch (trend) {
      case 'improving': return 'text-green-500';
      case 'declining': return 'text-red-500';
      default: return 'text-yellow-500';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-purple-header p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Psychologist Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage your patients and track their progress</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-card to-purple-primary/10 border-purple-primary/20">
            <div className="p-4 text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold text-foreground">Total Patients</h3>
              <p className="text-2xl font-bold text-primary">{patients.length}</p>
            </div>
          </Card>
          <Card className="bg-gradient-to-br from-card to-purple-secondary/10 border-purple-secondary/20">
            <div className="p-4 text-center">
              <Target className="h-8 w-8 text-secondary mx-auto mb-2" />
              <h3 className="font-semibold text-foreground">Active Goals</h3>
              <p className="text-2xl font-bold text-secondary">12</p>
            </div>
          </Card>
          <Card className="bg-gradient-to-br from-card to-purple-accent/10 border-purple-accent/20">
            <div className="p-4 text-center">
              <MessageSquare className="h-8 w-8 text-accent mx-auto mb-2" />
              <h3 className="font-semibold text-foreground">Messages</h3>
              <p className="text-2xl font-bold text-accent">5</p>
            </div>
          </Card>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Patients List */}
        <div className="space-y-4">
          {filteredPatients.map((patient) => (
            <Card key={patient.id} className="bg-gradient-to-br from-card to-purple-primary/5 border-purple-primary/20">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-foreground">{patient.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                        {patient.status}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>Last session: {patient.lastSession}</p>
                      <p className={`font-medium ${getMoodTrendColor(patient.moodTrend)}`}>
                        Mood trend: {patient.moodTrend}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/messages/${patient.id}`)}
                      className="flex items-center gap-1"
                    >
                      <MessageSquare className="h-4 w-4" />
                      Chat
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => navigate(`/goals/${patient.id}`)}
                      className="flex items-center gap-1"
                    >
                      <Target className="h-4 w-4" />
                      Goals
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No patients found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};