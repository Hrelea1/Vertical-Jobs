-- Create appointment status enum if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'appointment_status') THEN
    CREATE TYPE public.appointment_status AS ENUM ('pending', 'confirmed', 'cancelled');
  END IF;
END$$;

-- Create helper function to update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Validation function to ensure scheduled_at is in the future
CREATE OR REPLACE FUNCTION public.validate_appointment_time()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.scheduled_at <= now() THEN
    RAISE EXCEPTION 'Appointment time must be in the future';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create appointments table
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service TEXT,
  scheduled_at TIMESTAMPTZ NOT NULL,
  message TEXT,
  status public.appointment_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Public can create appointments (INSERT only)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'appointments' AND policyname = 'Public can create appointments'
  ) THEN
    CREATE POLICY "Public can create appointments"
      ON public.appointments
      AS PERMISSIVE
      FOR INSERT
      TO public
      WITH CHECK (true);
  END IF;
END$$;

-- No SELECT/UPDATE/DELETE policies are added, so they are denied by default.

-- Trigger to auto update updated_at
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trg_appointments_updated_at'
  ) THEN
    CREATE TRIGGER trg_appointments_updated_at
      BEFORE UPDATE ON public.appointments
      FOR EACH ROW
      EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END$$;

-- Trigger to validate appointment time before insert/update
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trg_validate_appointment_time_ins'
  ) THEN
    CREATE TRIGGER trg_validate_appointment_time_ins
      BEFORE INSERT ON public.appointments
      FOR EACH ROW
      EXECUTE FUNCTION public.validate_appointment_time();
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trg_validate_appointment_time_upd'
  ) THEN
    CREATE TRIGGER trg_validate_appointment_time_upd
      BEFORE UPDATE ON public.appointments
      FOR EACH ROW
      EXECUTE FUNCTION public.validate_appointment_time();
  END IF;
END$$;