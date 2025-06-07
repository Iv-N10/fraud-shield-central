
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Brain, 
  TrendingUp, 
  Zap, 
  RefreshCw,
  Target,
  BarChart3,
  AlertTriangle,
  CheckCircle2,
  PlayCircle,
  PauseCircle
} from 'lucide-react';

const MLModelManagement = () => {
  const [selectedModel, setSelectedModel] = useState('fraud-detection-v3');

  const models = [
    {
      id: 'fraud-detection-v3',
      name: 'Fraud Detection V3',
      type: 'Neural Network',
      status: 'active',
      accuracy: 94.2,
      precision: 92.8,
      recall: 95.1,
      f1Score: 93.9,
      lastTrained: '2024-01-06',
      trainingData: '2.3M transactions'
    },
    {
      id: 'risk-scoring-v2',
      name: 'Risk Scoring V2',
      type: 'Gradient Boosting',
      status: 'active',
      accuracy: 91.7,
      precision: 89.4,
      recall: 93.2,
      f1Score: 91.3,
      lastTrained: '2024-01-05',
      trainingData: '1.8M transactions'
    },
    {
      id: 'anomaly-detection-v1',
      name: 'Anomaly Detection V1',
      type: 'Isolation Forest',
      status: 'training',
      accuracy: 88.3,
      precision: 85.7,
      recall: 90.1,
      f1Score: 87.8,
      lastTrained: '2024-01-04',
      trainingData: '950K transactions'
    }
  ];

  const trainingJobs = [
    {
      id: 'job-001',
      modelName: 'Fraud Detection V4',
      status: 'running',
      progress: 75,
      startTime: '2024-01-06 14:30:00',
      estimatedCompletion: '2024-01-06 16:45:00'
    },
    {
      id: 'job-002',
      modelName: 'Risk Scoring V3',
      status: 'queued',
      progress: 0,
      startTime: null,
      estimatedCompletion: null
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500"><CheckCircle2 className="w-3 h-3 mr-1" />Active</Badge>;
      case 'training':
        return <Badge className="bg-blue-500"><RefreshCw className="w-3 h-3 mr-1" />Training</Badge>;
      case 'inactive':
        return <Badge variant="secondary"><PauseCircle className="w-3 h-3 mr-1" />Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">ML Model Management</h2>
        <p className="text-muted-foreground">
          Manage, train, and monitor your AI/ML models for fraud detection
        </p>
      </div>

      <Tabs defaultValue="models" className="space-y-6">
        <TabsList>
          <TabsTrigger value="models">Active Models</TabsTrigger>
          <TabsTrigger value="training">Training Jobs</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="deployment">Deployment</TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="space-y-6">
          <div className="grid gap-6">
            {models.map((model) => (
              <Card key={model.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="h-5 w-5" />
                        {model.name}
                      </CardTitle>
                      <CardDescription>
                        {model.type} • Trained on {model.trainingData}
                      </CardDescription>
                    </div>
                    {getStatusBadge(model.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-4 mb-4">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{model.accuracy}%</div>
                      <div className="text-sm text-muted-foreground">Accuracy</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{model.precision}%</div>
                      <div className="text-sm text-muted-foreground">Precision</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{model.recall}%</div>
                      <div className="text-sm text-muted-foreground">Recall</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{model.f1Score}%</div>
                      <div className="text-sm text-muted-foreground">F1 Score</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                    <span>Last trained: {model.lastTrained}</span>
                    <span>Training data: {model.trainingData}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Target className="w-3 h-3 mr-1" />
                      Retrain
                    </Button>
                    <Button size="sm" variant="outline">
                      <BarChart3 className="w-3 h-3 mr-1" />
                      Analytics
                    </Button>
                    <Button size="sm" variant="outline">
                      <Zap className="w-3 h-3 mr-1" />
                      Deploy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="training" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Start New Training</CardTitle>
                <CardDescription>
                  Train a new model or retrain existing ones
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Model Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select model type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fraud-detection">Fraud Detection</SelectItem>
                      <SelectItem value="risk-scoring">Risk Scoring</SelectItem>
                      <SelectItem value="anomaly-detection">Anomaly Detection</SelectItem>
                      <SelectItem value="behavioral-analysis">Behavioral Analysis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Training Dataset</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select dataset" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="latest">Latest (2.5M transactions)</SelectItem>
                      <SelectItem value="historical">Historical (5M transactions)</SelectItem>
                      <SelectItem value="custom">Custom Dataset</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">
                  <PlayCircle className="w-4 h-4 mr-2" />
                  Start Training
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Training Queue</CardTitle>
                <CardDescription>
                  Current and queued training jobs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trainingJobs.map((job) => (
                    <div key={job.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{job.modelName}</h4>
                        <Badge variant={job.status === 'running' ? 'default' : 'secondary'}>
                          {job.status}
                        </Badge>
                      </div>
                      {job.status === 'running' && (
                        <div className="space-y-2">
                          <Progress value={job.progress} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{job.progress}% complete</span>
                            <span>ETA: {job.estimatedCompletion?.split(' ')[1]}</span>
                          </div>
                        </div>
                      )}
                      {job.status === 'queued' && (
                        <p className="text-sm text-muted-foreground">Waiting to start...</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Model Performance Comparison</CardTitle>
                <CardDescription>
                  Compare metrics across different models
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-5 gap-2 text-xs font-medium text-muted-foreground">
                    <div>Model</div>
                    <div>Accuracy</div>
                    <div>Precision</div>
                    <div>Recall</div>
                    <div>F1</div>
                  </div>
                  {models.map((model) => (
                    <div key={model.id} className="grid grid-cols-5 gap-2 text-sm">
                      <div className="font-medium">{model.name.split(' ')[0]} {model.name.split(' ')[1]}</div>
                      <div>{model.accuracy}%</div>
                      <div>{model.precision}%</div>
                      <div>{model.recall}%</div>
                      <div>{model.f1Score}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Alerts</CardTitle>
                <CardDescription>
                  Model performance notifications and alerts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-amber-800">Performance Degradation</h4>
                      <p className="text-sm text-amber-700">Fraud Detection V2 accuracy dropped to 89.2%</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-800">Training Completed</h4>
                      <p className="text-sm text-green-700">Risk Scoring V3 achieved 93.1% accuracy</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800">Performance Improvement</h4>
                      <p className="text-sm text-blue-700">Anomaly Detection improved by 2.3% after retraining</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Model Deployment</CardTitle>
                <CardDescription>
                  Deploy models to production environments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Select Model</label>
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {models.map((model) => (
                        <SelectItem key={model.id} value={model.id}>
                          {model.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Environment</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select environment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="staging">Staging</SelectItem>
                      <SelectItem value="production">Production</SelectItem>
                      <SelectItem value="canary">Canary (10% traffic)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">
                  <Zap className="w-4 h-4 mr-2" />
                  Deploy Model
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>A/B Testing</CardTitle>
                <CardDescription>
                  Compare models in production with A/B tests
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Test: Fraud Detection V2 vs V3</h4>
                    <Badge>Running</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Model A (50%):</span>
                      <div>V2 - 91.2% accuracy</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Model B (50%):</span>
                      <div>V3 - 94.1% accuracy</div>
                    </div>
                  </div>
                  <Progress value={65} className="mt-2 h-2" />
                  <p className="text-xs text-muted-foreground mt-1">65% complete • 2 days remaining</p>
                </div>
                <Button variant="outline" className="w-full">
                  Create New A/B Test
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MLModelManagement;
