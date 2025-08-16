
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, Shield, Activity, Clock, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ComplianceAlert {
  id: string;
  section: string;
  activity: string;
  riskLevel: 'low' | 'medium' | 'high';
  status: 'active' | 'resolved' | 'investigating';
  timestamp: string;
  details: string;
  recommendation: string;
}

const ComplianceMonitor = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [alerts, setAlerts] = useState<ComplianceAlert[]>([
    {
      id: '1',
      section: 'Data Privacy',
      activity: 'Cross-border data transfer detected',
      riskLevel: 'medium',
      status: 'active',
      timestamp: '2 minutes ago',
      details: 'EU customer data accessed from US servers',
      recommendation: 'Verify adequate safeguards are in place'
    },
    {
      id: '2',
      section: 'AI Processing',
      activity: 'High false positive rate detected',
      riskLevel: 'high',
      status: 'investigating',
      timestamp: '15 minutes ago',
      details: 'AI model showing 15% false positive rate',
      recommendation: 'Review model bias and retrain if necessary'
    },
    {
      id: '3',
      section: 'Customer Communication',
      activity: 'Delayed fraud notification',
      riskLevel: 'low',
      status: 'resolved',
      timestamp: '1 hour ago',
      details: 'Customer notification sent 5 minutes after detection',
      recommendation: 'Optimize notification delivery system'
    }
  ]);

  const [complianceScores] = useState({
    dataPrivacy: 94,
    fraudDetection: 98,
    aiProcessing: 87,
    customerComm: 96,
    overall: 94
  });

  const [liveActivities] = useState([
    { action: 'Transaction flagged', location: 'US-East', time: 'now', compliant: true },
    { action: 'Data access request', location: 'EU-West', time: '30s ago', compliant: true },
    { action: 'AI model prediction', location: 'US-West', time: '1m ago', compliant: true },
    { action: 'Customer notification', location: 'APAC', time: '2m ago', compliant: false }
  ]);

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'high':
        return <Badge variant="destructive">High Risk</Badge>;
      case 'medium':
        return <Badge className="bg-amber-500">Medium Risk</Badge>;
      case 'low':
        return <Badge variant="outline" className="border-green-500 text-green-600">Low Risk</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'investigating':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Real-Time Compliance Monitor</h2>
        <p className="text-muted-foreground">
          Live monitoring of all platform activities for legal compliance
        </p>
      </div>

      {/* Compliance Scores Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{complianceScores.overall}%</div>
            <p className="text-sm text-muted-foreground">Overall Score</p>
            <Progress value={complianceScores.overall} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{complianceScores.dataPrivacy}%</div>
            <p className="text-sm text-muted-foreground">Data Privacy</p>
            <Progress value={complianceScores.dataPrivacy} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{complianceScores.fraudDetection}%</div>
            <p className="text-sm text-muted-foreground">Fraud Detection</p>
            <Progress value={complianceScores.fraudDetection} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{complianceScores.aiProcessing}%</div>
            <p className="text-sm text-muted-foreground">AI Processing</p>
            <Progress value={complianceScores.aiProcessing} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{complianceScores.customerComm}%</div>
            <p className="text-sm text-muted-foreground">Communication</p>
            <Progress value={complianceScores.customerComm} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Compliance Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Compliance Alerts
            </CardTitle>
            <CardDescription>
              Issues requiring attention or investigation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(alert.status)}
                      <div>
                        <h4 className="font-medium text-sm">{alert.activity}</h4>
                        <p className="text-xs text-muted-foreground">
                          {alert.section} • {alert.timestamp}
                        </p>
                      </div>
                    </div>
                    {getRiskBadge(alert.riskLevel)}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{alert.details}</p>
                  <p className="text-sm font-medium mb-3">{alert.recommendation}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <FileText className="w-3 h-3 mr-1" />
                      View Details
                    </Button>
                    {alert.status === 'active' && (
                      <Button size="sm">Mark Resolved</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Live Activity Feed */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Live Activity Feed
            </CardTitle>
            <CardDescription>
              Real-time platform activities and compliance status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {liveActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {activity.compliant ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    )}
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.location} • {activity.time}
                      </p>
                    </div>
                  </div>
                  <Badge variant={activity.compliant ? "outline" : "destructive"}>
                    {activity.compliant ? "Compliant" : "Review"}
                  </Badge>
                </div>
              ))}
            </div>
            <Button 
              className="w-full mt-4" 
              variant="outline"
              onClick={() => navigate('/dashboard/reports')}
            >
              View Full Activity Log
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Compliance Actions</CardTitle>
          <CardDescription>
            Common compliance tasks and emergency procedures
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex-col"
              onClick={() => navigate('/dashboard/reports')}
            >
              <Shield className="h-6 w-6 mb-2" />
              Generate Report
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col"
              onClick={() => {
                toast({
                  title: "Issue Escalated",
                  description: "The issue has been escalated to the compliance team."
                });
              }}
            >
              <AlertTriangle className="h-6 w-6 mb-2" />
              Escalate Issue
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col"
              onClick={() => {
                toast({
                  title: "Export Started",
                  description: "Compliance logs are being exported..."
                });
              }}
            >
              <FileText className="h-6 w-6 mb-2" />
              Export Logs
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col"
              onClick={() => {
                toast({
                  title: "Audit Started",
                  description: "Running comprehensive compliance audit..."
                });
              }}
            >
              <Activity className="h-6 w-6 mb-2" />
              Run Audit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplianceMonitor;
