
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  Clock, 
  User, 
  AlertTriangle,
  CheckCircle,
  Eye,
  MoreHorizontal
} from 'lucide-react';

interface Investigation {
  id: string;
  transactionId: string;
  userId: string;
  amount: number;
  riskScore: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in-progress' | 'resolved' | 'escalated';
  assignee?: string;
  createdAt: string;
  type: 'fraud_alert' | 'velocity_check' | 'device_anomaly' | 'pattern_match';
  description: string;
  estimatedTime: number; // minutes
}

export default function InvestigationQueue() {
  const [investigations, setInvestigations] = useState<Investigation[]>([
    {
      id: 'INV-001',
      transactionId: 'TXN-789123',
      userId: 'user_12345',
      amount: 2500,
      riskScore: 95,
      priority: 'critical',
      status: 'pending',
      createdAt: new Date(Date.now() - 300000).toISOString(),
      type: 'fraud_alert',
      description: 'High-risk transaction from new device in different country',
      estimatedTime: 30
    },
    {
      id: 'INV-002',
      transactionId: 'TXN-456789',
      userId: 'user_67890',
      amount: 150,
      riskScore: 78,
      priority: 'high',
      status: 'in-progress',
      assignee: 'John Doe',
      createdAt: new Date(Date.now() - 600000).toISOString(),
      type: 'velocity_check',
      description: 'Multiple transactions in short timeframe',
      estimatedTime: 15
    },
    {
      id: 'INV-003',
      transactionId: 'TXN-321654',
      userId: 'user_54321',
      amount: 75,
      riskScore: 65,
      priority: 'medium',
      status: 'pending',
      createdAt: new Date(Date.now() - 900000).toISOString(),
      type: 'device_anomaly',
      description: 'New device fingerprint detected',
      estimatedTime: 10
    },
    {
      id: 'INV-004',
      transactionId: 'TXN-987654',
      userId: 'user_98765',
      amount: 1200,
      riskScore: 85,
      priority: 'high',
      status: 'escalated',
      assignee: 'Sarah Smith',
      createdAt: new Date(Date.now() - 1200000).toISOString(),
      type: 'pattern_match',
      description: 'Transaction matches known fraud pattern',
      estimatedTime: 45
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-600 text-white';
      case 'high':
        return 'bg-red-500 text-white';
      case 'medium':
        return 'bg-amber-500 text-white';
      default:
        return 'bg-blue-500 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'escalated':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'fraud_alert':
        return 'Fraud Alert';
      case 'velocity_check':
        return 'Velocity Check';
      case 'device_anomaly':
        return 'Device Anomaly';
      case 'pattern_match':
        return 'Pattern Match';
      default:
        return 'Unknown';
    }
  };

  const filteredInvestigations = investigations.filter(inv => {
    const matchesStatus = filterStatus === 'all' || inv.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || inv.priority === filterPriority;
    const matchesSearch = searchTerm === '' || 
      inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.userId.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const assignInvestigation = (invId: string, assignee: string) => {
    setInvestigations(prev => prev.map(inv => 
      inv.id === invId 
        ? { ...inv, assignee, status: 'in-progress' as const }
        : inv
    ));
  };

  const resolveInvestigation = (invId: string) => {
    setInvestigations(prev => prev.map(inv => 
      inv.id === invId 
        ? { ...inv, status: 'resolved' as const }
        : inv
    ));
  };

  const queueStats = {
    pending: investigations.filter(i => i.status === 'pending').length,
    inProgress: investigations.filter(i => i.status === 'in-progress').length,
    avgWaitTime: '8.5 minutes',
    totalQueue: investigations.length
  };

  return (
    <div className="space-y-6">
      {/* Queue Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-amber-600">{queueStats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">{queueStats.inProgress}</p>
              </div>
              <User className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Wait Time</p>
                <p className="text-2xl font-bold">{queueStats.avgWaitTime}</p>
              </div>
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Queue</p>
                <p className="text-2xl font-bold">{queueStats.totalQueue}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search investigations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="escalated">Escalated</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Investigation Queue */}
      <Card>
        <CardHeader>
          <CardTitle>Investigation Queue</CardTitle>
          <CardDescription>Prioritized list of investigations requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredInvestigations
              .sort((a, b) => {
                const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
                return priorityOrder[b.priority] - priorityOrder[a.priority];
              })
              .map((investigation) => (
                <div key={investigation.id} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div>
                        <h4 className="font-medium">{investigation.id}</h4>
                        <p className="text-sm text-muted-foreground">{investigation.transactionId}</p>
                      </div>
                      <Badge variant="outline">
                        {getTypeLabel(investigation.type)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(investigation.priority)}>
                        {investigation.priority}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(investigation.status)}>
                        {investigation.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-sm mb-3">{investigation.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-muted-foreground">User:</span>
                      <div className="font-medium">{investigation.userId}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Amount:</span>
                      <div className="font-medium">${investigation.amount.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Risk Score:</span>
                      <div className="font-medium">{investigation.riskScore}%</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Est. Time:</span>
                      <div className="font-medium">{investigation.estimatedTime}min</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Created:</span>
                      <div className="font-medium">{new Date(investigation.createdAt).toLocaleTimeString()}</div>
                    </div>
                  </div>
                  
                  {investigation.assignee && (
                    <div className="text-sm mb-3">
                      <span className="text-muted-foreground">Assigned to:</span>
                      <span className="font-medium ml-1">{investigation.assignee}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    {investigation.status === 'pending' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => assignInvestigation(investigation.id, 'Current User')}
                      >
                        Assign to Me
                      </Button>
                    )}
                    
                    {investigation.status === 'in-progress' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => resolveInvestigation(investigation.id)}
                      >
                        Mark Resolved
                      </Button>
                    )}
                    
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      View Details
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <MoreHorizontal className="h-3 w-3" />
                      Actions
                    </Button>
                  </div>
                </div>
              ))}
            
            {filteredInvestigations.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <AlertTriangle className="h-12 w-12 mx-auto mb-4" />
                <p>No investigations match the current filters</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
