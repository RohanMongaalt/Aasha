-- Remove PIN field and ensure email field exists with proper constraints
ALTER TABLE public.patients DROP COLUMN IF EXISTS pin;

-- Add email column if it doesn't exist (with unique constraint per psychologist)
ALTER TABLE public.patients ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.patients ADD COLUMN IF NOT EXISTS is_registered BOOLEAN DEFAULT false;

-- Create unique constraint for email per psychologist
DROP INDEX IF EXISTS unique_email_per_psychologist;
CREATE UNIQUE INDEX unique_email_per_psychologist ON public.patients (email, psychologist_id);

-- Add RLS policies for patients table
DROP POLICY IF EXISTS "Patients can view their own data" ON public.patients;
DROP POLICY IF EXISTS "Psychologists can manage their patients" ON public.patients;

-- Patients can view their own data by matching email with auth.users
CREATE POLICY "Patients can view their own data" 
ON public.patients 
FOR SELECT 
USING (
  email = (SELECT email FROM auth.users WHERE id = auth.uid())
);

-- Psychologists can manage their assigned patients
CREATE POLICY "Psychologists can manage their patients" 
ON public.patients 
FOR ALL 
USING (psychologist_id = auth.uid());