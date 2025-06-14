
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Activity, 
  AlertTriangle, 
  DollarSign, 
  TrendingUp,
  Shield,
  Clock,
  Info
} from 'lucide-react';

export default function AdvancedTransactionMonitoring() {
  const [metrics] = useState({
    totalTransactions: 0,
    flaggedTransactions: 0,
    falsePositives: 0,
    accuracyRate: 0,
    avgProcessingTime: 0
  });

  return (
    <div className="space-y-6">
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          Advanced Transaction Monitoring uses machine learning to detect fraudulent patterns 
          in real-time. Connect your payment systems to start monitoring transactions.
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
          <div className="text-center py-12 text-muted-foreground">
            <Info className="h-16 w-16 mx-auto mb-4" />
            <p className="text-lg mb-2">No transactions to monitor</p>
            <p className="text-sm">Connect your payment systems to start real-time monitoring</p>
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
                <Badge variant="outline" className="border-green-500 text-green-600">Ready</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded">
                <span className="text-sm font-medium">Amount Threshold</span>
                <Badge variant="outline" className="border-green-500 text-green-600">Ready</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded">
                <span className="text-sm font-medium">Geographic Anomaly</span>
                <Badge variant="outline" className="border-green-500 text-green-600">Ready</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-amber-50 border border-amber-200 rounded">
                <span className="text-sm font-medium">Device Fingerprint</span>
                <Badge variant="outline" className="border-amber-500 text-amber-600">Standby</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ML Model Performance</CardTitle>
            <CardDescription>Machine learning model metrics (requires data)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Precision</span>
                  <span>No data</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Recall</span>
                  <span>No data</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>F1 Score</span>
                  <span>No data</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>AUC-ROC</span>
                  <span>No data</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
