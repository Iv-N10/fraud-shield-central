import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AuditLogging from '@/components/enterprise/AuditLogging';
import AdvancedReportingDashboard from '@/components/enterprise/AdvancedReportingDashboard';
import RealTimeAlertsSystem from '@/components/enterprise/RealTimeAlertsSystem';
import { 
  Shield, 
  BarChart3, 
  Bell,
  Building2
} from 'lucide-react';

export default function EnterpriseCenter() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Building2 className="h-8 w-8" />
          Enterprise Center
        </h1>
        <p className="text-muted-foreground">
          Advanced enterprise features: audit logging, reporting, and real-time alerts
        </p>
      </div>

      <Tabs defaultValue="audit-logging" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="audit-logging" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Audit Logging</span>
          </TabsTrigger>
          <TabsTrigger value="advanced-reporting" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Advanced Reporting</span>
          </TabsTrigger>
          <TabsTrigger value="real-time-alerts" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Real-Time Alerts</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="audit-logging" className="space-y-6">
          <AuditLogging />
        </TabsContent>

        <TabsContent value="advanced-reporting" className="space-y-6">
          <AdvancedReportingDashboard />
        </TabsContent>

        <TabsContent value="real-time-alerts" className="space-y-6">
          <RealTimeAlertsSystem />
        </TabsContent>
      </Tabs>
    </div>
  );
}