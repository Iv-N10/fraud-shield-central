
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, 
  Plug, 
  Shield, 
  Key, 
  Database, 
  CheckCircle, 
  AlertCircle,
  Copy,
  Plus,
  Settings
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BankIntegration = () => {
  const [apiKey, setApiKey] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isGeneratingKey, setIsGeneratingKey] = useState(false);
  const { toast } = useToast();

  const generateApiKey = () => {
    setIsGeneratingKey(true);
    setTimeout(() => {
      const newKey = `fs_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
      setApiKey(newKey);
      setIsGeneratingKey(false);
      toast({
        title: "API Key Generated",
        description: "Your new API key has been generated successfully.",
      });
    }, 1000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Text copied to clipboard",
    });
  };

  const integrationSteps = [
    {
      step: 1,
      title: "Generate API Key",
      description: "Create secure API credentials for your bank system",
      completed: !!apiKey
    },
    {
      step: 2,
      title: "Configure Endpoints",
      description: "Set up webhook URLs and API endpoints",
      completed: false
    },
    {
      step: 3,
      title: "Test Connection",
      description: "Verify the integration is working properly",
      completed: false
    },
    {
      step: 4,
      title: "Deploy to Production",
      description: "Go live with FraudShield protection",
      completed: false
    }
  ];

  const supportedIntegrations = [
    {
      name: "REST API",
      description: "Standard REST API integration for real-time fraud detection",
      status: "available",
      documentation: "/docs/rest-api"
    },
    {
      name: "SWIFT Network",
      description: "Direct integration with SWIFT messaging system",
      status: "available",
      documentation: "/docs/swift"
    },
    {
      name: "ISO 20022",
      description: "Support for ISO 20022 messaging standards",
      status: "available",
      documentation: "/docs/iso20022"
    },
    {
      name: "FIX Protocol",
      description: "Financial Information eXchange protocol support",
      status: "coming-soon",
      documentation: "/docs/fix"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Bank System Integration</h1>
        <p className="text-muted-foreground">Connect your banking systems to FraudShield's advanced fraud detection platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Integrations</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Banks connected</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Calls Today</CardTitle>
            <Plug className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.7K</div>
            <p className="text-xs text-muted-foreground">+12% from yesterday</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fraud Detected</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">Prevented today</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="setup" className="space-y-4">
        <TabsList>
          <TabsTrigger value="setup">Setup Integration</TabsTrigger>
          <TabsTrigger value="protocols">Supported Protocols</TabsTrigger>
          <TabsTrigger value="monitoring">Integration Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Integration Setup</CardTitle>
              <CardDescription>
                Follow these steps to integrate your banking system with FraudShield
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Setup Steps</h3>
                  {integrationSteps.map((step) => (
                    <div key={step.step} className="flex items-center space-x-3">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {step.completed ? <CheckCircle className="w-4 h-4" /> : step.step}
                      </div>
                      <div>
                        <p className={`font-medium ${step.completed ? 'text-green-600' : ''}`}>
                          {step.title}
                        </p>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">API Configuration</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="api-key"
                        value={apiKey}
                        placeholder="Generate or enter your API key"
                        readOnly={!apiKey}
                        type="password"
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
                    <Button 
                      onClick={generateApiKey} 
                      disabled={isGeneratingKey}
                      className="w-full"
                    >
                      {isGeneratingKey ? 'Generating...' : 'Generate New API Key'}
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="webhook">Webhook URL</Label>
                    <Input
                      id="webhook"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      placeholder="https://your-bank.com/fraudshield/webhook"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Base API URL</Label>
                    <div className="flex space-x-2">
                      <Input
                        value="https://api.fraudshield.com/v1"
                        readOnly
                        className="bg-muted"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard("https://api.fraudshield.com/v1")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Button className="w-full">
                    <Settings className="w-4 h-4 mr-2" />
                    Test Connection
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="protocols" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Supported Integration Protocols</CardTitle>
              <CardDescription>
                Choose the integration method that best fits your banking infrastructure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {supportedIntegrations.map((integration, index) => (
                  <Card key={index} className="relative">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                        <Badge variant={integration.status === 'available' ? 'default' : 'secondary'}>
                          {integration.status === 'available' ? 'Available' : 'Coming Soon'}
                        </Badge>
                      </div>
                      <CardDescription>{integration.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        disabled={integration.status !== 'available'}
                      >
                        View Documentation
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Integration Health Monitoring</CardTitle>
              <CardDescription>
                Monitor the status and performance of your bank integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h3 className="font-semibold">System Status</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">API Endpoint</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-green-600">Online</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Webhook Service</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-green-600">Online</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">AI Processing</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm text-yellow-600">High Load</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Performance Metrics</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Average Response Time</span>
                      <span className="text-sm font-medium">45ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Success Rate</span>
                      <span className="text-sm font-medium">99.8%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Uptime (24h)</span>
                      <span className="text-sm font-medium">100%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BankIntegration;
