
import React, { useState } from 'react';
import { Bell, ShieldAlert, Key, Users, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export default function Settings() {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
  const [showApiKey, setShowApiKey] = useState(false);
  
  const handleSaveSettings = (section: string) => {
    toast({
      title: 'Settings saved',
      description: `Your ${section} settings have been updated successfully.`
    });
  };
  
  const handleGenerateNewApiKey = () => {
    const newKey = `sk_test_${Math.random().toString(36).substring(2, 15)}`;
    setApiKey(newKey);
    toast({
      title: 'New API key generated',
      description: 'Make sure to copy your new API key. You won\'t be able to see it again.'
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and platform settings</p>
      </div>
      
      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="grid grid-cols-4 md:w-[600px]">
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            <span className="hidden sm:inline">API Keys</span>
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Team</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <ShieldAlert className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage how you receive alerts and notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="high-risk-alerts">High risk alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive immediate email alerts for high risk transactions
                      </p>
                    </div>
                    <Switch id="high-risk-alerts" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="kyc-status">KYC verification status updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when a customer's KYC status changes
                      </p>
                    </div>
                    <Switch id="kyc-status" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="weekly-reports">Weekly summary reports</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive weekly compliance summary reports
                      </p>
                    </div>
                    <Switch id="weekly-reports" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="system-updates">System updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about platform updates and maintenance
                      </p>
                    </div>
                    <Switch id="system-updates" defaultChecked />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">In-App Notifications</h3>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="real-time-alerts">Real-time alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Show real-time notifications in the dashboard
                      </p>
                    </div>
                    <Switch id="real-time-alerts" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="risk-updates">Risk score updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Show notifications when risk scores change
                      </p>
                    </div>
                    <Switch id="risk-updates" />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Custom Alert Settings</h3>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="threshold">Risk threshold for alerts</Label>
                    <Input 
                      id="threshold" 
                      type="number" 
                      placeholder="70" 
                      defaultValue="70"
                    />
                    <p className="text-xs text-muted-foreground">
                      Set the risk score threshold for triggering alerts (0-100)
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="recipients">Additional alert recipients</Label>
                    <Input 
                      id="recipients" 
                      placeholder="email1@example.com, email2@example.com" 
                    />
                    <p className="text-xs text-muted-foreground">
                      Comma-separated list of email addresses for additional recipients
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSaveSettings('notification')}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Manage API keys for integrating with your systems
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Active API Keys</h3>
                
                <div className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Production API Key</p>
                      <p className="text-sm text-muted-foreground">Created on Apr 15, 2023</p>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Input 
                      value={showApiKey ? apiKey : '•'.repeat(apiKey.length)} 
                      readOnly
                      className="font-mono"
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? 'Hide' : 'Show'}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(apiKey);
                        toast({
                          title: 'API key copied',
                          description: 'API key has been copied to clipboard'
                        });
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-destructive hover:text-destructive"
                      onClick={handleGenerateNewApiKey}
                    >
                      Regenerate
                    </Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">API Usage</h3>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current month API calls</span>
                    <span className="font-medium">24,521 / 100,000</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="bg-secondary h-full" style={{ width: '24.5%' }} />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your plan includes 100,000 API calls per month. Resets on May 1, 2023.
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Webhook Settings</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input 
                    id="webhook-url" 
                    placeholder="https://your-domain.com/webhook" 
                    defaultValue="https://example.com/api/fraudshield/webhook"
                  />
                  <p className="text-xs text-muted-foreground">
                    We'll send POST requests to this URL when important events occur
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label>Webhook Events</Label>
                  <div className="grid gap-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="event-high-risk" className="rounded border-gray-300" defaultChecked />
                      <Label htmlFor="event-high-risk" className="text-sm">High risk transactions</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="event-kyc" className="rounded border-gray-300" defaultChecked />
                      <Label htmlFor="event-kyc" className="text-sm">KYC status changes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="event-report" className="rounded border-gray-300" defaultChecked />
                      <Label htmlFor="event-report" className="text-sm">Report generation</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSaveSettings('API')}>Save API Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Management</CardTitle>
              <CardDescription>
                Manage team members and their access permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Team Members</h3>
                  <Button>Invite Member</Button>
                </div>
                
                <div className="border rounded-lg divide-y">
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                        <span className="font-medium">JD</span>
                      </div>
                      <div>
                        <p className="font-medium">John Doe</p>
                        <p className="text-sm text-muted-foreground">john@example.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge>Admin</Badge>
                      <Button variant="ghost" size="sm">Manage</Button>
                    </div>
                  </div>
                  
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                        <span className="font-medium">SM</span>
                      </div>
                      <div>
                        <p className="font-medium">Sarah Miller</p>
                        <p className="text-sm text-muted-foreground">sarah@example.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Compliance Officer</Badge>
                      <Button variant="ghost" size="sm">Manage</Button>
                    </div>
                  </div>
                  
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                        <span className="font-medium">MW</span>
                      </div>
                      <div>
                        <p className="font-medium">Mike Wilson</p>
                        <p className="text-sm text-muted-foreground">mike@example.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Analyst</Badge>
                      <Button variant="ghost" size="sm">Manage</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Role Permissions</h3>
                
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Admin</h4>
                      <Badge>1 member</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Full access to all features and settings
                    </p>
                    <Button variant="outline" size="sm">Edit Permissions</Button>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Compliance Officer</h4>
                      <Badge>1 member</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Can manage compliance settings, review alerts, and generate reports
                    </p>
                    <Button variant="outline" size="sm">Edit Permissions</Button>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Analyst</h4>
                      <Badge>1 member</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Read-only access to transactions and reports
                    </p>
                    <Button variant="outline" size="sm">Edit Permissions</Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSaveSettings('team')}>Save Team Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Authentication</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Two-factor authentication</p>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Session timeout</p>
                    <p className="text-sm text-muted-foreground">
                      Automatically log out after inactivity
                    </p>
                  </div>
                  <select 
                    className="border rounded-md p-1 text-sm"
                    defaultValue="30"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Activity Logs</h3>
                
                <div className="border rounded-lg divide-y">
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm">Login from new device</p>
                      <p className="text-xs text-muted-foreground">April 23, 2023 at 10:42 AM</p>
                    </div>
                    <Button variant="ghost" size="sm">View Details</Button>
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm">API key created</p>
                      <p className="text-xs text-muted-foreground">April 15, 2023 at 2:30 PM</p>
                    </div>
                    <Button variant="ghost" size="sm">View Details</Button>
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm">Password changed</p>
                      <p className="text-xs text-muted-foreground">April 10, 2023 at 9:15 AM</p>
                    </div>
                    <Button variant="ghost" size="sm">View Details</Button>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">View All Activity</Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Password</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium mb-1">Password requirements:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Minimum 8 characters</li>
                    <li>At least one uppercase letter</li>
                    <li>At least one number</li>
                    <li>At least one special character</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSaveSettings('security')}>Update Password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
