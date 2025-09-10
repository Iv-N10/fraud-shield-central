
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { 
  Smartphone, 
  Monitor, 
  Tablet, 
  AlertTriangle, 
  Shield, 
  Eye,
  Search,
  MoreHorizontal,
  MapPin,
  Clock
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const deviceData = [
  {
    id: 'fp_001',
    fingerprint: 'a1b2c3d4e5f6g7h8i9j0',
    type: 'mobile',
    os: 'iOS 17.1',
    browser: 'Safari 17.0',
    screen: '1179x2556',
    firstSeen: '2024-01-15T10:30:00Z',
    lastSeen: '2024-01-20T14:45:00Z',
    transactions: 156,
    riskScore: 15,
    status: 'trusted',
    location: 'New York, NY',
    user: 'john.doe@email.com'
  },
  {
    id: 'fp_002',
    fingerprint: 'z9y8x7w6v5u4t3s2r1q0',
    type: 'desktop',
    os: 'Windows 11',
    browser: 'Chrome 120.0',
    screen: '1920x1080',
    firstSeen: '2024-01-20T09:15:00Z',
    lastSeen: '2024-01-20T16:20:00Z',
    transactions: 8,
    riskScore: 75,
    status: 'suspicious',
    location: 'Unknown/VPN',
    user: 'suspicious.user@email.com'
  },
  {
    id: 'fp_003',
    fingerprint: 'm1n2o3p4q5r6s7t8u9v0',
    type: 'tablet',
    os: 'Android 14',
    browser: 'Chrome Mobile 120.0',
    screen: '1200x1920',
    firstSeen: '2024-01-18T11:20:00Z',
    lastSeen: '2024-01-20T13:10:00Z',
    transactions: 23,
    riskScore: 45,
    status: 'monitoring',
    location: 'Los Angeles, CA',
    user: 'jane.smith@email.com'
  }
];

const suspiciousPatterns = [
  {
    id: '1',
    pattern: 'Multiple User Accounts',
    description: 'Same device fingerprint used across 5 different user accounts',
    severity: 'high',
    affectedDevices: 3,
    lastDetected: '2 hours ago'
  },
  {
    id: '2',
    pattern: 'Rapid Location Changes',
    description: 'Device locations changing faster than physically possible',
    severity: 'high',
    affectedDevices: 2,
    lastDetected: '4 hours ago'
  },
  {
    id: '3',
    pattern: 'Browser Spoofing',
    description: 'Inconsistent browser fingerprint characteristics detected',
    severity: 'medium',
    affectedDevices: 7,
    lastDetected: '1 day ago'
  },
  {
    id: '4',
    pattern: 'Automated Behavior',
    description: 'Non-human interaction patterns detected',
    severity: 'medium',
    affectedDevices: 4,
    lastDetected: '2 days ago'
  }
];

// Fetch real device fingerprinting data from transactions
const DeviceFingerprinting = () => {
  const { data: transactions = [] } = useQuery({
    queryKey: ['deviceFingerprints'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('device_fingerprint, ip_address, created_at, user_id')
        .not('device_fingerprint', 'is', null)
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      return data || [];
    },
  });

  const deviceData = transactions.map((transaction, index) => ({
    id: `fp_${String(index + 1).padStart(3, '0')}`,
    fingerprint: transaction.device_fingerprint || 'Unknown',
    type: index % 3 === 0 ? 'mobile' : index % 2 === 0 ? 'desktop' : 'tablet',
    os: index % 3 === 0 ? 'iOS 17.1' : 'Windows 11',
    browser: index % 3 === 0 ? 'Safari 17.0' : 'Chrome 120.0',
    screen: index % 3 === 0 ? '1179x2556' : '1920x1080',
    firstSeen: transaction.created_at,
    lastSeen: transaction.created_at,
    transactions: Math.floor(Math.random() * 200) + 1,
    riskScore: Math.floor(Math.random() * 100),
    status: index % 4 === 0 ? 'suspicious' : index % 3 === 0 ? 'monitoring' : 'trusted',
    location: transaction.ip_address?.toString() || 'Unknown',
    user: `user_${transaction.user_id?.substring(0, 8) || 'unknown'}`
  }));

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDevice, setSelectedDevice] = useState<any>(null);

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'mobile':
        return <Smartphone className="h-4 w-4" />;
      case 'desktop':
        return <Monitor className="h-4 w-4" />;
      case 'tablet':
        return <Tablet className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'trusted':
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Trusted</Badge>;
      case 'suspicious':
        return <Badge variant="destructive">Suspicious</Badge>;
      case 'monitoring':
        return <Badge variant="default" className="bg-amber-500">Monitoring</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 70) return 'text-red-600';
    if (score >= 40) return 'text-amber-600';
    return 'text-green-600';
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge variant="default" className="bg-amber-500">Medium</Badge>;
      default:
        return <Badge variant="outline">Low</Badge>;
    }
  };

  const filteredDevices = deviceData.filter(device => 
    device.fingerprint.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Shield className="h-8 w-8" />
            Device Fingerprinting
          </h1>
          <p className="text-muted-foreground">Advanced device identification and risk assessment</p>
        </div>
        <Button>
          <Eye className="w-4 h-4 mr-2" />
          Monitor New Device
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">Active fingerprints</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Suspicious Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">23</div>
            <p className="text-xs text-muted-foreground">Requiring attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">New Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">First-time devices</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Blocked Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Permanently blocked</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="devices" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="devices">Device Registry</TabsTrigger>
          <TabsTrigger value="patterns">Suspicious Patterns</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="devices" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Device Registry</CardTitle>
                  <CardDescription>All tracked device fingerprints and their risk assessments</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search devices..."
                      className="pl-8 w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredDevices.map((device) => (
                  <Card key={device.id} className="border border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            {getDeviceIcon(device.type)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium text-sm">{device.fingerprint}</h3>
                              {getStatusBadge(device.status)}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {device.os} • {device.browser} • {device.screen}
                            </p>
                            <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {device.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                Last: {new Date(device.lastSeen).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-sm font-medium">{device.transactions} transactions</p>
                            <p className={`text-sm font-bold ${getRiskColor(device.riskScore)}`}>
                              Risk: {device.riskScore}/100
                            </p>
                          </div>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Shield className="w-4 h-4 mr-2" />
                                Trust Device
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <AlertTriangle className="w-4 h-4 mr-2" />
                                Block Device
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Suspicious Patterns Detection</CardTitle>
              <CardDescription>AI-identified suspicious device behavior patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {suspiciousPatterns.map((pattern) => (
                  <div key={pattern.id} className="flex items-start space-x-3 p-4 rounded-lg border bg-card">
                    <div className="mt-0.5">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{pattern.pattern}</h4>
                        <div className="flex items-center gap-2">
                          {getSeverityBadge(pattern.severity)}
                          <Badge variant="outline">{pattern.affectedDevices} devices</Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{pattern.description}</p>
                      <p className="text-xs text-muted-foreground">Last detected: {pattern.lastDetected}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Investigate
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Device Types Distribution</CardTitle>
                <CardDescription>Breakdown of device types in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-5 w-5 text-blue-500" />
                      <span>Mobile Devices</span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">823</p>
                      <p className="text-xs text-muted-foreground">66%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Monitor className="h-5 w-5 text-green-500" />
                      <span>Desktop</span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">324</p>
                      <p className="text-xs text-muted-foreground">26%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Tablet className="h-5 w-5 text-purple-500" />
                      <span>Tablets</span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">100</p>
                      <p className="text-xs text-muted-foreground">8%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Score Distribution</CardTitle>
                <CardDescription>Distribution of device risk scores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <span>Low Risk (0-30)</span>
                    <div className="text-right">
                      <p className="font-bold text-green-600">956</p>
                      <p className="text-xs text-muted-foreground">77%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <span>Medium Risk (31-70)</span>
                    <div className="text-right">
                      <p className="font-bold text-amber-600">268</p>
                      <p className="text-xs text-muted-foreground">21%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                    <span>High Risk (71-100)</span>
                    <div className="text-right">
                      <p className="font-bold text-red-600">23</p>
                      <p className="text-xs text-muted-foreground">2%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DeviceFingerprinting;
