
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';

const locationInsights = [
  { location: 'New York, NY', transactions: 1250, risk: 'low', percentage: 45 },
  { location: 'Los Angeles, CA', transactions: 890, risk: 'low', percentage: 32 },
  { location: 'Chicago, IL', transactions: 456, risk: 'medium', percentage: 16 },
  { location: 'Unknown/VPN', transactions: 123, risk: 'high', percentage: 7 },
];

export default function LocationInsights() {
  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'high':
        return <Badge variant="destructive">High Risk</Badge>;
      case 'medium':
        return <Badge variant="default" className="bg-amber-500">Medium Risk</Badge>;
      default:
        return <Badge variant="outline">Low Risk</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Geographic Transaction Analysis</CardTitle>
        <CardDescription>Transaction patterns and risk assessment by location</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {locationInsights.map((location, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium">{location.location}</p>
                  <p className="text-sm text-muted-foreground">
                    {location.transactions.toLocaleString()} transactions ({location.percentage}%)
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getRiskBadge(location.risk)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
