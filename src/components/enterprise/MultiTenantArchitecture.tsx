
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { 
  Building2, 
  Users, 
  Database, 
  Shield,
  Settings,
  BarChart3,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';

const MultiTenantArchitecture = () => {
  const [selectedTenant, setSelectedTenant] = useState('acme-bank');

  const tenants = [
    {
      id: 'acme-bank',
      name: 'Acme Bank',
      domain: 'acme-bank.fraudshield.com',
      status: 'active',
      plan: 'enterprise',
      users: 45,
      transactions: '2.3M',
      storage: '15.2 GB',
      created: '2023-06-15'
    },
    {
      id: 'secure-financial',
      name: 'Secure Financial',
      domain: 'secure.fraudshield.com',
      status: 'active',
      plan: 'professional',
      users: 28,
      transactions: '1.8M',
      storage: '8.7 GB',
      created: '2023-08-22'
    },
    {
      id: 'trust-credit',
      name: 'Trust Credit Union',
      domain: 'trust-cu.fraudshield.com',
      status: 'suspended',
      plan: 'basic',
      users: 12,
      transactions: '450K',
      storage: '3.2 GB',
      created: '2023-11-10'
    }
  ];

  const resourceUsage = [
    { name: 'CPU Usage', value: 68, max: 100, unit: '%' },
    { name: 'Memory', value: 12.4, max: 16, unit: 'GB' },
    { name: 'Storage', value: 127.3, max: 500, unit: 'GB' },
    { name: 'Bandwidth', value: 2.1, max: 10, unit: 'TB' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'suspended':
        return <Badge variant="destructive">Suspended</Badge>;
      case 'maintenance':
        return <Badge className="bg-yellow-500">Maintenance</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case 'enterprise':
        return <Badge className="bg-purple-500">Enterprise</Badge>;
      case 'professional':
        return <Badge className="bg-blue-500">Professional</Badge>;
      case 'basic':
        return <Badge variant="secondary">Basic</Badge>;
      default:
        return <Badge variant="outline">{plan}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Multi-Tenant Architecture</h2>
        <p className="text-muted-foreground">
          Manage multiple client environments and resource allocation
        </p>
      </div>

      <Tabs defaultValue="tenants" className="space-y-6">
        <TabsList>
          <TabsTrigger value="tenants">Tenants</TabsTrigger>
          <TabsTrigger value="isolation">Data Isolation</TabsTrigger>
          <TabsTrigger value="resources">Resource Management</TabsTrigger>
          <TabsTrigger value="billing">Billing & Usage</TabsTrigger>
        </TabsList>

        <TabsContent value="tenants" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Client Tenants</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Tenant
            </Button>
          </div>

          <div className="grid gap-6">
            {tenants.map((tenant) => (
              <Card key={tenant.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Building2 className="h-5 w-5" />
                        {tenant.name}
                      </CardTitle>
                      <CardDescription>
                        {tenant.domain} • Created {tenant.created}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {getStatusBadge(tenant.status)}
                      {getPlanBadge(tenant.plan)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-4 mb-4">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{tenant.users}</div>
                      <div className="text-sm text-muted-foreground">Users</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{tenant.transactions}</div>
                      <div className="text-sm text-muted-foreground">Transactions</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{tenant.storage}</div>
                      <div className="text-sm text-muted-foreground">Storage</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{tenant.plan}</div>
                      <div className="text-sm text-muted-foreground">Plan</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Settings className="w-3 h-3 mr-1" />
                      Configure
                    </Button>
                    <Button size="sm" variant="outline">
                      <BarChart3 className="w-3 h-3 mr-1" />
                      Analytics
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600">
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="isolation" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Data Isolation Strategy</CardTitle>
                <CardDescription>
                  Configure how tenant data is isolated
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Isolation Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select isolation level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="database">Separate Database</SelectItem>
                      <SelectItem value="schema">Separate Schema</SelectItem>
                      <SelectItem value="table">Shared Table (Row-level)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Encryption at Rest</Label>
                    <p className="text-sm text-muted-foreground">Encrypt tenant data</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Cross-tenant Access Prevention</Label>
                    <p className="text-sm text-muted-foreground">Strict tenant boundaries</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Audit Logging</Label>
                    <p className="text-sm text-muted-foreground">Log all data access</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Policies</CardTitle>
                <CardDescription>
                  Tenant-specific security configurations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Password Policy</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select policy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic (8+ chars)</SelectItem>
                      <SelectItem value="standard">Standard (12+ chars, mixed)</SelectItem>
                      <SelectItem value="strict">Strict (16+ chars, complex)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Session Timeout</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30m">30 minutes</SelectItem>
                      <SelectItem value="1h">1 hour</SelectItem>
                      <SelectItem value="4h">4 hours</SelectItem>
                      <SelectItem value="8h">8 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Multi-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require MFA for all users</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>IP Whitelisting</Label>
                    <p className="text-sm text-muted-foreground">Restrict by IP address</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Resource Allocation</CardTitle>
                <CardDescription>
                  Configure resource limits per tenant
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Select Tenant</Label>
                  <Select value={selectedTenant} onValueChange={setSelectedTenant}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {tenants.map((tenant) => (
                        <SelectItem key={tenant.id} value={tenant.id}>
                          {tenant.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>CPU Limit (%)</Label>
                  <Input type="number" placeholder="100" />
                </div>
                <div>
                  <Label>Memory Limit (GB)</Label>
                  <Input type="number" placeholder="16" />
                </div>
                <div>
                  <Label>Storage Limit (GB)</Label>
                  <Input type="number" placeholder="500" />
                </div>
                <div>
                  <Label>Bandwidth Limit (TB/month)</Label>
                  <Input type="number" placeholder="10" />
                </div>
                <Button className="w-full">Update Limits</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Usage</CardTitle>
                <CardDescription>
                  Real-time resource consumption
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resourceUsage.map((resource, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{resource.name}</span>
                        <span>{resource.value}{resource.unit} / {resource.max}{resource.unit}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(resource.value / resource.max) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Usage-Based Billing</CardTitle>
                <CardDescription>
                  Configure billing models and pricing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Billing Model</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="subscription">Monthly Subscription</SelectItem>
                      <SelectItem value="usage">Pay-per-transaction</SelectItem>
                      <SelectItem value="hybrid">Hybrid (Base + Usage)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Price per Transaction ($)</Label>
                  <Input type="number" step="0.01" placeholder="0.05" />
                </div>
                <div>
                  <Label>Monthly Base Fee ($)</Label>
                  <Input type="number" placeholder="1000" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Volume Discounts</Label>
                    <p className="text-sm text-muted-foreground">Apply bulk pricing</p>
                  </div>
                  <Switch />
                </div>
                <Button className="w-full">Update Billing</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>
                  Monthly revenue by tenant
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tenants.map((tenant) => (
                    <div key={tenant.id} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{tenant.name}</h4>
                        <p className="text-sm text-muted-foreground">{tenant.plan} plan</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          ${tenant.plan === 'enterprise' ? '5,200' : 
                            tenant.plan === 'professional' ? '2,800' : '980'}
                        </div>
                        <div className="text-xs text-muted-foreground">This month</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Revenue</span>
                    <span className="text-lg font-bold">$8,980</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MultiTenantArchitecture;
