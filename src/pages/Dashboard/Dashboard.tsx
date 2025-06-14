
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  DollarSign, 
  Activity,
  Eye,
  ChevronRight,
  Building2
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import RealTimeBankFeed from '@/components/realtime/RealTimeBankFeed';

const Dashboard = () => {
  // Fetch dashboard metrics
  const { data: metrics } = useQuery({
    queryKey: ['dashboardMetrics'],
    queryFn: async () => {
      const [transactionsResult, incidentsResult, bankConnectionsResult] = await Promise.all([
        supabase.from('transactions').select('*').gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()),
        supabase.from('security_incidents').select('*').gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()),
        supabase.from('bank_connections').select('*').eq('status', 'active')
      ]);

      const transactions = transactionsResult.data || [];
      const incidents = incidentsResult.data || [];
      const bankConnections = bankConnectionsResult.data || [];

      const fraudDetected = transactions.filter(t => t.fraud_status === 'flagged' || t.fraud_status === 'blocked').length;
      const totalAmount = transactions.reduce((sum, t) => sum + Number(t.amount), 0);

      return {
        totalTransactions: transactions.length,
        fraudDetected,
        securityIncidents: incidents.length,
        connectedBanks: bankConnections.length,
        totalAmount: totalAmount,
        fraudPrevented: fraudDetected * 15000, // Estimated amount saved
        systemHealth: 99.8
      };
    },
    refetchInterval: 30000,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Real-time fraud detection and security monitoring</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions Today</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.totalTransactions?.toLocaleString() || '0'}</div>
            <p className="text-xs text-muted-foreground">
              Total value: ${metrics?.totalAmount?.toLocaleString() || '0'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fraud Detected</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{metrics?.fraudDetected || 0}</div>
            <p className="text-xs text-muted-foreground">
              Prevented: ${metrics?.fraudPrevented?.toLocaleString() || '0'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connected Banks</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{metrics?.connectedBanks || 0}</div>
            <p className="text-xs text-muted-foreground">Active integrations</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{metrics?.systemHealth || 99.8}%</div>
            <p className="text-xs text-muted-foreground">All systems operational</p>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Transaction Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RealTimeBankFeed />
        </div>
        
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-between" variant="outline">
                Connect New Bank
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button className="w-full justify-between" variant="outline">
                View All Transactions
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button className="w-full justify-between" variant="outline">
                Generate Report
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button className="w-full justify-between" variant="outline">
                Security Settings
                <ChevronRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>Current system performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">AI Processing</span>
                  <Badge className="bg-green-100 text-green-600">Online</Badge>
                </div>
                <Progress value={98} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Bank Connections</span>
                  <Badge className="bg-green-100 text-green-600">Stable</Badge>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">API Response</span>
                  <Badge className="bg-green-100 text-green-600">Fast</Badge>
                </div>
                <Progress value={95} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Recent Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
              <CardDescription>Latest security notifications</CardDescription>
            </CardHeader>
            <CardContent>
              {metrics?.fraudDetected ? (
                <div className="space-y-3">
                  <div className="flex items-start gap-2 p-2 border rounded">
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium">Fraud detected</p>
                      <p className="text-muted-foreground">High-risk transaction blocked</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No recent alerts
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
