
import React, { useState } from 'react';
import { Search, Filter, Download, Eye, ArrowUpDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const userTransactions = [
  {
    id: 'TXN-001',
    date: '2024-01-15',
    type: 'deposit',
    amount: 1500.00,
    status: 'completed',
    description: 'Bank Transfer Deposit',
    reference: 'REF123456789',
    fee: 0.00,
    account: 'Checking ****1234'
  },
  {
    id: 'TXN-002',
    date: '2024-01-14',
    type: 'withdrawal',
    amount: 250.00,
    status: 'completed',
    description: 'ATM Withdrawal',
    reference: 'REF123456788',
    fee: 2.50,
    account: 'Checking ****1234'
  },
  {
    id: 'TXN-003',
    date: '2024-01-13',
    type: 'transfer',
    amount: 500.00,
    status: 'pending',
    description: 'Transfer to Savings',
    reference: 'REF123456787',
    fee: 0.00,
    account: 'Checking ****1234'
  },
  {
    id: 'TXN-004',
    date: '2024-01-12',
    type: 'payment',
    amount: 89.99,
    status: 'completed',
    description: 'Online Purchase - Amazon',
    reference: 'REF123456786',
    fee: 0.00,
    account: 'Credit ****5678'
  },
  {
    id: 'TXN-005',
    date: '2024-01-11',
    type: 'deposit',
    amount: 2500.00,
    status: 'flagged',
    description: 'Large Cash Deposit',
    reference: 'REF123456785',
    fee: 0.00,
    account: 'Checking ****1234'
  }
];

export default function MyTransactions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<any | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);

  // Filter transactions
  const filteredTransactions = userTransactions.filter(transaction => {
    const matchesSearch = 
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus ? transaction.status === selectedStatus : true;
    
    return matchesSearch && matchesStatus;
  });

  // Sort transactions
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="outline" className="border-green-500 text-green-600">Completed</Badge>;
      case 'pending':
        return <Badge variant="default" className="bg-amber-500">Pending</Badge>;
      case 'flagged':
        return <Badge variant="destructive">Flagged</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    const iconClass = "w-4 h-4";
    switch (type) {
      case 'deposit':
        return <div className={`${iconClass} rounded-full bg-green-100 text-green-600 flex items-center justify-center`}>↓</div>;
      case 'withdrawal':
        return <div className={`${iconClass} rounded-full bg-red-100 text-red-600 flex items-center justify-center`}>↑</div>;
      case 'transfer':
        return <div className={`${iconClass} rounded-full bg-blue-100 text-blue-600 flex items-center justify-center`}>⇄</div>;
      case 'payment':
        return <div className={`${iconClass} rounded-full bg-purple-100 text-purple-600 flex items-center justify-center`}>$</div>;
      default:
        return <div className={`${iconClass} rounded-full bg-gray-100 text-gray-600 flex items-center justify-center`}>?</div>;
    }
  };

  const handleViewDetails = (transaction: any) => {
    setSelectedTransaction(transaction);
    setShowDetailsDialog(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Transactions</h1>
        <p className="text-muted-foreground">View and manage your transaction history</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deposits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,000.00</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Withdrawals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$252.50</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Transaction</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flagged</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Transaction</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Transaction History</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          <CardDescription>
            Your complete transaction history
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
                <DropdownMenuItem onClick={() => setSelectedStatus(null)}>
                  All Status
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatus('completed')}>
                  Completed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatus('pending')}>
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatus('flagged')}>
                  Flagged
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
                      Type
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
                    <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Description
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
                    <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                    <th className="py-3 px-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-background divide-y divide-border">
                  {sortedTransactions.map((transaction) => (
                    <tr 
                      key={transaction.id} 
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(transaction.type)}
                          <span className="capitalize text-sm">{transaction.type}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm font-mono">
                        {transaction.id}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm">
                        {transaction.date}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {transaction.description}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm font-medium">
                        ${transaction.amount.toFixed(2)}
                        {transaction.fee > 0 && (
                          <div className="text-xs text-muted-foreground">
                            Fee: ${transaction.fee.toFixed(2)}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        {getStatusBadge(transaction.status)}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewDetails(transaction)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>
              Complete information about transaction {selectedTransaction?.id}
            </DialogDescription>
          </DialogHeader>
          
          {selectedTransaction && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Transaction ID</h4>
                  <p className="font-mono">{selectedTransaction.id}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Reference</h4>
                  <p className="font-mono">{selectedTransaction.reference}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Date & Time</h4>
                  <p>{selectedTransaction.date}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Status</h4>
                  {getStatusBadge(selectedTransaction.status)}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Type</h4>
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(selectedTransaction.type)}
                    <span className="capitalize">{selectedTransaction.type}</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Account</h4>
                  <p>{selectedTransaction.account}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Amount</h4>
                  <p className="text-lg font-bold">${selectedTransaction.amount.toFixed(2)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Fee</h4>
                  <p>${selectedTransaction.fee.toFixed(2)}</p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Description</h4>
                <p>{selectedTransaction.description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
