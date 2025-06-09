
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Brain, Zap, TrendingUp, RefreshCw, Play, Pause } from 'lucide-react';

export default function RealTimeDeepLearning() {
  const [isLearning, setIsLearning] = useState(false);
  const [modelAccuracy, setModelAccuracy] = useState(94.2);
  const [learningRate, setLearningRate] = useState(0.001);

  const [performanceData, setPerformanceData] = useState([
    { time: '00:00', accuracy: 92.1, precision: 89.5, recall: 91.8 },
    { time: '01:00', accuracy: 92.8, precision: 90.2, recall: 92.1 },
    { time: '02:00', accuracy: 93.4, precision: 91.1, recall: 92.9 },
    { time: '03:00', accuracy: 94.2, precision: 91.8, recall: 93.5 },
  ]);

  const modelMetrics = [
    { label: 'Model Accuracy', value: `${modelAccuracy}%`, icon: TrendingUp },
    { label: 'Learning Rate', value: learningRate.toFixed(4), icon: Brain },
    { label: 'Samples Processed', value: '2.4M', icon: Zap },
    { label: 'Adaptation Speed', value: '15ms', icon: RefreshCw }
  ];

  const recentAdaptations = [
    {
      timestamp: '2 minutes ago',
      pattern: 'New card testing pattern detected',
      confidence: 0.89,
      action: 'Model weights updated'
    },
    {
      timestamp: '7 minutes ago', 
      pattern: 'Velocity rule refinement',
      confidence: 0.92,
      action: 'Threshold auto-adjusted'
    },
    {
      timestamp: '15 minutes ago',
      pattern: 'Geographic anomaly pattern',
      confidence: 0.95,
      action: 'New feature extracted'
    }
  ];

  useEffect(() => {
    if (isLearning) {
      const interval = setInterval(() => {
        setModelAccuracy(prev => {
          const newAccuracy = Math.min(99, prev + (Math.random() - 0.3) * 0.5);
          return Math.round(newAccuracy * 10) / 10;
        });
        
        setPerformanceData(prev => {
          const newTime = new Date().toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit' 
          });
          
          const newDataPoint = {
            time: newTime,
            accuracy: modelAccuracy,
            precision: modelAccuracy - Math.random() * 3,
            recall: modelAccuracy - Math.random() * 2
          };
          
          return [...prev.slice(-6), newDataPoint];
        });
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [isLearning, modelAccuracy]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {modelMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="flex items-center p-6">
              <metric.icon className="h-8 w-8 text-muted-foreground" />
              <div className="ml-4">
                <p className="text-2xl font-bold">{metric.value}</p>
                <p className="text-xs text-muted-foreground">{metric.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Real-time Learning Engine
          </CardTitle>
          <CardDescription>
            Continuously adapting deep learning models for fraud detection
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Learning Status</p>
              <p className="text-lg font-semibold">
                {isLearning ? 'Active Learning' : 'Standby Mode'}
              </p>
            </div>
            <Button 
              onClick={() => setIsLearning(!isLearning)}
              variant={isLearning ? "destructive" : "default"}
              className="flex items-center gap-2"
            >
              {isLearning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isLearning ? 'Pause Learning' : 'Start Learning'}
            </Button>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Model Performance</span>
              <span className="text-sm font-medium">{modelAccuracy}%</span>
            </div>
            <Progress value={modelAccuracy} className="w-full" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>
            Real-time model performance over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[85, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="accuracy" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="precision" stroke="#82ca9d" strokeWidth={2} />
                <Line type="monotone" dataKey="recall" stroke="#ffc658" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Model Adaptations</CardTitle>
          <CardDescription>
            Automatic model updates and learning events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAdaptations.map((adaptation, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{adaptation.pattern}</p>
                  <p className="text-sm text-muted-foreground">
                    {adaptation.timestamp} • Confidence: {(adaptation.confidence * 100).toFixed(1)}%
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {adaptation.action}
                  </Badge>
                </div>
                <Button variant="outline" size="sm">
                  Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
