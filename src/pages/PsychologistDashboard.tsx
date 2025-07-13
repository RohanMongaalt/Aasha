import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Target, Search, Users, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AddPatientDialog } from "@/components/AddPatientDialog";

interface Patient {
  id: string;
  name: string | null;
  email: string | null;
  created_at: string | null;
  is_registered: boolean;
}

export const PsychologistDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  const fetchPatients = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('patients')
        .select('id, name, email, created_at, is_registered')
        .eq('psychologist_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setPatients(data || []);
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }
      setUser(user);
      fetchPatients();
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate('/auth');
      } else if (event === 'SIGNED_IN') {
        setUser(session.user);
        fetchPatients();
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const filteredPatients = patients.filter(patient =>
    patient.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (isRegistered: boolean) => {
    return isRegistered ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800';
  };

  const getStatusText = (isRegistered: boolean) => {
    return isRegistered ? 'Registered' : 'Pending';
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-purple-header p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-center flex-1">
            <h1 className="text-3xl font-bold text-foreground">Psychologist Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage your patients and track their progress</p>
          </div>
          <Button
            variant="outline"
            onClick={handleSignOut}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
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

        {/* Search and Add Patient */}
        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <AddPatientDialog onPatientAdded={fetchPatients} />
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
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.is_registered)}`}>
                        {getStatusText(patient.is_registered)}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>Email: {patient.email}</p>
                      {patient.created_at && (
                        <p>Added: {new Date(patient.created_at).toLocaleDateString()}</p>
                      )}
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