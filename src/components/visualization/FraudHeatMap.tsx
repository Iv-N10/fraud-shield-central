
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  MapPin, 
  Globe, 
  TrendingUp, 
  AlertTriangle, 
  DollarSign,
  Users,
  Clock,
  Filter
} from 'lucide-react';

interface FraudHotspot {
  id: string;
  country: string;
  city: string;
  coordinates: [number, number];
  riskScore: number;
  incidentCount: number;
  totalAmount: number;
  primaryFraudType: string;
  trend: 'increasing' | 'decreasing' | 'stable';
}

interface TimeSlotData {
  hour: string;
  incidents: number;
  risk: number;
}

export default function FraudHeatMap() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [selectedView, setSelectedView] = useState('global');

  const fraudHotspots: FraudHotspot[] = [
    {
      id: '1',
      country: 'United States',
      city: 'New York',
      coordinates: [40.7128, -74.0060],
      riskScore: 85,
      incidentCount: 42,
      totalAmount: 156780,
      primaryFraudType: 'Card Testing',
      trend: 'increasing'
    },
    {
      id: '2',
      country: 'United Kingdom',
      city: 'London',
      coordinates: [51.5074, -0.1278],
      riskScore: 72,
      incidentCount: 28,
      totalAmount: 89340,
      primaryFraudType: 'Account Takeover',
      trend: 'stable'
    },
    {
      id: '3',
      country: 'Germany',
      city: 'Berlin',
      coordinates: [52.5200, 13.4050],
      riskScore: 68,
      incidentCount: 19,
      totalAmount: 67250,
      primaryFraudType: 'Synthetic Identity',
      trend: 'decreasing'
    },
    {
      id: '4',
      country: 'Brazil',
      city: 'São Paulo',
      coordinates: [-23.5558, -46.6396],
      riskScore: 91,
      incidentCount: 35,
      totalAmount: 124560,
      primaryFraudType: 'Payment Fraud',
      trend: 'increasing'
    },
    {
      id: '5',
      country: 'Japan',
      city: 'Tokyo',
      coordinates: [35.6762, 139.6503],
      riskScore: 45,
      incidentCount: 12,
      totalAmount: 43210,
      primaryFraudType: 'Card Not Present',
      trend: 'stable'
    }
  ];

  const timeSlotData: TimeSlotData[] = [
    { hour: '00:00', incidents: 12, risk: 65 },
    { hour: '02:00', incidents: 8, risk: 72 },
    { hour: '04:00', incidents: 5, risk: 58 },
    { hour: '06:00', incidents: 15, risk: 68 },
    { hour: '08:00', incidents: 23, risk: 75 },
    { hour: '10:00', incidents: 31, risk: 82 },
    { hour: '12:00', incidents: 28, risk: 79 },
    { hour: '14:00', incidents: 35, risk: 86 },
    { hour: '16:00', incidents: 42, risk: 91 },
    { hour: '18:00', incidents: 38, risk: 88 },
    { hour: '20:00', incidents: 29, risk: 83 },
    { hour: '22:00', incidents: 18, risk: 71 }
  ];

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'bg-red-500';
    if (score >= 60) return 'bg-amber-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getRiskLevel = (score: number) => {
    if (score >= 80) return 'Critical';
    if (score >= 60) return 'High';
    if (score >= 40) return 'Medium';
    return 'Low';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'decreasing':
        return <TrendingUp className="h-4 w-4 text-green-500 rotate-180" />;
      default:
        return <div className="h-4 w-4 bg-blue-500 rounded-full" />;
    }
  };

  const getIntensityColor = (incidents: number) => {
    const maxIncidents = Math.max(...timeSlotData.map(d => d.incidents));
    const intensity = incidents / maxIncidents;
    
    if (intensity > 0.8) return 'bg-red-600';
    if (intensity > 0.6) return 'bg-red-400';
    if (intensity > 0.4) return 'bg-amber-400';
    if (intensity > 0.2) return 'bg-yellow-400';
    return 'bg-green-400';
  };

  const sortedHotspots = [...fraudHotspots].sort((a, b) => b.riskScore - a.riskScore);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Fraud Heat Map</h3>
          <p className="text-sm text-muted-foreground">Geographic distribution of fraud incidents</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedView} onValueChange={setSelectedView}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="global">Global View</SelectItem>
              <SelectItem value="regional">Regional</SelectItem>
              <SelectItem value="city">City Level</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* World Map Visualization */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Global Fraud Distribution
            </CardTitle>
            <CardDescription>Interactive map showing fraud hotspots worldwide</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Simplified map representation */}
            <div className="relative bg-slate-100 rounded-lg h-[400px] overflow-hidden">
              {/* Mock world map background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Globe className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-sm">Interactive World Map</p>
                    <p className="text-xs mt-1">Fraud incidents plotted by location</p>
                  </div>
                </div>
              </div>
              
              {/* Fraud hotspot markers */}
              {fraudHotspots.map((hotspot, index) => (
                <div
                  key={hotspot.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${20 + index * 15}%`,
                    top: `${30 + (index % 3) * 20}%`
                  }}
                >
                  <div className="relative">
                    <div 
                      className={`w-6 h-6 rounded-full ${getRiskColor(hotspot.riskScore)} opacity-80 animate-pulse`}
                    />
                    <div 
                      className={`absolute inset-0 w-6 h-6 rounded-full ${getRiskColor(hotspot.riskScore)} opacity-30 animate-ping`}
                    />
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                      {hotspot.city}: {hotspot.incidentCount} incidents
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Risk Locations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Top Risk Locations
            </CardTitle>
            <CardDescription>Highest fraud activity by region</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sortedHotspots.slice(0, 5).map((hotspot, index) => (
                <div key={hotspot.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-6 h-6 bg-muted rounded-full text-xs font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{hotspot.city}</div>
                      <div className="text-xs text-muted-foreground">{hotspot.country}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className={`text-xs ${
                      hotspot.riskScore >= 80 ? 'border-red-500 text-red-600' :
                      hotspot.riskScore >= 60 ? 'border-amber-500 text-amber-600' :
                      'border-green-500 text-green-600'
                    }`}>
                      {getRiskLevel(hotspot.riskScore)}
                    </Badge>
                    <div className="text-xs text-muted-foreground mt-1">
                      {hotspot.incidentCount} incidents
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Time-based Heat Map */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Time-based Activity Pattern
          </CardTitle>
          <CardDescription>Fraud incident patterns throughout the day</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-12 gap-2">
            {timeSlotData.map((slot) => (
              <div key={slot.hour} className="text-center">
                <div 
                  className={`h-16 rounded-t-lg ${getIntensityColor(slot.incidents)} relative group cursor-pointer transition-all hover:scale-110`}
                  title={`${slot.hour}: ${slot.incidents} incidents (${slot.risk}% risk)`}
                >
                  <div className="absolute inset-0 flex items-end justify-center pb-1">
                    <span className="text-xs font-medium text-white">
                      {slot.incidents}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {slot.hour}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-4 text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded"></div>
                <span className="text-muted-foreground">Low Activity</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-600 rounded"></div>
                <span className="text-muted-foreground">High Activity</span>
              </div>
            </div>
            <div className="text-muted-foreground">
              Peak fraud time: 4:00 PM - 6:00 PM
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fraud Type Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {['Card Testing', 'Account Takeover', 'Payment Fraud', 'Synthetic Identity', 'Card Not Present'].map((fraudType, index) => {
          const count = fraudHotspots.filter(h => h.primaryFraudType === fraudType).length;
          const percentage = ((count / fraudHotspots.length) * 100).toFixed(1);
          
          return (
            <Card key={fraudType}>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{count}</div>
                  <div className="text-sm text-muted-foreground">{fraudType}</div>
                  <div className="text-xs text-muted-foreground mt-1">{percentage}% of hotspots</div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
