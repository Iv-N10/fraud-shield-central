
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Timer, TrendingUp, AlertTriangle } from 'lucide-react';

interface VelocityOverviewProps {
  metrics: {
    activeAlerts: number;
    avgResponseTime: string;
    detectionAccuracy: number;
    totalBlocked: number;
  };
}

export default function VelocityOverview({ metrics }: VelocityOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Alerts</p>
              <p className="text-2xl font-bold text-red-600">{metrics.activeAlerts}</p>
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
              <p className="text-2xl font-bold">{metrics.avgResponseTime}</p>
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
              <p className="text-2xl font-bold text-green-600">{metrics.detectionAccuracy}%</p>
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
              <p className="text-2xl font-bold">{metrics.totalBlocked}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-amber-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
