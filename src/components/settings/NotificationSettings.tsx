
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  Settings,
  Phone
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    email: '',
    phone: '',
    email_notifications: {
      fraud_alerts: true,
      kyc_updates: true,
      reports: true,
      system_updates: true
    },
    sms_notifications: {
      high_risk_alerts: true,
      security_alerts: true
    }
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch notification settings
  const { data: notificationData, isLoading } = useQuery({
    queryKey: ['notificationSettings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('notification_settings')
        .select('*')
        .single();
      
      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error('Error fetching notification settings:', error);
        throw error;
      }
      
      return data;
    },
  });

  // Update local state when data is fetched
  useEffect(() => {
    if (notificationData) {
      setSettings({
        email: notificationData.email || '',
        phone: notificationData.phone || '',
        email_notifications: notificationData.email_notifications || {
          fraud_alerts: true,
          kyc_updates: true,
          reports: true,
          system_updates: true
        },
        sms_notifications: notificationData.sms_notifications || {
          high_risk_alerts: true,
          security_alerts: true
        }
      });
    }
  }, [notificationData]);

  // Real-time subscription for notification settings
  useEffect(() => {
    const channel = supabase
      .channel('notification_settings_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notification_settings'
        },
        (payload) => {
          console.log('Notification settings changed:', payload);
          queryClient.invalidateQueries({ queryKey: ['notificationSettings'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  // Save notification settings mutation
  const saveSettingsMutation = useMutation({
    mutationFn: async (newSettings: typeof settings) => {
      const { data, error } = await supabase
        .from('notification_settings')
        .upsert([{
          email: newSettings.email,
          phone: newSettings.phone,
          email_notifications: newSettings.email_notifications,
          sms_notifications: newSettings.sms_notifications,
          user_id: (await supabase.auth.getUser()).data.user?.id
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notificationSettings'] });
      toast({
        title: "Settings Saved",
        description: "Your notification preferences have been updated successfully.",
      });
    },
    onError: (error) => {
      console.error('Error saving notification settings:', error);
      toast({
        title: "Error",
        description: "Failed to save notification settings. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Test notification mutation
  const testNotificationMutation = useMutation({
    mutationFn: async (type: 'email' | 'sms') => {
      // Simulate sending test notification
      await new Promise(resolve => setTimeout(resolve, 1000));
      return type;
    },
    onSuccess: (type) => {
      toast({
        title: "Test Notification Sent",
        description: `Test ${type} notification has been sent successfully.`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send test notification.",
        variant: "destructive",
      });
    }
  });

  const handleEmailNotificationChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      email_notifications: {
        ...prev.email_notifications,
        [key]: value
      }
    }));
  };

  const handleSmsNotificationChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      sms_notifications: {
        ...prev.sms_notifications,
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    if (!settings.email && !settings.phone) {
      toast({
        title: "Error",
        description: "Please provide at least an email address or phone number.",
        variant: "destructive",
      });
      return;
    }
    saveSettingsMutation.mutate(settings);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>Loading your notification preferences...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notification Settings
          </CardTitle>
          <CardDescription>
            Configure how and when you receive notifications about fraud alerts, system updates, and more
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings(prev => ({...prev, email: e.target.value}))}
                  placeholder="your.email@company.com"
                />
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => testNotificationMutation.mutate('email')}
                    disabled={!settings.email || testNotificationMutation.isPending}
                  >
                    {testNotificationMutation.isPending ? 'Sending...' : 'Test Email'}
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={settings.phone}
                  onChange={(e) => setSettings(prev => ({...prev, phone: e.target.value}))}
                  placeholder="+1 (555) 123-4567"
                />
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => testNotificationMutation.mutate('sms')}
                    disabled={!settings.phone || testNotificationMutation.isPending}
                  >
                    {testNotificationMutation.isPending ? 'Sending...' : 'Test SMS'}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Email Notifications */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Email Notifications</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-red-500" />
                    Fraud Alerts
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Immediate notifications when fraud is detected
                  </p>
                </div>
                <Switch
                  checked={settings.email_notifications.fraud_alerts}
                  onCheckedChange={(checked) => handleEmailNotificationChange('fraud_alerts', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    KYC Updates
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Customer verification status changes
                  </p>
                </div>
                <Switch
                  checked={settings.email_notifications.kyc_updates}
                  onCheckedChange={(checked) => handleEmailNotificationChange('kyc_updates', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-gray-500" />
                    Reports
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Weekly and monthly fraud detection reports
                  </p>
                </div>
                <Switch
                  checked={settings.email_notifications.reports}
                  onCheckedChange={(checked) => handleEmailNotificationChange('reports', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-green-500" />
                    System Updates
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Platform updates and maintenance notifications
                  </p>
                </div>
                <Switch
                  checked={settings.email_notifications.system_updates}
                  onCheckedChange={(checked) => handleEmailNotificationChange('system_updates', checked)}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* SMS Notifications */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              <h3 className="text-lg font-semibold">SMS Notifications</h3>
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">Critical Only</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    High Risk Alerts
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Critical fraud alerts requiring immediate attention
                  </p>
                </div>
                <Switch
                  checked={settings.sms_notifications.high_risk_alerts}
                  onCheckedChange={(checked) => handleSmsNotificationChange('high_risk_alerts', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-orange-500" />
                    Security Alerts
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Security incidents and system breaches
                  </p>
                </div>
                <Switch
                  checked={settings.sms_notifications.security_alerts}
                  onCheckedChange={(checked) => handleSmsNotificationChange('security_alerts', checked)}
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => window.location.reload()}>
              Reset Changes
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={saveSettingsMutation.isPending}
            >
              {saveSettingsMutation.isPending ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationSettings;
