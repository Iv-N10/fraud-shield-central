
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Shield, 
  Users, 
  AlertTriangle,
  Award,
  Target,
  BarChart3,
  Download
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
  BarChart,
  Bar
} from 'recharts';

const monthlyData = [
  { month: 'Jan', prevented: 125000, losses: 8500, transactions: 2456789, roi: 1400 },
  { month: 'Feb', prevented: 145000, losses: 7200, transactions: 2678901, roi: 2000 },
  { month: 'Mar', prevented: 189000, losses: 6800, transactions: 2891234, roi: 2700 },
  { month: 'Apr', prevented: 167000, losses: 9100, transactions: 2567890, roi: 1800 },
  { month: 'May', prevented: 234000, losses: 5900, transactions: 3123456, roi: 3900 },
  { month: 'Jun', prevented: 278000, losses: 4200, transactions: 3345678, roi: 6600 },
];

const kpiData = [
  {
    title: 'Fraud Prevented',
    value: '$2.3M',
    change: '+23%',
    trend: 'up',
    period: 'vs last quarter',
    icon: Shield,
    color: 'text-green-600'
  },
  {
    title: 'ROI from Prevention',
    value: '1,840%',
    change: '+156%',
    trend: 'up',
    period: 'annualized',
    icon: TrendingUp,
    color: 'text-blue-600'
  },
  {
    title: 'False Positive Rate',
    value: '2.1%',
    change: '-0.8%',
    trend: 'down',
    period: 'vs last month',
    icon: Target,
    color: 'text-purple-600'
  },
  {
    title: 'Customer Impact',
    value: '0.03%',
    change: '-0.02%',
    trend: 'down',
    period: 'friction rate',
    icon: Users,
    color: 'text-orange-600'
  }
];

const complianceMetrics = [
  { standard: 'PCI DSS', score: 98, status: 'compliant' },
  { standard: 'AML/KYC', score: 96, status: 'compliant' },
  { standard: 'GDPR', score: 94, status: 'compliant' },
  { standard: 'SOX', score: 92, status: 'compliant' },
];

export default function ExecutiveDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('quarterly');

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? (
      <TrendingUp className="h-4 w-4 text-green-500" />
    ) : (
      <TrendingDown className="h-4 w-4 text-green-500" />
    );
  };

  const getComplianceStatus = (score: number) => {
    if (score >= 95) return { color: 'bg-green-500', text: 'Excellent' };
    if (score >= 90) return { color: 'bg-blue-500', text: 'Good' };
    if (score >= 80) return { color: 'bg-amber-500', text: 'Fair' };
    return { color: 'bg-red-500', text: 'Needs Attention' };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Award className="h-8 w-8" />
            Executive Dashboard
          </h1>
          <p className="text-muted-foreground">Strategic overview of fraud prevention performance and ROI</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button size="sm">Schedule Reports</Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => {
          const IconComponent = kpi.icon;
          return (
            <Card key={index}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
                  <IconComponent className={`h-5 w-5 ${kpi.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold">{kpi.value}</div>
                  <div className="flex items-center gap-1 text-sm">
                    {getTrendIcon(kpi.trend)}
                    <span className="text-green-600 font-medium">{kpi.change}</span>
                    <span className="text-muted-foreground">{kpi.period}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Financial Impact Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <Card className="lg:col-span-5">
          <CardHeader>
            <CardTitle>Financial Impact Trends</CardTitle>
            <CardDescription>Fraud prevention savings vs actual losses over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorPrevented" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0.2} />
                    </linearGradient>
                    <linearGradient id="colorLosses" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0.2} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: any, name: string) => [
                      `$${(value / 1000).toFixed(0)}K`, 
                      name === 'prevented' ? 'Fraud Prevented' : 'Actual Losses'
                    ]}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="prevented" 
                    stroke="#22c55e" 
                    fill="url(#colorPrevented)"
                    name="prevented"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="losses" 
                    stroke="#ef4444" 
                    fill="url(#colorLosses)"
                    name="losses"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
            <CardDescription>Critical performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Detection Rate</span>
                  <span className="text-sm font-bold">98.7%</span>
                </div>
                <Progress value={98.7} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">System Uptime</span>
                  <span className="text-sm font-bold">99.99%</span>
                </div>
                <Progress value={99.99} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Customer Satisfaction</span>
                  <span className="text-sm font-bold">96.2%</span>
                </div>
                <Progress value={96.2} className="h-2" />
              </div>
              
              <div className="pt-4 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">$45.2M</div>
                  <p className="text-xs text-muted-foreground">Total Savings YTD</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ROI Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Return on Investment Analysis</CardTitle>
          <CardDescription>FraudShield system ROI compared to investment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value: any) => [`${value}%`, 'ROI']}
                />
                <Bar 
                  dataKey="roi" 
                  fill="#3b82f6" 
                  radius={[2, 2, 0, 0]}
                  name="ROI Percentage"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Compliance & Risk */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Compliance Status</CardTitle>
            <CardDescription>Regulatory compliance scores across standards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {complianceMetrics.map((metric, index) => {
                const status = getComplianceStatus(metric.score);
                return (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${status.color}`}></div>
                      <span className="font-medium">{metric.standard}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{metric.score}%</div>
                      <div className="text-xs text-muted-foreground">{status.text}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Assessment Summary</CardTitle>
            <CardDescription>Current organizational risk profile</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">Overall Risk Level</p>
                    <p className="text-sm text-muted-foreground">Comprehensive assessment</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-100 text-green-600">Low Risk</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Operational Risk</p>
                    <p className="text-sm text-muted-foreground">Process & system risks</p>
                  </div>
                </div>
                <Badge variant="outline">Minimal</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  <div>
                    <p className="font-medium">Emerging Threats</p>
                    <p className="text-sm text-muted-foreground">New threat patterns</p>
                  </div>
                </div>
                <Badge variant="default" className="bg-amber-500">Monitoring</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium">Market Risk</p>
                    <p className="text-sm text-muted-foreground">Industry trends impact</p>
                  </div>
                </div>
                <Badge variant="outline">Stable</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
