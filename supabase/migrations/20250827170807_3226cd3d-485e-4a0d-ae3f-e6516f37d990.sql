-- Fix search path security for functions
ALTER FUNCTION public.update_updated_at_column() SET search_path = public;
ALTER FUNCTION public.validate_appointment_time() SET search_path = public;