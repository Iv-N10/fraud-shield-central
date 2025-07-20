-- Create audit logging system
CREATE TABLE public.audit_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  table_name TEXT,
  record_id TEXT,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('UTC', now()),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create alerts and notifications system
CREATE TABLE public.system_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  alert_type TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB DEFAULT '{}'::jsonb,
  is_read BOOLEAN NOT NULL DEFAULT false,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('UTC', now()),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('UTC', now())
);

-- Create reporting views and tables
CREATE TABLE public.report_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  query_config JSONB NOT NULL,
  chart_config JSONB,
  filters JSONB DEFAULT '{}'::jsonb,
  is_public BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('UTC', now()),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('UTC', now())
);

CREATE TABLE public.report_executions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  template_id UUID REFERENCES public.report_templates(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  execution_time_ms INTEGER,
  row_count INTEGER,
  file_path TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('UTC', now())
);

-- Enable RLS on all new tables
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_executions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for audit_logs
CREATE POLICY "Admins can view all audit logs"
ON public.audit_logs
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.full_name = 'Admin'
  )
);

CREATE POLICY "Users can view their own audit logs"
ON public.audit_logs
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- RLS Policies for system_alerts
CREATE POLICY "Users can view their own alerts"
ON public.system_alerts
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own alerts"
ON public.system_alerts
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "System can insert alerts"
ON public.system_alerts
FOR INSERT
TO authenticated
WITH CHECK (true);

-- RLS Policies for report_templates
CREATE POLICY "Users can manage their own report templates"
ON public.report_templates
FOR ALL
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can view public report templates"
ON public.report_templates
FOR SELECT
TO authenticated
USING (is_public = true OR auth.uid() = user_id);

-- RLS Policies for report_executions
CREATE POLICY "Users can view their own report executions"
ON public.report_executions
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create report executions"
ON public.report_executions
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX idx_audit_logs_user_id ON public.audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON public.audit_logs(created_at DESC);
CREATE INDEX idx_audit_logs_action ON public.audit_logs(action);
CREATE INDEX idx_audit_logs_table_name ON public.audit_logs(table_name);

CREATE INDEX idx_system_alerts_user_id ON public.system_alerts(user_id);
CREATE INDEX idx_system_alerts_created_at ON public.system_alerts(created_at DESC);
CREATE INDEX idx_system_alerts_is_read ON public.system_alerts(is_read);
CREATE INDEX idx_system_alerts_severity ON public.system_alerts(severity);

CREATE INDEX idx_report_templates_user_id ON public.report_templates(user_id);
CREATE INDEX idx_report_templates_is_public ON public.report_templates(is_public);

CREATE INDEX idx_report_executions_template_id ON public.report_executions(template_id);
CREATE INDEX idx_report_executions_user_id ON public.report_executions(user_id);
CREATE INDEX idx_report_executions_created_at ON public.report_executions(created_at DESC);

-- Function to automatically update updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('UTC', now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_system_alerts_updated_at
  BEFORE UPDATE ON public.system_alerts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_report_templates_updated_at
  BEFORE UPDATE ON public.report_templates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Audit logging function
CREATE OR REPLACE FUNCTION public.audit_table_changes()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable audit logging for key tables
CREATE TRIGGER audit_transactions_changes
  AFTER INSERT OR UPDATE OR DELETE ON public.transactions
  FOR EACH ROW
  EXECUTE FUNCTION public.audit_table_changes();

CREATE TRIGGER audit_profiles_changes
  AFTER INSERT OR UPDATE OR DELETE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.audit_table_changes();

CREATE TRIGGER audit_kyc_documents_changes
  AFTER INSERT OR UPDATE OR DELETE ON public.kyc_documents
  FOR EACH ROW
  EXECUTE FUNCTION public.audit_table_changes();

-- Enable realtime for alerts
ALTER PUBLICATION supabase_realtime ADD TABLE public.system_alerts;
ALTER TABLE public.system_alerts REPLICA IDENTITY FULL;