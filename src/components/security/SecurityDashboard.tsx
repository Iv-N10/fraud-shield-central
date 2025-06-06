
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ThreatDetection from './ThreatDetection';
import IPReputationScoring from './IPReputationScoring';
import VelocityFraudDetection from './VelocityFraudDetection';
import ComplianceMonitor from './ComplianceMonitor';
import CardVerification from './CardVerification';
import BankIntegrationVerification from './BankIntegrationVerification';

const SecurityDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Security Center</h1>
        <p className="text-muted-foreground">
          Comprehensive security monitoring and verification systems
        </p>
      </div>

      <Tabs defaultValue="threats" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="threats">Threats</TabsTrigger>
          <TabsTrigger value="ip-reputation">IP Reputation</TabsTrigger>
          <TabsTrigger value="velocity">Velocity</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="card-verify">Card Verify</TabsTrigger>
          <TabsTrigger value="bank-verify">Bank Verify</TabsTrigger>
        </TabsList>

        <TabsContent value="threats">
          <ThreatDetection />
        </TabsContent>

        <TabsContent value="ip-reputation">
          <IPReputationScoring />
        </TabsContent>

        <TabsContent value="velocity">
          <VelocityFraudDetection />
        </TabsContent>

        <TabsContent value="compliance">
          <ComplianceMonitor />
        </TabsContent>

        <TabsContent value="card-verify">
          <CardVerification />
        </TabsContent>

        <TabsContent value="bank-verify">
          <BankIntegrationVerification />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityDashboard;
