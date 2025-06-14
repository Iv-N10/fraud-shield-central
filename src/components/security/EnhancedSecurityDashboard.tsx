
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ThreatDetection from './ThreatDetection';
import AdvancedThreatIntelligence from './AdvancedThreatIntelligence';
import QuantumSecurityShield from './QuantumSecurityShield';
import RealTimeSecurityCenter from './RealTimeSecurityCenter';
import IPReputationScoring from './IPReputationScoring';
import VelocityFraudDetection from './VelocityFraudDetection';
import ComplianceMonitor from './ComplianceMonitor';
import CardVerification from './CardVerification';
import BankIntegrationVerification from './BankIntegrationVerification';
import { 
  Shield, 
  Brain, 
  Atom, 
  Activity, 
  Globe, 
  Zap, 
  FileCheck, 
  CreditCard, 
  Building 
} from 'lucide-react';

const EnhancedSecurityDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Enhanced Security Center</h1>
        <p className="text-muted-foreground">
          Military-grade cybersecurity with AI threat intelligence and quantum-resistant protection
        </p>
      </div>

      <Tabs defaultValue="ai-intelligence" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="ai-intelligence" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI Intelligence
          </TabsTrigger>
          <TabsTrigger value="quantum-shield" className="flex items-center gap-2">
            <Atom className="h-4 w-4" />
            Quantum Shield
          </TabsTrigger>
          <TabsTrigger value="real-time" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Real-time SOC
          </TabsTrigger>
          <TabsTrigger value="advanced-detection" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Advanced Detection
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            Compliance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ai-intelligence" className="space-y-6">
          <AdvancedThreatIntelligence />
        </TabsContent>

        <TabsContent value="quantum-shield" className="space-y-6">
          <QuantumSecurityShield />
        </TabsContent>

        <TabsContent value="real-time" className="space-y-6">
          <RealTimeSecurityCenter />
        </TabsContent>

        <TabsContent value="advanced-detection" className="space-y-6">
          <Tabs defaultValue="threats" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="threats">Threat Detection</TabsTrigger>
              <TabsTrigger value="ip-reputation">IP Analysis</TabsTrigger>
              <TabsTrigger value="velocity">Velocity Detection</TabsTrigger>
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
          </Tabs>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Tabs defaultValue="monitor" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="monitor">Compliance Monitor</TabsTrigger>
              <TabsTrigger value="card-verify">Card Verification</TabsTrigger>
              <TabsTrigger value="bank-verify">Bank Verification</TabsTrigger>
            </TabsList>

            <TabsContent value="monitor">
              <ComplianceMonitor />
            </TabsContent>

            <TabsContent value="card-verify">
              <CardVerification />
            </TabsContent>

            <TabsContent value="bank-verify">
              <BankIntegrationVerification />
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedSecurityDashboard;
