
import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Eye, Lock, Zap, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface SecurityThreat {
  id: string;
  type: 'ddos' | 'injection' | 'xss' | 'malware' | 'intrusion' | 'anomaly';
  severity: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  timestamp: string;
  blocked: boolean;
  description: string;
}

const ThreatDetection: React.FC = () => {
  const [threats, setThreats] = useState<SecurityThreat[]>([
    {
      id: '1',
      type: 'injection',
      severity: 'critical',
      source: '192.168.1.100',
      timestamp: '2 minutes ago',
      blocked: true,
      description: 'SQL injection attempt detected and blocked'
    },
    {
      id: '2',
      type: 'ddos',
      severity: 'high',
      source: 'Multiple IPs',
      timestamp: '5 minutes ago',
      blocked: true,
      description: 'DDoS attack mitigated via rate limiting'
    },
    {
      id: '3',
      type: 'anomaly',
      severity: 'medium',
      source: '10.0.0.45',
      timestamp: '12 minutes ago',
      blocked: false,
      description: 'Unusual access pattern detected'
    }
  ]);

  const [securityMetrics] = useState({
    threatsBlocked: 847,
    intrusionAttempts: 23,
    vulnerabilitiesPatched: 156,
    securityScore: 98.7
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getThreatIcon = (type: string) => {
    switch (type) {
      case 'injection': return <Zap className="h-4 w-4" />;
      case 'ddos': return <Globe className="h-4 w-4" />;
      case 'intrusion': return <Eye className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Threats Blocked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{securityMetrics.threatsBlocked}</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Intrusion Attempts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{securityMetrics.intrusionAttempts}</div>
            <p className="text-xs text-muted-foreground">All blocked</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Security Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{securityMetrics.securityScore}%</div>
            <Progress value={securityMetrics.securityScore} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Vulnerabilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">0</div>
            <p className="text-xs text-muted-foreground">All patched</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Real-time Threat Detection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {threats.map((threat) => (
              <Alert key={threat.id} className="border-l-4 border-l-red-500">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getThreatIcon(threat.type)}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium capitalize">{threat.type} Attack</span>
                        <Badge className={getSeverityColor(threat.severity)}>
                          {threat.severity.toUpperCase()}
                        </Badge>
                        {threat.blocked && (
                          <Badge variant="outline" className="border-green-500 text-green-600">
                            BLOCKED
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{threat.description}</p>
                      <p className="text-xs text-muted-foreground">Source: {threat.source} • {threat.timestamp}</p>
                    </div>
                  </div>
                </div>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThreatDetection;
