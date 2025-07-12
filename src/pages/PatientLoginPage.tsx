import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PatientLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Sign in with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      if (!authData.user) {
        throw new Error("Authentication failed");
      }

      // Query the patients table to get patient data using the authenticated user's email
      const { data: patient, error: patientError } = await supabase
        .from('patients')
        .select('*')
        .eq('email', authData.user.email)
        .single();

      if (patientError || !patient) {
        toast({
          title: "Access denied",
          description: "You are not registered as a patient in this system.",
          variant: "destructive",
        });
        await supabase.auth.signOut();
        return;
      }

      // Store patient session data in localStorage
      localStorage.setItem('patientSession', JSON.stringify({
        id: patient.id,
        name: patient.name,
        email: patient.email,
        psychologist_id: patient.psychologist_id
      }));
      
      toast({
        title: "Welcome!",
        description: `Hello ${patient.name}, you're now logged in.`,
      });
      
      navigate('/patient-dashboard');
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/80 to-primary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          className="mb-6 text-muted-foreground hover:text-foreground"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <Card className="glass-card border-primary/20 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              Patient Login
            </h1>
            <p className="text-muted-foreground">
              Sign in with your email and password
            </p>
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="bg-background/50 border-primary/20"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="bg-background/50 border-primary/20"
                required
              />
              <p className="text-sm text-muted-foreground">
                Use the credentials provided by your psychologist
              </p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
              disabled={loading || !email || !password}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign In
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default PatientLoginPage;