import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddPatientDialogProps {
  onPatientAdded: () => void;
}

export const AddPatientDialog = ({ onPatientAdded }: AddPatientDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get current psychologist's ID
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("Not authenticated");
      }

      // Check if patient email already exists for this psychologist
      const { data: existingPatient } = await supabase
        .from('patients')
        .select('email')
        .eq('email', email)
        .eq('psychologist_id', user.id)
        .maybeSingle();

      if (existingPatient) {
        toast({
          title: "Patient already exists",
          description: "A patient with this email is already assigned to you.",
          variant: "destructive",
        });
        return;
      }

      // Create patient record in patients table (patient will sign up later)
      const { error: patientError } = await supabase
        .from('patients')
        .insert({
          name,
          email,
          psychologist_id: user.id,
          is_registered: false,
        });

      if (patientError) throw patientError;

      toast({
        title: "Patient added successfully",
        description: `${name} has been invited. They can now sign up with their email.`,
      });

      // Reset form and close dialog
      setName("");
      setEmail("");
      setOpen(false);
      onPatientAdded();
    } catch (error: any) {
      toast({
        title: "Error adding patient",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Patient
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Patient</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="patient-name">Patient Name</Label>
            <Input
              id="patient-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter patient's full name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="patient-email">Email Address</Label>
            <Input
              id="patient-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter patient's email"
              required
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Patient
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};