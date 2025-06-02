
import React from 'react';
import { ArrowDown, ArrowUp, Bell, BarChart2, ShieldAlert, UserCheck, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';

// Real data - starting with zeros since this is a new system
const activityData = [
  { name: 'Mon', value: 0 },
  { name: 'Tue', value: 0 },
  { name: 'Wed', value: 0 },
  { name: 'Thu', value: 0 },
  { name: 'Fri', value: 0 },
  { name: 'Sat', value: 0 },
  { name: 'Sun', value: 0 },
];

// No alerts yet since system is new
const recentAlerts: any[] = [];

const getSeverityBadge = (severity: string) => {
  switch (severity) {
    case 'high':
      return <Badge variant="destructive">High</Badge>;
    case 'medium':
      return <Badge variant="default" className="bg-amber-500">Medium</Badge>;
    default:
      return <Badge variant="outline">Low</Badge>;
  }
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to FraudShield Central</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Compliance Score Card - Starting at 100% for new system */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Compliance Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">100/100</div>
              <div className="flex items-center text-sm text-muted-foreground font-medium">
                <span>New system</span>
              </div>
            </div>
            <Progress value={100} className="h-2 mt-3" />
          </CardContent>
          <CardFooter className="pt-2">
            <p className="text-xs text-muted-foreground">No compliance issues detected</p>
          </CardFooter>
        </Card>
        
        {/* Active Alerts Card - No alerts yet */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">0</div>
              <div className="flex items-center text-green-600 font-medium text-sm">
                <span>All clear</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-3">
              <div className="flex flex-col items-center p-2 bg-gray-50 rounded-md">
                <span className="text-xs text-muted-foreground">High</span>
                <span className="font-bold text-gray-400">0</span>
              </div>
              <div className="flex flex-col items-center p-2 bg-gray-50 rounded-md">
                <span className="text-xs text-muted-foreground">Med</span>
                <span className="font-bold text-gray-400">0</span>
              </div>
              <div className="flex flex-col items-center p-2 bg-gray-50 rounded-md">
                <span className="text-xs text-muted-foreground">Low</span>
                <span className="font-bold text-gray-400">0</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-2">
            <Button variant="ghost" size="sm" className="w-full text-xs" disabled>No alerts to view</Button>
          </CardFooter>
        </Card>
        
        {/* KYC Status Card - No users verified yet */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">KYC Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">0%</div>
              <div className="flex items-center text-muted-foreground font-medium text-sm">
                <span>No users</span>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span>Verified</span>
                <span className="font-medium">0</span>
              </div>
              <Progress value={0} className="h-2" />
              <div className="flex items-center justify-between text-sm">
                <span>Pending</span>
                <span className="font-medium">0</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-2">
            <Button variant="ghost" size="sm" className="w-full text-xs" disabled>No KYC data</Button>
          </CardFooter>
        </Card>
        
        {/* Risk Level Card - Low risk for new system */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Risk Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">Low</div>
              <div className="flex items-center text-green-600 font-medium text-sm">
                <span>Baseline</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-3">
              <ShieldAlert className="text-green-500 h-5 w-5" />
              <div className="text-sm">System ready for monitoring</div>
            </div>
          </CardContent>
          <CardFooter className="pt-2">
            <p className="text-xs text-muted-foreground">Start adding transactions to see risk analysis</p>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        {/* Activity Overview - Empty chart */}
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
            <CardDescription>Transactions and verification activity for the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem',
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--secondary))" 
                    fillOpacity={1}
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-4">
              <p className="text-sm text-muted-foreground">No activity recorded yet. Start using the system to see data here.</p>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Alerts - Empty state */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>Latest compliance and security alerts</CardDescription>
          </CardHeader>
          <CardContent>
            {recentAlerts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Alerts</h3>
                <p className="text-muted-foreground text-sm">
                  All systems are running smoothly. Alerts will appear here when attention is needed.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-md border bg-card card-hover">
                    <div className="mt-0.5">
                      {alert.severity === 'high' ? (
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      ) : (
                        <Bell className="h-5 w-5 text-amber-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-sm">{alert.type}</p>
                        {getSeverityBadge(alert.severity)}
                      </div>
                      <p className="text-sm text-muted-foreground">{alert.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" disabled={recentAlerts.length === 0}>
              {recentAlerts.length === 0 ? 'No alerts to view' : 'View all alerts'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
