
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Zap,
  BarChart3,
  Users,
  DollarSign
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Area, AreaChart } from 'recharts';

interface AnomalyPattern {
  id: string;
  type: string;
  description: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  detectedAt: string;
  affectedTransactions: number;
  status: 'active' | 'investigating' | 'resolved';
}

interface LearningMetric {
  timestamp: string;
  accuracy: number;
  detectionRate: number;
  falsePositives: number;
}

export default function AnomalyDetectionEngine() {
  const [isLearning, setIsLearning] = useState(false);
  const [modelAccuracy, setModelAccuracy] = useState(94.7);
  const [anomalies, setAnomalies] = useState<AnomalyPattern[]>([
    {
      id: '1',
      type: 'Velocity Anomaly',
      description: 'Unusual transaction frequency from IP range 192.168.1.x',
      confidence: 87,
      severity: 'high',
      detectedAt: new Date(Date.now() - 1800000).toISOString(), // 30 min ago
      affectedTransactions: 23,
      status: 'active'
    },
    {
      id: '2',
      type: 'Amount Pattern',
      description: 'Suspicious round-number transactions pattern detected',
      confidence: 92,
      severity: 'medium',
      detectedAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      affectedTransactions: 15,
      status: 'investigating'
    },
    {
      id: '3',
      type: 'Geolocation Anomaly',
      description: 'Impossible travel time between transaction locations',
      confidence: 96,
      severity: 'critical',
      detectedAt: new Date(Date.now() - 900000).toISOString(), // 15 min ago
      affectedTransactions: 8,
      status: 'active'
    }
  ]);

  const [learningMetrics] = useState<LearningMetric[]>([
    { timestamp: '00:00', accuracy: 89.2, detectionRate: 78.5, falsePositives: 12.3 },
    { timestamp: '04:00', accuracy: 91.1, detectionRate: 82.1, falsePositives: 10.8 },
    { timestamp: '08:00', accuracy: 93.4, detectionRate: 85.7, falsePositives: 8.9 },
    { timestamp: '12:00', accuracy: 94.7, detectionRate: 88.2, falsePositives: 7.1 },
    { timestamp: '16:00', accuracy: 95.1, detectionRate: 89.8, falsePositives: 6.5 },
    { timestamp: '20:00', accuracy: 94.9, detectionRate: 90.1, falsePositives: 6.8 },
  ]);

  // Simulate AI learning process
  const triggerLearning = () => {
    setIsLearning(true);
    setTimeout(() => {
      setModelAccuracy(prev => Math.min(prev + Math.random() * 2, 99.9));
      setIsLearning(false);
    }, 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'high':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      default:
        return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'investigating':
        return <Clock className="h-4 w-4 text-amber-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const activeAnomalies = anomalies.filter(a => a.status === 'active').length;
  const totalAffected = anomalies.reduce((sum, a) => sum + a.affectedTransactions, 0);

  return (
    <div className="space-y-6">
      {/* AI Engine Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Model Accuracy</p>
                <p className="text-2xl font-bold text-green-600">{modelAccuracy.toFixed(1)}%</p>
              </div>
              <Brain className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Anomalies</p>
                <p className="text-2xl font-bold text-red-600">{activeAnomalies}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Affected Transactions</p>
                <p className="text-2xl font-bold text-amber-600">{totalAffected}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Learning Status</p>
                <p className="text-sm font-medium">
                  {isLearning ? 'Training...' : 'Ready'}
                </p>
              </div>
              <div className="flex flex-col items-center">
                {isLearning ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                ) : (
                  <Zap className="h-8 w-8 text-blue-500" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Learning Performance Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>AI Model Performance</CardTitle>
                <CardDescription>Real-time learning metrics over the last 24 hours</CardDescription>
              </div>
              <Button 
                onClick={triggerLearning} 
                disabled={isLearning}
                className="flex items-center gap-2"
              >
                <Brain className="h-4 w-4" />
                {isLearning ? 'Learning...' : 'Trigger Learning'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={learningMetrics}>
                  <defs>
                    <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorDetection" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="timestamp" />
                  <YAxis domain={[0, 100]} />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="accuracy" 
                    stroke="#10b981" 
                    fillOpacity={1} 
                    fill="url(#colorAccuracy)"
                    name="Accuracy %"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="detectionRate" 
                    stroke="#3b82f6" 
                    fillOpacity={1} 
                    fill="url(#colorDetection)"
                    name="Detection Rate %"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Detected Anomalies */}
        <Card>
          <CardHeader>
            <CardTitle>Detected Anomalies</CardTitle>
            <CardDescription>AI-identified suspicious patterns and behaviors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[340px] overflow-y-auto">
              {anomalies.map((anomaly) => (
                <div key={anomaly.id} className={`p-4 border rounded-lg ${getSeverityColor(anomaly.severity)}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(anomaly.status)}
                      <h4 className="font-medium text-sm">{anomaly.type}</h4>
                      <Badge variant="outline" className="text-xs">
                        {anomaly.confidence}% confidence
                      </Badge>
                    </div>
                    <Badge variant="outline" className="text-xs capitalize">
                      {anomaly.severity}
                    </Badge>
                  </div>
                  
                  <p className="text-sm mb-3">{anomaly.description}</p>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      {anomaly.affectedTransactions} transactions
                    </span>
                    <span className="text-muted-foreground">
                      {new Date(anomaly.detectedAt).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="mt-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs">Confidence Level</span>
                      <span className="text-xs font-medium">{anomaly.confidence}%</span>
                    </div>
                    <Progress value={anomaly.confidence} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Learning Insights */}
      <Card>
        <CardHeader>
          <CardTitle>AI Learning Insights</CardTitle>
          <CardDescription>What the AI has learned from recent patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <h4 className="font-medium">Pattern Recognition</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Improved detection of card testing attacks by 23% through velocity pattern analysis
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-5 w-5 text-blue-500" />
                <h4 className="font-medium">Behavioral Analysis</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Enhanced user behavior modeling reducing false positives by 15% this week
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                <h4 className="font-medium">Risk Adaptation</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Dynamically adjusted risk thresholds based on merchant category and time patterns
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
