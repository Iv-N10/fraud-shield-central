
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Upload, FileText, Image, User, AlertTriangle } from 'lucide-react';

export default function SyntheticDataDetection() {
  const [scanningFile, setScanningFile] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const detectionResults = [
    {
      id: 'D001',
      type: 'Profile Image',
      filename: 'profile_photo.jpg',
      confidence: 94,
      result: 'AI Generated',
      indicators: ['Unnatural skin texture', 'Perfect symmetry', 'Digital artifacts']
    },
    {
      id: 'D002', 
      type: 'Identity Document',
      filename: 'drivers_license.pdf',
      confidence: 78,
      result: 'Potentially Synthetic',
      indicators: ['Inconsistent fonts', 'Template markers']
    },
    {
      id: 'D003',
      type: 'Bank Statement',
      filename: 'statement.pdf',
      confidence: 15,
      result: 'Authentic',
      indicators: ['Genuine formatting', 'Consistent metadata']
    }
  ];

  const startScan = () => {
    setScanningFile(true);
    setScanProgress(0);
    
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanningFile(false);
          return 100;
        }
        return prev + 15;
      });
    }, 300);
  };

  const detectionStats = [
    { label: 'Files Scanned Today', value: '1,247', icon: FileText },
    { label: 'Synthetic Detected', value: '89', icon: AlertTriangle },
    { label: 'Accuracy Rate', value: '96.8%', icon: User },
    { label: 'Processing Speed', value: '2.3s avg', icon: Upload }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {detectionStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="flex items-center p-6">
              <stat.icon className="h-8 w-8 text-muted-foreground" />
              <div className="ml-4">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Synthetic Data Scanner
          </CardTitle>
          <CardDescription>
            Upload documents and images to detect AI-generated or synthetic content
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Drop files here or click to browse
            </p>
            <p className="text-xs text-gray-500">
              Supports: JPG, PNG, PDF, DOC
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button onClick={startScan} disabled={scanningFile}>
              {scanningFile ? 'Scanning...' : 'Start Deep Scan'}
            </Button>
            {scanningFile && (
              <div className="flex-1">
                <Progress value={scanProgress} className="w-full" />
                <p className="text-sm text-muted-foreground mt-1">
                  Analyzing for synthetic patterns... {scanProgress}%
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detection Results</CardTitle>
          <CardDescription>
            Recent files analyzed for synthetic or AI-generated content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {detectionResults.map((result) => (
              <div key={result.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {result.type === 'Profile Image' ? <Image className="h-4 w-4" /> : 
                     result.type === 'Identity Document' ? <FileText className="h-4 w-4" /> : 
                     <FileText className="h-4 w-4" />}
                    <span className="font-medium">{result.filename}</span>
                    <Badge variant="outline">{result.type}</Badge>
                  </div>
                  <Badge variant={
                    result.result === 'AI Generated' ? 'destructive' : 
                    result.result === 'Potentially Synthetic' ? 'secondary' : 'default'
                  }>
                    {result.result}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Confidence</span>
                    <span className="text-sm font-medium">{result.confidence}%</span>
                  </div>
                  <Progress value={result.confidence} className="w-full" />
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm font-medium">Detection Indicators:</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {result.indicators.map((indicator, index) => (
                      <li key={index} className="flex items-center gap-1">
                        <span className="w-1 h-1 bg-current rounded-full"></span>
                        {indicator}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
