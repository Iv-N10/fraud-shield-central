
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  Database, 
  Zap, 
  AlertTriangle, 
  CheckCircle,
  TrendingUp,
  BarChart3,
  Search
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function SIEMIntegration() {
  const [connectionStatus, setConnectionStatus] = useState({
    splunk: 'connected',
    qradar: 'connected',
    elasticsearch: 'connected'
  });

  const [realTimeEvents, setRealTimeEvents] = useState([]);

  const siemPlatforms = [
    {
      name: 'Splunk Enterprise',
      type: 'splunk',
      status: 'connected',
      eventsPerSec: 12450,
      indexedData: '2.8 TB',
      lastSync: '2 seconds ago',
      alerts: 23
    },
    {
      name: 'IBM QRadar',
      type: 'qradar',
      status: 'connected',
      eventsPerSec: 8920,
      indexedData: '1.9 TB',
      lastSync: '1 second ago',
      alerts: 17
    },
    {
      name: 'Elastic SIEM',
      type: 'elasticsearch',
      status: 'connected',
      eventsPerSec: 15670,
      indexedData: '3.2 TB',
      lastSync: '1 second ago',
      alerts: 31
    }
  ];

  const threatData = [
    { time: '00:00', splunk: 45, qradar: 32, elastic: 28 },
    { time: '04:00', splunk: 38, qradar: 28, elastic: 31 },
    { time: '08:00', splunk: 67, qradar: 45, elastic: 52 },
    { time: '12:00', splunk: 89, qradar: 67, elastic: 74 },
    { time: '16:00', splunk: 125, qradar: 89, elastic: 98 },
    { time: '20:00', splunk: 78, qradar: 56, elastic: 67 },
  ];

  const correlationRules = [
    {
      name: 'Multi-Platform Login Anomaly',
      description: 'Detects suspicious login patterns across multiple systems',
      platforms: ['Splunk', 'QRadar'],
      severity: 'high',
      triggered: 12,
      status: 'active'
    },
    {
      name: 'Financial Fraud Pattern',
      description: 'Cross-correlates transaction and access patterns',
      platforms: ['QRadar', 'Elastic'],
      severity: 'critical',
      triggered: 5,
      status: 'active'
    },
    {
      name: 'Advanced Persistent Threat',
      description: 'Long-term threat detection across all platforms',
      platforms: ['Splunk', 'QRadar', 'Elastic'],
      severity: 'critical',
      triggered: 2,
      status: 'investigating'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        const newEvent = {
          id: Date.now(),
          platform: ['Splunk', 'QRadar', 'Elastic'][Math.floor(Math.random() * 3)],
          severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)],
          event: 'Security event detected',
          timestamp: new Date().toLocaleTimeString()
        };
        setRealTimeEvents(prev => [newEvent, ...prev.slice(0, 9)]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status) => {
    return status === 'connected' ? 
      <CheckCircle className="h-4 w-4 text-green-500" /> : 
      <AlertTriangle className="h-4 w-4 text-red-500" />;
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <Alert>
        <Activity className="h-4 w-4" />
        <AlertDescription>
          SIEM Integration provides real-time correlation and analysis across Splunk, IBM QRadar, 
          and Elastic Security platforms for comprehensive threat detection.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {siemPlatforms.map((platform, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{platform.name}</h4>
                {getStatusIcon(platform.status)}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Events/sec</span>
                  <span className="font-medium">{platform.eventsPerSec.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Indexed Data</span>
                  <span className="font-medium">{platform.indexedData}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Active Alerts</span>
                  <Badge variant="destructive" className="text-xs">
                    {platform.alerts}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Last sync: {platform.lastSync}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="correlation" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="correlation">Correlation Rules</TabsTrigger>
          <TabsTrigger value="analytics">Threat Analytics</TabsTrigger>
          <TabsTrigger value="events">Live Events</TabsTrigger>
          <TabsTrigger value="dashboards">Unified Dashboard</TabsTrigger>
        </TabsList>

        <TabsContent value="correlation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cross-Platform Correlation Rules</CardTitle>
              <CardDescription>
                Advanced rules that correlate events across multiple SIEM platforms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {correlationRules.map((rule, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{rule.name}</h4>
                        <p className="text-sm text-muted-foreground">{rule.description}</p>
                      </div>
                      <Badge variant={getSeverityColor(rule.severity)}>
                        {rule.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        {rule.platforms.map((platform, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {platform}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span>Triggered: {rule.triggered}</span>
                        <Badge variant={rule.status === 'active' ? 'default' : 'secondary'}>
                          {rule.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Multi-Platform Threat Analytics</CardTitle>
              <CardDescription>
                Real-time threat detection metrics across all SIEM platforms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={threatData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="splunk" stroke="#ff6b35" name="Splunk" strokeWidth={2} />
                    <Line type="monotone" dataKey="qradar" stroke="#1e40af" name="QRadar" strokeWidth={2} />
                    <Line type="monotone" dataKey="elastic" stroke="#059669" name="Elastic" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Real-Time Security Events</CardTitle>
              <CardDescription>
                Live feed of security events from all connected SIEM platforms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {realTimeEvents.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    Monitoring for real-time events...
                  </p>
                ) : (
                  realTimeEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{event.platform}</Badge>
                        <div>
                          <p className="font-medium text-sm">{event.event}</p>
                          <p className="text-xs text-muted-foreground">{event.timestamp}</p>
                        </div>
                      </div>
                      <Badge variant={getSeverityColor(event.severity)}>
                        {event.severity.toUpperCase()}
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dashboards" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Unified Search</CardTitle>
                <CardDescription>Search across all SIEM platforms simultaneously</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-4">
                  <div className="flex-1 relative">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <input 
                      className="w-full pl-10 pr-4 py-2 border rounded-md"
                      placeholder="Search events across all platforms..."
                    />
                  </div>
                  <Button>Search</Button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Splunk Enterprise connected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">IBM QRadar connected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Elastic Security connected</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Platform Statistics</CardTitle>
                <CardDescription>Performance metrics and health status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Events Today</span>
                    <span className="font-bold">2,847,291</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Active Correlations</span>
                    <span className="font-bold">156</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Critical Alerts</span>
                    <Badge variant="destructive">7</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Platform Uptime</span>
                    <span className="font-bold text-green-600">99.98%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
