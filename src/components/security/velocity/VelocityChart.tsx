
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface VelocityMetric {
  timestamp: string;
  transactions: number;
  logins: number;
  cardTests: number;
  accounts: number;
}

interface VelocityChartProps {
  data: VelocityMetric[];
}

export default function VelocityChart({ data }: VelocityChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Velocity Patterns (24h)</CardTitle>
        <CardDescription>Activity patterns showing potential velocity fraud</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
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
  );
}
