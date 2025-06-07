
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import APIGateway from '@/components/enterprise/APIGateway';
import AdvancedReporting from '@/components/reporting/AdvancedReporting';
import NotificationCenter from '@/components/alerts/NotificationCenter';
import MobileOptimizations from '@/components/mobile/MobileOptimizations';
import WhiteLabelCustomization from '@/components/enterprise/WhiteLabelCustomization';
import MLModelManagement from '@/components/enterprise/MLModelManagement';
import MultiTenantArchitecture from '@/components/enterprise/MultiTenantArchitecture';
import SecurityCompliance from '@/components/enterprise/SecurityCompliance';
import { 
  Zap, 
  BarChart3, 
  Bell, 
  Smartphone,
  Palette,
  Brain,
  Building2,
  Shield
} from 'lucide-react';

export default function EnterpriseFeatures() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Zap className="h-8 w-8" />
          Enterprise Features
        </h1>
        <p className="text-muted-foreground">
          Complete enterprise solution: APIs, AI models, multi-tenancy, security, and customization
        </p>
      </div>

      <Tabs defaultValue="api-gateway" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="api-gateway" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <span className="hidden sm:inline">API Gateway</span>
          </TabsTrigger>
          <TabsTrigger value="reporting" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Reporting</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="mobile" className="flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            <span className="hidden sm:inline">Mobile</span>
          </TabsTrigger>
          <TabsTrigger value="white-label" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">White Label</span>
          </TabsTrigger>
          <TabsTrigger value="ml-models" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span className="hidden sm:inline">ML Models</span>
          </TabsTrigger>
          <TabsTrigger value="multi-tenant" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            <span className="hidden sm:inline">Multi-Tenant</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
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

        <TabsContent value="white-label" className="space-y-6">
          <WhiteLabelCustomization />
        </TabsContent>

        <TabsContent value="ml-models" className="space-y-6">
          <MLModelManagement />
        </TabsContent>

        <TabsContent value="multi-tenant" className="space-y-6">
          <MultiTenantArchitecture />
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <SecurityCompliance />
        </TabsContent>
      </Tabs>
    </div>
  );
}
