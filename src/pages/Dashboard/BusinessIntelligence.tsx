
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ROICalculator from '@/components/business/ROICalculator';
import ComplianceTracker from '@/components/business/ComplianceTracker';
import PerformanceMetrics from '@/components/business/PerformanceMetrics';
import InvestigationQueue from '@/components/business/InvestigationQueue';
import { BarChart3, Calculator, Shield, Target } from 'lucide-react';

export default function BusinessIntelligence() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <BarChart3 className="h-8 w-8" />
          Business Intelligence
        </h1>
        <p className="text-muted-foreground">
          ROI analysis, compliance tracking, performance metrics, and investigation management
        </p>
      </div>

      <Tabs defaultValue="roi-calculator" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="roi-calculator" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            ROI Calculator
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Compliance
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="investigations" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Investigation Queue
          </TabsTrigger>
        </TabsList>

        <TabsContent value="roi-calculator" className="space-y-6">
          <ROICalculator />
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <ComplianceTracker />
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <PerformanceMetrics />
        </TabsContent>

        <TabsContent value="investigations" className="space-y-6">
          <InvestigationQueue />
        </TabsContent>
      </Tabs>
    </div>
  );
}
