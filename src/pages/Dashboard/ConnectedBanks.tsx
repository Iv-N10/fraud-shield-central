
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  MoreHorizontal, 
  Plus, 
  Search,
  Shield,
  Activity,
  AlertTriangle,
  CheckCircle,
  Settings,
  Trash2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

// Sample data for connected banks
const connectedBanks = [
  {
    id: 1,
    name: "First National Bank",
    status: "active",
    integration: "REST API",
    connected: "2024-01-15",
    lastActivity: "2 minutes ago",
    transactionsToday: 1247,
    fraudDetected: 3,
    riskScore: 12
  },
  {
    id: 2,
    name: "Global Trust Bank",
    status: "active",
    integration: "SWIFT",
    connected: "2024-01-10",
    lastActivity: "5 minutes ago",
    transactionsToday: 892,
    fraudDetected: 1,
    riskScore: 8
  },
  {
    id: 3,
    name: "Metropolitan Credit Union",
    status: "warning",
    integration: "ISO 20022",
    connected: "2024-01-05",
    lastActivity: "1 hour ago",
    transactionsToday: 456,
    fraudDetected: 7,
    riskScore: 45
  },
  {
    id: 4,
    name: "Regional Savings Bank",
    status: "inactive",
    integration: "REST API",
    connected: "2023-12-20",
    lastActivity: "3 days ago",
    transactionsToday: 0,
    fraudDetected: 0,
    riskScore: 0
  }
];

const ConnectedBanks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBank, setSelectedBank] = useState<any>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const { toast } = useToast();

  const filteredBanks = connectedBanks.filter(bank =>
    bank.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-600 border-green-200">Active</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-600 border-yellow-200">Warning</Badge>;
      case 'inactive':
        return <Badge className="bg-red-100 text-red-600 border-red-200">Inactive</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'inactive':
        return <Shield className="h-4 w-4 text-red-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleViewDetails = (bank: any) => {
    setSelectedBank(bank);
    setShowDetailsDialog(true);
  };

  const handleDisconnectBank = (bankId: number) => {
    toast({
      title: "Bank Disconnected",
      description: "The bank has been successfully disconnected from FraudShield.",
    });
  };

  const totalTransactions = connectedBanks.reduce((sum, bank) => sum + bank.transactionsToday, 0);
  const totalFraudDetected = connectedBanks.reduce((sum, bank) => sum + bank.fraudDetected, 0);
  const activeBanks = connectedBanks.filter(bank => bank.status === 'active').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Connected Banks</h1>
        <p className="text-muted-foreground">Manage and monitor your connected banking institutions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connected Banks</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{connectedBanks.length}</div>
            <p className="text-xs text-muted-foreground">{activeBanks} active</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions Today</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTransactions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all banks</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fraud Detected</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFraudDetected}</div>
            <p className="text-xs text-muted-foreground">Prevented today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">99.8%</div>
            <p className="text-xs text-muted-foreground">Uptime</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Bank Connections</CardTitle>
              <CardDescription>
                Monitor and manage all connected banking institutions
              </CardDescription>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Connect New Bank
            </Button>
          </div>
          
          <div className="flex items-center space-x-2 mt-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search banks..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredBanks.map((bank) => (
              <Card key={bank.id} className="border border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Building2 className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{bank.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Connected via {bank.integration} • {bank.connected}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      {getStatusBadge(bank.status)}
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDetails(bank)}>
                            <Settings className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Settings className="w-4 h-4 mr-2" />
                            Configure
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDisconnectBank(bank.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Disconnect
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(bank.status)}
                      <div>
                        <p className="text-sm font-medium">Last Activity</p>
                        <p className="text-xs text-muted-foreground">{bank.lastActivity}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium">Transactions Today</p>
                      <p className="text-lg font-bold text-blue-600">{bank.transactionsToday.toLocaleString()}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium">Fraud Detected</p>
                      <p className="text-lg font-bold text-red-600">{bank.fraudDetected}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium">Risk Score</p>
                      <p className={`text-lg font-bold ${
                        bank.riskScore > 30 ? 'text-red-600' : 
                        bank.riskScore > 15 ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {bank.riskScore}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bank Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Bank Connection Details</DialogTitle>
            <DialogDescription>
              Detailed information about {selectedBank?.name}
            </DialogDescription>
          </DialogHeader>
          
          {selectedBank && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Bank Name</h4>
                  <p>{selectedBank.name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Status</h4>
                  {getStatusBadge(selectedBank.status)}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Integration Type</h4>
                  <p>{selectedBank.integration}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Connected Date</h4>
                  <p>{selectedBank.connected}</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium mb-2">Today's Activity</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Transactions</p>
                    <p className="text-lg font-bold">{selectedBank.transactionsToday.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fraud Detected</p>
                    <p className="text-lg font-bold text-red-600">{selectedBank.fraudDetected}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Risk Score</p>
                    <p className="text-lg font-bold">{selectedBank.riskScore}%</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
              Close
            </Button>
            <Button>Configure Settings</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConnectedBanks;
