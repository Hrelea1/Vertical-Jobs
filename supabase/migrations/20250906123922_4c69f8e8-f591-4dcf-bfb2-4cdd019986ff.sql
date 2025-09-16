-- Update appointments table RLS policies to allow admin users to view all appointments
CREATE POLICY "Admins can view all appointments" 
ON public.appointments 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND is_admin = true
  )
);