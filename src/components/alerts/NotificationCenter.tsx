
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Bell, 
  Mail, 
  MessageSquare,
  Smartphone,
  Slack,
  Settings,
  Volume2,
  VolumeX
} from 'lucide-react';

const NotificationCenter = () => {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [slackEnabled, setSlackEnabled] = useState(false);

  const notificationChannels = [
    {
      name: 'Email',
      icon: Mail,
      enabled: emailEnabled,
      setEnabled: setEmailEnabled,
      description: 'Receive alerts via email'
    },
    {
      name: 'SMS',
      icon: MessageSquare,
      enabled: smsEnabled,
      setEnabled: setSmsEnabled,
      description: 'Text message notifications'
    },
    {
      name: 'Push',
      icon: Smartphone,
      enabled: pushEnabled,
      setEnabled: setPushEnabled,
      description: 'Browser push notifications'
    },
    {
      name: 'Slack',
      icon: Slack,
      enabled: slackEnabled,
      setEnabled: setSlackEnabled,
      description: 'Send alerts to Slack channels'
    }
  ];

  const alertTypes = [
    {
      name: 'High Risk Transaction',
      description: 'Transaction flagged as high risk',
      channels: ['email', 'push', 'slack'],
      priority: 'high'
    },
    {
      name: 'Security Incident',
      description: 'Security breach or attack detected',
      channels: ['email', 'sms', 'push', 'slack'],
      priority: 'critical'
    },
    {
      name: 'Compliance Alert',
      description: 'Regulatory compliance issue',
      channels: ['email', 'slack'],
      priority: 'medium'
    },
    {
      name: 'System Maintenance',
      description: 'Scheduled maintenance notifications',
      channels: ['email'],
      priority: 'low'
    }
  ];

  const recentNotifications = [
    {
      type: 'High Risk Transaction',
      message: 'Transaction $5,000 flagged for manual review',
      time: '2 minutes ago',
      priority: 'high',
      read: false
    },
    {
      type: 'Security Alert',
      message: 'Suspicious login attempt blocked',
      time: '15 minutes ago',
      priority: 'medium',
      read: false
    },
    {
      type: 'System Update',
      message: 'Fraud detection model updated successfully',
      time: '1 hour ago',
      priority: 'low',
      read: true
    }
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'critical':
        return <Badge variant="destructive">Critical</Badge>;
      case 'high':
        return <Badge className="bg-orange-500">High</Badge>;
      case 'medium':
        return <Badge variant="default">Medium</Badge>;
      case 'low':
        return <Badge variant="secondary">Low</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Notification Center</h2>
        <p className="text-muted-foreground">
          Configure multi-channel alert system and notification preferences
        </p>
      </div>

      <Tabs defaultValue="channels" className="space-y-6">
        <TabsList>
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="rules">Alert Rules</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="channels" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Notification Channels</CardTitle>
                <CardDescription>
                  Configure how you receive alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {notificationChannels.map((channel, index) => {
                  const IconComponent = channel.icon;
                  return (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <IconComponent className="w-5 h-5" />
                        <div>
                          <h4 className="font-medium">{channel.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {channel.description}
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={channel.enabled}
                        onCheckedChange={channel.setEnabled}
                      />
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Channel Configuration</CardTitle>
                <CardDescription>
                  Set up your notification endpoints
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="admin@company.com"
                    disabled={!emailEnabled}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="+1 (555) 123-4567"
                    disabled={!smsEnabled}
                  />
                </div>
                <div>
                  <Label htmlFor="slack-webhook">Slack Webhook URL</Label>
                  <Input 
                    id="slack-webhook" 
                    placeholder="https://hooks.slack.com/..."
                    disabled={!slackEnabled}
                  />
                </div>
                <Button className="w-full">Save Configuration</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rules" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Alert Rules</CardTitle>
              <CardDescription>
                Configure which alerts trigger notifications on which channels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertTypes.map((alert, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium">{alert.name}</h4>
                        <p className="text-sm text-muted-foreground">{alert.description}</p>
                      </div>
                      {getPriorityBadge(alert.priority)}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Channels:</span>
                      {alert.channels.map((channel, channelIndex) => (
                        <Badge key={channelIndex} variant="outline" className="text-xs">
                          {channel}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline">
                        <Settings className="w-3 h-3 mr-1" />
                        Configure
                      </Button>
                      <Button size="sm" variant="outline">
                        Test Alert
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification History</CardTitle>
              <CardDescription>
                Recent notifications and delivery status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentNotifications.map((notification, index) => (
                  <div key={index} className={`p-3 border rounded-lg ${!notification.read ? 'bg-blue-50 border-blue-200' : ''}`}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                        <h4 className="font-medium">{notification.type}</h4>
                        {getPriorityBadge(notification.priority)}
                      </div>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure general notification preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sound">Sound Notifications</Label>
                    <p className="text-sm text-muted-foreground">Play sound for alerts</p>
                  </div>
                  <Switch id="sound" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="digest">Daily Digest</Label>
                    <p className="text-sm text-muted-foreground">Receive daily summary email</p>
                  </div>
                  <Switch id="digest" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="dnd">Do Not Disturb</Label>
                    <p className="text-sm text-muted-foreground">Pause non-critical alerts</p>
                  </div>
                  <Switch id="dnd" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quiet Hours</CardTitle>
                <CardDescription>
                  Set quiet hours for non-critical notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Start Time</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select start time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="22:00">10:00 PM</SelectItem>
                      <SelectItem value="23:00">11:00 PM</SelectItem>
                      <SelectItem value="00:00">12:00 AM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>End Time</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select end time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="06:00">6:00 AM</SelectItem>
                      <SelectItem value="07:00">7:00 AM</SelectItem>
                      <SelectItem value="08:00">8:00 AM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Save Quiet Hours</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationCenter;
