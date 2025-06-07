
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  Lock, 
  Eye, 
  FileText,
  AlertTriangle,
  CheckCircle2,
  Download,
  Calendar,
  Users,
  Database
} from 'lucide-react';

const SecurityCompliance = () => {
  const [gdprEnabled, setGdprEnabled] = useState(true);
  const [auditLogging, setAuditLogging] = useState(true);

  const complianceStandards = [
    {
      name: 'PCI DSS',
      description: 'Payment Card Industry Data Security Standard',
      status: 'compliant',
      coverage: 98,
      lastAudit: '2024-01-05',
      nextAudit: '2024-07-05'
    },
    {
      name: 'SOX',
      description: 'Sarbanes-Oxley Act',
      status: 'compliant',
      coverage: 95,
      lastAudit: '2023-12-15',
      nextAudit: '2024-06-15'
    },
    {
      name: 'GDPR',
      description: 'General Data Protection Regulation',
      status: 'compliant',
      coverage: 100,
      lastAudit: '2024-01-10',
      nextAudit: '2024-07-10'
    },
    {
      name: 'ISO 27001',
      description: 'Information Security Management',
      status: 'in-progress',
      coverage: 85,
      lastAudit: '2023-11-20',
      nextAudit: '2024-05-20'
    }
  ];

  const securityFeatures = [
    {
      category: 'Data Protection',
      features: [
        { name: 'End-to-End Encryption', enabled: true, description: 'AES-256 encryption for data at rest and in transit' },
        { name: 'Key Management', enabled: true, description: 'Hardware Security Module (HSM) key storage' },
        { name: 'Data Masking', enabled: true, description: 'Automatic PII masking in non-production environments' },
        { name: 'Backup Encryption', enabled: true, description: 'Encrypted automated backups' }
      ]
    },
    {
      category: 'Access Control',
      features: [
        { name: 'Multi-Factor Authentication', enabled: true, description: 'Required for all user accounts' },
        { name: 'Role-Based Access', enabled: true, description: 'Granular permission system' },
        { name: 'Single Sign-On', enabled: true, description: 'SAML/OIDC integration' },
        { name: 'Session Management', enabled: true, description: 'Automatic session timeout and monitoring' }
      ]
    },
    {
      category: 'Monitoring & Auditing',
      features: [
        { name: 'Audit Trails', enabled: auditLogging, description: 'Complete user and system activity logging' },
        { name: 'Real-time Monitoring', enabled: true, description: '24/7 security event monitoring' },
        { name: 'Anomaly Detection', enabled: true, description: 'AI-powered security threat detection' },
        { name: 'Compliance Reporting', enabled: true, description: 'Automated compliance report generation' }
      ]
    }
  ];

  const auditEvents = [
    {
      id: 'AUD-001',
      event: 'User Login',
      user: 'admin@acmebank.com',
      timestamp: '2024-01-06 14:30:22',
      ip: '192.168.1.100',
      status: 'success'
    },
    {
      id: 'AUD-002',
      event: 'Data Export',
      user: 'analyst@acmebank.com',
      timestamp: '2024-01-06 14:25:15',
      ip: '192.168.1.101',
      status: 'success'
    },
    {
      id: 'AUD-003',
      event: 'Failed Login Attempt',
      user: 'unknown@external.com',
      timestamp: '2024-01-06 14:20:08',
      ip: '203.0.113.45',
      status: 'blocked'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'compliant':
        return <Badge className="bg-green-500"><CheckCircle2 className="w-3 h-3 mr-1" />Compliant</Badge>;
      case 'in-progress':
        return <Badge className="bg-yellow-500">In Progress</Badge>;
      case 'non-compliant':
        return <Badge variant="destructive"><AlertTriangle className="w-3 h-3 mr-1" />Non-Compliant</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Security & Compliance</h2>
        <p className="text-muted-foreground">
          Advanced security features and regulatory compliance management
        </p>
      </div>

      <Tabs defaultValue="compliance" className="space-y-6">
        <TabsList>
          <TabsTrigger value="compliance">Compliance Standards</TabsTrigger>
          <TabsTrigger value="security">Security Features</TabsTrigger>
          <TabsTrigger value="audit">Audit Trails</TabsTrigger>
          <TabsTrigger value="privacy">Privacy Controls</TabsTrigger>
        </TabsList>

        <TabsContent value="compliance" className="space-y-6">
          <div className="grid gap-6">
            {complianceStandards.map((standard, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        {standard.name}
                      </CardTitle>
                      <CardDescription>{standard.description}</CardDescription>
                    </div>
                    {getStatusBadge(standard.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Compliance Coverage</span>
                        <span>{standard.coverage}%</span>
                      </div>
                      <Progress value={standard.coverage} className="h-2" />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">Last Audit</div>
                          <div className="text-xs text-muted-foreground">{standard.lastAudit}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">Next Audit</div>
                          <div className="text-xs text-muted-foreground">{standard.nextAudit}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <FileText className="w-3 h-3 mr-1" />
                        View Report
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-3 h-3 mr-1" />
                        Download Certificate
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="space-y-6">
            {securityFeatures.map((category, categoryIndex) => (
              <Card key={categoryIndex}>
                <CardHeader>
                  <CardTitle>{category.category}</CardTitle>
                  <CardDescription>
                    Security features for {category.category.toLowerCase()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h4 className="font-medium">{feature.name}</h4>
                            {feature.enabled ? (
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                            ) : (
                              <AlertTriangle className="w-4 h-4 text-yellow-500" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {feature.description}
                          </p>
                        </div>
                        <Switch
                          checked={feature.enabled}
                          onCheckedChange={
                            feature.name === 'Audit Trails' 
                              ? setAuditLogging 
                              : undefined
                          }
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Audit Configuration</CardTitle>
                <CardDescription>
                  Configure audit logging and retention
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Enable Audit Logging</label>
                    <p className="text-sm text-muted-foreground">Log all user and system activities</p>
                  </div>
                  <Switch checked={auditLogging} onCheckedChange={setAuditLogging} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Real-time Alerts</label>
                    <p className="text-sm text-muted-foreground">Immediate notifications for critical events</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Data Export Logging</label>
                    <p className="text-sm text-muted-foreground">Track all data exports and downloads</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">API Access Logging</label>
                    <p className="text-sm text-muted-foreground">Monitor all API calls and responses</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Audit Events</CardTitle>
                <CardDescription>
                  Latest security and user activity logs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {auditEvents.map((event) => (
                    <div key={event.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{event.event}</h4>
                        <Badge variant={event.status === 'success' ? 'default' : 'destructive'}>
                          {event.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div className="flex items-center gap-2">
                          <Users className="w-3 h-3" />
                          {event.user}
                        </div>
                        <div className="flex items-center gap-2">
                          <Eye className="w-3 h-3" />
                          {event.ip}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          {event.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <Eye className="w-4 h-4 mr-2" />
                  View All Events
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>GDPR Compliance</CardTitle>
                <CardDescription>
                  Data privacy and protection controls
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">GDPR Mode</label>
                    <p className="text-sm text-muted-foreground">Enable GDPR compliance features</p>
                  </div>
                  <Switch checked={gdprEnabled} onCheckedChange={setGdprEnabled} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Right to be Forgotten</label>
                    <p className="text-sm text-muted-foreground">Allow users to request data deletion</p>
                  </div>
                  <Switch defaultChecked={gdprEnabled} disabled={!gdprEnabled} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Data Portability</label>
                    <p className="text-sm text-muted-foreground">Enable data export for users</p>
                  </div>
                  <Switch defaultChecked={gdprEnabled} disabled={!gdprEnabled} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Consent Management</label>
                    <p className="text-sm text-muted-foreground">Track and manage user consent</p>
                  </div>
                  <Switch defaultChecked={gdprEnabled} disabled={!gdprEnabled} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Retention</CardTitle>
                <CardDescription>
                  Configure data retention policies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">Transaction Data</h4>
                  <p className="text-sm text-muted-foreground mb-2">Retention: 7 years (Regulatory requirement)</p>
                  <Progress value={85} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">85% of storage used</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">User Activity Logs</h4>
                  <p className="text-sm text-muted-foreground mb-2">Retention: 1 year</p>
                  <Progress value={45} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">45% of storage used</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">Security Events</h4>
                  <p className="text-sm text-muted-foreground mb-2">Retention: 3 years</p>
                  <Progress value={62} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">62% of storage used</p>
                </div>
                <Button variant="outline" className="w-full">
                  <Database className="w-4 h-4 mr-2" />
                  Configure Retention
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityCompliance;
