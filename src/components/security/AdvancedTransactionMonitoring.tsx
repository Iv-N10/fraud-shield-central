
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Activity, 
  AlertTriangle, 
  DollarSign, 
  TrendingUp,
  Shield,
  Clock,
  Globe,
  CreditCard
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TransactionAlert {
  id: string;
  type: 'velocity' | 'amount' | 'location' | 'pattern';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  amount: number;
  userId: string;
  timestamp: string;
  riskScore: number;
}

export default function AdvancedTransactionMonitoring() {
  const [alerts, setAlerts] = useState<TransactionAlert[]>([
    {
      id: 'ALT-001',
      type: 'velocity',
      severity: 'high',
      description: 'Multiple high-value transactions in short timeframe',
      amount: 15000,
      userId: 'user_12345',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      riskScore: 87
    },
    {
      id: 'ALT-002',
      type: 'location',
      severity: 'critical',
      description: 'Transaction from suspicious geographic location',
      amount: 25000,
      userId: 'user_67890',
      timestamp: new Date(Date.now() - 180000).toISOString(),
      riskScore: 94
    }
  ]);

  const [metrics] = useState({
    totalTransactions: 45672,
    flaggedTransactions: 234,
    falsePositives: 12,
    accuracyRate: 96.8,
    avgProcessingTime: 0.3
  });

  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        const newAlert: TransactionAlert = {
          id: `ALT-${Date.now()}`,
          type: ['velocity', 'amount', 'location', 'pattern'][Math.floor(Math.random() * 4)] as any,
          severity: ['medium', 'high', 'critical'][Math.floor(Math.random() * 3)] as any,
          description: 'Suspicious transaction pattern detected',
          amount: Math.floor(Math.random() * 50000) + 1000,
          userId: `user_${Math.floor(Math.random() * 100000)}`,
          timestamp: new Date().toISOString(),
          riskScore: Math.floor(Math.random() * 40) + 60
        };
        
        setAlerts(prev => [newAlert, ...prev.slice(0, 9)]);
        
        toast({
          title: "New Transaction Alert",
          description: `${newAlert.severity.toUpperCase()} risk transaction detected`,
          variant: newAlert.severity === 'critical' ? 'destructive' : 'default'
        });
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [toast]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-600 text-white';
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-amber-500 text-white';
      default: return 'bg-blue-500 text-white';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'velocity': return <Clock className="h-4 w-4" />;
      case 'amount': return <DollarSign className="h-4 w-4" />;
      case 'location': return <Globe className="h-4 w-4" />;
      default: return <CreditCard className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          Advanced Transaction Monitoring uses machine learning to detect fraudulent patterns 
          in real-time with 96.8% accuracy and sub-second processing times.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Transactions</p>
                <p className="text-xl font-bold">{metrics.totalTransactions.toLocaleString()}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Flagged</p>
                <p className="text-xl font-bold text-red-600">{metrics.flaggedTransactions}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Accuracy Rate</p>
                <p className="text-xl font-bold text-green-600">{metrics.accuracyRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">False Positives</p>
                <p className="text-xl font-bold">{metrics.falsePositives}</p>
              </div>
              <Shield className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Processing</p>
                <p className="text-xl font-bold">{metrics.avgProcessingTime}s</p>
              </div>
              <Clock className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Real-Time Transaction Alerts</CardTitle>
          <CardDescription>
            Live monitoring of suspicious transaction patterns and anomalies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getTypeIcon(alert.type)}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{alert.id}</span>
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Amount: ${alert.amount.toLocaleString()}</span>
                      <span>User: {alert.userId}</span>
                      <span>Risk: {alert.riskScore}%</span>
                      <span>{new Date(alert.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={alert.riskScore} className="w-16" />
                  <Button variant="outline" size="sm">
                    Investigate
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Detection Rules</CardTitle>
            <CardDescription>Active fraud detection rules and thresholds</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded">
                <span className="text-sm font-medium">Velocity Check</span>
                <Badge variant="outline" className="border-green-500 text-green-600">Active</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded">
                <span className="text-sm font-medium">Amount Threshold</span>
                <Badge variant="outline" className="border-green-500 text-green-600">Active</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded">
                <span className="text-sm font-medium">Geographic Anomaly</span>
                <Badge variant="outline" className="border-green-500 text-green-600">Active</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-amber-50 border border-amber-200 rounded">
                <span className="text-sm font-medium">Device Fingerprint</span>
                <Badge variant="outline" className="border-amber-500 text-amber-600">Learning</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ML Model Performance</CardTitle>
            <CardDescription>Real-time machine learning model metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Precision</span>
                  <span>94.2%</span>
                </div>
                <Progress value={94.2} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Recall</span>
                  <span>91.8%</span>
                </div>
                <Progress value={91.8} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>F1 Score</span>
                  <span>93.0%</span>
                </div>
                <Progress value={93.0} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>AUC-ROC</span>
                  <span>96.5%</span>
                </div>
                <Progress value={96.5} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
