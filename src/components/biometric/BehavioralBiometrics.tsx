
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Mouse, Keyboard, Smartphone, Eye, Activity } from 'lucide-react';

export default function BehavioralBiometrics() {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [behaviorScore, setBehaviorScore] = useState(85);

  const biometricMetrics = [
    { 
      type: 'Typing Pattern', 
      icon: Keyboard, 
      score: 92, 
      status: 'normal',
      details: 'Consistent keystroke dynamics'
    },
    { 
      type: 'Mouse Movement', 
      icon: Mouse, 
      score: 78, 
      status: 'suspicious',
      details: 'Unusual click patterns detected'
    },
    { 
      type: 'Touch Behavior', 
      icon: Smartphone, 
      score: 95, 
      status: 'normal',
      details: 'Natural touch pressure and timing'
    },
    { 
      type: 'Gaze Pattern', 
      icon: Eye, 
      score: 67, 
      status: 'anomaly',
      details: 'Abnormal focus areas detected'
    }
  ];

  const recentSessions = [
    {
      sessionId: 'S001',
      userId: 'user_12345',
      timestamp: '2 minutes ago',
      riskScore: 23,
      anomalies: ['Mouse jitter', 'Fast typing'],
      status: 'low'
    },
    {
      sessionId: 'S002', 
      userId: 'user_67890',
      timestamp: '5 minutes ago',
      riskScore: 89,
      anomalies: ['Bot-like patterns', 'No mouse movement'],
      status: 'high'
    },
    {
      sessionId: 'S003',
      userId: 'user_11111',
      timestamp: '8 minutes ago', 
      riskScore: 45,
      anomalies: ['Irregular timing'],
      status: 'medium'
    }
  ];

  useEffect(() => {
    if (isMonitoring) {
      const interval = setInterval(() => {
        setBehaviorScore(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 10)));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isMonitoring]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Real-time Behavioral Monitoring
          </CardTitle>
          <CardDescription>
            Analyze user interaction patterns to detect suspicious behavior
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Overall Behavior Score</p>
              <p className="text-2xl font-bold">{behaviorScore}%</p>
            </div>
            <Button 
              onClick={() => setIsMonitoring(!isMonitoring)}
              variant={isMonitoring ? "destructive" : "default"}
            >
              {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
            </Button>
          </div>
          <Progress value={behaviorScore} className="w-full" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {biometricMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <metric.icon className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">{metric.type}</span>
                </div>
                <Badge variant={
                  metric.status === 'normal' ? 'default' : 
                  metric.status === 'suspicious' ? 'secondary' : 'destructive'
                }>
                  {metric.status}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Score</span>
                  <span className="text-sm font-medium">{metric.score}%</span>
                </div>
                <Progress value={metric.score} className="w-full" />
                <p className="text-xs text-muted-foreground">{metric.details}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Behavioral Analysis</CardTitle>
          <CardDescription>
            Latest user sessions analyzed for behavioral anomalies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentSessions.map((session) => (
              <div key={session.sessionId} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{session.sessionId}</span>
                    <Badge variant={
                      session.status === 'low' ? 'default' : 
                      session.status === 'medium' ? 'secondary' : 'destructive'
                    }>
                      {session.status} risk
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    User: {session.userId} • {session.timestamp} • Risk: {session.riskScore}%
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Anomalies: {session.anomalies.join(', ')}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Review
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
