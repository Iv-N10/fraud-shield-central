
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Building2, Share2, Shield, TrendingUp, Users, AlertCircle } from 'lucide-react';

export default function CrossPlatformIntelligence() {
  const [sharingEnabled, setSharingEnabled] = useState(true);
  const [receivingEnabled, setReceivingEnabled] = useState(true);

  const partnerInstitutions = [
    {
      name: 'First National Bank',
      type: 'Banking',
      status: 'active',
      sharedPatterns: 234,
      receivedAlerts: 89,
      trustScore: 95
    },
    {
      name: 'SecurePayments Inc',
      type: 'Payment Processor', 
      status: 'active',
      sharedPatterns: 156,
      receivedAlerts: 67,
      trustScore: 88
    },
    {
      name: 'Global Credit Union',
      type: 'Credit Union',
      status: 'pending',
      sharedPatterns: 0,
      receivedAlerts: 0,
      trustScore: 92
    }
  ];

  const fraudPatterns = [
    {
      id: 'FP001',
      name: 'Account Takeover Pattern #47',
      severity: 'high',
      institutions: 5,
      occurrences: 23,
      effectiveness: 94
    },
    {
      id: 'FP002',
      name: 'Synthetic Identity Chain #12',
      severity: 'critical',
      institutions: 3,
      occurrences: 8,
      effectiveness: 98
    },
    {
      id: 'FP003',
      name: 'Card Testing Sequence #89',
      severity: 'medium',
      institutions: 7,
      occurrences: 45,
      effectiveness: 76
    }
  ];

  const intelligenceStats = [
    { label: 'Partner Institutions', value: '12', icon: Building2 },
    { label: 'Shared Patterns', value: '1,247', icon: Share2 },
    { label: 'Prevented Fraud', value: '$2.4M', icon: Shield },
    { label: 'Detection Rate', value: '97.3%', icon: TrendingUp }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {intelligenceStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="flex items-center p-6">
              <stat.icon className="h-8 w-8 text-muted-foreground" />
              <div className="ml-4">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Intelligence Sharing Settings
          </CardTitle>
          <CardDescription>
            Configure how your institution shares and receives fraud intelligence
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">Share Anonymized Patterns</p>
              <p className="text-sm text-muted-foreground">
                Automatically share detected fraud patterns with partner institutions
              </p>
            </div>
            <Switch checked={sharingEnabled} onCheckedChange={setSharingEnabled} />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">Receive Intelligence Feeds</p>
              <p className="text-sm text-muted-foreground">
                Get real-time fraud alerts from the network
              </p>
            </div>
            <Switch checked={receivingEnabled} onCheckedChange={setReceivingEnabled} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Partner Network</CardTitle>
          <CardDescription>
            Institutions in your fraud intelligence sharing network
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {partnerInstitutions.map((partner, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    <span className="font-medium">{partner.name}</span>
                    <Badge variant="outline">{partner.type}</Badge>
                    <Badge variant={partner.status === 'active' ? 'default' : 'secondary'}>
                      {partner.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Shared: {partner.sharedPatterns} patterns • Received: {partner.receivedAlerts} alerts • Trust: {partner.trustScore}%
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Fraud Patterns</CardTitle>
          <CardDescription>
            Shared fraud patterns currently being monitored across the network
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {fraudPatterns.map((pattern) => (
              <div key={pattern.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    <span className="font-medium">{pattern.name}</span>
                    <Badge variant={
                      pattern.severity === 'critical' ? 'destructive' : 
                      pattern.severity === 'high' ? 'secondary' : 'default'
                    }>
                      {pattern.severity}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Institutions</p>
                    <p className="font-medium">{pattern.institutions}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Occurrences</p>
                    <p className="font-medium">{pattern.occurrences}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Effectiveness</p>
                    <p className="font-medium">{pattern.effectiveness}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
