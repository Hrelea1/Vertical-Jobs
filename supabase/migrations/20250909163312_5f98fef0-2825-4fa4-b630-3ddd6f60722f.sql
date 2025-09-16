-- Update the handle_new_user function to trim whitespace from usernames
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, username, is_admin)
  VALUES (
    NEW.id, 
    TRIM(NEW.raw_user_meta_data->>'username'),
    CASE 
      WHEN TRIM(NEW.raw_user_meta_data->>'username') IN ('AdminDavid', 'AdminGeorge') THEN TRUE
      ELSE FALSE
    END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Update existing AdminDavid profile to set is_admin = true
UPDATE public.profiles 
SET is_admin = true, username = TRIM(username)
WHERE TRIM(username) IN ('AdminDavid', 'AdminGeorge');