-- Fix critical security issue: Ensure appointments table is properly secured
-- Drop any existing permissive policies and create restrictive ones

-- Remove the existing public insert policy and replace with a more secure one
DROP POLICY IF EXISTS "Public can create appointments" ON public.appointments;

-- Create a secure policy for appointment creation (public can still book appointments)
CREATE POLICY "Anyone can create appointments"
ON public.appointments
FOR INSERT
WITH CHECK (true);

-- Ensure the admin policy exists and is the ONLY way to read appointments
DROP POLICY IF EXISTS "Admins can view all appointments" ON public.appointments;

CREATE POLICY "Only admins can view appointments"
ON public.appointments
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE user_id = auth.uid()
    AND is_admin = true
  )
);

-- Add policy for admins to update appointment status
CREATE POLICY "Admins can update appointments"
ON public.appointments
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE user_id = auth.uid()
    AND is_admin = true
  )
);

-- Add policy for admins to delete appointments if needed
CREATE POLICY "Admins can delete appointments"
ON public.appointments
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE user_id = auth.uid()
    AND is_admin = true
  )
);

-- Ensure RLS is enabled on appointments table
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Make profiles table more secure - only allow users to see their own profile
-- and prevent unauthorized profile updates
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

-- Recreate more restrictive profile policies
CREATE POLICY "Users can view own profile only"
ON public.profiles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile only"
ON public.profiles
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id AND user_id = OLD.user_id);

CREATE POLICY "System can insert profiles"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Ensure RLS is enabled on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;