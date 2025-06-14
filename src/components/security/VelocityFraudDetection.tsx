
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import VelocityOverview from './velocity/VelocityOverview';
import VelocityChart from './velocity/VelocityChart';
import VelocityAlerts from './velocity/VelocityAlerts';
import { CreditCard, User, AlertTriangle } from 'lucide-react';

export default function VelocityFraudDetection() {
  // No fake alerts - empty arrays
  const [velocityAlerts] = useState([]);
  
  // Empty metrics data
  const [velocityMetrics] = useState([
    { timestamp: '00:00', transactions: 0, logins: 0, cardTests: 0, accounts: 0 },
    { timestamp: '04:00', transactions: 0, logins: 0, cardTests: 0, accounts: 0 },
    { timestamp: '08:00', transactions: 0, logins: 0, cardTests: 0, accounts: 0 },
    { timestamp: '12:00', transactions: 0, logins: 0, cardTests: 0, accounts: 0 },
    { timestamp: '16:00', transactions: 0, logins: 0, cardTests: 0, accounts: 0 },
    { timestamp: '20:00', transactions: 0, logins: 0, cardTests: 0, accounts: 0 },
  ]);

  const [currentMetrics] = useState({
    activeAlerts: 0,
    avgResponseTime: '0 minutes',
    detectionAccuracy: 0,
    totalBlocked: 0
  });

  // No simulated alerts - removed useEffect

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
