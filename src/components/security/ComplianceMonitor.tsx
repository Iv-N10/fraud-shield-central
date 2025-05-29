
import React, { useState } from 'react';
import { FileCheck, Shield, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ComplianceCheck {
  id: string;
  standard: string;
  requirement: string;
  status: 'compliant' | 'warning' | 'non-compliant';
  lastCheck: string;
  details: string;
}

const ComplianceMonitor: React.FC = () => {
  const [complianceChecks] = useState<ComplianceCheck[]>([
    {
      id: '1',
      standard: 'PCI DSS',
      requirement: 'Network Security',
      status: 'compliant',
      lastCheck: '2 hours ago',
      details: 'Firewall and network security controls verified'
    },
    {
      id: '2',
      standard: 'SOX',
      requirement: 'Access Controls',
      status: 'compliant',
      lastCheck: '1 hour ago',
      details: 'User access controls and segregation of duties verified'
    },
    {
      id: '3',
      standard: 'ISO 27001',
      requirement: 'Incident Response',
      status: 'warning',
      lastCheck: '30 minutes ago',
      details: 'Incident response plan requires update'
    },
    {
      id: '4',
      standard: 'GDPR',
      requirement: 'Data Protection',
      status: 'compliant',
      lastCheck: '15 minutes ago',
      details: 'Data encryption and privacy controls verified'
    }
  ]);

  const [overallCompliance] = useState({
    pciDss: 98,
    sox: 96,
    iso27001: 94,
    gdpr: 99,
    overall: 97
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'non-compliant':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'compliant':
        return <Badge className="bg-green-100 text-green-600 border-green-200">Compliant</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-600 border-yellow-200">Warning</Badge>;
      case 'non-compliant':
        return <Badge className="bg-red-100 text-red-600 border-red-200">Non-Compliant</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="h-5 w-5" />
            Compliance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{overallCompliance.overall}%</div>
              <p className="text-sm text-muted-foreground">Overall</p>
              <Progress value={overallCompliance.overall} className="h-2 mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{overallCompliance.pciDss}%</div>
              <p className="text-sm text-muted-foreground">PCI DSS</p>
              <Progress value={overallCompliance.pciDss} className="h-2 mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{overallCompliance.sox}%</div>
              <p className="text-sm text-muted-foreground">SOX</p>
              <Progress value={overallCompliance.sox} className="h-2 mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{overallCompliance.iso27001}%</div>
              <p className="text-sm text-muted-foreground">ISO 27001</p>
              <Progress value={overallCompliance.iso27001} className="h-2 mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{overallCompliance.gdpr}%</div>
              <p className="text-sm text-muted-foreground">GDPR</p>
              <Progress value={overallCompliance.gdpr} className="h-2 mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Standards</TabsTrigger>
          <TabsTrigger value="pci">PCI DSS</TabsTrigger>
          <TabsTrigger value="sox">SOX</TabsTrigger>
          <TabsTrigger value="iso">ISO 27001</TabsTrigger>
          <TabsTrigger value="gdpr">GDPR</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Checks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceChecks.map((check) => (
                  <div key={check.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(check.status)}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{check.standard}</span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-sm">{check.requirement}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{check.details}</p>
                        <p className="text-xs text-muted-foreground">Last checked: {check.lastCheck}</p>
                      </div>
                    </div>
                    {getStatusBadge(check.status)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComplianceMonitor;
