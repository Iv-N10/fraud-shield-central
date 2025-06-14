
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Smartphone, 
  Key, 
  Fingerprint, 
  Mail, 
  MessageSquare,
  Shield,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AuthMethod {
  id: string;
  name: string;
  type: 'sms' | 'email' | 'app' | 'hardware' | 'biometric';
  enabled: boolean;
  lastUsed: string;
  successRate: number;
  icon: React.ComponentType<any>;
}

interface AuthSession {
  id: string;
  userId: string;
  method: string;
  result: 'success' | 'failed' | 'pending';
  timestamp: string;
  ipAddress: string;
  location: string;
}

export default function MultiFactorAuthHub() {
  const [authMethods] = useState<AuthMethod[]>([
    {
      id: 'sms',
      name: 'SMS Authentication',
      type: 'sms',
      enabled: true,
      lastUsed: '2 minutes ago',
      successRate: 94.2,
      icon: MessageSquare
    },
    {
      id: 'email',
      name: 'Email Verification',
      type: 'email',
      enabled: true,
      lastUsed: '5 minutes ago',
      successRate: 96.8,
      icon: Mail
    },
    {
      id: 'app',
      name: 'Authenticator App',
      type: 'app',
      enabled: true,
      lastUsed: '1 minute ago',
      successRate: 98.5,
      icon: Smartphone
    },
    {
      id: 'hardware',
      name: 'Hardware Token',
      type: 'hardware',
      enabled: false,
      lastUsed: 'Never',
      successRate: 99.9,
      icon: Key
    },
    {
      id: 'biometric',
      name: 'Biometric Scan',
      type: 'biometric',
      enabled: true,
      lastUsed: '30 seconds ago',
      successRate: 97.3,
      icon: Fingerprint
    }
  ]);

  const [recentSessions] = useState<AuthSession[]>([
    {
      id: 'AUTH-001',
      userId: 'user_12345',
      method: 'Biometric + SMS',
      result: 'success',
      timestamp: '2024-06-14 10:30:15',
      ipAddress: '192.168.1.100',
      location: 'New York, US'
    },
    {
      id: 'AUTH-002',
      userId: 'user_67890',
      method: 'Email + App',
      result: 'success',
      timestamp: '2024-06-14 10:28:42',
      ipAddress: '10.0.0.25',
      location: 'London, UK'
    },
    {
      id: 'AUTH-003',
      userId: 'user_54321',
      method: 'SMS',
      result: 'failed',
      timestamp: '2024-06-14 10:25:33',
      ipAddress: '203.0.113.45',
      location: 'Unknown'
    }
  ]);

  const [stats] = useState({
    totalAuthRequests: 15847,
    successfulAuth: 15234,
    failedAttempts: 613,
    averageAuthTime: 12.4
  });

  const { toast } = useToast();

  const getResultIcon = (result: string) => {
    switch (result) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-amber-500" />;
    }
  };

  const toggleAuthMethod = (methodId: string) => {
    toast({
      title: "Authentication Method Updated",
      description: `${methodId} authentication has been toggled`,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Multi-Factor Authentication Hub
          </CardTitle>
          <CardDescription>
            Comprehensive authentication security management for all user accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.totalAuthRequests.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground">Total Requests</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.successfulAuth.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground">Successful</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{stats.failedAttempts}</div>
              <p className="text-sm text-muted-foreground">Failed</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.averageAuthTime}s</div>
              <p className="text-sm text-muted-foreground">Avg Time</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="methods" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="methods">Auth Methods</TabsTrigger>
          <TabsTrigger value="sessions">Recent Sessions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="methods">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {authMethods.map((method) => (
              <Card key={method.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <method.icon className="h-5 w-5 text-muted-foreground" />
                      <h3 className="font-semibold">{method.name}</h3>
                    </div>
                    <Badge variant={method.enabled ? 'default' : 'secondary'}>
                      {method.enabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Success Rate</span>
                        <span className="font-medium">{method.successRate}%</span>
                      </div>
                      <Progress value={method.successRate} className="h-2" />
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      Last used: {method.lastUsed}
                    </div>
                    
                    <Button 
                      variant={method.enabled ? "destructive" : "default"}
                      size="sm"
                      className="w-full"
                      onClick={() => toggleAuthMethod(method.name)}
                    >
                      {method.enabled ? 'Disable' : 'Enable'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sessions">
          <Card>
            <CardHeader>
              <CardTitle>Authentication Sessions</CardTitle>
              <CardDescription>
                Recent authentication attempts and their results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getResultIcon(session.result)}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{session.id}</span>
                          <Badge variant={session.result === 'success' ? 'default' : 'destructive'}>
                            {session.result}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          User: {session.userId} • Method: {session.method}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {session.ipAddress} • {session.location}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{session.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Authentication Method Usage</CardTitle>
                <CardDescription>Popularity and success rates by method</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {authMethods.filter(m => m.enabled).map((method) => (
                    <div key={method.id} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <method.icon className="h-4 w-4" />
                          {method.name}
                        </span>
                        <span>{method.successRate}%</span>
                      </div>
                      <Progress value={method.successRate} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Metrics</CardTitle>
                <CardDescription>Key performance indicators for MFA</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Account Takeover Prevention</span>
                    <span className="text-lg font-bold text-green-600">99.7%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Brute Force Protection</span>
                    <span className="text-lg font-bold text-green-600">100%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Phishing Resistance</span>
                    <span className="text-lg font-bold text-green-600">98.4%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">User Experience Score</span>
                    <span className="text-lg font-bold text-blue-600">4.6/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
