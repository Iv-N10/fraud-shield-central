-- Fix database function search_path vulnerabilities
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, company)
  VALUES (new.id, new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'company')
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$;

CREATE OR REPLACE FUNCTION public.audit_table_changes()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert audit log entry
  INSERT INTO public.audit_logs (
    user_id,
    action,
    table_name,
    record_id,
    old_values,
    new_values,
    ip_address
  ) VALUES (
    auth.uid(),
    TG_OP,
    TG_TABLE_NAME,
    CASE 
      WHEN TG_OP = 'DELETE' THEN OLD.id::text
      ELSE NEW.id::text
    END,
    CASE 
      WHEN TG_OP = 'DELETE' THEN row_to_json(OLD)
      WHEN TG_OP = 'UPDATE' THEN row_to_json(OLD)
      ELSE NULL
    END,
    CASE 
      WHEN TG_OP = 'DELETE' THEN NULL
      ELSE row_to_json(NEW)
    END,
    inet_client_addr()
  );
  
  RETURN CASE 
    WHEN TG_OP = 'DELETE' THEN OLD
    ELSE NEW
  END;
END;
$$;

-- Improve subscribers table RLS policy to remove email-based access vulnerability
DROP POLICY IF EXISTS "select_own_subscription" ON public.subscribers;
DROP POLICY IF EXISTS "insert_own_subscription" ON public.subscribers;
DROP POLICY IF EXISTS "update_own_subscription_secure" ON public.subscribers;

-- Create more secure policies that only allow user_id based access
CREATE POLICY "Users can view their own subscription" 
ON public.subscribers 
FOR SELECT 
USING (user_id = auth.uid());

CREATE POLICY "Users can create their own subscription" 
ON public.subscribers 
FOR INSERT 
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own subscription" 
ON public.subscribers 
FOR UPDATE 
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Create rate limiting table for security monitoring
CREATE TABLE IF NOT EXISTS public.rate_limits (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  action_type text NOT NULL,
  ip_address inet,
  request_count integer NOT NULL DEFAULT 1,
  window_start timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own rate limits" 
ON public.rate_limits 
FOR SELECT 
USING (user_id = auth.uid());

-- Add security audit triggers only if they don't exist
DROP TRIGGER IF EXISTS audit_notification_settings_changes ON public.notification_settings;
CREATE TRIGGER audit_notification_settings_changes
BEFORE INSERT OR UPDATE OR DELETE ON public.notification_settings
FOR EACH ROW EXECUTE FUNCTION public.audit_table_changes();

DROP TRIGGER IF EXISTS audit_bank_connections_changes ON public.bank_connections;
CREATE TRIGGER audit_bank_connections_changes
BEFORE INSERT OR UPDATE OR DELETE ON public.bank_connections
FOR EACH ROW EXECUTE FUNCTION public.audit_table_changes();