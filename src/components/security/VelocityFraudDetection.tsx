import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import VelocityOverview from './velocity/VelocityOverview';
import VelocityChart from './velocity/VelocityChart';
import VelocityAlerts from './velocity/VelocityAlerts';
import { CreditCard, User, AlertTriangle } from 'lucide-react';

interface VelocityAlert {
  id: string;
  type: 'transaction' | 'login' | 'card_testing' | 'account_creation';
  userId: string;
  count: number;
  timeWindow: string;
  threshold: number;
  riskScore: number;
  timestamp: string;
  status: 'active' | 'resolved' | 'investigating';
}

interface VelocityMetric {
  timestamp: string;
  transactions: number;
  logins: number;
  cardTests: number;
  accounts: number;
}

export default function VelocityFraudDetection() {
  const [velocityAlerts, setVelocityAlerts] = useState<VelocityAlert[]>([
    {
      id: '1',
      type: 'transaction',
      userId: 'user_12345',
      count: 15,
      timeWindow: '5 minutes',
      threshold: 10,
      riskScore: 92,
      timestamp: new Date(Date.now() - 180000).toISOString(),
      status: 'active'
    },
    {
      id: '2',
      type: 'card_testing',
      userId: 'user_67890',
      count: 8,
      timeWindow: '2 minutes',
      threshold: 5,
      riskScore: 88,
      timestamp: new Date(Date.now() - 300000).toISOString(),
      status: 'investigating'
    },
    {
      id: '3',
      type: 'login',
      userId: 'user_54321',
      count: 12,
      timeWindow: '1 minute',
      threshold: 8,
      riskScore: 75,
      timestamp: new Date(Date.now() - 600000).toISOString(),
      status: 'resolved'
    }
  ]);

  const [velocityMetrics] = useState<VelocityMetric[]>([
    { timestamp: '00:00', transactions: 45, logins: 23, cardTests: 2, accounts: 5 },
    { timestamp: '04:00', transactions: 32, logins: 18, cardTests: 1, accounts: 3 },
    { timestamp: '08:00', transactions: 78, logins: 41, cardTests: 4, accounts: 8 },
    { timestamp: '12:00', transactions: 92, logins: 56, cardTests: 7, accounts: 12 },
    { timestamp: '16:00', transactions: 156, logins: 89, cardTests: 15, accounts: 18 },
    { timestamp: '20:00', transactions: 134, logins: 67, cardTests: 12, accounts: 15 },
  ]);

  const [currentMetrics] = useState({
    activeAlerts: velocityAlerts.filter(a => a.status === 'active').length,
    avgResponseTime: '2.3 minutes',
    detectionAccuracy: 94.8,
    totalBlocked: 156
  });

  // Simulate new velocity alerts
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        const types = ['transaction', 'login', 'card_testing', 'account_creation'] as const;
        const newAlert: VelocityAlert = {
          id: Date.now().toString(),
          type: types[Math.floor(Math.random() * types.length)],
          userId: `user_${Math.floor(Math.random() * 100000)}`,
          count: Math.floor(Math.random() * 20) + 5,
          timeWindow: ['1 minute', '2 minutes', '5 minutes'][Math.floor(Math.random() * 3)],
          threshold: Math.floor(Math.random() * 10) + 3,
          riskScore: Math.floor(Math.random() * 30) + 70,
          timestamp: new Date().toISOString(),
          status: 'active'
        };
        
        setVelocityAlerts(prev => [newAlert, ...prev.slice(0, 19)]);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <VelocityOverview metrics={currentMetrics} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VelocityChart data={velocityMetrics} />
        <VelocityAlerts alerts={velocityAlerts} />
      </div>

      {/* Velocity Thresholds */}
      <Card>
        <CardHeader>
          <CardTitle>Velocity Thresholds</CardTitle>
          <CardDescription>Current detection thresholds for different activity types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="h-5 w-5 text-blue-500" />
                <h4 className="font-medium">Transactions</h4>
              </div>
              <div className="text-sm text-muted-foreground">
                <div>Max per minute: 10</div>
                <div>Max per 5min: 25</div>
                <div>Max per hour: 100</div>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <User className="h-5 w-5 text-green-500" />
                <h4 className="font-medium">Login Attempts</h4>
              </div>
              <div className="text-sm text-muted-foreground">
                <div>Max per minute: 5</div>
                <div>Max per 5min: 15</div>
                <div>Max per hour: 50</div>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <h4 className="font-medium">Card Testing</h4>
              </div>
              <div className="text-sm text-muted-foreground">
                <div>Max per minute: 3</div>
                <div>Max per 5min: 8</div>
                <div>Max per hour: 20</div>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <User className="h-5 w-5 text-amber-500" />
                <h4 className="font-medium">Account Creation</h4>
              </div>
              <div className="text-sm text-muted-foreground">
                <div>Max per minute: 2</div>
                <div>Max per 5min: 5</div>
                <div>Max per hour: 15</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
