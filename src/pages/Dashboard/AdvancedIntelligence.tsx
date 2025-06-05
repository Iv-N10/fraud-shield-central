
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import IPReputationScoring from '@/components/security/IPReputationScoring';
import VelocityFraudDetection from '@/components/security/VelocityFraudDetection';
import CaseManagementSystem from '@/components/case-management/CaseManagementSystem';
import ExplainableAI from '@/components/ai/ExplainableAI';
import { Brain, Shield, Zap, FileText } from 'lucide-react';

export default function AdvancedIntelligence() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Brain className="h-8 w-8" />
          Advanced Intelligence
        </h1>
        <p className="text-muted-foreground">
          Advanced fraud detection intelligence with IP reputation, velocity analysis, case management, and explainable AI
        </p>
      </div>

      <Tabs defaultValue="ip-reputation" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="ip-reputation" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            IP Reputation
          </TabsTrigger>
          <TabsTrigger value="velocity" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Velocity Detection
          </TabsTrigger>
          <TabsTrigger value="case-management" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Case Management
          </TabsTrigger>
          <TabsTrigger value="explainable-ai" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Explainable AI
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ip-reputation" className="space-y-6">
          <IPReputationScoring />
        </TabsContent>

        <TabsContent value="velocity" className="space-y-6">
          <VelocityFraudDetection />
        </TabsContent>

        <TabsContent value="case-management" className="space-y-6">
          <CaseManagementSystem />
        </TabsContent>

        <TabsContent value="explainable-ai" className="space-y-6">
          <ExplainableAI />
        </TabsContent>
      </Tabs>
    </div>
  );
}
