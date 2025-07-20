import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Bell, Plus, AlertTriangle, Info, CheckCircle, XCircle, Settings, Filter, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { format, formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface SystemAlert {
  id: string;
  alert_type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  data: any;
  is_read: boolean;
  expires_at: string | null;
  created_at: string;
}

const RealTimeAlertsSystem = () => {
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);
  const [filteredAlerts, setFilteredAlerts] = useState<SystemAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [severityFilter, setSeverityFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { toast } = useToast();

  const [newAlert, setNewAlert] = useState({
    title: '',
    message: '',
    severity: 'medium' as const,
    alert_type: 'system',
    expires_at: ''
  });

  useEffect(() => {
    fetchAlerts();
    setupRealtimeSubscription();
  }, []);

  useEffect(() => {
    filterAlerts();
  }, [alerts, severityFilter, typeFilter, showUnreadOnly]);

  const fetchAlerts = async () => {
    try {
      const { data, error } = await supabase
        .from('system_alerts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAlerts((data || []).map(alert => ({
        ...alert,
        severity: alert.severity as 'low' | 'medium' | 'high' | 'critical'
      })));
    } catch (error) {
      console.error('Error fetching alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('system_alerts_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'system_alerts'
        },
        (payload) => {
          const newAlert = payload.new as SystemAlert;
          setAlerts(prev => [newAlert, ...prev]);
          
          // Show toast notification for new alerts
          toast({
            title: "New Alert",
            description: newAlert.title,
            variant: newAlert.severity === 'critical' || newAlert.severity === 'high' ? 'destructive' : 'default'
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'system_alerts'
        },
        (payload) => {
          const updatedAlert = payload.new as SystemAlert;
          setAlerts(prev => 
            prev.map(alert => 
              alert.id === updatedAlert.id ? updatedAlert : alert
            )
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const filterAlerts = () => {
    let filtered = alerts;

    if (severityFilter !== 'all') {
      filtered = filtered.filter(alert => alert.severity === severityFilter);
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(alert => alert.alert_type === typeFilter);
    }

    if (showUnreadOnly) {
      filtered = filtered.filter(alert => !alert.is_read);
    }

    setFilteredAlerts(filtered);
  };

  const createAlert = async () => {
    try {
      const alertData = {
        ...newAlert,
        expires_at: newAlert.expires_at ? new Date(newAlert.expires_at).toISOString() : null
      };

      const { error } = await supabase
        .from('system_alerts')
        .insert(alertData);

      if (error) throw error;

      setIsCreateDialogOpen(false);
      setNewAlert({
        title: '',
        message: '',
        severity: 'medium',
        alert_type: 'system',
        expires_at: ''
      });

      toast({
        title: "Alert Created",
        description: "New alert has been created successfully"
      });
    } catch (error) {
      console.error('Error creating alert:', error);
      toast({
        title: "Error",
        description: "Failed to create alert",
        variant: "destructive"
      });
    }
  };

  const markAsRead = async (alertId: string) => {
    try {
      const { error } = await supabase
        .from('system_alerts')
        .update({ is_read: true })
        .eq('id', alertId);

      if (error) throw error;
    } catch (error) {
      console.error('Error marking alert as read:', error);
    }
  };

  const deleteAlert = async (alertId: string) => {
    try {
      const { error } = await supabase
        .from('system_alerts')
        .delete()
        .eq('id', alertId);

      if (error) throw error;

      toast({
        title: "Alert Deleted",
        description: "Alert has been removed successfully"
      });
    } catch (error) {
      console.error('Error deleting alert:', error);
      toast({
        title: "Error",
        description: "Failed to delete alert",
        variant: "destructive"
      });
    }
  };

  const markAllAsRead = async () => {
    try {
      const { error } = await supabase
        .from('system_alerts')
        .update({ is_read: true })
        .eq('is_read', false);

      if (error) throw error;

      toast({
        title: "Success",
        description: "All alerts marked as read"
      });
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'medium':
        return <Info className="h-5 w-5 text-yellow-500" />;
      case 'low':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'high':
        return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'low':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      default:
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    }
  };

  const unreadCount = alerts.filter(alert => !alert.is_read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Bell className="h-6 w-6" />
            Real-Time Alerts System
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount} unread
              </Badge>
            )}
          </h2>
          <p className="text-muted-foreground">
            Monitor and manage system alerts and notifications in real-time
          </p>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              Mark All Read
            </Button>
          )}
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Alert
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Alert</DialogTitle>
                <DialogDescription>
                  Create a new system alert or notification
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    placeholder="Alert title"
                    value={newAlert.title}
                    onChange={(e) => setNewAlert(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea
                    placeholder="Alert message and details"
                    value={newAlert.message}
                    onChange={(e) => setNewAlert(prev => ({ ...prev, message: e.target.value }))}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Severity</label>
                    <Select 
                      value={newAlert.severity} 
                      onValueChange={(value: any) => setNewAlert(prev => ({ ...prev, severity: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Type</label>
                    <Select 
                      value={newAlert.alert_type} 
                      onValueChange={(value) => setNewAlert(prev => ({ ...prev, alert_type: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="system">System</SelectItem>
                        <SelectItem value="security">Security</SelectItem>
                        <SelectItem value="fraud">Fraud</SelectItem>
                        <SelectItem value="compliance">Compliance</SelectItem>
                        <SelectItem value="performance">Performance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Expires At (Optional)</label>
                  <Input
                    type="datetime-local"
                    value={newAlert.expires_at}
                    onChange={(e) => setNewAlert(prev => ({ ...prev, expires_at: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={createAlert} disabled={!newAlert.title || !newAlert.message}>
                  Create Alert
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Alert Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="fraud">Fraud</SelectItem>
                <SelectItem value="compliance">Compliance</SelectItem>
                <SelectItem value="performance">Performance</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2">
              <Switch
                id="unread-only"
                checked={showUnreadOnly}
                onCheckedChange={setShowUnreadOnly}
              />
              <label htmlFor="unread-only" className="text-sm font-medium">
                Unread only
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : filteredAlerts.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Bell className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Alerts Found</h3>
              <p className="text-muted-foreground text-center">
                No alerts match your current filters
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredAlerts.map((alert) => (
            <Card key={alert.id} className={`${!alert.is_read ? 'ring-2 ring-primary/20' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    {getSeverityIcon(alert.severity)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{alert.title}</h3>
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                        <Badge variant="outline">
                          {alert.alert_type}
                        </Badge>
                        {!alert.is_read && (
                          <Badge variant="default" className="text-xs">
                            NEW
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-3">{alert.message}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>
                          {formatDistanceToNow(new Date(alert.created_at), { addSuffix: true })}
                        </span>
                        {alert.expires_at && (
                          <span>
                            Expires {formatDistanceToNow(new Date(alert.expires_at), { addSuffix: true })}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!alert.is_read && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => markAsRead(alert.id)}
                      >
                        Mark Read
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteAlert(alert.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default RealTimeAlertsSystem;