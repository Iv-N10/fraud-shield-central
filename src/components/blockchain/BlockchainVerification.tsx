
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Link2, Hash, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BlockchainRecord {
  id: string;
  transactionHash: string;
  fraudReportId: string;
  blockNumber: number;
  timestamp: string;
  status: 'verified' | 'pending' | 'failed';
  gasUsed: number;
  confirmations: number;
}

export default function BlockchainVerification() {
  const [searchHash, setSearchHash] = useState('');
  const [records, setRecords] = useState<BlockchainRecord[]>([
    {
      id: '1',
      transactionHash: '0x1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a',
      fraudReportId: 'FR-2024-001',
      blockNumber: 18945672,
      timestamp: new Date(Date.now() - 300000).toISOString(),
      status: 'verified',
      gasUsed: 21000,
      confirmations: 15
    },
    {
      id: '2',
      transactionHash: '0x2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b',
      fraudReportId: 'FR-2024-002',
      blockNumber: 18945671,
      timestamp: new Date(Date.now() - 600000).toISOString(),
      status: 'verified',
      gasUsed: 42000,
      confirmations: 28
    },
    {
      id: '3',
      transactionHash: '0x3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c',
      fraudReportId: 'FR-2024-003',
      blockNumber: 18945670,
      timestamp: new Date(Date.now() - 900000).toISOString(),
      status: 'pending',
      gasUsed: 35000,
      confirmations: 3
    }
  ]);

  const [blockchainStats] = useState({
    totalRecords: 1247,
    verifiedToday: 23,
    pendingVerification: 5,
    networkFees: 0.0034
  });

  const { toast } = useToast();

  const handleSearch = () => {
    if (!searchHash) {
      toast({
        title: 'Search Required',
        description: 'Please enter a transaction hash to search',
        variant: 'destructive',
      });
      return;
    }

    // Simulate blockchain search
    toast({
      title: 'Searching Blockchain',
      description: 'Querying distributed ledger for transaction verification...',
    });

    setTimeout(() => {
      toast({
        title: 'Search Complete',
        description: 'Transaction found and verified on blockchain',
      });
    }, 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-500">Verified</Badge>;
      case 'pending':
        return <Badge className="bg-amber-500">Pending</Badge>;
      default:
        return <Badge variant="destructive">Failed</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Blockchain Status Alert */}
      <Alert>
        <Link2 className="h-4 w-4" />
        <AlertTitle>Blockchain Fraud Verification Active</AlertTitle>
        <AlertDescription>
          All fraud reports are immutably recorded on the Ethereum blockchain for permanent verification.
          Smart contracts ensure tamper-proof fraud detection records.
        </AlertDescription>
      </Alert>

      {/* Blockchain Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{blockchainStats.totalRecords}</div>
              <Hash className="h-5 w-5 text-blue-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">On-chain fraud reports</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Verified Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{blockchainStats.verifiedToday}</div>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">New verifications</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{blockchainStats.pendingVerification}</div>
              <Clock className="h-5 w-5 text-amber-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Awaiting confirmation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Network Fees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{blockchainStats.networkFees} ETH</div>
              <Link2 className="h-5 w-5 text-purple-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Average gas cost</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Transaction Search */}
        <Card>
          <CardHeader>
            <CardTitle>Blockchain Verification Search</CardTitle>
            <CardDescription>Look up fraud reports on the blockchain</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Transaction Hash</label>
              <Input
                value={searchHash}
                onChange={(e) => setSearchHash(e.target.value)}
                placeholder="0x..."
                className="font-mono text-sm"
              />
            </div>
            <Button onClick={handleSearch} className="w-full">
              <Hash className="h-4 w-4 mr-2" />
              Search Blockchain
            </Button>
          </CardContent>
        </Card>

        {/* Recent Blockchain Records */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Blockchain Records</CardTitle>
            <CardDescription>Latest fraud reports recorded on blockchain</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {records.map((record) => (
                <div key={record.id} className="flex items-start space-x-3 p-4 rounded-lg border">
                  <div className="mt-0.5">
                    {getStatusIcon(record.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{record.fraudReportId}</h4>
                      {getStatusBadge(record.status)}
                    </div>
                    <p className="text-xs text-muted-foreground font-mono mb-1">
                      {record.transactionHash.slice(0, 20)}...
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                      <span>Block: {record.blockNumber}</span>
                      <span>Gas: {record.gasUsed}</span>
                      <span>Confirmations: {record.confirmations}</span>
                      <span>{new Date(record.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
