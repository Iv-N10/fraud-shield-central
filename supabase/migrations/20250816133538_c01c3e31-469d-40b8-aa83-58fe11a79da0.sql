-- Phase 1: Role-based access control and secure admin policies
-- 1) Create app_role enum if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
    CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
  END IF;
END$$;

-- 2) Create user_roles table (idempotent)
CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3) Create role-check function with SECURITY DEFINER and safe search_path
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

-- 4) Seed admin roles for existing profiles with name 'Admin' to preserve current access
INSERT INTO public.user_roles (user_id, role)
SELECT p.id, 'admin'::public.app_role
FROM public.profiles p
WHERE p.full_name = 'Admin'
ON CONFLICT (user_id, role) DO NOTHING;

-- 5) Replace insecure admin policies that rely on profiles.full_name = 'Admin'
-- ai_model_metrics
DROP POLICY IF EXISTS "Admin access to AI metrics" ON public.ai_model_metrics;
DROP POLICY IF EXISTS "Admin access to AI metrics " ON public.ai_model_metrics;
CREATE POLICY "Admins manage AI metrics"
ON public.ai_model_metrics
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- security_incidents
DROP POLICY IF EXISTS "Admin access to security incidents" ON public.security_incidents;
DROP POLICY IF EXISTS "Admin access to security incidents " ON public.security_incidents;
CREATE POLICY "Admins manage security incidents"
ON public.security_incidents
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- fraud_patterns
DROP POLICY IF EXISTS "Admin access to fraud patterns" ON public.fraud_patterns;
DROP POLICY IF EXISTS "Admin access to fraud patterns " ON public.fraud_patterns;
CREATE POLICY "Admins manage fraud patterns"
ON public.fraud_patterns
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ai_learning_sessions
DROP POLICY IF EXISTS "Admin access to AI learning sessions" ON public.ai_learning_sessions;
DROP POLICY IF EXISTS "Admin access to AI learning sessions " ON public.ai_learning_sessions;
CREATE POLICY "Admins manage AI learning sessions"
ON public.ai_learning_sessions
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- audit_logs (keep user-owned view policy, replace admin-wide)
DROP POLICY IF EXISTS "Admins can view all audit logs" ON public.audit_logs;
DROP POLICY IF EXISTS "Admins can view all audit logs " ON public.audit_logs;
CREATE POLICY "Admins can view all audit logs"
ON public.audit_logs
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- user_roles RLS policies
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins manage roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Phase 2: Subscribers table hardening
-- Replace overly permissive insert/update policies
DROP POLICY IF EXISTS "insert_subscription" ON public.subscribers;
DROP POLICY IF EXISTS "update_own_subscription" ON public.subscribers;

-- Allow users to insert their own subscription (by user_id or by verified email)
CREATE POLICY "insert_own_subscription"
ON public.subscribers
FOR INSERT
TO authenticated
WITH CHECK (
  (user_id IS NOT NULL AND user_id = auth.uid())
  OR (user_id IS NULL AND email = auth.email())
);

-- Restrict updates to own subscription only
CREATE POLICY "update_own_subscription_secure"
ON public.subscribers
FOR UPDATE
TO authenticated
USING (
  (user_id IS NOT NULL AND user_id = auth.uid())
  OR (user_id IS NULL AND email = auth.email())
)
WITH CHECK (
  (user_id IS NOT NULL AND user_id = auth.uid())
  OR (user_id IS NULL AND email = auth.email())
);

-- Phase 3: System alerts insertion restricted to admins (service role bypasses RLS as needed)
DROP POLICY IF EXISTS "System can insert alerts" ON public.system_alerts;
CREATE POLICY "Admins can insert alerts"
ON public.system_alerts
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Phase 4: Secure existing SECURITY DEFINER functions by setting search_path
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