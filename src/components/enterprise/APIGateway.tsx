
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Eye, 
  Activity, 
  BarChart3,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

const APIGateway = () => {
  const [apiKey, setApiKey] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');

  const apiEndpoints = [
    {
      method: 'POST',
      endpoint: '/api/v1/transactions/analyze',
      description: 'Analyze transaction for fraud risk',
      status: 'active'
    },
    {
      method: 'GET',
      endpoint: '/api/v1/fraud-patterns',
      description: 'Retrieve fraud patterns',
      status: 'active'
    },
    {
      method: 'POST',
      endpoint: '/api/v1/webhooks/register',
      description: 'Register webhook endpoint',
      status: 'active'
    },
    {
      method: 'GET',
      endpoint: '/api/v1/reports/risk-analytics',
      description: 'Get risk analytics report',
      status: 'active'
    }
  ];

  const webhookEvents = [
    'fraud.detected',
    'transaction.flagged',
    'risk.threshold.exceeded',
    'compliance.alert',
    'system.maintenance'
  ];

  const generateApiKey = () => {
    const key = 'fs_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setApiKey(key);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">API Gateway & Integration</h2>
        <p className="text-muted-foreground">
          Manage API access, webhooks, and third-party integrations
        </p>
      </div>

      <Tabs defaultValue="endpoints" className="space-y-6">
        <TabsList>
          <TabsTrigger value="endpoints">API Endpoints</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="keys">API Keys</TabsTrigger>
          <TabsTrigger value="docs">Documentation</TabsTrigger>
        </TabsList>

        <TabsContent value="endpoints" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Available API Endpoints</CardTitle>
              <CardDescription>
                RESTful API endpoints for fraud detection integration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiEndpoints.map((endpoint, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant={endpoint.method === 'GET' ? 'secondary' : 'default'}>
                          {endpoint.method}
                        </Badge>
                        <code className="text-sm bg-muted px-2 py-1 rounded">
                          {endpoint.endpoint}
                        </code>
                      </div>
                      <p className="text-sm text-muted-foreground">{endpoint.description}</p>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-600">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      {endpoint.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Configure Webhooks</CardTitle>
                <CardDescription>
                  Set up real-time notifications for fraud events
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input
                    id="webhook-url"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    placeholder="https://your-domain.com/webhook"
                  />
                </div>
                <Button className="w-full">Register Webhook</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Available Events</CardTitle>
                <CardDescription>
                  Events that trigger webhook notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {webhookEvents.map((event, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm font-medium">{event}</span>
                      <Badge variant="outline">Active</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="keys" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Key Management</CardTitle>
              <CardDescription>
                Generate and manage API keys for secure access
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="api-key">Your API Key</Label>
                <div className="flex gap-2">
                  <Input
                    id="api-key"
                    value={apiKey}
                    readOnly
                    placeholder="Click generate to create API key"
                  />
                  <Button onClick={generateApiKey}>Generate</Button>
                </div>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
                <p className="text-sm text-amber-800">
                  <AlertTriangle className="w-4 h-4 inline mr-1" />
                  Keep your API key secure. It provides full access to your fraud detection services.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="docs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Documentation</CardTitle>
              <CardDescription>
                Integration examples and usage guidelines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Example: Analyze Transaction</h4>
                  <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`curl -X POST https://api.fraudshield.com/v1/transactions/analyze \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 1500.00,
    "currency": "USD",
    "merchant": "Online Store",
    "ip_address": "192.168.1.1",
    "user_agent": "Mozilla/5.0..."
  }'`}
                  </pre>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Response Format</h4>
                  <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`{
  "risk_score": 75,
  "fraud_probability": 0.12,
  "risk_factors": ["high_velocity", "new_device"],
  "recommendation": "manual_review",
  "processing_time": "45ms"
}`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default APIGateway;
