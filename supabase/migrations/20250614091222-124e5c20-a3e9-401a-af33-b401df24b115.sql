
-- Create bank_connections table for real-time bank integrations
CREATE TABLE public.bank_connections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  bank_name TEXT NOT NULL,
  bank_code TEXT,
  integration_type TEXT NOT NULL, -- 'SWIFT', 'ISO20022', 'Open Banking', etc.
  api_endpoint TEXT,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'active', 'inactive', 'error'
  connection_config JSONB, -- Store bank-specific config
  last_sync_at TIMESTAMP WITH TIME ZONE,
  connected_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create notification_settings table
CREATE TABLE public.notification_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  email TEXT,
  phone TEXT,
  email_notifications JSONB DEFAULT '{"fraud_alerts": true, "kyc_updates": true, "reports": true, "system_updates": true}',
  sms_notifications JSONB DEFAULT '{"high_risk_alerts": true, "security_alerts": true}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Create bank_transaction_feed table for real-time transaction data from banks
CREATE TABLE public.bank_transaction_feed (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  bank_connection_id UUID REFERENCES public.bank_connections NOT NULL,
  external_transaction_id TEXT NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  transaction_type TEXT NOT NULL, -- 'transfer', 'payment', 'withdrawal', etc.
  sender_account TEXT,
  recipient_account TEXT,
  description TEXT,
  fraud_score INTEGER DEFAULT 0, -- 0-100 risk score
  fraud_status TEXT DEFAULT 'pending', -- 'pending', 'cleared', 'flagged', 'blocked'
  processed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for all tables
ALTER TABLE public.bank_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bank_transaction_feed ENABLE ROW LEVEL SECURITY;

-- RLS policies for bank_connections
CREATE POLICY "Users can view their own bank connections" 
  ON public.bank_connections 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bank connections" 
  ON public.bank_connections 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bank connections" 
  ON public.bank_connections 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bank connections" 
  ON public.bank_connections 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- RLS policies for notification_settings
CREATE POLICY "Users can view their own notification settings" 
  ON public.notification_settings 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own notification settings" 
  ON public.notification_settings 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own notification settings" 
  ON public.notification_settings 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- RLS policies for bank_transaction_feed (users can see transactions from their connected banks)
CREATE POLICY "Users can view transactions from their connected banks" 
  ON public.bank_transaction_feed 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.bank_connections 
      WHERE bank_connections.id = bank_transaction_feed.bank_connection_id 
      AND bank_connections.user_id = auth.uid()
    )
  );

-- Add triggers for updated_at
CREATE TRIGGER set_bank_connections_updated_at
  BEFORE UPDATE ON public.bank_connections
  FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();

CREATE TRIGGER set_notification_settings_updated_at
  BEFORE UPDATE ON public.notification_settings
  FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();

-- Enable realtime for these tables
ALTER TABLE public.bank_connections REPLICA IDENTITY FULL;
ALTER TABLE public.notification_settings REPLICA IDENTITY FULL;
ALTER TABLE public.bank_transaction_feed REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.bank_connections;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notification_settings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.bank_transaction_feed;
