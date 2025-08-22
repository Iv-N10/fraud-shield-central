import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface SecurityEvent {
  id: string;
  action: string;
  timestamp: string;
  metadata: any;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

const SecurityMonitor = () => {
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([]);
  const [securityScore, setSecurityScore] = useState(85);
  const [activeThreats, setActiveThreats] = useState(0);

  useEffect(() => {
    fetchSecurityEvents();
    calculateSecurityScore();
  }, []);

  const fetchSecurityEvents = async () => {
    try {
      const { data: auditLogs } = await supabase
        .from('audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (auditLogs) {
        const events = auditLogs.map(log => ({
          id: log.id,
          action: log.action,
          timestamp: log.created_at,
          metadata: log.metadata,
          severity: getSeverityLevel(log.action)
        }));
        setSecurityEvents(events);
      }
    } catch (error) {
      console.error('Error fetching security events:', error);
    }
  };

  const getSeverityLevel = (action: string): 'low' | 'medium' | 'high' | 'critical' => {
    const criticalActions = ['SIGN_IN_FAILED', 'UNAUTHORIZED_ACCESS'];
    const highActions = ['PASSWORD_CHANGE', 'PROFILE_UPDATE'];
    const mediumActions = ['SIGN_IN', 'SIGN_OUT'];
    
    if (criticalActions.includes(action)) return 'critical';
    if (highActions.includes(action)) return 'high';
    if (mediumActions.includes(action)) return 'medium';
    return 'low';
  };

  const calculateSecurityScore = () => {
    // Calculate security score based on various factors
    let score = 100;
    
    // Check for recent failed login attempts
    const recentFailures = securityEvents.filter(
      event => event.action === 'SIGN_IN_FAILED' && 
      new Date(event.timestamp) > new Date(Date.now() - 24 * 60 * 60 * 1000)
    ).length;
    
    score -= recentFailures * 5;
    
    // Count active threats
    const threats = securityEvents.filter(
      event => event.severity === 'critical' || event.severity === 'high'
    ).length;
    
    setActiveThreats(threats);
    score -= threats * 10;
    
    setSecurityScore(Math.max(0, Math.min(100, score)));
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-5 h-5 text-success" />;
    if (score >= 60) return <AlertTriangle className="w-5 h-5 text-warning" />;
    return <XCircle className="w-5 h-5 text-destructive" />;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Score</CardTitle>
            {getScoreIcon(securityScore)}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getScoreColor(securityScore)}`}>
              {securityScore}/100
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Threats</CardTitle>
            <Shield className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeThreats}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Events Today</CardTitle>
            <AlertTriangle className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{securityEvents.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Security Events</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {securityEvents.length === 0 ? (
            <p className="text-muted-foreground">No security events recorded.</p>
          ) : (
            securityEvents.map(event => (
              <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Badge variant={
                    event.severity === 'critical' ? 'destructive' :
                    event.severity === 'high' ? 'secondary' :
                    event.severity === 'medium' ? 'outline' : 'default'
                  }>
                    {event.severity}
                  </Badge>
                  <div>
                    <p className="font-medium">{event.action.replace(/_/g, ' ')}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(event.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {activeThreats > 0 && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {activeThreats} active security threat(s) detected. Review the events above and take appropriate action.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default SecurityMonitor;