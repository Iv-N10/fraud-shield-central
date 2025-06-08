
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Eye, Layers, Network, Zap, Play, Square, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FraudNetwork {
  id: string;
  name: string;
  nodes: number;
  connections: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  totalAmount: number;
  timespan: string;
}

interface ARVisualization {
  id: string;
  name: string;
  type: 'network' | 'timeline' | 'geographic' | 'behavioral';
  complexity: number;
  insights: string[];
  isActive: boolean;
}

export default function ARInvestigation() {
  const [fraudNetworks] = useState<FraudNetwork[]>([
    {
      id: '1',
      name: 'Synthetic Identity Ring',
      nodes: 23,
      connections: 47,
      riskLevel: 'critical',
      totalAmount: 2456000,
      timespan: '6 months'
    },
    {
      id: '2',
      name: 'Account Takeover Cluster',
      nodes: 8,
      connections: 15,
      riskLevel: 'high',
      totalAmount: 890000,
      timespan: '3 months'
    },
    {
      id: '3',
      name: 'Payment Card Fraud Network',
      nodes: 34,
      connections: 78,
      riskLevel: 'high',
      totalAmount: 1678000,
      timespan: '4 months'
    }
  ]);

  const [visualizations, setVisualizations] = useState<ARVisualization[]>([
    {
      id: '1',
      name: '3D Transaction Flow',
      type: 'network',
      complexity: 87,
      insights: ['High-velocity clusters identified', 'Suspicious routing patterns'],
      isActive: false
    },
    {
      id: '2',
      name: 'Temporal Fraud Patterns',
      type: 'timeline',
      complexity: 65,
      insights: ['Peak fraud hours: 2-4 AM', 'Weekend spike patterns'],
      isActive: false
    },
    {
      id: '3',
      name: 'Geographic Risk Heat Map',
      type: 'geographic',
      complexity: 78,
      insights: ['High-risk regions identified', 'Cross-border correlations'],
      isActive: true
    },
    {
      id: '4',
      name: 'Behavioral Anomaly Sphere',
      type: 'behavioral',
      complexity: 92,
      insights: ['Deviation patterns detected', 'Unusual interaction sequences'],
      isActive: false
    }
  ]);

  const [arStats] = useState({
    activeVisualizations: 3,
    networkMappings: 47,
    insightsGenerated: 156,
    investigationTime: 73,
    accuracyImprovement: 34
  });

  const { toast } = useToast();

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-amber-500';
      default: return 'bg-blue-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'network': return <Network className="h-4 w-4" />;
      case 'timeline': return <Zap className="h-4 w-4" />;
      case 'geographic': return <Layers className="h-4 w-4" />;
      default: return <Eye className="h-4 w-4" />;
    }
  };

  const handleStartVisualization = (vizId: string) => {
    setVisualizations(prev => prev.map(viz => 
      viz.id === vizId ? { ...viz, isActive: true } : viz
    ));
    
    toast({
      title: 'AR Visualization Started',
      description: 'Launching 3D fraud pattern visualization in augmented reality mode',
    });
  };

  const handleStopVisualization = (vizId: string) => {
    setVisualizations(prev => prev.map(viz => 
      viz.id === vizId ? { ...viz, isActive: false } : viz
    ));
    
    toast({
      title: 'AR Visualization Stopped',
      description: 'Augmented reality session ended',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* AR Investigation Alert */}
      <Alert>
        <Eye className="h-4 w-4" />
        <AlertTitle>Augmented Reality Investigation Active</AlertTitle>
        <AlertDescription>
          3D visualization and immersive fraud pattern analysis enabled. 
          AR technology provides spatial understanding of complex fraud networks and behavioral patterns.
        </AlertDescription>
      </Alert>

      {/* AR Stats */}
      <div className="grid gap-6 md:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Visualizations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{arStats.activeVisualizations}</div>
              <Eye className="h-5 w-5 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Network Mappings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{arStats.networkMappings}</div>
              <Network className="h-5 w-5 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Insights Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{arStats.insightsGenerated}</div>
              <Zap className="h-5 w-5 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Time Saved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{arStats.investigationTime}%</div>
              <RotateCcw className="h-5 w-5 text-amber-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Accuracy Boost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">+{arStats.accuracyImprovement}%</div>
              <Layers className="h-5 w-5 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Fraud Networks */}
        <Card>
          <CardHeader>
            <CardTitle>3D Fraud Networks</CardTitle>
            <CardDescription>Complex fraud rings visualized in augmented reality</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {fraudNetworks.map((network) => (
                <div key={network.id} className="flex items-start space-x-3 p-4 rounded-lg border">
                  <div className={`mt-0.5 p-1 rounded-full ${getRiskColor(network.riskLevel)} text-white`}>
                    <Network className="h-3 w-3" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{network.name}</h4>
                      <Badge variant={network.riskLevel === 'critical' ? 'destructive' : 'default'}>
                        {network.riskLevel.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-2">
                      <span>Nodes: {network.nodes}</span>
                      <span>Connections: {network.connections}</span>
                      <span>Amount: {formatCurrency(network.totalAmount)}</span>
                      <span>Timespan: {network.timespan}</span>
                    </div>
                    <Button size="sm" className="w-full">
                      <Eye className="h-3 w-3 mr-1" />
                      View in AR
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AR Visualizations */}
        <Card>
          <CardHeader>
            <CardTitle>AR Visualizations</CardTitle>
            <CardDescription>Interactive 3D fraud pattern analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {visualizations.map((viz) => (
                <div key={viz.id} className="flex items-start space-x-3 p-4 rounded-lg border">
                  <div className="mt-0.5 p-2 rounded-full bg-muted">
                    {getTypeIcon(viz.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{viz.name}</h4>
                      <Badge variant={viz.isActive ? "default" : "outline"}>
                        {viz.isActive ? 'Active' : 'Idle'}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">
                      Complexity: {viz.complexity}% | Type: {viz.type}
                    </div>
                    <div className="mb-3">
                      {viz.insights.map((insight, index) => (
                        <Badge key={index} variant="outline" className="mr-1 mb-1 text-xs">
                          {insight}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {viz.isActive ? (
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleStopVisualization(viz.id)}
                          className="flex-1"
                        >
                          <Square className="h-3 w-3 mr-1" />
                          Stop
                        </Button>
                      ) : (
                        <Button 
                          size="sm"
                          onClick={() => handleStartVisualization(viz.id)}
                          className="flex-1"
                        >
                          <Play className="h-3 w-3 mr-1" />
                          Launch AR
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
    </div>
  );
}
