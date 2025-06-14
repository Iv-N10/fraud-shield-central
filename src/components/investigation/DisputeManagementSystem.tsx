
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Clock, CheckCircle, AlertTriangle, DollarSign, Search } from 'lucide-react';

interface Dispute {
  id: string;
  transactionId: string;
  customerName: string;
  amount: number;
  reason: string;
  status: 'pending' | 'investigating' | 'resolved';
  daysOpen: number;
  priority: 'low' | 'medium' | 'high';
  merchantName: string;
}

export default function DisputeManagementSystem() {
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const disputes: Dispute[] = [
    {
      id: 'DISP-001',
      transactionId: 'TXN-789456',
      customerName: 'John Smith',
      amount: 250.00,
      reason: 'Unauthorized Transaction',
      status: 'pending',
      daysOpen: 3,
      priority: 'high',
      merchantName: 'Online Store ABC'
    },
    {
      id: 'DISP-002', 
      transactionId: 'TXN-654321',
      customerName: 'Mary Johnson',
      amount: 75.50,
      reason: 'Item Not Received',
      status: 'investigating',
      daysOpen: 7,
      priority: 'medium',
      merchantName: 'Electronics Plus'
    },
    {
      id: 'DISP-003',
      transactionId: 'TXN-987654',
      customerName: 'Robert Brown',
      amount: 500.00,
      reason: 'Duplicate Charge',
      status: 'resolved',
      daysOpen: 0,
      priority: 'low',
      merchantName: 'Travel Agency XYZ'
    }
  ];

  const disputeMetrics = [
    { label: 'Open Disputes', value: '15', icon: FileText, color: 'text-amber-600' },
    { label: 'Avg Resolution Time', value: '4.2 days', icon: Clock, color: 'text-blue-600' },
    { label: 'Resolution Rate', value: '94%', icon: CheckCircle, color: 'text-green-600' },
    { label: 'Amount in Dispute', value: '$12,450', icon: DollarSign, color: 'text-red-600' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'investigating':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'border-amber-500 text-amber-600 bg-amber-50';
      case 'investigating':
        return 'border-blue-500 text-blue-600 bg-blue-50';
      case 'resolved':
        return 'border-green-500 text-green-600 bg-green-50';
      default:
        return 'border-gray-500 text-gray-600 bg-gray-50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'secondary';
      case 'low':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const filteredDisputes = disputes.filter(dispute =>
    dispute.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dispute.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dispute.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {disputeMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                </div>
                <metric.icon className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Dispute Queue Management
          </CardTitle>
          <CardDescription>
            End-to-end chargeback and dispute handling workflow
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search disputes..." 
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button>New Dispute</Button>
            </div>
            
            <div className="space-y-3">
              {filteredDisputes.map((dispute) => (
                <div key={dispute.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(dispute.status)}
                      <h3 className="font-medium">{dispute.id}</h3>
                      <Badge variant={getPriorityColor(dispute.priority)}>
                        {dispute.priority}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(dispute.status)}>
                        {dispute.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {dispute.customerName} • {dispute.reason} • ${dispute.amount}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Transaction: {dispute.transactionId} • Merchant: {dispute.merchantName}
                      {dispute.status !== 'resolved' && ` • ${dispute.daysOpen} days open`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedDispute(dispute)}
                    >
                      View Details
                    </Button>
                    {dispute.status === 'pending' && (
                      <Button size="sm">
                        Start Investigation
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              
              {filteredDisputes.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4" />
                  <p>No disputes found matching your search</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dispute Response Templates</CardTitle>
          <CardDescription>
            Pre-configured responses for common dispute scenarios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-20 flex flex-col">
              <span className="font-medium">Unauthorized Transaction</span>
              <span className="text-xs text-muted-foreground">Standard fraud investigation response</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col">
              <span className="font-medium">Item Not Received</span>
              <span className="text-xs text-muted-foreground">Merchant delivery verification</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col">
              <span className="font-medium">Duplicate Charge</span>
              <span className="text-xs text-muted-foreground">Transaction verification response</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col">
              <span className="font-medium">Service Dispute</span>
              <span className="text-xs text-muted-foreground">Quality/service issue template</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
