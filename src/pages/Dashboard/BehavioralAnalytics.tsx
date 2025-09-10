
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { 
  User, 
  MapPin, 
  Smartphone, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  Eye,
  BarChart3
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const spendingPatterns = [
  { time: '00:00', amount: 125, transactions: 2 },
  { time: '04:00', amount: 89, transactions: 1 },
  { time: '08:00', amount: 456, transactions: 8 },
  { time: '12:00', amount: 1250, transactions: 15 },
  { time: '16:00', amount: 890, transactions: 12 },
  { time: '20:00', amount: 345, transactions: 6 },
];

// Fetch real device data from transactions
const BehavioralAnalytics = () => {
  const { data: transactions = [] } = useQuery({
    queryKey: ['deviceAnalytics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('device_fingerprint')
        .not('device_fingerprint', 'is', null);
      
      if (error) throw error;
      return data || [];
    },
  });

  const deviceData = transactions.length > 0 
    ? [
        { name: 'Mobile', value: Math.floor(transactions.length * 0.6), color: '#3b82f6' },
        { name: 'Desktop', value: Math.floor(transactions.length * 0.3), color: '#10b981' },
        { name: 'Tablet', value: Math.floor(transactions.length * 0.1), color: '#f59e0b' },
      ]
    : [
        { name: 'No Data', value: 1, color: '#6b7280' },
      ];

  const locationInsights = [
    { location: 'New York, NY', transactions: 1250, risk: 'low', percentage: 45 },
    { location: 'Los Angeles, CA', transactions: 890, risk: 'low', percentage: 32 },
    { location: 'Chicago, IL', transactions: 456, risk: 'medium', percentage: 16 },
    { location: 'Unknown/VPN', transactions: 123, risk: 'high', percentage: 7 },
  ];

  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'high':
        return <Badge variant="destructive">High Risk</Badge>;
      case 'medium':
        return <Badge variant="default" className="bg-amber-500">Medium Risk</Badge>;
      default:
        return <Badge variant="outline">Low Risk</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <User className="h-8 w-8" />
            Behavioral Analytics
          </h1>
          <p className="text-muted-foreground">Deep insights into user behavior patterns and risk indicators</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">Export Report</Button>
          <Button size="sm">Configure Alerts</Button>
        </div>
      </div>

      <Tabs defaultValue="spending" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="spending">Spending Patterns</TabsTrigger>
          <TabsTrigger value="devices">Device Analytics</TabsTrigger>
          <TabsTrigger value="locations">Location Insights</TabsTrigger>
          <TabsTrigger value="behavior">Behavior Scoring</TabsTrigger>
        </TabsList>

        <TabsContent value="spending" className="space-y-4">
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
        </TabsContent>

        <TabsContent value="devices" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Device Distribution</CardTitle>
                <CardDescription>Transaction distribution by device type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        dataKey="value"
                        nameKey="name"
                      >
                        {deviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  {deviceData.map((device, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: device.color }}
                        ></div>
                        <span>{device.name}</span>
                      </div>
                      <span className="font-medium">{device.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Device Risk Assessment</CardTitle>
                <CardDescription>Security analysis by device category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Mobile Devices</p>
                        <p className="text-sm text-muted-foreground">1,247 unique devices</p>
                      </div>
                    </div>
                    <Badge variant="outline">Low Risk</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <BarChart3 className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">Desktop Browsers</p>
                        <p className="text-sm text-muted-foreground">456 unique devices</p>
                      </div>
                    </div>
                    <Badge variant="outline">Low Risk</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                      <div>
                        <p className="font-medium">Unknown/Suspicious</p>
                        <p className="text-sm text-muted-foreground">23 flagged devices</p>
                      </div>
                    </div>
                    <Badge variant="default" className="bg-amber-500">Medium Risk</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="locations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Geographic Transaction Analysis</CardTitle>
              <CardDescription>Transaction patterns and risk assessment by location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {locationInsights.map((location, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">{location.location}</p>
                        <p className="text-sm text-muted-foreground">
                          {location.transactions.toLocaleString()} transactions ({location.percentage}%)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getRiskBadge(location.risk)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-4">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BehavioralAnalytics;
