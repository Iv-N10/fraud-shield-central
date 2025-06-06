import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown,
  Shield, 
  DollarSign, 
  Users, 
  Activity,
  BarChart3,
  PieChart,
  Calendar,
  Download,
  Eye,
  AlertTriangle
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ExecutiveDashboard = () => {
  // Mock data for executive dashboard
  const kpiData = {
    fraudPrevented: { value: 2847, change: 12.3, trend: 'up' },
    costSavings: { value: 1250000, change: 8.7, trend: 'up' },
    falsePositives: { value: 2.1, change: -15.2, trend: 'down' },
    systemUptime: { value: 99.97, change: 0.02, trend: 'up' }
  };

  const monthlyData = [
    { month: 'Jan', fraudDetected: 245, prevented: 238, savings: 95000 },
    { month: 'Feb', fraudDetected: 267, prevented: 259, savings: 103000 },
    { month: 'Mar', fraudDetected: 298, prevented: 287, savings: 115000 },
    { month: 'Apr', fraudDetected: 321, prevented: 312, savings: 125000 },
    { month: 'May', fraudDetected: 289, prevented: 281, savings: 112000 },
    { month: 'Jun', fraudDetected: 356, prevented: 344, savings: 138000 }
  ];

  const threatDistribution = [
    { name: 'Card Fraud', value: 35, color: '#ef4444' },
    { name: 'Account Takeover', value: 28, color: '#f97316' },
    { name: 'Money Laundering', value: 20, color: '#eab308' },
    { name: 'Identity Theft', value: 12, color: '#22c55e' },
    { name: 'Other', value: 5, color: '#6366f1' }
  ];

  const riskTrends = [
    { date: '2024-01-01', highRisk: 12, mediumRisk: 34, lowRisk: 156 },
    { date: '2024-01-08', highRisk: 8, mediumRisk: 41, lowRisk: 178 },
    { date: '2024-01-15', highRisk: 15, mediumRisk: 29, lowRisk: 189 },
    { date: '2024-01-22', highRisk: 6, mediumRisk: 37, lowRisk: 203 },
    { date: '2024-01-29', highRisk: 11, mediumRisk: 31, lowRisk: 198 }
  ];

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? (
      <TrendingUp className="w-4 h-4 text-green-600" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-600" />
    );
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Executive Dashboard</h1>
          <p className="text-muted-foreground">
            High-level overview of fraud prevention performance and ROI
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Last 30 Days
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fraud Cases Prevented</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(kpiData.fraudPrevented.value)}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {getTrendIcon(kpiData.fraudPrevented.trend)}
              <span className={`ml-1 ${kpiData.fraudPrevented.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {kpiData.fraudPrevented.change}% from last month
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost Savings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(kpiData.costSavings.value)}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {getTrendIcon(kpiData.costSavings.trend)}
              <span className={`ml-1 ${kpiData.costSavings.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {kpiData.costSavings.change}% from last month
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">False Positive Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.falsePositives.value}%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {getTrendIcon(kpiData.falsePositives.trend)}
              <span className={`ml-1 ${kpiData.falsePositives.trend === 'down' ? 'text-green-600' : 'text-red-600'}`}>
                {Math.abs(kpiData.falsePositives.change)}% from last month
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.systemUptime.value}%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {getTrendIcon(kpiData.systemUptime.trend)}
              <span className={`ml-1 ${kpiData.systemUptime.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {kpiData.systemUptime.change}% from last month
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList>
          <TabsTrigger value="performance">Performance Overview</TabsTrigger>
          <TabsTrigger value="threats">Threat Analysis</TabsTrigger>
          <TabsTrigger value="roi">ROI Analysis</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Status</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Fraud Prevention</CardTitle>
                <CardDescription>
                  Fraud cases detected vs prevented over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="fraudDetected" stroke="#ef4444" strokeWidth={2} />
                    <Line type="monotone" dataKey="prevented" stroke="#22c55e" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Level Trends</CardTitle>
                <CardDescription>
                  Distribution of risk levels over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={riskTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="highRisk" stackId="1" stroke="#ef4444" fill="#ef4444" />
                    <Area type="monotone" dataKey="mediumRisk" stackId="1" stroke="#f97316" fill="#f97316" />
                    <Area type="monotone" dataKey="lowRisk" stackId="1" stroke="#22c55e" fill="#22c55e" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="threats" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Threat Distribution</CardTitle>
                <CardDescription>
                  Breakdown of different types of fraud detected
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={threatDistribution}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {threatDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Threat Indicators</CardTitle>
                <CardDescription>
                  Most common fraud patterns detected
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: 'Unusual Transaction Velocity', severity: 'high', count: 156 },
                  { name: 'Suspicious IP Geolocation', severity: 'medium', count: 142 },
                  { name: 'Device Fingerprint Mismatch', severity: 'medium', count: 98 },
                  { name: 'Behavioral Pattern Anomaly', severity: 'low', count: 87 },
                  { name: 'Card Testing Attempts', severity: 'high', count: 76 }
                ].map((threat, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{threat.name}</p>
                      <p className="text-sm text-muted-foreground">{threat.count} instances</p>
                    </div>
                    <Badge 
                      variant={threat.severity === 'high' ? 'destructive' : 
                              threat.severity === 'medium' ? 'default' : 'secondary'}
                    >
                      {threat.severity}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="roi" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cost Savings by Month</CardTitle>
                <CardDescription>
                  Financial impact of fraud prevention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    <Bar dataKey="savings" fill="#22c55e" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ROI Metrics</CardTitle>
                <CardDescription>
                  Return on investment analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Investment</span>
                    <span className="font-medium">{formatCurrency(480000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Savings</span>
                    <span className="font-medium">{formatCurrency(1250000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Net Benefit</span>
                    <span className="font-medium text-green-600">{formatCurrency(770000)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="font-medium">ROI</span>
                      <span className="font-bold text-green-600">260%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Status</CardTitle>
                <CardDescription>
                  Current regulatory compliance status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: 'PCI DSS', status: 'compliant', lastAudit: '2024-01-15' },
                  { name: 'SOX', status: 'compliant', lastAudit: '2024-01-10' },
                  { name: 'GDPR', status: 'compliant', lastAudit: '2024-01-20' },
                  { name: 'PSD2', status: 'compliant', lastAudit: '2024-01-18' },
                  { name: 'AML/KYC', status: 'compliant', lastAudit: '2024-01-12' }
                ].map((compliance, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{compliance.name}</p>
                      <p className="text-sm text-muted-foreground">Last audit: {compliance.lastAudit}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-600">
                      {compliance.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Audit Trail</CardTitle>
                <CardDescription>
                  Recent compliance activities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { date: '2024-01-20', activity: 'GDPR Data Processing Audit Completed', status: 'passed' },
                  { date: '2024-01-18', activity: 'PSD2 Strong Authentication Review', status: 'passed' },
                  { date: '2024-01-15', activity: 'PCI DSS Security Scan', status: 'passed' },
                  { date: '2024-01-12', activity: 'AML Transaction Monitoring Review', status: 'passed' },
                  { date: '2024-01-10', activity: 'SOX Financial Controls Assessment', status: 'passed' }
                ].map((audit, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                    <Eye className="w-4 h-4 text-blue-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{audit.activity}</p>
                      <p className="text-xs text-muted-foreground">{audit.date}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-600">
                      {audit.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExecutiveDashboard;
