
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity as ActivityIcon, Clock, User, FileText, AlertTriangle, Shield, CreditCard } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

interface ActivityItem {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: string;
  user: string;
  severity?: string;
  icon: React.ComponentType<any>;
}

const fetchRecentActivity = async () => {
  console.log('Fetching recent activity...');
  
  // Fetch recent transactions
  const { data: transactions, error: transactionsError } = await supabase
    .from('transactions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  if (transactionsError) {
    console.error('Error fetching transactions:', transactionsError);
  }

  // Fetch recent security incidents
  const { data: incidents, error: incidentsError } = await supabase
    .from('security_incidents')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  if (incidentsError) {
    console.error('Error fetching security incidents:', incidentsError);
  }

  // Fetch recent KYC verifications
  const { data: kycVerifications, error: kycError } = await supabase
    .from('kyc_verifications')
    .select(`
      *,
      kyc_documents (
        original_name,
        document_type
      )
    `)
    .order('created_at', { ascending: false })
    .limit(10);

  if (kycError) {
    console.error('Error fetching KYC verifications:', kycError);
  }

  console.log('Fetched data:', { transactions, incidents, kycVerifications });

  // Combine and format all activities
  const activities: ActivityItem[] = [];

  // Add transaction activities
  transactions?.forEach(transaction => {
    activities.push({
      id: `tx-${transaction.id}`,
      type: 'transaction',
      title: `${transaction.transaction_type.charAt(0).toUpperCase() + transaction.transaction_type.slice(1)} Transaction`,
      description: `${transaction.currency} ${transaction.amount} ${transaction.merchant_name ? `at ${transaction.merchant_name}` : ''}`,
      timestamp: new Date(transaction.created_at).toLocaleString(),
      user: 'User',
      severity: transaction.fraud_status === 'flagged' ? 'high' : transaction.fraud_status === 'pending' ? 'medium' : 'low',
      icon: CreditCard
    });
  });

  // Add security incident activities
  incidents?.forEach(incident => {
    activities.push({
      id: `incident-${incident.id}`,
      type: 'security',
      title: `Security Incident: ${incident.incident_type.toUpperCase()}`,
      description: `${incident.severity} severity incident ${incident.blocked ? 'blocked' : 'detected'}`,
      timestamp: new Date(incident.created_at).toLocaleString(),
      user: 'Security System',
      severity: incident.severity,
      icon: AlertTriangle
    });
  });

  // Add KYC verification activities
  kycVerifications?.forEach(verification => {
    activities.push({
      id: `kyc-${verification.id}`,
      type: 'kyc',
      title: `KYC Verification`,
      description: `${verification.verification_type} verification ${verification.verification_result}`,
      timestamp: new Date(verification.created_at).toLocaleString(),
      user: 'KYC System',
      severity: verification.verification_result === 'failed' ? 'high' : verification.verification_result === 'manual_review' ? 'medium' : 'low',
      icon: Shield
    });
  });

  // Sort by timestamp (most recent first)
  activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return activities.slice(0, 20); // Return top 20 most recent activities
};

export default function Activity() {
  const { data: activities = [], isLoading, error } = useQuery({
    queryKey: ['recentActivity'],
    queryFn: fetchRecentActivity,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
      case 'critical':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge variant="default" className="bg-amber-500">Medium</Badge>;
      default:
        return <Badge variant="outline">Low</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'transaction':
        return CreditCard;
      case 'security':
        return AlertTriangle;
      case 'kyc':
        return Shield;
      default:
        return ActivityIcon;
    }
  };

  if (error) {
    console.error('Activity fetch error:', error);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Activity Feed</h1>
        <p className="text-muted-foreground">Track all system activities and user actions</p>
      </div>

      {isLoading ? (
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ActivityIcon className="h-12 w-12 text-muted-foreground mb-4 animate-spin" />
              <h3 className="text-lg font-semibold mb-2">Loading Activities...</h3>
              <p className="text-muted-foreground">Fetching recent system activity</p>
            </div>
          </CardContent>
        </Card>
      ) : activities.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ActivityIcon className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Activity Yet</h3>
              <p className="text-muted-foreground max-w-md">
                When you start using the system - uploading documents, running transactions, 
                or generating reports - your activity will appear here.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => {
            const IconComponent = activity.icon;
            return (
              <Card key={activity.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 rounded-full bg-secondary">
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{activity.title}</h4>
                        <div className="flex items-center space-x-2">
                          {activity.severity && getSeverityBadge(activity.severity)}
                          <Badge variant="outline">{activity.type}</Badge>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm mt-1">{activity.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {activity.timestamp}
                        </div>
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {activity.user}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
