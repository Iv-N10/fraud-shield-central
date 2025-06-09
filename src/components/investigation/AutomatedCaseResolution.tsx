
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Bot, CheckCircle, Clock, AlertTriangle, Settings } from 'lucide-react';

export default function AutomatedCaseResolution() {
  const [autoResolveEnabled, setAutoResolveEnabled] = useState(true);

  const automationRules = [
    {
      name: 'Low Risk Auto-Close',
      description: 'Auto-resolve cases with risk score < 30 and verified customer',
      enabled: true,
      processed: 156,
      accuracy: 98.2
    },
    {
      name: 'Duplicate Transaction Filter',
      description: 'Auto-resolve duplicate transaction reports',
      enabled: true,
      processed: 89,
      accuracy: 99.1
    },
    {
      name: 'Known Good Pattern',
      description: 'Auto-approve transactions matching customer patterns',
      enabled: false,
      processed: 234,
      accuracy: 96.8
    }
  ];

  const queueMetrics = [
    { label: 'Pending Cases', value: '47', color: 'text-amber-600' },
    { label: 'Auto-Resolved Today', value: '156', color: 'text-green-600' },
    { label: 'Manual Review Required', value: '12', color: 'text-red-600' },
    { label: 'Processing Time Saved', value: '8.5h', color: 'text-blue-600' }
  ];

  const recentResolutions = [
    {
      caseId: 'CASE-789',
      type: 'Low Risk Transaction',
      resolution: 'Auto-Approved',
      confidence: 95,
      timeToResolve: '2.3s',
      timestamp: '2 minutes ago'
    },
    {
      caseId: 'CASE-790',
      type: 'Duplicate Report',
      resolution: 'Auto-Closed',
      confidence: 99,
      timeToResolve: '1.1s',
      timestamp: '5 minutes ago'
    },
    {
      caseId: 'CASE-791',
      type: 'Velocity Check',
      resolution: 'Escalated to Human',
      confidence: 45,
      timeToResolve: '0.8s',
      timestamp: '8 minutes ago'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {queueMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                </div>
                <Bot className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Automation Rules Engine
          </CardTitle>
          <CardDescription>
            Configure and monitor automated case resolution rules
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Auto-Resolution System</h3>
              <p className="text-sm text-muted-foreground">
                Automatically resolve low-risk cases based on ML predictions
              </p>
            </div>
            <Button 
              variant={autoResolveEnabled ? "default" : "outline"}
              onClick={() => setAutoResolveEnabled(!autoResolveEnabled)}
            >
              {autoResolveEnabled ? 'Enabled' : 'Disabled'}
            </Button>
          </div>
          
          <div className="space-y-3">
            {automationRules.map((rule, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{rule.name}</h4>
                    <Badge variant={rule.enabled ? 'default' : 'outline'}>
                      {rule.enabled ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{rule.description}</p>
                  <p className="text-xs text-muted-foreground">
                    Processed: {rule.processed} cases • Accuracy: {rule.accuracy}%
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Automated Resolutions</CardTitle>
          <CardDescription>
            Latest cases processed by the automation engine
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentResolutions.map((resolution, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{resolution.caseId}</h3>
                    <Badge variant={
                      resolution.resolution.includes('Auto') ? 'default' : 'secondary'
                    }>
                      {resolution.resolution}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Type: {resolution.type} • Confidence: {resolution.confidence}%
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Resolved in {resolution.timeToResolve} • {resolution.timestamp}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {resolution.resolution.includes('Auto') ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
