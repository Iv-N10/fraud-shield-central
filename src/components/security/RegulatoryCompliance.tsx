
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileCheck, 
  Shield, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Download,
  Eye
} from 'lucide-react';

interface ComplianceFramework {
  name: string;
  score: number;
  status: 'compliant' | 'warning' | 'non-compliant';
  lastAudit: string;
  nextAudit: string;
  requirements: number;
  violations: number;
}

export default function RegulatoryCompliance() {
  const [frameworks] = useState<ComplianceFramework[]>([
    {
      name: 'PCI DSS 4.0',
      score: 98,
      status: 'compliant',
      lastAudit: '2024-05-15',
      nextAudit: '2024-08-15',
      requirements: 372,
      violations: 2
    },
    {
      name: 'SOX Section 404',
      score: 96,
      status: 'compliant',
      lastAudit: '2024-04-20',
      nextAudit: '2024-07-20',
      requirements: 156,
      violations: 3
    },
    {
      name: 'GDPR',
      score: 94,
      status: 'warning',
      lastAudit: '2024-05-01',
      nextAudit: '2024-08-01',
      requirements: 198,
      violations: 5
    },
    {
      name: 'PSD2',
      score: 99,
      status: 'compliant',
      lastAudit: '2024-05-10',
      nextAudit: '2024-08-10',
      requirements: 89,
      violations: 0
    },
    {
      name: 'Basel III',
      score: 92,
      status: 'warning',
      lastAudit: '2024-04-15',
      nextAudit: '2024-07-15',
      requirements: 245,
      violations: 8
    }
  ]);

  const [auditLog] = useState([
    {
      id: 'AUD-001',
      framework: 'PCI DSS 4.0',
      type: 'Automated Scan',
      result: 'Pass',
      timestamp: '2024-06-14 10:30:00',
      details: 'Network security controls verified'
    },
    {
      id: 'AUD-002',
      framework: 'GDPR',
      type: 'Data Protection Review',
      result: 'Warning',
      timestamp: '2024-06-14 09:15:00',
      details: 'Cookie consent mechanism needs update'
    },
    {
      id: 'AUD-003',
      framework: 'SOX',
      type: 'Access Control Audit',
      result: 'Pass',
      timestamp: '2024-06-14 08:45:00',
      details: 'User access controls properly implemented'
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'non-compliant':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'compliant':
        return <Badge className="bg-green-100 text-green-600 border-green-200">Compliant</Badge>;
      case 'warning':
        return <Badge className="bg-amber-100 text-amber-600 border-amber-200">Warning</Badge>;
      case 'non-compliant':
        return <Badge className="bg-red-100 text-red-600 border-red-200">Non-Compliant</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const overallCompliance = Math.round(
    frameworks.reduce((sum, f) => sum + f.score, 0) / frameworks.length
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="h-5 w-5" />
            Regulatory Compliance Dashboard
          </CardTitle>
          <CardDescription>
            Real-time monitoring of financial services compliance requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{overallCompliance}%</div>
              <p className="text-sm text-muted-foreground">Overall Compliance</p>
              <Progress value={overallCompliance} className="h-2 mt-2" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {frameworks.filter(f => f.status === 'compliant').length}
              </div>
              <p className="text-sm text-muted-foreground">Compliant Frameworks</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">
                {frameworks.filter(f => f.status === 'warning').length}
              </div>
              <p className="text-sm text-muted-foreground">Warnings</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">
                {frameworks.reduce((sum, f) => sum + f.violations, 0)}
              </div>
              <p className="text-sm text-muted-foreground">Total Violations</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="frameworks" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="frameworks">Compliance Frameworks</TabsTrigger>
          <TabsTrigger value="audit-log">Audit Log</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="frameworks">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {frameworks.map((framework, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(framework.status)}
                      <h3 className="font-semibold">{framework.name}</h3>
                    </div>
                    {getStatusBadge(framework.status)}
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Compliance Score</span>
                        <span className="font-medium">{framework.score}%</span>
                      </div>
                      <Progress value={framework.score} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Requirements</span>
                        <div className="font-medium">{framework.requirements}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Violations</span>
                        <div className="font-medium text-red-600">{framework.violations}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Last Audit</span>
                        <div className="font-medium">{framework.lastAudit}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Next Audit</span>
                        <div className="font-medium">{framework.nextAudit}</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between pt-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Export Report
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="audit-log">
          <Card>
            <CardHeader>
              <CardTitle>Recent Audit Activities</CardTitle>
              <CardDescription>
                Automated and manual compliance audit results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditLog.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{log.id}</span>
                        <Badge variant={log.result === 'Pass' ? 'default' : 'secondary'}>
                          {log.result}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {log.framework} • {log.type}
                      </p>
                      <p className="text-sm">{log.details}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{log.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Reports</CardTitle>
              <CardDescription>
                Generate and download compliance reports for auditors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {frameworks.map((framework, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">{framework.name} Report</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Complete compliance assessment and audit trail
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="h-4 w-4 mr-1" />
                        PDF
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="h-4 w-4 mr-1" />
                        Excel
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
