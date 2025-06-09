
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, Network, AlertTriangle, Eye, Shield } from 'lucide-react';

export default function FraudRingDetection() {
  const [scanningRings, setScanningRings] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const detectedRings = [
    {
      id: 'RING-001',
      name: 'Credit Card Cloning Network',
      members: 8,
      transactions: 45,
      totalAmount: 125000,
      confidence: 94,
      status: 'active',
      firstDetected: '3 days ago'
    },
    {
      id: 'RING-002',
      name: 'Identity Theft Syndicate',
      members: 15,
      transactions: 78,
      totalAmount: 230000,
      confidence: 88,
      status: 'investigating',
      firstDetected: '1 week ago'
    },
    {
      id: 'RING-003',
      name: 'Account Takeover Group',
      members: 6,
      transactions: 23,
      totalAmount: 67000,
      confidence: 76,
      status: 'monitored',
      firstDetected: '2 weeks ago'
    }
  ];

  const networkMetrics = [
    { label: 'Active Rings', value: '3', icon: Users },
    { label: 'Monitored Entities', value: '29', icon: Eye },
    { label: 'Blocked Transactions', value: '146', icon: Shield },
    { label: 'Network Connections', value: '1,247', icon: Network }
  ];

  const startRingScan = () => {
    setScanningRings(true);
    setScanProgress(0);
    
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanningRings(false);
          return 100;
        }
        return prev + 12;
      });
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {networkMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                </div>
                <metric.icon className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="h-5 w-5" />
            Ring Detection Engine
          </CardTitle>
          <CardDescription>
            Advanced algorithms to identify coordinated fraud attacks
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Button 
              onClick={startRingScan} 
              disabled={scanningRings}
              className="flex items-center gap-2"
            >
              <Network className="h-4 w-4" />
              {scanningRings ? 'Scanning Networks...' : 'Scan for Fraud Rings'}
            </Button>
            {scanningRings && (
              <div className="flex-1">
                <Progress value={scanProgress} className="w-full" />
                <p className="text-sm text-muted-foreground mt-1">
                  Analyzing transaction networks... {scanProgress}%
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detected Fraud Rings</CardTitle>
          <CardDescription>
            Identified coordinated fraud networks and their activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {detectedRings.map((ring) => (
              <div key={ring.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{ring.name}</h3>
                      <Badge variant={
                        ring.status === 'active' ? 'destructive' :
                        ring.status === 'investigating' ? 'secondary' : 'outline'
                      }>
                        {ring.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{ring.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Confidence: {ring.confidence}%</p>
                    <p className="text-xs text-muted-foreground">Detected: {ring.firstDetected}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Members</p>
                    <p className="font-medium">{ring.members}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Transactions</p>
                    <p className="font-medium">{ring.transactions}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Amount</p>
                    <p className="font-medium">${ring.totalAmount.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-3 w-3 mr-1" />
                    Investigate
                  </Button>
                  <Button variant="outline" size="sm">
                    <Network className="h-3 w-3 mr-1" />
                    View Network
                  </Button>
                  {ring.status === 'active' && (
                    <Button variant="destructive" size="sm">
                      <Shield className="h-3 w-3 mr-1" />
                      Block Network
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
