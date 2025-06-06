
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Smartphone, 
  Tablet,
  Monitor,
  Wifi,
  WifiOff,
  Battery,
  Zap,
  Eye,
  RotateCcw
} from 'lucide-react';

const MobileOptimizations = () => {
  const [offlineMode, setOfflineMode] = useState(false);
  const [lowDataMode, setLowDataMode] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);

  const deviceStats = {
    mobile: { users: '45%', sessions: '38%', engagement: '4.2min' },
    tablet: { users: '25%', sessions: '28%', engagement: '6.1min' },
    desktop: { users: '30%', sessions: '34%', engagement: '8.7min' }
  };

  const mobileFeatures = [
    {
      name: 'Responsive Design',
      status: 'active',
      description: 'Adaptive layout for all screen sizes'
    },
    {
      name: 'Touch Optimization',
      status: 'active',
      description: 'Touch-friendly buttons and gestures'
    },
    {
      name: 'Offline Mode',
      status: offlineMode ? 'active' : 'inactive',
      description: 'Basic functionality without internet'
    },
    {
      name: 'Push Notifications',
      status: pushNotifications ? 'active' : 'inactive',
      description: 'Real-time alerts on mobile devices'
    },
    {
      name: 'Progressive Web App',
      status: 'active',
      description: 'App-like experience in browser'
    }
  ];

  const performanceMetrics = [
    { metric: 'Page Load Time', mobile: '2.1s', desktop: '1.4s', status: 'good' },
    { metric: 'First Contentful Paint', mobile: '1.2s', desktop: '0.8s', status: 'good' },
    { metric: 'Largest Contentful Paint', mobile: '2.8s', desktop: '1.9s', status: 'needs_improvement' },
    { metric: 'Cumulative Layout Shift', mobile: '0.05', desktop: '0.02', status: 'good' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-600">Active</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inactive</Badge>;
      case 'good':
        return <Badge className="bg-green-100 text-green-600">Good</Badge>;
      case 'needs_improvement':
        return <Badge className="bg-yellow-100 text-yellow-600">Needs Improvement</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Mobile Optimization</h2>
        <p className="text-muted-foreground">
          Enhanced mobile experience and performance monitoring
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Mobile Users</CardTitle>
                <Smartphone className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{deviceStats.mobile.users}</div>
                <p className="text-xs text-muted-foreground">
                  {deviceStats.mobile.sessions} of sessions • {deviceStats.mobile.engagement} avg
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tablet Users</CardTitle>
                <Tablet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{deviceStats.tablet.users}</div>
                <p className="text-xs text-muted-foreground">
                  {deviceStats.tablet.sessions} of sessions • {deviceStats.tablet.engagement} avg
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Desktop Users</CardTitle>
                <Monitor className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{deviceStats.desktop.users}</div>
                <p className="text-xs text-muted-foreground">
                  {deviceStats.desktop.sessions} of sessions • {deviceStats.desktop.engagement} avg
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Mobile Features Status</CardTitle>
              <CardDescription>
                Current status of mobile optimization features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mobileFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{feature.name}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                    {getStatusBadge(feature.status)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Progressive Web App</CardTitle>
                <CardDescription>
                  Install FraudShield as a mobile app
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium mb-2">Install Instructions</h4>
                  <ol className="text-sm space-y-1 list-decimal list-inside">
                    <li>Open FraudShield in your mobile browser</li>
                    <li>Tap the browser menu (⋮)</li>
                    <li>Select "Add to Home Screen"</li>
                    <li>Tap "Add" to install</li>
                  </ol>
                </div>
                <Button className="w-full">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Test PWA Installation
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Offline Capabilities</CardTitle>
                <CardDescription>
                  Basic functionality without internet connection
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="offline">Offline Mode</Label>
                      <p className="text-sm text-muted-foreground">Cache data for offline access</p>
                    </div>
                    <Switch 
                      id="offline" 
                      checked={offlineMode}
                      onCheckedChange={setOfflineMode}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sync">Auto Sync</Label>
                      <p className="text-sm text-muted-foreground">Sync when connection restored</p>
                    </div>
                    <Switch id="sync" />
                  </div>
                </div>
                {offlineMode && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">
                      <WifiOff className="w-4 h-4 inline mr-1" />
                      Offline mode enabled. Basic features available without internet.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>
                Mobile vs desktop performance comparison
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{metric.metric}</h4>
                      {getStatusBadge(metric.status)}
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4" />
                        <span>Mobile: {metric.mobile}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Monitor className="w-4 h-4" />
                        <span>Desktop: {metric.desktop}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Optimization Tips</CardTitle>
                <CardDescription>
                  Improve mobile performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <Zap className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">Enable Compression</h4>
                      <p className="text-sm text-blue-700">Reduce bandwidth usage by 60%</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <Battery className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-900">Optimize Images</h4>
                      <p className="text-sm text-green-700">Use WebP format for faster loading</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <Eye className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-900">Lazy Loading</h4>
                      <p className="text-sm text-yellow-700">Load content as user scrolls</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cache Management</CardTitle>
                <CardDescription>
                  Manage cached data and storage
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <h4 className="font-medium mb-2">Cache Size</h4>
                  <div className="text-2xl font-bold">12.4 MB</div>
                  <p className="text-sm text-muted-foreground">Used of 50 MB limit</p>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Clear Cache
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Eye className="w-4 h-4 mr-2" />
                    View Cache Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Mobile Settings</CardTitle>
                <CardDescription>
                  Configure mobile-specific features
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive alerts on mobile</p>
                  </div>
                  <Switch 
                    id="push" 
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="lowdata">Low Data Mode</Label>
                    <p className="text-sm text-muted-foreground">Reduce data usage</p>
                  </div>
                  <Switch 
                    id="lowdata" 
                    checked={lowDataMode}
                    onCheckedChange={setLowDataMode}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="haptic">Haptic Feedback</Label>
                    <p className="text-sm text-muted-foreground">Vibration for interactions</p>
                  </div>
                  <Switch id="haptic" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Usage</CardTitle>
                <CardDescription>
                  Monitor and control data consumption
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <h4 className="font-medium mb-2">This Month</h4>
                  <div className="text-2xl font-bold">847 MB</div>
                  <p className="text-sm text-muted-foreground">Data used by FraudShield</p>
                </div>
                {lowDataMode && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">
                      <Wifi className="w-4 h-4 inline mr-1" />
                      Low data mode active. Using 40% less data.
                    </p>
                  </div>
                )}
                <Button variant="outline" className="w-full">
                  View Detailed Usage
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MobileOptimizations;
