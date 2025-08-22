
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SecurityDashboard from '@/components/security/SecurityDashboard';
import SecurityMonitor from '@/components/security/SecurityMonitor';

const Security: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Security Center</h1>
        <p className="text-muted-foreground">
          Comprehensive security monitoring and protection systems
        </p>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="dashboard">Security Tools</TabsTrigger>
          <TabsTrigger value="monitor">Security Monitor</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <SecurityDashboard />
        </TabsContent>

        <TabsContent value="monitor">
          <SecurityMonitor />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Security;
