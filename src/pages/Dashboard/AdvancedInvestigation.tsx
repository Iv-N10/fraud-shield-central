
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DigitalForensicsSuite from '@/components/investigation/DigitalForensicsSuite';
import AutomatedCaseResolution from '@/components/investigation/AutomatedCaseResolution';
import FraudRingDetection from '@/components/investigation/FraudRingDetection';
import DisputeManagementSystem from '@/components/investigation/DisputeManagementSystem';
import ComplianceAutomation from '@/components/investigation/ComplianceAutomation';
import { Search, Bot, Users, FileText, Shield } from 'lucide-react';

export default function AdvancedInvestigation() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Search className="h-8 w-8" />
          Advanced Investigation & Automation
        </h1>
        <p className="text-muted-foreground">
          Complete digital forensics, automated case resolution, and compliance automation tools
        </p>
      </div>

      <Tabs defaultValue="forensics" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="forensics" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Digital Forensics
          </TabsTrigger>
          <TabsTrigger value="automation" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            Case Automation
          </TabsTrigger>
          <TabsTrigger value="fraud-rings" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Fraud Rings
          </TabsTrigger>
          <TabsTrigger value="disputes" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Dispute Mgmt
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Compliance Auto
          </TabsTrigger>
        </TabsList>

        <TabsContent value="forensics" className="space-y-6">
          <DigitalForensicsSuite />
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          <AutomatedCaseResolution />
        </TabsContent>

        <TabsContent value="fraud-rings" className="space-y-6">
          <FraudRingDetection />
        </TabsContent>

        <TabsContent value="disputes" className="space-y-6">
          <DisputeManagementSystem />
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <ComplianceAutomation />
        </TabsContent>
      </Tabs>
    </div>
  );
}
