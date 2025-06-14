
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
  Play,
  Info
} from 'lucide-react';

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
  const [transactions] = useState<LiveTransaction[]>([]);
  const [isStreaming, setIsStreaming] = useState(true);
  const [totalVolume] = useState(0);
  const [flaggedCount] = useState(0);

  // No fake data generation - removed useEffect that created mock transactions

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
          <div className="text-center py-12 text-muted-foreground">
            <Info className="h-16 w-16 mx-auto mb-4" />
            <p className="text-lg mb-2">No live transactions</p>
            <p className="text-sm">Connect your payment systems to start real-time monitoring</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
