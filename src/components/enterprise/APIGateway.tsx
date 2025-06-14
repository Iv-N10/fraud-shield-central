
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Zap, 
  Key, 
  BarChart3, 
  Shield, 
  Clock, 
  Globe,
  Copy,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function APIGateway() {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const apiEndpoints = [
    {
      method: 'POST',
      endpoint: '/api/v1/fraud/analyze',
      description: 'Analyze transaction for fraud',
      status: 'active',
      calls: 15420,
      avgResponseTime: 120
    },
    {
      method: 'GET',
      endpoint: '/api/v1/kyc/verify',
      description: 'Verify KYC documents',
      status: 'active',
      calls: 8950,
      avgResponseTime: 850
    },
    {
      method: 'POST',
      endpoint: '/api/v1/risk/score',
      description: 'Calculate risk score',
      status: 'active',
      calls: 12300,
      avgResponseTime: 95
    },
    {
      method: 'GET',
      endpoint: '/api/v1/reports/generate',
      description: 'Generate compliance reports',
      status: 'maintenance',
      calls: 2100,
      avgResponseTime: 2400
    }
  ];

  const generateApiKey = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newKey = `fs_${Math.random().toString(36).substring(2, 15)}_${Date.now()}`;
      setApiKey(newKey);
      setIsGenerating(false);
      toast({
        title: "API Key Generated",
        description: "New API key has been generated successfully.",
      });
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "API key copied to clipboard.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            API Gateway Management
          </CardTitle>
          <CardDescription>
            Manage API endpoints, authentication, and access control
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
              <TabsTrigger value="authentication">Auth</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Calls</p>
                        <p className="text-2xl font-bold">38.8k</p>
                      </div>
                      <BarChart3 className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Active Keys</p>
                        <p className="text-2xl font-bold">24</p>
                      </div>
                      <Key className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Avg Response</p>
                        <p className="text-2xl font-bold">156ms</p>
                      </div>
                      <Clock className="h-8 w-8 text-orange-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Uptime</p>
                        <p className="text-2xl font-bold">99.9%</p>
                      </div>
                      <Shield className="h-8 w-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="endpoints" className="space-y-4">
              <div className="space-y-4">
                {apiEndpoints.map((endpoint, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Badge variant={endpoint.method === 'GET' ? 'secondary' : 'default'}>
                              {endpoint.method}
                            </Badge>
                            <code className="text-sm bg-muted px-2 py-1 rounded">
                              {endpoint.endpoint}
                            </code>
                            <Badge variant={endpoint.status === 'active' ? 'default' : 'destructive'}>
                              {endpoint.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{endpoint.description}</p>
                          <p className="text-xs text-muted-foreground">
                            {endpoint.calls.toLocaleString()} calls • {endpoint.avgResponseTime}ms avg
                          </p>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="authentication" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>API Key Management</CardTitle>
                  <CardDescription>Generate and manage API keys for authentication</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-key">Current API Key</Label>
                    <div className="flex gap-2">
                      <Input
                        id="api-key"
                        value={apiKey || 'No API key generated'}
                        readOnly
                        className="font-mono"
                      />
                      {apiKey && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => copyToClipboard(apiKey)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  <Button onClick={generateApiKey} disabled={isGenerating}>
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Generating...
                      </>
                    ) : (
                      'Generate New API Key'
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Request Volume</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Today</span>
                        <span className="text-sm font-medium">2,456 requests</span>
                      </div>
                      <Progress value={75} />
                      <div className="flex justify-between">
                        <span className="text-sm">This Week</span>
                        <span className="text-sm font-medium">18,920 requests</span>
                      </div>
                      <Progress value={60} />
                      <div className="flex justify-between">
                        <span className="text-sm">This Month</span>
                        <span className="text-sm font-medium">78,456 requests</span>
                      </div>
                      <Progress value={85} />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Error Rates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Success (2xx)</span>
                        </div>
                        <span className="text-sm font-medium">98.7%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm">Client Error (4xx)</span>
                        </div>
                        <span className="text-sm font-medium">1.1%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                          <span className="text-sm">Server Error (5xx)</span>
                        </div>
                        <span className="text-sm font-medium">0.2%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
