
import React from 'react';
import { ArrowDown, ArrowUp, Bell, BarChart2, ShieldAlert, UserCheck, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  BarChart,
  Bar
} from 'recharts';

interface DashboardMetrics {
  totalTransactions: number;
  flaggedTransactions: number;
  securityIncidents: number;
  kycVerifications: number;
  riskScore: number;
  complianceScore: number;
  weeklyActivity: Array<{ name: string; transactions: number; incidents: number }>;
  recentAlerts: Array<{
    id: string;
    type: string;
    severity: string;
    description: string;
    time: string;
  }>;
}

const fetchDashboardMetrics = async (): Promise<DashboardMetrics> => {
  console.log('Fetching dashboard metrics...');
  
  // Get current date and 7 days ago
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  // Fetch transaction metrics
  const { data: transactions, error: transactionsError } = await supabase
    .from('transactions')
    .select('*')
    .gte('created_at', weekAgo.toISOString());

  if (transactionsError) {
    console.error('Error fetching transactions:', transactionsError);
  }

  // Fetch security incidents
  const { data: incidents, error: incidentsError } = await supabase
    .from('security_incidents')
    .select('*')
    .gte('created_at', weekAgo.toISOString());

  if (incidentsError) {
    console.error('Error fetching security incidents:', incidentsError);
  }

  // Fetch KYC verifications
  const { data: kycVerifications, error: kycError } = await supabase
    .from('kyc_verifications')
    .select('*')
    .gte('created_at', weekAgo.toISOString());

  if (kycError) {
    console.error('Error fetching KYC verifications:', kycError);
  }

  console.log('Raw data:', { transactions, incidents, kycVerifications });

  // Calculate metrics
  const totalTransactions = transactions?.length || 0;
  const flaggedTransactions = transactions?.filter(t => t.fraud_status === 'flagged' || t.fraud_status === 'blocked').length || 0;
  const securityIncidents = incidents?.length || 0;
  const totalKycVerifications = kycVerifications?.length || 0;

  // Calculate risk score based on flagged transactions and security incidents
  const riskScore = totalTransactions > 0 
    ? Math.min(Math.round(((flaggedTransactions + securityIncidents) / (totalTransactions + securityIncidents)) * 100), 100)
    : 0;

  // Calculate compliance score (inverse of risk score, with bonus for clean record)
  const complianceScore = totalTransactions === 0 && securityIncidents === 0 
    ? 100 // Perfect score for new system
    : Math.max(100 - riskScore, 0);

  // Generate weekly activity data
  const weeklyActivity = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dayStart = new Date(date.setHours(0, 0, 0, 0));
    const dayEnd = new Date(date.setHours(23, 59, 59, 999));
    
    const dayTransactions = transactions?.filter(t => {
      const transactionDate = new Date(t.created_at);
      return transactionDate >= dayStart && transactionDate <= dayEnd;
    }).length || 0;
    
    const dayIncidents = incidents?.filter(i => {
      const incidentDate = new Date(i.created_at);
      return incidentDate >= dayStart && incidentDate <= dayEnd;
    }).length || 0;

    weeklyActivity.push({
      name: dayName,
      transactions: dayTransactions,
      incidents: dayIncidents
    });
  }

  // Get recent alerts (high severity incidents and flagged transactions)
  const recentAlerts = [];
  
  // Add high severity security incidents
  incidents?.filter(i => i.severity === 'high' || i.severity === 'critical')
    .slice(0, 3)
    .forEach(incident => {
      recentAlerts.push({
        id: incident.id,
        type: `Security: ${incident.incident_type}`,
        severity: incident.severity,
        description: `${incident.severity} severity ${incident.incident_type} attack ${incident.blocked ? 'blocked' : 'detected'}`,
        time: new Date(incident.created_at).toLocaleString()
      });
    });

  // Add flagged transactions
  transactions?.filter(t => t.fraud_status === 'flagged')
    .slice(0, 2)
    .forEach(transaction => {
      recentAlerts.push({
        id: transaction.id,
        type: 'Fraud Alert',
        severity: 'high',
        description: `Suspicious ${transaction.transaction_type} of ${transaction.currency} ${transaction.amount}`,
        time: new Date(transaction.created_at).toLocaleString()
      });
    });

  const metrics: DashboardMetrics = {
    totalTransactions,
    flaggedTransactions,
    securityIncidents,
    kycVerifications: totalKycVerifications,
    riskScore,
    complianceScore,
    weeklyActivity,
    recentAlerts: recentAlerts.slice(0, 5)
  };

  console.log('Calculated metrics:', metrics);
  return metrics;
};

const getSeverityBadge = (severity: string) => {
  switch (severity) {
    case 'high':
    case 'critical':
      return <Badge variant="destructive">High</Badge>;
    case 'medium':
      return <Badge variant="default" className="bg-amber-500">Medium</Badge>;
    default:
      return <Badge variant="outline">Low</Badge>;
  }
};

