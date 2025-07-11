
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Network, Users, TrendingUp, AlertTriangle, Play, Pause, Info } from 'lucide-react';

export default function GraphNeuralNetworks() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const fraudRings = [];

  const networkMetrics = [
    { label: 'Total Nodes', value: '0', icon: Users },
    { label: 'Connected Components', value: '0', icon: Network },
    { label: 'Suspicious Clusters', value: '0', icon: AlertTriangle },
    { label: 'Detection Accuracy', value: 'N/A', icon: TrendingUp }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {networkMetrics.map((metric, index) => (
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
            <Network className="h-5 w-5" />
            Graph Neural Network Analysis
          </CardTitle>
          <CardDescription>
            Analyze transaction networks to detect sophisticated fraud rings and relationships
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Button 
              onClick={startAnalysis} 
              disabled={isAnalyzing}
              className="flex items-center gap-2"
            >
              {isAnalyzing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isAnalyzing ? 'Analyzing...' : 'Start Network Analysis'}
            </Button>
            {isAnalyzing && (
              <div className="flex-1">
                <Progress value={analysisProgress} className="w-full" />
                <p className="text-sm text-muted-foreground mt-1">
                  Processing {analysisProgress}% complete
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detected Fraud Rings</CardTitle>
          <CardDescription>
            Sophisticated fraud networks identified through graph analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <Info className="h-16 w-16 mx-auto mb-4" />
            <p className="text-lg mb-2">No fraud rings detected</p>
            <p className="text-sm">Network analysis will identify suspicious patterns when transaction data is available</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
