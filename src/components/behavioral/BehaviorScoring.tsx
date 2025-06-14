
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, TrendingUp, Eye } from 'lucide-react';

export default function BehaviorScoring() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Overall Behavior Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">92/100</div>
            <p className="text-xs text-muted-foreground">Excellent behavioral pattern</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Consistency Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">88%</div>
            <p className="text-xs text-muted-foreground">Highly consistent patterns</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Anomaly Detection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-600">2</div>
            <p className="text-xs text-muted-foreground">Minor anomalies detected</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Behavioral Risk Factors</CardTitle>
          <CardDescription>Analysis of behavioral patterns that may indicate risk</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">Transaction Timing</p>
                  <p className="text-sm text-muted-foreground">Consistent with historical patterns</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-100 text-green-600">Normal</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Spending Velocity</p>
                  <p className="text-sm text-muted-foreground">Within expected parameters</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-blue-100 text-blue-600">Normal</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-center gap-3">
                <Eye className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="font-medium">Device Changes</p>
                  <p className="text-sm text-muted-foreground">2 new devices in past month</p>
                </div>
              </div>
              <Badge variant="default" className="bg-amber-500">Monitor</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
