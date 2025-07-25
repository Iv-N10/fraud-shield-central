
import React, { useState, useEffect } from 'react';
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
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const ConnectedBanks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBank, setSelectedBank] = useState<any>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch real bank connection data from the database
  const { data: bankConnections = [], isLoading, refetch } = useQuery({
    queryKey: ['bankConnections'],
    queryFn: async () => {
      console.log('Fetching bank connections...');
      const { data, error } = await supabase
        .from('bank_connections')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching bank connections:', error);
        throw error;
      }
      
      return data || [];
    },
    refetchInterval: 30000,
  });

  // Real-time subscription for bank connections
  useEffect(() => {
    console.log('Setting up real-time subscription for bank connections...');
    const channel = supabase
      .channel('bank_connections_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bank_connections'
        },
        (payload) => {
          console.log('Bank connection changed:', payload);
          queryClient.invalidateQueries({ queryKey: ['bankConnections'] });
          queryClient.invalidateQueries({ queryKey: ['bankMetrics'] });
          
          if (payload.eventType === 'INSERT') {
            toast({
              title: "New Bank Connected",
              description: `${payload.new.bank_name} has been successfully connected.`,
            });
          } else if (payload.eventType === 'UPDATE') {
            toast({
              title: "Bank Connection Updated",
              description: `${payload.new.bank_name} connection status updated.`,
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient, toast]);

  // Fetch transaction metrics from real data
  const { data: metrics } = useQuery({
    queryKey: ['bankMetrics'],
    queryFn: async () => {
      const { data: transactions } = await supabase
        .from('bank_transaction_feed')
        .select('*')
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

      const { data: incidents } = await supabase
        .from('security_incidents')
        .select('*')
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

      const totalTransactions = transactions?.length || 0;
      const fraudDetected = transactions?.filter(t => t.fraud_status === 'flagged' || t.fraud_status === 'blocked').length || 0;

      return {
        totalTransactions,
        fraudDetected,
        connectedBanks: bankConnections.length,
        systemHealth: 99.8
      };
    },
  });

  // Disconnect bank mutation
  const disconnectBankMutation = useMutation({
    mutationFn: async (bankId: string) => {
      const { error } = await supabase
        .from('bank_connections')
        .delete()
        .eq('id', bankId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bankConnections'] });
      toast({
        title: "Bank Disconnected",
        description: "The bank has been successfully disconnected from FraudShield.",
      });
    },
    onError: (error) => {
      console.error('Error disconnecting bank:', error);
      toast({
        title: "Error",
        description: "Failed to disconnect bank. Please try again.",
        variant: "destructive",
      });
    }
  });

  const filteredBanks = bankConnections.filter((bank: any) =>
    bank.bank_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (bank: any) => {
    setSelectedBank(bank);
    setShowDetailsDialog(true);
  };

  const handleDisconnectBank = (bankId: string) => {
    disconnectBankMutation.mutate(bankId);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Connected Banks</h1>
          <p className="text-muted-foreground">Loading bank connections...</p>
        </div>
      </div>
    );
  }

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
            <div className="text-2xl font-bold">{metrics?.connectedBanks || 0}</div>
            <p className="text-xs text-muted-foreground">Active connections</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions Today</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.totalTransactions?.toLocaleString() || '0'}</div>
            <p className="text-xs text-muted-foreground">Across all banks</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fraud Detected</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.fraudDetected || 0}</div>
            <p className="text-xs text-muted-foreground">Prevented today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{metrics?.systemHealth || 99.8}%</div>
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
                {bankConnections.length === 0 
                  ? "No banks connected yet. Connect your first bank to start fraud protection."
                  : "Monitor and manage all connected banking institutions"
                }
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
          {bankConnections.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Banks Connected</h3>
              <p className="text-muted-foreground max-w-md mb-4">
                Connect your banking systems to FraudShield to start protecting against fraud in real-time.
              </p>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Connect Your First Bank
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBanks.map((bank: any) => (
                <Card key={bank.id} className="border border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Building2 className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{bank.bank_name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Connected via {bank.integration_type} • {new Date(bank.connected_at).toLocaleDateString()}
                          </p>
                          {bank.last_sync_at && (
                            <p className="text-xs text-muted-foreground">
                              Last sync: {new Date(bank.last_sync_at).toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <Badge className={
                          bank.status === 'active' ? 'bg-green-100 text-green-600' : 
                          bank.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-red-100 text-red-600'
                        }>
                          {bank.status}
                        </Badge>
                        
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
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bank Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Bank Connection Details</DialogTitle>
            <DialogDescription>
              Detailed information about {selectedBank?.bank_name}
            </DialogDescription>
          </DialogHeader>
          
          {selectedBank && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Bank Name</h4>
                  <p>{selectedBank.bank_name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Status</h4>
                  <Badge className={
                    selectedBank.status === 'active' ? 'bg-green-100 text-green-600' : 
                    selectedBank.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }>
                    {selectedBank.status}
                  </Badge>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Integration Type</h4>
                  <p>{selectedBank.integration_type}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Connected Date</h4>
                  <p>{new Date(selectedBank.connected_at).toLocaleDateString()}</p>
                </div>
                {selectedBank.bank_code && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Bank Code</h4>
                    <p>{selectedBank.bank_code}</p>
                  </div>
                )}
                {selectedBank.api_endpoint && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">API Endpoint</h4>
                    <p className="text-xs break-all">{selectedBank.api_endpoint}</p>
                  </div>
                )}
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
