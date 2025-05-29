
import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, AlertTriangle, Activity, Zap, Shield, Target, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Sample ML pattern data
const mlPatternData = [
  { time: '00:00', fraudScore: 15, learningRate: 85, adaptations: 3 },
  { time: '04:00', fraudScore: 22, learningRate: 87, adaptations: 5 },
  { time: '08:00', fraudScore: 45, learningRate: 82, adaptations: 8 },
  { time: '12:00', fraudScore: 38, learningRate: 89, adaptations: 12 },
  { time: '16:00', fraudScore: 28, learningRate: 91, adaptations: 7 },
  { time: '20:00', fraudScore: 19, learningRate: 88, adaptations: 4 },
];

const patternTypes = [
  { name: 'Velocity Fraud', value: 35, color: '#ef4444' },
  { name: 'Synthetic Identity', value: 28, color: '#f97316' },
  { name: 'Account Takeover', value: 22, color: '#eab308' },
  { name: 'Payment Fraud', value: 15, color: '#22c55e' },
];

const recentAdaptations = [
  {
    id: '1',
    pattern: 'High-frequency micro-transactions',
    confidence: 94,
    action: 'Model updated with new velocity thresholds',
    timestamp: '2 minutes ago',
    impact: 'high'
  },
  {
    id: '2',
    pattern: 'Cross-border payment anomalies',
    confidence: 87,
    action: 'Geographic risk factors recalibrated',
    timestamp: '15 minutes ago',
    impact: 'medium'
  },
  {
    id: '3',
    pattern: 'Device fingerprint spoofing',
    confidence: 91,
    action: 'Enhanced device recognition patterns',
    timestamp: '1 hour ago',
    impact: 'high'
  },
  {
    id: '4',
    pattern: 'Time-based behavioral shifts',
    confidence: 76,
    action: 'Temporal pattern weights adjusted',
    timestamp: '3 hours ago',
    impact: 'low'
  },
];

export default function AIMonitor() {
  const [aiMetrics, setAiMetrics] = useState({
    modelsActive: 8,
    patternsDetected: 156,
    adaptationsToday: 23,
    accuracy: 96.7,
    learningRate: 88.5,
    processingSpeed: 2.3
  });
  const [isLearning, setIsLearning] = useState(true);
  const { toast } = useToast();

  const triggerMLAdaptation = async () => {
    try {
      toast({
        title: 'ML Adaptation Triggered',
        description: 'AI models are analyzing new patterns and adapting...',
      });

      // Simulate ML adaptation process
      setIsLearning(true);
      setTimeout(() => {
        setAiMetrics(prev => ({
          ...prev,
          adaptationsToday: prev.adaptationsToday + 1,
          accuracy: Math.min(99.9, prev.accuracy + Math.random() * 0.3),
          patternsDetected: prev.patternsDetected + Math.floor(Math.random() * 5)
        }));
        setIsLearning(false);
        
        toast({
          title: 'Adaptation Complete',
          description: 'AI models have successfully adapted to new fraud patterns',
        });
      }, 3000);
    } catch (error) {
      console.error('Error triggering ML adaptation:', error);
      toast({
        title: 'Error',
        description: 'Failed to trigger ML adaptation',
        variant: 'destructive',
      });
    }
  };

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Brain className="h-8 w-8" />
            AI Monitor
          </h1>
          <p className="text-muted-foreground">Real-time AI learning and pattern adaptation</p>
        </div>
        <Button 
          onClick={triggerMLAdaptation} 
          disabled={isLearning}
          className="flex items-center gap-2"
        >
          {isLearning ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Learning...
            </>
          ) : (
            <>
              <Zap className="h-4 w-4" />
              Trigger ML Adaptation
            </>
          )}
        </Button>
      </div>

      {/* AI Status Alert */}
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertTitle>AI System Status</AlertTitle>
        <AlertDescription>
          All fraud detection models are operational and actively learning from platform activity. 
          {aiMetrics.adaptationsToday} adaptations completed today.
        </AlertDescription>
      </Alert>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Models</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{aiMetrics.modelsActive}</div>
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Deep learning models running</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Detection Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{aiMetrics.accuracy}%</div>
              <Target className="h-5 w-5 text-green-500" />
            </div>
            <Progress value={aiMetrics.accuracy} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-1">Fraud detection accuracy</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Patterns Detected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{aiMetrics.patternsDetected}</div>
              <Activity className="h-5 w-5 text-blue-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Unique fraud patterns identified</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Learning Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{aiMetrics.learningRate}%</div>
              <TrendingUp className="h-5 w-5 text-purple-500" />
            </div>
            <Progress value={aiMetrics.learningRate} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-1">Model adaptation efficiency</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        {/* ML Performance Chart */}
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>ML Performance & Adaptations</CardTitle>
            <CardDescription>Real-time machine learning metrics and pattern adaptations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mlPatternData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="time" 
                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="fraudScore" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    name="Fraud Score"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="learningRate" 
                    stroke="#22c55e" 
                    strokeWidth={2}
                    name="Learning Rate"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="adaptations" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name="Adaptations"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pattern Distribution */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Pattern Distribution</CardTitle>
            <CardDescription>AI-detected fraud pattern types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={patternTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    dataKey="value"
                    nameKey="name"
                  >
                    {patternTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {patternTypes.map((type, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: type.color }}
                    ></div>
                    <span>{type.name}</span>
                  </div>
                  <span className="font-medium">{type.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent AI Adaptations */}
      <Card>
        <CardHeader>
          <CardTitle>Recent AI Adaptations</CardTitle>
          <CardDescription>Latest machine learning model updates and pattern recognitions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAdaptations.map((adaptation) => (
              <div key={adaptation.id} className="flex items-start space-x-3 p-4 rounded-lg border bg-card">
                <div className="mt-0.5">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{adaptation.pattern}</h4>
                    <div className="flex items-center gap-2">
                      {getImpactBadge(adaptation.impact)}
                      <Badge variant="outline">{adaptation.confidence}% confidence</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{adaptation.action}</p>
                  <p className="text-xs text-muted-foreground">{adaptation.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
