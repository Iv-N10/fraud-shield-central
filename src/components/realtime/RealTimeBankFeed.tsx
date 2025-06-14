
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  DollarSign,
  Building2,
  Shield,
  Eye
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const RealTimeBankFeed = () => {
  const [isLive, setIsLive] = useState(true);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch recent bank transactions
  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ['bankTransactionFeed'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bank_transaction_feed')
        .select(`
          *,
          bank_connections:bank_connection_id (
            bank_name,
            integration_type
          )
        `)
        .order('created_at', { ascending: false })
        .limit(50);
      
      if (error) {
        console.error('Error fetching bank transactions:', error);
        throw error;
      }
      
      return data || [];
    },
    refetchInterval: isLive ? 5000 : false,
  });

  // Real-time subscription for new transactions
  useEffect(() => {
    if (!isLive) return;

    console.log('Setting up real-time subscription for bank transactions...');
    const channel = supabase
      .channel('bank_transaction_feed_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'bank_transaction_feed'
        },
        (payload) => {
          console.log('New bank transaction:', payload);
          queryClient.invalidateQueries({ queryKey: ['bankTransactionFeed'] });
          
          const transaction = payload.new;
          if (transaction.fraud_status === 'flagged' || transaction.fraud_status === 'blocked') {
            toast({
              title: "🚨 Fraud Alert",
              description: `Suspicious transaction of ${transaction.currency} ${transaction.amount} detected`,
              variant: "destructive",
            });
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'bank_transaction_feed'
        },
        (payload) => {
          console.log('Transaction updated:', payload);
          queryClient.invalidateQueries({ queryKey: ['bankTransactionFeed'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isLive, queryClient, toast]);

  const getStatusBadge = (status: string, fraudScore: number) => {
    switch (status) {
      case 'cleared':
        return <Badge className="bg-green-100 text-green-600">Cleared</Badge>;
      case 'flagged':
        return <Badge className="bg-yellow-100 text-yellow-600">Flagged</Badge>;
      case 'blocked':
        return <Badge className="bg-red-100 text-red-600">Blocked</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  const getFraudRiskLevel = (score: number) => {
    if (score >= 80) return { level: 'High', color: 'text-red-600' };
    if (score >= 50) return { level: 'Medium', color: 'text-yellow-600' };
    if (score >= 20) return { level: 'Low', color: 'text-blue-600' };
    return { level: 'Minimal', color: 'text-green-600' };
  };

  return (
    <Card className="h-[600px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Real-Time Bank Transaction Feed
            </CardTitle>
            <CardDescription>
              Live monitoring of transactions from connected banking systems
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
            <Button
              variant={isLive ? "outline" : "default"}
              size="sm"
              onClick={() => setIsLive(!isLive)}
            >
              {isLive ? 'Pause' : 'Resume'} Live Feed
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <Activity className="w-8 h-8 text-muted-foreground mx-auto mb-2 animate-spin" />
              <p className="text-muted-foreground">Loading transaction feed...</p>
            </div>
          </div>
        ) : transactions.length === 0 ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <Building2 className="w-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Transactions Yet</h3>
              <p className="text-muted-foreground max-w-md">
                Connect your banking systems to start receiving real-time transaction data for fraud monitoring.
              </p>
            </div>
          </div>
        ) : (
          <ScrollArea className="h-[500px]">
            <div className="space-y-3">
              {transactions.map((transaction: any) => {
                const riskLevel = getFraudRiskLevel(transaction.fraud_score || 0);
                return (
                  <Card key={transaction.id} className="p-4 border-l-4 border-l-blue-500">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          <span className="font-semibold">
                            {transaction.currency} {Number(transaction.amount).toLocaleString()}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            • {transaction.transaction_type}
                          </span>
                          {getStatusBadge(transaction.fraud_status, transaction.fraud_score)}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Building2 className="w-3 h-3" />
                            {transaction.bank_connections?.bank_name || 'Unknown Bank'}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(transaction.created_at).toLocaleTimeString()}
                          </div>
                        </div>
                        
                        {transaction.description && (
                          <p className="text-sm text-muted-foreground">
                            {transaction.description}
                          </p>
                        )}
                        
                        <div className="flex items-center gap-4">
                          {transaction.sender_account && (
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                              From: {transaction.sender_account}
                            </span>
                          )}
                          {transaction.recipient_account && (
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                              To: {transaction.recipient_account}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          <span className={`text-sm font-medium ${riskLevel.color}`}>
                            {riskLevel.level} Risk
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({transaction.fraud_score || 0}%)
                          </span>
                        </div>
                        
                        <Button variant="ghost" size="sm">
                          <Eye className="w-3 h-3 mr-1" />
                          Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default RealTimeBankFeed;
