
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  DollarSign,
  Globe,
  Smartphone,
  Monitor,
  Pause,
  Play
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface LiveTransaction {
  id: string;
  amount: number;
  currency: string;
  user_name: string;
  transaction_type: string;
  location_country: string;
  location_city: string;
  risk_score: number;
  fraud_status: string;
  payment_method: string;
  device_type: string;
  timestamp: string;
}

export default function RealTimeTransactionStream() {
  const [transactions, setTransactions] = useState<LiveTransaction[]>([]);
  const [isStreaming, setIsStreaming] = useState(true);
  const [totalVolume, setTotalVolume] = useState(0);
  const [flaggedCount, setFlaggedCount] = useState(0);

  // Simulate real-time transactions for demo
  useEffect(() => {
    if (!isStreaming) return;

    const generateMockTransaction = (): LiveTransaction => {
      const users = ['Alex Johnson', 'Maria Garcia', 'John Smith', 'Sarah Chen', 'Michael Brown'];
      const countries = ['US', 'UK', 'CA', 'AU', 'DE', 'FR', 'JP'];
      const cities = ['New York', 'London', 'Toronto', 'Sydney', 'Berlin', 'Paris', 'Tokyo'];
      const types = ['purchase', 'withdrawal', 'transfer', 'deposit'];
      const methods = ['credit_card', 'debit_card', 'bank_transfer', 'digital_wallet'];
      const devices = ['mobile', 'desktop', 'tablet'];
      
      const amount = Math.floor(Math.random() * 5000) + 10;
      const riskScore = Math.floor(Math.random() * 100);
      const status = riskScore > 70 ? 'flagged' : riskScore > 40 ? 'review' : 'approved';
      
      return {
        id: `TXN-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        amount,
        currency: 'USD',
        user_name: users[Math.floor(Math.random() * users.length)],
        transaction_type: types[Math.floor(Math.random() * types.length)],
        location_country: countries[Math.floor(Math.random() * countries.length)],
        location_city: cities[Math.floor(Math.random() * cities.length)],
        risk_score: riskScore,
        fraud_status: status,
        payment_method: methods[Math.floor(Math.random() * methods.length)],
        device_type: devices[Math.floor(Math.random() * devices.length)],
        timestamp: new Date().toISOString()
      };
    };

    const interval = setInterval(() => {
      const newTransaction = generateMockTransaction();
      
      setTransactions(prev => {
        const updated = [newTransaction, ...prev.slice(0, 49)]; // Keep last 50
        return updated;
      });

      setTotalVolume(prev => prev + newTransaction.amount);
      if (newTransaction.fraud_status === 'flagged') {
        setFlaggedCount(prev => prev + 1);
      }
    }, 2000 + Math.random() * 3000); // Random interval 2-5 seconds

    return () => clearInterval(interval);
  }, [isStreaming]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'flagged':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'review':
        return <Clock className="h-4 w-4 text-amber-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'mobile':
        return <Smartphone className="h-4 w-4 text-muted-foreground" />;
      case 'tablet':
        return <Smartphone className="h-4 w-4 text-muted-foreground" />;
      default:
        return <Monitor className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getRiskBadge = (score: number) => {
    if (score >= 70) {
      return <Badge variant="destructive" className="text-xs">High Risk</Badge>;
    } else if (score >= 40) {
      return <Badge variant="default" className="bg-amber-500 text-xs">Medium</Badge>;
    } else {
      return <Badge variant="outline" className="border-green-500 text-green-600 text-xs">Low Risk</Badge>;
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Live Transaction Stream
            </CardTitle>
            <CardDescription>Real-time transaction monitoring</CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Total Volume</div>
              <div className="font-bold">${totalVolume.toLocaleString()}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Flagged</div>
              <div className="font-bold text-red-600">{flaggedCount}</div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsStreaming(!isStreaming)}
              className="flex items-center gap-2"
            >
              {isStreaming ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isStreaming ? 'Pause' : 'Resume'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto space-y-2">
          {transactions.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <div className="text-center">
                <Activity className="h-12 w-12 mx-auto mb-4 animate-pulse" />
                <p>Waiting for transactions...</p>
              </div>
            </div>
          ) : (
            transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 border rounded-lg bg-card hover:bg-accent/50 transition-colors animate-fade-in"
              >
                <div className="flex items-center gap-3">
                  {getStatusIcon(transaction.fraud_status)}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{transaction.user_name}</span>
                      {getDeviceIcon(transaction.device_type)}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Globe className="h-3 w-3" />
                      <span>{transaction.location_city}, {transaction.location_country}</span>
                      <span>•</span>
                      <span className="capitalize">{transaction.transaction_type}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="font-bold text-sm">
                      ${transaction.amount.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground capitalize">
                      {transaction.payment_method.replace('_', ' ')}
                    </div>
                  </div>
                  {getRiskBadge(transaction.risk_score)}
                  <div className="text-xs text-muted-foreground">
                    {new Date(transaction.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
