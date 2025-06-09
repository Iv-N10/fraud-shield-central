
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Search, Clock, AlertTriangle, FileText, Download } from 'lucide-react';

export default function DigitalForensicsSuite() {
  const [isTracing, setIsTracing] = useState(false);
  const [traceProgress, setTraceProgress] = useState(0);

  const forensicCases = [
    {
      id: 'FR-001',
      transactionId: 'TXN-456789',
      status: 'completed',
      timelineEvents: 12,
      evidenceItems: 8,
      riskScore: 94,
      startTime: '2 hours ago'
    },
    {
      id: 'FR-002',
      transactionId: 'TXN-789012',
      status: 'in-progress',
      timelineEvents: 6,
      evidenceItems: 4,
      riskScore: 76,
      startTime: '45 minutes ago'
    },
    {
      id: 'FR-003',
      transactionId: 'TXN-345678',
      status: 'pending',
      timelineEvents: 0,
      evidenceItems: 0,
      riskScore: 0,
      startTime: '10 minutes ago'
    }
  ];

  const evidenceTypes = [
    { type: 'IP Geolocation', count: 15, icon: '🌍' },
    { type: 'Device Fingerprints', count: 8, icon: '📱' },
    { type: 'Transaction Paths', count: 23, icon: '🔄' },
    { type: 'Time Correlations', count: 12, icon: '⏰' }
  ];

  const startTrace = () => {
    setIsTracing(true);
    setTraceProgress(0);
    
    const interval = setInterval(() => {
      setTraceProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTracing(false);
          return 100;
        }
        return prev + 15;
      });
    }, 800);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Transaction Path Reconstruction
          </CardTitle>
          <CardDescription>
            Reconstruct complete transaction paths and collect digital evidence
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Button 
              onClick={startTrace} 
              disabled={isTracing}
              className="flex items-center gap-2"
            >
              <Search className="h-4 w-4" />
              {isTracing ? 'Tracing...' : 'Start Forensic Trace'}
            </Button>
            {isTracing && (
              <div className="flex-1">
                <Progress value={traceProgress} className="w-full" />
                <p className="text-sm text-muted-foreground mt-1">
                  Analyzing transaction path... {traceProgress}%
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {evidenceTypes.map((evidence, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{evidence.type}</p>
                  <p className="text-2xl font-bold">{evidence.count}</p>
                </div>
                <span className="text-2xl">{evidence.icon}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Forensic Investigations</CardTitle>
          <CardDescription>
            Current digital forensics cases and their progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {forensicCases.map((case_) => (
              <div key={case_.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{case_.id}</h3>
                    <Badge variant={
                      case_.status === 'completed' ? 'default' :
                      case_.status === 'in-progress' ? 'secondary' : 'outline'
                    }>
                      {case_.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Transaction: {case_.transactionId} • Started: {case_.startTime}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {case_.timelineEvents} timeline events • {case_.evidenceItems} evidence items
                    {case_.riskScore > 0 && ` • Risk: ${case_.riskScore}%`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <FileText className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                  {case_.status === 'completed' && (
                    <Button variant="outline" size="sm">
                      <Download className="h-3 w-3 mr-1" />
                      Export
                    </Button>
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