export default function Dashboard() {
  const { data: metrics, isLoading, error } = useQuery({
    queryKey: ['dashboardMetrics'],
    queryFn: fetchDashboardMetrics,
    refetchInterval: 60000, // Refetch every minute
  });

  if (error) {
    console.error('Dashboard metrics error:', error);
  }

  // Use default values while loading or if no data
  const {
    totalTransactions = 0,
    flaggedTransactions = 0,
    securityIncidents = 0,
    kycVerifications = 0,
    riskScore = 0,
    complianceScore = 100,
    weeklyActivity = [
      { name: 'Mon', transactions: 0, incidents: 0 },
      { name: 'Tue', transactions: 0, incidents: 0 },
      { name: 'Wed', transactions: 0, incidents: 0 },
      { name: 'Thu', transactions: 0, incidents: 0 },
      { name: 'Fri', transactions: 0, incidents: 0 },
      { name: 'Sat', transactions: 0, incidents: 0 },
      { name: 'Sun', transactions: 0, incidents: 0 }
    ],
    recentAlerts = []
  } = metrics || {};

  const getRiskLevel = (score: number) => {
    if (score >= 80) return { level: 'High', color: 'text-red-600', icon: AlertTriangle };
    if (score >= 40) return { level: 'Medium', color: 'text-amber-600', icon: ShieldAlert };
    return { level: 'Low', color: 'text-green-600', icon: ShieldAlert };
  };

  const riskLevel = getRiskLevel(riskScore);
  const RiskIcon = riskLevel.icon;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to FraudShield Central</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Compliance Score Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Compliance Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{complianceScore}/100</div>
              <div className="flex items-center text-sm font-medium">
                {complianceScore === 100 ? (
                  <span className="text-green-600">Perfect</span>
                ) : complianceScore >= 80 ? (
                  <span className="text-green-600">Good</span>
                ) : (
                  <span className="text-amber-600">Needs Attention</span>
                )}
              </div>
            </div>
            <Progress value={complianceScore} className="h-2 mt-3" />
          </CardContent>
          <CardFooter className="pt-2">
            <p className="text-xs text-muted-foreground">
              {complianceScore === 100 ? 'No compliance issues detected' : `${100 - complianceScore}% improvement needed`}
            </p>
          </CardFooter>
        </Card>
        
        {/* Active Alerts Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{recentAlerts.length}</div>
              <div className="flex items-center font-medium text-sm">
                {recentAlerts.length === 0 ? (
                  <span className="text-green-600">All clear</span>
                ) : (
                  <span className="text-red-600">Attention needed</span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-3">
              <div className="flex flex-col items-center p-2 bg-gray-50 rounded-md">
                <span className="text-xs text-muted-foreground">High</span>
                <span className="font-bold text-red-600">
                  {recentAlerts.filter(a => a.severity === 'high' || a.severity === 'critical').length}
                </span>
              </div>
              <div className="flex flex-col items-center p-2 bg-gray-50 rounded-md">
                <span className="text-xs text-muted-foreground">Med</span>
                <span className="font-bold text-amber-600">
                  {recentAlerts.filter(a => a.severity === 'medium').length}
                </span>
              </div>
              <div className="flex flex-col items-center p-2 bg-gray-50 rounded-md">
                <span className="text-xs text-muted-foreground">Low</span>
                <span className="font-bold text-gray-600">
                  {recentAlerts.filter(a => a.severity === 'low').length}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-2">
            <Button variant="ghost" size="sm" className="w-full text-xs" disabled={recentAlerts.length === 0}>
              {recentAlerts.length === 0 ? 'No alerts to view' : 'View all alerts'}
            </Button>
          </CardFooter>
        </Card>
        
        {/* KYC Status Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">KYC Verifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{kycVerifications}</div>
              <div className="flex items-center font-medium text-sm">
                {kycVerifications === 0 ? (
                  <span className="text-muted-foreground">No data</span>
                ) : (
                  <span className="text-blue-600">Processing</span>
                )}
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span>This Week</span>
                <span className="font-medium">{kycVerifications}</span>
              </div>
              <Progress value={kycVerifications > 0 ? 70 : 0} className="h-2" />
              <div className="flex items-center justify-between text-sm">
                <span>Status</span>
                <span className="font-medium">{kycVerifications > 0 ? 'Active' : 'Waiting'}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-2">
            <Button variant="ghost" size="sm" className="w-full text-xs">
              {kycVerifications === 0 ? 'Upload documents' : 'View verifications'}
            </Button>
          </CardFooter>
        </Card>
        
        {/* Risk Level Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Risk Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{riskLevel.level}</div>
              <div className={`flex items-center font-medium text-sm ${riskLevel.color}`}>
                <span>{riskScore}%</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-3">
              <RiskIcon className={`h-5 w-5 ${riskLevel.color}`} />
              <div className="text-sm">
                {riskScore === 0 ? 'System ready for monitoring' : `${flaggedTransactions + securityIncidents} issues detected`}
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-2">
            <p className="text-xs text-muted-foreground">
              {totalTransactions === 0 ? 'Start adding transactions to see risk analysis' : `Based on ${totalTransactions} transactions`}
            </p>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        {/* Activity Overview */}
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
            <CardDescription>Transactions and security incidents for the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyActivity}>
                  <defs>
                    <linearGradient id="colorTransactions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                    </linearGradient>
                    <linearGradient id="colorIncidents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0.2} />
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
                  <Bar 
                    dataKey="transactions" 
                    fill="url(#colorTransactions)" 
                    radius={[2, 2, 0, 0]}
                    name="Transactions"
                  />
                  <Bar 
                    dataKey="incidents" 
                    fill="url(#colorIncidents)" 
                    radius={[2, 2, 0, 0]}
                    name="Security Incidents"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {totalTransactions === 0 && securityIncidents === 0 && (
              <div className="text-center mt-4">
                <p className="text-sm text-muted-foreground">No activity recorded yet. Start using the system to see data here.</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Recent Alerts */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>Latest compliance and security alerts</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mb-4 animate-pulse" />
                <h3 className="text-lg font-semibold mb-2">Loading Alerts...</h3>
                <p className="text-muted-foreground text-sm">Checking for recent activity</p>
              </div>
            ) : recentAlerts.length === 0 ? (
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
                  <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-md border bg-card hover:bg-accent/50 transition-colors">
                    <div className="mt-0.5">
                      {alert.severity === 'high' || alert.severity === 'critical' ? (
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
