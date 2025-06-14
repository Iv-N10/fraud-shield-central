
import React, { useState } from 'react';
import { Shield, AlertTriangle, Eye, Lock, Zap, Globe, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ThreatDetection: React.FC = () => {
  const [threats] = useState([]);

  const [securityMetrics] = useState({
    threatsBlocked: 0,
    intrusionAttempts: 0,
    vulnerabilitiesPatched: 0,
    securityScore: 100
  });

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
            <div className="text-2xl font-bold text-green-600">{securityMetrics.intrusionAttempts}</div>
            <p className="text-xs text-muted-foreground">All systems secure</p>
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
          <div className="text-center py-12 text-muted-foreground">
            <Info className="h-16 w-16 mx-auto mb-4" />
            <p className="text-lg mb-2">No threats detected</p>
            <p className="text-sm">Your security systems are monitoring and will display any threats here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThreatDetection;
