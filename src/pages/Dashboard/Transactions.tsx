
import React, { useState } from 'react';
import { Search, Filter, AlertTriangle, ArrowUpDown, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import TransactionAnalysis from '@/components/TransactionAnalysis';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Sample data for transactions
const generateTransactions = () => {
  const types = ['deposit', 'withdrawal', 'transfer', 'payment'];
  const statuses = ['completed', 'pending', 'flagged'];
  const users = ['John Smith', 'Mary Johnson', 'Robert Williams', 'Linda Davis', 'James Brown'];
  
  return Array.from({ length: 50 }, (_, i) => {
    const type = types[Math.floor(Math.random() * types.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const user = users[Math.floor(Math.random() * users.length)];
    const amount = Math.floor(Math.random() * 10000) + 100;
    const riskScore = Math.floor(Math.random() * 100);
    
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    return {
      id: `TRX-${1000 + i}`,
      date: date.toISOString().split('T')[0],
      type,
      user,
      amount: amount / 100,
      status,
      riskScore,
      source_account: `ACC-${10000 + Math.floor(Math.random() * 1000)}`,
      destination_account: `ACC-${20000 + Math.floor(Math.random() * 1000)}`,
      currency: 'USD',
      country: ['US', 'UK', 'CA', 'AU', 'JP'][Math.floor(Math.random() * 5)],
      ip_address: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      device_id: `DEV-${Math.floor(Math.random() * 10000)}`,
      user_agent: ['Mobile App', 'Web Browser', 'Desktop App'][Math.floor(Math.random() * 3)],
    };
  });
};

const transactions = generateTransactions();

export default function Transactions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<any | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<any | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();
  
  // Filtering transactions based on search term and selected status
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus ? transaction.status === selectedStatus : true;
    
    return matchesSearch && matchesStatus;
  });
  
  // Sorting transactions
  const sortedTransactions = React.useMemo(() => {
    let sortableTransactions = [...filteredTransactions];
    if (sortConfig !== null) {
      sortableTransactions.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableTransactions;
  }, [filteredTransactions, sortConfig]);
  
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const handleViewDetails = (transaction: any) => {
    setSelectedTransaction(transaction);
    setShowDetailsDialog(true);
    setAiAnalysis(null); // Reset AI analysis when viewing a new transaction
  };
  
  const handleAnalyzeTransaction = async () => {
    if (!selectedTransaction) return;
    
    setIsAnalyzing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('fraud-ai', {
        body: { 
          action: 'analyze_transaction',
          data: selectedTransaction 
        }
      });
      
      if (error) throw new Error(error.message);
      
      setAiAnalysis(data.analysis);
      
      // Show success toast
      toast({
        title: "Analysis Complete",
        description: "Transaction has been analyzed by FraudShield AI",
      });
    } catch (error) {
      console.error('Error analyzing transaction:', error);
      toast({
        title: "Analysis Failed",
        description: "Could not complete the AI analysis",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const getRiskBadge = (score: number) => {
    if (score >= 70) {
      return <Badge variant="destructive">High Risk</Badge>;
    } else if (score >= 30) {
      return <Badge variant="default" className="bg-amber-500">Medium Risk</Badge>;
    } else {
      return <Badge variant="outline" className="border-green-500 text-green-600">Low Risk</Badge>;
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'flagged':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Transaction Monitoring</h1>
        <p className="text-muted-foreground">Monitor and analyze transaction activity</p>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Transactions</CardTitle>
            <Tabs defaultValue="all" className="self-start">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="flagged">Flagged</TabsTrigger>
                <TabsTrigger value="high-risk">High Risk</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <CardDescription>
            View and monitor all transactions in real-time
          </CardDescription>
          
          <div className="flex flex-col gap-4 mt-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search transactions..." 
                className="pl-8" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="p-2">
                  <h4 className="font-medium mb-2">Status</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="status-all"
                        name="status"
                        className="mr-2"
                        checked={selectedStatus === null}
                        onChange={() => setSelectedStatus(null)}
                      />
                      <Label htmlFor="status-all">All</Label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="status-completed"
                        name="status"
                        className="mr-2"
                        checked={selectedStatus === 'completed'}
                        onChange={() => setSelectedStatus('completed')}
                      />
                      <Label htmlFor="status-completed">Completed</Label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="status-pending"
                        name="status"
                        className="mr-2"
                        checked={selectedStatus === 'pending'}
                        onChange={() => setSelectedStatus('pending')}
                      />
                      <Label htmlFor="status-pending">Pending</Label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="status-flagged"
                        name="status"
                        className="mr-2"
                        checked={selectedStatus === 'flagged'}
                        onChange={() => setSelectedStatus('flagged')}
                      />
                      <Label htmlFor="status-flagged">Flagged</Label>
                    </div>
                  </div>
                </div>
                <DropdownMenuItem className="justify-end">
                  <Button variant="outline" size="sm" onClick={() => setSelectedStatus(null)}>
                    Reset Filters
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                    <th 
                      className="py-3 px-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('id')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Transaction ID</span>
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th 
                      className="py-3 px-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('date')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Date</span>
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th 
                      className="py-3 px-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('user')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Customer</span>
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th 
                      className="py-3 px-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('type')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Type</span>
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th 
                      className="py-3 px-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('amount')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Amount</span>
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th 
                      className="py-3 px-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('riskScore')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Risk Score</span>
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="py-3 px-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-background divide-y divide-border">
                  {sortedTransactions.slice(0, 10).map((transaction) => (
                    <tr 
                      key={transaction.id} 
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-3 px-4 whitespace-nowrap">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              {getStatusIcon(transaction.status)}
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="capitalize">{transaction.status}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm">
                        {transaction.id}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm">
                        {transaction.date}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm">
                        {transaction.user}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm capitalize">
                        {transaction.type}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm">
                        ${transaction.amount.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        {getRiskBadge(transaction.riskScore)}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewDetails(transaction)}
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {sortedTransactions.length === 0 && (
              <div className="p-8 text-center">
                <p className="text-muted-foreground">No transactions found</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {Math.min(10, sortedTransactions.length)} of {sortedTransactions.length} transactions
          </p>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled={sortedTransactions.length <= 10}>
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      {/* Transaction Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>
              Complete information about transaction {selectedTransaction?.id}
            </DialogDescription>
          </DialogHeader>
          
          {selectedTransaction && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Transaction ID</h4>
                      <p>{selectedTransaction.id}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Date</h4>
                      <p>{selectedTransaction.date}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Status</h4>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(selectedTransaction.status)}
                        <span className="capitalize">{selectedTransaction.status}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Risk Assessment</h4>
                      {getRiskBadge(selectedTransaction.riskScore)}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3">Customer Information</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Name</h4>
                        <p>{selectedTransaction.user}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Account Type</h4>
                        <p>Personal</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Verification Status</h4>
                        <Badge variant="outline" className="border-green-500 text-green-600">Verified</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3">Transaction Details</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Type</h4>
                        <p className="capitalize">{selectedTransaction.type}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Amount</h4>
                        <p className="font-medium">${selectedTransaction.amount.toFixed(2)}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Source Account</h4>
                        <p>{selectedTransaction.source_account}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Destination Account</h4>
                        <p>{selectedTransaction.destination_account}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Currency</h4>
                        <p>{selectedTransaction.currency}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Country</h4>
                        <p>{selectedTransaction.country}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3">Device Information</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Device ID</h4>
                        <p>{selectedTransaction.device_id}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">IP Address</h4>
                        <p>{selectedTransaction.ip_address}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">User Agent</h4>
                        <p>{selectedTransaction.user_agent}</p>
                      </div>
                    </div>
                  </div>
                  
                  {selectedTransaction.status === 'flagged' && (
                    <>
                      <Separator />
                      <div>
                        <h4 className="text-sm font-medium mb-2">Risk Factors</h4>
                        <div className="bg-red-50 border border-red-100 rounded-md p-3 text-sm space-y-2">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-red-500" />
                            <p>Unusual transaction pattern detected</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-red-500" />
                            <p>Transaction amount exceeds typical customer range</p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                
                <div>
                  <TransactionAnalysis 
                    transactionId={selectedTransaction.id}
                    analysis={aiAnalysis}
                    isLoading={isAnalyzing}
                    onAnalyze={handleAnalyzeTransaction}
                  />
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <div className="flex justify-between w-full">
              <Button variant="outline">Download Report</Button>
              <div className="space-x-2">
                {selectedTransaction?.status === 'flagged' && (
                  <Button variant="destructive">Escalate</Button>
                )}
                <Button onClick={() => setShowDetailsDialog(false)}>Close</Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
