
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  FileText, 
  User, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Plus,
  Filter,
  Search,
  MessageSquare,
  Calendar
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Case {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  assignee: string;
  reporter: string;
  createdAt: string;
  updatedAt: string;
  type: 'fraud' | 'chargeback' | 'suspicious_activity' | 'account_takeover';
  relatedTransactions: number;
  estimatedLoss: number;
}

interface CaseNote {
  id: string;
  caseId: string;
  author: string;
  content: string;
  timestamp: string;
}

export default function CaseManagementSystem() {
  const [cases, setCases] = useState<Case[]>([
    {
      id: 'CASE-001',
      title: 'Suspicious Transaction Pattern',
      description: 'Multiple high-value transactions from same IP address in different countries',
      priority: 'high',
      status: 'investigating',
      assignee: 'John Doe',
      reporter: 'AI System',
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      updatedAt: new Date(Date.now() - 3600000).toISOString(),
      type: 'fraud',
      relatedTransactions: 15,
      estimatedLoss: 25000
    },
    {
      id: 'CASE-002',
      title: 'Account Takeover Investigation',
      description: 'User reports unauthorized access and password changes',
      priority: 'critical',
      status: 'open',
      assignee: 'Sarah Smith',
      reporter: 'Customer Support',
      createdAt: new Date(Date.now() - 1800000).toISOString(),
      updatedAt: new Date(Date.now() - 900000).toISOString(),
      type: 'account_takeover',
      relatedTransactions: 8,
      estimatedLoss: 12500
    },
    {
      id: 'CASE-003',
      title: 'Chargeback Analysis',
      description: 'High volume of chargebacks from specific merchant',
      priority: 'medium',
      status: 'resolved',
      assignee: 'Mike Johnson',
      reporter: 'Risk Team',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 1800000).toISOString(),
      type: 'chargeback',
      relatedTransactions: 23,
      estimatedLoss: 8750
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewCaseDialog, setShowNewCaseDialog] = useState(false);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [newCase, setNewCase] = useState({
    title: '',
    description: '',
    priority: 'medium',
    type: 'fraud',
    assignee: ''
  });

  const { toast } = useToast();

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
      case 'open':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'investigating':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <AlertTriangle className="h-4 w-4" />;
      case 'investigating':
        return <Clock className="h-4 w-4" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const filteredCases = cases.filter(c => {
    const matchesStatus = filterStatus === 'all' || c.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || c.priority === filterPriority;
    const matchesSearch = searchTerm === '' || 
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const createNewCase = () => {
    if (!newCase.title || !newCase.description) return;

    const caseData: Case = {
      id: `CASE-${String(cases.length + 1).padStart(3, '0')}`,
      title: newCase.title,
      description: newCase.description,
      priority: newCase.priority as any,
      status: 'open',
      assignee: newCase.assignee || 'Unassigned',
      reporter: 'Manual Entry',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      type: newCase.type as any,
      relatedTransactions: 0,
      estimatedLoss: 0
    };

    setCases(prev => [caseData, ...prev]);
    setNewCase({ title: '', description: '', priority: 'medium', type: 'fraud', assignee: '' });
    setShowNewCaseDialog(false);
    
    toast({
      title: "Case Created",
      description: `Case ${caseData.id} has been created successfully.`,
    });
  };

  const updateCaseStatus = (caseId: string, newStatus: string) => {
    setCases(prev => prev.map(c => 
      c.id === caseId 
        ? { ...c, status: newStatus as any, updatedAt: new Date().toISOString() }
        : c
    ));
    
    toast({
      title: "Case Updated",
      description: `Case ${caseId} status updated to ${newStatus}.`,
    });
  };

  const stats = {
    open: cases.filter(c => c.status === 'open').length,
    investigating: cases.filter(c => c.status === 'investigating').length,
    resolved: cases.filter(c => c.status === 'resolved').length,
    totalLoss: cases.reduce((sum, c) => sum + c.estimatedLoss, 0)
  };

  return (
    <div className="space-y-6">
      {/* Case Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Open Cases</p>
                <p className="text-2xl font-bold text-red-600">{stats.open}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Investigating</p>
                <p className="text-2xl font-bold text-amber-600">{stats.investigating}</p>
              </div>
              <Clock className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolved</p>
                <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Loss</p>
                <p className="text-2xl font-bold">${stats.totalLoss.toLocaleString()}</p>
              </div>
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search cases..."
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
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="investigating">Investigating</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
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

            <Dialog open={showNewCaseDialog} onOpenChange={setShowNewCaseDialog}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2 ml-auto">
                  <Plus className="h-4 w-4" />
                  New Case
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Case</DialogTitle>
                  <DialogDescription>
                    Create a new investigation case for fraud analysis
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={newCase.title}
                      onChange={(e) => setNewCase(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Case title"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      value={newCase.description}
                      onChange={(e) => setNewCase(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Detailed case description"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Priority</label>
                      <Select value={newCase.priority} onValueChange={(value) => setNewCase(prev => ({ ...prev, priority: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Type</label>
                      <Select value={newCase.type} onValueChange={(value) => setNewCase(prev => ({ ...prev, type: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fraud">Fraud</SelectItem>
                          <SelectItem value="chargeback">Chargeback</SelectItem>
                          <SelectItem value="suspicious_activity">Suspicious Activity</SelectItem>
                          <SelectItem value="account_takeover">Account Takeover</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Assignee</label>
                    <Input
                      value={newCase.assignee}
                      onChange={(e) => setNewCase(prev => ({ ...prev, assignee: e.target.value }))}
                      placeholder="Assign to team member"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowNewCaseDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={createNewCase}>Create Case</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Cases List */}
      <Card>
        <CardHeader>
          <CardTitle>Investigation Cases</CardTitle>
          <CardDescription>Active fraud investigation cases and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCases.map((case_) => (
              <div key={case_.id} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(case_.status)}
                    <div>
                      <h4 className="font-medium">{case_.title}</h4>
                      <p className="text-sm text-muted-foreground">{case_.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(case_.priority)}>
                      {case_.priority}
                    </Badge>
                    <Badge variant="outline" className={getStatusColor(case_.status)}>
                      {case_.status}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-sm mb-3">{case_.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Assignee:</span>
                    <div className="font-medium">{case_.assignee}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Transactions:</span>
                    <div className="font-medium">{case_.relatedTransactions}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Est. Loss:</span>
                    <div className="font-medium">${case_.estimatedLoss.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Updated:</span>
                    <div className="font-medium">{new Date(case_.updatedAt).toLocaleDateString()}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-3">
                  {case_.status !== 'resolved' && case_.status !== 'closed' && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateCaseStatus(case_.id, 'investigating')}
                        disabled={case_.status === 'investigating'}
                      >
                        Start Investigation
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateCaseStatus(case_.id, 'resolved')}
                      >
                        Mark Resolved
                      </Button>
                    </>
                  )}
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" />
                    Add Note
                  </Button>
                </div>
              </div>
            ))}
            
            {filteredCases.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4" />
                <p>No cases match the current filters</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
