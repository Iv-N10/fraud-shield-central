
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Clock, MapPin, Smartphone } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area
} from 'recharts';

const spendingPatterns = [
  { time: '00:00', amount: 125, transactions: 2 },
  { time: '04:00', amount: 89, transactions: 1 },
  { time: '08:00', amount: 456, transactions: 8 },
  { time: '12:00', amount: 1250, transactions: 15 },
  { time: '16:00', amount: 890, transactions: 12 },
  { time: '20:00', amount: 345, transactions: 6 },
];

export default function BehavioralPatternAnalysis() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Avg Transaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$456</div>
            <p className="text-xs text-green-600">+12% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Peak Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12-4 PM</div>
            <p className="text-xs text-muted-foreground">Most active period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Velocity Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">87</div>
            <p className="text-xs text-muted-foreground">Normal range</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Pattern Changes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">3</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Spending Pattern Analysis</CardTitle>
          <CardDescription>24-hour spending behavior and transaction frequency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={spendingPatterns}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.3}
                  name="Amount ($)"
                />
                <Line 
                  type="monotone" 
                  dataKey="transactions" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Transactions"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
