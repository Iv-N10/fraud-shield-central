
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  Brain, 
  Zap,
  Shield,
  Activity,
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

const riskFactors = [
  { factor: 'Transaction Amount', score: 85, weight: 0.25 },
  { factor: 'Location Risk', score: 92, weight: 0.20 },
  { factor: 'Device Trust', score: 78, weight: 0.15 },
  { factor: 'Behavioral Pattern', score: 95, weight: 0.20 },
  { factor: 'Time Pattern', score: 88, weight: 0.10 },
  { factor: 'Merchant Category', score: 82, weight: 0.10 },
];

const riskTrends = [
  { time: '00:00', score: 15, transactions: 45 },
  { time: '04:00', score: 22, transactions: 23 },
  { time: '08:00', score: 45, transactions: 156 },
  { time: '12:00', score: 38, transactions: 234 },
  { time: '16:00', score: 28, transactions: 189 },
  { time: '20:00', score: 19, transactions: 67 },
];

const radarData = [
  { subject: 'Velocity', A: 85, fullMark: 100 },
  { subject: 'Location', A: 92, fullMark: 100 },
  { subject: 'Device', A: 78, fullMark: 100 },
  { subject: 'Amount', A: 85, fullMark: 100 },
  { subject: 'Pattern', A: 95, fullMark: 100 },
  { subject: 'Time', A: 88, fullMark: 100 },
];

const upcomingRisks = [
  {
    id: '1',
    type: 'High Velocity',
    probability: 78,
    impact: 'high',
    description: 'User approaching velocity limits',
    timeframe: '2 hours',
    preventable: true
  },
  {
    id: '2',
    type: 'Location Anomaly',
    probability: 65,
    impact: 'medium',
    description: 'Potential geographic inconsistency',
    timeframe: '4 hours',
    preventable: true
  },
  {
    id: '3',
    type: 'Device Risk',
    probability: 45,
    impact: 'low',
    description: 'New device fingerprint detected',
    timeframe: '1 day',
    preventable: false
  },
];

export default function PredictiveRiskScoring() {
  const [selectedModel, setSelectedModel] = useState('comprehensive');

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case 'high':
        return <Badge variant="destructive">High Impact</Badge>;
      case 'medium':
        return <Badge variant="default" className="bg-amber-500">Medium Impact</Badge>;
      default:
        return <Badge variant="outline">Low Impact</Badge>;
    }
  };

  const calculateOverallRisk = () => {
    return riskFactors.reduce((total, factor) => total + (factor.score * factor.weight), 0);
  };

  const overallRisk = calculateOverallRisk();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Target className="h-8 w-8" />
            Predictive Risk Scoring
          </h1>
          <p className="text-muted-foreground">AI-powered risk prediction and prevention system</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">Tune Models</Button>
          <Button size="sm">Configure Thresholds</Button>
        </div>
      </div>

      {/* Overall Risk Alert */}
      <Alert>
        <Brain className="h-4 w-4" />
        <AlertTitle>AI Risk Assessment</AlertTitle>
        <AlertDescription>
          Current overall risk score: <strong>{overallRisk.toFixed(1)}/100</strong>. 
          System is actively monitoring {upcomingRisks.length} potential risk scenarios.
        </AlertDescription>
      </Alert>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Overall Risk Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{overallRisk.toFixed(1)}</div>
              <Target className="h-5 w-5 text-green-500" />
            </div>
            <Progress value={overallRisk} className="h-2 mt-2" />
            <p className="text-xs text-green-600 mt-1">Low risk range</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Predictions Made</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">1,247</div>
              <Brain className="h-5 w-5 text-blue-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Accuracy Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-green-600">94.8%</div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-xs text-green-600 mt-2">+2.1% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Prevented Fraud</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">$45.2K</div>
              <Shield className="h-5 w-5 text-purple-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        {/* Risk Factor Analysis */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Risk Factor Breakdown</CardTitle>
            <CardDescription>Individual components contributing to overall risk score</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskFactors.map((factor, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{factor.factor}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        Weight: {(factor.weight * 100).toFixed(0)}%
                      </span>
                      <span className="text-sm font-bold">{factor.score}/100</span>
                    </div>
                  </div>
                  <Progress value={factor.score} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Risk Radar */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Risk Profile Radar</CardTitle>
            <CardDescription>Multi-dimensional risk assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar
                    name="Risk Score"
                    dataKey="A"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Score Trends</CardTitle>
          <CardDescription>24-hour risk score evolution and transaction volume</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={riskTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="score" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name="Risk Score"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="transactions" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Transaction Volume"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Risk Predictions */}
      <Card>
        <CardHeader>
          <CardTitle>Predictive Risk Alerts</CardTitle>
          <CardDescription>AI-predicted risks and recommended preventive actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingRisks.map((risk) => (
              <div key={risk.id} className="flex items-start space-x-3 p-4 rounded-lg border bg-card">
                <div className="mt-0.5">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{risk.type}</h4>
                    <div className="flex items-center gap-2">
                      {getImpactBadge(risk.impact)}
                      <Badge variant="outline">{risk.probability}% probability</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{risk.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">Expected in: {risk.timeframe}</p>
                    {risk.preventable && (
                      <Button size="sm" variant="outline">
                        <Zap className="w-3 h-3 mr-1" />
                        Prevent
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
