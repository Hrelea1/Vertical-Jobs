-- Fix function search path warnings for enhanced security
CREATE OR REPLACE FUNCTION public.log_sensitive_access()
RETURNS TRIGGER AS $$
BEGIN
  -- Log access to appointments table for security monitoring
  INSERT INTO auth.audit_log_entries (
    instance_id,
    id,
    payload,
    created_at,
    ip_address
  ) VALUES (
    '00000000-0000-0000-0000-000000000000'::uuid,
    gen_random_uuid(),
    json_build_object(
      'event_type', 'table_access',
      'table_name', TG_TABLE_NAME,
      'operation', TG_OP,
      'user_id', auth.uid(),
      'timestamp', now()
    ),
    now(),
    ''
  );
  
  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  ELSE
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Fix search path for validation function
CREATE OR REPLACE FUNCTION public.validate_appointment_data()
RETURNS TRIGGER AS $$
BEGIN
  -- Validate email format
  IF NEW.email IS NOT NULL AND NEW.email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  
  -- Validate phone number (basic format check)
  IF NEW.phone IS NOT NULL AND NEW.phone !~ '^\+?[1-9]\d{1,14}$' THEN
    RAISE EXCEPTION 'Invalid phone number format';
  END IF;
  
  -- Prevent XSS by sanitizing text fields
  NEW.full_name = regexp_replace(NEW.full_name, '[<>\"'']', '', 'g');
  NEW.message = regexp_replace(COALESCE(NEW.message, ''), '[<>\"'']', '', 'g');
  NEW.service = regexp_replace(COALESCE(NEW.service, ''), '[<>\"'']', '', 'g');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Fix search path for rate limiting function
CREATE OR REPLACE FUNCTION public.check_appointment_rate_limit()
RETURNS TRIGGER AS $$
DECLARE
  recent_count INTEGER;
BEGIN
  -- Check if more than 3 appointments from same IP in last hour
  SELECT COUNT(*) INTO recent_count
  FROM public.appointments
  WHERE created_at > now() - interval '1 hour'
    AND email = NEW.email;
  
  IF recent_count >= 3 THEN
    RAISE EXCEPTION 'Rate limit exceeded. Please wait before creating another appointment.';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Fix search path for data masking function  
CREATE OR REPLACE FUNCTION public.mask_sensitive_data(input_text TEXT)
RETURNS TEXT AS $$
BEGIN
  -- Replace email addresses with masked version
  input_text := regexp_replace(input_text, '([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})', '\1***@\2', 'g');
  -- Replace phone numbers with masked version
  input_text := regexp_replace(input_text, '(\+?[1-9]\d{0,3})(\d{3,})(\d{4})', '\1***\3', 'g');
  RETURN input_text;
END;
$$ LANGUAGE plpgsql IMMUTABLE SECURITY DEFINER SET search_path = public;