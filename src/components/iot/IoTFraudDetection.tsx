
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Wifi, Smartphone, Watch, Home, Car, AlertTriangle, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface IoTDevice {
  id: string;
  name: string;
  type: 'mobile' | 'smartwatch' | 'home' | 'vehicle' | 'payment';
  ipAddress: string;
  riskScore: number;
  status: 'trusted' | 'suspicious' | 'blocked';
  lastActivity: string;
  anomalies: string[];
}

interface IoTThreat {
  id: string;
  deviceId: string;
  deviceName: string;
  threatType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  detectedAt: string;
  resolved: boolean;
}

export default function IoTFraudDetection() {
  const [devices, setDevices] = useState<IoTDevice[]>([
    {
      id: '1',
      name: 'iPhone 15 Pro',
      type: 'mobile',
      ipAddress: '192.168.1.101',
      riskScore: 15,
      status: 'trusted',
      lastActivity: new Date(Date.now() - 300000).toISOString(),
      anomalies: []
    },
    {
      id: '2',
      name: 'Apple Watch Series 9',
      type: 'smartwatch',
      ipAddress: '192.168.1.102',
      riskScore: 8,
      status: 'trusted',
      lastActivity: new Date(Date.now() - 120000).toISOString(),
      anomalies: []
    },
    {
      id: '3',
      name: 'Smart Home Hub',
      type: 'home',
      ipAddress: '192.168.1.103',
      riskScore: 72,
      status: 'suspicious',
      lastActivity: new Date(Date.now() - 600000).toISOString(),
      anomalies: ['Unusual network traffic', 'Unexpected device connections']
    },
    {
      id: '4',
      name: 'Tesla Model S',
      type: 'vehicle',
      ipAddress: '10.0.0.45',
      riskScore: 25,
      status: 'trusted',
      lastActivity: new Date(Date.now() - 1800000).toISOString(),
      anomalies: []
    }
  ]);

  const [threats, setThreats] = useState<IoTThreat[]>([
    {
      id: '1',
      deviceId: '3',
      deviceName: 'Smart Home Hub',
      threatType: 'Botnet Activity',
      severity: 'high',
      description: 'Device showing signs of botnet participation with suspicious outbound traffic',
      detectedAt: new Date(Date.now() - 900000).toISOString(),
      resolved: false
    },
    {
      id: '2',
      deviceId: '1',
      deviceName: 'iPhone 15 Pro',
      threatType: 'Location Spoofing',
      severity: 'medium',
      description: 'GPS coordinates inconsistent with network location data',
      detectedAt: new Date(Date.now() - 1800000).toISOString(),
      resolved: true
    }
  ]);

  const [iotStats] = useState({
    totalDevices: 47,
    trustedDevices: 42,
    suspiciousDevices: 3,
    blockedDevices: 2,
    threatsDetected: 15,
    networkSecurity: 94
  });

  const { toast } = useToast();

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'mobile': return <Smartphone className="h-4 w-4" />;
      case 'smartwatch': return <Watch className="h-4 w-4" />;
      case 'home': return <Home className="h-4 w-4" />;
      case 'vehicle': return <Car className="h-4 w-4" />;
      default: return <Wifi className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'trusted': return <Badge className="bg-green-500">Trusted</Badge>;
      case 'suspicious': return <Badge className="bg-amber-500">Suspicious</Badge>;
      case 'blocked': return <Badge variant="destructive">Blocked</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-amber-500';
      default: return 'bg-blue-500';
    }
  };

  const handleBlockDevice = (deviceId: string) => {
    setDevices(prev => prev.map(device => 
      device.id === deviceId 
        ? { ...device, status: 'blocked' as const }
        : device
    ));
    
    toast({
      title: 'Device Blocked',
      description: 'IoT device has been blocked from accessing payment systems',
    });
  };

  const handleResolveThreat = (threatId: string) => {
    setThreats(prev => prev.map(threat => 
      threat.id === threatId 
        ? { ...threat, resolved: true }
        : threat
    ));
    
    toast({
      title: 'Threat Resolved',
      description: 'IoT security threat has been successfully mitigated',
    });
  };

  return (
    <div className="space-y-6">
      {/* IoT Security Alert */}
      <Alert>
        <Wifi className="h-4 w-4" />
        <AlertTitle>IoT Fraud Detection Active</AlertTitle>
        <AlertDescription>
          Monitoring {iotStats.totalDevices} connected devices for fraud patterns. AI analyzes device behavior, 
          network traffic, and transaction patterns from IoT ecosystems.
        </AlertDescription>
      </Alert>

      {/* IoT Stats */}
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{iotStats.totalDevices}</div>
              <Wifi className="h-5 w-5 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Trusted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{iotStats.trustedDevices}</div>
              <Shield className="h-5 w-5 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Suspicious</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{iotStats.suspiciousDevices}</div>
              <AlertTriangle className="h-5 w-5 text-amber-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Blocked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{iotStats.blockedDevices}</div>
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Threats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{iotStats.threatsDetected}</div>
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Network Security</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{iotStats.networkSecurity}%</div>
              <Shield className="h-5 w-5 text-green-500" />
            </div>
            <Progress value={iotStats.networkSecurity} className="h-1 mt-1" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Connected Devices */}
        <Card>
          <CardHeader>
            <CardTitle>Connected IoT Devices</CardTitle>
            <CardDescription>Devices monitored for fraud patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {devices.map((device) => (
                <div key={device.id} className="flex items-start space-x-3 p-3 rounded-lg border">
                  <div className="mt-0.5 p-2 rounded-full bg-muted">
                    {getDeviceIcon(device.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{device.name}</h4>
                      {getStatusBadge(device.status)}
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground mb-2">
                      <span>IP: {device.ipAddress}</span>
                      <span>Risk: {device.riskScore}%</span>
                    </div>
                    {device.anomalies.length > 0 && (
                      <div className="mb-2">
                        {device.anomalies.map((anomaly, index) => (
                          <Badge key={index} variant="outline" className="mr-1 mb-1 text-xs">
                            {anomaly}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Last active: {new Date(device.lastActivity).toLocaleTimeString()}
                      </span>
                      {device.status === 'suspicious' && (
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleBlockDevice(device.id)}
                        >
                          Block
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* IoT Threats */}
        <Card>
          <CardHeader>
            <CardTitle>IoT Security Threats</CardTitle>
            <CardDescription>Detected threats from connected devices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {threats.map((threat) => (
                <div key={threat.id} className="flex items-start space-x-3 p-3 rounded-lg border">
                  <div className={`mt-0.5 p-1 rounded-full ${getSeverityColor(threat.severity)} text-white`}>
                    <AlertTriangle className="h-3 w-3" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{threat.threatType}</h4>
                      <Badge variant={threat.resolved ? "outline" : "destructive"}>
                        {threat.resolved ? 'Resolved' : threat.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{threat.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Device: {threat.deviceName}
                      </span>
                      {!threat.resolved && (
                        <Button 
                          size="sm"
                          onClick={() => handleResolveThreat(threat.id)}
                        >
                          Resolve
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
