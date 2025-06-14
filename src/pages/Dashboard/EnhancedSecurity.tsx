
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BehavioralBiometrics from '@/components/biometric/BehavioralBiometrics';
import HSMIntegration from '@/components/security/HSMIntegration';
import SIEMIntegration from '@/components/security/SIEMIntegration';
import AdvancedThreatIntelligence from '@/components/security/AdvancedThreatIntelligence';
import QuantumSecurityShield from '@/components/security/QuantumSecurityShield';
import RealTimeSecurityCenter from '@/components/security/RealTimeSecurityCenter';
import { 
  Shield, 
  Fingerprint, 
  Key, 
  Database,
  Brain,
  Atom,
  Activity
} from 'lucide-react';

const EnhancedSecurity = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Enhanced Security Center</h1>
        <p className="text-muted-foreground">
          Military-grade cybersecurity with HSM, SIEM integration, behavioral biometrics, and quantum-resistant protection
        </p>
      </div>

      <Tabs defaultValue="threat-intelligence" className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="threat-intelligence" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI Intelligence
          </TabsTrigger>
          <TabsTrigger value="biometrics" className="flex items-center gap-2">
            <Fingerprint className="h-4 w-4" />
            Biometrics
          </TabsTrigger>
          <TabsTrigger value="hsm" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            HSM
          </TabsTrigger>
          <TabsTrigger value="siem" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            SIEM
          </TabsTrigger>
          <TabsTrigger value="quantum" className="flex items-center gap-2">
            <Atom className="h-4 w-4" />
            Quantum
          </TabsTrigger>
          <TabsTrigger value="real-time" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Real-time SOC
          </TabsTrigger>
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Overview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="threat-intelligence" className="space-y-6">
          <AdvancedThreatIntelligence />
        </TabsContent>

        <TabsContent value="biometrics" className="space-y-6">
          <BehavioralBiometrics />
        </TabsContent>

        <TabsContent value="hsm" className="space-y-6">
          <HSMIntegration />
        </TabsContent>

        <TabsContent value="siem" className="space-y-6">
          <SIEMIntegration />
        </TabsContent>

        <TabsContent value="quantum" className="space-y-6">
          <QuantumSecurityShield />
        </TabsContent>

        <TabsContent value="real-time" className="space-y-6">
          <RealTimeSecurityCenter />
        </TabsContent>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="col-span-full">
              <h2 className="text-2xl font-bold mb-4">Security Platform Overview</h2>
              <p className="text-muted-foreground mb-6">
                Comprehensive cybersecurity platform integrating multiple defense layers
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border">
              <Brain className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-semibold mb-2">AI Threat Intelligence</h3>
              <p className="text-sm text-muted-foreground">
                Advanced AI-powered threat detection with nation-state actor attribution
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border">
              <Fingerprint className="h-8 w-8 text-green-600 mb-3" />
              <h3 className="font-semibold mb-2">Behavioral Biometrics</h3>
              <p className="text-sm text-muted-foreground">
                Real-time user behavior analysis and anomaly detection
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-lg border">
              <Key className="h-8 w-8 text-purple-600 mb-3" />
              <h3 className="font-semibold mb-2">HSM Integration</h3>
              <p className="text-sm text-muted-foreground">
                FIPS 140-2 Level 3 hardware security modules for cryptographic operations
              </p>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border">
              <Database className="h-8 w-8 text-orange-600 mb-3" />
              <h3 className="font-semibold mb-2">SIEM Platforms</h3>
              <p className="text-sm text-muted-foreground">
                Integrated Splunk, QRadar, and Elastic for comprehensive monitoring
              </p>
            </div>

            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-lg border">
              <Atom className="h-8 w-8 text-cyan-600 mb-3" />
              <h3 className="font-semibold mb-2">Quantum Security</h3>
              <p className="text-sm text-muted-foreground">
                Post-quantum cryptography and quantum-resistant algorithms
              </p>
            </div>

            <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-lg border">
              <Activity className="h-8 w-8 text-rose-600 mb-3" />
              <h3 className="font-semibold mb-2">Real-time SOC</h3>
              <p className="text-sm text-muted-foreground">
                24/7 security operations center with automated incident response
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedSecurity;
