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
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePinLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .eq('pin', pin)
        .single();

      if (error) {
        throw new Error('Invalid PIN. Please check your PIN and try again.');
      }

      if (data) {
        // Store patient session in localStorage
        localStorage.setItem('patientSession', JSON.stringify({
          id: data.id,
          name: data.name,
          psychologist_id: data.psychologist_id
        }));
        
        toast({
          title: "Welcome!",
          description: `Hello ${data.name}, you're now logged in.`,
        });
        
        navigate('/patient-dashboard');
      }
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

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setPin(value);
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
              Enter your 6-digit PIN to access your dashboard
            </p>
          </div>

          <form onSubmit={handlePinLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="pin">6-Digit PIN</Label>
              <Input
                id="pin"
                type="text"
                value={pin}
                onChange={handlePinChange}
                placeholder="000000"
                className="bg-background/50 border-primary/20 text-center text-2xl tracking-widest"
                maxLength={6}
                required
              />
              <p className="text-sm text-muted-foreground">
                Enter the PIN provided by your psychologist
              </p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
              disabled={loading || pin.length !== 6}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Access Dashboard
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default PatientLoginPage;