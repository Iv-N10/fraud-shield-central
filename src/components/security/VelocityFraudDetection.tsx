
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Zap, 
  TrendingUp, 
  Clock, 
  AlertTriangle, 
  User, 
  CreditCard,
  Activity,
  Timer
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from 'recharts';

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
      if (Math.random() > 0.8) { // 20% chance every 15 seconds
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'transaction':
        return <CreditCard className="h-4 w-4 text-blue-500" />;
      case 'login':
        return <User className="h-4 w-4 text-green-500" />;
      case 'card_testing':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'account_creation':
        return <User className="h-4 w-4 text-amber-500" />;
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'transaction':
        return 'High Transaction Volume';
      case 'login':
        return 'Rapid Login Attempts';
      case 'card_testing':
        return 'Card Testing Pattern';
      case 'account_creation':
        return 'Mass Account Creation';
      default:
        return 'Unknown Pattern';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-red-500 text-white';
      case 'investigating':
        return 'bg-amber-500 text-white';
      default:
        return 'bg-green-500 text-white';
    }
  };

  return (
    <div className="space-y-6">
      {/* Velocity Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
                <p className="text-2xl font-bold text-red-600">{currentMetrics.activeAlerts}</p>
              </div>
              <Zap className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
                <p className="text-2xl font-bold">{currentMetrics.avgResponseTime}</p>
              </div>
              <Timer className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Detection Accuracy</p>
                <p className="text-2xl font-bold text-green-600">{currentMetrics.detectionAccuracy}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Blocked</p>
                <p className="text-2xl font-bold">{currentMetrics.totalBlocked}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Velocity Patterns Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Velocity Patterns (24h)</CardTitle>
            <CardDescription>Activity patterns showing potential velocity fraud</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={velocityMetrics}>
                  <defs>
                    <linearGradient id="colorTransactions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorCardTests" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="transactions" 
                    stroke="#3b82f6" 
                    fillOpacity={1} 
                    fill="url(#colorTransactions)"
                    name="Transactions"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="cardTests" 
                    stroke="#ef4444" 
                    fillOpacity={1} 
                    fill="url(#colorCardTests)"
                    name="Card Tests"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Active Velocity Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Velocity Alerts</CardTitle>
            <CardDescription>Real-time velocity-based fraud detection alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[340px] overflow-y-auto">
              {velocityAlerts.map((alert) => (
                <div key={alert.id} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(alert.type)}
                      <h4 className="font-medium text-sm">{getTypeLabel(alert.type)}</h4>
                      <Badge className={getStatusColor(alert.status)}>
                        {alert.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>User: {alert.userId}</span>
                      <span className="font-medium">{alert.count} actions in {alert.timeWindow}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        Threshold: {alert.threshold} | Risk: {alert.riskScore}%
                      </span>
                    </div>
                    
                    <Progress value={(alert.count / alert.threshold) * 100} className="h-2" />
                  </div>
                </div>
              ))}
              
              {velocityAlerts.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Clock className="h-12 w-12 mx-auto mb-4" />
                  <p>No velocity alerts detected</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
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
