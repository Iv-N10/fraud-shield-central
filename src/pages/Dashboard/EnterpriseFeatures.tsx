
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import APIGateway from '@/components/enterprise/APIGateway';
import AdvancedReporting from '@/components/reporting/AdvancedReporting';
import NotificationCenter from '@/components/alerts/NotificationCenter';
import MobileOptimizations from '@/components/mobile/MobileOptimizations';
import { Zap, BarChart3, Bell, Smartphone } from 'lucide-react';

export default function EnterpriseFeatures() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Zap className="h-8 w-8" />
          Enterprise Features
        </h1>
        <p className="text-muted-foreground">
          Advanced enterprise capabilities: API integration, reporting, notifications, and mobile optimization
        </p>
      </div>

      <Tabs defaultValue="api-gateway" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="api-gateway" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            API Gateway
          </TabsTrigger>
          <TabsTrigger value="reporting" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Advanced Reporting
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="mobile" className="flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            Mobile
          </TabsTrigger>
        </TabsList>

        <TabsContent value="api-gateway" className="space-y-6">
          <APIGateway />
        </TabsContent>

        <TabsContent value="reporting" className="space-y-6">
          <AdvancedReporting />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <NotificationCenter />
        </TabsContent>

        <TabsContent value="mobile" className="space-y-6">
          <MobileOptimizations />
        </TabsContent>
      </Tabs>
    </div>
  );
}
