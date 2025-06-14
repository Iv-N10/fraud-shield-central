
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User } from 'lucide-react';
import BehavioralPatternAnalysis from '@/components/behavioral/BehavioralPatternAnalysis';
import DeviceAnalytics from '@/components/behavioral/DeviceAnalytics';
import LocationInsights from '@/components/behavioral/LocationInsights';
import BehaviorScoring from '@/components/behavioral/BehaviorScoring';

export default function BehavioralAnalytics() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <User className="h-8 w-8" />
            Behavioral Analytics
          </h1>
          <p className="text-muted-foreground">Deep insights into user behavior patterns and risk indicators</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">Export Report</Button>
          <Button size="sm">Configure Alerts</Button>
        </div>
      </div>

      <Tabs defaultValue="spending" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="spending">Spending Patterns</TabsTrigger>
          <TabsTrigger value="devices">Device Analytics</TabsTrigger>
          <TabsTrigger value="locations">Location Insights</TabsTrigger>
          <TabsTrigger value="behavior">Behavior Scoring</TabsTrigger>
        </TabsList>

        <TabsContent value="spending" className="space-y-4">
          <BehavioralPatternAnalysis />
        </TabsContent>

        <TabsContent value="devices" className="space-y-4">
          <DeviceAnalytics />
        </TabsContent>

        <TabsContent value="locations" className="space-y-4">
          <LocationInsights />
        </TabsContent>

        <TabsContent value="behavior" className="space-y-4">
          <BehaviorScoring />
        </TabsContent>
      </Tabs>
    </div>
  );
}
