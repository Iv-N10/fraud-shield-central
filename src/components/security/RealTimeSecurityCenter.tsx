
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  AlertTriangle, 
  Activity, 
  Zap,
  Eye,
  Lock,
  Globe,
  Brain,
  Target,
  Radar
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function RealTimeSecurityCenter() {
  const [securityEvents, setSecurityEvents] = useState([]);
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [threatLevel, setThreatLevel] = useState('ELEVATED');

  const [securityMetrics] = useState([
    { time: '00:00', attacks: 12, blocked: 12, threats: 3 },
    { time: '04:00', attacks: 8, blocked: 8, threats: 2 },
    { time: '08:00', attacks: 25, blocked: 24, threats: 5 },
    { time: '12:00', attacks: 45, blocked: 43, threats: 8 },
    { time: '16:00', attacks: 67, blocked: 65, threats: 12 },
    { time: '20:00', attacks: 34, blocked: 34, threats: 6 },
  ]);

  const realTimeAlerts = [
    {
      id: '1',
      type: 'intrusion_attempt',
      severity: 'critical',
      source: '203.0.113.45',
      description: 'Advanced persistent threat detected',
      timestamp: new Date(Date.now() - 120000).toISOString(),
      status: 'active'
    },
    {
      id: '2', 
      type: 'data_exfiltration',
      severity: 'high',
      source: 'Internal Network',
      description: 'Unusual data transfer pattern detected',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      status: 'investigating'
    },
    {
      id: '3',
      type: 'malware_detected',
      severity: 'medium',
      source: '192.168.1.100',
      description: 'Suspicious file behavior identified',
      timestamp: new Date(Date.now() - 600000).toISOString(),
      status: 'contained'
    }
  ];

  const securitySystems = [
    { name: 'Intrusion Detection', status: 'online', threats: 12, efficiency: 99.8 },
    { name: 'Malware Scanner', status: 'online', threats: 8, efficiency: 99.5 },
    { name: 'DDoS Protection', status: 'online', threats: 156, efficiency: 100 },
    { name: 'Quantum Firewall', status: 'online', threats: 0, efficiency: 100 },
    { name: 'AI Behavioral Analysis', status: 'online', threats: 23, efficiency: 97.2 },
    { name: 'Zero-Trust Gateway', status: 'online', threats: 45, efficiency: 98.7 }
  ];

  useEffect(() => {
    if (isMonitoring) {
      const interval = setInterval(() => {
        // Simulate new security events
        if (Math.random() > 0.7) {
          const newEvent = {
            id: Date.now().toString(),
            type: ['intrusion', 'malware', 'ddos', 'phishing'][Math.floor(Math.random() * 4)],
            severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)],
            source: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
            timestamp: new Date().toISOString()
          };
          setSecurityEvents(prev => [newEvent, ...prev.slice(0, 19)]);
        }
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [isMonitoring]);

  const getThreatLevelColor = (level) => {
    switch (level) {
      case 'CRITICAL': return 'bg-red-500 text-white';
      case 'HIGH': return 'bg-orange-500 text-white';
      case 'ELEVATED': return 'bg-yellow-500 text-black';
      case 'NORMAL': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="space-y-6">
      {/* Threat Level Indicator */}
      <Alert className="border-yellow-500 bg-yellow-50">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <span>Current Threat Level: <strong>{threatLevel}</strong></span>
          <Badge className={getThreatLevelColor(threatLevel)}>
            {threatLevel}
          </Badge>
        </AlertDescription>
      </Alert>

      {/* Real-time Security Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Threats</p>
                <p className="text-2xl font-bold text-red-600">23</p>
              </div>
              <Target className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Blocked Attacks</p>
                <p className="text-2xl font-bold text-green-600">1,247</p>
              </div>
              <Shield className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Systems Online</p>
                <p className="text-2xl font-bold text-blue-600">6/6</p>
              </div>
              <Activity className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">AI Confidence</p>
                <p className="text-2xl font-bold text-purple-600">98.7%</p>
              </div>
              <Brain className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="live-feed" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="live-feed">Live Security Feed</TabsTrigger>
          <TabsTrigger value="systems">Security Systems</TabsTrigger>
          <TabsTrigger value="analytics">Attack Analytics</TabsTrigger>
          <TabsTrigger value="response">Incident Response</TabsTrigger>
        </TabsList>

        <TabsContent value="live-feed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Real-Time Security Events
                <Badge variant={isMonitoring ? 'default' : 'secondary'}>
                  {isMonitoring ? 'MONITORING' : 'PAUSED'}
                </Badge>
              </CardTitle>
              <CardDescription>
                Live feed of security events and threat intelligence
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {realTimeAlerts.map((alert) => (
                  <Alert key={alert.id} className="border-l-4 border-l-red-500">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium capitalize">{alert.type.replace('_', ' ')}</span>
                            <Badge variant={alert.severity === 'critical' ? 'destructive' : 'secondary'}>
                              {alert.severity.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-sm">{alert.description}</p>
                          <p className="text-xs text-muted-foreground">
                            Source: {alert.source} • {new Date(alert.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Investigate
                        </Button>
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="systems" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {securitySystems.map((system, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{system.name}</h4>
                    <Badge variant={system.status === 'online' ? 'default' : 'destructive'}>
                      {system.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Threats Detected</span>
                      <span className="font-medium">{system.threats}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Efficiency</span>
                      <span className="font-medium">{system.efficiency}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attack Patterns & Analytics</CardTitle>
              <CardDescription>
                Real-time analysis of security events and attack patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={securityMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="attacks" stroke="#ef4444" name="Attacks" />
                    <Line type="monotone" dataKey="blocked" stroke="#22c55e" name="Blocked" />
                    <Line type="monotone" dataKey="threats" stroke="#f59e0b" name="Threats" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="response" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Automated Incident Response
              </CardTitle>
              <CardDescription>
                AI-powered automated response to security incidents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Containment Actions</h4>
                      <div className="space-y-1 text-sm">
                        <div>✓ IP addresses blocked: 23</div>
                        <div>✓ Suspicious processes terminated: 8</div>
                        <div>✓ Network segments isolated: 2</div>
                        <div>✓ User accounts suspended: 5</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Investigation Status</h4>
                      <div className="space-y-1 text-sm">
                        <div>🔍 Evidence collected: 156 items</div>
                        <div>🔍 Forensic analysis: In progress</div>
                        <div>🔍 Attribution analysis: 78% complete</div>
                        <div>🔍 Timeline reconstruction: Active</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Recovery Actions</h4>
                      <div className="space-y-1 text-sm">
                        <div>🔄 Systems restored: 12</div>
                        <div>🔄 Data integrity verified: 100%</div>
                        <div>🔄 Patches applied: 45</div>
                        <div>🔄 Security rules updated: 23</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
