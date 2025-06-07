
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LegalManual from '@/components/legal/LegalManual';
import ComplianceMonitor from '@/components/legal/ComplianceMonitor';
import LegalDocumentation from '@/components/legal/LegalDocumentation';
import RiskAssessment from '@/components/legal/RiskAssessment';
import { Book, Shield, FileText, AlertTriangle } from 'lucide-react';

export default function LegalCompliance() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Book className="h-8 w-8" />
          Legal Compliance Center
        </h1>
        <p className="text-muted-foreground">
          Comprehensive legal protection and compliance monitoring for all platform activities
        </p>
      </div>

      <Tabs defaultValue="manual" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="manual" className="flex items-center gap-2">
            <Book className="h-4 w-4" />
            Legal Manual
          </TabsTrigger>
          <TabsTrigger value="monitor" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Live Monitor
          </TabsTrigger>
          <TabsTrigger value="documentation" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Documentation
          </TabsTrigger>
          <TabsTrigger value="risk" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Risk Assessment
          </TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="space-y-6">
          <LegalManual />
        </TabsContent>

        <TabsContent value="monitor" className="space-y-6">
          <ComplianceMonitor />
        </TabsContent>

        <TabsContent value="documentation" className="space-y-6">
          <LegalDocumentation />
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <RiskAssessment />
        </TabsContent>
      </Tabs>
    </div>
  );
}
