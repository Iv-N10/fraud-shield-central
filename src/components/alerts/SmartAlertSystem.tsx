
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Bell, 
  Settings, 
  AlertTriangle, 
  Mail, 
  MessageSquare, 
  Smartphone,
  Plus,
  X,
  Check
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AlertRule {
  id: string;
  name: string;
  condition: string;
  threshold: number;
  channels: string[];
  enabled: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

interface AlertNotification {
  id: string;
  title: string;
  message: string;
  priority: string;
  timestamp: string;
  acknowledged: boolean;
  ruleId: string;
}

export default function SmartAlertSystem() {
  const [alertRules, setAlertRules] = useState<AlertRule[]>([
    {
      id: '1',
      name: 'High-Risk Transaction',
      condition: 'risk_score_above',
      threshold: 80,
      channels: ['email', 'slack'],
      enabled: true,
      priority: 'high'
    },
    {
      id: '2',
      name: 'Large Transaction Amount',
      condition: 'transaction_amount_above',
      threshold: 10000,
      channels: ['email', 'sms'],
      enabled: true,
      priority: 'medium'
    },
    {
      id: '3',
      name: 'Velocity Fraud Detection',
      condition: 'transactions_per_minute_above',
      threshold: 5,
      channels: ['slack', 'webhook'],
      enabled: false,
      priority: 'critical'
    }
  ]);

  const [notifications, setNotifications] = useState<AlertNotification[]>([]);
  const [showRuleDialog, setShowRuleDialog] = useState(false);
  const [newRule, setNewRule] = useState<Partial<AlertRule>>({
    name: '',
    condition: '',
    threshold: 0,
    channels: [],
    enabled: true,
    priority: 'medium'
  });
  const { toast } = useToast();

  // Simulate incoming alerts
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every 10 seconds
        const mockAlert: AlertNotification = {
          id: Date.now().toString(),
          title: 'High-Risk Transaction Detected',
          message: `Transaction TXN-${Math.floor(Math.random() * 10000)} flagged with risk score 85`,
          priority: 'high',
          timestamp: new Date().toISOString(),
          acknowledged: false,
          ruleId: '1'
        };
        
        setNotifications(prev => [mockAlert, ...prev.slice(0, 19)]);
        
        toast({
          title: "🚨 Alert Triggered",
          description: mockAlert.message,
          variant: "destructive",
        });
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [toast]);

  const toggleRule = (ruleId: string) => {
    setAlertRules(prev => 
      prev.map(rule => 
        rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
      )
    );
  };

  const acknowledgeAlert = (alertId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === alertId 
          ? { ...notification, acknowledged: true }
          : notification
      )
    );
  };

  const addNewRule = () => {
    if (!newRule.name || !newRule.condition) return;

    const rule: AlertRule = {
      id: Date.now().toString(),
      name: newRule.name!,
      condition: newRule.condition!,
      threshold: newRule.threshold || 0,
      channels: newRule.channels || [],
      enabled: newRule.enabled || true,
      priority: newRule.priority || 'medium'
    };

    setAlertRules(prev => [...prev, rule]);
    setNewRule({
      name: '',
      condition: '',
      threshold: 0,
      channels: [],
      enabled: true,
      priority: 'medium'
    });
    setShowRuleDialog(false);
    
    toast({
      title: "Alert Rule Created",
      description: `Rule "${rule.name}" has been added successfully.`,
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-600 text-white';
      case 'high':
        return 'bg-red-500 text-white';
      case 'medium':
        return 'bg-amber-500 text-white';
      default:
        return 'bg-blue-500 text-white';
    }
  };

  const unacknowledgedCount = notifications.filter(n => !n.acknowledged).length;

  return (
    <div className="space-y-6">
      {/* Alert Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Rules</p>
                <p className="text-2xl font-bold">{alertRules.filter(r => r.enabled).length}</p>
              </div>
              <Settings className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Alerts</p>
                <p className="text-2xl font-bold text-red-600">{unacknowledgedCount}</p>
              </div>
              <Bell className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Alerts Today</p>
                <p className="text-2xl font-bold">{notifications.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alert Rules */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Alert Rules</CardTitle>
                <CardDescription>Configure automated alert conditions</CardDescription>
              </div>
              <Dialog open={showRuleDialog} onOpenChange={setShowRuleDialog}>
                <DialogTrigger asChild>
                  <Button size="sm" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Rule
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Alert Rule</DialogTitle>
                    <DialogDescription>
                      Set up a new automated alert condition
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="rule-name">Rule Name</Label>
                      <Input
                        id="rule-name"
                        value={newRule.name || ''}
                        onChange={(e) => setNewRule(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g., High Risk Score Alert"
                      />
                    </div>
                    <div>
                      <Label htmlFor="condition">Condition</Label>
                      <Select 
                        value={newRule.condition || ''} 
                        onValueChange={(value) => setNewRule(prev => ({ ...prev, condition: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="risk_score_above">Risk Score Above</SelectItem>
                          <SelectItem value="transaction_amount_above">Transaction Amount Above</SelectItem>
                          <SelectItem value="transactions_per_minute_above">Transactions Per Minute Above</SelectItem>
                          <SelectItem value="failed_logins_above">Failed Logins Above</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="threshold">Threshold</Label>
                      <Input
                        id="threshold"
                        type="number"
                        value={newRule.threshold || ''}
                        onChange={(e) => setNewRule(prev => ({ ...prev, threshold: Number(e.target.value) }))}
                        placeholder="Enter threshold value"
                      />
                    </div>
                    <div>
                      <Label htmlFor="priority">Priority</Label>
                      <Select 
                        value={newRule.priority || 'medium'} 
                        onValueChange={(value: any) => setNewRule(prev => ({ ...prev, priority: value }))}
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
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowRuleDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={addNewRule}>Create Rule</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alertRules.map((rule) => (
                <div key={rule.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={rule.enabled}
                      onCheckedChange={() => toggleRule(rule.id)}
                    />
                    <div>
                      <div className="font-medium text-sm">{rule.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {rule.condition.replace('_', ' ')} {rule.threshold}
                      </div>
                    </div>
                  </div>
                  <Badge className={getPriorityColor(rule.priority)}>
                    {rule.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>Latest triggered alerts and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Bell className="h-12 w-12 mx-auto mb-4" />
                  <p>No alerts triggered yet</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 border rounded-lg ${
                      notification.acknowledged ? 'bg-muted/50' : 'bg-background'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                          <Badge className={getPriorityColor(notification.priority)}>
                            {notification.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(notification.timestamp).toLocaleString()}
                        </p>
                      </div>
                      {!notification.acknowledged && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => acknowledgeAlert(notification.id)}
                          className="ml-2"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
