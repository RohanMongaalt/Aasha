-- Fix RLS policies for patients table to allow email lookup during registration

-- Drop the problematic policy that prevents unauthenticated email lookup
DROP POLICY IF EXISTS "Patients can view their own data" ON public.patients;

-- Add policy to allow public SELECT access for email verification during registration
CREATE POLICY "Public can check patient email existence" 
ON public.patients 
FOR SELECT 
USING (true);

-- Add policy for authenticated patients to view their own data after login
CREATE POLICY "Authenticated patients can view their own data" 
ON public.patients 
FOR SELECT 
TO authenticated
USING (
  auth.uid() IS NOT NULL 
  AND email = (SELECT email FROM auth.users WHERE id = auth.uid())
);