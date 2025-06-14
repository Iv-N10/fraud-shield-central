
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Smartphone, BarChart3, AlertTriangle } from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip
} from 'recharts';

const deviceData = [
  { name: 'Mobile', value: 65, color: '#3b82f6' },
  { name: 'Desktop', value: 28, color: '#10b981' },
  { name: 'Tablet', value: 7, color: '#f59e0b' },
];

export default function DeviceAnalytics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Device Distribution</CardTitle>
          <CardDescription>Transaction distribution by device type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                  nameKey="name"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {deviceData.map((device, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: device.color }}
                  ></div>
                  <span>{device.name}</span>
                </div>
                <span className="font-medium">{device.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Device Risk Assessment</CardTitle>
          <CardDescription>Security analysis by device category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium">Mobile Devices</p>
                  <p className="text-sm text-muted-foreground">1,247 unique devices</p>
                </div>
              </div>
              <Badge variant="outline">Low Risk</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Desktop Browsers</p>
                  <p className="text-sm text-muted-foreground">456 unique devices</p>
                </div>
              </div>
              <Badge variant="outline">Low Risk</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <div>
                  <p className="font-medium">Unknown/Suspicious</p>
                  <p className="text-sm text-muted-foreground">23 flagged devices</p>
                </div>
              </div>
              <Badge variant="default" className="bg-amber-500">Medium Risk</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
