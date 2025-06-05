
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RealTimeTransactionStream from '@/components/realtime/RealTimeTransactionStream';
import SmartAlertSystem from '@/components/alerts/SmartAlertSystem';
import AnomalyDetectionEngine from '@/components/ai/AnomalyDetectionEngine';
import FraudHeatMap from '@/components/visualization/FraudHeatMap';
import { Activity, Bell, Brain, Map } from 'lucide-react';

export default function RealTimeMonitoring() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Activity className="h-8 w-8" />
          Real-Time Monitoring
        </h1>
        <p className="text-muted-foreground">
          Advanced fraud detection with real-time alerts, AI anomaly detection, and interactive fraud mapping
        </p>
      </div>

      <Tabs defaultValue="stream" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="stream" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Live Stream
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Smart Alerts
          </TabsTrigger>
          <TabsTrigger value="anomaly" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI Detection
          </TabsTrigger>
          <TabsTrigger value="heatmap" className="flex items-center gap-2">
            <Map className="h-4 w-4" />
            Heat Map
          </TabsTrigger>
        </TabsList>

        <TabsContent value="stream" className="space-y-6">
          <RealTimeTransactionStream />
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <SmartAlertSystem />
        </TabsContent>

        <TabsContent value="anomaly" className="space-y-6">
          <AnomalyDetectionEngine />
        </TabsContent>

        <TabsContent value="heatmap" className="space-y-6">
          <FraudHeatMap />
        </TabsContent>
      </Tabs>
    </div>
  );
}
