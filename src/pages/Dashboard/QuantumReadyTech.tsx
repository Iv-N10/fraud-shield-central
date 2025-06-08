
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import QuantumEncryption from '@/components/quantum/QuantumEncryption';
import BlockchainVerification from '@/components/blockchain/BlockchainVerification';
import IoTFraudDetection from '@/components/iot/IoTFraudDetection';
import BiometricAnalysis from '@/components/biometric/BiometricAnalysis';
import ARInvestigation from '@/components/ar/ARInvestigation';
import { Shield, Link2, Wifi, Mic, Eye } from 'lucide-react';

export default function QuantumReadyTech() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Shield className="h-8 w-8" />
          Quantum-Ready & Future Tech
        </h1>
        <p className="text-muted-foreground">
          Next-generation fraud detection with quantum-resistant security, blockchain verification, and emerging technologies
        </p>
      </div>

      <Tabs defaultValue="quantum" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="quantum" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Quantum Security
          </TabsTrigger>
          <TabsTrigger value="blockchain" className="flex items-center gap-2">
            <Link2 className="h-4 w-4" />
            Blockchain
          </TabsTrigger>
          <TabsTrigger value="iot" className="flex items-center gap-2">
            <Wifi className="h-4 w-4" />
            IoT Detection
          </TabsTrigger>
          <TabsTrigger value="biometric" className="flex items-center gap-2">
            <Mic className="h-4 w-4" />
            Biometric Analysis
          </TabsTrigger>
          <TabsTrigger value="ar" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            AR Investigation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="quantum" className="space-y-6">
          <QuantumEncryption />
        </TabsContent>

        <TabsContent value="blockchain" className="space-y-6">
          <BlockchainVerification />
        </TabsContent>

        <TabsContent value="iot" className="space-y-6">
          <IoTFraudDetection />
        </TabsContent>

        <TabsContent value="biometric" className="space-y-6">
          <BiometricAnalysis />
        </TabsContent>

        <TabsContent value="ar" className="space-y-6">
          <ARInvestigation />
        </TabsContent>
      </Tabs>
    </div>
  );
}
