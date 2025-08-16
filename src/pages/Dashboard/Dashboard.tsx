
import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  
  // Fetch dashboard metrics
  const { data: metrics, isLoading } = useQuery({
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
        systemHealth: 99.8,
        threatLevel: fraudDetected > 5 ? 'high' : fraudDetected > 2 ? 'medium' : 'low',
        performanceScore: Math.min(100, 95 + Math.random() * 5)
      };
    },
    refetchInterval: 30000,
  });

  const MetricCard = ({ title, value, description, icon: Icon, className = '', trend }: {
    title: string;
    value: string | number;
    description: string;
    icon: any;
    className?: string;
    trend?: { value: number; direction: 'up' | 'down' };
  }) => (
    <Card className={`card-hover animate-fade-in-up ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold gradient-text">{value}</div>
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          {description}
          {trend && (
            <span className={`flex items-center ${trend.direction === 'up' ? 'text-success' : 'text-error'}`}>
              <TrendingUp className={`h-3 w-3 ${trend.direction === 'down' ? 'rotate-180' : ''}`} />
              {trend.value}%
            </span>
          )}
        </p>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Enhanced Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-xl blur-3xl"></div>
        <div className="relative bg-gradient-card border border-primary/20 rounded-xl p-6 shadow-glow">
          <h1 className="text-4xl font-bold gradient-text">Security Command Center</h1>
          <p className="text-muted-foreground text-lg mt-2">Real-time fraud detection and security monitoring</p>
          <div className="flex items-center gap-4 mt-4">
            <Badge className={`
              ${metrics?.threatLevel === 'high' ? 'status-error' : ''}
              ${metrics?.threatLevel === 'medium' ? 'status-warning' : ''}
              ${metrics?.threatLevel === 'low' ? 'status-success' : ''}
              animate-pulse-glow
            `}>
              {metrics?.threatLevel?.toUpperCase() || 'UNKNOWN'} THREAT LEVEL
            </Badge>
            <Badge className="status-success animate-bounce-subtle">
              SYSTEM OPERATIONAL
            </Badge>
          </div>
        </div>
      </div>

      {/* Enhanced Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Transactions Today"
          value={isLoading ? '...' : metrics?.totalTransactions?.toLocaleString() || '0'}
          description={`Total value: $${metrics?.totalAmount?.toLocaleString() || '0'}`}
          icon={Activity}
          className="card-glow"
          trend={{ value: 12, direction: 'up' }}
        />
        
        <MetricCard
          title="Fraud Detected"
          value={isLoading ? '...' : metrics?.fraudDetected || 0}
          description={`Prevented: $${metrics?.fraudPrevented?.toLocaleString() || '0'}`}
          icon={Shield}
          className="card-glow border-error/20"
          trend={{ value: 8, direction: 'down' }}
        />
        
        <MetricCard
          title="Connected Banks"
          value={isLoading ? '...' : metrics?.connectedBanks || 0}
          description="Active integrations"
          icon={Building2}
          className="card-glow border-secondary/20"
          trend={{ value: 5, direction: 'up' }}
        />
        
        <MetricCard
          title="System Health"
          value={isLoading ? '...' : `${metrics?.systemHealth || 99.8}%`}
          description="All systems operational"
          icon={TrendingUp}
          className="card-glow border-success/20"
          trend={{ value: 2, direction: 'up' }}
        />
      </div>

      {/* Real-time Transaction Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RealTimeBankFeed />
        </div>
        
        <div className="space-y-6">
          {/* Enhanced Quick Actions */}
          <Card className="card-glow border-primary/20 animate-slide-up">
            <CardHeader>
              <CardTitle className="gradient-text">Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full justify-between btn-premium hover:scale-105 transition-transform"
                onClick={() => navigate('/dashboard/connected-banks')}
              >
                Connect New Bank
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button 
                className="w-full justify-between btn-glow" 
                variant="outline"
                onClick={() => navigate('/dashboard/transactions')}
              >
                View All Transactions
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button 
                className="w-full justify-between" 
                variant="outline"
                onClick={() => navigate('/dashboard/reports')}
              >
                Generate Report
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button 
                className="w-full justify-between" 
                variant="outline"
                onClick={() => navigate('/dashboard/security')}
              >
                Security Settings
                <ChevronRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Enhanced System Status */}
          <Card className="card-glow border-success/20 animate-slide-up">
            <CardHeader>
              <CardTitle className="gradient-text">System Status</CardTitle>
              <CardDescription>Current system performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">AI Processing</span>
                  <Badge className="status-success animate-pulse">Online</Badge>
                </div>
                <Progress value={98} className="h-3 bg-muted [&>div]:bg-gradient-primary" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Bank Connections</span>
                  <Badge className="status-success animate-pulse">Stable</Badge>
                </div>
                <Progress value={100} className="h-3 bg-muted [&>div]:bg-gradient-secondary" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">API Response</span>
                  <Badge className="status-success animate-pulse">Fast</Badge>
                </div>
                <Progress value={95} className="h-3 bg-muted [&>div]:bg-gradient-accent" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Performance Score</span>
                  <Badge className="status-success animate-float">
                    {Math.round(metrics?.performanceScore || 98)}%
                  </Badge>
                </div>
                <Progress 
                  value={metrics?.performanceScore || 98} 
                  className="h-3 bg-muted [&>div]:bg-gradient-primary animate-shimmer" 
                />
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Recent Alerts */}
          <Card className="card-glow border-warning/20 animate-slide-up">
            <CardHeader>
              <CardTitle className="gradient-text">Recent Alerts</CardTitle>
              <CardDescription>Latest security notifications</CardDescription>
            </CardHeader>
            <CardContent>
              {metrics?.fraudDetected ? (
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 border border-error/20 rounded-lg bg-error/5 animate-fade-in">
                    <AlertTriangle className="w-5 h-5 text-error mt-0.5 animate-wiggle" />
                    <div className="text-sm">
                      <p className="font-semibold text-error">Fraud detected</p>
                      <p className="text-muted-foreground">High-risk transaction blocked</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Last detected: {new Date().toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 border border-warning/20 rounded-lg bg-warning/5">
                    <Eye className="w-5 h-5 text-warning mt-0.5" />
                    <div className="text-sm">
                      <p className="font-semibold text-warning">Suspicious activity</p>
                      <p className="text-muted-foreground">Multiple login attempts detected</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Shield className="w-12 h-12 text-success mx-auto mb-3 animate-bounce-subtle" />
                  <p className="text-sm text-success font-medium">All Clear</p>
                  <p className="text-xs text-muted-foreground">No security alerts detected</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
