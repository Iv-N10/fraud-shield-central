
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  FileText,
  Globe,
  Users,
  Lock
} from 'lucide-react';

interface ComplianceFramework {
  id: string;
  name: string;
  description: string;
  status: 'compliant' | 'partial' | 'non-compliant' | 'pending';
  completionRate: number;
  lastAudit: string;
  nextAudit: string;
  requirements: ComplianceRequirement[];
}

interface ComplianceRequirement {
  id: string;
  title: string;
  status: 'met' | 'partial' | 'not-met';
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  description: string;
}

export default function ComplianceTracker() {
  const [frameworks] = useState<ComplianceFramework[]>([
    {
      id: 'pci-dss',
      name: 'PCI DSS',
      description: 'Payment Card Industry Data Security Standard',
      status: 'compliant',
      completionRate: 98,
      lastAudit: '2024-03-15',
      nextAudit: '2024-09-15',
      requirements: [
        {
          id: 'pci-1',
          title: 'Install and maintain a firewall configuration',
          status: 'met',
          priority: 'high',
          dueDate: '2024-12-31',
          description: 'Implement network security controls'
        },
        {
          id: 'pci-2',
          title: 'Do not use vendor-supplied defaults',
          status: 'met',
          priority: 'high',
          dueDate: '2024-12-31',
          description: 'Change default passwords and security parameters'
        },
        {
          id: 'pci-3',
          title: 'Protect stored cardholder data',
          status: 'partial',
          priority: 'high',
          dueDate: '2024-07-01',
          description: 'Implement encryption for stored payment data'
        }
      ]
    },
    {
      id: 'gdpr',
      name: 'GDPR',
      description: 'General Data Protection Regulation',
      status: 'partial',
      completionRate: 85,
      lastAudit: '2024-02-20',
      nextAudit: '2024-08-20',
      requirements: [
        {
          id: 'gdpr-1',
          title: 'Data Processing Lawfulness',
          status: 'met',
          priority: 'high',
          dueDate: '2024-12-31',
          description: 'Ensure lawful basis for processing personal data'
        },
        {
          id: 'gdpr-2',
          title: 'Data Subject Rights',
          status: 'partial',
          priority: 'medium',
          dueDate: '2024-06-30',
          description: 'Implement procedures for data subject requests'
        },
        {
          id: 'gdpr-3',
          title: 'Data Breach Notification',
          status: 'not-met',
          priority: 'high',
          dueDate: '2024-05-15',
          description: '72-hour breach notification procedure'
        }
      ]
    },
    {
      id: 'sox',
      name: 'SOX',
      description: 'Sarbanes-Oxley Act',
      status: 'compliant',
      completionRate: 92,
      lastAudit: '2024-01-10',
      nextAudit: '2024-07-10',
      requirements: [
        {
          id: 'sox-1',
          title: 'Internal Controls Documentation',
          status: 'met',
          priority: 'high',
          dueDate: '2024-12-31',
          description: 'Document and test internal controls'
        },
        {
          id: 'sox-2',
          title: 'Management Assessment',
          status: 'met',
          priority: 'medium',
          dueDate: '2024-12-31',
          description: 'Annual management assessment of controls'
        }
      ]
    }
  ]);

  const [overallMetrics] = useState({
    totalFrameworks: frameworks.length,
    compliantFrameworks: frameworks.filter(f => f.status === 'compliant').length,
    pendingRequirements: frameworks.reduce((sum, f) => sum + f.requirements.filter(r => r.status !== 'met').length, 0),
    averageCompletionRate: frameworks.reduce((sum, f) => sum + f.completionRate, 0) / frameworks.length
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
      case 'met':
        return 'bg-green-500 text-white';
      case 'partial':
        return 'bg-amber-500 text-white';
      case 'non-compliant':
      case 'not-met':
        return 'bg-red-500 text-white';
      default:
        return 'bg-blue-500 text-white';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
      case 'met':
        return <CheckCircle className="h-4 w-4" />;
      case 'partial':
        return <Clock className="h-4 w-4" />;
      case 'non-compliant':
      case 'not-met':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-amber-600';
      default:
        return 'text-blue-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Compliance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Frameworks</p>
                <p className="text-2xl font-bold">{overallMetrics.totalFrameworks}</p>
              </div>
              <Shield className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Compliant</p>
                <p className="text-2xl font-bold text-green-600">{overallMetrics.compliantFrameworks}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Items</p>
                <p className="text-2xl font-bold text-amber-600">{overallMetrics.pendingRequirements}</p>
              </div>
              <Clock className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Completion</p>
                <p className="text-2xl font-bold">{overallMetrics.averageCompletionRate.toFixed(1)}%</p>
              </div>
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Frameworks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {frameworks.map((framework) => (
          <Card key={framework.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {framework.name === 'PCI DSS' && <Lock className="h-5 w-5" />}
                    {framework.name === 'GDPR' && <Globe className="h-5 w-5" />}
                    {framework.name === 'SOX' && <Users className="h-5 w-5" />}
                    {framework.name}
                  </CardTitle>
                  <CardDescription>{framework.description}</CardDescription>
                </div>
                <Badge className={getStatusColor(framework.status)}>
                  {framework.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Completion Rate</span>
                    <span className="text-sm text-muted-foreground">{framework.completionRate}%</span>
                  </div>
                  <Progress value={framework.completionRate} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Last Audit:</span>
                    <div className="font-medium">{new Date(framework.lastAudit).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Next Audit:</span>
                    <div className="font-medium">{new Date(framework.nextAudit).toLocaleDateString()}</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Requirements Status</h4>
                  <div className="space-y-2">
                    {framework.requirements.map((req) => (
                      <div key={req.id} className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(req.status)}
                          <span className="text-sm">{req.title}</span>
                          <Badge variant="outline" className={getPriorityColor(req.priority)}>
                            {req.priority}
                          </Badge>
                        </div>
                        <Badge variant="outline" className={getStatusColor(req.status)}>
                          {req.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming Deadlines */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Compliance Deadlines</CardTitle>
          <CardDescription>Requirements and audits due in the next 90 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {frameworks
              .flatMap(f => f.requirements.filter(r => r.status !== 'met'))
              .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
              .slice(0, 5)
              .map((req, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{req.title}</h4>
                    <p className="text-sm text-muted-foreground">{req.description}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={getPriorityColor(req.priority)}>
                      {req.priority}
                    </Badge>
                    <div className="text-sm text-muted-foreground mt-1">
                      Due: {new Date(req.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
