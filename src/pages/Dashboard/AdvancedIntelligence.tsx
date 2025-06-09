
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GraphNeuralNetworks from '@/components/ai/GraphNeuralNetworks';
import BehavioralBiometrics from '@/components/biometric/BehavioralBiometrics';
import SyntheticDataDetection from '@/components/ai/SyntheticDataDetection';
import CrossPlatformIntelligence from '@/components/intelligence/CrossPlatformIntelligence';
import RealTimeDeepLearning from '@/components/ai/RealTimeDeepLearning';
import { Brain, Network, Users, Database, Zap } from 'lucide-react';

export default function AdvancedIntelligence() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Brain className="h-8 w-8" />
          Advanced AI & Intelligence
        </h1>
        <p className="text-muted-foreground">
          Next-generation fraud detection with graph neural networks, behavioral analysis, and real-time learning systems
        </p>
      </div>

      <Tabs defaultValue="graph" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="graph" className="flex items-center gap-2">
            <Network className="h-4 w-4" />
            Graph Networks
          </TabsTrigger>
          <TabsTrigger value="behavioral" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Behavioral Bio
          </TabsTrigger>
          <TabsTrigger value="synthetic" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Synthetic Detection
          </TabsTrigger>
          <TabsTrigger value="crossplatform" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Cross-Platform
          </TabsTrigger>
          <TabsTrigger value="realtime" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Real-time ML
          </TabsTrigger>
        </TabsList>

        <TabsContent value="graph" className="space-y-6">
          <GraphNeuralNetworks />
        </TabsContent>

        <TabsContent value="behavioral" className="space-y-6">
          <BehavioralBiometrics />
        </TabsContent>

        <TabsContent value="synthetic" className="space-y-6">
          <SyntheticDataDetection />
        </TabsContent>

        <TabsContent value="crossplatform" className="space-y-6">
          <CrossPlatformIntelligence />
        </TabsContent>

        <TabsContent value="realtime" className="space-y-6">
          <RealTimeDeepLearning />
        </TabsContent>
      </Tabs>
    </div>
  );
}
